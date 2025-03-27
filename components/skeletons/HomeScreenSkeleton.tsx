import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useEffect } from 'react'

const HomeScreenSkeleton = () => {
  const translateX = useSharedValue(-100)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(100, { duration: 1000 }),
      -1,
      false
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <View className='flex-1 pt-2 px-4 gap-6'>
      {/* Carousel Skeleton */}
      <View className='h-[200px] rounded-xl overflow-hidden bg-gray-200'>
        <Animated.View style={animatedStyle}>
          <LinearGradient
            colors={['transparent', '#rgba(255,255,255,0.3)', 'transparent']}
            className='absolute h-full w-[100px] skew-x-[45deg]'
          />
        </Animated.View>
      </View>

      {/* Stores Section Skeleton */}
      <View className='gap-4'>
        <View className='w-32 h-6 bg-gray-200 rounded-lg' />
        <View className='flex-row gap-4'>
          {[1, 2, 3].map((i) => (
            <View key={i} className='w-60 h-24 bg-gray-200 rounded-xl' />
          ))}
        </View>
      </View>

      {/* Products Section Skeleton */}
      {[1, 2].map((section) => (
        <View key={section} className='gap-4'>
          <View className='w-40 h-6 bg-gray-200 rounded-lg' />
          <View className='flex-row gap-4'>
            {[1, 2, 3].map((i) => (
              <View key={i} className='w-40 h-48 bg-gray-200 rounded-xl' />
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}

export default HomeScreenSkeleton
