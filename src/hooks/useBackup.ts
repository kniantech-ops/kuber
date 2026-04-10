import { useState } from 'react';
import { backupService } from '@/services/backup.service';

export function useBackup() {
  const [lastChecksum, setLastChecksum] = useState<string | null>(null);

  const backupNow = async (payload: object, pin: string) => {
    const result = await backupService.createEncryptedBackup(payload, pin);
    setLastChecksum(result.checksum);
    return result;
  };

  return { backupNow, lastChecksum };
}
