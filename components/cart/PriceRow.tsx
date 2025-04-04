import { View, Text } from 'react-native'

type PriceRowProps = {
  label: string
  value: number
  symbol: string
  isTotal?: boolean
}

const PriceRow = ({ label, value, symbol, isTotal = false }: PriceRowProps) => (
  <View className='flex-row justify-between items-center'>
    <Text
      className={`  ${
        isTotal ? 'text-lg font-notoKufiArabic-semiBold' : 'text-gray-600 font-notoKufiArabic'
      }`}>
      {label}
    </Text>
    <Text
      className={`  ${
        isTotal ? 'text-lg font-notoKufiArabic-bold' : 'text-gray-500 font-notoKufiArabic-semiBold'
      }`}>
      {value} {symbol}
    </Text>
  </View>
)

export default PriceRow
