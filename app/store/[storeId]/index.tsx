import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { useState } from 'react'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { useCart } from '@/hooks/useCart'
import { fetchStoreProductsByCategory } from '@/services/product'
import { fetchStore } from '@/services/store'
import { Colors } from '@/constants/colors'
import { ProductItem } from '@/types/product'
import { MotiView } from 'moti'
import ListHeader from '@/components/store/ListHeader'
import HorizontalProductCard from '@/components/HorizontalProductCard'
import NoProductsMessage from '@/components/NoProductsMassage'

const StoreScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { storeId } = useLocalSearchParams<{ storeId: string }>()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState(1)

  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content')
  })

  const { cartItems, count, total } = useCart({
    storeId: +storeId,
  })

  const {
    data: store,
    isLoading: storeLoading,
    error: storeError,
    refetch: refetchStore,
  } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () => fetchStore(+storeId),
  })

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ['store', storeId, 'category', activeTab],
    queryFn: () => fetchStoreProductsByCategory(+storeId, activeTab),
  })

  const onRefresh = async () => {
    setRefreshing(true)
    await Promise.all([refetchStore, refetchProducts])
    setRefreshing(false)
  }

  // Refresh on screen focus
  useRefreshOnFocus(onRefresh)

  const handleCartPress = () => {
    router.push(`/store/${storeId}/cart`)
  }

  // Memoize the setActiveTab to prevent unnecessary re-renders
  const memoizedSetActiveTab = (id: number) => {
    setActiveTab((prevTab) => {
      // Only update if the tab is different
      return prevTab !== id ? id : prevTab
    })
  }

  const listHeaderComponent = () => {
    return (
      <ListHeader
        data={store}
        activeTab={activeTab}
        setActiveTab={memoizedSetActiveTab}
      />
    )
  }

  if (storeError || productsError) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-red-500 font-notoKufiArabic'>
          حدث خطأ أثناء تحميل المنتجات
        </Text>
      </View>
    )
  }

  return (
    <>
      {storeLoading && productsLoading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
      ) : (
        <LegendList
          data={products}
          renderItem={({ item }: LegendListRenderItemProps<ProductItem>) => (
            <HorizontalProductCard item={item} />
          )}
          keyExtractor={(item) => item.productID.toString()}
          ListHeaderComponent={listHeaderComponent}
          ListEmptyComponent={<NoProductsMessage />}
          recycleItems
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        />
      )}

      {count > 0 ? (
        <MotiView
          from={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
          className='h-24 px-4 mb-safe justify-center items-center border-t border-t-gray-200'>
          <TouchableOpacity
            onPress={handleCartPress}
            className='w-full px-3 py-3 bg-secondary flex-row justify-between items-center rounded-2xl'>
            <View className='flex-row gap-2 justify-center items-center'>
              <View className='w-10 h-10 flex justify-center items-center bg-primary rounded-xl'>
                <Text className='text-white text-xl font-notoKufiArabic-bold leading-loose'>
                  {count > 99 ? '99+' : count}
                </Text>
              </View>
              <Text className='text-center text-lg text-white font-notoKufiArabic-bold leading-loose'>
                اطّلع على سلّتك
              </Text>
            </View>
            <Text className='text-lg text-white font-notoKufiArabic-bold leading-loose'>
              {total}{' '}
              {cartItems?.[0]?.currency === 'AED'
                ? 'د.إ'
                : cartItems?.[0]?.currency === 'SAR'
                ? 'ر.س'
                : 'ر.ي'}
            </Text>
          </TouchableOpacity>
        </MotiView>
      ) : (
        <MotiView
          from={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
          className='h-14 px-4 mb-safe justify-center items-center border-t border-t-gray-200'>
          <Text className='text-base text-gray-500 font-notoKufiArabic-light leading-loose'>
            أضف منتجات للسلّة لتبدأ الطلب
          </Text>
        </MotiView>
      )}
    </>
  )
}

export default StoreScreen
