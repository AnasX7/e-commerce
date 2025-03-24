import { Brand } from '@/types/brand'

export type Store = {
  id: string
  name: string
  image: string
  banner: string
  description: string
  brands: Brand[]
  country: string
  productsCount: number
}

export type StoreCardType = Pick<
  Store,
  'id' | 'name' | 'image' | 'productsCount'
>
