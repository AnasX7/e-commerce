import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { fetchLocations, deleteLocation } from '@/services/location'
import { Colors } from '@/constants/colors'
import LocationCard from '@/components/LocationCard'
import AddLocationModal from '@/components/AddLocationModal'
import { FlashList } from '@shopify/flash-list'

const LocationsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    },
  })

  return (
    <View className='flex-1 pt-safe bg-white'>
      {/* Header */}
      <View className='flex-row items-center justify-between p-4 border-b border-gray-200'>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name='chevron-forward'
            size={24}
            color={Colors.text.primary}
          />
        </TouchableOpacity>
        <Text className='text-lg font-notoKufiArabic-bold'>العناوين</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View className='flex-1'>
        {isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size='large' color={Colors.primary} />
          </View>
        ) : (
          <FlashList
            data={locations}
            renderItem={({ item: location }) => (
              <LocationCard
                key={location.id}
                location={location}
                onDelete={() => deleteMutation.mutate(location.id)}
              />
            )}
            estimatedItemSize={150}
            contentContainerStyle={{ padding: 16 }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View className='items-center py-8'>
                <Ionicons
                  name='location-outline'
                  size={64}
                  color={Colors.text.quaternary}
                />
                <Text className='mt-4 text-center font-notoKufiArabic text-gray-500'>
                  لا توجد عناوين محفوظة
                </Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Add Button */}
      <MotiView
        from={{ translateY: 100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 300 }}
        className='h-24 px-4 mb-safe justify-center items-center border-t border-t-gray-200'>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className='w-full py-4 bg-primary rounded-xl active:opacity-90'>
          <Text className='text-center text-white font-notoKufiArabic-bold'>
            إضافة عنوان جديد
          </Text>
        </TouchableOpacity>
      </MotiView>

      <AddLocationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  )
}

export default LocationsScreen
