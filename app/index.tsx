import { Link } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const Index = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text className='font-notoKufiArabic-extraBold'>هلا ومرحبا</Text>
        <Link href='/(tabs)/home' asChild replace>
          <TouchableOpacity>
            <Text className='font-notoKufiArabic-bold'>التخطي</Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Index
