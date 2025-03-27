import { axios } from '@/lib/axios'

export const fetchStores = async () => {
  try {
    const response = await axios.get('/api/stores')
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch stores')
  }
}

export const fetchStore = async (id: number) => {
  try {
    const response = await axios.get(`/api/store/${id}`)
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch store data')
  }
}
