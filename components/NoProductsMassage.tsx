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

const NoProductsMessage = () => {
  // Create a shared value for the animation
  const bounceValue = useSharedValue(0)

  // Animated style for the icon
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withRepeat(
            withTiming(bounceValue.value, {
              duration: 1000,
              easing: Easing.bounce,
            }),
            -1, // Infinite repeat
            true // Reverse the animation
          ),
        },
      ],
    }
  })

  // Trigger the animation when component mounts
  useEffect(() => {
    bounceValue.value = -10 // Bounce up and down by 10 units
  }, [])

  return (
    <View className='flex-1 justify-center items-center space-y-4 p-4'>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name='bag-handle-outline'
          size={64}
          color='#9CA3AF' // Gray-400 equivalent
        />
      </Animated.View>
      <View className='items-center'>
        <Text className='text-xl text-gray-600 font-notoKufiArabic leading-loose text-center'>
          لا يوجد منتجات
        </Text>
        <Text className='text-sm text-gray-400 font-notoKufiArabic-light text-center mt-2'>
          يبدو أنه لم يتم إضافة أي منتجات حتى الآن
        </Text>
      </View>
    </View>
  )
}

export default NoProductsMessage
