import { View } from 'react-native'
import { MotiView } from 'moti'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SkeletonLoader from '@/components/Skeleton'

const AccountInfoSkeleton = () => {
  const insets = useSafeAreaInsets()

  return (
    <View className='flex-1 pt-safe bg-white'>
      {/* Header Skeleton */}
      <View
        style={{ paddingTop: insets.top + 8 }}
        className='px-4 pb-3 bg-white border-b border-gray-200'>
        <View className='flex-row items-center justify-center'>
          <SkeletonLoader width={120} height={24} radius={4} />
        </View>
      </View>

      {/* User Info Section Skeleton */}
      <View className='p-4 border-b border-gray-100'>
        <View className='gap-2'>
          <View className='flex-row items-center gap-2'>
            <SkeletonLoader width={20} height={20} radius={10} />
            <SkeletonLoader width={150} height={24} radius={4} />
          </View>

          <View className='flex-row items-center gap-2'>
            <SkeletonLoader width={20} height={20} radius={10} />
            <SkeletonLoader width={200} height={24} radius={4} />
          </View>
        </View>
      </View>

      {/* Account Management Section Skeleton */}
      <View className='p-4 gap-3'>
        <SkeletonLoader width='100%' height={50} radius={12} />
        <SkeletonLoader width='100%' height={50} radius={12} />
      </View>
    </View>
  )
}

export default AccountInfoSkeleton
