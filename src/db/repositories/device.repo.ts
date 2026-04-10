import { verifyDeviceBinding } from '@/security/tamper.service';

export const deviceRepo = {
  async status() {
    return verifyDeviceBinding();
  },
};
