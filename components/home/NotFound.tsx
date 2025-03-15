import { View, Text } from 'react-native'
import React from 'react'

const NotFound = ({ message }: { message: string }) => {
  return (
    <View className="items-center justify-center h-64 w-full">
      <Text className="font-notoKufiArabic-semiBold text-gray-500">
        {message}
      </Text>
    </View>
  )
}

export default NotFound
