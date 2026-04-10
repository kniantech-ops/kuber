import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';
import { nanoid } from 'nanoid/non-secure';
import { mockChits, mockMembers, mockPayments } from '@/data/mock';

const sqlite = openDatabaseSync('kuber.db');

export const db = drizzle(sqlite);
export const nativeDb = sqlite;

const now = () => new Date().toISOString();

const tableCount = async (database: SQLiteDatabase, table: string): Promise<number> => {
  const result = await database.getFirstAsync<{ count: number }>(`SELECT COUNT(*) as count FROM ${table}`);
  return result?.count ?? 0;
};

const seedChits = async (database: SQLiteDatabase): Promise<void> => {
  for (const chit of mockChits) {
    await database.runAsync(
      `INSERT INTO chit_groups (
        id, created_at, updated_at, is_deleted, name, chit_value, subscription_amount,
        total_members, duration_months, commission_rate, type, status, current_month, next_auction_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      chit.id,
      now(),
      now(),
      0,
      chit.name,
      chit.chitValue,
      chit.subscriptionAmount,
      chit.totalMembers,
      chit.durationMonths,
      chit.commissionRate,
      chit.type,
      chit.status,
      chit.currentMonth,
      chit.nextAuctionDate,
    );
  }
};

const seedMonths = async (database: SQLiteDatabase): Promise<void> => {
  const chits = await database.getAllAsync<{
    id: string;
    chit_value: number;
    duration_months: number;
    created_at: string;
  }>(
    `SELECT id, chit_value, duration_months, created_at
     FROM chit_groups WHERE is_deleted = 0`,
  );

  for (const chit of chits) {
    const base = new Date(chit.created_at);
    for (let index = 0; index < chit.duration_months; index += 1) {
      const monthDate = new Date(base);
      monthDate.setMonth(base.getMonth() + index);
      await database.runAsync(
        `INSERT INTO months (
          id, created_at, updated_at, is_deleted, chit_id, month_number, month_date, status,
          pot_amount, discount_amount, dividend_amount, foreman_commission, net_prize_amount, winner_chit_member_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        `${chit.id}-month-${index + 1}`,
        now(),
        now(),
        0,
        chit.id,
        index + 1,
        monthDate.toISOString(),
        'pending',
        chit.chit_value,
        0,
        0,
        0,
        chit.chit_value,
        null,
      );
    }
  }
};

const seedMembers = async (database: SQLiteDatabase): Promise<void> => {
  for (const member of mockMembers) {
    await database.runAsync(
      `INSERT INTO members (
        id, created_at, updated_at, is_deleted, name, phone, city, state, nominee_name, id_proof_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      member.id,
      now(),
      now(),
      0,
      member.name,
      member.phone,
      member.city,
      '',
      '',
      '',
    );
  }
};

const seedPayments = async (database: SQLiteDatabase): Promise<void> => {
  for (const payment of mockPayments) {
    await database.runAsync(
      `INSERT INTO payments (
        id, created_at, updated_at, is_deleted, chit_id, chit_member_id, amount, date, payment_mode, reference, receipt_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      payment.id,
      now(),
      now(),
      0,
      payment.chitId,
      nanoid(),
      payment.amount,
      payment.createdAt,
      payment.mode,
      '',
      `RCPT-${payment.id.toUpperCase()}`,
    );
  }
};

const seedChitMembers = async (database: SQLiteDatabase): Promise<void> => {
  const assignments = [
    ['cm-1', 'chit-1', 'm1', 'A01'],
    ['cm-2', 'chit-1', 'm2', 'A02'],
    ['cm-3', 'chit-1', 'm3', 'A03'],
    ['cm-4', 'chit-2', 'm1', 'B01'],
    ['cm-5', 'chit-2', 'm2', 'B02'],
  ] as const;

  for (const [id, chitId, memberId, ticketNumber] of assignments) {
    await database.runAsync(
      `INSERT INTO chit_members (
        id, created_at, updated_at, is_deleted, chit_id, member_id, ticket_number, join_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id,
      now(),
      now(),
      0,
      chitId,
      memberId,
      ticketNumber,
      now(),
      'active',
    );
  }
};

const seedInstalments = async (database: SQLiteDatabase): Promise<void> => {
  const rows = await database.getAllAsync<{
    id: string;
    chit_id: string;
    member_id: string;
    subscription_amount: number;
    month_id: string;
    month_date: string;
    month_number: number;
  }>(
    `SELECT
       cm.id,
       cm.chit_id,
       cm.member_id,
       cg.subscription_amount,
       mo.id as month_id,
       mo.month_date,
       mo.month_number
     FROM chit_members cm
     JOIN chit_groups cg ON cg.id = cm.chit_id
     JOIN months mo ON mo.chit_id = cm.chit_id
     WHERE cm.is_deleted = 0`,
  );

  for (const row of rows) {
    await database.runAsync(
      `INSERT INTO instalments (
        id, created_at, updated_at, is_deleted, chit_id, chit_member_id, month_id, due_date, due_amount, paid_amount, balance, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      nanoid(),
      now(),
      now(),
      0,
      row.chit_id,
      row.id,
      row.month_id,
      row.month_date,
      row.subscription_amount,
      0,
      row.subscription_amount,
      'pending',
    );
  }
};

export const initializeDatabase = async (): Promise<void> => {
  sqlite.execSync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS chit_groups (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      chit_value INTEGER NOT NULL,
      subscription_amount INTEGER NOT NULL,
      total_members INTEGER NOT NULL,
      duration_months INTEGER NOT NULL,
      commission_rate INTEGER NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      current_month INTEGER NOT NULL DEFAULT 1,
      next_auction_date TEXT
    );

    CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT,
      state TEXT,
      nominee_name TEXT,
      id_proof_number TEXT
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      chit_id TEXT NOT NULL,
      chit_member_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      date TEXT NOT NULL,
      payment_mode TEXT NOT NULL,
      reference TEXT,
      receipt_number TEXT
    );

    CREATE TABLE IF NOT EXISTS months (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      chit_id TEXT NOT NULL,
      month_number INTEGER NOT NULL,
      month_date TEXT NOT NULL,
      status TEXT NOT NULL,
      pot_amount INTEGER NOT NULL,
      discount_amount INTEGER NOT NULL DEFAULT 0,
      dividend_amount INTEGER NOT NULL DEFAULT 0,
      foreman_commission INTEGER NOT NULL DEFAULT 0,
      net_prize_amount INTEGER NOT NULL DEFAULT 0,
      winner_chit_member_id TEXT
    );

    CREATE TABLE IF NOT EXISTS chit_members (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      chit_id TEXT NOT NULL,
      member_id TEXT NOT NULL,
      ticket_number TEXT NOT NULL,
      join_date TEXT NOT NULL,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS instalments (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      chit_id TEXT NOT NULL,
      chit_member_id TEXT NOT NULL,
      month_id TEXT NOT NULL,
      due_date TEXT NOT NULL,
      due_amount INTEGER NOT NULL,
      paid_amount INTEGER NOT NULL DEFAULT 0,
      balance INTEGER NOT NULL,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      key TEXT NOT NULL,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS audit_log (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      action TEXT NOT NULL,
      old_value_json TEXT,
      new_value_json TEXT,
      timestamp TEXT NOT NULL,
      prev_hash TEXT NOT NULL,
      entry_hash TEXT NOT NULL
    );
  `);

  if ((await tableCount(sqlite, 'chit_groups')) === 0) {
    await seedChits(sqlite);
  }

  if ((await tableCount(sqlite, 'members')) === 0) {
    await seedMembers(sqlite);
  }

  if ((await tableCount(sqlite, 'months')) === 0) {
    await seedMonths(sqlite);
  }

  if ((await tableCount(sqlite, 'chit_members')) === 0) {
    await seedChitMembers(sqlite);
  }

  if ((await tableCount(sqlite, 'instalments')) === 0) {
    await seedInstalments(sqlite);
  }

  if ((await tableCount(sqlite, 'payments')) === 0) {
    await seedPayments(sqlite);
  }
};
