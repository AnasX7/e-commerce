import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useState, useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/colors'

type SearchBarProps = {
  onFilterPress?: () => void
  theme?: 'default' | 'transparent'
}

export default function SearchBar({
  onFilterPress,
  theme = 'default',
}: SearchBarProps) {
  const router = useRouter()
  const words = ['متاجر', 'منتاجات']
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const typingSpeed = useRef(150)
  const deletingSpeed = useRef(100)
  const pauseTime = useRef(700)
  const textColor = theme === 'transparent' ? 'text-white' : 'text-gray-400'

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Handle typing animation
    if (!isDeleting && displayText !== words[wordIndex]) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayText(words[wordIndex].substring(0, displayText.length + 1))
      }, typingSpeed.current)
    }
    // Handle complete word pause
    else if (!isDeleting && displayText === words[wordIndex]) {
      // Pause at the end of the word
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime.current)
    }
    // Handle deleting animation
    else if (isDeleting && displayText !== '') {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(displayText.substring(0, displayText.length - 1))
      }, deletingSpeed.current)
    }
    // Handle word change
    else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setWordIndex((wordIndex + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex, words])

  const containerClass =
    theme === 'transparent'
      ? 'bg-white/10 border-transparent'
      : 'bg-white border-gray-300'

  return (
    <View className='flex-row-reverse gap-4'>
      <Pressable
        onPress={onFilterPress}
        className={`p-3 justify-center items-center rounded-xl border ${containerClass}`}>
        <Ionicons
          name='filter-outline'
          size={20}
          color={theme === 'transparent' ? '#fff' : Colors.text.quaternary}
        />
      </Pressable>
      <Pressable
        onPress={() => router.push('/search')}
        className={`flex-row-reverse flex-1 px-3 justify-end items-center gap-3 rounded-xl border ${containerClass}`}>
        <View className='flex-row items-center justify-end h-12'>
          <Text className={`font-notoKufiArabic text-gray-400 ${textColor}`}>
            ابحث عن
          </Text>
          <Text className={`font-notoKufiArabic text-gray-400 ${textColor}`}>
            {' '}
            {displayText}
            <Text className={`opacity-50 text-gray-400 ${textColor}`}>|</Text>
          </Text>
        </View>
        <Ionicons
          name='search-outline'
          size={22}
          color={theme === 'transparent' ? '#fff' : Colors.text.quaternary}
        />
      </Pressable>
    </View>
  )
}
