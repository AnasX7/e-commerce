import { View, Text, TouchableOpacity } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { useLocationStore } from '@/stores/LocationStore'
import { useAuth } from '@/hooks/useAuth'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import AuthModal from '../AuthModal'

type LocationPickerProps = {
  theme?: 'light' | 'dark'
}
const LocationPicker = ({ theme = 'dark' }: LocationPickerProps) => {
  const mainLocation = useLocationStore((state) => state.mainLocation)
  const router = useRouter()

  useEffect(() => {
    console.info('Main location updated:', mainLocation);
  }, [mainLocation]);

  const { isAuthenticated } = useAuth({
    middleware: 'guest',
  })

  const [showAuthModal, setShowAuthModal] = useState(false)
  const textColor = theme === 'light' ? 'text-white' : 'text-gray-800'

  const onPress = useCallback(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    router.push('/(settings)/locations')
  }, [router])

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View className='justify-center items-start'>
          <View className='flex-row items-center gap-1'>
            <Ionicons
              name='location-sharp'
              size={18}
              color={theme === 'light' ? '#fff' : Colors.text.primary}
            />
            <Text
              className={`text-sm font-notoKufiArabic-semiBold leading-relaxed ${textColor}`}>
              {mainLocation ? 'موقع التوصيل' : 'اختر موقع التوصيل'}
            </Text>
            <Ionicons
              name='chevron-down'
              size={14}
              color={theme === 'light' ? '#fff' : Colors.text.primary}
            />
          </View>
          {mainLocation && (
            <Text
              className={`text-sm pl-4 font-notoKufiArabic leading-relaxed ${textColor}`}>
              {mainLocation.country}, {mainLocation.location}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <AuthModal
        visible={showAuthModal}
        onClose={() => {
          setShowAuthModal(false)
        }}
        icon={{
          name: 'location-outline',
          size: 44,
          color: '#3B82F6',
        }}
        title='تسجيل الدخول مطلوب'
        message='يجب تسجيل الدخول لأختيار موقع التوصيل'
      />
    </>
  )
}

export default LocationPicker
