import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const base = {
  id: text('id').primaryKey(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).notNull().default(false),
};

export const chitGroups = sqliteTable('chit_groups', {
  ...base,
  name: text('name').notNull(),
  chitValue: integer('chit_value').notNull(),
  subscriptionAmount: integer('subscription_amount').notNull(),
  totalMembers: integer('total_members').notNull(),
  durationMonths: integer('duration_months').notNull(),
  commissionRate: integer('commission_rate').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  currentMonth: integer('current_month').notNull().default(1),
  nextAuctionDate: text('next_auction_date'),
});

export const members = sqliteTable('members', {
  ...base,
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  city: text('city'),
  state: text('state'),
  nomineeName: text('nominee_name'),
  idProofNumber: text('id_proof_number'),
});

export const payments = sqliteTable('payments', {
  ...base,
  chitId: text('chit_id').notNull(),
  chitMemberId: text('chit_member_id').notNull(),
  amount: integer('amount').notNull(),
  date: text('date').notNull(),
  paymentMode: text('payment_mode').notNull(),
  reference: text('reference'),
  receiptNumber: text('receipt_number'),
});

export const months = sqliteTable('months', {
  ...base,
  chitId: text('chit_id').notNull(),
  monthNumber: integer('month_number').notNull(),
  monthDate: text('month_date').notNull(),
  status: text('status').notNull(),
  potAmount: integer('pot_amount').notNull(),
  discountAmount: integer('discount_amount').notNull().default(0),
  dividendAmount: integer('dividend_amount').notNull().default(0),
  foremanCommission: integer('foreman_commission').notNull().default(0),
  netPrizeAmount: integer('net_prize_amount').notNull().default(0),
  winnerChitMemberId: text('winner_chit_member_id'),
});

export const chitMembers = sqliteTable('chit_members', {
  ...base,
  chitId: text('chit_id').notNull(),
  memberId: text('member_id').notNull(),
  ticketNumber: text('ticket_number').notNull(),
  joinDate: text('join_date').notNull(),
  status: text('status').notNull(),
});

export const instalments = sqliteTable('instalments', {
  ...base,
  chitId: text('chit_id').notNull(),
  chitMemberId: text('chit_member_id').notNull(),
  monthId: text('month_id').notNull(),
  dueDate: text('due_date').notNull(),
  dueAmount: integer('due_amount').notNull(),
  paidAmount: integer('paid_amount').notNull().default(0),
  balance: integer('balance').notNull(),
  status: text('status').notNull(),
});

export const appSettings = sqliteTable('app_settings', {
  ...base,
  key: text('key').notNull(),
  value: text('value'),
});

export const auditLog = sqliteTable('audit_log', {
  ...base,
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  action: text('action').notNull(),
  oldValueJson: text('old_value_json'),
  newValueJson: text('new_value_json'),
  timestamp: text('timestamp').notNull(),
  prevHash: text('prev_hash').notNull(),
  entryHash: text('entry_hash').notNull(),
});
