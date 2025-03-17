import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'

import { StoreProducts } from '@/services/product'
import ProductCard from '@/components/ProductCard'
import NotFound from '@/components/home/NotFound'

const SAMPLE_PRODUCTS: StoreProducts[] = [
  {
    id: '1',
    productName: 'Modern Leather Sofa',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'RH Home',
    rating: 4.8,
    price: 1299.99,
    currency: '$',
    category: 'Furniture',
    isLiked: true,
  },
  {
    id: '2',
    productName: 'Modern Leather Sofa',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'RH Home',
    rating: 4.8,
    price: 1299.99,
    currency: '$',
    category: 'Furniture',
    isLiked: true,
  },
  {
    id: '3',
    productName: 'Modern Leather Sofa',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'RH Home',
    rating: 4.8,
    price: 1299.99,
    currency: '$',
    category: 'Furniture',
    isLiked: true,
  },
  {
    id: '4',
    productName: 'Modern Leather Sofa',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'RH Home',
    rating: 4.8,
    price: 1299.99,
    currency: '$',
    category: 'Furniture',
    isLiked: true,
  },
]

interface ProductsProps {
  title?: string
  onLikePress?: (product: StoreProducts, isLiked: boolean) => void
  isLoading?: boolean
  productsData?: StoreProducts[]
}

const Prouducts = ({
  title = 'منتجات',
  onLikePress,
  isLoading = false,
  productsData = SAMPLE_PRODUCTS,
}: ProductsProps) => {
  const router = useRouter()

  return (
    <View className='my-4'>
      {/* Section header */}
      <View className='flex-row justify-between items-center px-4 mb-2'>
        <Text className='text-lg font-notoKufiArabic-bold text-gray-800'>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/search',
              params: { title },
            })
          }>
          <Text className='text-sm font-notoKufiArabic-semiBold text-primary'>
            عرض الكل
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products list */}
      {isLoading ? (
        <View className='h-64 items-center justify-center'>
          <ActivityIndicator size='small' color='#3b82f6' />
        </View>
      ) : productsData.length > 0 ? (
        <FlatList
          data={productsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName='py-2 px-2'
        />
      ) : (
        <NotFound message='لا توجد منتجات متاحة' />
      )}
    </View>
  )
}

export default Prouducts
