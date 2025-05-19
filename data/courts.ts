import { Court, TimeSlot } from '../types';
import { addDays, format, setHours, setMinutes } from 'date-fns';

export const courts: Court[] = [
  {
    id: 'court1',
    name: 'Blue Court',
    type: 'padel',
    imageUrl: 'https://images.pexels.com/photos/3651335/pexels-photo-3651335.jpeg',
    isIndoor: false,
    hasLights: true,
    isAvailable: true,
    hourlyRate: {
      member: 200,
      guest: 300,
      withLights: 50
    }
  },
  {
    id: 'court2',
    name: 'Green Court',
    type: 'padel',
    imageUrl: 'https://images.pexels.com/photos/2371016/pexels-photo-2371016.jpeg',
    isIndoor: false,
    hasLights: true,
    isAvailable: true,
    hourlyRate: {
      member: 200,
      guest: 300,
      withLights: 50
    }
  },
  {
    id: 'court3',
    name: 'Red Court',
    type: 'padel',
    imageUrl: 'https://images.pexels.com/photos/13051600/pexels-photo-13051600.jpeg',
    isIndoor: true,
    hasLights: false,
    isAvailable: true,
    hourlyRate: {
      member: 250,
      guest: 350,
      withLights: 0
    }
  },
  {
    id: 'court4',
    name: 'Yellow Court',
    type: 'pickleball',
    imageUrl: 'https://images.pexels.com/photos/2403507/pexels-photo-2403507.jpeg',
    isIndoor: false,
    hasLights: true,
    isAvailable: true,
    hourlyRate: {
      member: 150,
      guest: 250,
      withLights: 50
    }
  },
  {
    id: 'court5',
    name: 'Orange Court',
    type: 'pickleball',
    imageUrl: 'https://images.pexels.com/photos/2564026/pexels-photo-2564026.jpeg',
    isIndoor: false,
    hasLights: true,
    isAvailable: true,
    hourlyRate: {
      member: 150,
      guest: 250,
      withLights: 50
    }
  },
  {
    id: 'court6',
    name: 'Purple Court',
    type: 'pickleball',
    imageUrl: 'https://images.pexels.com/photos/3618223/pexels-photo-3618223.jpeg',
    isIndoor: true,
    hasLights: false,
    isAvailable: false, // Under maintenance
    hourlyRate: {
      member: 200,
      guest: 300,
      withLights: 0
    }
  }
];

// Generate time slots for the next 7 days
export const generateTimeSlots = (courtId: string): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  const startDate = new Date();
  
  // For each of the next 7 days
  for (let day = 0; day < 7; day++) {
    const currentDate = addDays(startDate, day);
    
    // Generate slots from 8:00 to 22:00 (8 AM to 10 PM)
    for (let hour = 8; hour < 22; hour++) {
      const startDateTime = setHours(setMinutes(currentDate, 0), hour);
      const endDateTime = setHours(setMinutes(currentDate, 0), hour + 1);
      
      // Random availability (more available than not)
      const isAvailable = Math.random() > 0.3;
      
      timeSlots.push({
        id: `${courtId}-${format(startDateTime, 'yyyy-MM-dd-HH')}`,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        isAvailable
      });
    }
  }
  
  return timeSlots;
};

export const getAvailableTimeSlots = () => {
  const allTimeSlots: { [courtId: string]: TimeSlot[] } = {};
  
  courts.forEach(court => {
    if (court.isAvailable) {
      allTimeSlots[court.id] = generateTimeSlots(court.id);
    } else {
      allTimeSlots[court.id] = [];
    }
  });
  
  return allTimeSlots;
};