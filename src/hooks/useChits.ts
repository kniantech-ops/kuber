import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { chitsRepo } from '@/db/repositories/chits.repo';
import type { ChitGroup } from '@/types/domain';

export function useChits() {
  const [items, setItems] = useState<ChitGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    void chitsRepo.list().then((result) => {
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
