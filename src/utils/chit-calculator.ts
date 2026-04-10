import type { InstalmentStatus } from '@/types/domain';

export const calculateForemansCommission = (chitValue: number, commissionRate: number): number =>
  Math.round((chitValue * commissionRate) / 100);

export const calculateDividend = (
  discountAmount: number,
  foremansCommission: number,
  totalMembers: number,
): number => Math.round((discountAmount - foremansCommission) / totalMembers);

export const calculateNetPrizeAmount = (chitValue: number, discountAmount: number): number =>
  chitValue - discountAmount;

export const calculateInstalmentAmount = (subscriptionAmount: number, dividendAmount: number): number =>
  subscriptionAmount - dividendAmount;

export const validateBidAmount = (
  bidAmount: number,
  chitValue: number,
  minPercent = 5,
  maxPercent = 40,
): { valid: boolean; error?: string } => {
  const min = Math.round((chitValue * minPercent) / 100);
  const max = Math.round((chitValue * maxPercent) / 100);

  if (bidAmount < min) {
    return { valid: false, error: `Minimum bid: ₹${min / 100}` };
  }

  if (bidAmount > max) {
    return { valid: false, error: `Maximum bid: ₹${max / 100}` };
  }

  return { valid: true };
};

export const calculateCollectionPercentage = (collected: number, expected: number): number =>
  expected === 0 ? 0 : Math.round((collected / expected) * 100);

export const calculateChitCompletion = (currentMonth: number, totalMonths: number): number =>
  Math.round((currentMonth / totalMonths) * 100);

export const getDefaulterList = <T extends { status: InstalmentStatus; due_date: string }>(
  instalments: T[],
  today: string,
): T[] =>
  instalments.filter(
    (item) => item.status === 'defaulted' || (item.status === 'pending' && item.due_date < today),
  );
