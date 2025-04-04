import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { useLocationStore } from '@/stores/LocationStore'
import { checkout, fetchOrders } from '@/services/order'


export const useOrder = () => {
  const queryClient = useQueryClient()
  const { mainLocation } = useLocationStore()
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
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['checkout'] })
    // },
  })

  return {
    orders,
    ordersIsLoading: isLoading,
    refetchOrders: refetch,
    checkout: checkoutMutation.mutate,
    isLoading: checkoutMutation.isPending,
  }
}
