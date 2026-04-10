export type ChitType = 'auction' | 'lucky_draw' | 'fixed';
export type ChitStatus = 'draft' | 'active' | 'completed' | 'terminated';
export type MemberStatus = 'active' | 'prized' | 'defaulted' | 'exited';
export type InstalmentStatus = 'pending' | 'partial' | 'paid' | 'defaulted';

export interface ChitGroup {
  id: string;
  name: string;
  chitValue: number;
  subscriptionAmount: number;
  totalMembers: number;
  durationMonths: number;
  commissionRate: number;
  type: ChitType;
  status: ChitStatus;
  currentMonth: number;
  nextAuctionDate: string;
  collectionPercent: number;
  defaultersCount: number;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  city: string;
  status: MemberStatus;
  ticketNumber: string;
}

export interface PaymentRecord {
  id: string;
  chitId: string;
  memberName: string;
  amount: number;
  balance: number;
  mode: 'cash' | 'upi' | 'bank' | 'cheque';
  createdAt: string;
  status: InstalmentStatus;
}

export interface ChitMemberAssignment {
  id: string;
  chitId: string;
  memberId: string;
  memberName: string;
  ticketNumber: string;
  status: MemberStatus;
}

export interface InstalmentRecord {
  id: string;
  chitId: string;
  chitMemberId: string;
  memberName: string;
  monthNumber: number;
  dueDate: string;
  dueAmount: number;
  paidAmount: number;
  balance: number;
  status: InstalmentStatus;
}
