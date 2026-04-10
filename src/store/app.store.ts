import { create } from 'zustand';
import { mockChits, mockMembers, mockPayments } from '@/data/mock';

export const useAppStore = create(() => ({
  chits: mockChits,
  members: mockMembers,
  payments: mockPayments,
}));
