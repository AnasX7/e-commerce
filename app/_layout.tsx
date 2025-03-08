import "global.css"
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
      <StatusBar style={'dark'} />
      <Stack>
        <Stack.Screen name='index' />
        <Stack.Screen name='+not-found' options={{ title: 'Oops!' }} />
      </Stack>
    </>
  )
}
