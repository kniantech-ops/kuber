import { useEffect, useState } from 'react';
import { chitsRepo } from '@/db/repositories/chits.repo';
import { duesRepo } from '@/db/repositories/dues.repo';

export function useReports() {
  const [summary, setSummary] = useState({
    chitCount: 0,
    totalPot: 0,
    collected: 0,
    outstanding: 0,
  });

  useEffect(() => {
    void Promise.all([chitsRepo.getSummary(), duesRepo.getPortfolioRollup()]).then(([chits, dues]) => {
      setSummary({
        chitCount: chits.count,
        totalPot: chits.totalPot,
        collected: dues.collected,
        outstanding: dues.outstanding,
      });
    });
  }, []);

  return summary;
}
