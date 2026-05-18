import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  IntervalUnit,
  StoredConnectionType,
  StoredContact,
  StoredEvent,
  StoredInterval,
  StoredIntervalPreset,
  StoredRelationship,
  initialStoredContacts,
  initialStoredEvents,
  relationshipPalette,
} from '@/data/mock-app-data';
import { appStorage } from '@/lib/app-storage';

type AddContactInput = {
  name: string;
  relationship: StoredRelationship;
  interval: StoredInterval;
};

type AddEventInput = {
  contactId: string;
  date: string;
  type: StoredConnectionType;
  notes: string;
};

type AppDataContextValue = {
  contacts: StoredContact[];
  events: StoredEvent[];
  isHydrated: boolean;
  storageError: string | null;
  feedbackMessage: string | null;
  addContact: (input: AddContactInput) => StoredContact;
  addEvent: (input: AddEventInput) => StoredEvent;
  updateContact: (contactId: string, input: AddContactInput) => void;
  updateEvent: (eventId: string, input: AddEventInput) => void;
  removeContact: (contactId: string) => void;
  removeEvent: (eventId: string) => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);
const CONTACTS_STORAGE_KEY = 'app.contacts.v1';
const EVENTS_STORAGE_KEY = 'app.events.v1';

function isStoredContact(value: unknown): value is StoredContact {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    typeof record.relationship === 'string' &&
    isStoredInterval(record.interval) &&
    typeof record.accent === 'string' &&
    typeof record.avatar === 'string' &&
    typeof record.initials === 'string' &&
    typeof record.tagBackground === 'string' &&
    typeof record.tagColor === 'string'
  );
}

function isStoredIntervalPreset(value: unknown): value is StoredIntervalPreset {
  return value === 'Weekly' || value === 'Bi-weekly' || value === 'Monthly';
}

function isIntervalUnit(value: unknown): value is IntervalUnit {
  return value === 'days' || value === 'weeks' || value === 'months';
}

function isStoredInterval(value: unknown): value is StoredInterval {
  if (typeof value === 'string') {
    return value === 'Weekly' || value === 'Bi-weekly' || value === 'Monthly' || value === 'Custom';
  }

  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;
  if (record.kind === 'preset') {
    return isStoredIntervalPreset(record.preset);
  }

  if (record.kind === 'custom') {
    return typeof record.value === 'number' && record.value > 0 && isIntervalUnit(record.unit);
  }

  return false;
}

function normalizeStoredInterval(value: StoredInterval | 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Custom'): StoredInterval {
  if (typeof value !== 'string') {
    return value;
  }

  if (value === 'Custom') {
    return { kind: 'custom', value: 3, unit: 'weeks' };
  }

  return { kind: 'preset', preset: value };
}

function isStoredEvent(value: unknown): value is StoredEvent {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    typeof record.contactId === 'string' &&
    typeof record.date === 'string' &&
    typeof record.type === 'string' &&
    typeof record.notes === 'string'
  );
}

function parseStoredContacts(raw: string | null) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(isStoredContact).map((contact) => ({
          ...contact,
          interval: normalizeStoredInterval(contact.interval),
        }))
      : null;
  } catch {
    return null;
  }
}

function parseStoredEvents(raw: string | null) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStoredEvent) : null;
  } catch {
    return null;
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<StoredContact[]>(initialStoredContacts);
  const [events, setEvents] = useState<StoredEvent[]>(initialStoredEvents);
  const [isHydrated, setIsHydrated] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackTick, setFeedbackTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const [storedContacts, storedEvents] = await Promise.all([
          appStorage.getItemAsync(CONTACTS_STORAGE_KEY),
          appStorage.getItemAsync(EVENTS_STORAGE_KEY),
        ]);

        if (cancelled) {
          return;
        }

        const parsedContacts = parseStoredContacts(storedContacts);
        const parsedEvents = parseStoredEvents(storedEvents);

        if (parsedContacts) {
          setContacts(parsedContacts);
        }

        if (parsedEvents) {
          setEvents(parsedEvents);
        }

        setStorageError(null);
      } catch {
        if (!cancelled) {
          setStorageError('Saved data could not be loaded. Using the bundled starter data.');
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void appStorage.setItemAsync(CONTACTS_STORAGE_KEY, JSON.stringify(contacts)).catch(() => {
      setStorageError('Contacts could not be saved to local storage.');
    });
  }, [contacts, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void appStorage.setItemAsync(EVENTS_STORAGE_KEY, JSON.stringify(events)).catch(() => {
      setStorageError('Events could not be saved to local storage.');
    });
  }, [events, isHydrated]);

  useEffect(() => {
    if (!feedbackMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setFeedbackMessage(null);
    }, 2800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [feedbackMessage, feedbackTick]);

  const value = useMemo<AppDataContextValue>(
    () => ({
      contacts,
      events,
      isHydrated,
      storageError,
      feedbackMessage,
      addContact(input) {
        const palette = relationshipPalette[input.relationship];
        const name = input.name.trim();
        const newContact: StoredContact = {
          id: slugify(name) || createId('contact'),
          name,
          relationship: input.relationship,
          interval: input.interval,
          accent: palette.accent,
          avatar: palette.avatar,
          initials: getInitials(name),
          tagBackground: palette.tagBackground,
          tagColor: palette.tagColor,
        };

        setContacts((current) => {
          if (current.some((contact) => contact.id === newContact.id)) {
            return [
              {
                ...newContact,
                id: createId('contact'),
              },
              ...current,
            ];
          }

          return [newContact, ...current];
        });
        setFeedbackMessage('Contact saved.');
        setFeedbackTick((current) => current + 1);

        return newContact;
      },
      addEvent(input) {
        const newEvent: StoredEvent = {
          id: createId('event'),
          ...input,
        };

        setEvents((current) => [newEvent, ...current]);
        setFeedbackMessage('Connection logged.');
        setFeedbackTick((current) => current + 1);
        return newEvent;
      },
      updateContact(contactId, input) {
        const palette = relationshipPalette[input.relationship];
        const name = input.name.trim();

        setContacts((current) =>
          current.map((contact) =>
            contact.id === contactId
              ? {
                  ...contact,
                  name,
                  relationship: input.relationship,
                  interval: input.interval,
                  accent: palette.accent,
                  avatar: palette.avatar,
                  initials: getInitials(name),
                  tagBackground: palette.tagBackground,
                  tagColor: palette.tagColor,
                }
              : contact
          )
        );
        setFeedbackMessage('Contact updated.');
        setFeedbackTick((current) => current + 1);
      },
      updateEvent(eventId, input) {
        setEvents((current) =>
          current.map((event) => (event.id === eventId ? { ...event, ...input } : event))
        );
        setFeedbackMessage('Connection updated.');
        setFeedbackTick((current) => current + 1);
      },
      removeContact(contactId) {
        setContacts((current) => current.filter((contact) => contact.id !== contactId));
        setEvents((current) => current.filter((event) => event.contactId !== contactId));
        setFeedbackMessage('Contact deleted.');
        setFeedbackTick((current) => current + 1);
      },
      removeEvent(eventId) {
        setEvents((current) => current.filter((event) => event.id !== eventId));
        setFeedbackMessage('Event deleted.');
        setFeedbackTick((current) => current + 1);
      },
    }),
    [contacts, events, feedbackMessage, isHydrated, storageError]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }

  return context;
}
