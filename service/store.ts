import axios from '@/lib/axios'

export const getAllStores = async () => {
  try {
    const response = await axios.get('/stores')
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
