import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { ProductItem } from '@/types/product'
import ProductCard from '@/components/home/ProductCard'
import { useCallback } from 'react'
import { useSearch } from '@/hooks/useSearch'
import { SortOption } from '@/types/search'

type ProductsSliderProps = {
  title: string
  data: ProductItem[]
  sort: SortOption
}

const ProuductsSlider = ({ title, data, sort }: ProductsSliderProps) => {
  const router = useRouter()
  const { setFilters, performSearch } = useSearch()

  const handleViewAll = useCallback(() => {
    router.push('/search')
    setFilters({ sort })
    performSearch()
  }, [router, setFilters, performSearch])

  const renderItem = ({ item }: LegendListRenderItemProps<ProductItem>) => (
    <ProductCard item={item} />
  )

  return (
    <View className='my-4'>
      {/* Section header */}
      <View className='flex-row justify-between items-center px-4 mb-2'>
        <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-gray-800'>
          {title}
        </Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text className='text-sm px-3 py-2 rounded-md bg-primary font-notoKufiArabic-semiBold leading-relaxed text-white'>
            عرض الكل
          </Text>
        </TouchableOpacity>
      </View>
      {/* Products list */}
      <LegendList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.productID}
        recycleItems
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 274 }}
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 8,
          paddingVertical: 8,
          gap: 8,
        }}
      />
    </View>
  )
}

export default ProuductsSlider
