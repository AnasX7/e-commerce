import { create } from 'zustand'
import { SearchFilters, SearchProduct } from '@/types/search'

interface SearchState {
  filters: SearchFilters
  products: SearchProduct[]
  count: number
  isLoading: boolean
  setFilters: (filters: Partial<SearchFilters>) => void
  setProducts: (products: SearchProduct[]) => void
  setCount: (count: number) => void
  setIsLoading: (isLoading: boolean) => void
  resetFilters: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  filters: {},
  products: [],
  count: 0,
  isLoading: false,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setProducts: (products) => set({ products }),
  setCount: (count) => set({ count }),
  setIsLoading: (isLoading) => set({ isLoading }),
  resetFilters: () => set({ filters: {} }),
}))
