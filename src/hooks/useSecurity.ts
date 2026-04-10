import { useEffect, useState } from 'react';
import { calculateSecurityScore } from '@/security/device.service';
import { auditRepo } from '@/db/repositories/audit.repo';

export function useSecurity() {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<Array<{ label: string; enabled: boolean; points: number }>>([]);
  const [chainValid, setChainValid] = useState<boolean | null>(null);

  useEffect(() => {
    void Promise.all([calculateSecurityScore(), auditRepo.verify()]).then(([result, audit]) => {
      setScore(result.score);
      setItems(result.items);
      setChainValid(audit.valid);
    });
  }, []);

  return { score, items, chainValid };
}
