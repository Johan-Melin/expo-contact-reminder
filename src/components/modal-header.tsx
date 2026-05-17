import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors } from '@/constants/app-design';

export function ModalHeader({
  title,
  rightSlot,
  onClose,
}: {
  title: string;
  rightSlot?: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Feather color="#404943" name="x" size={30} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSlot}>{rightSlot ?? <View style={styles.spacer} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: AppColors.brand,
    fontSize: 24,
    fontWeight: '700',
  },
  rightSlot: {
    width: 44,
    alignItems: 'flex-end',
  },
  spacer: {
    width: 44,
    height: 44,
  },
});
