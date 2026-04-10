import type { ChitGroup, Member, PaymentRecord } from '@/types/domain';

export const mockChits: ChitGroup[] = [
  {
    id: 'chit-1',
    name: 'Golden Circle 20',
    chitValue: 10000000,
    subscriptionAmount: 500000,
    totalMembers: 20,
    durationMonths: 20,
    commissionRate: 5,
    type: 'auction',
    status: 'active',
    currentMonth: 6,
    nextAuctionDate: '2026-04-15',
    collectionPercent: 83,
    defaultersCount: 2,
  },
  {
    id: 'chit-2',
    name: 'Lucky Family 12',
    chitValue: 3600000,
    subscriptionAmount: 300000,
    totalMembers: 12,
    durationMonths: 12,
    commissionRate: 5,
    type: 'lucky_draw',
    status: 'active',
    currentMonth: 4,
    nextAuctionDate: '2026-04-12',
    collectionPercent: 61,
    defaultersCount: 1,
  },
];

export const mockMembers: Member[] = [
  { id: 'm1', name: 'Arun Kumar', phone: '9876543210', city: 'Chennai', status: 'active', ticketNumber: 'A01' },
  { id: 'm2', name: 'Meena Devi', phone: '9876501234', city: 'Madurai', status: 'prized', ticketNumber: 'A02' },
  { id: 'm3', name: 'Rafiq Ahmed', phone: '9123456780', city: 'Hyderabad', status: 'defaulted', ticketNumber: 'B03' },
];

export const mockPayments: PaymentRecord[] = [
  {
    id: 'p1',
    chitId: 'chit-1',
    memberName: 'Arun Kumar',
    amount: 425000,
    balance: 0,
    mode: 'upi',
    createdAt: '2026-04-09T10:15:00.000Z',
    status: 'paid',
  },
  {
    id: 'p2',
    chitId: 'chit-1',
    memberName: 'Rafiq Ahmed',
    amount: 200000,
    balance: 225000,
    mode: 'cash',
    createdAt: '2026-04-09T12:00:00.000Z',
    status: 'partial',
  },
];
