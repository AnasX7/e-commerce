import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const axios = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

// Request interceptor - add auth token if available
axios.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // Enhanced request logging
      console.log('Request Details:', {
        method: config.method?.toUpperCase(),
        url: `${config.baseURL || ''}${config.url || ''}`,
        headers: config.headers,
        data: config.data,
      })
    } catch (error) {
      console.error('Error retrieving auth token:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Enhanced error handling in response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    })
    return response
  },
  async (error) => {
    console.log('API Error:', {
      message: error.message,
      code: error.code,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      },
      response: error.response?.data,
    })

    const originalRequest = error.config

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // For now, clear the token on 401 errors
      try {
        await AsyncStorage.removeItem('auth_token')
      } catch (e) {
        console.error('Error removing auth token:', e)
      }
    }

    return Promise.reject(error)
  }
)

// Helper functions
export const isAxiosError = Axios.isAxiosError
