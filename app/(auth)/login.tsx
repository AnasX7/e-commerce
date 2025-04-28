import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/colors'
import FormInput from '@/components/FormInput'

// Define validation schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'يرجى إدخال عنوان بريد إلكتروني صالح' }),
  password: z
    .string()
    .min(1, { message: 'كلمة المرور مطلوبة' })
    .min(8, { message: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل' }),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginScreen = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/home',
  })

  const { formData, errors, setErrors, updateField, validateForm } =
    useForm<LoginFormData>({
      initialData: {
        email: '',
        password: '',
      },
      schema: loginSchema,
    })

  const submitForm = () => {
    if (!validateForm()) {
      return
    }

    login({
      email: formData.email,
      password: formData.password,
      setErrors,
      setLoading,
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        {Platform.OS !== 'ios' && (
          <View className='flex-row-reverse pt-4 px-4'>
            <TouchableOpacity
              onPress={() => router.back()}
              className='w-10 h-10 items-center justify-center'>
              <Ionicons name='arrow-back' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        )}
        <KeyboardAwareScrollView
          bottomOffset={88}
          className='flex-1'
          contentContainerClassName='flex-grow'>
          <View className='flex-1 justify-center items-center px-4'>
            <Text className='text-2xl font-notoKufiArabic-bold leading-relaxed text-gray-800 mb-2'>
              مرحبًا بعودتك
            </Text>
            <Text className='text-center font-notoKufiArabic leading-relaxed text-gray-600 mb-6'>
              قم بتسجيل الدخول إلى حسابك للمتابعة
            </Text>

            <View className='w-full max-w-sm'>
              {/* Email Input */}
              <FormInput
                label='البريد إلكتروني'
                placeholder='أدخل بريدك الإلكتروني'
                placeholderTextColor={Colors.text.quaternary}
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                error={errors.email}
                keyboardType='email-address'
                autoCapitalize='none'
                textAlign='right'
              />

              {/* Password Input */}
              <FormInput
                label='كلمة المرور'
                placeholder='إنشاء كلمة مرور'
                placeholderTextColor={Colors.text.quaternary}
                value={formData.password}
                onChangeText={(text) => updateField('password', text)}
                error={errors.password}
                secureTextEntry
                textAlign='right'
              />

              {/* Forgot Password */}
              <TouchableOpacity className='mb-6'>
                <Text className='text-secondary-foreground text-left font-notoKufiArabic-light leading-relaxed'>
                  هل نسيت كلمة السر؟
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={submitForm}
                disabled={loading}
                className={`py-3 px-8 rounded-xl w-full ${
                  loading ? 'bg-secondary' : 'bg-primary'
                }`}>
                <Text className='text-white font-notoKufiArabic-semiBold text-center'>
                  {loading ? (
                    <View className='w-full flex-row justify-center'>
                      <ActivityIndicator size='small' color='#fff' />
                    </View>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
              <View className='flex-row justify-center mt-6'>
                <Text className='text-gray-600 font-notoKufiArabic-light leading-relaxed'>
                  ليس لديك حساب؟
                </Text>
                <Link href='/register' asChild>
                  <TouchableOpacity>
                    <Text className='text-secondary-foreground font-notoKufiArabic-light leading-relaxed'>
                      {' '}
                      إنشاء حساب
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default LoginScreen
