import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { chitsRepo } from '@/db/repositories/chits.repo';
import { duesRepo } from '@/db/repositories/dues.repo';
import { monthsRepo, type MonthScheduleItem } from '@/db/repositories/months.repo';
import type { ChitGroup, InstalmentRecord } from '@/types/domain';

export function useChitDetails(id?: string) {
  const [chit, setChit] = useState<ChitGroup | null>(null);
  const [months, setMonths] = useState<MonthScheduleItem[]>([]);
  const [dues, setDues] = useState<InstalmentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    void Promise.all([chitsRepo.getById(id), monthsRepo.listByChitId(id), duesRepo.listByChitId(id)]).then(([chitResult, monthResult, dueResult]) => {
      setChit(chitResult ?? null);
      setMonths(monthResult);
      setDues(dueResult);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useFocusEffect(refresh);

  return { chit, months, dues, loading, refresh };
}
