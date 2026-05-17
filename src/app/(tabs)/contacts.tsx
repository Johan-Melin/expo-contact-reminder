import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React, { useDeferredValue, useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppFab, ContactCard } from '@/components/app-cards';
import { AppHeader } from '@/components/app-header';
import { AppStateBanner } from '@/components/app-state-banner';
import { AppColors, AppSpacing } from '@/constants/app-design';
import { ContactFilter, contactFilters } from '@/data/mock-app-data';
import { buildContactCards } from '@/lib/app-selectors';
import { useAppData } from '@/state/app-data';

export default function ContactsScreen() {
  const router = useRouter();
  const { contacts, events, isHydrated, removeContact, storageError } = useAppData();
  const [activeFilter, setActiveFilter] = useState<ContactFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const contactCards = buildContactCards(contacts, events);

  const filteredContacts = contactCards.filter((contact) => {
    const matchesFilter =
      activeFilter === 'All' ||
      contact.tag.toLowerCase() === activeFilter.toLowerCase().replace(/s$/, '');

    if (!matchesFilter) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      contact.name.toLowerCase().includes(normalizedQuery) ||
      contact.tag.toLowerCase().includes(normalizedQuery) ||
      contact.cadence.toLowerCase().includes(normalizedQuery) ||
      contact.urgency.toLowerCase().includes(normalizedQuery)
    );
  });

  const isFiltered = activeFilter !== 'All' || normalizedQuery.length > 0;
  const contactCountLabel = `${filteredContacts.length} Contact${filteredContacts.length === 1 ? '' : 's'}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader />
        <AppStateBanner isHydrated={isHydrated} storageError={storageError} />

        <View style={styles.searchBox}>
          <Feather color="#707973" name="search" size={28} />
          <TextInput
            onChangeText={setSearchQuery}
            placeholder="Search contacts..."
            placeholderTextColor="#67708b"
            style={styles.searchInput}
            value={searchQuery}
          />
          {searchQuery ? (
            <Pressable hitSlop={8} onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Feather color="#67708b" name="x" size={20} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.filterRow}>
          {contactFilters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <Pressable
                accessibilityRole="button"
                key={filter}
                onPress={() => setActiveFilter(filter)}
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
          <Text style={styles.sectionCount}>{contactCountLabel}</Text>
        </View>

        {filteredContacts.length ? (
          <View style={styles.cardStack}>
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                {...contact}
                onLongPress={() =>
                  Alert.alert('Delete contact?', `${contact.name} and related events will be removed.`, [
                    { style: 'cancel', text: 'Cancel' },
                    {
                      style: 'destructive',
                      text: 'Delete',
                      onPress: () => removeContact(contact.id),
                    },
                  ])
                }
              />
            ))}
          </View>
        ) : (
          <View style={styles.noResultsCard}>
            <Feather color="#0f5238" name="search" size={28} />
            <Text style={styles.noResultsTitle}>No matching contacts</Text>
            <Text style={styles.noResultsBody}>
              {isFiltered
                ? 'Try a different search or filter to find someone in your circle.'
                : 'Add your first contact to start building your relationship garden.'}
            </Text>
            {isFiltered ? (
              <Pressable
                onPress={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                }}
                style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset filters</Text>
              </Pressable>
            ) : null}
          </View>
        )}

        <View style={styles.emptyStateCard}>
          <View style={styles.emptyStateIcon}>
            <MaterialCommunityIcons color="#6ba586" name="leaf" size={58} />
          </View>
          <Text style={styles.emptyStateTitle}>Grow your circle</Text>
          <Text style={styles.emptyStateBody}>
            Add your first contact and start nurturing your relationships.
          </Text>
          <Pressable onPress={() => router.push('/add-contact')} style={styles.emptyStateButton}>
            <MaterialCommunityIcons color="#0f5238" name="account-plus-outline" size={22} />
            <Text style={styles.emptyStateButtonText}>Get Started</Text>
          </Pressable>
        </View>
      </ScrollView>

      <AppFab icon="plus" onPress={() => router.push('/add-contact')} />
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
  searchInput: {
    flex: 1,
    color: '#67708b',
    fontSize: 20,
    fontWeight: '400',
    paddingVertical: 0,
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  noResultsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    padding: 28,
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  noResultsTitle: {
    color: '#161a32',
    fontSize: 22,
    fontWeight: '600',
  },
  noResultsBody: {
    color: '#67708b',
    fontSize: 17,
    lineHeight: 26,
    maxWidth: 320,
  },
  resetButton: {
    marginTop: 6,
    backgroundColor: '#e8f7ef',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  resetButtonText: {
    color: '#0f5238',
    fontSize: 16,
    fontWeight: '600',
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
});
