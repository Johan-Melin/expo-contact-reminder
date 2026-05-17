import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AvatarRing } from '@/components/app-primitives';
import { AppSpacing } from '@/constants/app-design';
import {
  Contact,
  HistoryEntry,
  OnTrackContact,
  OverdueReminder,
  UpcomingReminder,
} from '@/data/mock-app-data';

export function OverdueReminderCard({
  name,
  detail,
  initials,
  avatar,
  actionLabel,
}: OverdueReminder) {
  return (
    <View style={styles.overdueCard}>
      <AvatarRing accent="#cf1f25" color={avatar} initials={initials} />
      <View style={styles.cardCopy}>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons color="#ba1a1a" name="priority-high" size={18} />
          <Text style={styles.overdueText}>{detail}</Text>
        </View>
      </View>
      <Pressable style={styles.primaryAction}>
        <Text style={styles.primaryActionText}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

export function UpcomingReminderCard({
  name,
  detail,
  icon,
  accent,
  initials,
  avatar,
  actionIcon,
}: UpcomingReminder) {
  return (
    <View style={styles.upcomingCard}>
      <AvatarRing accent={accent} color={avatar} initials={initials} />
      <View style={styles.cardCopy}>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons color={accent} name={icon} size={18} />
          <Text style={[styles.upcomingText, { color: accent }]}>{detail}</Text>
        </View>
      </View>
      <Pressable style={styles.secondaryIconAction}>
        <MaterialCommunityIcons color="#00509b" name={actionIcon} size={24} />
      </Pressable>
    </View>
  );
}

export function OnTrackContactCard({ name, status, initials, avatar }: OnTrackContact) {
  return (
    <View style={styles.trackCard}>
      <AvatarRing
        accent="#b1f0ce"
        color={avatar}
        initials={initials}
        outerSize={72}
        innerSize={54}
        textSize={16}
      />
      <Text style={styles.trackName}>{name}</Text>
      <Text style={styles.trackStatus}>{status.toUpperCase()}</Text>
    </View>
  );
}

export function ContactCard({
  id: _id,
  name,
  cadence,
  urgency,
  tag,
  accent,
  avatar,
  initials,
  actionIcon,
  actionColor,
  actionBackground,
  tagBackground,
  tagColor,
  onLongPress,
}: Contact & { onLongPress?: () => void }) {
  return (
    <Pressable onLongPress={onLongPress} style={styles.contactCard}>
      <AvatarRing
        accent={accent}
        color={avatar}
        initials={initials}
        outerSize={74}
        innerSize={56}
        textSize={18}
      />
      <View style={styles.contactCopy}>
        <View style={styles.nameRow}>
          <Text style={styles.contactName}>{name}</Text>
          <View style={[styles.tagPill, { backgroundColor: tagBackground }]}>
            <Text style={[styles.tagText, { color: tagColor }]}>{tag}</Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons color="#0f5238" name="calendar-refresh-outline" size={20} />
          <Text style={styles.metaText}>
            {cadence} • {urgency}
          </Text>
        </View>
      </View>
      <Pressable style={[styles.actionCircle, { backgroundColor: actionBackground }]}>
        <MaterialCommunityIcons color={actionColor} name={actionIcon} size={26} />
      </Pressable>
    </Pressable>
  );
}

export function HistoryEntryCard({
  id: _id,
  name,
  age,
  mode,
  initials,
  avatar,
  ring,
  icon,
  iconColor,
  onLongPress,
}: HistoryEntry & { onLongPress?: () => void }) {
  return (
    <Pressable onLongPress={onLongPress} style={styles.historyCard}>
      <AvatarRing accent={ring} color={avatar} initials={initials} outerSize={66} innerSize={50} textSize={18} />
      <View style={styles.historyCopy}>
        <View style={styles.historyTopRow}>
          <Text style={styles.historyName}>{name}</Text>
          <Text style={styles.historyAge}>{age}</Text>
        </View>
        <View style={styles.historyModeRow}>
          <MaterialCommunityIcons color={iconColor} name={icon} size={20} />
          <Text style={styles.historyMode}>{mode}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function MetricCard({
  color,
  icon,
  label,
  value,
}: {
  color: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metricCard}>
      <MaterialCommunityIcons color={color} name={icon} size={28} />
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

export function AppFab({
  icon,
  plus = false,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  plus?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.fab}>
      <MaterialCommunityIcons color="#ffffff" name={icon} size={28} />
      {plus ? <AntDesign color="#ffffff" name="plus" size={14} style={styles.fabPlus} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overdueCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#ffd3cf',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  upcomingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#cfd8cd',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardCopy: {
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    color: '#161a32',
    fontSize: 18,
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  overdueText: {
    color: '#ba1a1a',
    fontSize: 16,
    lineHeight: 22,
  },
  upcomingText: {
    fontSize: 16,
    lineHeight: 22,
  },
  primaryAction: {
    backgroundColor: '#0f5238',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: '#0f5238',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryIconAction: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#dbe8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackCard: {
    flex: 1,
    backgroundColor: '#f6f3ff',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#d8f0e4',
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 10,
    minHeight: 172,
  },
  trackName: {
    color: '#161a32',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  trackStatus: {
    color: '#0f5238',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  contactCopy: {
    flex: 1,
    gap: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  contactName: {
    flex: 1,
    color: '#161a32',
    fontSize: 22,
    fontWeight: '500',
  },
  tagPill: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 16,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: '#707973',
    fontSize: 18,
    fontWeight: '600',
  },
  actionCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  historyCopy: {
    flex: 1,
    gap: 10,
  },
  historyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  historyName: {
    color: '#161a32',
    fontSize: 20,
    fontWeight: '500',
  },
  historyAge: {
    color: '#707973',
    fontSize: 16,
    fontWeight: '600',
  },
  historyModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyMode: {
    color: '#2e3831',
    fontSize: 18,
    fontWeight: '600',
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#d9dcff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#c8cff5',
    padding: 22,
    gap: 12,
    minHeight: 160,
  },
  metricLabel: {
    color: '#434a38',
    fontSize: 16,
    fontWeight: '500',
  },
  metricValue: {
    color: '#161a32',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: AppSpacing.fabBottom,
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: '#0f5238',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0f5238',
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  fabPlus: {
    position: 'absolute',
    right: 13,
    bottom: 14,
  },
});
