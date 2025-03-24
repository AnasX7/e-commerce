import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/colors'

type LocationPickerProps = {
  currentLocation?: string
  onPress?: () => void
  theme?: 'light' | 'dark'
}

export default function LocationPicker({
  currentLocation = 'ابوظبي، بني ياس',
  onPress,
  theme = 'dark',
}: LocationPickerProps) {
  const textColor = theme === 'light' ? 'text-white' : 'text-gray-800'

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
            الموقع الحالي
          </Text>
          <Ionicons
            name='chevron-down'
            size={14}
            color={theme === 'light' ? '#fff' : Colors.text.primary}
          />
        </View>
        <Text
          className={`text-sm pl-4 font-notoKufiArabic leading-relaxed ${textColor}`}>
          {currentLocation}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
