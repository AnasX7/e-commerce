import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axios = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
})

// Request interceptor - add auth token if available
axios.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // You could implement token refresh logic here if needed

      // For now, clear the token on 401 errors
      try {
        await AsyncStorage.removeItem('auth_token')
      } catch (e) {
        console.error('Error removing auth token:', e)
      }
    }

    // Handle CSRF token mismatch
    if (error.response?.status === 419) {
      // Get a fresh CSRF token
      try {
        await axios.get('/sanctum/csrf-cookie')
        // Retry the original request
        return axios(originalRequest)
      } catch (e) {
        console.error('Error refreshing CSRF token:', e)
      }
    }

    return Promise.reject(error)
  }
)

// Helper functions
export const isAxiosError = Axios.isAxiosError

export default axios
