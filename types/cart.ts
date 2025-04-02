import { ProductItem } from '@/types/product'

export type CartItem = ProductItem & {
  quantity: number
}

export type AddToCartPayload = {
  quantity: number
}

export type UpdateCartPayload = AddToCartPayload
