import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFullPath } from '@/hooks/useFullPath'
import { StoreCardType } from '@/types/store'

type StoresProps = {
  item: StoreCardType
  onPress: (item: StoreCardType) => void
}

const StoreCard = ({ item, onPress }: StoresProps) => {
  const imageURL = useFullPath(item.image)

  return (
    <View className='w-60 flex-row border border-gray-200 rounded-xl'>
      <TouchableOpacity
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => onPress(item)}
        activeOpacity={0.8}>
        <View className='w-24 h-24 rounded-l-lg overflow-hidden shadow-sm border-r border-r-gray-200'>
          <Image
            source={{ uri: imageURL }}
            contentFit='cover'
            style={{ width: '100%', height: '100%' }}
            transition={300}
          />
        </View>
        <View className='flex-1 justify-center pl-3'>
          <Text
            className='text-sm text-left font-notoKufiArabic-semiBold leading-relaxed text-gray-800'
            numberOfLines={1}
            ellipsizeMode='tail'>
            {item.name}
          </Text>

          <Text className='text-xs text-left font-notoKufiArabic leading-relaxed text-gray-500'>
            {item.productsCount} منتج
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default StoreCard
