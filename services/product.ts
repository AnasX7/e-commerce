import { axios } from '@/lib/axios'

export const fetchProducts = async (take: number) => {
  try {
    const response = await axios.get(`/api/products/${take}`)
    // console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch products')
  }
}

export const fetchStoreProductsByCategory = async (
  storeId: number,
  categoryId: number
) => {
  try {
    const response = await axios.get(
      `/api/store/${storeId}/category/${categoryId}/products`
    )
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch products')
  }
}

export const fetchProductDetails = async (
  storeId: number,
  productId: string
) => {
  try {
    const response = await axios.get(
      `/api/store/${storeId}/product/${productId}`
    )
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch product details')
  }
}
