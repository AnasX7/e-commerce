import { View, Text, TouchableOpacity } from 'react-native'
import { MotiView } from 'moti'

type CartButtonProps = {
  itemCount: number
  total: number
  onPress: () => void
  visible: boolean
}

const CartButton = ({
  itemCount,
  total,
  onPress,
  visible,
}: CartButtonProps) => {
  if (!visible) return null

  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 300 }}
      className='h-24 px-4 mb-[env(safe-area-inset-bottom)] justify-center items-center border-t border-t-gray-200'>
      <TouchableOpacity
        onPress={onPress}
        className='w-full px-3 py-3 bg-secondary flex-row justify-between items-center rounded-full'>
        <View className='flex-row gap-2 justify-center items-center'>
          <View className='w-10 h-10 flex justify-center items-center bg-primary rounded-full'>
            <Text className='text-white text-xl font-notoKufiArabic-bold leading-loose'>
              {itemCount}
            </Text>
          </View>
          <Text className='text-center text-lg text-white font-notoKufiArabic-bold leading-loose'>
            اطّلع على سلّتك
          </Text>
        </View>
        <Text className='text-lg text-white font-notoKufiArabic-bold leading-loose'>
          {total.toFixed(2)} د.إ
        </Text>
      </TouchableOpacity>
    </MotiView>
  )
}

export default CartButton
