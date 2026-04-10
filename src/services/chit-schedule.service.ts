import { nanoid } from 'nanoid/non-secure';
import { nativeDb } from '@/db';

const addMonths = (date: Date, months: number): Date => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
};

export const chitScheduleService = {
  async createMonthlySchedule(input: {
    chitId: string;
    startDate: string;
    totalMonths: number;
    chitValue: number;
  }): Promise<void> {
    const createdAt = new Date().toISOString();
    const start = new Date(input.startDate);

    for (let index = 0; index < input.totalMonths; index += 1) {
      const monthDate = addMonths(start, index).toISOString();
      await nativeDb.runAsync(
        `INSERT INTO months (
          id, created_at, updated_at, is_deleted, chit_id, month_number, month_date, status,
          pot_amount, discount_amount, dividend_amount, foreman_commission, net_prize_amount, winner_chit_member_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        nanoid(),
        createdAt,
        createdAt,
        0,
        input.chitId,
        index + 1,
        monthDate,
        index === 0 ? 'pending' : 'pending',
        input.chitValue,
        0,
        0,
        0,
        input.chitValue,
        null,
      );
    }
  },
};
