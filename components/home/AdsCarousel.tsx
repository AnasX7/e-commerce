import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import CarouselItem from '@/components/home/CarouselItem'

const { width } = Dimensions.get('window')

const SAMPLE_ITEMS: string[] = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/301',
  'https://picsum.photos/200/302',
]

type AdsCarouselProps = {
  data?: string[]
}

const AdsCarousel = ({ data = SAMPLE_ITEMS }: AdsCarouselProps) => {
  const progress = useSharedValue<number>(0)

  return (
    <View>
      <Carousel
        autoPlayInterval={2000}
        data={SAMPLE_ITEMS}
        height={200}
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
        renderItem={({ item }) => <CarouselItem imageUrl={item} />}
      />
    </View>
  )
}

export default AdsCarousel
