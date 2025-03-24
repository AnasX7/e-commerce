import { View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const StoreHeader = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View
      className='absolute left-0 right-0 z-10 px-4'
      style={{ paddingTop: insets.top + 8 }} 
    >
      <TouchableOpacity
        onPress={() => router.back()}
        className='w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm'
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name='chevron-forward' size={24} color='#374151' />
      </TouchableOpacity>
    </View>
  )
}

export default StoreHeader
