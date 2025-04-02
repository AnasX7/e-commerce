import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import Modal from 'react-native-modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { addLocation } from '@/services/location'
import { useForm } from '@/hooks/useForm'
import FormInput from '@/components/FormInput'
import { Colors } from '@/constants/colors'

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
  visible: boolean
  onClose: () => void
}

const AddLocationModal = ({ visible, onClose }: AddLocationModalProps) => {
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
      onClose()
    },
  })

  const handleSubmit = () => {
    if (validateForm()) {
      addMutation.mutate(formData)
    }
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      swipeDirection='down'
      backdropOpacity={0.2}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating>
      <View className='bg-white rounded-t-3xl pb-safe'>
        <View className='p-6'>
          {/* <KeyboardAwareScrollView
        bottomOffset={88}
        className='flex-1'
        contentContainerClassName='flex-grow'> */}
          <View className='items-center mb-6'>
            <View className='w-16 h-1 bg-gray-300 rounded-full' />
          </View>

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
              onPress={onClose}
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
          {/* </KeyboardAwareScrollView> */}
        </View>
      </View>
    </Modal>
  )
}

export default AddLocationModal
