import { RefObject } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { addLocation } from '@/services/location'
import { useForm } from '@/hooks/useForm'
import FormInput from '@/components/FormInput'
import { Colors } from '@/constants/colors'
import { Sheet } from '@/components/ui/Sheet'

// Define validation schema
const locationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: 'رقم الهاتف مطلوب' })
    .regex(/^[0-9]+$/, { message: 'رقم الهاتف غير صالح' }),
  country: z.string().min(1, { message: 'الدولة مطلوبة' }),
  location: z.string().min(1, { message: 'العنوان مطلوب' }),
})

type LocationFormData = z.infer<typeof locationSchema>

type AddLocationModalProps = {
  ref: RefObject<BottomSheetModal | null>
}

const AddLocationModal = ({ ref }: AddLocationModalProps) => {
  const queryClient = useQueryClient()

  const { formData, errors, updateField, validateForm, setFormData } =
    useForm<LocationFormData>({
      initialData: {
        phoneNumber: '',
        country: '',
        location: '',
      },
      schema: locationSchema,
    })

  const addMutation = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
      setFormData({
        phoneNumber: '',
        country: '',
        location: '',
      })
      ref.current?.close()
    },
  })

  const handleSubmit = () => {
    if (validateForm()) {
      addMutation.mutate(formData)
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
            إضافة عنوان جديد
          </Text>

          <View className='gap-y-4'>
            <FormInput
              label='رقم الهاتف'
              value={formData.phoneNumber}
              onChangeText={(text) => updateField('phoneNumber', text)}
              placeholder='أدخل رقم الهاتف'
              placeholderTextColor={Colors.text.quaternary}
              keyboardType='phone-pad'
              error={errors.phoneNumber}
              textAlign='right'
            />

            <FormInput
              label='الدولة'
              value={formData.country}
              onChangeText={(text) => updateField('country', text)}
              placeholder='أدخل اسم الدولة'
              placeholderTextColor={Colors.text.quaternary}
              error={errors.country}
              textAlign='right'
            />

            <FormInput
              label='العنوان'
              value={formData.location}
              onChangeText={(text) => updateField('location', text)}
              placeholder='أدخل العنوان بالتفصيل'
              placeholderTextColor={Colors.text.quaternary}
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
              disabled={addMutation.isPending}
              className='flex-1 py-3 rounded-xl bg-primary items-center justify-center'>
              {addMutation.isPending ? (
                <ActivityIndicator size='small' color='#fff' />
              ) : (
                <Text className='text-center font-notoKufiArabic text-white'>
                  إضافة
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </BottomSheetView>
    </Sheet>
  )
}

export default AddLocationModal
