import { nativeDb } from '@/db';
import { duesRepo } from '@/db/repositories/dues.repo';
import { nanoid } from 'nanoid/non-secure';
import { createAuditEntry } from '@/security/integrity.service';
import { chitScheduleService } from '@/services/chit-schedule.service';
import type { ChitGroup } from '@/types/domain';

interface ChitRow {
  id: string;
  name: string;
  chit_value: number;
  subscription_amount: number;
  total_members: number;
  duration_months: number;
  commission_rate: number;
  type: ChitGroup['type'];
  status: ChitGroup['status'];
  current_month: number;
  next_auction_date: string | null;
}

const toChit = (row: ChitRow): ChitGroup => ({
  id: row.id,
  name: row.name,
  chitValue: row.chit_value,
  subscriptionAmount: row.subscription_amount,
  totalMembers: row.total_members,
  durationMonths: row.duration_months,
  commissionRate: row.commission_rate,
  type: row.type,
  status: row.status,
  currentMonth: row.current_month,
  nextAuctionDate: row.next_auction_date ?? new Date().toISOString(),
  collectionPercent: 0,
  defaultersCount: 0,
});

export const chitsRepo = {
  async list(): Promise<ChitGroup[]> {
    const rows = await nativeDb.getAllAsync<ChitRow>(
      `SELECT id, name, chit_value, subscription_amount, total_members, duration_months, commission_rate, type, status, current_month, next_auction_date
       FROM chit_groups WHERE is_deleted = 0 ORDER BY created_at DESC`,
    );
    return Promise.all(
      rows.map(async (row) => {
        const chit = toChit(row);
        const rollup = await duesRepo.getChitRollup(chit.id);
        return {
          ...chit,
          collectionPercent: rollup.collectionPercent,
          defaultersCount: rollup.defaultersCount,
        };
      }),
    );
  },
  async getById(id: string): Promise<ChitGroup | undefined> {
    const row = await nativeDb.getFirstAsync<ChitRow>(
      `SELECT id, name, chit_value, subscription_amount, total_members, duration_months, commission_rate, type, status, current_month, next_auction_date
       FROM chit_groups WHERE id = ? LIMIT 1`,
      id,
    );
    return row ? toChit(row) : undefined;
  },
  async getSummary(): Promise<{
    count: number;
    totalPot: number;
    expected: number;
  }> {
    const rows = await this.list();
    const count = rows.length;
    const totalPot = rows.reduce((sum, item) => sum + item.chitValue, 0);
    const expected = rows.reduce((sum, item) => sum + item.subscriptionAmount * item.totalMembers, 0);
    return { count, totalPot, expected };
  },
  async create(input: {
    name: string;
    chitValue: number;
    subscriptionAmount: number;
    totalMembers: number;
  }): Promise<string> {
    const id = nanoid();
    const timestamp = new Date().toISOString();
    await nativeDb.runAsync(
      `INSERT INTO chit_groups (
        id, created_at, updated_at, is_deleted, name, chit_value, subscription_amount,
        total_members, duration_months, commission_rate, type, status, current_month, next_auction_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id,
      timestamp,
      timestamp,
      0,
      input.name,
      input.chitValue,
      input.subscriptionAmount,
      input.totalMembers,
      input.totalMembers,
      5,
      'auction',
      'draft',
      1,
      timestamp,
    );

    await chitScheduleService.createMonthlySchedule({
      chitId: id,
      startDate: timestamp,
      totalMonths: input.totalMembers,
      chitValue: input.chitValue,
    });

    await createAuditEntry('chit_group', id, 'CREATE', null, {
      name: input.name,
      chitValue: input.chitValue,
      subscriptionAmount: input.subscriptionAmount,
      totalMembers: input.totalMembers,
    });

    return id;
  },
};
