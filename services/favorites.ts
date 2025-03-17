import axios from '@/lib/axios'

export const getAllFavorites = async () => {
  try {
    const response = await axios.get('/favorites')
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
