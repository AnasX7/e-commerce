import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { SearchProduct } from '@/types/search'
import { ProductItem } from '@/types/product'
import HorizontalProductCard from '@/components/HorizontalProductCard'
import SearchForProductMessage from '@/components/search/SearchForProductMessage'
import { View } from 'moti'

type ProductGridProps = {
  products: SearchProduct[]
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <>
      {products.length === 0 ? (
        <View className='flex-1  items-center'>
          <SearchForProductMessage />
        </View>
      ) : (
        <LegendList
          data={products}
          renderItem={({ item }: LegendListRenderItemProps<ProductItem>) => (
            <HorizontalProductCard item={item} />
          )}
          keyExtractor={(item) => item.productID}
          recycleItems
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 4, paddingBottom: 16 }}
        />
      )}
    </>
  )
}
