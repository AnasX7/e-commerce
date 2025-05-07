import { useQuery, useQueryClient } from '@tanstack/react-query'
import { axios, isAxiosError } from '@/lib/axios'
import { useEffect } from 'react'
import { Href, useRouter } from 'expo-router'
import { useFavoritesStore } from '@/stores/FavoritesStore'
import { useAuthStore } from '@/stores/AuthStore'

type RegisterData = {
  name: string
  email: string
  password: string
}

type LoginData = {
  email: string
  password: string
}

type ResetPasswordData = {
  currentPassword: string
  newPassword: string
}

type ErrorHandler = {
  setErrors: (errors: Record<string, string>) => void
  setStatus?: (status: string | null) => void
  setLoading?: (loading: boolean) => void
}

type useAuthProps = {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: Href
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: useAuthProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setToken, token, isInitialized, user, setUser } = useAuthStore()

  // Initialize auth state on mount
  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  // Query to fetch the authenticated user with optimizations
  const {
    error: userError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/user')
        setUser(response.data)
        return response.data
      } catch (err) {
        if (isAxiosError(err) && err.response?.status !== 409) throw err
      }
    },
    retry: false,
    enabled: middleware === 'auth' && isInitialized && !user,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  })

  const storeToken = async (token: string) => {
    await setToken(token)
  }

  // CSRF protection
  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie')
  }

  const register = async ({
    setErrors,
    setLoading,
    ...props
  }: ErrorHandler & RegisterData) => {
    if (setLoading) setLoading(true)
    await csrf()

    setErrors({})

    try {
      const response = await axios.post('/api/register', props)

      // console.log('Register success response:', response.data)

      if (response.data.token) {
        await storeToken(response.data.token)
      }
      refetch()
    } catch (err: any) {
      if (err.response) {
        // Handle validation errors (422)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors || {})
        }
        // Handle duplicate email errors (409)
        else if (err.response.status === 409) {
          setErrors({
            email: 'البريد الإلكتروني موجود بالفعل',
          })
        }
        // Handle other client errors (400-499)
        else if (err.response.status >= 400 && err.response.status < 500) {
          setErrors({
            name: 'فشل تسجيل الدخول',
            email: 'فشل تسجيل الدخول',
            password: 'فشل تسجيل الدخول',
          })
        }
        // Handle server errors (500+)
        else {
          setErrors({
            name: 'حدث خطأ في الخادم. يُرجى المحاولة لاحقًا.',
            email: 'حدث خطأ في الخادم. يُرجى المحاولة لاحقًا.',
            password: 'حدث خطأ في الخادم. يُرجى المحاولة لاحقًا.',
          })
        }
      } else {
        // Handle network errors
        setErrors({
          name: 'خطأ في الشبكة. يُرجى التحقق من اتصالك.',
          email: 'خطأ في الشبكة. يُرجى التحقق من اتصالك.',
          password: 'خطأ في الشبكة. يُرجى التحقق من اتصالك.',
        })
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const login = async ({
    setErrors,
    setLoading,
    ...props
  }: ErrorHandler & LoginData) => {
    if (setLoading) setLoading(true)
    await csrf()

    setErrors({})

    try {
      const response = await axios.post('/api/login', props)

      // console.log('Login success response:', response.data)

      if (response.data.token) {
        await storeToken(response.data.token)
      }
      refetch()
    } catch (err: any) {
      if (err.response) {
        // Handle 401 Unauthorized errors
        if (err.response.status === 401) {
          setErrors({
            email: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            password: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
          })
        }
        // Handle 422 Validation errors
        else if (err.response.status === 422) {
          setErrors(err.response.data.errors || {})
        }
        // Handle other errors
        else {
          setErrors({
            email: 'حدث خطأ أثناء تسجيل الدخول',
            password: 'حدث خطأ أثناء تسجيل الدخول',
          })
        }
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const forgotPassword = async ({
    setErrors,
    email,
  }: ErrorHandler & { email: string }) => {
    await csrf()

    setErrors({})

    try {
      const response = await axios.post('/api/forgot-password', { email })
      // console.log('forgotPassword success response:', response.data)
    } catch (err: any) {
      if (err.response) {
        // Handle validation errors (422)
        if (err.response.status === 422) {
          setErrors(err.response.data.errors || {})
        }
        // Handle not found email (404)
        else if (err.response.status === 404) {
          setErrors({
            email: err.response.data.message || 'البريد الإلكتروني غير مسجل',
          })
        }
        // Handle other client errors (400-499)
        else if (err.response.status >= 400 && err.response.status < 500) {
          setErrors({
            email:
              err.response.data.message ||
              'فشل إرسال رابط إعادة تعيين كلمة المرور',
          })
        }
        // Handle server errors (500+)
        else {
          setErrors({
            email: 'حدث خطأ في الخادم. يُرجى المحاولة لاحقًا.',
          })
        }
      } else {
        // Handle network errors
        setErrors({
          email: 'خطأ في الشبكة. يُرجى التحقق من اتصالك.',
        })
      }
    }
  }

  const resetPassword = async ({
    setErrors,
    setLoading,
    ...props
  }: ErrorHandler & ResetPasswordData) => {
    if (setLoading) setLoading(true)
    await csrf()

    setErrors({})

    try {
      const response = await axios.put('/api/reset-password', props)
      // console.log('ResetPassword success response:', response.data)
      logout()
    } catch (err: any) {
      // Handle validation errors (422)
      if (err.response.status === 422) {
        setErrors(err.response.data.errors || {})
      }
      // Handle invalid/expired token (400)
      else if (err.response.status === 400) {
        setErrors({
          token:
            err.response.data.message ||
            'رمز إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية',
          password: 'يرجى طلب رابط إعادة تعيين جديد',
        })
      }
      // Handle other client errors (401-499)
      else if (err.response.status >= 401 && err.response.status < 500) {
        setErrors({
          email: err.response.data.message || 'فشل إعادة تعيين كلمة المرور',
          password: err.response.data.message || 'فشل إعادة تعيين كلمة المرور',
        })
      }
      // Handle server errors (500+)
      else {
        setErrors({
          email: 'حدث خطأ في الخادم. يُرجى المحاولة لاحقًا.',
          password: 'حدث خطأ في الخادم. يُرجى المحاولة لاحقًا.',
        })
      }
    } finally {
      if (setLoading) setLoading(false)
    }
  }

  const resendEmailVerification = async ({
    setErrors,
    setStatus,
  }: ErrorHandler) => {
    try {
      await axios.post('/api/email/verification-notification')
      setStatus?.('تم إرسال رابط التحقق. يرجى التحقق من بريدك الإلكتروني.')
    } catch (err: any) {
      if (err.response) {
        // Handle rate limiting (429)
        if (err.response.status === 429) {
          setErrors({
            email:
              'تم إرسال العديد من الطلبات. يرجى الانتظار قبل المحاولة مرة أخرى.',
          })
        }
        // Handle other client errors
        else if (err.response.status >= 400 && err.response.status < 500) {
          setErrors({
            email: err.response.data.message || 'فشل إرسال رابط التحقق',
          })
        }
        // Handle server errors
        else {
          setErrors({
            email: 'حدث خطأ في الخادم. يُرجى المحاولة لاحقًا.',
          })
        }
      } else {
        // Handle network errors
        setErrors({
          email: 'خطأ في الشبكة. يُرجى التحقق من اتصالك.',
        })
      }
    }
  }

  // Modified logout function
  const logout = async () => {
    try {
      if (!userError) {
        await axios.post('/api/logout')
      }

      await setToken(null)
      setUser(null)
      useFavoritesStore.getState().reset()
      queryClient.clear()
      router.replace('/(auth)/auth')
    } catch (err) {
      console.error('Logout error:', err)
      // Ensure cleanup even if API call fails
      await setToken(null)
      setUser(null)
      useFavoritesStore.getState().reset()
      queryClient.clear()
      router.replace('/(auth)/auth')
    }
  }

  const deleteAccount = async () => {
    try {
      await axios.delete('/api/user')

      await setToken(null)
      setUser(null)
      useFavoritesStore.getState().reset()
      queryClient.clear()

      router.replace('/(auth)/auth')
    } catch (error) {
      console.error('Delete account error:', error)

      // Ensure cleanup even if API call fails
      await setToken(null)
      setUser(null)
      useFavoritesStore.getState().reset()
      queryClient.clear()
      router.replace('/(auth)/auth')
    }
  }

  // Authentication state effect
  useEffect(() => {
    if (!isInitialized) return

    // Quick check using token first
    if (middleware === 'guest' && redirectIfAuthenticated && !!token) {
      router.dismissAll()
      router.push(redirectIfAuthenticated)
      return
    }

    // Secondary verification with user data
    // Token was valid and we have user data
    if (user && middleware === 'guest' && redirectIfAuthenticated) {
      console.log('(user) Redirecting to:', redirectIfAuthenticated)
      router.dismissAll()
      router.push(redirectIfAuthenticated)
    }

    if (middleware === 'auth' && userError) {
      logout()
    }
  }, [user, userError, isInitialized])

  // Add debug logs
  // useEffect(() => {
  //   console.log('Auth State:', {
  //     token: !!token,
  //     isInitialized,
  //   })
  // }, [token, isInitialized])

  return {
    user,
    isLoading: !isInitialized || isLoading,
    isAuthenticated: !!token,
    refetch,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    deleteAccount,
  }
}
