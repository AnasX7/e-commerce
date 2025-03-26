import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const tabs = [
  { id: 'less30', label: 'أقل من 30' },
  { id: 'offers', label: 'العروض' },
  { id: 'favorites', label: 'اختيارات على ذوقك', icon: 'heart' },
]

const ListHeader = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('favorites')

  const renderTab = ({ item: tab }: any) => (
    <TouchableOpacity
      key={tab.id}
      className={`mr-6 pb-2 ${
        activeTab === tab.id ? 'border-b-2 border-black' : ''
      }`}
      onPress={() => setActiveTab(tab.id)}>
      <View className='flex-row items-center'>
        <Text
          className={`text-base ${
            activeTab === tab.id ? 'font-bold' : 'text-gray-500'
          }`}>
          {tab.label}
        </Text>
        {tab.icon && activeTab === tab.id && (
          <Ionicons
            name={tab.icon as any}
            size={16}
            color='#F97316'
            className='ml-1'
          />
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <View className='mb-6'>
      {/* Header Cover Image */}
      <View className={`relative h-52`}>
        <Image
          source={{
            uri: 'https://picsum.photos/200/300',
          }}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
        />
      </View>

      {/* Store Info Card */}
      <View className='bg-white rounded-t-3xl -mt-4 pt-4 px-4'>
        <View className='flex-row-reverse justify-between items-center gap-2'>
          <View className='flex-1'>
            <Text className='text-xl text-left font-notoKufiArabic-bold leading-loose'>
              متجر ابل
            </Text>
            <Text className='text-gray-500 text-left font-notoKufiArabic-light leading-relaxed'>
              انغمس في الغمر: استمتع بكل شيء بوضوح ممتاز، مع شاشة فل اتش دي بلس
            </Text>
          </View>
          <View className='w-20 h-20 rounded-lg overflow-hidden'>
            <Image
              source={{ uri: 'https://picsum.photos/200/300' }}
              style={{ width: '100%', height: '100%' }}
              contentFit='cover'
            />
          </View>
        </View>

        {/* Pro Banner */}
        {true && (
          <TouchableOpacity
            onPress={() => router.push('/(settings)/pro')}
            className='bg-secondary rounded-lg mt-4 px-3 py-2.5 flex-row justify-between items-center'>
            <View className='flex-row items-center'>
              <Text className='text-white font-notoKufiArabic ml-2'>
                احصل على توصيل مجاني مع
              </Text>
              <View className='bg-primary flex-row rounded px-2 py-1 mx-2'>
                <Text className='text-white font-bold'>pro</Text>
                <Ionicons name='flame' size={16} color='#fff' />
              </View>
            </View>
            <Text className='text-white font-notoKufiArabic'>انضم</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Category Tabs */}
      <View className='mt-6 px-4'>
        <View className='flex-row justify-between'>
          <FlatList
            data={tabs}
            renderItem={renderTab}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

export default ListHeader
