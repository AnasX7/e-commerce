import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'
import { useSearch } from '@/hooks/useSearch'
import { SortOption } from '@/types/search'
import { Colors } from '@/constants/colors'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const sortOptions: { value: SortOption; label: string }[] = [
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
  const [visible, setVisible] = useState(false)
  const { filters, setFilters, performSearch } = useSearch()

  const handleSort = (sort: SortOption) => {
    setFilters({ sort })
    performSearch()
    setVisible(false)
  }

  const containerClass =
    theme === 'transparent'
      ? 'bg-white/10 border-transparent'
      : 'bg-white border-gray-300'

  const textColor = theme === 'transparent' ? 'text-white' : 'text-gray-600'
  const iconColor = theme === 'transparent' ? '#fff' : Colors.text.quaternary

  const renderSortItem = ({
    item: option,
  }: {
    item: (typeof sortOptions)[0]
  }) => (
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

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className={`flex-row items-center gap-x-2 px-4 py-3 rounded-xl border ${containerClass}`}>
        <Text className={`font-notoKufiArabic ${textColor}`}>
          {filters.sort
            ? sortOptions.find((opt) => opt.value === filters.sort)?.label
            : 'ترتيب'}
        </Text>
        <Ionicons name='swap-vertical' size={18} color={iconColor} />
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onSwipeComplete={() => setVisible(false)}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        swipeDirection='down'
        backdropOpacity={0.2}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}>
        <View className='bg-white w-full rounded-t-3xl pb-safe'>
          <View className='p-6'>
            <View className='items-center mb-6'>
              <View className='w-16 h-1 bg-gray-300 rounded-full' />
            </View>

            <FlatList
              data={sortOptions}
              renderItem={renderSortItem}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />

            <TouchableOpacity
              onPress={() => setVisible(false)}
              className='mt-4 py-3 bg-gray-100 rounded-xl'>
              <Text className='text-center font-notoKufiArabic text-gray-600'>
                إلغاء
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}
