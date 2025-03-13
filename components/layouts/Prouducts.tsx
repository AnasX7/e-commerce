import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

interface Product {
  id: string
  name: string
  imageURL: string
  storeName: string
  rating: number
  price: number
  currency?: string
  isLiked?: boolean
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Leather Sofa',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'RH Home',
    rating: 4.8,
    price: 1299.99,
    currency: '$',
    isLiked: true,
  },
  {
    id: '2',
    name: 'Scandinavian Coffee Table',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'West Elm',
    rating: 4.5,
    price: 499.99,
    currency: '$',
    isLiked: false,
  },
  {
    id: '3',
    name: 'Minimalist Floor Lamp',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'Pottery Barn',
    rating: 4.2,
    price: 249.99,
    currency: '$',
    isLiked: false,
  },
  {
    id: '4',
    name: 'Wood Dining Chair',
    imageURL: 'https://picsum.photos/200/300',
    storeName: 'Crate & Barrel',
    rating: 4.7,
    price: 199.99,
    currency: '$',
    isLiked: true,
  },
]

interface ProductsProps {
  title?: string
  onLikePress?: (product: Product, isLiked: boolean) => void
  isLoading?: boolean
  productsData?: Product[]
}

const Prouducts = ({
  title = 'منتجات',
  onLikePress,
  isLoading = false,
  productsData = SAMPLE_PRODUCTS,
}: ProductsProps) => {
  const router = useRouter()
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>(
    Object.fromEntries(
      productsData.map((product) => [product.id, product.isLiked || false])
    )
  )

  const handleProductPress = useCallback(
    (product: Product) => {
      router.push({
        pathname: '/product/[id]',
        params: { id: product.id },
      })
    },
    [router]
  )

  const handleLikePress = useCallback(
    (product: Product) => {
      const newLikedState = !likedProducts[product.id]

      // Update local state
      setLikedProducts((prev) => ({
        ...prev,
        [product.id]: newLikedState,
      }))

      // Call the callback if provided
      if (onLikePress) {
        onLikePress(product, newLikedState)
      }
    },
    [likedProducts, onLikePress]
  )

  // Render the star rating
  const renderRating = (rating: number) => {
    return (
      <View className='flex-row items-center'>
        <Text className='text-amber-500'>★</Text>
        <Text className='text-xs text-gray-700 ml-1'>{rating.toFixed(1)}</Text>
      </View>
    )
  }

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item)}
      activeOpacity={0.9}
      className='mx-2 mb-1'>
      <View className='w-40 bg-white rounded-lg overflow-hidden shadow-sm'>
        {/* Product Image */}
        <View className='relative w-full h-48'>
          <Image
            source={item.imageURL}
            contentFit='cover'
            style={{ width: '100%', height: '100%' }}
            transition={300}
          />

          {/* Like Button */}
          <TouchableOpacity
            onPress={() => handleLikePress(item)}
            className='absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 items-center justify-center'
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            {/* <Heart
              size={18}
              color={likedProducts[item.id] ? '#ef4444' : '#9ca3af'}
              fill={likedProducts[item.id] ? '#ef4444' : 'none'}
            /> */}
            <Ionicons name='heart' size={18} color={'#ef4444'} />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View className='p-2'>
          {/* Store Name */}
          <Text
            className='text-xs text-right font-notoKufiArabic text-gray-500 mb-1'
            numberOfLines={1}
            ellipsizeMode='tail'>
            {item.storeName}
          </Text>

          {/* Product Name */}
          <Text
            className='text-sm text-right font-notoKufiArabic text-gray-800 mb-1'
            numberOfLines={1}
            ellipsizeMode='tail'>
            {item.name}
          </Text>

          {/* Price and Rating */}
          <View className='flex-row-reverse justify-between items-center mt-1'>
            <Text className='text-sm font-notoKufiArabic-bold text-blue-600'>
              {item.currency || '$'}
              {item.price.toFixed(2)}
            </Text>
            {renderRating(item.rating)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  // Empty state component
  const EmptyComponent = () => (
    <View className='items-center justify-center h-64 w-full'>
      <Text className='font-notoKufiArabic-semiBold text-gray-500'>
        لا توجد منتجات متاحة
      </Text>
    </View>
  )

  return (
    <View className='my-4'>
      {/* Section header */}
      <View className='flex-row-reverse justify-between items-center px-4 mb-2'>
        <Text className='text-lg font-notoKufiArabic-bold text-gray-800'>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: '/(tabs)/search',
            })
          }>
          <Text className='text-sm font-notoKufiArabic-semiBold text-blue-600'>
            عرض الكل
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products list */}
      {isLoading ? (
        <View className='h-64 items-center justify-center'>
          <ActivityIndicator size='small' color='#3b82f6' />
        </View>
      ) : (
        <FlashList
          data={productsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          estimatedItemSize={240}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName='py-2 px-2'
          ListEmptyComponent={EmptyComponent}
          inverted
        />
      )}
    </View>
  )
}

export default Prouducts
