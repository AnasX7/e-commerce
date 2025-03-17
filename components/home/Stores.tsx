import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import StoreCard from '@/components/home/StoreCard'
import NotFound from '@/components/home/NotFound'

const STORES_DATA: StoreCardType[] = [
  {
    id: '1',
    imageURL: 'https://picsum.photos/200/300',
    name: 'RH Home',
    productsCount: 324,
  },
  {
    id: '2',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Pottery Barn',
    productsCount: 156,
  },
  {
    id: '3',
    imageURL: 'https://picsum.photos/200/300',
    name: 'West Elm',
    productsCount: 218,
  },
  {
    id: '4',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192,
  },
  {
    id: '5',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192,
  },
  {
    id: '6',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192,
  },
  {
    id: '7',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192,
  },
  {
    id: '8',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192,
  },
]
export type StoreCardType = {
  id: string
  name: string
  imageURL: string
  productsCount?: number
}
interface StoresProps {
  title?: string
  isLoading?: boolean
  storesData?: StoreCardType[]
}

const Stores = ({
  title = 'المتاجر',
  isLoading = false,
  storesData = STORES_DATA,
}: StoresProps) => {
  const router = useRouter()

  const handleStorePress = (store: StoreCardType) => {
    router.push({
      pathname: '/store/[id]',
      params: { id: store.id },
    })
  }

  return (
    <View className='my-3'>
      <View className='flex-row justify-between items-center px-4 mb-2'>
        <Text className='text-lg font-notoKufiArabic-bold text-gray-800'>
          {title}
        </Text>
      </View>

      {isLoading ? (
        <View className='h-24 items-center justify-center'>
          <ActivityIndicator size='small' color='#3b82f6' />
        </View>
      ) : storesData.length > 0 ? (
        <FlatList
          data={storesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StoreCard item={item} onPress={handleStorePress} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName='py-2 px-2'
        />
      ) : (
        <NotFound message='لا توجد متاجر متاحة' />
      )}
    </View>
  )
}

export default Stores
