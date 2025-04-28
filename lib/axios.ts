import Axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export const axios = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor
axios.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
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
  (error) => Promise.reject(error)
)

// Response interceptor with enhanced error handling
axios.interceptors.response.use(
  (response) => {
    // console.log('Response received:', {
    //   status: response.status,
    //   data: response.data,
    //   headers: response.headers,
    // })
    return response
  },
  async (error) => {
    // console.log('API Error:', {
    //   message: error.message,
    //   code: error.code,
    //   config: {
    //     url: error.config?.url,
    //     method: error.config?.method,
    //     baseURL: error.config?.baseURL,
    //   },
    //   response: error.response?.data,
    // })

    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await SecureStore.deleteItemAsync('auth_token')
      delete axios.defaults.headers.common['Authorization']
    }

    return Promise.reject(error)
  }
)

export const isAxiosError = Axios.isAxiosError
