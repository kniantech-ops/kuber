import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { chitMembersRepo } from '@/db/repositories/chit-members.repo';
import type { ChitMemberAssignment } from '@/types/domain';

export function useChitAssignments(chitId?: string) {
  const [items, setItems] = useState<ChitMemberAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!chitId) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    void chitMembersRepo.listByChitId(chitId).then((result) => {
      setItems(result);
      setLoading(false);
    });
  }, [chitId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useFocusEffect(refresh);

  return { items, loading, refresh };
}
