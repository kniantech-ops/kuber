import { encryptBackup } from '@/security/crypto.service';

export const backupService = {
  async createEncryptedBackup(payload: object, pin: string) {
    return encryptBackup(JSON.stringify(payload), pin);
  },
};
