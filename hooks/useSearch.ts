import { useSearchStore } from '@/stores/SearchStore'
import { searchProducts } from '@/services/search'
import { SearchFilters } from '@/types/search'

export const useSearch = () => {
  const {
    filters,
    products,
    count,
    isLoading,
    setFilters,
    setProducts,
    setCount,
    setIsLoading,
    resetFilters,
  } = useSearchStore()

  const performSearch = async (newFilters?: Partial<SearchFilters>) => {
    try {
      setIsLoading(true)
      if (newFilters) {
        setFilters(newFilters)
      }

      const searchFilters = newFilters ? { ...filters, ...newFilters } : filters
      const response = await searchProducts(searchFilters)

      setProducts(response.products)
      setCount(response.count)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    filters,
    products,
    count,
    isLoading,
    setFilters,
    performSearch,
    resetFilters,
  }
}
