import { useState } from 'react'
import { View, Text, TouchableOpacity, Platform, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Ionicons from '@expo/vector-icons/Ionicons'

const RegisterScreen = () => {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/(tabs)/home',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)


  const submitForm = () => {
    login({
      email,
      password,
      setErrors,
      setLoading,
    })
  }

  console.log('errors', errors)

  return (
    <SafeAreaView className='flex-1 bg-white'>
      {Platform.OS !== 'ios' && (
        <View className='flex-row-reverse pt-4 px-4'>
          <TouchableOpacity
            onPress={() => router.back()}
            className='w-10 h-10 items-center justify-center'>
            <Ionicons name='arrow-back' size={24} color='#333' />
          </TouchableOpacity>
        </View>
      )}

      <View className='flex-1 justify-center items-center px-4'>
        <Text className='text-2xl font-bold text-gray-800 mb-4'>
          Welcome Back
        </Text>
        <Text className='text-center text-gray-600 mb-8'>
          Sign in to your account to continue
        </Text>

        <View className='w-full max-w-sm'>
          {/* Email Input */}
          <View className='mb-4'>
            <Text className='text-gray-700 mb-2 font-medium'>Email</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-3 bg-gray-50'
              placeholder='Enter your email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
            {errors.email && (
              <Text className='text-red-500 text-sm mt-1'>
                {errors.email[0]}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View className='mb-6'>
            <Text className='text-gray-700 mb-2 font-medium'>Password</Text>
            <TextInput
              className='border border-gray-300 rounded-lg p-3 bg-gray-50'
              placeholder='Enter your password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && (
              <Text className='text-red-500 text-sm mt-1'>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className='mb-6'>
            <Text className='text-blue-600 text-right'>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={submitForm}
            disabled={loading}
            className={`py-3 px-8 rounded-xl w-full ${
              loading ? 'bg-blue-400' : 'bg-blue-600'
            }`}>
            <Text className='text-white font-semibold text-center'>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View className='flex-row justify-center mt-6'>
            <Text className='text-gray-600'>Don't have an account? </Text>
            <Link href='/register' asChild>
              <TouchableOpacity>
                <Text className='text-blue-600 font-semibold'>Register</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
