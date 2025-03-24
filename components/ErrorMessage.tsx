import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

type ErrorMessageProps = {
  message?: string
  onRetry?: () => void
}

export default function ErrorMessage({
  message = 'حدث خطأ في الاتصال',
  onRetry,
}: ErrorMessageProps) {
  return (
    <View className='flex-1 pt-[45%] justify-center items-center p-4 gap-4'>
      <View className='w-16 h-16 rounded-full bg-red-100 justify-center items-center'>
        <Ionicons name='wifi' size={32} color={Colors.error} />
      </View>

      <Text className='text-center font-notoKufiArabic text-base text-gray-600'>
        {message}
      </Text>

      {onRetry && (
        <Pressable
          onPress={onRetry}
          className='flex-row items-center gap-2 bg-primary px-4 py-2 rounded-lg'>
          <Text className='font-notoKufiArabic text-white'>إعادة المحاولة</Text>
          <Ionicons name='refresh' size={20} color='white' />
        </Pressable>
      )}
    </View>
  )
}
