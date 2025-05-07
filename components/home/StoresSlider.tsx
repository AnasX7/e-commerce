import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import StoreCard from '@/components/home/StoreCard'
import { StoreCardType } from '@/types/store'

type StoresProps = {
  title: string
  data: StoreCardType[]
}

const StoresSlider = ({ title, data }: StoresProps) => {
  const router = useRouter()

  const handleStorePress = (store: StoreCardType) => {
    router.push({
      pathname: '/store/[storeId]',
      params: { storeId: store.id },
    })
  }

  const renderItem = ({ item }: LegendListRenderItemProps<StoreCardType>) => (
    <StoreCard key={item.id} item={item} onPress={handleStorePress} />
  )

  return (
    <View className='my-3'>
      <View className='flex-row justify-between items-center px-4 mb-2'>
        <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-gray-800'>
          {title}
        </Text>
        {/* <TouchableOpacity onPress={}>
          <Text className='text-sm px-3 py-2 bg-primary font-notoKufiArabic-semiBold leading-relaxed text-white text-center rounded-md'>
            عرض الكل
          </Text>
        </TouchableOpacity> */}
      </View>
      <LegendList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() ?? `store-${Math.random()}`}
        recycleItems
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 96 }}
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 8,
          paddingVertical: 8,
          gap: 8,
        }}
      />
    </View>
  )
}

export default StoresSlider
