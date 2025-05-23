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
        tabBarPosition: Platform.OS === 'web' ? 'bottom' : 'bottom',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 84 : 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'NotoKufiArabic-SemiBold',
          lineHeight: 18,
        },
        sceneStyle: { backgroundColor: 'white' },
      }}>
      <Tabs.Screen
        name='home'
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='home' size={22} color={color} />
            ) : (
              <Ionicons name='home-outline' size={22} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name='favorites'
        options={{
          title: 'المفضلة',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='heart' size={22} color={color} />
            ) : (
              <Ionicons name='heart-outline' size={22} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name='account'
        options={{
          title: 'الحساب',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='person' size={22} color={color} />
            ) : (
              <Ionicons name='person-outline' size={22} color={color} />
            ),
        }}
      />
    </Tabs>
  )
}

export default Tabslayout
