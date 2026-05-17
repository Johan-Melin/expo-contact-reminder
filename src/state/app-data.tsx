import React, { createContext, useContext, useMemo, useState } from 'react';

import {
  StoredConnectionType,
  StoredContact,
  StoredEvent,
  StoredInterval,
  StoredRelationship,
  initialStoredContacts,
  initialStoredEvents,
  relationshipPalette,
} from '@/data/mock-app-data';

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
  addContact: (input: AddContactInput) => StoredContact;
  addEvent: (input: AddEventInput) => StoredEvent;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

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

  const value = useMemo<AppDataContextValue>(
    () => ({
      contacts,
      events,
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

        return newContact;
      },
      addEvent(input) {
        const newEvent: StoredEvent = {
          id: createId('event'),
          ...input,
        };

        setEvents((current) => [newEvent, ...current]);
        return newEvent;
      },
    }),
    [contacts, events]
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
