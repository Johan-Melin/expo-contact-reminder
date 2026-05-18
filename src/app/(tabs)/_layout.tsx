import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

import { AppColors, AppSpacing, createBoxShadow } from '@/constants/app-design';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.brand,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarActiveBackgroundColor: AppColors.activeTabBackground,
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderTopColor: 'rgba(15,82,56,0.06)',
          height: AppSpacing.tabBarHeight,
          paddingTop: 10,
          paddingBottom: 24,
          paddingHorizontal: 18,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          position: 'absolute',
          ...createBoxShadow({
            color: AppColors.brand,
            opacity: 0.08,
            radius: 16,
            offsetY: -4,
            elevation: 10,
          }),
        },
        tabBarItemStyle: {
          marginHorizontal: 8,
          marginVertical: 6,
          borderRadius: 18,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons color={color} name="bell-outline" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <AntDesign color={color} name="contacts" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons color={color} name="history" size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
