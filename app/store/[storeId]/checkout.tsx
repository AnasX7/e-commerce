import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useState, useCallback } from 'react'
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router'
import { useCart } from '@/hooks/useCart'
import { useOrder } from '@/hooks/useOrder'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import PriceBreakdown from '@/components/store/PriceBreakdown'
import LocationDetails from '@/components/checkout/LocationDetails'
import PaymentMethod from '@/components/checkout/PaymentMethod'

const checkout = () => {
  const { storeId } = useLocalSearchParams()
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  const {
    cartItems,
    subtotal,
    discount,
    delivery,
    service,
    total,
    couponCode,
    couponDiscount,
  } = useCart({ storeId: +storeId })

  const { checkout, isLoading } = useOrder()

  const handleCheckout = useCallback(() => {
    checkout(+storeId)
  }, [storeId, checkout])

  const currency = cartItems?.[0]?.currency
  const currencySymbol =
    currency === 'AED' ? 'د.إ' : currency === 'SAR' ? 'ر.س' : 'ر.ي'

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
        <Text className='text-lg font-notoKufiArabic-bold'>تنفيذ الطلب</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView className='flex-1 mx-4' showsVerticalScrollIndicator={false}>
        <LocationDetails />
        <PaymentMethod />
        <PriceBreakdown
          subtotal={subtotal}
          delivery={delivery}
          service={service}
          total={total}
          currencySymbol={currencySymbol}
          couponCode={couponCode}
          couponDiscount={couponDiscount}
          discount={discount}
        />
      </ScrollView>
      <View className='p-4 pb-safe-offset-4 border-t border-gray-200'>
        <TouchableOpacity
          onPress={handleCheckout}
          className='flex-row items-center justify-center py-4 bg-primary rounded-2xl'>
          {isLoading ? (
            <ActivityIndicator size='small' color='white' />
          ) : (
            <Text className='text-center text-white  font-notoKufiArabic-semiBold'>
              تنفيذ الطلب
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default checkout
