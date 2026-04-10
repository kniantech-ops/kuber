import { nativeDb } from '@/db';
import type { InstalmentRecord } from '@/types/domain';

interface DueRow {
  id: string;
  chit_id: string;
  chit_member_id: string;
  due_date: string;
  due_amount: number;
  paid_amount: number;
  balance: number;
  status: InstalmentRecord['status'];
  month_number: number;
  member_name: string;
}

export const duesRepo = {
  async listByChitId(chitId: string): Promise<InstalmentRecord[]> {
    const rows = await nativeDb.getAllAsync<DueRow>(
      `SELECT
         i.id,
         i.chit_id,
         i.chit_member_id,
         i.due_date,
         i.due_amount,
         i.paid_amount,
         i.balance,
         i.status,
         COALESCE(mo.month_number, 1) AS month_number,
         mem.name AS member_name
       FROM instalments i
       LEFT JOIN months mo ON mo.id = i.month_id
       LEFT JOIN chit_members cm ON cm.id = i.chit_member_id
       LEFT JOIN members mem ON mem.id = cm.member_id
       WHERE i.chit_id = ? AND i.is_deleted = 0
       ORDER BY i.due_date ASC`,
      chitId,
    );

    return rows.map((row) => ({
      id: row.id,
      chitId: row.chit_id,
      chitMemberId: row.chit_member_id,
      memberName: row.member_name,
      monthNumber: row.month_number,
      dueDate: row.due_date,
      dueAmount: row.due_amount,
      paidAmount: row.paid_amount,
      balance: row.balance,
      status: row.status,
    }));
  },
  async getNextPending(chitId: string, memberId: string): Promise<{
    instalmentId: string;
    chitMemberId: string;
    balance: number;
  } | null> {
    const row = await nativeDb.getFirstAsync<{
      instalment_id: string;
      chit_member_id: string;
      balance: number;
    }>(
      `SELECT
         i.id AS instalment_id,
         i.chit_member_id,
         i.balance
       FROM instalments i
       JOIN chit_members cm ON cm.id = i.chit_member_id
       WHERE i.chit_id = ? AND cm.member_id = ? AND i.is_deleted = 0 AND i.status IN ('pending', 'partial')
       ORDER BY i.due_date ASC
       LIMIT 1`,
      chitId,
      memberId,
    );

    if (!row) {
      return null;
    }

    return {
      instalmentId: row.instalment_id,
      chitMemberId: row.chit_member_id,
      balance: row.balance,
    };
  },
  async applyPayment(instalmentId: string, amount: number): Promise<void> {
    const current = await nativeDb.getFirstAsync<{ paid_amount: number; due_amount: number }>(
      `SELECT paid_amount, due_amount FROM instalments WHERE id = ? LIMIT 1`,
      instalmentId,
    );

    if (!current) {
      return;
    }

    const paidAmount = current.paid_amount + amount;
    const balance = Math.max(current.due_amount - paidAmount, 0);
    const status = balance === 0 ? 'paid' : 'partial';

    await nativeDb.runAsync(
      `UPDATE instalments
       SET paid_amount = ?, balance = ?, status = ?, updated_at = ?
       WHERE id = ?`,
      paidAmount,
      balance,
      status,
      new Date().toISOString(),
      instalmentId,
    );
  },
  async getChitRollup(chitId: string): Promise<{
    expected: number;
    collected: number;
    outstanding: number;
    defaultersCount: number;
    collectionPercent: number;
  }> {
    const row = await nativeDb.getFirstAsync<{
      expected: number | null;
      collected: number | null;
      outstanding: number | null;
      defaulters_count: number | null;
    }>(
      `SELECT
         COALESCE(SUM(due_amount), 0) AS expected,
         COALESCE(SUM(paid_amount), 0) AS collected,
         COALESCE(SUM(balance), 0) AS outstanding,
         COALESCE(SUM(CASE WHEN status IN ('pending', 'partial', 'defaulted') AND balance > 0 THEN 1 ELSE 0 END), 0) AS defaulters_count
       FROM instalments
       WHERE chit_id = ? AND is_deleted = 0`,
      chitId,
    );

    const expected = row?.expected ?? 0;
    const collected = row?.collected ?? 0;
    const outstanding = row?.outstanding ?? 0;
    const defaultersCount = row?.defaulters_count ?? 0;
    const collectionPercent = expected === 0 ? 0 : Math.round((collected / expected) * 100);

    return { expected, collected, outstanding, defaultersCount, collectionPercent };
  },
  async getPortfolioRollup(): Promise<{
    expected: number;
    collected: number;
    outstanding: number;
    defaultersCount: number;
  }> {
    const row = await nativeDb.getFirstAsync<{
      expected: number | null;
      collected: number | null;
      outstanding: number | null;
      defaulters_count: number | null;
    }>(
      `SELECT
         COALESCE(SUM(due_amount), 0) AS expected,
         COALESCE(SUM(paid_amount), 0) AS collected,
         COALESCE(SUM(balance), 0) AS outstanding,
         COALESCE(SUM(CASE WHEN status IN ('pending', 'partial', 'defaulted') AND balance > 0 THEN 1 ELSE 0 END), 0) AS defaulters_count
       FROM instalments
       WHERE is_deleted = 0`,
    );

    return {
      expected: row?.expected ?? 0,
      collected: row?.collected ?? 0,
      outstanding: row?.outstanding ?? 0,
      defaultersCount: row?.defaulters_count ?? 0,
    };
  },
};
