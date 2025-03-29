import { ProductItem } from '@/types/product'

export type SortOption =
  | 'latest'
  | 'oldest'
  | 'views'
  | 'price_asc'
  | 'price_desc'

export type SearchFilters = {
  name?: string
  color?: string
  size?: string
  sort?: SortOption
}

export type SearchProduct = ProductItem

export type SearchResponse = {
  count: number
  products: SearchProduct[]
}
