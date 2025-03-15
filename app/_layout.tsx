import 'global.css'
import { I18nManager, Platform } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import * as Updates from 'expo-updates'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const shouldBeRTL = false

  if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
    I18nManager.allowRTL(shouldBeRTL)
    I18nManager.forceRTL(shouldBeRTL)
    Updates.reloadAsync()
  }

  const [fontsLoaded] = useFonts({
    'NotoKufiArabic-Light': require('../assets/fonts/NotoKufiArabic-Light.ttf'),
    'NotoKufiArabic-Regular': require('../assets/fonts/NotoKufiArabic-Regular.ttf'),
    'NotoKufiArabic-SemiBold': require('../assets/fonts/NotoKufiArabic-SemiBold.ttf'),
    'NotoKufiArabic-Bold': require('../assets/fonts/NotoKufiArabic-Bold.ttf'),
    'NotoKufiArabic-ExtraBold': require('../assets/fonts/NotoKufiArabic-ExtraBold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <>
      <StatusBar style='dark' />
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(onboard)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' options={{ title: 'Oops!' }} />
      </Stack>
    </>
  )
}
