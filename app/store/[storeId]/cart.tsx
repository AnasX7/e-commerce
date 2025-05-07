import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router'
import { useCart } from '@/hooks/useCart'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import { CartItem } from '@/types/cart'
import CartItemCard from '@/components/CartItemCard'
import ListFooter from '@/components/cart/ListFooter'

const CartScreen = () => {
  const { storeId } = useLocalSearchParams()
  const router = useRouter()

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content')
  })

  const { cartItems, updateCartItem, removeFromCart, isLoading, refetch } =
    useCart({ storeId: +storeId })

  const currency = cartItems?.[0]?.currency

  const listFooterComponent = () => (
    <ListFooter storeId={+storeId} currency={currency} />
  )

  const renderItem = ({ item }: LegendListRenderItemProps<CartItem>) => (
    <CartItemCard
      item={item}
      onUpdateQuantity={(quantity) =>
        updateCartItem({ productId: item.productID, quantity })
      }
      onRemove={() => removeFromCart(item.productID)}
    />
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
          <LegendList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.productID.toString()}
            ListFooterComponent={listFooterComponent}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            recycleItems
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          />

          <View className='flex-row justify-between gap-4 p-4 pb-safe-offset-4 border-t border-gray-200'>
            <TouchableOpacity
              onPress={() => router.back()}
              className=' flex-1 py-4 border border-gray-300 rounded-2xl'>
              <Text className='text-center text-gray-600 font-notoKufiArabic-semiBold'>
                أضف المزيد
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push(`/store/${storeId}/checkout`)}
              className='flex-1 py-4 bg-primary rounded-2xl'>
              <Text className='text-center text-white  font-notoKufiArabic-semiBold'>
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
