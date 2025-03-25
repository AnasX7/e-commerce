import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

type AuthModalProps = {
  visible: boolean
  onClose: () => void
  icon?: {
    name: keyof typeof Ionicons.glyphMap
    size?: number
    color?: string
  }
  title?: string
  message?: string
}

const AuthModal = ({
  visible,
  onClose,
  icon = {
    name: 'heart-outline',
    size: 40,
    color: '#EF4444',
  },
  title = 'تسجيل الدخول مطلوب',
  message = 'يجب تسجيل الدخول لإضافة المنتج إلى المفضلة',
}: AuthModalProps) => {
  const router = useRouter()

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}>
      <View className='flex-1 bg-black/50 justify-center items-center p-4'>
        <View className='bg-white w-full max-w-sm rounded-2xl p-6'>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} className='absolute left-4 top-4'>
            <Ionicons name='close' size={24} color='#6B7280' />
          </TouchableOpacity>

          {/* Content */}
          <View className='items-center mb-6'>
            <Ionicons name={icon.name} size={icon.size} color={icon.color} />
            <Text className='text-xl font-notoKufiArabic-bold text-gray-800 mt-4 mb-2'>
              {title}
            </Text>
            <Text className='text-gray-600 font-notoKufiArabic text-center'>
              {message}
            </Text>
          </View>

          {/* Buttons */}
          <View className='gap-3'>
            <TouchableOpacity
              onPress={() => {
                onClose()
                router.push('/login')
              }}
              className='bg-primary py-3 rounded-xl'>
              <Text className='text-white font-notoKufiArabic-semiBold text-center'>
                تسجيل الدخول
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onClose()
                router.push('/register')
              }}
              className='bg-white py-3 rounded-xl border border-gray-300'>
              <Text className='text-gray-800 font-notoKufiArabic-semiBold text-center'>
                إنشاء حساب
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AuthModal
