import { Stack } from 'expo-router'
import StoreHeader from '@/components/store/StoreHeader'

const Storelayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: 'white' },
        header: () => <StoreHeader />,
      }}
    />
  )
}

export default Storelayout
