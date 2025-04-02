'use dom'

import { useProduct } from '@/hooks/useProduct'
import AuthModal from '@/components/AuthModal'
import { ProductItem } from '@/types/product'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { cn } from '@/lib/utils'

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

type ProductProps = {
  item: ProductItem
}

const ProductCard = ({ item }: ProductProps) => {
  const {
    scale,
    handleCardPress,
    handleLikePress,
    calculateDiscountedPrice,
    showAuthModal,
    setShowAuthModal,
    getImageUrl,
    isLiked,
  } = useProduct({ item })

  const imageURL = getImageUrl()

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <>
      <article
        onClick={handleCardPress}
        role='button'
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleCardPress()}
        className={cn(
          'mx-2 mb-2 w-44 bg-white rounded-xl overflow-hidden shadow-sm',
          'border border-gray-200 transition-transform hover:scale-[1.02]',
          'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary'
        )}>
        <div className='relative w-full h-52'>
          <Image
            source={{ uri: imageURL }}
            contentFit='cover'
            className='w-full h-full'
            transition={300}
          />

          {/* Top Actions Bar */}
          <div className='absolute top-2 right-2 left-2 flex justify-between items-center'>
            {/* Rating */}
            <div className='flex items-center gap-1 bg-white shadow px-2 py-1 rounded-full'>
              <span className='text-amber-500'>★</span>
              <span className='text-xs font-bold text-gray-600'>
                {item.averageRating?.toFixed(1) || '0.0'}
              </span>
            </div>

            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleLikePress()
              }}
              className={cn(
                'w-9 h-9 rounded-lg shadow bg-white flex items-center justify-center',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary'
              )}
              aria-label={
                isLiked ? 'Remove from favorites' : 'Add to favorites'
              }>
              <AnimatedIcon
                name={isLiked ? 'heart' : 'heart-outline'}
                size={18}
                color={isLiked ? '#ef4444' : '#9ca3af'}
                style={animatedStyle}
              />
            </button>
          </div>

          {/* Discount Badge */}
          {item.discount > 0 && (
            <div className='absolute bottom-2 left-2 bg-red-500 px-2 py-1 rounded-full'>
              <span className='text-white text-xs font-bold leading-relaxed'>
                خصم %{item.discount}
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className='p-3'>
          <h3
            className='text-xs text-gray-500 mb-1 font-medium truncate'
            title={item.storeName}>
            {item.storeName}
          </h3>

          <h2
            className='text-sm text-gray-800 mb-2 font-medium line-clamp-2'
            title={item.name}>
            {item.name}
          </h2>

          <div className='flex flex-col items-start'>
            {item.discount > 0 ? (
              <div className='flex items-baseline gap-2'>
                <span className='text-sm font-bold text-red-500'>
                  {calculateDiscountedPrice()}
                  <CurrencySymbol currency={item.currency} />
                </span>
                <span className='text-xs text-gray-400 line-through'>
                  {item.price}
                  <CurrencySymbol currency={item.currency} />
                </span>
              </div>
            ) : (
              <span className='text-sm font-bold text-blue-600'>
                {item.price}
                <CurrencySymbol currency={item.currency} />
              </span>
            )}
          </div>
        </div>
      </article>

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

const CurrencySymbol = ({ currency }: { currency: string }) => {
  const symbols = {
    AED: 'د.إ',
    SAR: 'ر.س',
    YER: 'ر.ي',
  }

  return <span> {symbols[currency as keyof typeof symbols] || currency}</span>
}

export default ProductCard
