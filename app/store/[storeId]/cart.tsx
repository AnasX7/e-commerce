import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const CartScreen = () => {
  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default CartScreen
