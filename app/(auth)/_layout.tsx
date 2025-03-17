import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const OnboardingLayout = () => {
  return (
    <>
      <StatusBar style='dark' />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'white',
          },
        }}>
          <Stack.Screen name='login' options={{ presentation:'modal', headerShown: Platform.OS === 'ios' && true }} />
          <Stack.Screen name='register' options={{ presentation:'modal', headerShown: Platform.OS === 'ios' && true}} />
        </Stack>
    </>
  )
}

export default OnboardingLayout
