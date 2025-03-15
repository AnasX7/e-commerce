import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import { FlashList } from '@shopify/flash-list'
import { StoreProducts } from '@/service/product'
import ProductCard from '@/components/ProductCard'
import NotFound from './NotFound'

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
    isLiked: true
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
    isLiked: true
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
    isLiked: true
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
    isLiked: true
  }
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
  productsData = SAMPLE_PRODUCTS
}: ProductsProps) => {
  const router = useRouter()

  return (
    <View className="my-4">
      {/* Section header */}
      <View className="flex-row justify-between items-center px-4 mb-2">
        <Text className="text-lg font-notoKufiArabic-bold text-gray-800">
          {title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: '/(tabs)/search'
            })
          }
        >
          <Text className="text-sm font-notoKufiArabic-semiBold text-blue-600">
            عرض الكل
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products list */}
      {isLoading ? (
        <View className="h-64 items-center justify-center">
          <ActivityIndicator size="small" color="#3b82f6" />
        </View>
      ) : (
        <FlashList
          data={productsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} />}
          estimatedItemSize={240}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="py-2 px-2"
          ListEmptyComponent={<NotFound message="لا توجد منتجات متاحة" />}
        />
      )}
    </View>
  )
}

export default Prouducts
