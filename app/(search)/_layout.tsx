import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const SearchLayout = () => {
  return (
    <>
      <StatusBar style='dark' />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}

export default SearchLayout
