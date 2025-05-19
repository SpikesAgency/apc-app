import { Booking } from '../types';
import { addDays, format } from 'date-fns';

// Create sample bookings for the next 7 days
const today = new Date();

export const bookings: Booking[] = [
  {
    id: 'booking1',
    courtId: 'court1',
    userId: 'user1',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '10:00',
    endTime: '11:00',
    players: ['user1', 'user3', 'user5', 'user2'],
    isPrivate: false,
    addOns: {
      racketRental: 2,
      lights: false
    },
    paymentStatus: 'paid',
    totalAmount: 200,
    createdAt: format(addDays(today, -2), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'booking2',
    courtId: 'court2',
    userId: 'user3',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '18:00',
    endTime: '19:00',
    players: ['user3', 'user5'],
    isPrivate: true,
    addOns: {
      racketRental: 0,
      lights: true
    },
    paymentStatus: 'paid',
    totalAmount: 250,
    createdAt: format(addDays(today, -1), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'booking3',
    courtId: 'court4',
    userId: 'user4',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    startTime: '16:00',
    endTime: '17:00',
    players: ['user4', 'user6', 'user2'],
    isPrivate: false,
    addOns: {
      racketRental: 1,
      lights: false
    },
    paymentStatus: 'paid',
    totalAmount: 150,
    createdAt: format(addDays(today, -3), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'booking4',
    courtId: 'court1',
    userId: 'user1',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    players: ['user1', 'user3'],
    isPrivate: true,
    addOns: {
      racketRental: 0,
      lights: false
    },
    paymentStatus: 'pending',
    totalAmount: 200,
    createdAt: format(today, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'booking5',
    courtId: 'court3',
    userId: 'user5',
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    startTime: '20:00',
    endTime: '21:00',
    players: ['user5', 'user1', 'user3', 'user2'],
    isPrivate: false,
    addOns: {
      racketRental: 2,
      lights: false
    },
    paymentStatus: 'paid',
    totalAmount: 250,
    createdAt: format(addDays(today, -1), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  }
];

export const getUserBookings = (userId: string): Booking[] => {
  return bookings.filter(booking => 
    booking.userId === userId || booking.players.includes(userId)
  );
};

export const getUpcomingBookings = (userId: string): Booking[] => {
  const today = new Date();
  
  return getUserBookings(userId)
    .filter(booking => {
      const bookingDate = new Date(`${booking.date}T${booking.startTime}`);
      return bookingDate >= today;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });
};