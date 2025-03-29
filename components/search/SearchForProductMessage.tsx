import { View, Text } from 'react-native'
import { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/colors'

const SearchForProductMessage = () => {
  const bounceValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withTiming(bounceValue.value, {
            duration: 1000,
            easing: Easing.bounce,
          }),
          -1,
          true
        ),
      },
    ],
  }))

  useEffect(() => {
    bounceValue.value = -10
  }, [])

  return (
    <View className='justify-center items-center space-y-4 p-4'>
      <Animated.View style={animatedStyle}>
        <View className='w-20 h-20 bg-primary/10 rounded-full items-center justify-center'>
          <Ionicons name='search-outline' size={48} color={Colors.primary} />
        </View>
      </Animated.View>
      <View className='items-center'>
        <Text className='text-xl text-gray-900 font-notoKufiArabic-bold text-center'>
          ابحث عن منتجاتك
        </Text>
        <Text className='text-sm text-gray-500 font-notoKufiArabic text-center mt-2'>
          استخدم شريط البحث للعثور على المنتجات التي تريدها
        </Text>
      </View>
    </View>
  )
}

export default SearchForProductMessage
