import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { paymentsRepo } from '@/db/repositories/payments.repo';
import type { PaymentRecord } from '@/types/domain';

export function usePayments() {
  const [items, setItems] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    void paymentsRepo.list().then((result) => {
      setItems(result);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useFocusEffect(refresh);

  return { items, loading, refresh };
}
