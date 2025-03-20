import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'

const AuthScreen = () => {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/(auth)/login')
  }

  const handleRegister = () => {
    router.push('/(auth)/register')
  }

  const handleSkip = () => {
    router.replace('/(tabs)/home')
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar barStyle='dark-content' backgroundColor='white' />

      <View className='flex-1 justify-between'>
        {/* Top content with image */}
        <Animated.View
          entering={FadeIn.delay(300).duration(1000)}
          className='flex-1 items-center justify-center'>
          <Image
            source={require('@/assets/images/login-illustration.png')}
            placeholder='L184i9kCbkj00aRa_NSj00ay_NMy'
            contentFit='contain'
            style={{ width: '100%', height: 288 }}
          />
        </Animated.View>

        {/* Bottom content with buttons */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(800)}
          className='px-6 pb-12 pt-6'>
          <Animated.Text
            entering={FadeInDown.delay(500).duration(800)}
            className='text-2xl font-notoKufiArabic-semiBold leading-loose text-gray-800 text-center mb-2'>
            رحلة التسوق الخاصة بك تبدأ
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(700).duration(800)}
            className='text-base font-notoKufiArabic text-gray-600 text-center mb-10'>
            قم بتسجيل الدخول للوصول إلى حسابك {'\n'}أو إنشاء حساب جديد
          </Animated.Text>

          {/* Login button */}
          <Animated.View
            entering={FadeInDown.delay(800).duration(800)}
            className='mb-4'>
            <TouchableOpacity
              onPress={handleLogin}
              className='w-full bg-primary py-3 rounded-xl shadow-sm active:bg-secondary'
              activeOpacity={0.8}>
              <Text className='text-white font-notoKufiArabic-semiBold text-center'>
                تسجيل الدخول
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Register button */}
          <Animated.View
            entering={FadeInDown.delay(900).duration(800)}
            className='mb-6'>
            <TouchableOpacity
              onPress={handleRegister}
              className='w-full bg-white py-3 rounded-xl border border-gray-300 active:bg-gray-100'
              activeOpacity={0.8}>
              <Text className='text-gray-800 font-notoKufiArabic-semiBold text-center '>
                إنشاء حساب
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Skip for now */}
          <Animated.View
            entering={FadeInDown.delay(1000).duration(800)}
            className='items-center'>
            <TouchableOpacity
              onPress={handleSkip}
              className='px-4 py-1'
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text className='text-gray-500 font-notoKufiArabic'>
                ربما في وقت لاحق
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

export default AuthScreen
