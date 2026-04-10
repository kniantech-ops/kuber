import { nativeDb } from '@/db';
import { nanoid } from 'nanoid/non-secure';
import { duesRepo } from '@/db/repositories/dues.repo';
import { createAuditEntry } from '@/security/integrity.service';
import type { PaymentRecord } from '@/types/domain';

interface PaymentRow {
  id: string;
  chit_id: string;
  chit_member_id: string;
  amount: number;
  date: string;
  payment_mode: PaymentRecord['mode'];
  reference: string | null;
  receipt_number: string | null;
  member_name: string | null;
  chit_name: string | null;
  member_phone: string | null;
  instalment_balance: number | null;
  instalment_status: PaymentRecord['status'] | null;
}

export const paymentsRepo = {
  async list(): Promise<PaymentRecord[]> {
    const rows = await nativeDb.getAllAsync<PaymentRow>(
      `SELECT
         p.id,
         p.chit_id,
         p.chit_member_id,
         p.amount,
         p.date,
         p.payment_mode,
         p.reference,
         p.receipt_number,
         mem.name AS member_name,
         mem.phone AS member_phone,
         c.name AS chit_name,
         i.balance AS instalment_balance,
         i.status AS instalment_status
       FROM payments p
       LEFT JOIN chit_members cm ON cm.id = p.chit_member_id
       LEFT JOIN members mem ON mem.id = cm.member_id
       LEFT JOIN chit_groups c ON c.id = p.chit_id
       LEFT JOIN instalments i ON i.chit_member_id = p.chit_member_id AND i.chit_id = p.chit_id
       WHERE p.is_deleted = 0
       ORDER BY p.date DESC`,
    );
    return rows.map((row) => ({
      id: row.id,
      chitId: row.chit_id,
      memberName: row.member_name || row.reference || 'Member Payment',
      amount: row.amount,
      balance: row.instalment_balance ?? 0,
      mode: row.payment_mode,
      createdAt: row.date,
      status: row.instalment_status ?? 'paid',
    }));
  },
  async recent(limit = 5): Promise<PaymentRecord[]> {
    const items = await this.list();
    return items.slice(0, limit);
  },
  async totals(): Promise<{ collected: number; outstanding: number }> {
    const items = await this.list();
    const collected = items.reduce((sum, item) => sum + item.amount, 0);
    const outstanding = items.reduce((sum, item) => sum + item.balance, 0);
    return { collected, outstanding };
  },
  async create(input: {
    memberId: string;
    memberName: string;
    amount: number;
    mode: PaymentRecord['mode'];
    reference: string;
    chitId: string;
  }): Promise<string> {
    const id = nanoid();
    const timestamp = new Date().toISOString();
    const receiptSeed = await nativeDb.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM payments WHERE is_deleted = 0`,
    );
    const receiptNumber = input.reference || `KUB-${String((receiptSeed?.count ?? 0) + 1).padStart(5, '0')}`;
    const due = await duesRepo.getNextPending(input.chitId, input.memberId);

    if (!due) {
      throw new Error('No pending instalment found for this member in the selected chit.');
    }

    await nativeDb.runAsync(
      `INSERT INTO payments (
        id, created_at, updated_at, is_deleted, chit_id, chit_member_id, amount, date, payment_mode, reference, receipt_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id,
      timestamp,
      timestamp,
      0,
      input.chitId,
      due.chitMemberId,
      input.amount,
      timestamp,
      input.mode,
      input.reference,
      receiptNumber,
    );

    await duesRepo.applyPayment(due.instalmentId, input.amount);

    await createAuditEntry('payment', id, 'CREATE', null, {
      memberId: input.memberId,
      chitMemberId: due.chitMemberId,
      memberName: input.memberName,
      chitId: input.chitId,
      amount: input.amount,
      mode: input.mode,
      receiptNumber,
    });

    return id;
  },
  async getReceiptDetails(id: string): Promise<{
    id: string;
    memberName: string;
    memberPhone: string;
    chitName: string;
    amount: number;
    mode: PaymentRecord['mode'];
    createdAt: string;
    receiptNumber: string;
    reference: string;
  } | null> {
    const row = await nativeDb.getFirstAsync<PaymentRow>(
      `SELECT
         p.id,
         p.chit_id,
         p.chit_member_id,
         p.amount,
         p.date,
         p.payment_mode,
         p.reference,
         p.receipt_number,
         mem.name AS member_name,
         mem.phone AS member_phone,
         c.name AS chit_name,
         i.balance AS instalment_balance,
         i.status AS instalment_status
       FROM payments p
       LEFT JOIN chit_members cm ON cm.id = p.chit_member_id
       LEFT JOIN members mem ON mem.id = cm.member_id
       LEFT JOIN chit_groups c ON c.id = p.chit_id
       LEFT JOIN instalments i ON i.chit_member_id = p.chit_member_id AND i.chit_id = p.chit_id
       WHERE p.id = ?
       LIMIT 1`,
      id,
    );

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      memberName: row.member_name || row.reference || 'Member Payment',
      memberPhone: row.member_phone || '',
      chitName: row.chit_name || 'Manual Payment',
      amount: row.amount,
      mode: row.payment_mode,
      createdAt: row.date,
      receiptNumber: row.receipt_number || '',
      reference: row.reference || '',
    };
  },
};
