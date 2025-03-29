import { axios } from '@/lib/axios'
import { SearchFilters, SearchResponse } from '@/types/search'

export const searchProducts = async (
  filters: SearchFilters
): Promise<SearchResponse> => {
  try {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })
    const response = await axios.get(`/api/search?${queryParams.toString()}`)
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
    throw new Error('Failed to fetch search results')
  }
}
