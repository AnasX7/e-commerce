import { View, Text, ScrollView, RefreshControl, StatusBar } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { fetchCarouselAds } from '@/services/carouselAds'
import { fetchStores } from '@/services/store'
import { fetchProducts } from '@/services/product'

import HomeScreenSkeleton from '@/components/skeletons/HomeScreenSkeleton'
import LocationPicker from '@/components/home/LocationPicker'
import SearchBar from '@/components/home/SearchBar'
import StoresSlider from '@/components/home/StoresSlider'
import ProuductsSlider from '@/components/home/ProuductsSlider'
import AdsCarousel from '@/components/home/AdsCarousel'
import ErrorMessage from '@/components/ErrorMessage'
import ProBanner from '@/components/ProBanner'
import NotFound from '@/components/home/NotFound'
import NoProductsMessage from '@/components/NoProductsMassage'
import { Images } from '@/constants/images'
import { Colors } from '@/constants/colors'

const HomeScreen = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, [])
  )

  const insets = useSafeAreaInsets()

  const [refreshing, setRefreshing] = useState(false)

  const {
    data: carouselAdsData,
    refetch: refetchCarouselAds,
    isLoading: isLoadingAds,
    error: carouselError,
  } = useQuery({
    queryKey: ['carouselAds'],
    queryFn: () => fetchCarouselAds(),
  })

  const {
    data: storesData,
    refetch: refetchStores,
    isLoading: isLoadingStores,
    error: storesError,
  } = useQuery({
    queryKey: ['stores'],
    queryFn: () => fetchStores(),
  })

  const {
    data: productsData,
    refetch: refetchProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(8),
  })

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([
      refetchCarouselAds(),
      refetchStores(),
      refetchProducts(),
    ])
    setRefreshing(false)
  }, [refetchCarouselAds, refetchStores, refetchProducts])

  // Refresh on screen focus
  useRefreshOnFocus(onRefresh)

  const words = ['متاجر', 'منتاجات']
  const [word, setWord] = useState(words[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setWord(words[(words.indexOf(word) + 1) % words.length])
    }, 1800)

    return () => clearInterval(interval)
  }, [word, words])

  return (
    <View className='flex-1'>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top }}>
        <View className='mx-4 pb-6 gap-4'>
          <View className='flex-row-reverse justify-between items-center'>
            <View className='flex-row-reverse items-center gap-3'>
              {/* App logo */}
              <View className='w-14 h-14 justify-center items-center'>
                <Image
                  source={Images.appIcon}
                  style={{ width: '100%', height: '100%' }}
                  contentFit='contain'
                />
              </View>
              <Text className='font-notoKufiArabic-bold text-[30px] text-white'>
                سلّتي
              </Text>
            </View>

            {/* Location picker with light theme */}
            <LocationPicker
              onPress={() => alert('TODO: implement location picker screen')}
              theme='light'
            />
          </View>

          {/* Search bar with transparent theme */}
          <SearchBar
            onFilterPress={() => alert('TODO: implement filter Model')}
            theme='transparent'
          />
        </View>
      </LinearGradient>

      <ScrollView
        className='flex-1 pt-2'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }>
        {isLoadingAds || isLoadingStores || isLoadingProducts ? (
          <HomeScreenSkeleton />
        ) : carouselError || storesError || productsError ? (
          <ErrorMessage message='حدث خطأ في الاتصال' onRetry={onRefresh} />
        ) : (
          <>
            {carouselAdsData?.length > 0 ? (
              <AdsCarousel data={carouselAdsData} />
            ) : (
              <NotFound message='لا توجد إعلانات متاحة' />
            )}

            {storesData?.length > 0 ? (
              <StoresSlider title='المتاجر' data={storesData} />
            ) : (
              <NotFound message='لا توجد متاجر متاحة' />
            )}

            {productsData?.popular?.length > 0 ? (
              <ProuductsSlider
                title='المنتجات الشائعة'
                data={productsData.popular}
              />
            ) : (
              <NoProductsMessage />
            )}

            {/* Pro Banner */}
            {true && (
              <View className='px-4 pb-3 my-3'>
                <ProBanner />
              </View>
            )}

            {productsData?.new?.length > 0 ? (
              <ProuductsSlider title='وصل حديثاً' data={productsData.new} />
            ) : (
              <NoProductsMessage />
            )}
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default HomeScreen
