import { Platform, View } from 'react-native'
import { MotiView } from 'moti'
import SkeletonLoader from '@/components/Skeleton'

const AccountScreenSkeleton = () => {
  return (
    <View
      className={`flex-1 bg-white ${Platform.OS === 'ios' ? '' : 'pt-safe'}`}>
      {/* Header Skeleton */}
      <View className='px-4 pt-2'>
        <View className='flex-row items-center gap-3'>
          <SkeletonLoader width={50} height={50} radius={25} />
          <View className='flex-1'>
            <SkeletonLoader width={150} height={20} radius={4} />
            <View className='h-2' />
            <SkeletonLoader width={100} height={16} radius={4} />
          </View>
        </View>
      </View>

      {/* Pro Banner Skeleton */}
      <View className='mx-4 mt-6 mb-3'>
        <SkeletonLoader width='100%' height={80} radius={12} />
      </View>

      {/* Menu Items Skeleton */}
      {[...Array(7)].map((_, index) => (
        <View
          key={index}
          className='flex-row justify-between items-center px-6 py-6 border-b border-gray-100'>
          <View className='flex-row items-center gap-4'>
            <SkeletonLoader width={22} height={22} radius={4} />
            <SkeletonLoader width={120} height={20} radius={4} />
          </View>
          <SkeletonLoader width={18} height={18} radius={4} />
        </View>
      ))}
    </View>
  )
}

export default AccountScreenSkeleton
