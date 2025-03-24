import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { FlashList } from '@shopify/flash-list'
import { ProductItem } from '@/types/product'
import ListHeader from '@/components/store/ListHeader'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { mockProducts } from '@/mocks/products'
import HorizontalProductCard from '@/components/HorizontalProductCard'
import StoreHeader from '@/components/store/StoreHeader'
import { useStoreDetails } from '@/stores/useStoreDetails'

const StoreScreen = () => {
  const { storeId } = useLocalSearchParams()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const setStoreName = useStoreDetails((state) => state.setStoreName)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      // Here you would typically fetch store details from API
      // For now, we'll just use the storeId as the name
      setStoreName(storeId as string)
    }, [storeId])
  )

  const handlePress = useCallback(() => {
    router.push({
      pathname: '/store/[storeId]/cart',
      params: { storeId: storeId as string },
    })
  }, [router])

  const ListHeaderComponent = () => <ListHeader />

  const renderItem = ({ item }: { item: ProductItem }) => (
    <HorizontalProductCard item={item} />
  )

  return (
    // <SafeAreaProvider>
    <>
      <FlashList
        data={mockProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.productID}
        ListHeaderComponent={ListHeaderComponent}
        estimatedItemSize={192}
        contentContainerClassName='pb-4'
        showsVerticalScrollIndicator={false}
      />
      {/* Cart */}
      {true ? (
        <View className='h-20 px-4 mb-[env(safe-area-inset-bottom)] justify-center items-center border-t border-t-gray-200'>
          <TouchableOpacity
            onPress={handlePress}
            className='w-full px-3 py-3 bg-secondary flex-row justify-between items-center rounded-full'>
            <View className='flex-row gap-2 justify-center items-center'>
              <View className='w-10 h-10 flex justify-center items-center bg-primary rounded-full'>
                <Text className='text-white text-xl font-notoKufiArabic-bold leading-loose'>
                  4
                </Text>
              </View>
              <Text className='text-center text-lg text-white font-notoKufiArabic-bold leading-loose'>
                اطّلع على سلّتك
              </Text>
            </View>
            <Text className='text-lg text-white font-notoKufiArabic-bold leading-loose'>
              26.00 د.إ
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className='h-14 pt-1 mb-[env(safe-area-inset-bottom)] justify-center items-center border-t border-gray-200'>
          <Text className='text-center text-base text-gray-600 font-notoKufiArabic leading-loose'>
            أضف منتجات للسلة لتبدأ الطلب
          </Text>
        </View>
      )}
    </>
    // </SafeAreaProvider>
  )
}

export default StoreScreen
