import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { AppColors, AppSpacing } from '@/constants/app-design';

type Contact = {
  name: string;
  cadence: string;
  urgency: string;
  tag: string;
  accent: string;
  avatar: string;
  initials: string;
  actionIcon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  actionColor: string;
  actionBackground: string;
  tagBackground: string;
  tagColor: string;
};

const filters = ['All', 'Family', 'Friends', 'Colleague'];

const contacts: Contact[] = [
  {
    name: 'Marcus Chen',
    cadence: 'Weekly',
    urgency: '2 days left',
    tag: 'Family',
    accent: '#0f5238',
    avatar: '#866443',
    initials: 'MC',
    actionIcon: 'phone-outline',
    actionColor: '#0f5238',
    actionBackground: '#dff4eb',
    tagBackground: '#dbe8ff',
    tagColor: '#003869',
  },
  {
    name: 'Elena Rodriguez',
    cadence: 'Bi-weekly',
    urgency: 'Overdue',
    tag: 'Friend',
    accent: '#d5d8f9',
    avatar: '#78d2c7',
    initials: 'ER',
    actionIcon: 'bell-ring-outline',
    actionColor: '#ba1a1a',
    actionBackground: '#feecec',
    tagBackground: '#e5e6ff',
    tagColor: '#404943',
  },
  {
    name: 'David Park',
    cadence: 'Monthly',
    urgency: '12 days left',
    tag: 'Colleague',
    accent: '#0f5238',
    avatar: '#325e48',
    initials: 'DP',
    actionIcon: 'message-processing-outline',
    actionColor: '#0f5238',
    actionBackground: '#dff4eb',
    tagBackground: '#dee6cc',
    tagColor: '#424937',
  },
];

export default function ContactsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader />

        <View style={styles.searchBox}>
          <Feather color="#707973" name="search" size={28} />
          <Text style={styles.searchText}>Search contacts...</Text>
        </View>

        <View style={styles.filterRow}>
          {filters.map((filter, index) => {
            const isActive = index === 0;
            return (
              <Pressable
                key={filter}
                style={[styles.filterChip, isActive ? styles.filterChipActive : styles.filterChipIdle]}>
                <Text style={[styles.filterText, isActive ? styles.filterTextActive : styles.filterTextIdle]}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Your Social Circle</Text>
          <Text style={styles.sectionCount}>24 Contacts</Text>
        </View>

        <View style={styles.cardStack}>
          {contacts.map((contact) => (
            <ContactCard key={contact.name} {...contact} />
          ))}
        </View>

        <View style={styles.emptyStateCard}>
          <View style={styles.emptyStateIcon}>
            <MaterialCommunityIcons color="#6ba586" name="leaf" size={58} />
          </View>
          <Text style={styles.emptyStateTitle}>Grow your circle</Text>
          <Text style={styles.emptyStateBody}>
            Add your first contact and start nurturing your relationships.
          </Text>
          <Pressable style={styles.emptyStateButton}>
            <MaterialCommunityIcons color="#0f5238" name="account-plus-outline" size={22} />
            <Text style={styles.emptyStateButtonText}>Get Started</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Pressable style={styles.fab}>
        <AntDesign color="#ffffff" name="plus" size={30} />
      </Pressable>
    </SafeAreaView>
  );
}

function ContactCard({
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
}: Contact) {
  return (
    <View style={styles.contactCard}>
      <View style={[styles.contactRing, { borderColor: accent }]}>
        <View style={[styles.contactAvatar, { backgroundColor: avatar }]}>
          <Text style={styles.contactAvatarText}>{initials}</Text>
        </View>
      </View>

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
    </View>
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
    gap: 26,
  },
  searchBox: {
    height: 78,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 28,
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  searchText: {
    color: '#67708b',
    fontSize: 20,
    fontWeight: '400',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 14,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  filterChipActive: {
    backgroundColor: '#2d6a4f',
  },
  filterChipIdle: {
    backgroundColor: '#d9dcff',
  },
  filterText: {
    fontSize: 18,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  filterTextIdle: {
    color: '#434a38',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  sectionTitle: {
    color: '#0f5238',
    fontSize: 24,
    fontWeight: '500',
  },
  sectionCount: {
    color: '#707973',
    fontSize: 17,
    fontWeight: '600',
  },
  cardStack: {
    gap: 18,
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
  contactRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  contactAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
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
  emptyStateCard: {
    backgroundColor: '#2d6a4f',
    borderRadius: 30,
    padding: 28,
    paddingBottom: 42,
    overflow: 'hidden',
    gap: 18,
    shadowColor: '#0f5238',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  emptyStateIcon: {
    position: 'absolute',
    right: 22,
    top: 20,
    opacity: 0.4,
  },
  emptyStateTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '500',
    marginTop: 12,
  },
  emptyStateBody: {
    color: '#bfe8d0',
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 300,
  },
  emptyStateButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#0f5238',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  emptyStateButtonText: {
    color: '#0f5238',
    fontSize: 20,
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
});
