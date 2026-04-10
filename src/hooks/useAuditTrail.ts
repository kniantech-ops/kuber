import { useEffect, useState } from 'react';
import { auditRepo } from '@/db/repositories/audit.repo';

export function useAuditTrail(limit = 8) {
  const [items, setItems] = useState<
    Array<{
      id: string;
      entityType: string;
      entityId: string;
      action: string;
      timestamp: string;
      hash: string;
    }>
  >([]);
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    void Promise.all([auditRepo.recent(limit), auditRepo.verify()]).then(([recent, chain]) => {
      setItems(recent);
      setValid(chain.valid);
    });
  }, [limit]);

  return { items, valid };
}
