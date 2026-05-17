import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  AppFab,
  OnTrackContactCard,
  OverdueReminderCard,
  UpcomingReminderCard,
} from '@/components/app-cards';
import { AppHeader } from '@/components/app-header';
import { SectionHeader } from '@/components/app-primitives';
import { AppColors, AppSpacing } from '@/constants/app-design';
import {
  onTrackContacts,
  overdueReminders,
  reminderSummary,
  upcomingReminders,
} from '@/data/mock-app-data';

export default function RemindersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader />

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>{reminderSummary.title}</Text>
            <Text style={styles.heroBody}>{reminderSummary.body}</Text>
          </View>
          <MaterialCommunityIcons color="#4a8a6c" name="flower-outline" size={112} />
        </View>

        <SectionHeader color="#ba1a1a" title="Overdue" />
        {overdueReminders.map((reminder) => (
          <OverdueReminderCard key={reminder.name} {...reminder} />
        ))}

        <SectionHeader color="#58a3fe" title="Upcoming" />
        {upcomingReminders.map((reminder) => (
          <UpcomingReminderCard key={reminder.name} {...reminder} />
        ))}

        <SectionHeader color="#95d4b3" title="On Track" />
        <View style={styles.trackGrid}>
          {onTrackContacts.map((contact) => (
            <OnTrackContactCard key={contact.name} {...contact} />
          ))}
        </View>
      </ScrollView>

      <AppFab icon="clipboard-check-outline" onPress={() => router.push('/add-event')} plus />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollContent: {
    paddingHorizontal: AppSpacing.screenHorizontal,
    paddingTop: AppSpacing.screenTop,
    paddingBottom: AppSpacing.screenBottom,
    gap: 28,
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
  trackGrid: {
    flexDirection: 'row',
    gap: 16,
  },
});
