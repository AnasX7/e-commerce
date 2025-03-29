import { Link } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

const NotFoundScreen = () => {
  return (
    <View className='flex-1 bg-white items-center justify-center px-4'>
      <View className='items-center space-y-4'>
        {/* Icon */}
        <View className='w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4'>
          <Ionicons name='search' size={64} color={Colors.primary} />
        </View>

        {/* Text Content */}
        <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-gray-900 text-center'>
          عذراً، الصفحة غير موجودة
        </Text>
        <Text className='text-base font-notoKufiArabic leading-loose text-gray-600 text-center mb-8'>
          يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </Text>

        {/* Back to Home Button */}
        <Link href='/(tabs)/home' dismissTo asChild>
          <TouchableOpacity className='bg-primary px-8 py-2 rounded-xl'>
            <Text className='font-notoKufiArabic leading-loose text-white text-base'>
              العودة للرئيسية
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default NotFoundScreen
