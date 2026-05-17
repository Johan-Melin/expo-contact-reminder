import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppColors, AppSpacing } from '@/constants/app-design';
import { StoredInterval, StoredRelationship } from '@/data/mock-app-data';
import { ModalHeader } from '@/components/modal-header';
import { useAppData } from '@/state/app-data';

const intervalOptions = ['Weekly', 'Bi-weekly', 'Monthly', 'Custom'] as const;
const relationshipOptions = ['Family', 'Friend', 'Colleague', 'Other'] as const;

export default function AddContactScreen() {
  const router = useRouter();
  const { addContact } = useAppData();
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<StoredRelationship>('Family');
  const [interval, setInterval] = useState<StoredInterval>('Weekly');
  const canSave = name.trim().length > 0;

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
          <Text style={styles.heroTitle}>Plant a Connection</Text>
          <Text style={styles.heroBody}>
            Adding a new contact helps you nurture your social garden with intentionality.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              onChangeText={setName}
              placeholder="Who are you connecting with?"
              placeholderTextColor="#707973"
              style={styles.input}
              value={name}
            />
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
              addContact({
                name,
                relationship,
                interval,
              });
              router.back();
            }}
            style={[styles.primaryButton, !canSave && styles.primaryButtonDisabled]}>
            <MaterialCommunityIcons color="#ffffff" name="leaf" size={22} />
            <Text style={styles.primaryButtonText}>Save Contact</Text>
          </Pressable>
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
    shadowColor: '#2d6a4f',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
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
    shadowColor: '#0f5238',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
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
