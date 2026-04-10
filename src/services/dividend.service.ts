import {
  calculateDividend,
  calculateForemansCommission,
  calculateInstalmentAmount,
  calculateNetPrizeAmount,
} from '@/utils/chit-calculator';

export const dividendService = {
  calculateMonthlyBreakdown(input: {
    chitValue: number;
    discountAmount: number;
    commissionRate: number;
    totalMembers: number;
    subscriptionAmount: number;
  }) {
    const foremanCommission = calculateForemansCommission(input.chitValue, input.commissionRate);
    const dividend = calculateDividend(input.discountAmount, foremanCommission, input.totalMembers);
    const netPrize = calculateNetPrizeAmount(input.chitValue, input.discountAmount);
    const instalment = calculateInstalmentAmount(input.subscriptionAmount, dividend);

    return {
      foremanCommission,
      dividend,
      netPrize,
      instalment,
    };
  },
};
