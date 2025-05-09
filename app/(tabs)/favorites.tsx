import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { useEffect, useState } from 'react'
import { getAllFavorites } from '@/services/favorites'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { useAuth } from '@/hooks/useAuth'
import { useFocusEffect, useRouter } from 'expo-router'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFavoritesStore } from '@/stores/FavoritesStore'
import { ProductItem } from '@/types/product'
import { Colors } from '@/constants/colors'
import FavoritesScreenSkeleton from '@/components/skeletons/FavoritesScreenSkeleton'
import HorizontalProductCard from '@/components/HorizontalProductCard'

const FavoritesScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const { isAuthenticated } = useAuth({
    middleware: 'guest',
  })

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content')
  })

  const { setFavorites } = useFavoritesStore()
  const queryClient = useQueryClient()

  const { data, isLoading, refetch } = useQuery({
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

  const onRefresh = async () => {
    if (!isAuthenticated) return

    setRefreshing(true)
    try {
      await queryClient.invalidateQueries({ queryKey: ['favorites'] })
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }

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
        <LegendList
          data={data}
          renderItem={({ item }: LegendListRenderItemProps<ProductItem>) => (
            <HorizontalProductCard item={item} />
          )}
          keyExtractor={(item) => item.productID.toString()}
          recycleItems
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingVertical: 16,
          }}
          maintainVisibleContentPosition
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
