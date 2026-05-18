import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HistoryEntryCard, MetricCard } from '@/components/app-cards';
import { AppHeader } from '@/components/app-header';
import { AppStateBanner } from '@/components/app-state-banner';
import { TimelineHeader } from '@/components/app-primitives';
import { AppColors, AppSpacing, createBoxShadow } from '@/constants/app-design';
import { buildHistoryEntries } from '@/lib/app-selectors';
import { useAppData } from '@/state/app-data';

export default function HistoryScreen() {
  const router = useRouter();
  const { contacts, events, feedbackMessage, isHydrated, removeEvent, storageError } = useAppData();
  const history = buildHistoryEntries(contacts, events);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader />
        <AppStateBanner feedbackMessage={feedbackMessage} isHydrated={isHydrated} storageError={storageError} />

        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>Growth Journal</Text>
            <Text style={styles.title}>History</Text>
          </View>
          <Pressable onPress={() => router.push('/add-event')} style={styles.addButton}>
            <MaterialCommunityIcons color="#ffffff" name="plus" size={24} />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <HistorySection
          onDeleteEvent={removeEvent}
          onEditEvent={(eventId) =>
            router.push({
              pathname: '/add-event',
              params: { eventId },
            })
          }
          title="This Week"
          entries={history.thisWeek}
        />
        <HistorySection
          onDeleteEvent={removeEvent}
          onEditEvent={(eventId) =>
            router.push({
              pathname: '/add-event',
              params: { eventId },
            })
          }
          title="Last Week"
          entries={history.lastWeek}
        />

        <View style={styles.streakCard}>
          <View style={styles.streakIcon}>
            <MaterialCommunityIcons color="#6ba586" name="flower-outline" size={118} />
          </View>
          <Text style={styles.streakLabel}>CONSISTENCY STREAK</Text>
          <Text style={styles.streakValue}>{events.length} Events</Text>
          <Text style={styles.streakBody}>Your recent connection log is growing. Keep it consistent.</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard color="#0f5238" icon="chart-box-outline" label="Top Contact" value={history.topContact} />
          <MetricCard color="#005fad" icon="speedometer" label="Avg. Gap" value={history.averageGap} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HistorySection({
  title,
  entries,
  onDeleteEvent,
  onEditEvent,
}: {
  title: string;
  entries: import('@/data/mock-app-data').HistoryEntry[];
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (eventId: string) => void;
}) {
  return (
    <View style={styles.section}>
      <TimelineHeader title={title} />

      <View style={styles.entryStack}>
        {entries.map((entry) => (
          <HistoryEntryCard
            key={entry.id}
            {...entry}
            onPress={() => onEditEvent(entry.id)}
            onLongPress={() =>
              Alert.alert('Delete event?', `Remove this ${entry.mode.toLowerCase()} entry for ${entry.name}?`, [
                { style: 'cancel', text: 'Cancel' },
                {
                  style: 'destructive',
                  text: 'Delete',
                  onPress: () => onDeleteEvent(entry.id),
                },
              ])
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.historyBackground,
  },
  scrollContent: {
    paddingHorizontal: AppSpacing.screenHorizontal,
    paddingTop: AppSpacing.screenTop,
    paddingBottom: AppSpacing.screenBottom,
    gap: 24,
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
    ...createBoxShadow({
      color: '#0f5238',
      opacity: 0.18,
      radius: 12,
      offsetY: 8,
      elevation: 3,
    }),
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    gap: 18,
  },
  entryStack: {
    gap: 16,
  },
  streakCard: {
    backgroundColor: '#0f5238',
    borderRadius: 30,
    padding: 28,
    minHeight: 232,
    overflow: 'hidden',
    ...createBoxShadow({
      color: '#0f5238',
      opacity: 0.18,
      radius: 18,
      offsetY: 12,
      elevation: 4,
    }),
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
});
