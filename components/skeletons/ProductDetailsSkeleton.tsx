import { View, Dimensions } from 'react-native'
import { MotiView } from 'moti'

const { width } = Dimensions.get('window')

export const ProductDetailsSkeleton = () => {
  return (
    <View className='flex-1 bg-white'>
      {/* Header */}
      <View className='pt-safe-offset-2 px-4 pb-3 flex-row justify-between items-center'>
        <View className='w-6 h-6 bg-gray-200 rounded-full' />
        <View className='w-6 h-6 bg-gray-200 rounded-full' />
      </View>

      {/* Image Carousel */}
      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ loop: true, duration: 1000 }}
        style={{ width, height: width }}
        className='bg-gray-200'
      />

      {/* Product Info */}
      <View className='px-4 mt-4 gap-y-4'>
        {/* Store name */}
        <View className='h-6 bg-gray-200 rounded w-1/3' />

        {/* Product name */}
        <View className='h-8 bg-gray-200 rounded w-3/4' />

        {/* Description */}
        <View className='gap-y-2'>
          <View className='h-4 bg-gray-200 rounded w-full' />
          <View className='h-4 bg-gray-200 rounded w-2/3' />
        </View>

        {/* Price */}
        <View className='flex-row items-center gap-x-2 mt-4'>
          <View className='h-8 bg-gray-200 rounded w-32' />
          <View className='h-6 bg-gray-200 rounded w-24' />
        </View>

        {/* Color */}
        <View className='mt-4'>
          <View className='h-6 bg-gray-200 rounded w-20 mb-2' />
          <View className='w-10 h-10 bg-gray-200 rounded-full' />
        </View>

        {/* Sizes */}
        <View className='mt-4'>
          <View className='h-6 bg-gray-200 rounded w-24 mb-2' />
          <View className='flex-row gap-2'>
            {[1, 2, 3].map((item) => (
              <View key={item} className='w-16 h-10 bg-gray-200 rounded-lg' />
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
