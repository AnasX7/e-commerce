import { RefObject } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet'
import { z } from 'zod'
import { updateLocation } from '@/services/location'
import { useForm } from '@/hooks/useForm'
import { useLocationStore } from '@/stores/LocationStore'
import { Location } from '@/types/location'
import FormInput from '@/components/FormInput'
import { Sheet } from '@/components/ui/Sheet'

const locationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: 'رقم الهاتف مطلوب' })
    .regex(/^[0-9]+$/, { message: 'رقم الهاتف غير صالح' }),
  country: z.string().min(1, { message: 'الدولة مطلوبة' }),
  location: z.string().min(1, { message: 'العنوان مطلوب' }),
})

type LocationFormData = z.infer<typeof locationSchema>

type EditLocationModalProps = {
  ref: RefObject<BottomSheetModal | null>
  location: Location
}

const EditLocationModal = ({ ref, location }: EditLocationModalProps) => {
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
      ref.current?.close()
    },
  })

  const handleSubmit = () => {
    if (validateForm()) {
      updateMutation.mutate(formData)
    }
  }

  return (
    <Sheet ref={ref} snapPoints={[500]}>
      <BottomSheetView className='flex-1 justify-center px-6 pb-16'>
        <KeyboardAwareScrollView
          bottomOffset={88}
          className='flex-1'
          contentContainerClassName='flex-grow'>
          <Text className='text-xl font-notoKufiArabic-bold text-center mb-6'>
            تعديل العنوان
          </Text>

          <View className='gap-y-4'>
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
              onPress={() => ref.current?.close()}
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
      </BottomSheetView>
    </Sheet>
  )
}

export default EditLocationModal
