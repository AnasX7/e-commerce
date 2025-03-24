import { axios } from '@/lib/axios'

export const fetchProducts = async (take: number) => {
  try {
    const response = await axios.get(`/api/products/${take}`)
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch products')
  }
}

export const fetchProduct = async (id: string) => {
  try {
    const response = await axios.get(`/product/${id}`)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

export const fetchStoreProducts = async (storeId: string) => {
  try {
    const response = await axios.get(`/store/${storeId}/products`)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
