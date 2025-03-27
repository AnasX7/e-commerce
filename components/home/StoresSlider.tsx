import { View, Text, FlatList } from 'react-native'
import { useCallback } from 'react'
import { useRouter } from 'expo-router'
import StoreCard from '@/components/home/StoreCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StoreCardType } from '@/types/store'

type StoresProps = {
  title: string
  data: StoreCardType[]
}

const StoresSlider = ({ title, data }: StoresProps) => {
  const router = useRouter()

  const handleStorePress = useCallback(
    (store: StoreCardType) => {
      router.push({
        pathname: '/store/[storeId]',
        params: { storeId: store.id },
      })
    },
    [router]
  )

  const renderItem = useCallback(
    ({ item }: { item: StoreCardType }) => (
      <StoreCard key={item.id} item={item} onPress={handleStorePress} />
    ),
    [handleStorePress]
  )

  return (
    <View className='my-3'>
      <View className='flex-row justify-between items-center px-4 mb-2'>
        <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-gray-800'>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/(search)/stores',
              params: { title },
            })
          }>
          <Text className='text-sm px-3 py-2 bg-primary font-notoKufiArabic-semiBold leading-relaxed text-white text-center rounded-md'>
            عرض الكل
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id?.toString() ?? `store-${Math.random()}`}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='w-full py-2 px-2 gap-3'
      />
    </View>
  )
}

export default StoresSlider
