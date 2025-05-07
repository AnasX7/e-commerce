import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useQueryClient, useMutation } from '@tanstack/react-query'
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
import { useFavoritesStore } from '@/stores/FavoritesStore'
import { useFullPath } from '@/hooks/useFullPath'
import { useSheetRef } from '@/components/ui/Sheet'
import { Product, ProductItem } from '@/types/product'
import { CartItem } from '@/types/cart'

type UseProductProps = {
  item: ProductItem | Product | CartItem | undefined
}

export const useProduct = ({ item }: UseProductProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const scale = useSharedValue(1)
  const { isAuthenticated } = useAuth({ middleware: 'guest' })
  // const [showAuthModal, setShowAuthModal] = useState(false)
  const { setLiked, isLiked } = useFavoritesStore()

  const bottomSheetModalRef = useSheetRef()

  // Get the image URL based on item type
  const getImageUrl = () => {
    if (!item) return ''
    if ('image' in item) {
      return useFullPath(item.image)
    }
    return useFullPath(item.images[0])
  }

  // Initialize store with item's initial liked state
  useEffect(() => {
    if (item?.productID && typeof item?.isLiked === 'boolean') {
      setLiked(item.productID, item.isLiked)
    }
  }, [item?.productID, item?.isLiked, setLiked])

  // Update all related queries with new isLiked state
  const updateProductInQueries = (newIsLikedState: boolean) => {
    if (!item?.productID) return

    // Update favorites first
    queryClient.setQueryData(['favorites'], (old: ProductItem[] = []) => {
      if (newIsLikedState) {
        if (!item) return old
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

    // Update other queries
    queryClient.setQueriesData({ queryKey: ['products'] }, (old: any) => {
      if (!old) return old
      return {
        ...old,
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
    setLiked(item.productID, newIsLikedState)
  }

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

  const handleCardPress = () => {
    if (!item?.productID || !item?.storeID) return

    router.push({
      pathname: '/store/[storeId]/product/[productId]',
      params: { storeId: item.storeID, productId: item.productID },
    })
  }

  const handleLikePress = () => {
    if (!item?.productID) return

    if (!isAuthenticated) {
      // setShowAuthModal(true)
      bottomSheetModalRef.current?.present()
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
  }

  // Add cleanup for modal state
  // useEffect(() => {
  //   return () => {
  //     setShowAuthModal(false) // Reset modal state on unmount
  //   }
  // }, [])

  const calculateDiscountedPrice = () => {
    if (!item?.price) return 0
    if (!item.discount) return item.price

    const discount = (item.price * item.discount) / 100
    return item.price - discount
  }

  return {
    scale,
    handleCardPress,
    handleLikePress,
    calculateDiscountedPrice,
    // showAuthModal,
    // setShowAuthModal,
    bottomSheetModalRef,
    getImageUrl,
    isLiked: item?.productID ? isLiked(item.productID) : false,
  }
}
