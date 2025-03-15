import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/colors'

const Tabslayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarPosition: Platform.OS === 'web' ? 'top' : 'bottom',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 84 : 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'NotoKufiArabic-Bold',
        },
      }}>
      <Tabs.Screen
        name='account'
        options={{
          title: 'الحساب',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='person' size={24} color={color} />
            ) : (
              <Ionicons name='person-outline' size={24} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name='favorites'
        options={{
          title: 'المفضلة',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='heart' size={24} color={color} />
            ) : (
              <Ionicons name='heart-outline' size={24} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          title: 'البحث',
          headerShown: true,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='search' size={24} color={color} />
            ) : (
              <Ionicons name='search-outline' size={24} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name='home'
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='home' size={24} color={color} />
            ) : (
              <Ionicons name='home-outline' size={24} color={color} />
            ),
        }}
      />
    </Tabs>
  )
}

export default Tabslayout
