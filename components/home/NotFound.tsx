import { View, Text } from 'react-native'

const NotFound = ({ message }: { message: string }) => {
  return (
    <View className="items-center justify-center h-32 w-full">
      <Text className="font-notoKufiArabic-semiBold text-gray-400">
        {message}
      </Text>
    </View>
  )
}

export default NotFound
