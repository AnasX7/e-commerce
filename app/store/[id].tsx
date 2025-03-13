import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const Store = () => {
  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default Store
