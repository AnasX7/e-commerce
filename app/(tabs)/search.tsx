import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const search = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>search</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default search
