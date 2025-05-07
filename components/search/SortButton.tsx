import { Text, TouchableOpacity } from 'react-native'
import { SearchFilters, SortOption } from '@/types/search'
import { sortOptions } from '@/components/search/SortModal'

type renderSortItemProps = {
  option: (typeof sortOptions)[0]
  filters: SearchFilters
  handleSort: (sort: SortOption) => void
}

const SortButton = ({ option, filters, handleSort }: renderSortItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => handleSort(option.value)}
      className={`py-4 px-4 mb-2 rounded-xl border ${
        filters.sort === option.value
          ? 'border-primary bg-primary/5'
          : 'border-gray-200'
      }`}>
      <Text
        className={`font-notoKufiArabic text-center ${
          filters.sort === option.value ? 'text-primary' : 'text-gray-600'
        }`}>
        {option.label}
      </Text>
    </TouchableOpacity>
  )
}

export default SortButton
