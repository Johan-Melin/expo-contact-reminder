import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HistoryEntryCard, MetricCard } from '@/components/app-cards';
import { AppHeader } from '@/components/app-header';
import { TimelineHeader } from '@/components/app-primitives';
import { AppColors, AppSpacing } from '@/constants/app-design';
import {
  historyLastWeek,
  historySummary,
  historyThisWeek,
} from '@/data/mock-app-data';

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader />

        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>{historySummary.eyebrow}</Text>
            <Text style={styles.title}>{historySummary.title}</Text>
          </View>
          <Pressable onPress={() => router.push('/add-event')} style={styles.addButton}>
            <MaterialCommunityIcons color="#ffffff" name="plus" size={24} />
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <HistorySection title="This Week" entries={historyThisWeek} />
        <HistorySection title="Last Week" entries={historyLastWeek} />

        <View style={styles.streakCard}>
          <View style={styles.streakIcon}>
            <MaterialCommunityIcons color="#6ba586" name="flower-outline" size={118} />
          </View>
          <Text style={styles.streakLabel}>{historySummary.streakLabel}</Text>
          <Text style={styles.streakValue}>{historySummary.streakValue}</Text>
          <Text style={styles.streakBody}>{historySummary.streakBody}</Text>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard color="#0f5238" icon="chart-box-outline" label="Top Contact" value={historySummary.topContact} />
          <MetricCard color="#005fad" icon="speedometer" label="Avg. Gap" value={historySummary.averageGap} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HistorySection({
  title,
  entries,
}: {
  title: string;
  entries: typeof historyThisWeek;
}) {
  return (
    <View style={styles.section}>
      <TimelineHeader title={title} />

      <View style={styles.entryStack}>
        {entries.map((entry) => (
          <HistoryEntryCard key={`${title}-${entry.name}`} {...entry} />
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
  entryStack: {
    gap: 16,
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
});
