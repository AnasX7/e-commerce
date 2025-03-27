import 'global.css'
import { I18nManager, Platform } from 'react-native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import * as Updates from 'expo-updates'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { useOnlineManager } from '@/hooks/useOnlineManager'
import { useAppState } from '@/hooks/useAppState'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      // staleTime: 1000 * 60 * 2, // 2 minutes
      // gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnReconnect: true,
    },
  },
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

export default function RootLayout() {
  const shouldBeRTL = true

  useOnlineManager()
  useAppState()

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

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        {/* <KeyboardProvider> */}
        <StatusBar style='dark' />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='(auth)' />
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='(orders)' options={{ headerShown: true }} />
          <Stack.Screen name='(settings)' />
          <Stack.Screen name='(search)' options={{ headerShown: true }} />
          <Stack.Screen name='store/[storeId]' />
          <Stack.Screen name='+not-found' />
        </Stack>
        {/* </KeyboardProvider> */}
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
