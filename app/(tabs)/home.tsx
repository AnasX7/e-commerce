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
import Stores from '@/components/home/Stores'
import Prouducts from '@/components/home/Prouducts'
import AdsCarousel from '@/components/home/AdsCarousel'
import { Images } from '@/constants/images'
import { Colors } from '@/constants/colors'

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
        <View className='mx-4 mt-4 mb-3 gap-2'>
          <View className='flex-row-reverse justify-between items-center'>
            <View className='flex-row-reverse items-center gap-3'>
              {/* App logo */}
              <View className='w-14 h-14 border border-gray-200 rounded-2xl overflow-hidden'>
                <Image
                  source={Images.appIcon}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <Text className='font-notoKufiArabic-bold text-[30px] text-primary'>
                سلة
              </Text>
            </View>
            {/* Location picker */}
            <TouchableOpacity
              onPress={() => {
                alert('TODO: implement location picker screen')
              }}>
              <View className='justify-center items-start'>
                <View className='flex-row items-center gap-1'>
                  <Ionicons
                    name='location-sharp'
                    size={18}
                    color={Colors.text.primary}
                  />
                  <Text className='text-sm text-gray-800 font-notoKufiArabic-semiBold leading-relaxed'>
                    الموقع الحالي
                  </Text>
                  <Ionicons
                    name='chevron-down'
                    size={14}
                    color={Colors.text.primary}
                  />
                </View>
                <Text className='text-sm pl-4 text-gray-800 font-notoKufiArabic leading-relaxed'>
                  {/* TODO: fetch User location  */}
                  ابوظبي، بني ياس
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Search bar */}
          <View className='flex-row-reverse gap-4'>
            <Pressable
              onPress={() => alert('TODO: implement filter Model')}
              className='p-3 justify-center items-center rounded-xl border border-gray-300'>
              <Ionicons name='filter-outline' size={20} color={Colors.text.quaternary} />
            </Pressable>
            <Pressable
              onPress={() => {
                router.push('/search')
                alert('TODO: implement search screen')
              }}
              className='flex-row-reverse flex-1 px-3 justify-end items-center gap-3 rounded-xl border border-gray-300'>
              <View className='flex-row'>
                <Text className='font-notoKufiArabic text-gray-400'>
                  ابحث عن
                </Text>
                <Text className='font-notoKufiArabic text-gray-400'>
                  {' '}
                  {word}
                </Text>
              </View>
              <Ionicons name='search-outline' size={22} color={Colors.text.quaternary} />
            </Pressable>
          </View>
        </View>

        <ScrollView className='flex-1'>
          {/* Slider */}
          <AdsCarousel />

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
