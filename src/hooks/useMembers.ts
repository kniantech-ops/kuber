import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { membersRepo } from '@/db/repositories/members.repo';
import type { Member } from '@/types/domain';

export function useMembers() {
  const [items, setItems] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    void membersRepo.list().then((result) => {
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
