import { View, Text } from 'react-native'
import PriceRow from '@/components/cart/PriceRow'

type PriceBreakdownProps = {
  subtotal: number
  delivery: number
  service: number
  total: number
  currencySymbol: string
  couponCode?: string
  couponDiscount?: number
  discount?: number
}

const PriceBreakdown = ({ subtotal, delivery, service, total, currencySymbol, couponCode, couponDiscount = 0, discount }: PriceBreakdownProps) => {
  return (
    <View className='gap-y-3'>
      <Text className='font-notoKufiArabic-extraBold leading-loose text-gray-800 text-xl text-left'>
        ملخّص الدفع
      </Text>
      <PriceRow
        label='المجموع الفرعي'
        value={subtotal}
        symbol={currencySymbol}
      />
      <PriceRow label='رسوم التوصيل' value={delivery} symbol={currencySymbol} />
      <PriceRow label='رسوم الخدمة' value={service} symbol={currencySymbol} />

      {couponDiscount > 0 && (
        <View className='flex-row justify-between items-center'>
          <Text className='font-notoKufiArabic text-gray-600'>
            خصم الكوبون ({couponCode} {couponDiscount}%)
          </Text>
          <Text className='font-notoKufiArabic-bold text-green-600'>
            {discount} {currencySymbol}
          </Text>
        </View>
      )}

      <View className='border-t border-gray-200 pt-3 mt-2'>
        <PriceRow
          label='المبلغ الإجمالي'
          value={total}
          symbol={currencySymbol}
          isTotal
        />
      </View>
    </View>
  )
}

export default PriceBreakdown
