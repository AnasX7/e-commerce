import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const account = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>account</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default account
