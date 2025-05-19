import { PaymentPlan, Transaction } from '../types';
import { addDays, format } from 'date-fns';

const today = new Date();

export const paymentPlans: PaymentPlan[] = [
  {
    id: 'plan1',
    name: 'Monthly Membership',
    description: 'Full access to all facilities for 30 days. Includes discounted court rates.',
    price: 500,
    duration: 30,
    benefits: [
      'Discounted court bookings',
      'Up to 20 bookings per month',
      'Advanced booking (up to 14 days)',
      'Access to member events'
    ]
  },
  {
    id: 'plan2',
    name: 'Quarterly Membership',
    description: 'Full access to all facilities for 90 days. Includes discounted court rates.',
    price: 1350,
    duration: 90,
    benefits: [
      'Discounted court bookings',
      'Unlimited bookings',
      'Advanced booking (up to 21 days)',
      'Access to member events',
      'Free equipment rental'
    ]
  },
  {
    id: 'plan3',
    name: 'Annual Membership',
    description: 'Full access to all facilities for 365 days. Best value with maximum benefits.',
    price: 4800,
    duration: 365,
    benefits: [
      'Discounted court bookings',
      'Unlimited bookings',
      'Advanced booking (up to 30 days)',
      'Access to all events',
      'Free equipment rental',
      'Personal training session (2x)'
    ]
  },
  {
    id: 'plan4',
    name: '10 Game Pack',
    description: 'Buy 10 games in advance at a discounted rate. Valid for 3 months.',
    price: 1800,
    duration: 90,
    benefits: [
      'Book any court type',
      'Save 10% compared to regular rates',
      'Valid for 90 days'
    ],
    gameCredits: 10
  },
  {
    id: 'plan5',
    name: '20 Game Pack',
    description: 'Buy 20 games in advance at a discounted rate. Valid for 6 months.',
    price: 3400,
    duration: 180,
    benefits: [
      'Book any court type',
      'Save 15% compared to regular rates',
      'Valid for 180 days'
    ],
    gameCredits: 20
  }
];

export const transactions: Transaction[] = [
  {
    id: 'trans1',
    userId: 'user1',
    type: 'membership',
    amount: 4800,
    description: 'Annual Membership Renewal',
    date: format(addDays(today, -45), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    status: 'completed',
    relatedId: 'plan3'
  },
  {
    id: 'trans2',
    userId: 'user1',
    type: 'booking',
    amount: 200,
    description: 'Court Booking - Blue Court',
    date: format(addDays(today, -7), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    status: 'completed',
    relatedId: 'booking1'
  },
  {
    id: 'trans3',
    userId: 'user2',
    type: 'membership',
    amount: 1350,
    description: 'Quarterly Membership Renewal',
    date: format(addDays(today, -30), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    status: 'completed',
    relatedId: 'plan2'
  },
  {
    id: 'trans4',
    userId: 'user3',
    type: 'gamePack',
    amount: 3400,
    description: '20 Game Pack Purchase',
    date: format(addDays(today, -15), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    status: 'completed',
    relatedId: 'plan5'
  },
  {
    id: 'trans5',
    userId: 'user1',
    type: 'booking',
    amount: 200,
    description: 'Court Booking - Green Court',
    date: format(today, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    status: 'pending',
    relatedId: 'booking4'
  }
];

export const getUserTransactions = (userId: string): Transaction[] => {
  return transactions
    .filter(trans => trans.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPendingTransactions = (userId: string): Transaction[] => {
  return transactions
    .filter(trans => trans.userId === userId && trans.status === 'pending')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};