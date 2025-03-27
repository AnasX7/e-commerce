import { View } from 'react-native'
import { MotiView } from 'moti'

export const ProductDetailsSkeleton = () => {
  return (
    <View className='flex-1 pt-safe-offset-8 bg-white p-4'>
      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ loop: true, duration: 1000 }}
        className='h-96 bg-gray-200 rounded-xl mb-4'
      />
      <View className='flex-row justify-between items-start'>
        <View className='flex-1'>
          <View className='h-8 bg-gray-200 rounded w-3/4 mb-2' />
          <View className='h-4 bg-gray-200 rounded w-1/2' />
        </View>
        <View className='h-8 bg-gray-200 rounded w-24' />
      </View>
    </View>
  )
}
