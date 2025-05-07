import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { useState } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { useOrder } from '@/hooks/useOrder'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import { Order } from '@/types/order'
import OrderCard from '@/components/orders/OrderCard'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'

const orders = () => {
  const router = useRouter()
  const { orders, ordersIsLoading, refetchOrders } = useOrder()
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content')
  })

  const onRefresh = async () => {
    setRefreshing(true)
    await refetchOrders()
    setRefreshing(false)
  }

  useRefreshOnFocus(onRefresh)

  const handleOrderPress = (order: Order) => {
    // router.push(`/orders/${order.id}`)
  }

  if (ordersIsLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

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
        <Text className='text-lg font-notoKufiArabic-bold'>طلباتي</Text>
        <View style={{ width: 24 }} />
      </View>

      {orders?.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-gray-500 text-lg'>لا توجد طلبات</Text>
        </View>
      ) : (
        <LegendList
          data={orders}
          renderItem={({ item }: LegendListRenderItemProps<Order>) => (
            <OrderCard order={item} onPress={handleOrderPress} />
          )}
          keyExtractor={(item) => item.id.toString()}
          recycleItems
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 48 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  )
}

export default orders
