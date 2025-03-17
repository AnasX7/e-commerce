import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const RegisterScreen = () => {
  const router = useRouter()

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {Platform.OS !== 'ios' && (
        <View className='pt-4 px-4'>
          <TouchableOpacity
            onPress={() => router.back()}
            className='w-10 h-10 items-center justify-center'>
            <Ionicons name='arrow-forward' size={24} color='#333' />
          </TouchableOpacity>
        </View>
      )}

      <View className='flex-1 justify-center items-center px-4'>
        <Text className='text-2xl font-bold text-gray-800 mb-4'>
          Login to your Account
        </Text>
        <Text className='text-center text-gray-600 mb-8'>
          This is a placeholder for the login form.
        </Text>

        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/home')}
          className='bg-blue-600 py-3 px-8 rounded-xl'>
          <Text className='text-white font-semibold'>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
