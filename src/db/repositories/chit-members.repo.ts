import { nativeDb } from '@/db';
import { nanoid } from 'nanoid/non-secure';
import { createAuditEntry } from '@/security/integrity.service';
import type { ChitMemberAssignment } from '@/types/domain';

interface AssignmentRow {
  id: string;
  chit_id: string;
  member_id: string;
  ticket_number: string;
  status: ChitMemberAssignment['status'];
  member_name: string;
}

export const chitMembersRepo = {
  async listByChitId(chitId: string): Promise<ChitMemberAssignment[]> {
    const rows = await nativeDb.getAllAsync<AssignmentRow>(
      `SELECT
         cm.id,
         cm.chit_id,
         cm.member_id,
         cm.ticket_number,
         cm.status,
         m.name AS member_name
       FROM chit_members cm
       JOIN members m ON m.id = cm.member_id
       WHERE cm.chit_id = ? AND cm.is_deleted = 0
       ORDER BY cm.ticket_number ASC`,
      chitId,
    );

    return rows.map((row) => ({
      id: row.id,
      chitId: row.chit_id,
      memberId: row.member_id,
      memberName: row.member_name,
      ticketNumber: row.ticket_number,
      status: row.status,
    }));
  },
  async assignMember(chitId: string, memberId: string): Promise<string> {
    const existingCount = await nativeDb.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM chit_members WHERE chit_id = ? AND is_deleted = 0`,
      chitId,
    );
    const duplicate = await nativeDb.getFirstAsync<{ id: string }>(
      `SELECT id FROM chit_members WHERE chit_id = ? AND member_id = ? AND is_deleted = 0 LIMIT 1`,
      chitId,
      memberId,
    );

    if (duplicate) {
      return duplicate.id;
    }

    const chit = await nativeDb.getFirstAsync<{ subscription_amount: number }>(
      `SELECT subscription_amount FROM chit_groups WHERE id = ? LIMIT 1`,
      chitId,
    );
    const months = await nativeDb.getAllAsync<{ id: string; month_date: string }>(
      `SELECT id, month_date FROM months WHERE chit_id = ? AND is_deleted = 0 ORDER BY month_number ASC`,
      chitId,
    );

    if (!chit) {
      throw new Error('Chit not found.');
    }

    const id = nanoid();
    const timestamp = new Date().toISOString();
    const ticketNumber = `T${String((existingCount?.count ?? 0) + 1).padStart(2, '0')}`;

    await nativeDb.runAsync(
      `INSERT INTO chit_members (
        id, created_at, updated_at, is_deleted, chit_id, member_id, ticket_number, join_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id,
      timestamp,
      timestamp,
      0,
      chitId,
      memberId,
      ticketNumber,
      timestamp,
      'active',
    );

    for (const month of months) {
      await nativeDb.runAsync(
        `INSERT INTO instalments (
          id, created_at, updated_at, is_deleted, chit_id, chit_member_id, month_id, due_date, due_amount, paid_amount, balance, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        nanoid(),
        timestamp,
        timestamp,
        0,
        chitId,
        id,
        month.id,
        month.month_date,
        chit.subscription_amount,
        0,
        chit.subscription_amount,
        'pending',
      );
    }

    await createAuditEntry('chit_member', id, 'ASSIGN', null, {
      chitId,
      memberId,
      ticketNumber,
    });

    return id;
  },
};
