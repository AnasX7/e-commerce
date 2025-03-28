import { axios } from '@/lib/axios'
import * as SecureStore from 'expo-secure-store'

export const getAllFavorites = async () => {
  const token = await SecureStore.getItemAsync('auth_token')
  if (!token) {
    return [] // Return empty array if no token exists
  }
  
  try {
    const response = await axios.get('/api/favorites')
    return response.data
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return [] // Return empty array on unauthorized
    }
    console.error('Error fetching favorites:', error)
    throw error
  }
}

export const setProductToFavirotes = async (productID: string) => {
  try {
    const response = await axios.post(`/api/favorites/${productID}`)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to add product to favorites')
  }
}

export const removeProductFromFavorites = async (productID: string) => {
  try {
    const response = await axios.delete(`/api/favorites/${productID}`)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to remove product from favorites')
  }
}
