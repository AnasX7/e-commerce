import { Review } from '@/types/review'

export type Product = {
  productID: string
  name: string
  images: string[]
  price: number
  currency: 'AED' | 'SAR' | 'YER'
  discount: number
  averageRating: number
  color: string
  sizes: string[]
  reviews: Review[]
  spescifications: string[]
  storeID: number
  storeName: string
  brandID: number
  brandName: string
  category: string
  isLiked: boolean
}

export type ProductItem = Pick<
  Product,
  | 'productID'
  | 'name'
  | 'storeName'
  | 'price'
  | 'currency'
  | 'discount'
  | 'averageRating'
  | 'isLiked'
> & {
  image: Product['images'][0]
}
