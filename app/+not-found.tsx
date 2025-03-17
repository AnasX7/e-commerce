import { Link } from 'expo-router'
import { View, Text } from 'react-native'

const NotFoundScreen = () => {
  return (
    <>
      <View>
        <Text>This screen doesn't exist.</Text>

        <Link href='/'>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

export default NotFoundScreen
