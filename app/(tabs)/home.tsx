import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Images } from '@/constants/images'
import Carousel from '@/components/layouts/Carousel'
import Stores from '@/components/layouts/Stores'
import Prouducts from '@/components/layouts/Prouducts'

const carouselItems = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '1',

    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '1',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '1',
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/200/300',
  },
  // Add more items as needed
]

// const categories = [
//   { id: 1, name: 'All', icon: '🛍️' },
//   { id: 2, name: 'Electronics', icon: '📱' },
//   { id: 3, name: 'Fashion', icon: '👕' },
//   { id: 4, name: 'Home', icon: '🏠' },
//   { id: 5, name: 'Beauty', icon: '💄' },
// ]

// const featuredProducts = [
//   {
//     id: 1,
//     name: 'Wireless Earbuds',
//     price: '$129',
//     image:
//       'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400',
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     price: '$299',
//     image:
//       'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400',
//   },
//   // Add more products...
// ]

const Home = () => {
  const router = useRouter()

  const words = ['متاجر', 'منتاجات']
  const [word, setWord] = useState(words[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setWord(words[(words.indexOf(word) + 1) % words.length])
    }, 1800)

    return () => clearInterval(interval)
  }, [word, words])

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        {/* Header */}
        <View className='mx-4 mt-5 mb-4 gap-4'>
          <View className='flex-row justify-between'>
            <View className='flex-row items-center gap-3'>
              {/* App logo */}
              <View className='w-16 h-16 border border-gray-200 rounded-2xl overflow-hidden'>
                <Image
                  source={Images.appIcon}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <Text className='font-notoKufiArabic-bold text-[2rem] text-primary'>
                سلة
              </Text>
            </View>
            {/* Location picker */}
            <TouchableOpacity
              onPress={() => {
                alert('TODO: implement location picker screen')
              }}>
              <View className='justify-center items-center'>
                <View className='flex-row items-center gap-1'>
                  <Ionicons name='chevron-down' size={16} color='black' />
                  <Text className='font-notoKufiArabic-semiBold'>
                    الموقع الحالي
                  </Text>
                </View>
                <Text className='font-notoKufiArabic-semiBold'>
                  {/* TODO: fetch User location  */}
                  Abu Dhabi, UAE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Search bar */}
          <View className='flex-row gap-4'>
            <Pressable
              onPress={() => alert('TODO: implement filter Model')}
              className='p-3 justify-center items-center rounded-2xl border border-gray-300'>
              <Ionicons name='filter-outline' size={24} color='gray' />
            </Pressable>
            <Pressable
              onPress={() => {
                router.replace('/(tabs)/search')
                alert('TODO: implement search screen')
              }}
              className='flex-row flex-1 px-3 justify-end items-center gap-4 rounded-2xl border border-gray-300'>
              <View className='flex-row-reverse'>
                <Text className='font-notoKufiArabic text-gray-500'>
                  ابحث عن
                </Text>
                <Text className='font-notoKufiArabic text-gray-500'>
                  {' '}
                  {word}
                </Text>
              </View>
              <Ionicons name='search-outline' size={24} color='gray' />
            </Pressable>
          </View>
        </View>

        <ScrollView className='flex-1'>
          {/* Slider */}
          <Carousel items={carouselItems} />

          {/* Stores */}
          <Stores />

          {/* Popular products */}
          <Prouducts title='المنتجات الشائعة' />

          {/* New arrival products */}
          <Prouducts title='المنتجات حديثة الوصول' />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Home
