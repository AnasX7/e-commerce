import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const ProBanner = () => {
  const router = useRouter()
  return (
    <TouchableOpacity
      onPress={() => router.push('/(settings)/pro')}
      className='bg-secondary rounded-xl mt-4 px-3 py-2.5 flex-row justify-between items-center'>
      <View className='flex-row items-center'>
        <Text className='text-white font-notoKufiArabic ml-2'>
          احصل على توصيل مجاني مع
        </Text>
        <View className='bg-primary flex-row justify-center items-center rounded px-2 py-1 mx-2'>
          <Text className='text-white font-bold'>pro</Text>
          <Ionicons name='flame' size={16} color='#fff' />
        </View>
      </View>
      <Text className='text-white font-notoKufiArabic'>انضم</Text>
    </TouchableOpacity>
  )
}

export default ProBanner
