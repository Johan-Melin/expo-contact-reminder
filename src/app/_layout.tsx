import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { AppDataProvider } from '@/state/app-data';

export default function RootLayout() {
  const modalOptions = Platform.select({
    web: {
      presentation: 'card' as const,
      animation: 'default' as const,
    },
    default: {
      presentation: 'modal' as const,
      animation: 'slide_from_bottom' as const,
    },
  });

  return (
    <AppDataProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="contact/[contactId]"
          options={{
            animation: 'default',
            presentation: 'card',
          }}
        />
        <Stack.Screen name="add-contact" options={modalOptions} />
        <Stack.Screen name="add-event" options={modalOptions} />
      </Stack>
    </AppDataProvider>
  );
}
