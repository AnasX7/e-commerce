import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ProductItem } from '@/types/product'
import {
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated'
import {
  setProductToFavirotes,
  removeProductFromFavorites,
} from '@/services/favorites'
import { useAuth } from '@/hooks/useAuth'
import { useFavoritesStore } from '@/stores/useFavoritesStore'

export const useProduct = (item: ProductItem) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const scale = useSharedValue(1)
  const { user } = useAuth({ middleware: 'guest' })
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Use Zustand store instead of local state
  const { setLiked, isLiked } = useFavoritesStore()

  // Initialize store with item's initial liked state
  useEffect(() => {
    setLiked(item.productID, item.isLiked)
  }, [item.productID, item.isLiked])

  // Update all related queries with new isLiked state
  const updateProductInQueries = (newIsLikedState: boolean) => {
    // Update products in home screen
    queryClient.setQueryData(['products'], (old: any) => {
      if (!old) return old
      return {
        popular: old.popular?.map((p: ProductItem) =>
          p.productID === item.productID
            ? { ...p, isLiked: newIsLikedState }
            : p
        ),
        new: old.new?.map((p: ProductItem) =>
          p.productID === item.productID
            ? { ...p, isLiked: newIsLikedState }
            : p
        ),
      }
    })

    // Update favorites list
    queryClient.setQueryData(['favorites'], (old: ProductItem[] = []) => {
      if (newIsLikedState) {
        return old.some((p) => p.productID === item.productID)
          ? old
          : [...old, { ...item, isLiked: true }]
      } else {
        return old.filter((p) => p.productID !== item.productID)
      }
    })

    // Update global state
    setLiked(item.productID, newIsLikedState)
  }

  // Add to favorites mutation
  const { mutate: addToFavorites } = useMutation({
    mutationFn: () => setProductToFavirotes(item.productID),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      await queryClient.cancelQueries({ queryKey: ['products'] })

      const previousState = {
        favorites: queryClient.getQueryData(['favorites']),
        products: queryClient.getQueryData(['products']),
      }

      updateProductInQueries(true)
      return previousState
    },
    onError: (err, variables, context: any) => {
      setLiked(item.productID, false)
      if (context) {
        queryClient.setQueryData(['favorites'], context.favorites)
        queryClient.setQueryData(['products'], context.products)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  // Remove from favorites mutation
  const { mutate: removeFromFavorites } = useMutation({
    mutationFn: () => removeProductFromFavorites(item.productID),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      await queryClient.cancelQueries({ queryKey: ['products'] })

      const previousState = {
        favorites: queryClient.getQueryData(['favorites']),
        products: queryClient.getQueryData(['products']),
      }

      updateProductInQueries(false)
      return previousState
    },
    onError: (err, variables, context: any) => {
      setLiked(item.productID, true)
      if (context) {
        queryClient.setQueryData(['favorites'], context.favorites)
        queryClient.setQueryData(['products'], context.products)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const handleCardPress = useCallback(() => {
    router.push({
      pathname: '/store/[storeId]/product/[productId]',
      params: { storeId: item.storeName, productId: item.productID },
    })
  }, [router, item])

  const handleLikePress = useCallback(() => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    scale.value = withSequence(withSpring(1.2), withSpring(1))

    const newLikedState = !isLiked(item.productID)
    setLiked(item.productID, newLikedState)

    if (newLikedState) {
      addToFavorites()
    } else {
      removeFromFavorites()
    }
  }, [user, item.productID, isLiked, addToFavorites, removeFromFavorites])

  const calculateDiscountedPrice = useCallback(() => {
    if (!item.discount) return item.price
    const discount = (item.price * item.discount) / 100
    return item.price - discount
  }, [item.price, item.discount])

  return {
    scale,
    handleCardPress,
    handleLikePress,
    calculateDiscountedPrice,
    showAuthModal,
    setShowAuthModal,
    isLiked: isLiked(item.productID), // Return the global state
  }
}
