import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import CarouselItem from '@/components/home/CarouselItem'
import NotFound from './NotFound'

const { width } = Dimensions.get('window')

const SAMPLE_ITEMS: CarouselItemType[] = [
  { id: '1', imageUrl: 'https://picsum.photos/200/300' },
  { id: '2', imageUrl: 'https://picsum.photos/200/301' },
  { id: '3', imageUrl: 'https://picsum.photos/200/302' },
]

type CarouselItemType = {
  id: string
  imageUrl: string
}

interface AdsCarouselProps {
  data?: CarouselItemType[]
}

const AdsCarousel = ({ data = SAMPLE_ITEMS }: AdsCarouselProps) => {
  const progress = useSharedValue<number>(0)

  return (
    <View>
      {data.length > 0 ? (
        <Carousel
          autoPlayInterval={2000}
          data={data}
          height={164}
          loop={true}
          pagingEnabled={true}
          autoPlay={true}
          autoPlayReverse={true}
          snapEnabled={true}
          width={width}
          style={{
            width: width,
          }}
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={progress}
          renderItem={({ item }) => <CarouselItem imageUrl={item.imageUrl} />}
        />
      ) : (
        <NotFound message='لا توجد اعلانات متاحة' />
      )}
    </View>
  )
}

export default AdsCarousel
