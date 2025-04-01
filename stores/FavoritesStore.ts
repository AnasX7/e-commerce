import { create } from 'zustand'
import { ProductItem } from '@/types/product'

interface FavoritesStore {
  likedProducts: Record<string, boolean>
  favorites: ProductItem[]
  setLiked: (productId: string, isLiked: boolean) => void
  setFavorites: (favorites: ProductItem[]) => void
  isLiked: (productId: string) => boolean
  reset: () => void
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  likedProducts: {},
  favorites: [],
  setLiked: (productId, isLiked) =>
    set((state) => ({
      likedProducts: {
        ...state.likedProducts,
        [productId]: isLiked,
      },
    })),
  setFavorites: (favorites) =>
    set((state) => ({
      favorites: Array.isArray(favorites) ? favorites : state.favorites,
      likedProducts: favorites.reduce(
        (acc, item) => ({
          ...acc,
          [item.productID]: item.isLiked,
        }),
        { ...state.likedProducts }
      ),
    })),
  isLiked: (productId) => get().likedProducts[productId] || false,
  reset: () => set({ likedProducts: {}, favorites: [] }),
}))
