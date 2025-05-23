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
  description: string
  spescifications: string
  storeID: number
  storeName: string
  category: string
  isLiked: boolean
}

export type ProductItem = Pick<
  Product,
  | 'productID'
  | 'name'
  | 'storeID'
  | 'storeName'
  | 'price'
  | 'currency'
  | 'discount'
  | 'averageRating'
  | 'isLiked'
> & {
  image: Product['images'][0]
}
