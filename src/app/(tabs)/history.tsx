import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type HistoryEntry = {
  name: string;
  age: string;
  mode: string;
  initials: string;
  avatar: string;
  ring: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconColor: string;
};

const thisWeek: HistoryEntry[] = [
  {
    name: 'John',
    age: '3 days ago',
    mode: 'Phone call',
    initials: 'J',
    avatar: '#806247',
    ring: '#c7ded7',
    icon: 'phone-in-talk-outline',
    iconColor: '#005fad',
  },
  {
    name: 'Sarah',
    age: '4 days ago',
    mode: 'Message',
    initials: 'S',
    avatar: '#e3a76d',
    ring: '#a4c9ff',
    icon: 'message-outline',
    iconColor: '#0f5238',
  },
];

const lastWeek: HistoryEntry[] = [
  {
    name: 'Michael',
    age: '8 days ago',
    mode: 'In person',
    initials: 'M',
    avatar: '#5f6261',
    ring: '#c9c1ad',
    icon: 'account-group-outline',
    iconColor: '#434a38',
  },
  {
    name: 'Elena',
    age: '10 days ago',
    mode: 'Video call',
    initials: 'E',
    avatar: '#7c4e3d',
    ring: '#d6c4ba',
    icon: 'video-outline',
    iconColor: '#005fad',
  },
];

export default function HistoryScreen() {
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

        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>Growth Journal</Text>
            <Text style={styles.title}>History</Text>
          </View>
          <Pressable style={styles.addButton}>
            <Feather color="#ffffff" name="plus" size={24} />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <HistorySection title="This Week" entries={thisWeek} />
        <HistorySection title="Last Week" entries={lastWeek} />

        <View style={styles.streakCard}>
          <View style={styles.streakIcon}>
            <MaterialCommunityIcons color="#6ba586" name="flower-outline" size={118} />
          </View>
          <Text style={styles.streakLabel}>CONSISTENCY STREAK</Text>
          <Text style={styles.streakValue}>12 Days</Text>
          <Text style={styles.streakBody}>
            You&apos;ve nurtured 5 relationships this week. Keep growing!
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            color="#0f5238"
            icon="chart-box-outline"
            label="Top Contact"
            value="John"
          />
          <MetricCard color="#005fad" icon="speedometer" label="Avg. Gap" value="4.2 Days" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HistorySection({ title, entries }: { title: string; entries: HistoryEntry[] }) {
  return (
    <View style={styles.section}>
      <View style={styles.timelineHeader}>
        <View style={styles.timelineRule} />
        <Text style={styles.timelineTitle}>{title}</Text>
        <View style={styles.timelineRule} />
      </View>

      <View style={styles.entryStack}>
        {entries.map((entry) => (
          <HistoryCard key={`${title}-${entry.name}`} {...entry} />
        ))}
      </View>
    </View>
  );
}

function HistoryCard({ name, age, mode, initials, avatar, ring, icon, iconColor }: HistoryEntry) {
  return (
    <View style={styles.historyCard}>
      <View style={[styles.historyRing, { borderColor: ring }]}>
        <View style={[styles.historyAvatar, { backgroundColor: avatar }]}>
          <Text style={styles.historyAvatarText}>{initials}</Text>
        </View>
      </View>

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
    </View>
  );
}

function MetricCard({
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f2',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 132,
    gap: 24,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCopy: {
    gap: 6,
  },
  eyebrow: {
    color: '#434a38',
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    color: '#0f5238',
    fontSize: 42,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#0f5238',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#0f5238',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    gap: 18,
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
    color: '#707973',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  entryStack: {
    gap: 16,
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
  historyRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  historyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
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
  streakCard: {
    backgroundColor: '#0f5238',
    borderRadius: 30,
    padding: 28,
    minHeight: 232,
    overflow: 'hidden',
    shadowColor: '#0f5238',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  streakIcon: {
    position: 'absolute',
    right: -6,
    bottom: -2,
    opacity: 0.38,
  },
  streakLabel: {
    color: '#d1e7da',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2.4,
    marginBottom: 18,
  },
  streakValue: {
    color: '#ffffff',
    fontSize: 44,
    fontWeight: '700',
    marginBottom: 12,
  },
  streakBody: {
    color: '#d1e7da',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    maxWidth: 320,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
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
});
