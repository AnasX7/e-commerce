import { axios } from '@/lib/axios'

export type Product = {
  id: string
  productName: string
  productDescription: string
  storeName: string
  price: number
  currency: string
  imageURLs: string[]
  discount?: number
  category: string
  rating: number
  reviews: Review[]
  isLiked: boolean
}

type Review = {
  id: string
  userId: number
  rating: number
  comment: string
}

export type StoreProducts = {
  id: string
  productName: string
  storeName: string
  imageURL: string
  price: number
  currency: string
  discount?: number
  category: string
  rating: number
  isLiked: boolean
}

export const getProduct = async (id: string) => {
  try {
    const response = await axios.get<Product>(`/product/${id}`)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

export const getStoreProducts = async (storeId: string) => {
  try {
    const response = await axios.get<StoreProducts>(
      `/store/${storeId}/products`
    )
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
