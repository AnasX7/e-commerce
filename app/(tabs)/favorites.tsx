import { View, Text, StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { getAllFavorites } from '@/services/favorites'
import { useQuery } from '@tanstack/react-query'
import { FlashList } from '@shopify/flash-list'
import { Product } from '@/types/product'
import ProductCard from '@/components/home/ProductCard'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

// const SAMPLE_FAVORITES: () => Product[] = () => [
//   {
//     id: '1',
//     productName: 'Modern Leather Sofa',
//     imageURL: 'https://picsum.photos/200/300',
//     storeName: 'RH Home',
//     rating: 4.8,
//     price: 1299.99,
//     currency: '$',
//     category: 'Furniture',
//     isLiked: true,
//   },
//   {
//     id: '2',
//     productName: 'Modern Leather Sofa',
//     imageURL: 'https://picsum.photos/200/300',
//     storeName: 'RH Home',
//     rating: 4.8,
//     price: 1299.99,
//     currency: '$',
//     category: 'Furniture',
//     isLiked: true,
//   },
//   {
//     id: '3',
//     productName: 'Modern Leather Sofa',
//     imageURL: 'https://picsum.photos/200/300',
//     storeName: 'RH Home',
//     rating: 4.8,
//     price: 1299.99,
//     currency: '$',
//     category: 'Furniture',
//     isLiked: true,
//   },
// ]

const FavoritesScreen = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, [])
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ['all_favorites'],
    // queryFn: SAMPLE_FAVORITES,
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>favorites</Text>
        {/* <FlashList
          data={data}
          renderItem={ProductCard}
          keyExtractor={(item) => item.id.toString()}
        /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default FavoritesScreen
