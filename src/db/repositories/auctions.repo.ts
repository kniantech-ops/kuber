import { chitsRepo } from '@/db/repositories/chits.repo';

export const auctionsRepo = {
  async upcoming() {
    const items = await chitsRepo.list();
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      date: item.nextAuctionDate,
      pot: item.chitValue,
    }));
  },
};
