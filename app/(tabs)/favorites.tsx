import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { getAllFavorites } from '@/services/favorites'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FlashList } from '@shopify/flash-list'
import { ProductItem } from '@/types/product'
import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useFocusEffect, useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavoritesStore } from '@/stores/FavoritesStore'
import FavoritesScreenSkeleton from '@/components/skeletons/FavoritesScreenSkeleton'
import HorizontalProductCard from '@/components/HorizontalProductCard'

const FavoritesScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const { isAuthenticated } = useAuth({
    middleware: 'guest',
  })

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  const { setFavorites } = useFavoritesStore()
  const queryClient = useQueryClient()

  const { data, isLoading, refetch } = useQuery<ProductItem[]>({
    queryKey: ['favorites'],
    queryFn: getAllFavorites,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  })

  // Sync with favorites store - with type safety
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFavorites(data)
    }
  }, [data, setFavorites])

  const onRefresh = useCallback(async () => {
    if (!isAuthenticated) return

    setRefreshing(true)
    try {
      await queryClient.invalidateQueries({ queryKey: ['favorites'] })
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }, [refetch, isAuthenticated, queryClient])

  // Refresh on screen focus
  useRefreshOnFocus(onRefresh)

  if (isLoading) {
    return <FavoritesScreenSkeleton />
  }

  return (
    <>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 8 }}
        className='px-4 pb-3 bg-white border-b border-gray-200'>
        <Text className='text-lg text-center font-notoKufiArabic-semiBold leading-loose text-gray-800'>
          المفضلة
        </Text>
      </View>

      {!isAuthenticated ? (
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
          keyExtractor={(item) => item.productID.toString()}
          renderItem={({ item }: { item: ProductItem }) => (
            <HorizontalProductCard item={item} />
          )}
          estimatedItemSize={192}
          className='flex-1'
          contentContainerClassName='pb-4 py-4'
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              enabled={isAuthenticated}
            />
          }
        />
      )}
    </>
  )
}

export default FavoritesScreen
