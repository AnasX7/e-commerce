import { View, Text, TouchableOpacity } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'
import { FAQItem } from '@/components/about/FAQItem'
import { faqData } from '@/mocks/faq'

const About = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View className='flex-1 bg-white'>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 8 }}
        className='px-4 pb-3 bg-white border-b border-gray-200'>
        <View className='flex-row items-center justify-center'>
          <TouchableOpacity
            onPress={() => router.back()}
            className='absolute left-0'>
            <Ionicons
              name='chevron-forward'
              size={24}
              color={Colors.text.primary}
            />
          </TouchableOpacity>

          <Text className='text-lg font-notoKufiArabic-semiBold leading-loose text-gray-800'>
            الأسئلة الشائعة
          </Text>
        </View>
      </View>

      {/* FAQ List */}
      <FlashList
        data={faqData}
        renderItem={({ item }) => <FAQItem item={item} />}
        estimatedItemSize={100}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default About
