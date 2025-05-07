import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import CarouselItem from '@/components/home/CarouselItem'
import { useFullPath } from '@/hooks/useFullPath'

const { width } = Dimensions.get('window')

type AdsCarouselProps = {
  data: string[]
}

const AdsCarousel = ({ data }: AdsCarouselProps) => {
  const progress = useSharedValue<number>(0)
  const imagesfullPaths = data.map((item) => useFullPath(item))

  return (
    <Carousel
      autoPlayInterval={3000}
      data={imagesfullPaths}
      loop={true}
      pagingEnabled={true}
      autoPlay={true}
      autoPlayReverse={true}
      snapEnabled={true}
      width={width}
      height={width / 2}
      defaultIndex={0}
      mode='parallax'
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      scrollAnimationDuration={1000}
      enabled={true}
      renderItem={({ item }) => <CarouselItem imageUrl={item} />}
    />
  )
}

export default AdsCarousel
