import { Stack } from 'expo-router'
import StoreHeader from '@/components/store/StoreHeader'

const Storelayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: 'white' },
        header: () => <StoreHeader />,
      }}>
      <Stack.Screen
        name='product/[productId]'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='cart'
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default Storelayout
