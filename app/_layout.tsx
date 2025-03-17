import 'global.css'
import { I18nManager, Platform } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import * as Updates from 'expo-updates'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useOnlineManager } from '@/hooks/useOnlineManager'
import { useAppState } from '@/hooks/useAppState'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const shouldBeRTL = true

  useEffect(() => {
    if (Platform.OS !== 'web' && shouldBeRTL !== I18nManager.isRTL) {
      I18nManager.allowRTL(shouldBeRTL)
      I18nManager.forceRTL(shouldBeRTL)
      Updates.reloadAsync()
    }
  }, [])

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

  useOnlineManager();
  useAppState();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style='dark' />
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='search' />
        <Stack.Screen name='+not-found' options={{ title: 'Oops!' }} />
      </Stack>
    </QueryClientProvider>
  )
}

export default RootLayout
