import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { z } from 'zod'
import { updateLocation } from '@/services/location'
import { useForm } from '@/hooks/useForm'
import { useLocationStore } from '@/stores/LocationStore'
import FormInput from '@/components/FormInput'
import { Location } from '@/types/location'

const locationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: 'رقم الهاتف مطلوب' })
    .regex(/^[0-9]+$/, { message: 'رقم الهاتف غير صالح' }),
  country: z.string().min(1, { message: 'الدولة مطلوبة' }),
  location: z.string().min(1, { message: 'العنوان مطلوب' }),
})

type LocationFormData = z.infer<typeof locationSchema>

interface EditLocationModalProps {
  visible: boolean
  onClose: () => void
  location: Location
}

const EditLocationModal = ({
  visible,
  onClose,
  location,
}: EditLocationModalProps) => {
  const queryClient = useQueryClient()
  const setMainLocation = useLocationStore((s) => s.setMainLocation)

  const { formData, errors, updateField, validateForm, setFormData } =
    useForm<LocationFormData>({
      initialData: {
        phoneNumber: location.phoneNumber,
        country: location.country,
        location: location.location,
      },
      schema: locationSchema,
    })

  const updateMutation = useMutation({
    mutationFn: (data: LocationFormData) => updateLocation(location.id, data),
    onSuccess: (updated: Location) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      setMainLocation(updated)
      onClose()
    },
  })

  const handleSubmit = () => {
    if (validateForm()) {
      updateMutation.mutate(formData)
    }
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      swipeDirection='down'
      backdropOpacity={0.2}
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating>
      <View className='bg-white rounded-t-3xl pb-safe'>
        <View className='p-6'>
          <KeyboardAwareScrollView
            bottomOffset={88}
            className='flex-1'
            contentContainerClassName='flex-grow'>
          <View className='items-center mb-6'>
            <View className='w-16 h-1 bg-gray-300 rounded-full' />
          </View>

          <Text className='text-xl font-notoKufiArabic-bold text-center mb-6'>
            تعديل العنوان
          </Text>

          <View className='space-y-4'>
            <FormInput
              label='رقم الهاتف'
              value={formData.phoneNumber}
              onChangeText={(text) => updateField('phoneNumber', text)}
              keyboardType='phone-pad'
              error={errors.phoneNumber}
              textAlign='right'
            />

            <FormInput
              label='الدولة'
              value={formData.country}
              onChangeText={(text) => updateField('country', text)}
              error={errors.country}
              textAlign='right'
            />

            <FormInput
              label='العنوان'
              value={formData.location}
              onChangeText={(text) => updateField('location', text)}
              error={errors.location}
              textAlign='right'
            />
          </View>

          <View className='flex-row gap-4 mt-6'>
            <TouchableOpacity
              onPress={onClose}
              className='flex-1 py-3 bg-gray-100 rounded-xl'>
              <Text className='text-center font-notoKufiArabic text-gray-600'>
                إلغاء
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={updateMutation.isPending}
              className='flex-1 py-3 rounded-xl bg-primary items-center justify-center'>
              <Text className='text-center font-notoKufiArabic text-white'>
                {updateMutation.isPending ? (
                  <ActivityIndicator size='small' color='#fff' />
                ) : (
                  'تحديث'
                )}
              </Text>
            </TouchableOpacity>
          </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default EditLocationModal
