import { nativeDb } from '@/db';
import { duesRepo } from '@/db/repositories/dues.repo';
import { createAuditEntry } from '@/security/integrity.service';
import { dividendService } from '@/services/dividend.service';

export interface MonthScheduleItem {
  id: string;
  chitId: string;
  monthNumber: number;
  monthDate: string;
  status: string;
  potAmount: number;
  discountAmount: number;
  dividendAmount: number;
  netPrizeAmount: number;
}

interface MonthRow {
  id: string;
  chit_id: string;
  month_number: number;
  month_date: string;
  status: string;
  pot_amount: number;
  discount_amount: number;
  dividend_amount: number;
  net_prize_amount: number;
}

const toMonth = (row: MonthRow): MonthScheduleItem => ({
  id: row.id,
  chitId: row.chit_id,
  monthNumber: row.month_number,
  monthDate: row.month_date,
  status: row.status,
  potAmount: row.pot_amount,
  discountAmount: row.discount_amount,
  dividendAmount: row.dividend_amount,
  netPrizeAmount: row.net_prize_amount,
});

export const monthsRepo = {
  async listByChitId(chitId: string): Promise<MonthScheduleItem[]> {
    const rows = await nativeDb.getAllAsync<MonthRow>(
      `SELECT id, chit_id, month_number, month_date, status, pot_amount, discount_amount, dividend_amount, net_prize_amount
       FROM months WHERE chit_id = ? AND is_deleted = 0 ORDER BY month_number ASC`,
      chitId,
    );
    return rows.map(toMonth);
  },
  async getById(id: string): Promise<MonthScheduleItem | null> {
    const row = await nativeDb.getFirstAsync<MonthRow>(
      `SELECT id, chit_id, month_number, month_date, status, pot_amount, discount_amount, dividend_amount, net_prize_amount
       FROM months WHERE id = ? LIMIT 1`,
      id,
    );
    return row ? toMonth(row) : null;
  },
  async getCurrentMonthForChit(chitId: string): Promise<MonthScheduleItem | null> {
    const row = await nativeDb.getFirstAsync<MonthRow>(
      `SELECT id, chit_id, month_number, month_date, status, pot_amount, discount_amount, dividend_amount, net_prize_amount
       FROM months
       WHERE chit_id = ? AND is_deleted = 0 AND status = 'pending'
       ORDER BY month_number ASC
       LIMIT 1`,
      chitId,
    );
    return row ? toMonth(row) : null;
  },
  async recordAuctionResult(input: {
    chitId: string;
    monthId: string;
    winnerChitMemberId: string;
    discountAmount: number;
  }): Promise<void> {
    const chit = await nativeDb.getFirstAsync<{
      subscription_amount: number;
      commission_rate: number;
      total_members: number;
      current_month: number;
    }>(
      `SELECT subscription_amount, commission_rate, total_members, current_month
       FROM chit_groups WHERE id = ? LIMIT 1`,
      input.chitId,
    );
    const month = await this.getById(input.monthId);

    if (!chit || !month) {
      throw new Error('Month or chit not found.');
    }

    const breakdown = dividendService.calculateMonthlyBreakdown({
      chitValue: month.potAmount,
      discountAmount: input.discountAmount,
      commissionRate: chit.commission_rate,
      totalMembers: chit.total_members,
      subscriptionAmount: chit.subscription_amount,
    });

    await nativeDb.runAsync(
      `UPDATE months
       SET status = ?, discount_amount = ?, dividend_amount = ?, foreman_commission = ?, net_prize_amount = ?, winner_chit_member_id = ?, updated_at = ?
       WHERE id = ?`,
      'auction_done',
      input.discountAmount,
      breakdown.dividend,
      breakdown.foremanCommission,
      breakdown.netPrize,
      input.winnerChitMemberId,
      new Date().toISOString(),
      input.monthId,
    );

    await duesRepo.applyMonthInstalment(input.chitId, input.monthId, breakdown.instalment);

    const nextMonth = await nativeDb.getFirstAsync<{ month_number: number; month_date: string }>(
      `SELECT month_number, month_date
       FROM months
       WHERE chit_id = ? AND month_number > ?
       ORDER BY month_number ASC
       LIMIT 1`,
      input.chitId,
      month.monthNumber,
    );

    await nativeDb.runAsync(
      `UPDATE chit_groups
       SET current_month = ?, next_auction_date = ?, updated_at = ?
       WHERE id = ?`,
      nextMonth?.month_number ?? month.monthNumber,
      nextMonth?.month_date ?? month.monthDate,
      new Date().toISOString(),
      input.chitId,
    );

    await createAuditEntry('month', input.monthId, 'AUCTION_CONFIRMED', null, {
      chitId: input.chitId,
      winnerChitMemberId: input.winnerChitMemberId,
      discountAmount: input.discountAmount,
      dividendAmount: breakdown.dividend,
      instalmentAmount: breakdown.instalment,
    });
  },
};
