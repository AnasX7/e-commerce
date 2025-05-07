import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useLocationStore } from '@/stores/LocationStore'
import { useAuth } from '@/hooks/useAuth'
import { useSheetRef } from '@/components/ui/Sheet'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import AuthModal from '@/components/AuthModal'

type LocationPickerProps = {
  theme?: 'light' | 'dark'
}

const LocationPicker = ({ theme = 'dark' }: LocationPickerProps) => {
  const mainLocation = useLocationStore((state) => state.mainLocation)
  const router = useRouter()

  const { isAuthenticated } = useAuth({
    middleware: 'guest',
  })

  const bottomSheetModalRef = useSheetRef()

  const textColor = theme === 'light' ? 'text-white' : 'text-gray-800'

  const onPress = () => {
    if (!isAuthenticated) {
      bottomSheetModalRef.current?.present()
      return
    }
    router.push('/(settings)/locations')
  }

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
              {mainLocation && isAuthenticated ? 'موقع التوصيل' : 'اختر موقع التوصيل'}
            </Text>
            <Ionicons
              name='chevron-down'
              size={14}
              color={theme === 'light' ? '#fff' : Colors.text.primary}
            />
          </View>
          {mainLocation && isAuthenticated && (
            <Text
              className={`text-sm pl-4 font-notoKufiArabic leading-relaxed ${textColor}`}>
              {mainLocation.country}, {mainLocation.location}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <AuthModal
        ref={bottomSheetModalRef}
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
