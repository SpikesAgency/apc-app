import { User } from '../types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    phone: '+90 555 123 4567',
    age: 32,
    gender: 'male',
    interests: ['padel', 'tennis', 'fitness'],
    bio: 'Padel enthusiast for 5 years. Looking for competitive matches!',
    isVerified: true,
    membershipType: 'member',
    membershipExpiry: '2025-12-31T23:59:59Z',
    skillLevel: 4,
    stats: {
      gamesPlayed: 87,
      wins: 52,
      losses: 35,
      winStreak: 3,
      longestWinStreak: 8,
      xp: 1750,
      level: 14,
      favoritePartners: ['user3', 'user5'],
      recentGames: [],
      badges: [
        {
          id: 'badge1',
          name: 'Winning Streak',
          description: 'Won 5 games in a row',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-03-15T14:30:00Z',
          category: 'achievement'
        },
        {
          id: 'badge2',
          name: 'Consistent Player',
          description: 'Played 50+ games',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-02-10T17:45:00Z',
          category: 'participation'
        }
      ]
    }
  },
  {
    id: 'user2',
    name: 'Zeynep Kaya',
    email: 'zeynep@example.com',
    photoUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    phone: '+90 555 987 6543',
    age: 28,
    gender: 'female',
    interests: ['padel', 'yoga', 'swimming'],
    bio: 'New to padel but improving quickly! Looking for friendly games.',
    isVerified: true,
    membershipType: 'member',
    membershipExpiry: '2025-11-15T23:59:59Z',
    skillLevel: 2,
    stats: {
      gamesPlayed: 23,
      wins: 9,
      losses: 14,
      winStreak: 0,
      longestWinStreak: 3,
      xp: 460,
      level: 5,
      favoritePartners: ['user4'],
      recentGames: [],
      badges: [
        {
          id: 'badge3',
          name: 'Quick Learner',
          description: 'Improved skill level in record time',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-04-05T11:20:00Z',
          category: 'skill'
        }
      ]
    }
  },
  {
    id: 'user3',
    name: 'Mehmet Demir',
    email: 'mehmet@example.com',
    photoUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    phone: '+90 555 444 3333',
    age: 41,
    gender: 'male',
    interests: ['padel', 'pickleball', 'golf'],
    bio: 'Former tennis player who loves padel. Looking for both competitive and friendly games.',
    isVerified: true,
    membershipType: 'member',
    membershipExpiry: '2026-01-31T23:59:59Z',
    skillLevel: 5,
    stats: {
      gamesPlayed: 112,
      wins: 78,
      losses: 34,
      winStreak: 5,
      longestWinStreak: 12,
      xp: 2240,
      level: 19,
      favoritePartners: ['user1', 'user5'],
      recentGames: [],
      badges: [
        {
          id: 'badge4',
          name: 'Pro Player',
          description: 'Achieved maximum skill level',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-01-20T16:15:00Z',
          category: 'skill'
        },
        {
          id: 'badge5',
          name: 'Tournament Winner',
          description: 'Won a club tournament',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-03-01T19:30:00Z',
          category: 'achievement'
        }
      ]
    }
  },
  {
    id: 'user4',
    name: 'Elif Şahin',
    email: 'elif@example.com',
    photoUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    phone: '+90 555 222 1111',
    age: 34,
    gender: 'female',
    interests: ['padel', 'pickleball', 'hiking'],
    bio: 'Pickleball fan who recently fell in love with padel. Looking for weekend games.',
    isVerified: true,
    membershipType: 'guest',
    skillLevel: 3,
    stats: {
      gamesPlayed: 15,
      wins: 7,
      losses: 8,
      winStreak: 1,
      longestWinStreak: 2,
      xp: 300,
      level: 3,
      favoritePartners: ['user2'],
      recentGames: [],
      badges: [
        {
          id: 'badge6',
          name: 'Versatile Player',
          description: 'Played both padel and pickleball',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-04-10T14:00:00Z',
          category: 'participation'
        }
      ]
    }
  },
  {
    id: 'user5',
    name: 'Ozan Yıldırım',
    email: 'ozan@example.com',
    photoUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    phone: '+90 555 777 8888',
    age: 37,
    gender: 'male',
    interests: ['padel', 'football', 'running'],
    bio: 'Sports enthusiast who plays padel every week. Always up for a challenge!',
    isVerified: true,
    membershipType: 'member',
    membershipExpiry: '2025-10-31T23:59:59Z',
    skillLevel: 4,
    stats: {
      gamesPlayed: 65,
      wins: 35,
      losses: 30,
      winStreak: 0,
      longestWinStreak: 7,
      xp: 1300,
      level: 11,
      favoritePartners: ['user1', 'user3'],
      recentGames: [],
      badges: [
        {
          id: 'badge7',
          name: 'Regular Player',
          description: 'Played at least once every week for a month',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-02-28T18:45:00Z',
          category: 'participation'
        }
      ]
    }
  },
  {
    id: 'user6',
    name: 'Deniz Aksoy',
    email: 'deniz@example.com',
    photoUrl: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg',
    phone: '+90 555 333 2222',
    age: 29,
    gender: 'female',
    interests: ['pickleball', 'basketball', 'cycling'],
    bio: 'Pickleball addict! Looking for regular games and new partners.',
    isVerified: true,
    membershipType: 'guest',
    skillLevel: 3,
    stats: {
      gamesPlayed: 28,
      wins: 12,
      losses: 16,
      winStreak: 2,
      longestWinStreak: 4,
      xp: 560,
      level: 6,
      favoritePartners: [],
      recentGames: [],
      badges: [
        {
          id: 'badge8',
          name: 'Pickleball Enthusiast',
          description: 'Played 25+ pickleball games',
          imageUrl: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg',
          dateEarned: '2025-03-22T12:30:00Z',
          category: 'participation'
        }
      ]
    }
  }
];

export const currentUser = users[0];