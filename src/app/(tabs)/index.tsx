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
import { AppStateBanner } from '@/components/app-state-banner';
import { SectionHeader } from '@/components/app-primitives';
import { AppColors, AppSpacing, createBoxShadow } from '@/constants/app-design';
import { buildReminderSummary, buildReminders } from '@/lib/app-selectors';
import { useAppData } from '@/state/app-data';

export default function RemindersScreen() {
  const router = useRouter();
  const { contacts, events, feedbackMessage, isHydrated, storageError } = useAppData();
  const reminderData = buildReminders(contacts, events);
  const reminderSummary = buildReminderSummary(contacts, events);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader />
        <AppStateBanner feedbackMessage={feedbackMessage} isHydrated={isHydrated} storageError={storageError} />

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>{reminderSummary.title}</Text>
            <Text style={styles.heroBody}>{reminderSummary.body}</Text>
          </View>
          <MaterialCommunityIcons color="#4a8a6c" name="flower-outline" size={112} />
        </View>

        <SectionHeader color="#ba1a1a" title="Overdue" />
        {reminderData.overdue.map((reminder) => (
          <OverdueReminderCard
            key={reminder.id}
            {...reminder}
            onActionPress={() =>
              router.push({
                pathname: '/add-event',
                params: { contactId: reminder.id },
              })
            }
            onPress={() =>
              router.push({
                pathname: '/contact/[contactId]',
                params: { contactId: reminder.id },
              })
            }
          />
        ))}

        <SectionHeader color="#58a3fe" title="Upcoming" />
        {reminderData.upcoming.map((reminder) => (
          <UpcomingReminderCard
            key={reminder.id}
            {...reminder}
            onActionPress={() =>
              router.push({
                pathname: '/add-event',
                params: { contactId: reminder.id },
              })
            }
            onPress={() =>
              router.push({
                pathname: '/contact/[contactId]',
                params: { contactId: reminder.id },
              })
            }
          />
        ))}

        <SectionHeader color="#95d4b3" title="On Track" />
        <View style={styles.trackGrid}>
          {reminderData.onTrack.map((contact) => (
            <OnTrackContactCard
              key={contact.id}
              {...contact}
              onPress={() =>
                router.push({
                  pathname: '/contact/[contactId]',
                  params: { contactId: contact.id },
                })
              }
            />
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
    ...createBoxShadow({
      color: '#2d6a4f',
      opacity: 0.16,
      radius: 18,
      offsetY: 10,
      elevation: 4,
    }),
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
