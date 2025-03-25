import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'

import { ProductItem } from '@/types/product'
import ProductCard from '@/components/home/ProductCard'
import { mockProducts } from '@/mocks/products'

type ProductsSliderProps = {
  title: string
  data: ProductItem[]
}

const ProuductsSlider = ({ title, data }: ProductsSliderProps) => {
  const router = useRouter()

  const renderItem = ({ item }: { item: ProductItem }) => (
    <ProductCard item={item} />
  )

  return (
    <View className='my-4'>
      {/* Section header */}
      <View className='flex-row justify-between items-center px-4 mb-2'>
        <Text className='text-2xl font-notoKufiArabic-bold leading-loose text-gray-800'>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/(search)/products',
              params: { title },
            })
          }>
          <Text className='text-sm px-3 py-2 rounded-md bg-primary font-notoKufiArabic-semiBold leading-relaxed text-white'>
            عرض الكل
          </Text>
        </TouchableOpacity>
      </View>
      {/* Products list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.productID}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='py-2 px-2 gap-3'
      />
    </View>
  )
}

export default ProuductsSlider
