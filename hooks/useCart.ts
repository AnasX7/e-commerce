import { useCartStore } from '@/stores/CartStore'
import { ProductItem } from '@/types/product'

export const useCart = (storeId: number) => {
  const cartData = useCartStore(
    (state) => state.carts[storeId] || { items: [], total: 0 }
  )
  const { addItem, removeItem, updateQuantity, clearCart } = useCartStore()

  return {
    cart: cartData,
    total: cartData.total,
    addItem: (product: ProductItem) => addItem(storeId, product),
    removeItem: (productId: number) => removeItem(storeId, productId),
    updateQuantity: (productId: number, quantity: number) =>
      updateQuantity(storeId, productId, quantity),
    clearCart: () => clearCart(storeId),
  }
}
