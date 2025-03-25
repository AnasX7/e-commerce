import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { User } from '@/types/user'

const ListHeader = ({ user }: { user: User | null }) => {
  const router = useRouter()

  const handelBannerPress = useCallback(() => {
    router.push('/(settings)/pro')
  }, [router])

  return (
    <>
      {user && (
        <View className='px-4 pt-2 flex-row justify-between items-center'>
          {/* Profile Info */}
          <View className='flex-row gap-2 items-center'>
            <View className='w-10 h-10 rounded-full bg-orange-100 items-center justify-center'>
              <Text className='text-orange-800 font-bold text-lg'>
                {user.name[0]}
              </Text>
            </View>

            <Text className='text-lg font-notoKufiArabic-semiBold leading-loose text-right'>
              {user.name}
            </Text>
          </View>
        </View>
      )}

      {/* Pro Banner */}
      <View className='mx-4 mt-6'>
        <TouchableOpacity
          onPress={handelBannerPress}
          className='bg-secondary rounded-xl p-4 flex-row justify-between items-center'>
          <View className='flex-1 flex-row justify-between items-center'>
            <View className='justify-between'>
              <Text className='text-white text-left text-lg font-notoKufiArabic-bold leading-loose'>
                توصيل مجاني غير محدود
              </Text>
              <Text className='text-white text-sm text-left font-notoKufiArabic leading-loose'>
                بدءاً من 29 د.ا شهرياً
              </Text>
            </View>
            <View className='bg-primary flex-row justify-center items-center rounded px-2 py-1 mx-2'>
              <Text className='text-white text-2xl font-bold'>pro</Text>
              <Ionicons name='flame' size={20} color='#fff' />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ListHeader
