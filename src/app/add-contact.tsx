import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppColors, AppSpacing, createBoxShadow } from '@/constants/app-design';
import { StoredInterval, StoredRelationship } from '@/data/mock-app-data';
import { ModalHeader } from '@/components/modal-header';
import { useAppData } from '@/state/app-data';

const intervalOptions = ['Weekly', 'Bi-weekly', 'Monthly', 'Custom'] as const;
const relationshipOptions = ['Family', 'Friend', 'Colleague', 'Other'] as const;

export default function AddContactScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ contactId?: string }>();
  const { addContact, contacts, removeContact, updateContact } = useAppData();
  const editingContact = useMemo(
    () => contacts.find((contact) => contact.id === params.contactId),
    [contacts, params.contactId]
  );
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<StoredRelationship>('Family');
  const [interval, setInterval] = useState<StoredInterval>('Weekly');
  const trimmedName = name.trim();
  const nameError = trimmedName.length === 0 ? 'Enter a name to save this contact.' : null;
  const canSave = !nameError;

  useEffect(() => {
    if (params.contactId && !editingContact) {
      router.replace('/contacts');
      return;
    }

    if (!editingContact) {
      setName('');
      setRelationship('Family');
      setInterval('Weekly');
      return;
    }

    setName(editingContact.name);
    setRelationship(editingContact.relationship);
    setInterval(editingContact.interval);
  }, [editingContact]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ModalHeader
          onClose={() => router.back()}
          rightSlot={
            <View style={styles.profileChip}>
              <Text style={styles.profileChipText}>JM</Text>
            </View>
          }
          title="Garden"
        />

        <View style={styles.heroBlock}>
          <Text style={styles.heroTitle}>
            {editingContact ? 'Edit a Connection' : 'Plant a Connection'}
          </Text>
          <Text style={styles.heroBody}>
            {editingContact
              ? 'Update how you want to nurture this relationship.'
              : 'Adding a new contact helps you nurture your social garden with intentionality.'}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              onChangeText={setName}
              placeholder="Who are you connecting with?"
              placeholderTextColor="#707973"
              style={[styles.input, nameError && styles.inputError]}
              value={name}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Relationship</Text>
            <View style={styles.chipWrap}>
              {relationshipOptions.map((option) => {
                const isActive = option === relationship;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setRelationship(option as StoredRelationship)}
                    style={[styles.relationshipChip, isActive && styles.relationshipChipActive]}>
                    <Text style={[styles.relationshipChipText, isActive && styles.relationshipChipTextActive]}>
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Contact Interval Preference</Text>
            <View style={styles.intervalGrid}>
              {intervalOptions.map((option) => {
                const isActive = option === interval;
                return (
                  <Pressable
                    key={option}
                    onPress={() => setInterval(option as StoredInterval)}
                    style={[styles.intervalTile, isActive && styles.intervalTileActive]}>
                    <Text style={[styles.intervalTileText, isActive && styles.intervalTileTextActive]}>
                      {option}
                    </Text>
                    {option === 'Custom' ? (
                      <MaterialCommunityIcons
                        color={isActive ? '#161a32' : '#161a32'}
                        name="pencil-outline"
                        size={18}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.tipCard}>
            <MaterialCommunityIcons color="#434a38" name="information-outline" size={22} />
            <Text style={styles.tipText}>
              Setting an interval creates a growth ring around their photo. It cools toward
              <Text style={styles.blueText}> blue </Text>
              when it has been too long and warms toward
              <Text style={styles.greenText}> green </Text>
              when you stay connected.
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            disabled={!canSave}
            onPress={() => {
              if (editingContact) {
                updateContact(editingContact.id, {
                  name: trimmedName,
                  relationship,
                  interval,
                });
              } else {
                addContact({
                  name: trimmedName,
                  relationship,
                  interval,
                });
              }
              router.back();
            }}
            style={[styles.primaryButton, !canSave && styles.primaryButtonDisabled]}>
            <MaterialCommunityIcons color="#ffffff" name="leaf" size={22} />
            <Text style={styles.primaryButtonText}>
              {editingContact ? 'Save Changes' : 'Save Contact'}
            </Text>
          </Pressable>
          {editingContact ? (
            <Pressable
              onPress={() =>
                Alert.alert('Delete contact?', `${editingContact.name} and related events will be removed.`, [
                  { style: 'cancel', text: 'Cancel' },
                  {
                    style: 'destructive',
                    text: 'Delete',
                    onPress: () => {
                      removeContact(editingContact.id);
                      router.replace('/contacts');
                    },
                  },
                ])
              }
              style={styles.deleteButton}>
              <MaterialCommunityIcons color="#ba1a1a" name="trash-can-outline" size={20} />
              <Text style={styles.deleteButtonText}>Delete Contact</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={() => router.back()} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
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
    gap: 28,
  },
  profileChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileChipText: {
    color: AppColors.brand,
    fontSize: 14,
    fontWeight: '700',
  },
  heroBlock: {
    gap: 10,
  },
  heroTitle: {
    color: AppColors.brand,
    fontSize: 30,
    fontWeight: '700',
  },
  heroBody: {
    color: '#2e3831',
    fontSize: 18,
    lineHeight: 26,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 28,
    gap: 28,
    ...createBoxShadow({
      color: '#2d6a4f',
      opacity: 0.08,
      radius: 16,
      offsetY: 10,
      elevation: 3,
    }),
  },
  section: {
    gap: 14,
  },
  label: {
    color: AppColors.brand,
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    height: 72,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#bfc9c1',
    paddingHorizontal: 20,
    fontSize: 18,
    color: AppColors.text,
  },
  inputError: {
    borderColor: '#ba1a1a',
  },
  errorText: {
    color: '#ba1a1a',
    fontSize: 14,
    lineHeight: 20,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  relationshipChip: {
    borderWidth: 1,
    borderColor: '#bfc9c1',
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  relationshipChipActive: {
    backgroundColor: '#2d6a4f',
    borderColor: '#2d6a4f',
  },
  relationshipChipText: {
    color: AppColors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  relationshipChipTextActive: {
    color: '#ffffff',
  },
  intervalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  intervalTile: {
    width: '48%',
    minHeight: 82,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#bfc9c1',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  intervalTileActive: {
    backgroundColor: '#b1f0ce',
    borderColor: '#2d6a4f',
  },
  intervalTileText: {
    color: AppColors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  intervalTileTextActive: {
    color: '#161a32',
  },
  tipCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f5f4eb',
    borderRadius: 18,
    padding: 20,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    color: '#424937',
    fontSize: 15,
    lineHeight: 24,
  },
  blueText: {
    color: '#005fad',
    fontWeight: '700',
  },
  greenText: {
    color: '#0f5238',
    fontWeight: '700',
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    height: 80,
    borderRadius: 22,
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
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  deleteButton: {
    minHeight: 56,
    borderRadius: 20,
    backgroundColor: '#feecec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  deleteButtonText: {
    color: '#ba1a1a',
    fontSize: 18,
    fontWeight: '700',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#707973',
    fontSize: 18,
    fontWeight: '600',
  },
});
