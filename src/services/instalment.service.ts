import { calculateCollectionPercentage } from '@/utils/chit-calculator';

export const instalmentService = {
  getCollectionProgress(collected: number, expected: number) {
    const percent = calculateCollectionPercentage(collected, expected);
    const tone = percent >= 80 ? 'green' : percent >= 50 ? 'orange' : 'red';
    return { percent, tone };
  },
};
