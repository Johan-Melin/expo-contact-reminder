import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export type OverdueReminder = {
  id: string;
  name: string;
  detail: string;
  accent: string;
  avatar: string;
  initials: string;
  actionLabel: string;
};

export type UpcomingReminder = {
  id: string;
  name: string;
  detail: string;
  icon: MaterialIconName;
  accent: string;
  avatar: string;
  initials: string;
  actionIcon: MaterialIconName;
};

export type OnTrackContact = {
  id: string;
  name: string;
  status: string;
  avatar: string;
  initials: string;
};

export type ContactFilter = 'All' | 'Family' | 'Friends' | 'Colleague';
export type StoredRelationship = 'Family' | 'Friend' | 'Colleague' | 'Other';
export type StoredInterval = 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Custom';
export type StoredConnectionType = 'Phone Call' | 'Message' | 'In-person' | 'Video Call';

export type Contact = {
  id: string;
  name: string;
  cadence: string;
  urgency: string;
  tag: string;
  accent: string;
  avatar: string;
  initials: string;
  actionIcon: MaterialIconName;
  actionColor: string;
  actionBackground: string;
  tagBackground: string;
  tagColor: string;
};

export type HistoryEntry = {
  id: string;
  name: string;
  age: string;
  mode: string;
  initials: string;
  avatar: string;
  ring: string;
  icon: MaterialIconName;
  iconColor: string;
};

export type ContactDetailEvent = {
  id: string;
  date: string;
  age: string;
  mode: string;
  notes: string;
  icon: MaterialIconName;
  iconColor: string;
};

export type StoredContact = {
  id: string;
  name: string;
  relationship: StoredRelationship;
  interval: StoredInterval;
  accent: string;
  avatar: string;
  initials: string;
  tagBackground: string;
  tagColor: string;
};

export type StoredEvent = {
  id: string;
  contactId: string;
  date: string;
  type: StoredConnectionType;
  notes: string;
};

export const reminderSummary = {
  title: 'Relationship Garden',
};

export const contactFilters: ContactFilter[] = ['All', 'Family', 'Friends', 'Colleague'];

export const relationshipPalette: Record<
  StoredRelationship,
  { accent: string; avatar: string; tagBackground: string; tagColor: string }
> = {
  Family: {
    accent: '#0f5238',
    avatar: '#866443',
    tagBackground: '#dbe8ff',
    tagColor: '#003869',
  },
  Friend: {
    accent: '#d5d8f9',
    avatar: '#78d2c7',
    tagBackground: '#e5e6ff',
    tagColor: '#404943',
  },
  Colleague: {
    accent: '#0f5238',
    avatar: '#325e48',
    tagBackground: '#dee6cc',
    tagColor: '#424937',
  },
  Other: {
    accent: '#8b8fa8',
    avatar: '#8f9bb3',
    tagBackground: '#ececff',
    tagColor: '#404943',
  },
};

export const initialStoredContacts: StoredContact[] = [
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    relationship: 'Family',
    interval: 'Weekly',
    ...relationshipPalette.Family,
    initials: 'MC',
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    relationship: 'Friend',
    interval: 'Bi-weekly',
    ...relationshipPalette.Friend,
    initials: 'ER',
  },
  {
    id: 'david-park',
    name: 'David Park',
    relationship: 'Colleague',
    interval: 'Monthly',
    ...relationshipPalette.Colleague,
    initials: 'DP',
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    relationship: 'Friend',
    interval: 'Weekly',
    accent: '#cf1f25',
    avatar: '#d63031',
    tagBackground: '#feecec',
    tagColor: '#93000a',
    initials: 'SJ',
  },
  {
    id: 'john-hale',
    name: 'John Hale',
    relationship: 'Other',
    interval: 'Monthly',
    ...relationshipPalette.Other,
    initials: 'JH',
  },
  {
    id: 'michael-reed',
    name: 'Michael Reed',
    relationship: 'Colleague',
    interval: 'Monthly',
    accent: '#c9c1ad',
    avatar: '#5f6261',
    tagBackground: '#dee6cc',
    tagColor: '#424937',
    initials: 'MR',
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    relationship: 'Family',
    interval: 'Bi-weekly',
    accent: '#95d4b3',
    avatar: '#95d4b3',
    tagBackground: '#dbe8ff',
    tagColor: '#003869',
    initials: 'DK',
  },
  {
    id: 'sophie-ward',
    name: 'Sophie Ward',
    relationship: 'Friend',
    interval: 'Weekly',
    accent: '#b1f0ce',
    avatar: '#f2c9b8',
    tagBackground: '#e5e6ff',
    tagColor: '#404943',
    initials: 'SW',
  },
];

export const initialStoredEvents: StoredEvent[] = [
  {
    id: 'evt-marcus',
    contactId: 'marcus-chen',
    date: '2026-05-12',
    type: 'Phone Call',
    notes: 'Talked about family plans for the summer.',
  },
  {
    id: 'evt-elena',
    contactId: 'elena-rodriguez',
    date: '2026-05-05',
    type: 'Video Call',
    notes: 'Caught up on the new studio project.',
  },
  {
    id: 'evt-david-park',
    contactId: 'david-park',
    date: '2026-04-29',
    type: 'Message',
    notes: 'Discussed next month planning sync.',
  },
  {
    id: 'evt-sarah',
    contactId: 'sarah-jenkins',
    date: '2026-05-07',
    type: 'Message',
    notes: 'Quick check-in after her trip.',
  },
  {
    id: 'evt-john',
    contactId: 'john-hale',
    date: '2026-05-14',
    type: 'Phone Call',
    notes: 'Talked through a recent move and new routines.',
  },
  {
    id: 'evt-michael',
    contactId: 'michael-reed',
    date: '2026-05-09',
    type: 'In-person',
    notes: 'Grabbed coffee after work.',
  },
  {
    id: 'evt-david-kim',
    contactId: 'david-kim',
    date: '2026-05-11',
    type: 'Message',
    notes: 'Shared a few photos from the weekend.',
  },
  {
    id: 'evt-sophie',
    contactId: 'sophie-ward',
    date: '2026-05-13',
    type: 'Message',
    notes: 'Sent an article and planned a follow-up call.',
  },
];
