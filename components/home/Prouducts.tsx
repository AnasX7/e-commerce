import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useCallback } from 'react'
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

type ProductsProps = {
  title?: string
  onLikePress?: (product: StoreProducts, isLiked: boolean) => void
  isLoading?: boolean
  productsData?: StoreProducts[]
}

const Prouducts = ({
  title = 'منتجات',
  isLoading = false,
  productsData = SAMPLE_PRODUCTS,
}: ProductsProps) => {
  const router = useRouter()

  const handleItemPress = useCallback(
    (item: StoreProducts) => {
      router.push({
        pathname: '/product/[id]',
        params: { id: item.id },
      })
    },
    [router]
  )

  const renderItem = useCallback(
    ({ item }: { item: StoreProducts }) => (
      <ProductCard item={item} onPress={handleItemPress} />
    ),
    [handleItemPress]
  )

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
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName='py-2 px-2 gap-3'
        />
      ) : (
        <NotFound message='لا توجد منتجات متاحة' />
      )}
    </View>
  )
}

export default Prouducts
