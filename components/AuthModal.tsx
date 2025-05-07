import { RefObject } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Sheet } from '@/components/ui/Sheet'

type AuthModalProps = {
  icon: {
    name: keyof typeof Ionicons.glyphMap
    size?: number
    color?: string
  }
  title: string
  message: string
  ref: RefObject<BottomSheetModal | null>
}

const AuthModal = ({ icon, title, message, ref }: AuthModalProps) => {
  const router = useRouter()

  return (
    <Sheet ref={ref} snapPoints={[404]}>
      <BottomSheetView className='flex-1 justify-center px-6 pb-16'>
        {/* Content */}
        <View className='items-center mb-4'>
          <Ionicons name={icon.name} size={icon.size} color={icon.color} />
          <Text className='text-xl font-notoKufiArabic-bold text-gray-800 mt-4 mb-3'>
            {title}
          </Text>
          <Text className='text-gray-600 font-notoKufiArabic text-center mb-6'>
            {message}
          </Text>
        </View>

        {/* Buttons */}
        <View className='gap-4'>
          <TouchableOpacity
            onPress={() => {
              ref.current?.close()
              router.push('/login')
            }}
            className='bg-primary py-4 rounded-xl'>
            <Text className='text-white font-notoKufiArabic-semiBold text-center text-base'>
              تسجيل الدخول
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              ref.current?.close()
              router.push('/register')
            }}
            className='bg-white py-4 rounded-xl border border-gray-300'>
            <Text className='text-gray-800 font-notoKufiArabic-semiBold text-center text-base'>
              إنشاء حساب
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </Sheet>
  )
}

export default AuthModal
