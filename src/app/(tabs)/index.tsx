import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type OverdueReminder = {
  name: string;
  detail: string;
  accent: string;
  avatar: string;
  initials: string;
  actionLabel: string;
};

type UpcomingReminder = {
  name: string;
  detail: string;
  icon: MaterialIconName;
  accent: string;
  avatar: string;
  initials: string;
  actionIcon: MaterialIconName;
};

type OnTrackContact = {
  name: string;
  status: string;
  avatar: string;
  initials: string;
};

const overdueReminders: OverdueReminder[] = [
  {
    name: 'Sarah Jenkins',
    detail: '3 days overdue',
    accent: '#ba1a1a',
    avatar: '#d63031',
    initials: 'SJ',
    actionLabel: 'Reach out',
  },
];

const upcomingReminders: UpcomingReminder[] = [
  {
    name: 'Marcus Chen',
    detail: 'Tomorrow, 2:00 PM',
    icon: 'clock-outline',
    accent: '#005fad',
    avatar: '#1d6fd8',
    initials: 'MC',
    actionIcon: 'message-processing-outline',
  },
  {
    name: 'Elena Rodriguez',
    detail: '48 hours left',
    icon: 'calendar-blank-outline',
    accent: '#58a3fe',
    avatar: '#89b9ff',
    initials: 'ER',
    actionIcon: 'phone-outline',
  },
];

const onTrackContacts: OnTrackContact[] = [
  { name: 'David Kim', status: 'Growing', avatar: '#95d4b3', initials: 'DK' },
  { name: 'Sophie Ward', status: 'Stable', avatar: '#f2c9b8', initials: 'SW' },
];

export default function RemindersScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View style={styles.brandGroup}>
            <View style={styles.brandAvatar}>
              <Text style={styles.brandAvatarText}>JM</Text>
            </View>
            <Text style={styles.brandTitle}>Garden</Text>
          </View>
          <Pressable style={styles.iconButton}>
            <Feather color="#0f5238" name="settings" size={24} />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Relationship Garden</Text>
            <Text style={styles.heroBody}>3 friends need a little sunshine today.</Text>
          </View>
          <MaterialCommunityIcons color="#4a8a6c" name="flower-outline" size={112} />
        </View>

        <SectionHeader color="#ba1a1a" title="Overdue" />
        {overdueReminders.map((reminder) => (
          <OverdueCard key={reminder.name} {...reminder} />
        ))}

        <SectionHeader color="#58a3fe" title="Upcoming" />
        {upcomingReminders.map((reminder) => (
          <UpcomingCard key={reminder.name} {...reminder} />
        ))}

        <SectionHeader color="#95d4b3" title="On Track" />
        <View style={styles.trackGrid}>
          {onTrackContacts.map((contact) => (
            <TrackCard key={contact.name} {...contact} />
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.fab}>
        <MaterialCommunityIcons color="#ffffff" name="clipboard-check-outline" size={28} />
        <AntDesign color="#ffffff" name="plus" size={14} style={styles.fabPlus} />
      </Pressable>
    </SafeAreaView>
  );
}

function SectionHeader({ color, title }: { color: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionDot, { backgroundColor: color }]} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function AvatarRing({
  accent,
  initials,
  color,
}: {
  accent: string;
  initials: string;
  color: string;
}) {
  return (
    <View style={[styles.avatarRing, { borderColor: accent }]}>
      <View style={[styles.avatarInner, { backgroundColor: color }]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    </View>
  );
}

function OverdueCard({
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

function UpcomingCard({
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

function TrackCard({
  name,
  status,
  initials,
  avatar,
}: OnTrackContact) {
  return (
    <View style={styles.trackCard}>
      <View style={styles.trackAvatarRing}>
        <View style={[styles.trackAvatarInner, { backgroundColor: avatar }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>
      <Text style={styles.trackName}>{name}</Text>
      <Text style={styles.trackStatus}>{status.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf8ff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 132,
    gap: 28,
  },
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
    backgroundColor: '#b1f0ce',
    borderWidth: 3,
    borderColor: '#d9f7e7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandAvatarText: {
    color: '#0f5238',
    fontSize: 16,
    fontWeight: '700',
  },
  brandTitle: {
    color: '#0f5238',
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
  heroCard: {
    backgroundColor: '#2d6a4f',
    borderRadius: 24,
    paddingLeft: 24,
    paddingVertical: 28,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  heroCopy: {
    flex: 1,
    gap: 10,
  },
  heroTitle: {
    color: '#a8e7c5',
    fontSize: 28,
    fontWeight: '700',
  },
  heroBody: {
    color: '#bfe8d0',
    fontSize: 18,
    lineHeight: 26,
  },
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
    color: '#161a32',
    fontSize: 24,
    fontWeight: '700',
  },
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
  avatarRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  avatarInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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
  trackGrid: {
    flexDirection: 'row',
    gap: 16,
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
  trackAvatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#b1f0ce',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  trackAvatarInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
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
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 106,
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
