import { Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/colors'

const PaymentMethod = () => {
  return (
    <>
      <Text className='font-notoKufiArabic-extraBold text-xl leading-loose text-gray-800 text-left'>
        الدفع من خلال
      </Text>
      <View className='mb-6 mt-2 items-center justify-between px-5 py-3 border border-gray-200 rounded-2xl'>
        <TouchableOpacity
          disabled
          className='flex-row items-center justify-between w-full opacity-50'>
          <View className='flex-row items-center gap-2'>
            <Ionicons
              name='cash-outline'
              size={24}
              color={Colors.text.primary}
            />
            <Text className='font-notoKufiArabic-semiBold text-gray-800 text-left'>
              نقداً
            </Text>
          </View>
          <View className='h-6 w-6 border-2 border-gray-900 rounded-full flex items-center justify-center'>
            <View className='h-3 w-3 bg-gray-900 rounded-full' />
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default PaymentMethod
