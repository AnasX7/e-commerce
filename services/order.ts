import { axios } from '@/lib/axios'

export const checkout = async (storeId: number, locationId: number) => {
  try {
    const { data } = await axios.post(`/api/store/${storeId}/cart/checkout`, {
      locationId,
    })
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to checkout')
  }
}

export const fetchOrders = async () => {
  try {
    const { data } = await axios.get('/api/orders')
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch orders')
  }
}
