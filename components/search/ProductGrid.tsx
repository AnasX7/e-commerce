import { FlashList } from '@shopify/flash-list'
import { SearchProduct } from '@/types/search'
import HorizontalProductCard from '@/components/HorizontalProductCard'
import SearchForProductMessage from '@/components/search/SearchForProductMessage'
import { View } from 'moti'

interface ProductGridProps {
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
        <FlashList
          data={products}
          keyExtractor={(item) => item.productID}
          estimatedItemSize={192}
          className='flex-1'
          contentContainerClassName='pt-2 pb-4'
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <HorizontalProductCard item={item} />}
        />
      )}
    </>
  )
}
