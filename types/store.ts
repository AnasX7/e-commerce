export type Store = {
  id: number
  name: string
  image: string
  banner: string
  description: string
  categories: category[]
  country: string
  productsCount: number
}

export type category = {
  id: number
  category: string
}

export type StoreCardType = Pick<
  Store,
  'id' | 'name' | 'image' | 'productsCount'
>
