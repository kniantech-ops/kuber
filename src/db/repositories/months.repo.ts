import { nativeDb } from '@/db';

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
};
