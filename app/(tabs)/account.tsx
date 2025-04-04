import { useCallback, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Href, useFocusEffect, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import ListHeader from '@/components/settings/ListHeader'
import ListFooter from '@/components/settings/ListFooter'
import { useAuth } from '@/hooks/useAuth'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { Colors } from '@/constants/colors'
import AuthModal from '@/components/AuthModal'
import AccountScreenSkeleton from '@/components/skeletons/AccountScreenSkeleton'

type MenuItems = {
  id: number
  route: Href
  title: string
  icon: JSX.Element
  auth?: boolean
}

const menuItems: MenuItems[] = [
  {
    id: 1,
    route: '/account-info',
    title: 'معلومات الحساب',
    icon: <Ionicons name='person-outline' size={22} color={Colors.primary} />,
    auth: true,
  },
  {
    id: 2,
    route: '/orders',
    title: 'طلباتي',
    icon: (
      <Ionicons name='bag-check-outline' size={22} color={Colors.primary} />
    ),
    auth: true,
  },
  // {
  //   id: 3,
  //   route: '/returns',
  //   title: 'المرتجعات',
  //   icon: (
  //     <Ionicons name='arrow-undo-outline' size={22} color={Colors.primary} />
  //   ),
  //   auth: true,
  // },
  {
    id: 4,
    route: '/locations',
    title: 'عناوين التوصيل',
    icon: <Ionicons name='location-outline' size={22} color={Colors.primary} />,
    auth: true,
  },
  {
    id: 5,
    route: '/pro',
    title: 'اشتراك pro',
    icon: <Ionicons name='flame-outline' size={22} color={Colors.primary} />,
  },
  {
    id: 6,
    route: '/help',
    title: 'احصل على المساعدة',
    icon: (
      <Ionicons name='help-circle-outline' size={22} color={Colors.primary} />
    ),
  },
  {
    id: 7,
    route: '/about',
    title: 'حول التطبيق',
    icon: (
      <Ionicons
        name='information-circle-outline'
        size={22}
        color={Colors.primary}
      />
    ),
  },
]

const AccountScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<
  (typeof menuItems)[0] | null
  >(null)
  
  const router = useRouter()
  
  const { user, isAuthenticated, isLoading, refetch, logout } = useAuth({
    middleware: 'guest',
  })
  
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, [])
  )

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  // Refresh on screen focus
  useRefreshOnFocus(onRefresh)

  const ListHeaderComponent = useCallback(
    () => <ListHeader user={user} isAuthenticated={isAuthenticated} />,
    [user, isAuthenticated, onRefresh]
  )

  const ListFooterComponent = useCallback(
    () => <ListFooter isAuthenticated={isAuthenticated} logout={logout} />,
    [isAuthenticated, logout]
  )

  const handelPress = useCallback(
    (item: MenuItems) => {
      if (!isAuthenticated && item.auth) {
        setSelectedItem(item)
        setShowAuthModal(true)
        return
      }
      router.push(item.route)
    },
    [isAuthenticated, router]
  )

  const renderItem = useCallback(
    ({ item }: { item: MenuItems }) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => handelPress(item)}
        className='flex-row justify-between items-center px-6 py-4 border-b border-gray-100'>
        <View className='flex-1 flex-row items-center'>
          <View className='flex-row items-center gap-4'>
            <View className='w-6 items-center'>{item.icon}</View>
            <Text className='text-base text-right font-notoKufiArabic leading-loose'>
              {item.title}
            </Text>
          </View>
        </View>
        <Ionicons name='chevron-back' size={18} />
      </TouchableOpacity>
    ),
    [handelPress]
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        {isLoading ? (
          <AccountScreenSkeleton />
        ) : (
          <FlashList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary}
                enabled={isAuthenticated}
              />
            }
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            estimatedItemSize={50}
            contentContainerClassName='pb-4'
            showsVerticalScrollIndicator={false}
          />
        )}
        <AuthModal
          visible={showAuthModal}
          onClose={() => {
            setShowAuthModal(false)
            setSelectedItem(null)
          }}
          icon={{
            name: 'lock-closed-outline',
            size: 40,
            color: '#3B82F6',
          }}
          title='تسجيل الدخول مطلوب'
          message={`يجب تسجيل الدخول للوصول إلى ${selectedItem?.title || ''}`}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AccountScreen
