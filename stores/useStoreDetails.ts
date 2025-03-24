import { create } from 'zustand'

interface StoreDetailsState {
  storeName: string
  setStoreName: (name: string) => void
}

export const useStoreDetails = create<StoreDetailsState>((set) => ({
  storeName: '',
  setStoreName: (name) => set({ storeName: name }),
}))
