import {
  Contact,
  HistoryEntry,
  MaterialIconName,
  OnTrackContact,
  OverdueReminder,
  StoredConnectionType,
  StoredContact,
  StoredEvent,
  StoredInterval,
  UpcomingReminder,
  reminderSummary,
} from '@/data/mock-app-data';

const TODAY = new Date('2026-05-17T12:00:00Z');

function intervalToDays(interval: StoredInterval) {
  switch (interval) {
    case 'Weekly':
      return 7;
    case 'Bi-weekly':
      return 14;
    case 'Monthly':
      return 30;
    case 'Custom':
      return 21;
  }
}

function toDate(value: string) {
  return new Date(`${value}T12:00:00Z`);
}

function differenceInDays(date: Date) {
  return Math.max(0, Math.round((TODAY.getTime() - date.getTime()) / 86400000));
}

function latestEventFor(contactId: string, events: StoredEvent[]) {
  return events
    .filter((event) => event.contactId === contactId)
    .sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime())[0];
}

function connectionTypeToIcon(type: StoredConnectionType) {
  switch (type) {
    case 'Phone Call':
      return 'phone-outline' as const;
    case 'Message':
      return 'message-processing-outline' as const;
    case 'In-person':
      return 'account-group-outline' as const;
    case 'Video Call':
      return 'video-outline' as const;
  }
}

function historyTypeToIcon(type: StoredConnectionType) {
  switch (type) {
    case 'Phone Call':
      return 'phone-in-talk-outline' as const;
    case 'Message':
      return 'message-outline' as const;
    case 'In-person':
      return 'account-group-outline' as const;
    case 'Video Call':
      return 'video-outline' as const;
  }
}

function reminderDueIcon(dueInDays: number): MaterialIconName {
  return dueInDays === 0 ? 'clock-outline' : 'calendar-blank-outline';
}

function historyTypeToColor(type: StoredConnectionType) {
  switch (type) {
    case 'Phone Call':
      return '#005fad';
    case 'Message':
      return '#0f5238';
    case 'In-person':
      return '#434a38';
    case 'Video Call':
      return '#005fad';
  }
}

function pluralizeDay(days: number) {
  return `${days} day${days === 1 ? '' : 's'}`;
}

export function buildReminderSummary(contacts: StoredContact[], events: StoredEvent[]) {
  const statuses = contacts.map((contact) => {
    const latest = latestEventFor(contact.id, events);
    if (!latest) {
      return { contact, dueInDays: -999 };
    }
    const lastConnectedDays = differenceInDays(toDate(latest.date));
    return {
      contact,
      dueInDays: intervalToDays(contact.interval) - lastConnectedDays,
    };
  });

  const overdue = statuses.filter((item) => item.dueInDays < 0).length;
  const upcoming = statuses.filter((item) => item.dueInDays >= 0 && item.dueInDays <= 2).length;
  const total = overdue + upcoming;

  return {
    title: reminderSummary.title,
    body:
      total > 0
        ? `${total} friend${total === 1 ? '' : 's'} need a little sunshine today.`
        : 'Everything is on track right now.',
  };
}

export function buildReminders(
  contacts: StoredContact[],
  events: StoredEvent[]
): {
  overdue: OverdueReminder[];
  upcoming: UpcomingReminder[];
  onTrack: OnTrackContact[];
} {
  const statuses = contacts
    .map((contact) => {
      const latest = latestEventFor(contact.id, events);
      if (!latest) {
        return { contact, latest, dueInDays: -999 };
      }

      const lastConnectedDays = differenceInDays(toDate(latest.date));

      return {
        contact,
        latest,
        dueInDays: intervalToDays(contact.interval) - lastConnectedDays,
      };
    })
    .sort((a, b) => a.dueInDays - b.dueInDays);

  const overdue = statuses
    .filter((item) => item.dueInDays < 0)
    .slice(0, 3)
    .map(({ contact, dueInDays }) => ({
      name: contact.name,
      detail: `${pluralizeDay(Math.abs(dueInDays))} overdue`,
      accent: '#ba1a1a',
      avatar: contact.avatar,
      initials: contact.initials,
      actionLabel: 'Reach out',
    }));

  const upcoming = statuses
    .filter((item) => item.dueInDays >= 0 && item.dueInDays <= 2)
    .slice(0, 3)
    .map(({ contact, latest, dueInDays }) => ({
      name: contact.name,
      detail: dueInDays === 0 ? 'Today' : `${pluralizeDay(dueInDays)} left`,
      icon: reminderDueIcon(dueInDays),
      accent: dueInDays === 0 ? '#005fad' : '#58a3fe',
      avatar: contact.avatar,
      initials: contact.initials,
      actionIcon: (latest ? connectionTypeToIcon(latest.type) : 'message-processing-outline') as MaterialIconName,
    }));

  const onTrack = statuses
    .filter((item) => item.dueInDays > 2)
    .slice(0, 4)
    .map(({ contact, dueInDays }) => ({
      name: contact.name,
      status: dueInDays <= 7 ? 'Growing' : 'Stable',
      avatar: contact.avatar,
      initials: contact.initials,
    }));

  return { overdue, upcoming, onTrack };
}

export function buildContactCards(contacts: StoredContact[], events: StoredEvent[]): Contact[] {
  return contacts
    .map((contact) => {
      const latest = latestEventFor(contact.id, events);
      const dueInDays = latest
        ? intervalToDays(contact.interval) - differenceInDays(toDate(latest.date))
        : -999;

      return {
        id: contact.id,
        name: contact.name,
        cadence: contact.interval,
        urgency: dueInDays < 0 ? 'Overdue' : `${pluralizeDay(dueInDays)} left`,
        tag: contact.relationship,
        accent: contact.accent,
        avatar: contact.avatar,
        initials: contact.initials,
        actionIcon: (
          dueInDays < 0
            ? 'bell-ring-outline'
            : latest
              ? connectionTypeToIcon(latest.type)
              : 'message-processing-outline'
        ) as MaterialIconName,
        actionColor: dueInDays < 0 ? '#ba1a1a' : '#0f5238',
        actionBackground: dueInDays < 0 ? '#feecec' : '#dff4eb',
        tagBackground: contact.tagBackground,
        tagColor: contact.tagColor,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function buildHistoryEntries(
  contacts: StoredContact[],
  events: StoredEvent[]
): {
  thisWeek: HistoryEntry[];
  lastWeek: HistoryEntry[];
  topContact: string;
  averageGap: string;
} {
  const sortedEvents = [...events].sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime());

  const entries: Array<HistoryEntry & { daysAgo: number }> = [];

  for (const event of sortedEvents) {
    const contact = contacts.find((item) => item.id === event.contactId);
    if (!contact) {
      continue;
    }

    const daysAgo = differenceInDays(toDate(event.date));

    entries.push({
      id: event.id,
      name: contact.name,
      age: daysAgo === 0 ? 'Today' : `${pluralizeDay(daysAgo)} ago`,
      mode: event.type,
      initials: contact.initials,
      avatar: contact.avatar,
      ring: contact.accent,
      icon: historyTypeToIcon(event.type),
      iconColor: historyTypeToColor(event.type),
      daysAgo,
    });
  }

  const thisWeek = entries.filter((entry) => entry.daysAgo <= 6).slice(0, 4);
  const lastWeek = entries.filter((entry) => entry.daysAgo >= 7 && entry.daysAgo <= 13).slice(0, 4);

  const eventCounts = new Map<string, number>();
  for (const event of events) {
    eventCounts.set(event.contactId, (eventCounts.get(event.contactId) ?? 0) + 1);
  }
  const topContactId =
    [...eventCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? contacts[0]?.id;
  const topContact = contacts.find((contact) => contact.id === topContactId)?.name ?? 'None yet';

  const allDayDiffs = sortedEvents.map((event) => differenceInDays(toDate(event.date)));
  const average =
    allDayDiffs.length > 0
      ? `${(allDayDiffs.reduce((sum, value) => sum + value, 0) / allDayDiffs.length).toFixed(1)} Days`
      : '0 Days';

  return {
    thisWeek: thisWeek.map(({ daysAgo: _daysAgo, ...entry }) => entry),
    lastWeek: lastWeek.map(({ daysAgo: _daysAgo, ...entry }) => entry),
    topContact,
    averageGap: average,
  };
}
