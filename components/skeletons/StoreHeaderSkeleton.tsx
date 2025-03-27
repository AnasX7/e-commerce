import { View } from 'react-native'
import SkeletonLoader from '@/components/Skeleton'

const StoreHeaderSkeleton = () => {
  return (
    <View className='mb-6'>
      {/* Banner Skeleton */}
      <View className='h-52'>
        <SkeletonLoader width='100%' height={208} radius={0} />
      </View>

      {/* Store Info Card Skeleton */}
      <View className='bg-white rounded-t-3xl -mt-4 pt-4 px-4'>
        <View className='flex-row-reverse justify-between items-center gap-2'>
          <View className='flex-1 gap-2'>
            <SkeletonLoader width={200} height={24} />
            <SkeletonLoader width={150} height={16} />
          </View>
          <SkeletonLoader width={80} height={80} radius={8} />
        </View>
      </View>

      {/* Category Tabs Skeleton */}
      <View className='mt-6 px-4'>
        <View className='flex-row-reverse gap-4'>
          {[...Array(4)].map((_, index) => (
            <SkeletonLoader key={index} width={60} height={24} />
          ))}
        </View>
      </View>
    </View>
  )
}

export default StoreHeaderSkeleton
