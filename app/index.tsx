import {
  ActivityIndicator,
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/colors'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  FadeIn,
  FadeInDown
} from 'react-native-reanimated'

const WelcomeScreen = () => {
  const router = useRouter()
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(40)
  const [loading, setLoading] = useState(true)

  const handleContinue = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true')
    router.replace('/(auth)/auth')
  }

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome')
      if (hasSeenWelcome) {
        router.replace('/(tabs)/home')
      }
      setLoading(false)
    }

    if (Platform.OS === 'web') {
      router.replace('/(tabs)/home')
    }

    checkFirstLaunch()
  }, [])

  useEffect(() => {
    opacity.value = withDelay(300, withTiming(1, { duration: 1000 }))
    translateY.value = withDelay(300, withTiming(0, { duration: 800 }))
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }]
    }
  })

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        {/* Main container */}
        <View className="flex-1 justify-between">
          {/* Top content */}
          <Animated.View
            entering={FadeIn.delay(300).duration(1000)}
            className="flex-1 items-center justify-center pt-10"
          >
            <Image
              source={require('@/assets/images/welcome-illustration.png')}
              placeholder="L184i9kCbkj00aRa_NSj00ay_NMy"
              contentFit="contain"
              style={{ width: '100%', height: 288 }}
            />
          </Animated.View>

          {/* Bottom content */}
          <Animated.View style={animatedStyle} className="px-6 pb-12 pt-6">
            <Animated.Text
              entering={FadeInDown.delay(500).duration(800)}
              className="text-3xl font-notoKufiArabic-semiBold leading-normal text-gray-800 text-center mb-4"
            >
              مرحبًا بك في سلة
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.delay(700).duration(800)}
              className="text-base font-notoKufiArabic text-gray-600 text-center mb-10 px-6"
            >
              اكتشف آلاف المنتجات واحصل عليها عند باب منزلك في أي وقت من
              الأوقات.
            </Animated.Text>

            <TouchableOpacity
              onPress={handleContinue}
              className="w-full bg-primary py-4 rounded-xl shadow-sm active:bg-secondary"
              activeOpacity={0.8}
            >
              <Text className="text-white font-notoKufiArabic-semiBold leading-relaxed text-center text-lg">
                ابدء الآن
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default WelcomeScreen
