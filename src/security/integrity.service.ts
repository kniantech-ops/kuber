import * as Crypto from 'expo-crypto';
import { nativeDb } from '@/db';
import { nanoid } from 'nanoid/non-secure';

interface AuditEntry {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  old_value_json: string | null;
  new_value_json: string | null;
  timestamp: string;
  prev_hash: string;
  entry_hash: string;
}

export const createAuditEntry = async (
  entityType: string,
  entityId: string,
  action: string,
  oldValue: object | null,
  newValue: object | null,
): Promise<void> => {
  const previous = await nativeDb.getFirstAsync<AuditEntry>(
    `SELECT id, entity_type, entity_id, action, old_value_json, new_value_json, timestamp, prev_hash, entry_hash
     FROM audit_log WHERE is_deleted = 0 ORDER BY created_at DESC LIMIT 1`,
  );
  const prevHash = previous ? previous.entry_hash : 'GENESIS';
  const timestamp = new Date().toISOString();
  const payload = JSON.stringify({ entityType, entityId, action, oldValue, newValue, timestamp, prevHash });
  const entryHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, payload);
  const id = nanoid();

  await nativeDb.runAsync(
    `INSERT INTO audit_log (
      id, created_at, updated_at, is_deleted, entity_type, entity_id, action,
      old_value_json, new_value_json, timestamp, prev_hash, entry_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    timestamp,
    timestamp,
    0,
    entityType,
    entityId,
    action,
    oldValue ? JSON.stringify(oldValue) : null,
    newValue ? JSON.stringify(newValue) : null,
    timestamp,
    prevHash,
    entryHash,
  );
};

export const verifyAuditChain = async (): Promise<{ valid: boolean; brokenAt?: string }> => {
  const auditEntries = await nativeDb.getAllAsync<AuditEntry>(
    `SELECT id, entity_type, entity_id, action, old_value_json, new_value_json, timestamp, prev_hash, entry_hash
     FROM audit_log WHERE is_deleted = 0 ORDER BY created_at ASC`,
  );
  let prevHash = 'GENESIS';
  for (const entry of auditEntries) {
    const payload = JSON.stringify({
      entityType: entry.entity_type,
      entityId: entry.entity_id,
      action: entry.action,
      oldValue: entry.old_value_json ? JSON.parse(entry.old_value_json) : null,
      newValue: entry.new_value_json ? JSON.parse(entry.new_value_json) : null,
      timestamp: entry.timestamp,
      prevHash,
    });
    const computed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, payload);
    if (computed !== entry.entry_hash) {
      return { valid: false, brokenAt: entry.id };
    }
    prevHash = entry.entry_hash;
  }
  return { valid: true };
};
