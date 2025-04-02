import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { axios } from '@/lib/axios'
import * as SecureStore from 'expo-secure-store'

type AuthState = {
  token: string | null
  isLoading: boolean
  isInitialized: boolean
  user: null | Record<string, any>
  setToken: (token: string | null) => Promise<void>
  setUser: (user: null | Record<string, any>) => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoading: true,
      isInitialized: false,
      user: null,
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
      setUser: (user) => set({ user }),
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
    }),
    {
      name: 'auth-store',
      storage: {
        getItem: async (name) => {
          const data = await SecureStore.getItemAsync(name)
          return data ? JSON.parse(data) : null
        },
        setItem: async (name, value) => {
          await SecureStore.setItemAsync(name, JSON.stringify(value))
        },
        removeItem: async (name) => {
          await SecureStore.deleteItemAsync(name)
        },
      },
    }
  )
)
