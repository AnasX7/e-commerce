import { View, Text, TouchableOpacity } from 'react-native'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import { useSearch } from '@/hooks/useSearch'
import { SortOption } from '@/types/search'
import { Colors } from '@/constants/colors'
import { useSheetRef } from '@/components/ui/Sheet'
import { Sheet } from '@/components/ui/Sheet'
import SortButton from './SortButton'

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'latest', label: 'الأحدث' },
  { value: 'oldest', label: 'الأقدم' },
  { value: 'price_asc', label: 'السعر: من الأقل إلى الأعلى' },
  { value: 'price_desc', label: 'السعر: من الأعلى إلى الأقل' },
  { value: 'views', label: 'الأكثر مشاهدة' },
]

type SortModalProps = {
  theme?: 'default' | 'transparent'
}

export const SortModal = ({ theme = 'default' }: SortModalProps) => {
  const { filters, setFilters, performSearch } = useSearch()

  const bottomSheetModalRef = useSheetRef()

  const handleSort = (sort: SortOption) => {
    setFilters({ sort })
    performSearch()
    bottomSheetModalRef.current?.close()
  }

  const containerClass =
    theme === 'transparent'
      ? 'bg-white/10 border-transparent'
      : 'bg-white border-gray-300'

  const iconColor = theme === 'transparent' ? '#fff' : Colors.text.quaternary

  const renderSortItem = ({
    item: option,
  }: LegendListRenderItemProps<(typeof sortOptions)[0]>) => (
    <SortButton option={option} filters={filters} handleSort={handleSort} />
  )

  return (
    <>
      <TouchableOpacity
        onPress={() => bottomSheetModalRef.current?.present()}
        className={`flex-row items-center gap-x-2 px-4 py-3 rounded-xl border ${containerClass}`}>
        <Ionicons name='swap-vertical' size={18} color={iconColor} />
      </TouchableOpacity>

      <Sheet ref={bottomSheetModalRef} snapPoints={[532]}>
        <BottomSheetView className='flex-1 justify-center px-6 pb-16'>
          <LegendList
            data={sortOptions}
            renderItem={renderSortItem}
            keyExtractor={(item) => item.value}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 16 }}
          />

          <TouchableOpacity
            onPress={() => bottomSheetModalRef.current?.close()}
            className='mt-4 py-3 bg-gray-100 rounded-xl'>
            <Text className='text-center font-notoKufiArabic text-gray-600'>
              إلغاء
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </Sheet>
    </>
  )
}
