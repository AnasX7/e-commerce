import { create } from 'zustand'
import { CartItem } from '@/types/cart'

interface CartStore {
  items: Record<number, CartItem[]>
  count: number
  subtotal: number
  discount: number
  delivery: number
  service: number
  total: number
  couponCode: string
  couponDiscount: number
  updateTotalItems: (count: number) => void
  updateSubtotal: (subtotal: number) => void
  updateDiscount: (discount: number) => void
  updateDelivery: (delivery: number) => void
  updateService: (service: number) => void
  updateTotal: (total: number) => void
  updateCouponCode: (couponCode: string) => void
  updateCouponDiscount: (couponDiscount: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: {},
  count: 0,
  subtotal: 0,
  discount: 0,
  delivery: 0,
  service: 0,
  total: 0,
  couponCode: '',
  couponDiscount: 0,
  updateTotalItems: (count) => set({ count }),
  updateSubtotal: (subtotal) => set({ subtotal }),
  updateDiscount: (discount) => set({ discount }),
  updateDelivery: (delivery) => set({ delivery }),
  updateService: (service) => set({ service }),
  updateTotal: (total) => set({ total }),
  updateCouponCode: (couponCode) => set({ couponCode }),
  updateCouponDiscount: (couponDiscount) => set({ couponDiscount }),
}))
