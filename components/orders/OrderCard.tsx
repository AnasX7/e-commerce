import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Order } from '@/types/order'
import { Colors } from '@/constants/colors'

type OrderCardProps = {
  order: Order
  onPress?: (order: Order) => void
}

const OrderCard = ({ order, onPress }: OrderCardProps) => {
  const currency = order.items[0]?.currency || 'YER'
  const currencySymbol =
    currency === 'AED' ? 'د.إ' : currency === 'SAR' ? 'ر.س' : 'ر.ي'

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'جديد'
      case 'processing':
        return 'قيد المعالجة'
      case 'shipped':
        return 'تم الشحن'
      case 'delivered':
        return 'تم التوصيل'
      case 'cancelled':
        return 'ملغي'
      default:
        return status
    }
  }

  return (
    <TouchableOpacity
      className='bg-white rounded-xl shadow-md my-2 mx-4 border border-gray-300 overflow-hidden'
      onPress={() => onPress && onPress(order)}>
      <View className='p-4'>
        {/* Header */}
        <View className='flex-row justify-between items-center mb-3'>
          <View className='flex-row items-center gap-2'>
            <Text className='font-notoKufiArabic-bold leading-loose text-lg text-gray-800 ml-2'>
              #{order.id}
            </Text>
            <View
              className={`rounded-full px-3 py-1 ${getStatusColor(
                order.status
              )}`}>
              <Text className='text-xs font-notoKufiArabic-semiBold leading-loose'>
                {getStatusText(order.status)}
              </Text>
            </View>
          </View>
          <Text className='text-gray-600 text-sm font-notoKufiArabic-light leading-loose'>
            {formatDate(order.created_at)}
          </Text>
        </View>

        {/* Store */}
        <View className='flex-row items-center gap-2 mb-3'>
          <Ionicons name='storefront-outline' size={18} color={Colors.text.secondary} />
          <Text className='text-gray-800 font-notoKufiArabic leading-loose'>
            {order.store.name}
          </Text>
        </View>

        {/* Customer */}
        <View className='flex-row items-center gap-2 mb-3'>
          <Ionicons name='person-outline' size={18} color={Colors.text.secondary} />
          <Text className='text-gray-800 font-notoKufiArabic leading-loose'>{order.user.name}</Text>
        </View>

        {/* Location */}
        <View className='flex-row items-center gap-2 mb-3'>
          <Ionicons name='location-outline' size={18} color={Colors.text.secondary} />
          <Text className='text-gray-800 font-notoKufiArabic leading-loose'>
            {order.location.country}, {order.location.address}
          </Text>
        </View>

        {/* Products */}
        <View className='bg-gray-50 rounded-lg p-3 mb-3'>
          <Text className='font-bold text-gray-800 mb-2 text-left'>المنتجات:</Text>
          {order.items.map((item, index) => (
            <View
              key={index}
              className='flex-row justify-between items-center mb-1'>
              <View className='flex-row items-center'>
                <Text className='text-gray-500 mr-2'>x{item.quantity}</Text>
                <Text className='font-notoKufiArabic text-gray-800'>
                  {item.product_name}
                </Text>
              </View>
              <Text className='text-gray-800 font-notoKufiArabic leading-loose'>
                {item.price * item.quantity} {currencySymbol}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment details */}
        <View className='border-t border-gray-200 pt-3'>
          {order.coupon && (
            <View className='flex-row justify-between items-center mb-1'>
              <Text className='text-gray-600 font-notoKufiArabic leading-loose'>خصم ({order.coupon.code})</Text>
              <Text className='text-green-600 font-notoKufiArabic leading-loose'>-%{order.coupon.discount}</Text>
            </View>
          )}
          <View className='flex-row justify-between items-center mb-1'>
            <Text className='text-gray-600 font-notoKufiArabic leading-loose'>رسوم التوصيل</Text>
            <Text className='text-gray-700 font-notoKufiArabic leading-loose'>
              {order.shipping_price} {currencySymbol}
            </Text>
          </View>
          <View className='flex-row justify-between items-center mt-2'>
            <View className='flex-row items-center gap-2'>
              <Text className='font-notoKufiArabic-semiBold leading-loose text-gray-800'>المجموع</Text>
              <View className='bg-gray-100 rounded-full px-2 py-1 mr-2'>
                <Text className='text-xs font-notoKufiArabic leading-loose'>
                  {order.payment_method === 'cash' ? 'نقداً' : 'بطاقة'}
                </Text>
              </View>
            </View>
            <Text className='font-notoKufiArabic-semiBold leading-loose text-lg text-gray-800'>
              {order.total} {currencySymbol}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default OrderCard
