import { useQuery, useQueryClient } from '@tanstack/react-query'
import { axios, isAxiosError } from '@/lib/axios'
import { useEffect } from 'react'
import { Href, useRouter } from 'expo-router'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  token: string
  email: string
  password: string
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

  const storeToken = async (token: string) => {
    await AsyncStorage.setItem('auth_token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

  // Query to fetch the authenticated user.
  const {
    data: user,
    error: userError,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/user')
        return response.data
      } catch (err) {
        if (isAxiosError(err) && err.response?.status !== 409) throw err

        // router.push('/(auth)/verify-email')
      }
    },
    retry: false,
    enabled: middleware === 'auth', // Only fetch in component mounts if auth middleware is specified
  })

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

      console.log('Register success response:', response.data)

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
            email:
              err.response.data.message || 'البريد الإلكتروني موجود بالفعل',
          })
        }
        // Handle other client errors (400-499)
        else if (err.response.status >= 400 && err.response.status < 500) {
          setErrors({
            name: err.response.data.message || 'فشل تسجيل الدخول',
            email: err.response.data.message || 'فشل تسجيل الدخول',
            password: err.response.data.message || 'فشل تسجيل الدخول',
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

      console.log('Login success response:', response.data)

      if (response.data.token) {
        await storeToken(response.data.token)
      }
      refetch()
    } catch (err: any) {
      if (err.response) {
        // Handle 401 Unauthorized errors
        if (err.response.status === 401) {
          setErrors({
            email: err.response.data.message || 'بيانات اعتماد غير صالحة',
            password: err.response.data.message || 'بيانات اعتماد غير صالحة',
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
      console.log('forgotPassword success response:', response.data)
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
      const response = await axios.post('/api/reset-password', props)
      console.log('ResetPassword success response:', response.data)
      router.push('/login')
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

  const logout = async () => {
    try {
      if (!userError) {
        await axios.post('/api/logout')
      }
      // Clear stored token
      await AsyncStorage.removeItem('auth_token')
      delete axios.defaults.headers.common['Authorization']

      if (Platform.OS === 'web') {
        router.push('/login')
      } else {
        router.replace('/login')
      }
    } catch (err) {
      console.error('Logout error:', err)
      // Still clear local auth state and redirect even if server logout fails
      await AsyncStorage.removeItem('auth_token')
      delete axios.defaults.headers.common['Authorization']
      router.replace('/login')
    }
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      console.log('Redirecting to:', redirectIfAuthenticated)
      router.dismissAll()
      router.push(redirectIfAuthenticated)
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
