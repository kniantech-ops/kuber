import { useState } from 'react';
import { monthsRepo } from '@/db/repositories/months.repo';

export function useAuction() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmAuction = async (input: {
    chitId: string;
    monthId: string;
    winnerChitMemberId: string;
    discountAmount: number;
  }) => {
    setSaving(true);
    setError(null);
    try {
      await monthsRepo.recordAuctionResult(input);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record auction');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { confirmAuction, saving, error };
}
