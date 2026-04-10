import { paymentsRepo } from '@/db/repositories/payments.repo';

export const instalmentsRepo = {
  async getCollectionSnapshot(): Promise<{ paid: number; partial: number; defaulted: number }> {
    const items = await paymentsRepo.list();
    return {
      paid: items.filter((item) => item.status === 'paid').length,
      partial: items.filter((item) => item.status === 'partial').length,
      defaulted: items.filter((item) => item.status === 'defaulted').length,
    };
  },
};
