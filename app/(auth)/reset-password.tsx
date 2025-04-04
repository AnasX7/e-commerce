import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useRouter } from 'expo-router'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from '@/hooks/useForm'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/colors'
import FormInput from '@/components/FormInput'

// Define validation schema with Zod
const resetPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'كلمة المرور الحالية مطلوبة' }),
    newPassword: z
      .string()
      .min(1, { message: 'كلمة المرور الجديدة مطلوبة' })
      .min(8, { message: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل' }),
    passwordConfirmation: z
      .string()
      .min(1, { message: 'الرجاء تأكيد كلمة المرور الجديدة' }),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: 'كلمات المرور غير متطابقة',
    path: ['passwordConfirmation'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

const ResetPasswordScreen = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)

  const { resetPassword } = useAuth({
    middleware: 'auth',
  })

  const { formData, errors, setErrors, updateField, validateForm } =
    useForm<ResetPasswordFormData>({
      initialData: {
        currentPassword: '',
        newPassword: '',
        passwordConfirmation: '',
      },
      schema: resetPasswordSchema,
    })

  const submitForm = () => {
    if (!validateForm()) {
      return
    }

    resetPassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      setErrors,
      setLoading,
    })
  }

  return (
    <>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 8 }}
        className='px-4 pb-3 bg-white border-b border-gray-200'>
        <View className='flex-row items-center justify-center'>
          <TouchableOpacity
            onPress={() => router.back()}
            className='absolute left-0'>
            <Ionicons
              name='chevron-forward'
              size={24}
              color={Colors.text.primary}
            />
          </TouchableOpacity>

          <Text className='text-lg font-notoKufiArabic-semiBold leading-loose text-gray-800'>
            تغيير كلمة المرور
          </Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        bottomOffset={88}
        className='flex-1'
        contentContainerClassName='flex-grow'>
        <View className='justify-center items-center px-4 pb-6 pt-20'>
          <Text className='text-2xl font-notoKufiArabic-bold leading-relaxed text-gray-800 mb-2'>
            تغيير كلمة المرور
          </Text>
          <Text className='text-center font-notoKufiArabic leading-relaxed text-gray-600 mb-6'>
            قم بتحديث كلمة المرور الخاصة بك
          </Text>

          <View className='w-full max-w-sm'>
            {/* Current Password Input */}
            <FormInput
              label='كلمة المرور الحالية'
              placeholder='أدخل كلمة المرور الحالية'
              placeholderTextColor={Colors.text.quaternary}
              value={formData.currentPassword}
              onChangeText={(text) => updateField('currentPassword', text)}
              error={errors.currentPassword}
              secureTextEntry
              textAlign='right'
            />

            {/* New Password Input */}
            <FormInput
              label='كلمة المرور الجديدة'
              placeholder='أدخل كلمة المرور الجديدة'
              placeholderTextColor={Colors.text.quaternary}
              value={formData.newPassword}
              onChangeText={(text) => updateField('newPassword', text)}
              error={errors.newPassword}
              secureTextEntry
              textAlign='right'
            />

            {/* Confirm New Password Input */}
            <FormInput
              label='تأكيد كلمة المرور الجديدة'
              placeholder='تأكيد كلمة المرور الجديدة'
              placeholderTextColor={Colors.text.quaternary}
              value={formData.passwordConfirmation}
              onChangeText={(text) => updateField('passwordConfirmation', text)}
              error={errors.passwordConfirmation}
              secureTextEntry
              containerClassName='mb-6'
              textAlign='right'
            />

            {/* Submit Button */}
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
                  'تحديث كلمة المرور'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}

export default ResetPasswordScreen
