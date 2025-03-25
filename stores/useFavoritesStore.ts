import { create } from 'zustand'
import { ProductItem } from '@/types/product'

interface FavoritesStore {
  likedProducts: Record<string, boolean>
  setLiked: (productId: string, isLiked: boolean) => void
  isLiked: (productId: string) => boolean
  reset: () => void // Add this
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  likedProducts: {},
  setLiked: (productId, isLiked) =>
    set((state) => ({
      likedProducts: {
        ...state.likedProducts,
        [productId]: isLiked,
      },
    })),
  isLiked: (productId) => get().likedProducts[productId] || false,
  reset: () => set({ likedProducts: {} }), // Add this
}))
