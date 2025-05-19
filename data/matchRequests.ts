import { MatchRequest, Message } from '../types';
import { addDays, format } from 'date-fns';

const today = new Date();

export const matchRequests: MatchRequest[] = [
  {
    id: 'match1',
    creatorId: 'user1',
    courtType: 'padel',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    startTime: '18:00',
    endTime: '19:00',
    skillLevel: {
      min: 3,
      max: 5
    },
    playersNeeded: 2,
    playersJoined: ['user1', 'user3'],
    status: 'open',
    createdAt: format(today, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'match2',
    creatorId: 'user4',
    courtType: 'pickleball',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    startTime: '17:00',
    endTime: '18:00',
    skillLevel: {
      min: 1,
      max: 3
    },
    playersNeeded: 3,
    playersJoined: ['user4'],
    status: 'open',
    createdAt: format(addDays(today, -1), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'match3',
    creatorId: 'user2',
    courtType: 'padel',
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    startTime: '19:00',
    endTime: '20:00',
    skillLevel: {
      min: 2,
      max: 4
    },
    playersNeeded: 4,
    playersJoined: ['user2'],
    status: 'open',
    createdAt: format(addDays(today, -2), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'match4',
    creatorId: 'user5',
    courtType: 'padel',
    date: format(today, 'yyyy-MM-dd'),
    startTime: '20:00',
    endTime: '21:00',
    skillLevel: {
      min: 3,
      max: 5
    },
    playersNeeded: 3,
    playersJoined: ['user5', 'user3', 'user1'],
    status: 'filled',
    createdAt: format(addDays(today, -3), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  }
];

export const messages: Message[] = [
  {
    id: 'msg1',
    matchRequestId: 'match1',
    userId: 'user1',
    text: 'Looking forward to playing! Anyone else want to join?',
    timestamp: format(addDays(today, -1), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'msg2',
    matchRequestId: 'match1',
    userId: 'user3',
    text: 'I\'m in! See you tomorrow at 6pm.',
    timestamp: format(addDays(today, -1), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'msg3',
    matchRequestId: 'match4',
    userId: 'user5',
    text: 'Who wants to join for a competitive game tonight?',
    timestamp: format(addDays(today, -3), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'msg4',
    matchRequestId: 'match4',
    userId: 'user3',
    text: 'Count me in!',
    timestamp: format(addDays(today, -2), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  },
  {
    id: 'msg5',
    matchRequestId: 'match4',
    userId: 'user1',
    text: 'Me too! Looking forward to it.',
    timestamp: format(addDays(today, -1), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  }
];

export const getMatchMessages = (matchId: string): Message[] => {
  return messages.filter(msg => msg.matchRequestId === matchId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export const getOpenMatchRequests = (): MatchRequest[] => {
  const now = new Date();
  
  return matchRequests
    .filter(match => {
      const matchDate = new Date(`${match.date}T${match.startTime}`);
      return matchDate > now && match.status === 'open';
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });
};

export const getUserMatchRequests = (userId: string): MatchRequest[] => {
  return matchRequests.filter(match => 
    match.creatorId === userId || match.playersJoined.includes(userId)
  );
};