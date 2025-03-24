import { Stack } from 'expo-router'
import StoreHeader from '@/components/store/StoreHeader'

const Storelayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: 'white' },
      }}>
      <Stack.Screen
        name='[storeId]/index'
        options={{ header: () => <StoreHeader /> }}
      />
    </Stack>
  )
}

export default Storelayout
