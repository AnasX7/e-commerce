import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { useCartStore } from '@/stores/CartStore'
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  applyCoupon,
} from '@/services/cart'

type UseCartProps = {
  storeId: number
}

export const useCart = ({ storeId }: UseCartProps) => {
  const queryClient = useQueryClient()
  const {
    updateTotalItems,
    updateSubtotal,
    updateDiscount,
    updateDelivery,
    updateService,
    updateTotal,
    updateCouponCode,
    updateCouponDiscount,
  } = useCartStore()

  const { isAuthenticated } = useAuth({ middleware: 'guest' })

  // Fetch cart data
  const {
    data: Cart,
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

  const applyCouponMutation = useMutation({
    mutationFn: (couponCode: string) => applyCoupon(storeId, couponCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', storeId] })
    },
  })

  useEffect(() => {
    if (Cart) {
      updateTotalItems(Cart.count)
      updateSubtotal(Cart.subtotal)
      updateDiscount(Cart.discount)
      updateDelivery(Cart.delivery)
      updateService(Cart.service)
      updateTotal(Cart.total)
      updateCouponCode(Cart.couponCode || '')
      updateCouponDiscount(Cart.couponDiscount)
    }
  }, [Cart])

  const count = useCartStore((state) => state.count)
  const subtotal = useCartStore((state) => state.subtotal)
  const discount = useCartStore((state) => state.discount)
  const delivery = useCartStore((state) => state.delivery)
  const service = useCartStore((state) => state.service)
  const total = useCartStore((state) => state.total)
  const couponCode = useCartStore((state) => state.couponCode)
  const couponDiscount = useCartStore((state) => state.couponDiscount)

  return {
    cartItems: Cart?.items || [],
    count,
    subtotal,
    discount,
    delivery,
    service,
    total,
    couponCode,
    couponDiscount,
    isLoading,
    refetch,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    applyCoupon: applyCouponMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isApplyingCoupon: applyCouponMutation.isPending,
    couponError: applyCouponMutation.error,
    error:
      addToCartMutation.error ||
      updateCartMutation.error ||
      removeFromCartMutation.error,
  }
}
