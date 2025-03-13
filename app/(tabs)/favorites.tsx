import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const favorites = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>favorites</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default favorites
