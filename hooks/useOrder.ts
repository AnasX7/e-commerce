import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { useLocationStore } from '@/stores/LocationStore'
import { checkout, fetchOrders } from '@/services/order'
import { useCartStore } from '@/stores/CartStore'

export const useOrder = () => {
  const queryClient = useQueryClient()
  const { mainLocation } = useLocationStore()
  const { clearItems } = useCartStore()
  const router = useRouter()

  const { isAuthenticated } = useAuth({ middleware: 'guest' })

  useEffect(() => {
    if (!mainLocation) {
      router.push('/locations')
      return
    }
  }, [mainLocation])

  const locationId = mainLocation?.id || 0

  // Fetch Orders data
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: isAuthenticated,
  })

  const checkoutMutation = useMutation({
    mutationFn: (storeId: number) => checkout(storeId, locationId),
    onSuccess: ({ storeId }: { storeId: number }) => {
      queryClient.invalidateQueries({ queryKey: ['cart', storeId] })
      clearItems()
      router.replace('/(tabs)/home')
    },
  })

  return {
    orders,
    ordersIsLoading: isLoading,
    refetchOrders: refetch,
    checkout: checkoutMutation.mutate,
    isLoading: checkoutMutation.isPending,
  }
}
