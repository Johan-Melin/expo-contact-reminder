import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppStateBanner } from '@/components/app-state-banner';
import { AvatarRing, TimelineHeader } from '@/components/app-primitives';
import { AppColors, AppSpacing, createBoxShadow } from '@/constants/app-design';
import { buildContactDetail } from '@/lib/app-selectors';
import { useAppData } from '@/state/app-data';

export default function ContactDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ contactId?: string }>();
  const { contacts, events, feedbackMessage, isHydrated, removeContact, storageError } = useAppData();
  const contactDetail = params.contactId ? buildContactDetail(params.contactId, contacts, events) : null;

  useEffect(() => {
    if (!params.contactId || contactDetail) {
      return;
    }

    router.replace('/contacts');
  }, [contactDetail, params.contactId, router]);

  if (!contactDetail) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <Feather color="#404943" name="arrow-left" size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Contact</Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/add-contact',
                params: { contactId: contactDetail.id },
              })
            }
            style={styles.headerButton}>
            <Feather color="#404943" name="edit-2" size={20} />
          </Pressable>
        </View>

        <AppStateBanner feedbackMessage={feedbackMessage} isHydrated={isHydrated} storageError={storageError} />

        <View style={styles.heroCard}>
          <AvatarRing
            accent={contactDetail.accent}
            color={contactDetail.avatar}
            initials={contactDetail.initials}
            outerSize={108}
            innerSize={82}
            borderWidth={6}
            textSize={26}
          />

          <View style={styles.heroCopy}>
            <View style={[styles.relationshipPill, { backgroundColor: contactDetail.tagBackground }]}>
              <Text style={[styles.relationshipText, { color: contactDetail.tagColor }]}>
                {contactDetail.relationship}
              </Text>
            </View>
            <Text style={styles.name}>{contactDetail.name}</Text>
            <Text style={styles.subhead}>{contactDetail.interval} rhythm</Text>
            <Text style={styles.urgency}>{contactDetail.urgency}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/add-event',
                params: { contactId: contactDetail.id },
              })
            }
            style={[styles.actionButton, styles.primaryAction]}>
            <MaterialCommunityIcons color="#ffffff" name="leaf" size={20} />
            <Text style={styles.primaryActionText}>Log Connection</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/add-contact',
                params: { contactId: contactDetail.id },
              })
            }
            style={[styles.actionButton, styles.secondaryAction]}>
            <Feather color="#0f5238" name="edit-2" size={18} />
            <Text style={styles.secondaryActionText}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Latest</Text>
            <Text style={styles.metricValue}>{contactDetail.latestConnection}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Connections</Text>
            <Text style={styles.metricValue}>{contactDetail.totalEvents}</Text>
          </View>
        </View>

        <View style={styles.historySection}>
          <TimelineHeader title="Recent History" />
          {contactDetail.recentEvents.length ? (
            <View style={styles.historyStack}>
              {contactDetail.recentEvents.map((event) => (
                <Pressable
                  key={event.id}
                  onPress={() =>
                    router.push({
                      pathname: '/add-event',
                      params: { eventId: event.id },
                    })
                  }
                  style={styles.historyCard}>
                  <View style={[styles.historyIcon, { backgroundColor: `${event.iconColor}18` }]}>
                    <MaterialCommunityIcons color={event.iconColor} name={event.icon} size={22} />
                  </View>
                  <View style={styles.historyCopy}>
                    <View style={styles.historyTopRow}>
                      <Text style={styles.historyMode}>{event.mode}</Text>
                      <Text style={styles.historyAge}>{event.age}</Text>
                    </View>
                    <Text style={styles.historyDate}>{event.date}</Text>
                    <Text numberOfLines={2} style={styles.historyNotes}>
                      {event.notes || 'No notes added.'}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={styles.emptyHistoryCard}>
              <MaterialCommunityIcons color="#6ba586" name="sprout-outline" size={26} />
              <Text style={styles.emptyHistoryTitle}>No connections logged yet</Text>
              <Text style={styles.emptyHistoryBody}>
                Start the relationship history with a quick note or check-in.
              </Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={() =>
            Alert.alert('Delete contact?', `${contactDetail.name} and related events will be removed.`, [
              { style: 'cancel', text: 'Cancel' },
              {
                style: 'destructive',
                text: 'Delete',
                onPress: () => {
                  removeContact(contactDetail.id);
                  router.dismissTo('/contacts');
                },
              },
            ])
          }
          style={styles.deleteButton}>
          <Feather color="#ba1a1a" name="trash-2" size={18} />
          <Text style={styles.deleteButtonText}>Delete Contact</Text>
        </Pressable>
      </ScrollView>
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
    gap: 24,
  },
  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: AppColors.brand,
    fontSize: 24,
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 28,
    gap: 20,
    alignItems: 'center',
    ...createBoxShadow({
      color: '#2d6a4f',
      opacity: 0.08,
      radius: 16,
      offsetY: 10,
      elevation: 3,
    }),
  },
  heroCopy: {
    alignItems: 'center',
    gap: 8,
  },
  relationshipPill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  relationshipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  name: {
    color: AppColors.text,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  subhead: {
    color: '#67708b',
    fontSize: 18,
    fontWeight: '500',
  },
  urgency: {
    color: AppColors.brand,
    fontSize: 18,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  actionButton: {
    minHeight: 62,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: '#0f5238',
  },
  secondaryAction: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dfe4dc',
    minWidth: 110,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryActionText: {
    color: '#0f5238',
    fontSize: 17,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#dfe4dc',
  },
  metricLabel: {
    color: '#67708b',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  metricValue: {
    color: AppColors.text,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  historySection: {
    gap: 18,
  },
  historyStack: {
    gap: 14,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    gap: 14,
    borderWidth: 1,
    borderColor: '#dfe4dc',
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyCopy: {
    flex: 1,
    gap: 6,
  },
  historyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  historyMode: {
    color: AppColors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  historyAge: {
    color: '#67708b',
    fontSize: 14,
    fontWeight: '600',
  },
  historyDate: {
    color: AppColors.brand,
    fontSize: 15,
    fontWeight: '600',
  },
  historyNotes: {
    color: '#404943',
    fontSize: 15,
    lineHeight: 22,
  },
  emptyHistoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: '#dfe4dc',
  },
  emptyHistoryTitle: {
    color: AppColors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  emptyHistoryBody: {
    color: '#67708b',
    fontSize: 16,
    lineHeight: 24,
  },
  deleteButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: '#feecec',
  },
  deleteButtonText: {
    color: '#ba1a1a',
    fontSize: 16,
    fontWeight: '700',
  },
});
