export type Order = {
  id: number
  status: string
  total: number
  shipping_price: number
  payment_method: string
  created_at: string
  user: {
    name: string
    email: string
  }
  store: {
    name: string
    id: number
  }
  coupon?: {
    code: string
    discount: number
  }
  location: {
    country: string
    address: string
    phone: string
  }
  items: {
    product_name: string
    quantity: number
    price: number
    currency: string
  }[]
}
