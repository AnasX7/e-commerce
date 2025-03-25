import { useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import AccountInfoSkeleton from '@/components/skeletons/AccountInfoSkeleton'

const AccountInfo = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const { user, deleteAccount, isLoading } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/(tabs)/home',
  })

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      'حذف الحساب',
      'هل أنت متأكد من حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount()
            } catch (error) {
              Alert.alert(
                'خطأ',
                'حدث خطأ أثناء محاولة حذف الحساب. الرجاء المحاولة مرة أخرى.'
              )
            }
          },
        },
      ]
    )
  }, [deleteAccount])

  if (isLoading) return <AccountInfoSkeleton />
  if (!user) return null

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
            معلومات الحساب
          </Text>
        </View>
      </View>
      {/* User Info Section */}
      <View className='p-4 border-b border-gray-100'>
        <View className='gap-2'>
          <View className='flex-row items-center gap-2'>
            <Ionicons name='person-outline' size={20} color={Colors.primary} />
            <Text className='font-notoKufiArabic leading-loose text-base'>
              {user.name}
            </Text>
          </View>

          <View className='flex-row items-center gap-2'>
            <Ionicons name='mail-outline' size={20} color={Colors.primary} />
            <Text className='font-notoKufiArabic leading-loose text-base'>
              {user.email}
            </Text>
          </View>
        </View>
      </View>

      {/* Account Management Section */}
      <View className='p-4 gap-3'>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/reset-password')}
          className='flex-row justify-between items-center bg-white px-4 py-3 rounded-xl border border-gray-200'>
          <Text className='font-notoKufiArabic leading-loose text-base'>
            تغيير كلمة المرور
          </Text>
          <Ionicons name='chevron-back' size={20} color={Colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteAccount}
          className='flex-row justify-between items-center bg-white px-4 py-3 rounded-xl border border-red-200'>
          <Text className='font-notoKufiArabic leading-loose text-base text-red-500'>
            حذف الحساب
          </Text>
          <Ionicons name='trash-outline' size={20} color='#ef4444' />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default AccountInfo
