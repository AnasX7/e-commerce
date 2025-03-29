import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useSearch } from '@/hooks/useSearch'
import { SearchBar } from '@/components/search/SearchBar'
import { FilterModal } from '@/components/search/FilterModal'
import { SortModal } from '@/components/search/SortModal'
import { ProductGrid } from '@/components/search/ProductGrid'
import { Colors } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'

const SearchScreen = () => {
  const params = useLocalSearchParams()
  const router = useRouter()
  const { performSearch, products, isLoading, count } = useSearch()

  useEffect(() => {
    if (params.title) {
      performSearch({ name: params.title as string })
    }
  }, [params.title])

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        {/* Header */}
        <View
          className='px-4 pb-1'>
          <View className='flex-row items-center justify-center'>
            <TouchableOpacity
              onPress={() => router.back()}
              className='absolute left-0'>
              <Ionicons
                name='chevron-forward'
                size={24}
                color={Colors.text.primary}
              />
            </TouchableOpacity>

            <Text className='text-lg font-notoKufiArabic-semiBold leading-loose text-gray-800'>
              البحث
            </Text>
          </View>
        </View>

        <View className='px-4 py-2'>
          <SearchBar initialValue={params.title as string} autoFocus={true} />
        </View>

        <View className='flex-row justify-between px-4 py-2'>
          <FilterModal />
          <SortModal />
        </View>

        {isLoading ? (
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size='large' color={Colors.primary} />
          </View>
        ) : (
          <>
            <Text className='px-4 py-2 text-gray-600 text-left font-notoKufiArabic-semiBold'>
              {count} نتيجة
            </Text>
            <ProductGrid products={products} />
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SearchScreen
