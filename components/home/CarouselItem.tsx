import { View } from 'react-native'
import { Image } from 'expo-image'

interface CarouselItemProps {
  imageUrl: string
}

const CarouselItem = ({ imageUrl }: CarouselItemProps) => {
  return (
    <View className='w-full h-full overflow-hidden rounded-3xl'>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: '100%', height: '100%' }}
        contentFit='fill'
      />
    </View>
  )
}

export default CarouselItem
