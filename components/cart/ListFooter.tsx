import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useForm } from '@/hooks/useForm'
import { useCart } from '@/hooks/useCart'
import { z } from 'zod'
import PriceRow from '@/components/cart/PriceRow'
import { Colors } from '@/constants/colors'

type ListFooterProps = {
  storeId: number
  currency: string
}

const couponSchema = z.object({
  couponCode: z.string().min(1, 'الرجاء إدخال رمز الكوبون'),
})

const ListFooter = ({ storeId, currency }: ListFooterProps) => {
  const {
    subtotal,
    discount,
    delivery,
    service,
    total,
    couponCode,
    couponDiscount,
    applyCoupon,
    isApplyingCoupon,
    couponError,
  } = useCart({ storeId })

  const { formData, updateField, errors, validateForm } = useForm({
    initialData: { couponCode: '' },
    schema: couponSchema,
  })

  const currencySymbol =
    currency === 'AED' ? 'د.إ' : currency === 'SAR' ? 'ر.س' : 'ر.ي'

  const handleApplyCoupon = async () => {
    if (!validateForm()) return

    applyCoupon(formData.couponCode)
  }

  return (
    <View className='mt-10 pb-4'>
      {/* Coupon Section */}
      <View className='mb-10 gap-3'>
        <Text className='font-notoKufiArabic-extraBold leading-loose text-gray-800 text-xl text-left'>
          وفّر على طلبك
        </Text>

        <View className='flex-row items-center gap-2'>
          <TextInput
            className='flex-1 border border-gray-300 rounded-xl p-3 font-notoKufiArabic'
            placeholder='أدخل رمز الكوبون'
            placeholderTextColor={Colors.text.quaternary}
            value={formData.couponCode}
            onChangeText={(text) => updateField('couponCode', text)}
            onSubmitEditing={handleApplyCoupon}
            textAlign='right'
          />
          <TouchableOpacity
            className='bg-primary px-4 py-3 rounded-xl'
            onPress={handleApplyCoupon}
            disabled={isApplyingCoupon}>
            {isApplyingCoupon ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text className='text-white font-notoKufiArabic-bold'>تطبيق</Text>
            )}
          </TouchableOpacity>
        </View>
        {(errors.couponCode || couponError) && (
          <Text className='text-red-500 text-sm mt-2 font-notoKufiArabic'>
            {errors.couponCode || couponError?.message}
          </Text>
        )}
      </View>

      {/* Price Breakdown */}
      <View className='gap-y-3'>
        <Text className='font-notoKufiArabic-extraBold leading-loose text-gray-800 text-xl text-left'>
          ملخّص الدفع
        </Text>
        <PriceRow
          label='المجموع الفرعي'
          value={subtotal}
          symbol={currencySymbol}
        />
        <PriceRow
          label='رسوم التوصيل'
          value={delivery}
          symbol={currencySymbol}
        />
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
    </View>
  )
}

export default ListFooter
