import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { getAllFavorites } from '@/services/favorites'
import { useQuery } from '@tanstack/react-query'
import { FlashList } from '@shopify/flash-list'
import { ProductItem } from '@/types/product'
import HorizontalProductCard from '@/components/HorizontalProductCard'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import FavoritesScreenSkeleton from '@/components/skeletons/FavoritesScreenSkeleton'

const FavoritesScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const { user } = useAuth({
    middleware: 'guest',
  })

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getAllFavorites(),
    enabled: !!user,
  })

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  // Refresh on screen focus
  useRefreshOnFocus(onRefresh)

  const renderItem = ({ item }: { item: ProductItem }) => (
    <HorizontalProductCard item={item} />
  )

  if (isLoading) {
    return <FavoritesScreenSkeleton />
  }

  return (
    <>
      {/* Header */}
      <View className='px-4 pb-3 pt-[env(safe-area-inset-top)] bg-white border-b border-gray-200'>
        <Text className='text-xl text-center font-notoKufiArabic-bold leading-loose text-gray-800'>
          المفضلة
        </Text>
      </View>

      {!user ? (
        <View className='flex-1 items-center justify-center p-4 space-y-4'>
          <Text className='text-gray-500 font-notoKufiArabic text-center mb-4'>
            يجب تسجيل الدخول للوصول للمفضلة
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/login')}
            className='flex-row items-center gap-2 bg-primary px-6 py-3 rounded-lg'>
            <Text className='text-white font-notoKufiArabic-semiBold'>
              تسجيل الدخول
            </Text>
            <Ionicons name='enter-outline' size={24} color='white' />
          </TouchableOpacity>
        </View>
      ) : data?.length === 0 ? (
        <View className='flex-1 items-center justify-center p-4'>
          <Text className='text-gray-500 font-notoKufiArabic text-center'>
            لا توجد منتجات في المفضلة
          </Text>
        </View>
      ) : (
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={200}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.productID}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        />
      )}
    </>
  )
}

export default FavoritesScreen
