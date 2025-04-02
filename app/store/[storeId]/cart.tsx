import { useState, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { useCart } from '@/hooks/useCart'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import { CartItem } from '@/types/cart'
import CartItemCard from '@/components/CartItemCard'

const CartScreen = () => {
  const { storeId } = useLocalSearchParams()
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    cartItems,
    isLoading,
    refetch,
    updateCartItem,
    removeFromCart,
    calculateTotal,
  } = useCart({ storeId: +storeId })

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  // Handle refresh
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } finally {
      setIsRefreshing(false)
    }
  }, [refetch])

  useRefreshOnFocus(onRefresh)

  // Render cart item
  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <CartItemCard
        item={item}
        onUpdateQuantity={(quantity) =>
          updateCartItem({ productId: item.productID, quantity })
        }
        onRemove={() => removeFromCart(item.productID)}
      />
    ),
    [updateCartItem, removeFromCart]
  )

  return (
    <View className='flex-1 pt-safe bg-white'>
      <View className='flex-row items-center justify-between p-4 border-b border-gray-200'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name='chevron-forward'
            size={24}
            color={Colors.text.primary}
          />
        </TouchableOpacity>
        <Text className='text-lg font-notoKufiArabic-bold'>سلة التسوق</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : cartItems?.length === 0 ? (
        <View className='flex-1 items-center justify-center p-4'>
          <Text className='font-notoKufiArabic text-gray-500 text-center'>
            السلة فارغة
          </Text>
        </View>
      ) : (
        <>
          <FlashList
            data={cartItems}
            renderItem={renderItem}
            estimatedItemSize={150}
            contentContainerStyle={{ padding: 16 }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary}
              />
            }
          />

          <View className='p-4 pb-safe-offset-4 border-t border-gray-200'>
            <View className='flex-row justify-between items-center px-2 mb-4'>
              <Text className='font-notoKufiArabic leading-relaxed text-gray-600'>
                المجموع
              </Text>
              <Text className='font-notoKufiArabic-bold text-lg'>
                {calculateTotal().toFixed(2)}{' '}
                {cartItems?.[0]?.currency === 'AED'
                  ? 'د.إ'
                  : cartItems?.[0]?.currency === 'SAR'
                  ? 'ر.س'
                  : 'ر.ي'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push(`/store/${storeId}/checkout`)}
              className='bg-primary py-4 rounded-2xl'>
              <Text className='text-center text-white font-notoKufiArabic-bold'>
                إتمام الشراء
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

export default CartScreen
