import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

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
  const [isModalVisible, setModalVisible] = useState(visible)

  useEffect(() => {
    if (visible) {
      setModalVisible(true)
    } else {
      const timer = setTimeout(() => {
        setModalVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [visible])

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      backdropOpacity={0.05}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}>
      <View className='bg-white w-full rounded-t-3xl px-6 pb-28 pt-6'>
        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          className='absolute left-4 top-4 z-10'>
          <Ionicons name='close' size={24} color='#6B7280' />
        </TouchableOpacity>

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
              onClose()
              router.push('/login')
            }}
            className='bg-primary py-4 rounded-xl'>
            <Text className='text-white font-notoKufiArabic-semiBold text-center text-base'>
              تسجيل الدخول
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose()
              router.push('/register')
            }}
            className='bg-white py-4 rounded-xl border border-gray-300'>
            <Text className='text-gray-800 font-notoKufiArabic-semiBold text-center text-base'>
              إنشاء حساب
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AuthModal
