import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StoreProducts } from '@/services/product'

const ProductCard = ({
  item,
  onLikePress,
}: {
  item: StoreProducts
  onLikePress?: (product: StoreProducts, isLiked: boolean) => void
}) => {
  const router = useRouter()
  // const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>(
  //   Object.fromEntries(
  //     productsData.map((product) => [product.id, product.isLiked || false])
  //   )
  // )

  const handleProductPress = useCallback(
    (product: StoreProducts) => {
      router.push({
        pathname: '/product/[id]',
        params: { id: product.id },
      })
    },
    [router]
  )

  // const handleLikePress = useCallback(
  //   (product: Product) => {
  //     const newLikedState = !likedProducts[product.id]

  //     // Update local state
  //     setLikedProducts((prev) => ({
  //       ...prev,
  //       [product.id]: newLikedState
  //     }))

  //     // Call the callback if provided
  //     if (onLikePress) {
  //       onLikePress(product, newLikedState)
  //     }
  //   },
  //   [likedProducts, onLikePress]
  // )

  // Render the star rating
  const renderRating = (rating: number) => {
    return (
      <View className='flex-row items-center'>
        <Text className='text-amber-500'>★</Text>
        <Text className='text-xs text-gray-700 ml-1'>{rating.toFixed(1)}</Text>
      </View>
    )
  }

  return (
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
            // onPress={() => handleLikePress(item)}
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
            {item.productName}
          </Text>

          {/* Price and Rating */}
          <View className='flex-row justify-between items-center mt-1'>
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
}

export default ProductCard
