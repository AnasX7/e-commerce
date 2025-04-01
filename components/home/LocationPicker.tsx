import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import { useLocationStore } from '@/stores/LocationStore'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'

type LocationPickerProps = {
  theme?: 'light' | 'dark'
}
const LocationPicker = ({ theme = 'dark' }: LocationPickerProps) => {
  const { mainLocation } = useLocationStore()
  const router = useRouter()
  const textColor = theme === 'light' ? 'text-white' : 'text-gray-800'

  const onPress = useCallback(() => {
    router.push('/(settings)/locations')
  }, [router])

  return (
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
  )
}

export default LocationPicker
