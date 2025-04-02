import { create } from 'zustand'
import { CartItem } from '@/types/cart'

interface CartStore {
  items: Record<number, CartItem[]>
  totalItems: number
  updateTotalItems: (count: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: {},
  totalItems: 0,
  updateTotalItems: (count) => set({ totalItems: count }),
}))
