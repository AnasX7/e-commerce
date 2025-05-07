import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MotiView } from 'moti'
import { Location } from '@/types/location'
import { Colors } from '@/constants/colors'
import { useLocationStore } from '@/stores/LocationStore'
import EditLocationModal from './EditLocationModal'
import { useSheetRef } from '@/components/ui/Sheet'

type LocationCardProps = {
  location: Location
  onDelete: () => void
}

const LocationCard = ({ location, onDelete }: LocationCardProps) => {
  const { mainLocation, setMainLocation } = useLocationStore()

  const bottomSheetModalRef = useSheetRef()

  const isMain = mainLocation?.id === location.id

  const handleMainPress = () => {
    setMainLocation(isMain ? null : location)
  }

  return (
    <>
      <Pressable onPress={handleMainPress}>
        {({ pressed }) => (
          <MotiView
            animate={{
              scale: pressed ? 0.98 : 1,
              borderColor: isMain ? Colors.primary : '#e5e7eb',
            }}
            transition={{ type: 'timing', duration: 150 }}
            className={`px-4 py-4 border-2 rounded-2xl ${
              isMain ? 'bg-primary/5' : 'bg-white'
            }`}>
            {/* Main Location Badge */}
            {isMain && (
              <View className='absolute -top-3 left-4 px-2 py-1 bg-primary rounded-full'>
                <Text className='text-xs font-notoKufiArabic leading-relaxed text-white'>
                  العنوان الرئيسي
                </Text>
              </View>
            )}

            {/* Location Info */}
            <View className='flex-row items-start justify-between'>
              <View className='flex-1'>
                <View className='flex-row items-center gap-2 pt-1'>
                  <Ionicons
                    name='location'
                    size={20}
                    color={isMain ? Colors.primary : Colors.text.primary}
                  />
                </View>

                <View className='mt-2 gap-y-1'>
                  <Text className='font-notoKufiArabic text-gray-600 text-left'>
                    الاسم: {location.username}
                  </Text>
                  <Text className='font-notoKufiArabic text-gray-600 text-left'>
                    العنوان: {location.country} - {location.location}
                  </Text>
                  <Text className='font-notoKufiArabic text-gray-600 text-left'>
                    رقم الجوال: {location.phoneNumber}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View className='flex-row gap-2'>
                <TouchableOpacity
                  onPress={() => bottomSheetModalRef.current?.present()}>
                  <View className='flex-row gap-1 items-center'>
                    <Ionicons
                      name='pencil-outline'
                      size={16}
                      color={Colors.text.primary}
                    />
                    <Text className='font-notoKufiArabic leading-loose text-sm text-gray-600 text-left'>
                      تعديل
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                  <View className='flex-row gap-1 items-center'>
                    <Ionicons
                      name='trash-outline'
                      size={18}
                      color={Colors.text.primary}
                    />
                    <Text className='font-notoKufiArabic leading-loose text-sm text-gray-600 text-left'>
                      حذف
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
        )}
      </Pressable>

      <EditLocationModal ref={bottomSheetModalRef} location={location} />
    </>
  )
}

export default LocationCard
