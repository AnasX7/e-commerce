import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import { useLocationStore } from '@/stores/LocationStore'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

const LocationDetails = () => {
  const { mainLocation } = useLocationStore()

  return (
    <View className='my-6 items-center justify-between gap-1 p-6 border border-gray-200 rounded-2xl'>
      <Ionicons name='location-outline' size={64} color={Colors.primary} />
      <View className='flex-row items-center justify-between w-full'>
        <View>
          <Text className='font-notoKufiArabic text-gray-600 text-left'>الدولة: {mainLocation?.country}</Text>
          <Text className='font-notoKufiArabic text-gray-600 text-left'>الموقع: {mainLocation?.location}</Text>
          <Text className='font-notoKufiArabic text-gray-600 text-left'>رقم الجوال: {mainLocation?.phoneNumber}</Text>
        </View>
        <Link className='font-notoKufiArabic underline leading-relaxed text-gray-800' href='/locations' push>
          تغيير
        </Link>
      </View>
    </View>
  )
}

export default LocationDetails
