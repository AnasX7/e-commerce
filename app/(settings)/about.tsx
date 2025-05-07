import { View, Text, TouchableOpacity } from 'react-native'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
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
      <LegendList
        data={faqData}
        renderItem={({ item }: LegendListRenderItemProps<FAQItem>) => (
          <FAQItem item={item} />
        )}
        recycleItems
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  )
}

export default About
