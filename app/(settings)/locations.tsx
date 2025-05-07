import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { fetchLocations, deleteLocation } from '@/services/location'
import { LegendList, LegendListRenderItemProps } from '@legendapp/list'
import { useSheetRef } from '@/components/ui/Sheet'
import { Colors } from '@/constants/colors'
import { Location } from '@/types/location'
import LocationCard from '@/components/locations/LocationCard'
import AddLocationModal from '@/components/locations/AddLocationModal'

const LocationsScreen = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const bottomSheetModalRef = useSheetRef()

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
          <LegendList
            data={locations || []}
            renderItem={({
              item: location,
            }: LegendListRenderItemProps<Location>) => (
              <LocationCard
                key={location.id}
                location={location}
                onDelete={() => deleteMutation.mutate(location.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            recycleItems
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16 }}
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
          onPress={() => bottomSheetModalRef.current?.present()}
          className='w-full py-4 bg-primary rounded-2xl'>
          <Text className='text-center text-white font-notoKufiArabic-bold'>
            إضافة عنوان جديد
          </Text>
        </TouchableOpacity>
      </MotiView>

      <AddLocationModal ref={bottomSheetModalRef} />
    </View>
  )
}

export default LocationsScreen
