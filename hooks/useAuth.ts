import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axios, isAxiosError } from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type RegisterData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

type LoginData = {
  email: string
  password: string
}

type ResetPasswordData = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

type ErrorHandler = {
  setErrors: (errors: Record<string, string>) => void
  setStatus?: (status: string | null) => void
  setLoading?: (loading: boolean) => void
}

type useAuthProps = {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: string
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: useAuthProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  // Store token in AsyncStorage
  const storeToken = async (token: string) => {
    await AsyncStorage.setItem('auth_token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Remove token from AsyncStorage
  // const removeToken = async () => {
  //   await AsyncStorage.removeItem('auth_token')
  //   delete axios.defaults.headers.common['Authorization']
  // }

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
  // const csrf = async () => {
  //   await axios.get('/sanctum/csrf-cookie')
  // }

  // Query to fetch the authenticated user.
  const { data: user, error: userError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await axios.get('/user')
        return response.data
      } catch (err) {
        // if (err.response?.status === 409) {
        //   router.push('/verify-email')
        //   return null
        // }
        throw err
      }
    },
    retry: false,
    enabled: middleware === 'auth', // Only fetch if auth middleware is specified
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      // await csrf();
      return axios.post('/register', data)
    },
    onSuccess: async (response) => {
      if (response.data.token) {
        await storeToken(response.data.token)
      }
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      console.log('Login request data:', data)
      // await csrf();
      return axios.post('/login', data)
    },
    onSuccess: async (response) => {
      console.log('Login success response:', response.data)
      if (response.data.token) {
        await storeToken(response.data.token)
      }
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error: any) => {
      console.warn('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      })
    },
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      // await csrf();
      return axios.post('/forgot-password', { email })
    },
  })

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async ({ token, ...data }: ResetPasswordData) => {
      // await csrf()
      return axios.post('/reset-password', { token, ...data })
    },

    onSuccess: (response) => {
      router.push({
        pathname: '/(auth)/login',
        params: { reset: btoa(response.data.status) },
      })
    },
  })

  // Resend email verification mutation
  const resendEmailVerificationMutation = useMutation({
    mutationFn: async () => axios.post('/email/verification-notification'),
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!userError) {
        await axios.post('/logout')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.clear()

      if (Platform.OS === 'web') {
        router.push('/(auth)/login')
      } else {
        router.replace('/(auth)/login')
      }
    },
  })

  const register = async ({
    setErrors,
    setStatus,
    setLoading,
    ...data
  }: ErrorHandler & RegisterData) => {
    setErrors({})
    if (setStatus) setStatus(null)
    if (setLoading) setLoading(true)

    try {
      await registerMutation.mutateAsync(data)
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data.errors)
      } else {
        throw err
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const login = async ({
    setErrors,
    setStatus,
    setLoading,
    ...data
  }: ErrorHandler & LoginData) => {
    setErrors({})
    if (setStatus) setStatus(null)
    if (setLoading) setLoading(true)
    try {
      await loginMutation.mutateAsync(data)
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data.errors)
      } else {
        throw err
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const forgotPassword = async ({
    setErrors,
    setStatus,
    setLoading,
    email,
  }: ErrorHandler & { email: string }) => {
    setErrors({})
    if (setStatus) setStatus(null)
    if (setLoading) setLoading(true)
    try {
      const response = await forgotPasswordMutation.mutateAsync({ email })
      if (setStatus) setStatus(response.data.status)
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data.errors)
      } else {
        throw err
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const resetPassword = async ({
    setErrors,
    setStatus,
    setLoading,
    ...data
  }: ErrorHandler & ResetPasswordData) => {
    setErrors({})
    if (setStatus) setStatus(null)
    if (setLoading) setLoading(true)
    try {
      await resetPasswordMutation.mutateAsync(data)
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data.errors)
      } else {
        throw err
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const resendEmailVerification = async ({
    setErrors,
    setStatus,
    setLoading,
  }: ErrorHandler & ResetPasswordData) => {
    setErrors({})
    if (setStatus) setStatus(null)
    if (setLoading) setLoading(true)
    try {
      const response = await resendEmailVerificationMutation.mutateAsync()
      if (setStatus) setStatus(response.data.status)
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data.errors)
      } else {
        throw err
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch (err) {
      throw err
    }
  }

  // Handle middleware logic for redirects based on authentication state.
  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push({
        pathname: redirectIfAuthenticated as any,
      })
    }
    // if (middleware === 'auth' && user && !user.email_verified_at) {
    //   router.push('/verify-email')
    // }
    // if (pathname === '/verify-email' && user?.email_verified_at) {
    //   router.push(redirectIfAuthenticated)
    // }
    if (middleware === 'auth' && userError) {
      logout()
    }
  }, [user, userError])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  }
}
