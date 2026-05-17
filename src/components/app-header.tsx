import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors } from '@/constants/app-design';

export function AppHeader({
  initials = 'JM',
  title = 'Garden',
}: {
  initials?: string;
  title?: string;
}) {
  return (
    <View style={styles.topBar}>
      <View style={styles.brandGroup}>
        <View style={styles.brandAvatar}>
          <Text style={styles.brandAvatarText}>{initials}</Text>
        </View>
        <Text style={styles.brandTitle}>{title}</Text>
      </View>
      <Pressable style={styles.iconButton}>
        <Feather color={AppColors.brand} name="settings" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  brandAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AppColors.brandSoft,
    borderWidth: 3,
    borderColor: AppColors.brandSoftBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandAvatarText: {
    color: AppColors.brand,
    fontSize: 16,
    fontWeight: '700',
  },
  brandTitle: {
    color: AppColors.brand,
    fontSize: 28,
    fontWeight: '700',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
