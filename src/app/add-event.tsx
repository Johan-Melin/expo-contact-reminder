import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AvatarRing } from '@/components/app-primitives';
import { ModalHeader } from '@/components/modal-header';
import { AppColors, AppSpacing, createBoxShadow } from '@/constants/app-design';
import { StoredConnectionType } from '@/data/mock-app-data';
import { useAppData } from '@/state/app-data';

const eventTypes = [
  { label: 'Phone Call', icon: 'phone-in-talk-outline' },
  { label: 'Message', icon: 'message-outline' },
  { label: 'In-person', icon: 'account-group-outline' },
  { label: 'Video Call', icon: 'video-outline' },
] as const;

export default function AddEventScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ eventId?: string }>();
  const { contacts, addEvent, events, updateEvent } = useAppData();
  const editingEvent = useMemo(
    () => events.find((event) => event.id === params.eventId),
    [events, params.eventId]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(contacts[0]?.id ?? '');
  const [eventDate, setEventDate] = useState('2026-05-17');
  const [eventType, setEventType] = useState<StoredConnectionType>('Phone Call');
  const [notes, setNotes] = useState('');
  const canSave = Boolean(selectedContactId) && Boolean(eventDate.trim());

  useEffect(() => {
    if (!editingEvent) {
      return;
    }

    setSelectedContactId(editingEvent.contactId);
    setEventDate(editingEvent.date);
    setEventType(editingEvent.type);
    setNotes(editingEvent.notes);
  }, [editingEvent]);

  const visibleContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return contacts;
    }

    return contacts.filter((contact) => contact.name.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ModalHeader
          onClose={() => router.back()}
          title={editingEvent ? 'Edit a Connection' : 'Record a Connection'}
        />

        <View style={styles.section}>
          <Text style={styles.label}>Who did you connect with?</Text>
          <View style={styles.searchBox}>
            <Feather color="#707973" name="search" size={26} />
            <TextInput
              onChangeText={setSearchQuery}
              placeholder="Search contacts..."
              placeholderTextColor="#67708b"
              style={styles.searchInput}
              value={searchQuery}
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.peopleRow}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {visibleContacts.map((contact) => {
              const isSelected = contact.id === selectedContactId;
              return (
                <Pressable
                  key={contact.name}
                  onPress={() => setSelectedContactId(contact.id)}
                  style={styles.personChip}>
                  <AvatarRing
                    accent={isSelected ? AppColors.brand : '#d9dcff'}
                    color={contact.avatar}
                    initials={contact.initials}
                    outerSize={76}
                    innerSize={58}
                    textSize={18}
                  />
                  <Text numberOfLines={1} style={styles.personLabel}>
                    {contact.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>When did it happen?</Text>
          <View style={styles.dateInput}>
            <MaterialCommunityIcons color="#707973" name="calendar-month-outline" size={28} />
            <TextInput
              onChangeText={setEventDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#67708b"
              style={styles.dateText}
              value={eventDate}
            />
            <MaterialCommunityIcons color="#161a32" name="calendar-blank-outline" size={26} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Connection Type</Text>
          <View style={styles.typeGrid}>
            {eventTypes.map((type) => {
              const isSelected = type.label === eventType;
              return (
                <Pressable
                  key={type.label}
                  onPress={() => setEventType(type.label)}
                  style={[styles.typeCard, isSelected && styles.typeCardActive]}>
                  <MaterialCommunityIcons
                    color={isSelected ? '#ffffff' : '#404943'}
                    name={type.icon}
                    size={28}
                  />
                  <Text style={[styles.typeLabel, isSelected && styles.typeLabelActive]}>{type.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Memories & Notes</Text>
          <TextInput
            multiline
            numberOfLines={5}
            onChangeText={setNotes}
            placeholder="What did you talk about? Any highlights or future things to follow up on?"
            placeholderTextColor="#707973"
            style={styles.notesInput}
            textAlignVertical="top"
            value={notes}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          disabled={!canSave}
          onPress={() => {
            if (editingEvent) {
              updateEvent(editingEvent.id, {
                contactId: selectedContactId,
                date: eventDate,
                type: eventType,
                notes,
              });
            } else {
              addEvent({
                contactId: selectedContactId,
                date: eventDate,
                type: eventType,
                notes,
              });
            }
            router.back();
          }}
          style={[styles.logButton, !canSave && styles.logButtonDisabled]}>
          <MaterialCommunityIcons color="#ffffff" name="leaf" size={22} />
          <Text style={styles.logButtonText}>
            {editingEvent ? 'Save Changes' : 'Log Event'}
          </Text>
        </Pressable>
      </View>
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
    paddingBottom: 128,
    gap: 28,
  },
  section: {
    gap: 14,
  },
  label: {
    color: AppColors.brand,
    fontSize: 16,
    fontWeight: '700',
  },
  searchBox: {
    height: 72,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#bfc9c1',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    color: AppColors.text,
    fontSize: 18,
  },
  peopleRow: {
    gap: 18,
    paddingVertical: 8,
  },
  personChip: {
    width: 86,
    alignItems: 'center',
    gap: 8,
  },
  personLabel: {
    color: '#404943',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  dateInput: {
    height: 72,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#bfc9c1',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  dateText: {
    flex: 1,
    color: AppColors.text,
    fontSize: 18,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  typeCard: {
    width: '48%',
    minHeight: 104,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#bfc9c1',
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeCardActive: {
    backgroundColor: '#0f5238',
    borderColor: '#0f5238',
  },
  typeLabel: {
    color: '#2e3831',
    fontSize: 18,
    fontWeight: '600',
  },
  typeLabelActive: {
    color: '#ffffff',
  },
  notesInput: {
    minHeight: 240,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#bfc9c1',
    backgroundColor: '#ffffff',
    padding: 20,
    color: AppColors.text,
    fontSize: 18,
    lineHeight: 28,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: AppSpacing.screenHorizontal,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: 'rgba(251,248,255,0.94)',
  },
  logButton: {
    height: 72,
    borderRadius: 24,
    backgroundColor: '#0f5238',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    ...createBoxShadow({
      color: '#0f5238',
      opacity: 0.2,
      radius: 16,
      offsetY: 10,
      elevation: 4,
    }),
  },
  logButtonDisabled: {
    opacity: 0.55,
  },
  logButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
  },
});
