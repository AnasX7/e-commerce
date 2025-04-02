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
          'flex group bg-white rounded-xl overflow-hidden shadow-sm',
          'border border-gray-200 transition-transform hover:scale-[1.02]',
          'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary',
          'mx-2 mb-2 w-full min-h-[208px]' // 208px = h-52
        )}>
        <div className='flex flex-row-reverse h-full'>
          {/* Image Section */}
          <div className='relative w-44 h-52 flex-shrink-0'>
            <Image
              source={{ uri: imageURL }}
              contentFit='cover'
              className='w-full h-full'
              transition={300}
            />

            {/* Rating Badge */}
            <div className='absolute top-2 right-2 flex items-center gap-1 bg-white shadow px-2 py-1 rounded-full'>
              <span className='text-xs font-bold text-gray-600'>
                {item.averageRating?.toFixed(1) || '0.0'}
              </span>
              <span className='text-amber-500'>★</span>
            </div>
          </div>

          {/* Details Section */}
          <div className='flex-1 p-5 flex flex-col justify-between'>
            {/* Store Name */}
            <h3
              className='text-xs text-gray-500 font-medium truncate'
              title={item.storeName}>
              {item.storeName}
            </h3>

            {/* Product Name */}
            <h2
              className='text-sm text-gray-800 font-bold mb-3 line-clamp-2'
              title={item.name}>
              {item.name}
            </h2>

            {/* Discount Badge */}
            {item.discount > 0 && (
              <div className='bg-red-50 self-start px-2 py-1 rounded-full mb-3'>
                <span className='text-xs font-bold text-red-500'>
                  خصم %{item.discount}
                </span>
              </div>
            )}

            {/* Price and Actions */}
            <div className='flex justify-between items-end'>
              <div className='space-y-1'>
                {item.discount > 0 ? (
                  <>
                    <span className='text-base font-bold text-red-500'>
                      {calculateDiscountedPrice()}
                      <CurrencySymbol currency={item.currency} />
                    </span>
                    <span className='text-xs text-gray-400 line-through'>
                      {item.price}
                      <CurrencySymbol currency={item.currency} />
                    </span>
                  </>
                ) : (
                  <span className='text-base font-bold text-blue-600'>
                    {item.price}
                    <CurrencySymbol currency={item.currency} />
                  </span>
                )}
              </div>

              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleLikePress()
                }}
                className={cn(
                  'w-9 h-9 rounded-lg shadow bg-white flex items-center justify-center',
                  'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary',
                  'transition-colors duration-150'
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

export default HorizontalProductCard
