import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'
import { axios } from '@/lib/axios'

interface AuthState {
  token: string | null
  isLoading: boolean
  isInitialized: boolean
  setToken: (token: string | null) => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoading: true,
  isInitialized: false,
  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync('auth_token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      await SecureStore.deleteItemAsync('auth_token')
      delete axios.defaults.headers.common['Authorization']
    }
    set({ token })
  },
  initialize: async () => {
    try {
      const token = await SecureStore.getItemAsync('auth_token')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      set({ token, isInitialized: true, isLoading: false })
    } catch (error) {
      console.error('Failed to initialize auth store:', error)
      set({ isInitialized: true, isLoading: false })
    }
  },
}))
