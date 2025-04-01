import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Location } from '@/types/location'

interface LocationState {
  mainLocation: Location | null
  setMainLocation: (location: Location | null) => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      mainLocation: null,
      setMainLocation: (location) => set({ mainLocation: location }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
