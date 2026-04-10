import { nativeDb } from '@/db';
import { nanoid } from 'nanoid/non-secure';
import { createAuditEntry } from '@/security/integrity.service';
import type { Member } from '@/types/domain';

interface MemberRow {
  id: string;
  name: string;
  phone: string;
  city: string | null;
}

export const membersRepo = {
  async list(): Promise<Member[]> {
    const rows = await nativeDb.getAllAsync<MemberRow>(
      `SELECT id, name, phone, city FROM members WHERE is_deleted = 0 ORDER BY created_at DESC`,
    );
    return rows.map((row, index) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      city: row.city ?? '',
      status: 'active',
      ticketNumber: `T${String(index + 1).padStart(2, '0')}`,
    }));
  },
  async getById(id: string): Promise<Member | undefined> {
    const items = await this.list();
    return items.find((item) => item.id === id);
  },
  async getActiveCount(): Promise<number> {
    const items = await this.list();
    return items.filter((item) => item.status === 'active').length;
  },
  async create(input: {
    name: string;
    phone: string;
    city: string;
    idProofNumber: string;
  }): Promise<string> {
    const id = nanoid();
    const timestamp = new Date().toISOString();
    await nativeDb.runAsync(
      `INSERT INTO members (
        id, created_at, updated_at, is_deleted, name, phone, city, state, nominee_name, id_proof_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id,
      timestamp,
      timestamp,
      0,
      input.name,
      input.phone,
      input.city,
      '',
      '',
      input.idProofNumber,
    );

    await createAuditEntry('member', id, 'CREATE', null, {
      name: input.name,
      phone: input.phone,
      city: input.city,
    });

    return id;
  },
};
