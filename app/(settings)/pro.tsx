import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

const Pro = () => {
  const router = useRouter()

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className='absolute left-4 top-safe-offset-2 z-10'>
        <Ionicons
          name='chevron-forward'
          size={24}
          color={Colors.text.primary}
        />
      </TouchableOpacity>

      <View className='flex-1 items-center justify-center p-4'>
        {/* Animated Flame Icon */}
        <MotiView
          from={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
          }}>
          <Ionicons name='flame' size={80} color={Colors.primary} />
        </MotiView>

        {/* Title */}
        <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-gray-800 mt-6 mb-2'>
          قريباً
        </Text>

        {/* Description */}
        <Text className='text-center font-notoKufiArabic text-gray-600 max-w-[300px]'>
          نعمل على تطوير ميزات حصرية لمشتركي Pro. ترقبوا المزيد من التحديثات!
        </Text>

        {/* Decorative Elements */}
        <MotiView
          className='absolute -z-10'
          from={{ rotate: '0deg' }}
          animate={{ rotate: '360deg' }}
          transition={{
            type: 'timing',
            duration: 20000,
            loop: true,
          }}>
          <View className='w-80 h-80 rounded-full bg-primary/5' />
        </MotiView>
      </View>
    </SafeAreaView>
  )
}

export default Pro
