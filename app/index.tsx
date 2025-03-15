import { ActivityIndicator, View, Text, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '@/constants/colors'

const index = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome')
      if (!hasSeenWelcome) {
        router.replace('/(onboard)/auth')
      }
      setLoading(false)
      router.replace('/(onboard)/welcome')
    }

    if (Platform.OS === 'web') {
      router.replace('/(tabs)/home')
    }

    checkFirstLaunch()
  }, [])

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
}

export default index
