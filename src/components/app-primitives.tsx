import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors } from '@/constants/app-design';

export function SectionHeader({ color, title }: { color: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionDot, { backgroundColor: color }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export function TimelineHeader({ title }: { title: string }) {
  return (
    <View style={styles.timelineHeader}>
      <View style={styles.timelineRule} />
      <Text style={styles.timelineTitle}>{title}</Text>
      <View style={styles.timelineRule} />
    </View>
  );
}

export function AvatarRing({
  accent,
  initials,
  color,
  outerSize = 62,
  innerSize = 48,
  borderWidth = 4,
  textSize = 16,
}: {
  accent: string;
  initials: string;
  color: string;
  outerSize?: number;
  innerSize?: number;
  borderWidth?: number;
  textSize?: number;
}) {
  return (
    <View
      style={[
        styles.avatarRing,
        {
          borderColor: accent,
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
          borderWidth,
        },
      ]}>
      <View
        style={[
          styles.avatarInner,
          {
            backgroundColor: color,
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
          },
        ]}>
        <Text style={[styles.avatarText, { fontSize: textSize }]}>{initials}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: -12,
  },
  sectionDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
  },
  sectionTitle: {
    color: AppColors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  timelineRule: {
    flex: 1,
    height: 1,
    backgroundColor: '#b8c1bc',
  },
  timelineTitle: {
    color: AppColors.textMuted,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  avatarRing: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  avatarInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
