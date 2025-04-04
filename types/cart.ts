import { ProductItem } from '@/types/product'

export type Cart = {
  items: CartItem[]
  count: number
  subtotal: number
  discount: number
  delivery: number
  service: number
  total: number
  couponCode: string
  couponDiscount: number
}

export type CartItem = ProductItem & {
  quantity: number
}

export type AddToCartPayload = {
  quantity: number
}

export type UpdateCartPayload = AddToCartPayload
