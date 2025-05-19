// User and player types
export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  interests?: string[];
  bio?: string;
  isVerified: boolean;
  membershipType: 'member' | 'guest';
  membershipExpiry?: string; // ISO date string
  skillLevel: number; // 1-5
  stats: UserStats;
}

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  winStreak: number;
  longestWinStreak: number;
  xp: number;
  level: number;
  favoritePartners: string[]; // User IDs
  recentGames: GameSummary[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateEarned: string; // ISO date string
  category: 'achievement' | 'skill' | 'participation';
}

export interface GameSummary {
  id: string;
  date: string; // ISO date string
  courtType: CourtType;
  courtId: string;
  players: {
    team1: string[]; // User IDs
    team2: string[]; // User IDs
  };
  score: {
    team1: number;
    team2: number;
  };
  winner: 'team1' | 'team2';
  duration: number; // minutes
}

// Court booking related types
export type CourtType = 'padel' | 'pickleball';

export interface Court {
  id: string;
  name: string;
  type: CourtType;
  imageUrl: string;
  isIndoor: boolean;
  hasLights: boolean;
  isAvailable: boolean;
  hourlyRate: {
    member: number;
    guest: number;
    withLights: number; // Additional cost
  };
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  date: string; // ISO date string
  startTime: string; // ISO time string (HH:MM)
  endTime: string; // ISO time string (HH:MM)
  players: string[]; // User IDs, max 4
  isPrivate: boolean;
  addOns: {
    racketRental: number; // Number of rackets
    lights: boolean;
  };
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  totalAmount: number;
  createdAt: string; // ISO date string
}

// Matchmaking types
export interface MatchRequest {
  id: string;
  creatorId: string;
  courtType: CourtType;
  date: string; // ISO date string
  startTime: string; // ISO time string (HH:MM)
  endTime: string; // ISO time string (HH:MM)
  skillLevel: {
    min: number;
    max: number;
  };
  playersNeeded: number;
  playersJoined: string[]; // User IDs
  status: 'open' | 'filled' | 'cancelled';
  createdAt: string; // ISO date string
}

export interface Message {
  id: string;
  matchRequestId: string;
  userId: string;
  text: string;
  timestamp: string; // ISO date string
}

// Payment related types
export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // days
  benefits: string[];
  gameCredits?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'booking' | 'membership' | 'gamePack';
  amount: number;
  description: string;
  date: string; // ISO date string
  status: 'pending' | 'completed' | 'refunded';
  relatedId?: string; // Booking ID or Membership ID
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'match' | 'membership' | 'level' | 'badge';
  title: string;
  message: string;
  isRead: boolean;
  date: string; // ISO date string
  relatedId?: string; // Related entity ID
}