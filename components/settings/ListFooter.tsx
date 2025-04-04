import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { User } from '@/types/user'
import { useRouter } from 'expo-router'

type ListFooterProps = {
  isAuthenticated: boolean
  logout: () => void
}

const ListFooter = ({ isAuthenticated, logout }: ListFooterProps) => {
  const router = useRouter()

  return (
    <View className='p-4 mt-5'>
      {isAuthenticated ? (
        <TouchableOpacity
          onPress={logout}
          className='bg-white py-3 rounded-xl border border-gray-300'>
          <Text className='text-gray-600 font-notoKufiArabic-semiBold text-center'>
            تسجيل الخروج
          </Text>
        </TouchableOpacity>
      ) : (
        <View className='justify-between gap-2'>
          <TouchableOpacity
            onPress={() => {
              router.push('/login')
            }}
            className='bg-primary py-3 rounded-xl'>
            <Text className='text-white font-notoKufiArabic-semiBold text-center'>
              تسجيل الدخول
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push('/register')
            }}
            className='bg-white py-3 rounded-xl border border-gray-300'>
            <Text className='text-gray-600 font-notoKufiArabic-semiBold text-center'>
              إنشاء حساب
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default ListFooter
