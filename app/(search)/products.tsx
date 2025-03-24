import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

const searchScreen = () => {
  const params = useLocalSearchParams()

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>{params.title}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default searchScreen
