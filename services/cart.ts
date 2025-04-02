import { axios } from '@/lib/axios'
import { CartItem, AddToCartPayload, UpdateCartPayload } from '@/types/cart'

export const fetchCart = async (storeId: number): Promise<CartItem[]> => {
  try {
    const { data } = await axios.get(`/api/store/${storeId}/cart`)
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch cart')
  }
}

export const addToCart = async (
  storeId: number,
  productId: string,
  payload: AddToCartPayload
): Promise<CartItem> => {
  try {
    const { data } = await axios.post(
      `/api/store/${storeId}/cart/product/${productId}`,
      payload
    )
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to add to cart')
  }
}

export const updateCartItem = async (
  storeId: number,
  productId: string,
  payload: UpdateCartPayload
): Promise<CartItem> => {
  try {
    const { data } = await axios.put(
      `/api/store/${storeId}/cart/product/${productId}`,
      payload
    )
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to update cart item')
  }
}

export const removeFromCart = async (
  storeId: number,
  productId: string
): Promise<void> => {
  try {
    await axios.delete(`/api/store/${storeId}/cart/product/${productId}`)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to remove from cart')
  }
}
