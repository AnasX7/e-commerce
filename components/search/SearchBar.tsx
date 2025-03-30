import { View, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearch } from '@/hooks/useSearch'
import { Colors } from '@/constants/colors'
import { useFocusEffect } from 'expo-router'

type SearchBarProps = {
  initialValue?: string
  theme?: 'default' | 'transparent'
  autoFocus?: boolean
}

export const SearchBar = ({
  initialValue = '',
  theme = 'default',
  autoFocus = false,
}: SearchBarProps) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  const [value, setValue] = useState(initialValue)
  const { performSearch } = useSearch()
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (autoFocus) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 800)

      return () => clearTimeout(timeout)
    }
  }, [autoFocus])

  const handleSubmit = () => {
    if (value.trim()) {
      performSearch({ name: value.trim() })
    }
  }

  const containerClass =
    theme === 'transparent'
      ? 'bg-white/10 border-transparent'
      : 'bg-white border-gray-300'

  const textColor = theme === 'transparent' ? 'text-white' : 'text-gray-600'
  const iconColor = theme === 'transparent' ? '#fff' : Colors.text.quaternary

  return (
    <View
      className={`flex-row items-center gap-1 px-3 rounded-xl border ${containerClass}`}>
      <TouchableOpacity onPress={handleSubmit}>
        <Ionicons name='search-outline' size={22} color={iconColor} />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
        placeholder='ابحث عن منتج...'
        placeholderTextColor={
          theme === 'transparent' ? '#fff' : Colors.text.quaternary
        }
        className={`flex-1 h-14 text-right font-notoKufiArabic mr-3 ${textColor}`}
        returnKeyType='search'
      />
    </View>
  )
}
