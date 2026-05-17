import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export type OverdueReminder = {
  name: string;
  detail: string;
  accent: string;
  avatar: string;
  initials: string;
  actionLabel: string;
};

export type UpcomingReminder = {
  name: string;
  detail: string;
  icon: MaterialIconName;
  accent: string;
  avatar: string;
  initials: string;
  actionIcon: MaterialIconName;
};

export type OnTrackContact = {
  name: string;
  status: string;
  avatar: string;
  initials: string;
};

export type ContactFilter = 'All' | 'Family' | 'Friends' | 'Colleague';

export type Contact = {
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
  name: string;
  age: string;
  mode: string;
  initials: string;
  avatar: string;
  ring: string;
  icon: MaterialIconName;
  iconColor: string;
};

export const reminderSummary = {
  title: 'Relationship Garden',
  body: '3 friends need a little sunshine today.',
};

export const overdueReminders: OverdueReminder[] = [
  {
    name: 'Sarah Jenkins',
    detail: '3 days overdue',
    accent: '#ba1a1a',
    avatar: '#d63031',
    initials: 'SJ',
    actionLabel: 'Reach out',
  },
];

export const upcomingReminders: UpcomingReminder[] = [
  {
    name: 'Marcus Chen',
    detail: 'Tomorrow, 2:00 PM',
    icon: 'clock-outline',
    accent: '#005fad',
    avatar: '#1d6fd8',
    initials: 'MC',
    actionIcon: 'message-processing-outline',
  },
  {
    name: 'Elena Rodriguez',
    detail: '48 hours left',
    icon: 'calendar-blank-outline',
    accent: '#58a3fe',
    avatar: '#89b9ff',
    initials: 'ER',
    actionIcon: 'phone-outline',
  },
];

export const onTrackContacts: OnTrackContact[] = [
  { name: 'David Kim', status: 'Growing', avatar: '#95d4b3', initials: 'DK' },
  { name: 'Sophie Ward', status: 'Stable', avatar: '#f2c9b8', initials: 'SW' },
];

export const contactFilters: ContactFilter[] = ['All', 'Family', 'Friends', 'Colleague'];

export const contacts: Contact[] = [
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

export const historyThisWeek: HistoryEntry[] = [
  {
    name: 'John',
    age: '3 days ago',
    mode: 'Phone call',
    initials: 'J',
    avatar: '#806247',
    ring: '#c7ded7',
    icon: 'phone-in-talk-outline',
    iconColor: '#005fad',
  },
  {
    name: 'Sarah',
    age: '4 days ago',
    mode: 'Message',
    initials: 'S',
    avatar: '#e3a76d',
    ring: '#a4c9ff',
    icon: 'message-outline',
    iconColor: '#0f5238',
  },
];

export const historyLastWeek: HistoryEntry[] = [
  {
    name: 'Michael',
    age: '8 days ago',
    mode: 'In person',
    initials: 'M',
    avatar: '#5f6261',
    ring: '#c9c1ad',
    icon: 'account-group-outline',
    iconColor: '#434a38',
  },
  {
    name: 'Elena',
    age: '10 days ago',
    mode: 'Video call',
    initials: 'E',
    avatar: '#7c4e3d',
    ring: '#d6c4ba',
    icon: 'video-outline',
    iconColor: '#005fad',
  },
];

export const historySummary = {
  eyebrow: 'Growth Journal',
  title: 'History',
  streakLabel: 'CONSISTENCY STREAK',
  streakValue: '12 Days',
  streakBody: "You've nurtured 5 relationships this week. Keep growing!",
  topContact: 'John',
  averageGap: '4.2 Days',
};
