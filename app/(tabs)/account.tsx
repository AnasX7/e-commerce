import { View, Text, StatusBar } from 'react-native'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const AccountScreen = () => {
  useFocusEffect(
      useCallback(() => {
        StatusBar.setBarStyle('dark-content')
      }, [])
    )
    
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>account</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AccountScreen
