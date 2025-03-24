import { axios } from '@/lib/axios'

export const getAllFavorites = async () => {
  try {
    const response = await axios.get('/api/favorites')
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch favorites')
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
