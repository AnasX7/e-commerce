import { View, Text, TextInput, TextInputProps } from 'react-native'
import InputErrorMassage from '@/components/InputErrorMassage'

interface FormInputProps extends TextInputProps {
  label: string
  error?: string
  containerClassName?: string
}

const FormInput = ({
  label,
  error,
  containerClassName = 'mb-4',
  className = '',
  ...props
}: FormInputProps) => {
  return (
    <View className={containerClassName}>
      <Text className='text-gray-700 text-left mb-2 font-notoKufiArabic-semiBold leading-relaxed'>{label}</Text>
      <TextInput
        className={`border rounded-lg px-3 py-2 bg-gray-50 text-[12px] font-notoKufiArabic-light  ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <InputErrorMassage massage={error} />}
    </View>
  )
}

export default FormInput
