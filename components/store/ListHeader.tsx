import { View, Text, TouchableOpacity } from 'react-native'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { Image } from 'expo-image'
import { useFullPath } from '@/hooks/useFullPath'
import { category, Store } from '@/types/store'
import ProBanner from '@/components/ProBanner'

type ListHeaderProps = {
  data: Store
  activeTab: number
  setActiveTab: (id: number) => void
}

const ListHeader = ({ data, activeTab, setActiveTab }: ListHeaderProps) => {
  const bannerImageURL = useFullPath(data?.banner)
  const storeImageURL = useFullPath(data?.image)

  const renderTab = ({ item: tab }: LegendListRenderItemProps<category>) => (
    <TouchableOpacity
      key={tab.id}
      className={`pb-2 ${
        activeTab === tab.id ? 'border-b-2 border-black' : ''
      }`}
      onPress={() => setActiveTab(tab.id)}>
      <Text
        className={`text-base font-notoKufiArabic ${
          activeTab === tab.id
            ? 'font-notoKufiArabic-bold text-primary'
            : 'text-gray-500'
        }`}>
        {tab.category}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View className='mb-6'>
      {/* Header Cover Image */}
      <View className='relative h-52'>
        <Image
          source={{ uri: bannerImageURL }}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
          transition={1000}
        />
      </View>

      {/* Store Info Card */}
      <View className='bg-white rounded-t-3xl -mt-4 pt-2 px-4 '>
        <View className='flex-row justify-between items-center gap-2'>
          {/* Store Image */}
          <View className='w-24 h-24 rounded-xl overflow-hidden shadow-sm'>
            <Image
              source={{ uri: storeImageURL }}
              style={{ width: '100%', height: '100%' }}
              contentFit='cover'
              transition={500}
            />
          </View>

          {/* Store Details */}
          <View className='flex-1'>
            {/* Store Name */}
            <View className='flex-row items-center justify-between mb-1'>
              <Text className='text-xl text-left font-notoKufiArabic-bold leading-loose text-gray-800'>
                {data.name}
              </Text>
              <View className='bg-gray-100 px-2 py-1 rounded-md'>
                <Text className='text-xs text-gray-600 font-notoKufiArabic-light leading-loose'>
                  {data.productsCount} منتج
                </Text>
              </View>
            </View>

            {/* Location */}
            <Text className='text-sm text-left text-gray-500 font-notoKufiArabic-light mb-2'>
              {data.country}
            </Text>

            {/* Description */}
            <Text
              className='text-gray-600 text-left font-notoKufiArabic-light text-sm'
              numberOfLines={2}
              ellipsizeMode='tail'>
              {data.description}
            </Text>
          </View>
        </View>
        {true && <ProBanner />}
      </View>

      {/* Category Tabs */}
      <View className='mt-6 px-4'>
        <LegendList
          data={data.categories}
          renderItem={renderTab}
          keyExtractor={(item) => item.id.toString()}
          recycleItems
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 32 }}
          contentContainerStyle={{ width: '100%', gap: '16' }}
        />
      </View>
    </View>
  )
}

export default ListHeader
