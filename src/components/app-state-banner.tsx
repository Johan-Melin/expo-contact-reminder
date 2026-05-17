import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function AppStateBanner({
  isHydrated,
  storageError,
}: {
  isHydrated: boolean;
  storageError: string | null;
}) {
  if (storageError) {
    return (
      <View style={[styles.banner, styles.errorBanner]}>
        <Text style={styles.errorText}>{storageError}</Text>
      </View>
    );
  }

  if (!isHydrated) {
    return (
      <View style={[styles.banner, styles.infoBanner]}>
        <Text style={styles.infoText}>Loading saved contacts and events…</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  infoBanner: {
    backgroundColor: '#e8f7ef',
  },
  errorBanner: {
    backgroundColor: '#feecec',
  },
  infoText: {
    color: '#0f5238',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#93000a',
    fontSize: 14,
    fontWeight: '600',
  },
});
