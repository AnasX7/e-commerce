import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const AccountScreen = () => {
  const user = {
    name: 'أنس سالم',
    country: 'الإمارات',
    avatar: null, // Will use initial instead
    points: 0,
  }

  const menuItems = [
    {
      id: 'rewards',
      title: 'مكافآت',
      icon: <AntDesign name='gift' size={20} color='#000' />,
      rightIcon: true,
    },
    {
      id: 'orders',
      title: 'طلباتي السابقة',
      icon: (
        <MaterialCommunityIcons
          name='clipboard-text-outline'
          size={20}
          color='#000'
        />
      ),
    },
    {
      id: 'payments',
      title: 'أجل الدفع',
      icon: <FontAwesome5 name='money-check' size={18} color='#000' />,
    },
    {
      id: 'referral',
      title: 'ادع أصدقائك',
      icon: <Feather name='users' size={20} color='#000' />,
      subtitle: 'احصل على 600 د.ا',
    },
    {
      id: 'vouchers',
      title: 'القسائم',
      icon: (
        <MaterialCommunityIcons
          name='ticket-percent-outline'
          size={20}
          color='#000'
        />
      ),
    },
    {
      id: 'talabat-pro',
      title: 'talabat pro',
      icon: (
        <View className='bg-purple-700 rounded px-1 py-0.5'>
          <Text className='text-white text-xs font-bold'>pro</Text>
        </View>
      ),
    },
    {
      id: 'help',
      title: 'احصل على المساعدة',
      icon: <Ionicons name='help-circle-outline' size={22} color='#000' />,
    },
    {
      id: 'about',
      title: 'حول التطبيق',
      icon: (
        <Ionicons name='information-circle-outline' size={22} color='#000' />
      ),
    },
  ]

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <StatusBar style='dark' />

      {/* Header with Settings */}
      <View className='px-4 pt-2 flex-row justify-between items-center'>
        <TouchableOpacity className='p-2'>
          <Ionicons name='settings-outline' size={24} color='#000' />
        </TouchableOpacity>

        {/* Profile Info */}
        <View className='flex-row items-center'>
          <View className='mr-3'>
            <Text className='text-lg font-bold text-right'>{user.name}</Text>
            <View className='flex-row items-center justify-end'>
              <Text className='text-gray-500 text-right text-sm'>
                {user.country}
              </Text>
              <Image
                source={{ uri: 'https://picsum.photos/200/300' }}
                className='w-4 h-4 rounded-full ml-1'
              />
            </View>
          </View>

          {user.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              className='w-10 h-10 rounded-full'
            />
          ) : (
            <View className='w-10 h-10 rounded-full bg-orange-100 items-center justify-center'>
              <Text className='text-orange-800 font-bold text-lg'>أ</Text>
            </View>
          )}
        </View>
      </View>

      {/* Pro Banner */}
      <View className='mx-4 mt-6'>
        <TouchableOpacity className='bg-purple-600 rounded-xl p-4 flex-row justify-between items-center'>
          <View className='flex-row items-center'>
            <MaterialCommunityIcons
              name='star-four-points'
              size={16}
              color='#FFD700'
            />
          </View>

          <View className='flex-1 items-end'>
            <View className='flex-row items-center'>
              <Text className='text-white text-lg font-bold mr-2'>
                توصيل مجاني غير محدود
              </Text>
              <Image
                source={{ uri: 'https://picsum.photos/200/300' }}
                className='w-20 h-8'
                resizeMode='contain'
              />
            </View>
            <Text className='text-white text-sm text-right'>
              بدءاً من 29 د.ا شهرياً
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <ScrollView className='mt-6'>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className='flex-row justify-between items-center px-6 py-3.5 border-b border-gray-100'>
            {item.rightIcon && (
              <View className='bg-gray-100 p-1 rounded'>
                <Text className='text-gray-600'>0 نقاط</Text>
              </View>
            )}

            <View className='flex-1 flex-row justify-end items-center'>
              {item.subtitle && (
                <Text className='text-gray-500 text-sm ml-2'>
                  {item.subtitle}
                </Text>
              )}

              <Text className='text-base text-right ml-3'>{item.title}</Text>

              <View className='ml-3 w-6 items-center'>{item.icon}</View>
            </View>
          </TouchableOpacity>
        ))}
        <View className='h-20' /> {/* Bottom spacing */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen
