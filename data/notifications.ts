import { Notification } from '../types';
import { addDays, format } from 'date-fns';

const today = new Date();

export const notifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    type: 'match',
    title: 'New Match Confirmation',
    message: 'Your match for tomorrow at 18:00 is confirmed. 2 players have joined.',
    isRead: false,
    date: format(today, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    relatedId: 'match1'
  },
  {
    id: 'notif2',
    userId: 'user1',
    type: 'booking',
    title: 'Upcoming Booking Reminder',
    message: 'Reminder: You have a booking for Blue Court tomorrow at 10:00.',
    isRead: true,
    date: format(addDays(today, -1), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    relatedId: 'booking1'
  },
  {
    id: 'notif3',
    userId: 'user1',
    type: 'level',
    title: 'Level Up!',
    message: 'Congratulations! You\'ve reached Level 14. New badge unlocked.',
    isRead: false,
    date: format(addDays(today, -3), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'notif4',
    userId: 'user1',
    type: 'badge',
    title: 'New Badge Earned',
    message: 'You\'ve earned the "Winning Streak" badge for winning 5 games in a row!',
    isRead: true,
    date: format(addDays(today, -5), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    relatedId: 'badge1'
  },
  {
    id: 'notif5',
    userId: 'user1',
    type: 'membership',
    title: 'Membership Update',
    message: 'Your annual membership will expire in 45 days. Renew now for a 10% discount!',
    isRead: false,
    date: format(addDays(today, -2), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  }
];

export const getUserNotifications = (userId: string): Notification[] => {
  return notifications
    .filter(notif => notif.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getUnreadNotificationsCount = (userId: string): number => {
  return notifications.filter(notif => notif.userId === userId && !notif.isRead).length;
};