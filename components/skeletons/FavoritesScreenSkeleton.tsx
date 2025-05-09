import { View } from 'react-native'
import { Colors } from '@/constants/colors'

const FavoritesScreenSkeleton = () => {
  return (
    <View className='flex-1 justify-center items-center px-4 pt-safe gap-4'>
      {[1, 2, 3, 4].map((item) => (
        <View
          key={item}
          className='h-32 bg-gray-100 rounded-lg animate-pulse'
        />
      ))}
    </View>
  )
}

export default FavoritesScreenSkeleton
