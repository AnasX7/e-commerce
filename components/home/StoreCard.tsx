import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { StoreCardType } from '@/types/Store'

const StoreCard = ({ item }: { item: StoreCardType }) => {
  const router = useRouter()

  const handleStorePress = (store: StoreCardType) => {
    router.push({
      pathname: '/store/[id]',
      params: { id: store.id },
    })
  }

  return (
    <TouchableOpacity
      onPress={() => handleStorePress(item)}
      activeOpacity={0.8}
      className='mx-2 items-center'>
      <View className='w-20 h-20 rounded-xl overflow-hidden shadow-sm'>
        <Image
          source={item.imageURL}
          contentFit='cover'
          style={{ width: '100%', height: '100%' }}
          transition={300}
        />
      </View>
      <Text
        className='text-xs font-notoKufiArabic-semiBold leading-relaxed text-center mt-1 text-gray-800'
        numberOfLines={1}
        ellipsizeMode='tail'>
        {item.name}
      </Text>
      {item.productsCount && (
        <Text className='text-xs font-notoKufiArabic leading-relaxed text-gray-500'>
          {item.productsCount} منتج
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default StoreCard
