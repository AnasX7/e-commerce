import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { CartItem } from '@/types/cart'
import { Colors } from '@/constants/colors'
import { useProduct } from '@/hooks/useProduct'

type CartItemCardProps = {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

const CartItemCard = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) => {
  const { getImageUrl, calculateDiscountedPrice } = useProduct({ item })

  const imageURL = getImageUrl()

  const handleIncrement = () => {
    onUpdateQuantity(item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1)
    }
  }

  return (
    <View className='flex-row gap-4 p-4 bg-white rounded-2xl border border-gray-100'>
      <View className='h-24 w-24 rounded-lg overflow-hidden'>
        <Image
          source={{ uri: imageURL }}
          style={{ width: '100%', height: '100%' }}
          resizeMode='cover'
        />
      </View>

      <View className='flex-1 flex-row gap-2 justify-between'>
        <View className='flex-1 justify-between'>
          <View>
            <Text className='font-notoKufiArabic-bold text-left text-gray-900 mb-1'>
              {item.name}
            </Text>
            <Text className='font-notoKufiArabic text-left text-gray-600 text-sm'>
              {item.storeName}
            </Text>
          </View>
          <View className='items-start'>
            {item.discount > 0 ? (
              <View className='flex-row items-center gap-x-2'>
                <Text className='text-sm font-notoKufiArabic-bold text-red-500'>
                  {calculateDiscountedPrice() * item.quantity}{' '}
                  {item.currency === 'AED'
                    ? 'د.إ'
                    : item.currency === 'SAR'
                    ? 'ر.س'
                    : 'ر.ي'}
                </Text>
                <Text className='text-xs font-notoKufiArabic line-through text-gray-400'>
                  {item.price * item.quantity}{' '}
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

        <View className='justify-between items-end'>
          <TouchableOpacity
            onPress={onRemove}
            className='p-2 rounded-lg bg-gray-100'>
            <Ionicons
              name='trash-outline'
              size={18}
              color={Colors.text.primary}
            />
          </TouchableOpacity>
          <View className='flex-row items-center gap-2'>
            <TouchableOpacity
              onPress={handleDecrement}
              className='p-2 rounded-full bg-gray-100'>
              <Ionicons name='remove' size={18} color={Colors.text.primary} />
            </TouchableOpacity>

            <Text className='font-notoKufiArabic-bold min-w-[24px] text-center'>
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={handleIncrement}
              className='p-2 rounded-full bg-gray-100'>
              <Ionicons name='add' size={18} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartItemCard
