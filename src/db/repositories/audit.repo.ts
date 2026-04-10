import { nativeDb } from '@/db';
import { verifyAuditChain } from '@/security/integrity.service';

interface AuditRow {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  timestamp: string;
  entry_hash: string;
}

export const auditRepo = {
  async verify() {
    return verifyAuditChain();
  },
  async recent(limit = 10): Promise<
    Array<{
      id: string;
      entityType: string;
      entityId: string;
      action: string;
      timestamp: string;
      hash: string;
    }>
  > {
    const rows = await nativeDb.getAllAsync<AuditRow>(
      `SELECT id, entity_type, entity_id, action, timestamp, entry_hash
       FROM audit_log WHERE is_deleted = 0 ORDER BY created_at DESC LIMIT ?`,
      limit,
    );

    return rows.map((row) => ({
      id: row.id,
      entityType: row.entity_type,
      entityId: row.entity_id,
      action: row.action,
      timestamp: row.timestamp,
      hash: row.entry_hash,
    }));
  },
};
