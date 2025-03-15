import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { isAxiosError } from '@/lib/axios'
import { useEffect } from 'react'
import { router } from 'expo-router'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Type definitions for authentication data
interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  [key: string]: any
}

interface AuthState {
  user: User | null
  token: string | null
}

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface LoginData {
  email: string
  password: string
  remember?: boolean
}

interface ResetPasswordData {
  token: string
  email: string
  password: string
  password_confirmation: string
}

interface ErrorHandler {
  setErrors: (errors: Record<string, string[]>) => void
  setStatus?: (status: string | null) => void
}

export const useLaravelAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: string
} = {}) => {
  const queryClient = useQueryClient()

  // Store token in AsyncStorage
  const storeToken = async (token: string) => {
    await AsyncStorage.setItem('auth_token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Remove token from AsyncStorage
  const removeToken = async () => {
    await AsyncStorage.removeItem('auth_token')
    delete axios.defaults.headers.common['Authorization']
  }

  // Load token from AsyncStorage on startup
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('auth_token')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        queryClient.invalidateQueries({ queryKey: ['user'] })
      }
    }

    loadToken()
  }, [])

  // CSRF protection
  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie')
  }

  // User data query
  const {
    data: user,
    error: userError,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await axios.get('/user')
        return response.data
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          // router.push('/verify-email')
        }
        throw error
      }
    },
    retry: false,
    enabled: middleware === 'auth', // Only fetch if auth middleware is specified
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async ({
      setErrors,
      ...props
    }: RegisterData & ErrorHandler) => {
      await csrf()
      setErrors({})
      return axios.post('/register', props)
    },
    onSuccess: async (response) => {
      if (response.data.token) {
        await storeToken(response.data.token)
      }
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 422) {
        throw error.response.data.errors
      }
      throw error
    },
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({
      setErrors,
      setStatus,
      ...props
    }: LoginData & ErrorHandler) => {
      await csrf()
      setErrors({})
      if (setStatus) setStatus(null)
      return axios.post('/login', props)
    },
    onSuccess: async (response) => {
      if (response.data.token) {
        await storeToken(response.data.token)
      }
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 422) {
        throw error.response.data.errors
      }
      throw error
    },
  })

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async ({
      setErrors,
      setStatus,
      email,
    }: {
      email: string
    } & ErrorHandler) => {
      await csrf()
      setErrors({})
      if (setStatus) setStatus(null)
      return axios.post('/forgot-password', { email })
    },
    onSuccess: (response, variables) => {
      if (variables.setStatus) {
        variables.setStatus(response.data.status)
      }
    },
    onError: (error, variables) => {
      if (
        isAxiosError(error) &&
        error.response?.status === 422 &&
        variables.setErrors
      ) {
        variables.setErrors(error.response.data.errors)
      }
      throw error
    },
  })

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async ({
      setErrors,
      setStatus,
      token,
      ...props
    }: ResetPasswordData & ErrorHandler & { token: string }) => {
      await csrf()
      setErrors({})
      if (setStatus) setStatus(null)
      return axios.post('/reset-password', { token, ...props })
    },
    onSuccess: (response) => {
      router.push({
        pathname: '/(auth)/login',
        params: { reset: btoa(response.data.status) },
      })
    },
    onError: (error, variables) => {
      if (
        isAxiosError(error) &&
        error.response?.status === 422 &&
        variables.setErrors
      ) {
        variables.setErrors(error.response.data.errors)
      }
      throw error
    },
  })

  // Resend email verification mutation
  const resendEmailVerificationMutation = useMutation({
    mutationFn: async () => {
      return axios.post('/email/verification-notification')
    },
    onSuccess: (
      response,
      variables: { setStatus: (status: string) => void }
    ) => {
      if (variables.setStatus) {
        variables.setStatus(response.data.status)
      }
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!userError) {
        return axios.post('/logout')
      }
      return null
    },
    onSuccess: async () => {
      await removeToken()
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.clear()

      if (Platform.OS === 'web') {
        router.push('/(auth)/login')
      } else {
        router.replace('/(auth)/login')
      }
    },
  })

  // Authentication navigation logic
  useEffect(() => {
    const handleAuthNavigation = async () => {
      if (middleware === 'guest' && redirectIfAuthenticated && user) {
        router.replace(redirectIfAuthenticated as any)
      }

      // if (middleware === 'auth' && !user?.email_verified_at) {
      //   router.replace('/verify-email');
      // }

      // const path = router.canGoBack()
      //   ? router.getCurrentOptions()?.path
      //   : '';

      // if (path === '/verify-email' && user?.email_verified_at && redirectIfAuthenticated) {
      //   router.replace(redirectIfAuthenticated);
      // }

      if (middleware === 'auth' && userError) {
        await logoutMutation.mutateAsync()
      }
    }

    handleAuthNavigation()
  }, [user, userError, middleware, redirectIfAuthenticated])

  // Public methods
  const register = async (data: RegisterData & ErrorHandler) => {
    try {
      await registerMutation.mutateAsync(data)
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        data.setErrors(error as Record<string, string[]>)
      }
    }
  }

  const login = async (data: LoginData & ErrorHandler) => {
    try {
      await loginMutation.mutateAsync(data)
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        data.setErrors(error as Record<string, string[]>)
      }
    }
  }

  const forgotPassword = async (data: { email: string } & ErrorHandler) => {
    try {
      await forgotPasswordMutation.mutateAsync(data)
    } catch (error) {
      // Error handling done in mutation
    }
  }

  const resetPassword = async (data: ResetPasswordData & ErrorHandler) => {
    try {
      await resetPasswordMutation.mutateAsync(data)
    } catch (error) {
      // Error handling done in mutation
    }
  }

  const resendEmailVerification = async ({
    setStatus,
  }: {
    setStatus: (status: string) => void
  }) => {
    await resendEmailVerificationMutation.mutateAsync({ setStatus })
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  return {
    user,
    isLoading: isLoadingUser,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    refetchUser,
  }
}
