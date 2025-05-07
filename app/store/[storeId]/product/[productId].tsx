import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import Carousel from 'react-native-reanimated-carousel'
import { Image } from 'expo-image'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useQuery } from '@tanstack/react-query'
import { fetchProductDetails } from '@/services/product'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import { Product } from '@/types/product'
import { useFullPath } from '@/hooks/useFullPath'
import { ProductDetailsSkeleton } from '@/components/skeletons/ProductDetailsSkeleton'
import { useAuth } from '@/hooks/useAuth'
import { useProduct } from '@/hooks/useProduct'
import { useCart } from '@/hooks/useCart'
import AuthModal from '@/components/AuthModal'
import { MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

const ProductDetailScreen = () => {
  const { storeId, productId } = useLocalSearchParams<{
    storeId: string
    productId: string
  }>()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [shouldAnimateCart, setShouldAnimateCart] = useState(false)
  const [showCartAuthModal, setShowCartAuthModal] = useState(false)

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductDetails(+storeId, productId),
  })

  const {
    showAuthModal,
    setShowAuthModal,
    handleLikePress,
    isLiked,
    scale,
    calculateDiscountedPrice,
  } = useProduct({ item: product })

  const { isAuthenticated } = useAuth({
    middleware: 'guest',
  })

  const { addToCart, isAddingToCart, count } = useCart({
    storeId: +storeId,
  })

  const prevTotalItems = useRef(count)

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content')
  })

  useEffect(() => {
    if (count > prevTotalItems.current) {
      setShouldAnimateCart(true)
      setTimeout(() => setShouldAnimateCart(false), 300)
    }
    prevTotalItems.current = count
  }, [count])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99))
  }

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowCartAuthModal(true)
      return
    }
    addToCart({ productId, quantity })
  }

  if (isLoading || !product) {
    return <ProductDetailsSkeleton />
  }

  return (
    <>
      {/* Header */}
      <View className='pt-safe-offset-2 backdrop-blur-md'>
        <View className='px-4 pb-3 flex-row justify-between items-center'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name='chevron-forward'
              size={24}
              color={Colors.text.primary}
            />
          </TouchableOpacity>
          <View className='flex-row-reverse items-center gap-4'>
            <TouchableOpacity
              onPress={handleLikePress}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <AnimatedIcon
                name={isLiked ? 'heart' : 'heart-outline'}
                size={24}
                color={isLiked ? '#ef4444' : Colors.text.primary}
                style={animatedStyle}
              />
            </TouchableOpacity>
            {isAuthenticated && (
              <TouchableOpacity
                onPress={() => router.push(`/store/${storeId}/cart`)}>
                <MotiView
                  animate={{ scale: shouldAnimateCart ? [1, 1.2, 1] : 1 }}
                  transition={{
                    type: 'timing',
                    duration: 300,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  }}
                  key={`cart-${count}`}>
                  <View className='flex-row items-center justify-end'>
                    {count > 0 && (
                      <MotiView
                        from={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}>
                        <Text className='text-gray-800 text-sm font-notoKufiArabic-bold leading-relaxed mr-1'>
                          {count}
                        </Text>
                      </MotiView>
                    )}
                    <Ionicons
                      name='cart-outline'
                      size={26}
                      color={Colors.text.primary}
                    />
                  </View>
                </MotiView>
              </TouchableOpacity>
            )}
          </View>
          <AuthModal
            visible={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            icon={{
              name: 'heart-outline',
              size: 40,
              color: '#EF4444',
            }}
            title='تسجيل الدخول مطلوب'
            message='يجب تسجيل الدخول لإضافة المنتج إلى المفضلة'
          />
        </View>
      </View>

      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Carousel */}
        <View className='relative aspect-square overflow-hidden'>
          <Carousel
            autoPlayInterval={4000}
            loop
            pagingEnabled={true}
            autoPlay={true}
            autoPlayReverse={true}
            snapEnabled={true}
            width={width}
            height={width}
            data={product.images}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image
                source={{ uri: useFullPath(item) }}
                style={{ width: '100%', height: '100%' }}
                contentFit='cover'
                transition={1000}
              />
            )}
          />
        </View>

        {/* Product Info */}
        <View className='relative px-4 py-4'>
          <TouchableOpacity
            onPress={() => router.push(`/store/${storeId}`)}
            className='flex-row items-center gap-x-1'>
            <Text className='text-base font-notoKufiArabic-semiBold leading-loose text-primary'>
              {product.storeName}
            </Text>
          </TouchableOpacity>
          <Text className='text-2xl text-left font-notoKufiArabic-bold text-gray-900 mt-1'>
            {product.name}
          </Text>
          <Text
            className='text-sm text-left font-notoKufiArabic leading-loose text-gray-600'
            ellipsizeMode='tail'
            numberOfLines={2}>
            {product.description}
          </Text>
          {/* Rating */}
          <View className='absolute top-4 right-4 w-16 flex-row justify-center items-center gap-1 bg-white py-1 rounded-full'>
            <Text className='text-lg font-extrabold text-gray-600'>
              {product.averageRating ? product.averageRating.toFixed(1) : '0.0'}
            </Text>
            <Text className='text-amber-500 text-lg'>★</Text>
          </View>
        </View>

        {/* Product Price */}
        <View className='flex-1 px-4'>
          <View className='flex-row justify-between items-start '>
            {product.discount > 0 ? (
              <View className='flex-1 flex-row justify-between items-center'>
                <View className='flex-row items-center gap-2'>
                  <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-red-500'>
                    {calculateDiscountedPrice()}{' '}
                    {product.currency === 'AED'
                      ? 'د.إ'
                      : product.currency === 'SAR'
                      ? 'ر.س'
                      : 'ر.ي'}
                  </Text>
                  <Text className='text-base font-notoKufiArabic-light leading-loose text-gray-500 line-through'>
                    {product.price}{' '}
                    {product.currency === 'AED'
                      ? 'د.إ'
                      : product.currency === 'SAR'
                      ? 'ر.س'
                      : 'ر.ي'}
                  </Text>
                </View>
                <View className='bg-red-50 px-2 py-1 rounded-full mb-2'>
                  <Text className='text-base font-notoKufiArabic-bold leading-loose text-red-500'>
                    خصم {product.discount}%
                  </Text>
                </View>
              </View>
            ) : (
              <Text className='text-2xl font-notoKufiArabic-bold text-blue-600'>
                {product.price}{' '}
                {product.currency === 'AED'
                  ? 'د.إ'
                  : product.currency === 'SAR'
                  ? 'ر.س'
                  : 'ر.ي'}
              </Text>
            )}
          </View>

          {/* Color and Size Selection */}
          {product.color && (
            <View className='mt-2'>
              <Text className='text-base text-left font-notoKufiArabic-semiBold leading-loose text-gray-800 mb-2'>
                اللون
              </Text>
              <View
                className='w-10 h-10 border-2 border-gray-300 rounded-full'
                style={{ backgroundColor: product.color }}
              />
            </View>
          )}

          {product.sizes.length > 0 && (
            <View className='mt-6'>
              <Text className='text-base text-left font-notoKufiArabic-semiBold leading-loose text-gray-800 mb-2'>
                المقاسات
              </Text>
              <View className='flex-row flex-wrap gap-2'>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    className='px-4 py-2 border border-gray-200 rounded-lg'>
                    <Text className='font-notoKufiArabic text-gray-800'>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Specifications */}
          <View className='mt-6'>
            <Text className='text-base text-left font-notoKufiArabic-semiBold leading-loose text-gray-800 mb-2'>
              المواصفات
            </Text>
            <Text className='font-notoKufiArabic-light text-gray-600 text-left leading-6'>
              {product.spescifications}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <MotiView
        from={{ translateY: 100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 300 }}
        className='h-24 px-4 mb-safe justify-center items-center border-t border-t-gray-200'>
        <View className='flex-row items-center gap-x-4'>
          {/* Quantity Controls */}
          <View className='flex-row items-center bg-gray-100 rounded-xl overflow-hidden'>
            <TouchableOpacity
              onPress={handleDecrement}
              className='p-3 active:bg-gray-200'>
              <Ionicons name='remove' size={20} color={Colors.text.primary} />
            </TouchableOpacity>

            <MotiView
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                type: 'timing',
                duration: 300,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              }}
              key={`quantity-${quantity}`}>
              <Text className='w-12 text-center text-lg font-notoKufiArabic-bold'>
                {quantity}
              </Text>
            </MotiView>

            <TouchableOpacity
              onPress={handleIncrement}
              className='p-3 active:bg-gray-200'>
              <Ionicons name='add' size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            className='flex-1 flex-row items-center justify-center gap-x-2 bg-secondary py-4 rounded-2xl active:opacity-90'
            onPress={handleAddToCart}>
            {isAddingToCart ? (
              <ActivityIndicator size='small' color='white' />
            ) : (
              <>
                <Text className='text-center text-white font-notoKufiArabic-bold'>
                  إضافة إلى السلة
                </Text>
                <Ionicons name='cart-outline' size={24} color='white' />
              </>
            )}
          </TouchableOpacity>
        </View>
      </MotiView>
      <AuthModal
        visible={showCartAuthModal}
        onClose={() => setShowCartAuthModal(false)}
        icon={{
          name: 'cart-outline',
          size: 44,
          color: Colors.primary,
        }}
        title='تسجيل الدخول مطلوب'
        message='يجب تسجيل الدخول لإضافة المنتج إلى السلة'
      />
    </>
  )
}

export default ProductDetailScreen
