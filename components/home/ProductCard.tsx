import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ProductItem } from '@/types/product'
import { useFullPath } from '@/hooks/useFullPath'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  removeProductFromFavorites,
  setProductToFavirotes,
} from '@/services/favorites'
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

type ProductProps = {
  item: ProductItem
}

const ProductCard = ({ item }: ProductProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const imageURL = useFullPath(item.image)
  const scale = useSharedValue(1)

  // Add to favorites mutation
  const { mutate: addToFavorites } = useMutation({
    mutationFn: () => setProductToFavirotes(item.productID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  // Remove from favorites mutation
  const { mutate: removeFromFavorites } = useMutation({
    mutationFn: () => removeProductFromFavorites(item.productID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  const handleCardPress = useCallback(
    (item: ProductItem) => {
      router.push({
        pathname: '/store/[storeId]/product/[productId]',
        params: { storeId: item.storeName, productId: item.productID },
      })
    },
    [router]
  )

  const handleLikePress = useCallback(() => {
    // Animate heart icon
    scale.value = withSequence(withSpring(1.2), withSpring(1))

    if (item.isLiked) {
      removeFromFavorites()
    } else {
      addToFavorites()
    }
  }, [item.isLiked])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const calculateDiscountedPrice = () => {
    if (!item.discount) return item.price
    const discount = (item.price * item.discount) / 100
    return item.price - discount
  }

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
      activeOpacity={0.9}
      className='mx-2 mb-2'>
      <View className='w-44 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200'>
        {/* Product Image */}
        <View className='relative w-full h-52'>
          <Image
            source={{ uri: item.image }}
            contentFit='cover'
            style={{ width: '100%', height: '100%' }}
            transition={300}
          />

          {/* Top Actions Bar */}
          <View className='absolute top-2 right-2 left-2 flex-row-reverse justify-between items-center '>
            {/* Like Button */}
            <View className='w-9 h-9 rounded-lg shadow bg-white items-center justify-center'>
              <TouchableOpacity
                onPress={handleLikePress}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <AnimatedIcon
                  name={item.isLiked ? 'heart' : 'heart-outline'}
                  size={18}
                  color={item.isLiked ? '#ef4444' : '#9ca3af'}
                  style={animatedStyle}
                />
              </TouchableOpacity>
            </View>

            {/* Rating */}
            <View className='flex-row-reverse items-center gap-1 bg-white shadow px-2 py-1 rounded-full'>
              <Text className='text-amber-500'>★</Text>
              <Text className='text-xs font-extrabold text-gray-600'>
                {item.averageRating}
              </Text>
            </View>
          </View>

          {/* Discount Badge */}
          {item.discount > 0 && (
            <View className='absolute bottom-2 left-2 bg-red-500 px-2 py-1 rounded-full'>
              <Text className='text-white text-xs font-notoKufiArabic-bold leading-relaxed'>
                خصم %{item.discount}
              </Text>
            </View>
          )}
        </View>

        {/* Product Details */}
        <View className='p-3'>
          {/* Store Name */}
          <Text
            className='text-xs text-left font-notoKufiArabic text-gray-500 mb-1'
            numberOfLines={1}
            ellipsizeMode='tail'>
            {item.storeName}
          </Text>

          {/* Product Name */}
          <Text
            className='text-sm text-left font-notoKufiArabic text-gray-800 mb-2'
            numberOfLines={2}
            ellipsizeMode='tail'>
            {item.name}
          </Text>

          {/* Price Section */}
          <View className='items-start'>
            {item.discount > 0 ? (
              <View className='flex-row items-center gap-x-2'>
                <Text className='text-sm font-notoKufiArabic-bold text-red-500'>
                  {calculateDiscountedPrice()}{' '}
                  {item.currency === 'AED'
                    ? 'د.إ'
                    : item.currency === 'SAR'
                    ? 'ر.س'
                    : 'ر.ي'}
                </Text>
                <Text className='text-xs font-notoKufiArabic line-through text-gray-400'>
                  {item.price}{' '}
                  {item.currency === 'AED'
                    ? 'د.إ'
                    : item.currency === 'SAR'
                    ? 'ر.س'
                    : 'ر.ي'}
                </Text>
              </View>
            ) : (
              <Text className='text-sm font-notoKufiArabic-bold text-blue-600'>
                {item.price}{' '}
                {item.currency === 'AED'
                  ? 'د.إ'
                  : item.currency === 'SAR'
                  ? 'ر.س'
                  : 'ر.ي'}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard
