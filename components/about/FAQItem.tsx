import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { MotiView } from 'moti'
import { AnimatePresence } from 'framer-motion'

export type FAQItem = {
  id: number
  question: string
  answer: string
}

type FAQItemProps = {
  item: FAQItem
}

export const FAQItem = ({ item }: FAQItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <TouchableOpacity
      onPress={() => setIsExpanded(!isExpanded)}
      className='border-b border-gray-200 py-6'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-base text-left font-notoKufiArabic text-gray-800 flex-1'>
          {item.question}
        </Text>
        <MotiView
          animate={{
            rotateZ: isExpanded ? '180deg' : '0deg',
          }}
          transition={{
            type: 'timing',
            duration: 300,
          }}>
          <Ionicons name='chevron-down' size={20} color='#4B5563' />
        </MotiView>
      </View>

      <AnimatePresence>
        {isExpanded && (
          <MotiView
            from={{
              opacity: 0,
              height: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
              scale: 1,
            }}
            exit={{
              opacity: 0,
              height: 0,
              scale: 0.95,
            }}
            transition={{
              type: 'timing',
              duration: 300,
            }}>
            <Text className='text-sm text-left font-notoKufiArabic-light text-gray-600 mt-2 leading-6'>
              {item.answer}
            </Text>
          </MotiView>
        )}
      </AnimatePresence>
    </TouchableOpacity>
  )
}
