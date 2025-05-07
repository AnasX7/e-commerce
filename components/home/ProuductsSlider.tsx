import { View, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { ProductItem } from '@/types/product'
import ProductCard from '@/components/home/ProductCard'
import { useSearch } from '@/hooks/useSearch'
import { SortOption } from '@/types/search'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import WavyBottomBorder from '@/components/home/WavyBottomBorder'

type ProductsSliderProps = {
  title: string
  data: ProductItem[]
  sort: SortOption
}

const ProuductsSlider = ({ title, data, sort }: ProductsSliderProps) => {
  const router = useRouter()
  const { setFilters, performSearch } = useSearch()

  const [layout, setLayout] = useState({ width: 0, height: 0 })
  const onLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout)
  }

  const handleViewAll = () => {
    router.push('/search')
    setFilters({ sort })
    performSearch()
  }

  const renderItem = ({ item }: LegendListRenderItemProps<ProductItem>) => (
    <ProductCard item={item} />
  )

  return (
    <View
      onLayout={onLayout}
      className='mt-2 mb-2 pt-6 pb-8'
      style={{ position: 'relative' }}>
      {layout.width > 0 && layout.height > 0 && (
        <WavyBottomBorder
          width={layout.width}
          height={layout.height}
          waveHeight={14}
          waveCount={3}
          bannerColor={Colors.tertiary}
        />
      )}

      <View>
        {/* Section header */}
        <View className='flex-row justify-between items-center px-4 mb-2'>
          <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-gray-800'>
            {title}
          </Text>
          <TouchableOpacity
            className='flex-row items-center gap-2 px-3 py-2'
            activeOpacity={0.7}
            onPress={handleViewAll}>
            <Text className='text-base font-notoKufiArabic-semiBold leading-relaxed text-primary'>
              عرض الكل
            </Text>
            <Ionicons name='chevron-back' size={20} color={Colors.primary} />
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
          style={{ height: 280 }}
          contentContainerStyle={{
            width: '100%',
            paddingHorizontal: 8,
            paddingVertical: 8,
            gap: 8,
          }}
        />
      </View>
    </View>
  )
}

export default ProuductsSlider
