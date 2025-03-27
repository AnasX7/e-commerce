import { create } from 'zustand'
import { ProductItem } from '@/types/product'

type CartItem = {
  product: ProductItem
  quantity: number
}

type Cart = {
  items: CartItem[]
  total: number
}

type CartStore = {
  carts: Record<number, Cart>
  addItem: (storeId: number, product: ProductItem) => void
  removeItem: (storeId: number, productId: number) => void
  updateQuantity: (storeId: number, productId: number, quantity: number) => void
  clearCart: (storeId: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
  carts: {},
  addItem: (storeId, product) =>
    set((state) => {
      const cart = state.carts[storeId] || { items: [], total: 0 }
      const existingItem = cart.items.find(
        (item) => item.product.productID === product.productID
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.items.push({ product, quantity: 1 })
      }

      cart.total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )

      return {
        carts: { ...state.carts, [storeId]: cart },
      }
    }),
  removeItem: (storeId, productId) =>
    set((state) => {
      const cart = state.carts[storeId]
      if (!cart) return state

      cart.items = cart.items.filter(
        (item) => item.product.productID !== productId.toString()
      )
      cart.total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )

      return {
        carts: { ...state.carts, [storeId]: cart },
      }
    }),
  updateQuantity: (storeId, productId, quantity) =>
    set((state) => {
      const cart = state.carts[storeId]
      if (!cart) return state

      const item = cart.items.find(
        (item) => item.product.productID === productId.toString()
      )
      if (item) {
        item.quantity = quantity
      }

      cart.total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )

      return {
        carts: { ...state.carts, [storeId]: cart },
      }
    }),
  clearCart: (storeId) =>
    set((state) => ({
      carts: { ...state.carts, [storeId]: { items: [], total: 0 } },
    })),
}))
