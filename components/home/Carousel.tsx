import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'

const { width } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.85
const ITEM_SPACING = 10

interface CarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  onItemPress?: (item: CarouselItem, index: number) => void
}

interface CarouselItem {
  imageUrl: string
}

const Carousel = ({
  items = [],
  autoPlay = true,
  autoPlayInterval = 3500,
  showDots = true,
  onItemPress = () => {}
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const flatListRef = useRef<FlashList<CarouselItem>>(null)

  useEffect(() => {
    let interval: any
    if (autoPlay && items.length > 1) {
      interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % items.length
        scrollToIndex(nextIndex)
      }, autoPlayInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeIndex, items.length, autoPlay, autoPlayInterval])

  const scrollToIndex = (index: any) => {
    if (flatListRef.current && index >= 0 && index < items.length) {
      flatListRef.current.scrollToIndex({ index, animated: true })
      setActiveIndex(index)
    }
  }

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollPosition / (ITEM_WIDTH + ITEM_SPACING))

    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      className="rounded-2xl overflow-hidden bg-white shadow-md"
      style={{ width: ITEM_WIDTH, marginHorizontal: ITEM_SPACING / 2 }}
      onPress={() => onItemPress(item, index)}
      activeOpacity={0.9}
    >
      <View
        style={{ width: ITEM_WIDTH }}
        className="h-48 overflow-hidden bg-primary"
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="my-4">
      <FlashList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={(_, index) => `carousel-item-${index}`}
        horizontal
        estimatedItemSize={ITEM_WIDTH}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={handleScroll}
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING * 2 }}
      />

      {showDots && items.length > 1 && (
        <View className="flex-row justify-center mt-4">
          {items.map((_, index) => (
            <TouchableOpacity
              key={`dot-${index}`}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default Carousel
