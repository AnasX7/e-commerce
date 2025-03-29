import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native'
import { useState } from 'react'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'
import { useSearch } from '@/hooks/useSearch'
import { Colors } from '@/constants/colors'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const colors = ['red', 'blue', 'green', 'black', 'white']
const sizes = ['S', 'M', 'L', 'XL', 'XXL']

interface FilterModalProps {
  theme?: 'default' | 'transparent'
}

export const FilterModal = ({ theme = 'default' }: FilterModalProps) => {
  const [visible, setVisible] = useState(false)
  const { filters, setFilters, performSearch, resetFilters } = useSearch()

  const handleApplyFilters = () => {
    performSearch()
    setVisible(false)
  }

  const handleResetFilters = () => {
    resetFilters()
    performSearch()
    setVisible(false)
  }

  const containerClass =
    theme === 'transparent'
      ? 'bg-white/10 border-transparent'
      : 'bg-white border-gray-300'

  const textColor = theme === 'transparent' ? 'text-white' : 'text-gray-600'
  const iconColor = theme === 'transparent' ? '#fff' : Colors.text.quaternary

  const renderColorItem = ({ item: color }: { item: string }) => (
    <TouchableOpacity
      onPress={() => setFilters({ color })}
      className={`px-4 py-2 rounded-xl border ${
        filters.color === color
          ? 'border-primary bg-primary/5'
          : 'border-gray-200'
      }`}>
      <Text
        className={`font-notoKufiArabic ${
          filters.color === color ? 'text-primary' : 'text-gray-600'
        }`}>
        {color}
      </Text>
    </TouchableOpacity>
  )

  const renderSizeItem = ({ item: size }: { item: string }) => (
    <TouchableOpacity
      onPress={() => setFilters({ size })}
      className={`px-4 py-2 rounded-xl border ${
        filters.size === size
          ? 'border-primary bg-primary/5'
          : 'border-gray-200'
      }`}>
      <Text
        className={`font-notoKufiArabic ${
          filters.size === size ? 'text-primary' : 'text-gray-600'
        }`}>
        {size}
      </Text>
    </TouchableOpacity>
  )

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className={`flex-row items-center gap-x-2 px-4 py-3 rounded-xl border ${containerClass}`}>
        <Text className={`font-notoKufiArabic ${textColor}`}>
          {filters.color || filters.size ? 'تم التصفية' : 'تصفية'}
        </Text>
        <Ionicons name='filter' size={18} color={iconColor} />
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

            {/* Reset Button */}
            <View className='flex-row justify-end mb-6'>
              <TouchableOpacity
                onPress={handleResetFilters}
                className='flex-row items-center gap-x-2 px-4 py-2 rounded-xl bg-red-50'>
                {/* <Text className='font-notoKufiArabic text-red-500'>
                  إعادة تعيين
                </Text> */}
                <Ionicons name='reload' size={20} color='#ef4444' />
              </TouchableOpacity>
            </View>

            {/* Colors */}
            <Text className='text-lg font-notoKufiArabic-bold mb-4 text-left'>
              الألوان
            </Text>
            <View className='flex-row-reverse flex-wrap gap-2 mb-6'>
              <FlatList
                data={colors}
                renderItem={renderColorItem}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='w-full gap-2 pb-6'
              />
            </View>

            {/* Sizes */}
            <Text className='text-lg font-notoKufiArabic-bold mb-4 text-left'>
              المقاسات
            </Text>
            <View className='flex-row-reverse flex-wrap gap-2 mb-6'>
              <FlatList
                data={sizes}
                renderItem={renderSizeItem}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='w-full gap-2 pb-6'
              />
            </View>

            {/* Actions */}
            <View className='gap-4'>
              <TouchableOpacity
                onPress={handleApplyFilters}
                className='w-full py-3 bg-primary rounded-xl'>
                <Text className='text-center font-notoKufiArabic text-white'>
                  تطبيق التصفية
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVisible(false)}
                className='w-full mt-3 py-3 bg-gray-100 rounded-xl'>
                <Text className='text-center font-notoKufiArabic text-gray-600'>
                  إلغاء
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
