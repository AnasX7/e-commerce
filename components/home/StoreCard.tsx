import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import type { StoreCardType } from '@/components/home/Stores'

type StoresProps = {
  item: StoreCardType
  onPress: (item: StoreCardType) => void
}

const StoreCard = ({ item, onPress }: StoresProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.8}>
      <View className='w-20 h-20 rounded-xl overflow-hidden shadow-sm'>
        <Image
          source={item.imageURL}
          contentFit='cover'
          style={{ width: '100%', height: '100%' }}
          transition={300}
        />
      </View>
      <View className='items-center mt-1'>
        <Text
          className='text-xs font-notoKufiArabic-semiBold leading-relaxed text-center text-gray-800'
          numberOfLines={1}
          ellipsizeMode='tail'>
          {item.name}
        </Text>
        {item.productsCount && (
          <Text className='text-xs font-notoKufiArabic leading-relaxed text-gray-500'>
            {item.productsCount} منتج
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default StoreCard
