import { useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { useCartStore } from '@/stores/CartStore'
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from '@/services/cart'

type UseCartProps = {
  storeId: number
}

export const useCart = ({ storeId }: UseCartProps) => {
  const queryClient = useQueryClient()
  const { updateTotalItems } = useCartStore()

  const { isAuthenticated } = useAuth({ middleware: 'guest' })

  // Fetch cart items
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cart', storeId],
    queryFn: () => fetchCart(storeId),
    enabled: isAuthenticated,
  })

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => addToCart(storeId, productId, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', storeId] })
    },
  })

  // Update cart item mutation
  const updateCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => updateCartItem(storeId, productId, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', storeId] })
    },
  })

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: (productId: string) => removeFromCart(storeId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', storeId] })
    },
  })

  // Calculate cart total
  const calculateTotal = useCallback(() => {
    return (
      cartItems?.reduce((acc, item) => {
        const price = item.price * (1 - item.discount / 100)
        return acc + price * item.quantity
      }, 0) || 0
    )
  }, [cartItems])

  useEffect(() => {
    if (cartItems) {
      const count = cartItems.reduce((acc, item) => acc + item.quantity, 0)
      updateTotalItems(count)
    }
  }, [cartItems, updateTotalItems])

  const totalItems = useCartStore((state) => state.totalItems)

  return {
    cartItems,
    isLoading,
    refetch,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    calculateTotal,
    totalItems,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    error:
      addToCartMutation.error ||
      updateCartMutation.error ||
      removeFromCartMutation.error,
  }
}
