import { useCallback, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import ListHeader from '@/components/settings/ListHeader'
import ListFooter from '@/components/settings/ListFooter'
import { useAuth } from '@/hooks/useAuth'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { Colors } from '@/constants/colors'

const menuItems = [
  {
    id: 'orders',
    title: 'طلباتي السابقة',
    icon: (
      <MaterialCommunityIcons
        name='clipboard-text-outline'
        size={20}
        color='#000'
      />
    ),
  },
  {
    id: 'payments',
    title: 'الدفع',
    icon: <FontAwesome5 name='money-check' size={18} color='#000' />,
  },
  {
    id: 'pro',
    title: 'اشتراك pro',
    icon: <Ionicons name='flame' size={22} color='#000' />,
  },
  {
    id: 'help',
    title: 'احصل على المساعدة',
    icon: <Ionicons name='help-circle-outline' size={22} color='#000' />,
  },
  {
    id: 'about',
    title: 'حول التطبيق',
    icon: <Ionicons name='information-circle-outline' size={22} color='#000' />,
  },
]

const AccountScreen = () => {
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  const { user, logout, isLoading, refetch } = useAuth({
    middleware: 'guest',
  })

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  // Refresh on screen focus
  useRefreshOnFocus(onRefresh)

  const ListHeaderComponent = () => <ListHeader user={user} />

  const ListFooterComponent = () => <ListFooter user={user} logout={logout} />

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      key={item.id}
      className='flex-row justify-between items-center px-6 py-5 border-b border-gray-100'>
      <View className='flex-1 flex-row items-center'>
        <View className='flex-row items-center gap-4'>
          <View className='w-6 items-center'>{item.icon}</View>

          <Text className='text-base text-right '>{item.title}</Text>
        </View>

        {item.subtitle && (
          <Text className='text-gray-500 text-sm'>{item.subtitle}</Text>
        )}
      </View>
      <Ionicons name='chevron-back' size={18} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <FlashList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          estimatedItemSize={50}
          contentContainerClassName='pb-4'
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AccountScreen
