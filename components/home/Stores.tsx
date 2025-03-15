import { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { Images } from '@/constants/images'

// Define the store data type
interface StoreCard {
  id: string
  name: string
  imageURL: string
  productsCount?: number
}

// Sample data with placeholder images
const STORES_DATA: StoreCard[] = [
  {
    id: '1',
    imageURL: 'https://picsum.photos/200/300',
    name: 'RH Home',
    productsCount: 324
  },
  {
    id: '2',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Pottery Barn',
    productsCount: 156
  },
  {
    id: '3',
    imageURL: 'https://picsum.photos/200/300',
    name: 'West Elm',
    productsCount: 218
  },
  {
    id: '4',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192
  },
  {
    id: '5',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192
  },
  {
    id: '6',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192
  },
  {
    id: '7',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192
  },
  {
    id: '8',
    imageURL: 'https://picsum.photos/200/300',
    name: 'Crate & Barrel',
    productsCount: 192
  }
]

interface StoresProps {
  title?: string
  isLoading?: boolean
  storesData?: StoreCard[]
}

const Stores = ({
  title = 'المتاجر',
  isLoading = false,
  storesData = STORES_DATA
}: StoresProps) => {
  const router = useRouter()

  const handleStorePress = useCallback(
    (store: StoreCard) => {
      router.push({
        pathname: '/store/[id]',
        params: { id: store.id }
      })
    },
    [router]
  )

  // Render individual store item
  const renderItem = ({ item }: { item: StoreCard }) => (
    <TouchableOpacity
      onPress={() => handleStorePress(item)}
      activeOpacity={0.8}
      className={`mx-2 items-center`}
    >
      <View className={`w-20 h-20 rounded-xl overflow-hidden shadow-sm`}>
        <Image
          source={item.imageURL}
          contentFit="cover"
          style={{ width: '100%', height: '100%' }}
          transition={300}
        />
      </View>
      <Text
        className="text-xs font-notoKufiArabic-semiBold text-center mt-1 text-gray-800"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>
      {item.productsCount && (
        <Text className="text-xs font-notoKufiArabic text-gray-500">
          {item.productsCount} منتج
        </Text>
      )}
    </TouchableOpacity>
  )

  // Generate empty state for when there are no stores
  const EmptyComponent = () => (
    <View className="items-center justify-center h-32 w-full">
      <Text className="font-notoKufiArabic-semiBold text-gray-500">
        لا توجد متاجر متاحة
      </Text>
    </View>
  )

  return (
    <View className="my-3">
      {/* Section header with title and "View All" option */}
      <View className="flex-row justify-between items-center px-4 mb-2">
        <Text className="text-lg font-notoKufiArabic-bold text-gray-800">
          {title}
        </Text>
      </View>

      {/* Stores list */}
      {isLoading ? (
        <View className="h-24 items-center justify-center">
          <ActivityIndicator size="small" color="#3b82f6" />
        </View>
      ) : (
        <FlashList
          data={storesData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          estimatedItemSize={80}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="py-2 px-2"
          ListEmptyComponent={EmptyComponent}
        />
      )}
    </View>
  )
}

export default Stores
