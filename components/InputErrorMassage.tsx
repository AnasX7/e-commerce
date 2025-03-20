import { Text } from 'react-native'

const InputErrorMassage = ({ massage }: { massage: string }) => {
  return <Text className='text-red-500 text-[10px] text-left font-notoKufiArabic-light leading-relaxed mt-1'>{massage}</Text>
}

export default InputErrorMassage
