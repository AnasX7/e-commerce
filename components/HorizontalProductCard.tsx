import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ProductItem } from '@/types/product'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useProduct } from '@/hooks/useProduct'
import AuthModal from '@/components/AuthModal'

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

type ProductProps = {
  item: ProductItem
}

const HorizontalProductCard = ({ item }: ProductProps) => {
  const {
    scale,
    handleCardPress,
    handleLikePress,
    calculateDiscountedPrice,
    showAuthModal,
    setShowAuthModal,
    getImageUrl,
    isLiked,
  } = useProduct({ item: item })

  const imageURL = getImageUrl()

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <>
      <TouchableOpacity
        onPress={handleCardPress}
        activeOpacity={0.9}
        style={{ marginHorizontal: 8, marginBottom: 8 }}>
        <View className='flex-row-reverse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200'>
          {/* Left: Product Image */}
          <View className='relative w-44 h-52'>
            <Image
              source={{ uri: imageURL }}
              contentFit='cover'
              style={{ width: '100%', height: '100%' }}
              transition={300}
            />
            {/* Rating Badge */}
            <View className='absolute top-2 right-2 flex-row items-center gap-1 bg-white shadow px-2 py-1 rounded-full'>
              <Text className='text-xs font-extrabold text-gray-600'>
                {item.averageRating ? item.averageRating.toFixed(1) : '0.0'}
              </Text>
              <Text className='text-amber-500'>★</Text>
            </View>
          </View>

          {/* Right: Product Details and Actions */}
          <View className='flex-1 py-5 px-4'>
            {/* Top Section with Store Name and Like Button */}
            <View className='flex-row items-start justify-between mb-2'>
              <Text
                className='text-xs text-left font-notoKufiArabic text-gray-500 flex-1'
                numberOfLines={1}
                ellipsizeMode='tail'>
                {item.storeName}
              </Text>
            </View>

            {/* Product Name */}
            <Text
              className='text-sm text-left font-notoKufiArabic-bold text-gray-800 mb-3'
              numberOfLines={2}
              ellipsizeMode='tail'>
              {item.name}
            </Text>

            {/* Discount Badge */}
            {item.discount > 0 && (
              <View className='bg-red-50 self-start px-2 py-1 rounded-full mb-3'>
                <Text className='text-xs font-notoKufiArabic-bold text-red-500'>
                  خصم %{item.discount}
                </Text>
              </View>
            )}

            {/* Price Section */}
            <View className='flex-row justify-between mt-auto'>
              {item.discount > 0 ? (
                <View className='space-y-1'>
                  <Text className='text-base font-notoKufiArabic-bold text-red-500'>
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
                <Text className='text-base font-notoKufiArabic-bold text-blue-600'>
                  {item.price}{' '}
                  {item.currency === 'AED'
                    ? 'د.إ'
                    : item.currency === 'SAR'
                    ? 'ر.س'
                    : 'ر.ي'}
                </Text>
              )}
              {/* Like Button */}
              <View className='w-9 h-9 rounded-lg shadow bg-white items-center justify-center'>
                <TouchableOpacity
                  onPress={handleLikePress}
                  hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <AnimatedIcon
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isLiked ? '#ef4444' : '#9ca3af'}
                    style={animatedStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
    </>
  )
}

export default HorizontalProductCard
