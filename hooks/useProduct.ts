import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Product, ProductItem } from '@/types/product'
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
import { useFullPath } from '@/hooks/useFullPath'

type UseProductProps = {
  item: ProductItem | Product | undefined
}

export const useProduct = ({ item }: UseProductProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const scale = useSharedValue(1)
  const { user } = useAuth({ middleware: 'guest' })
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { setLiked, isLiked } = useFavoritesStore()

  // Get the image URL based on item type
  const getImageUrl = useCallback(() => {
    if (!item) return ''
    if ('image' in item) {
      return useFullPath(item.image)
    }
    return useFullPath(item.images[0])
  }, [item])

  // Initialize store with item's initial liked state
  useEffect(() => {
    if (item?.productID && typeof item?.isLiked === 'boolean') {
      setLiked(item.productID, item.isLiked)
    }
  }, [item?.productID, item?.isLiked, setLiked])

  // Update all related queries with new isLiked state
  const updateProductInQueries = useCallback(
    (newIsLikedState: boolean) => {
      if (!item?.productID) return

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

      // Update product details if available
      queryClient.setQueryData(
        ['product', item.productID],
        (old: Product | undefined) => {
          if (!old) return old
          return { ...old, isLiked: newIsLikedState }
        }
      )

      // Update favorites list
      queryClient.setQueryData(['favorites'], (old: ProductItem[] = []) => {
        if (newIsLikedState) {
          const favoriteItem: ProductItem = {
            productID: item.productID,
            name: item.name,
            storeID: item.storeID,
            storeName: item.storeName,
            price: item.price,
            currency: item.currency,
            discount: item.discount,
            averageRating: item.averageRating,
            isLiked: true,
            image: getImageUrl(),
          }
          return old.some((p) => p.productID === item.productID)
            ? old
            : [...old, favoriteItem]
        } else {
          return old.filter((p) => p.productID !== item.productID)
        }
      })

      setLiked(item.productID, newIsLikedState)
    },
    [item, queryClient, getImageUrl, setLiked]
  )

  // Add to favorites mutation
  const { mutate: addToFavorites } = useMutation({
    mutationFn: () => {
      if (!item?.productID) throw new Error('Product ID is required')
      return setProductToFavirotes(item.productID)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      await queryClient.cancelQueries({ queryKey: ['products'] })

      const previousState = {
        favorites: queryClient.getQueryData(['favorites']),
        products: queryClient.getQueryData(['products']),
      }

      // Update optimistically
      updateProductInQueries(true)

      return previousState
    },
    onError: (err, variables, context: any) => {
      if (!item?.productID) return
      setLiked(item.productID, false)
      if (context) {
        queryClient.setQueryData(['favorites'], context.favorites)
        queryClient.setQueryData(['products'], context.products)
      }
    },
  })

  // Remove from favorites mutation
  const { mutate: removeFromFavorites } = useMutation({
    mutationFn: () => {
      if (!item?.productID) throw new Error('Product ID is required')
      return removeProductFromFavorites(item.productID)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      await queryClient.cancelQueries({ queryKey: ['products'] })

      const previousState = {
        favorites: queryClient.getQueryData(['favorites']),
        products: queryClient.getQueryData(['products']),
      }

      // Update optimistically
      updateProductInQueries(false)

      return previousState
    },
    onError: (err, variables, context: any) => {
      if (!item?.productID) return
      setLiked(item.productID, true)
      if (context) {
        queryClient.setQueryData(['favorites'], context.favorites)
        queryClient.setQueryData(['products'], context.products)
      }
    },
  })

  const handleCardPress = useCallback(() => {
    if (!item?.productID || !item?.storeID) return

    router.push({
      pathname: '/store/[storeId]/product/[productId]',
      params: { storeId: item.storeID, productId: item.productID },
    })
  }, [router, item])

  const handleLikePress = useCallback(() => {
    if (!item?.productID) return

    if (!user) {
      setShowAuthModal(true)
      return
    }

    scale.value = withSequence(withSpring(1.2), withSpring(1))

    const currentLikedState = isLiked(item.productID)
    const newLikedState = !currentLikedState

    if (newLikedState) {
      addToFavorites()
    } else {
      removeFromFavorites()
    }
  }, [
    user,
    item?.productID,
    scale,
    isLiked,
    addToFavorites,
    removeFromFavorites,
  ])

  // Add cleanup for modal state
  useEffect(() => {
    return () => {
      setShowAuthModal(false) // Reset modal state on unmount
    }
  }, [])

  const calculateDiscountedPrice = useCallback(() => {
    if (!item?.price) return 0
    if (!item.discount) return item.price

    const discount = (item.price * item.discount) / 100
    return item.price - discount
  }, [item?.price, item?.discount])

  return {
    scale,
    handleCardPress,
    handleLikePress,
    calculateDiscountedPrice,
    showAuthModal,
    setShowAuthModal,
    getImageUrl,
    isLiked: item?.productID ? isLiked(item.productID) : false,
  }
}
