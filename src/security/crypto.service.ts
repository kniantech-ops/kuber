import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import * as QuickCrypto from 'react-native-quick-crypto';
import { Buffer } from 'buffer';

const PBKDF2_ITERATIONS = 100_000;
const KEY_LENGTH = 32;
const SALT_KEY = 'kuber_v3_salt';
const DB_KEY_KEY = 'kuber_v3_db_key';
export const FIELD_KEY_KEY = 'kuber_v3_field_key';

export const getOrCreateSalt = async (): Promise<string> => {
  const existing = await SecureStore.getItemAsync(SALT_KEY);
  if (existing) {
    return existing;
  }
  const random = await Crypto.getRandomBytesAsync(32);
  const salt = Buffer.from(random).toString('hex');
  await SecureStore.setItemAsync(SALT_KEY, salt, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
  return salt;
};

export const deriveKeyFromPIN = async (pin: string): Promise<string> => {
  const salt = await getOrCreateSalt();
  const deviceId = Device.modelId ?? Device.deviceName ?? 'kuber_device';
  const input = `${pin}:${deviceId}:${salt}:kuber_v3`;
  const key = QuickCrypto.pbkdf2Sync(input, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256');
  return key.toString('hex');
};

export const hashPIN = async (pin: string): Promise<string> => {
  const salt = await getOrCreateSalt();
  const deviceId = Device.modelId ?? 'unknown';
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${pin}:${salt}:${deviceId}:kuber_pin_v3`,
  );
};

export const verifyPIN = async (pin: string, stored: string): Promise<boolean> => {
  const computed = await hashPIN(pin);
  return computed === stored;
};

export const storeDBKey = async (key: string): Promise<void> => {
  await SecureStore.setItemAsync(DB_KEY_KEY, key, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

export const getDBKey = async (): Promise<string | null> => SecureStore.getItemAsync(DB_KEY_KEY);

export const encryptField = async (value: string): Promise<string> => {
  const key = await SecureStore.getItemAsync(FIELD_KEY_KEY);
  if (!key) {
    throw new Error('Field encryption key not found');
  }
  const iv = await Crypto.getRandomBytesAsync(16);
  const ivHex = Buffer.from(iv).toString('hex');
  const cipher = QuickCrypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(ivHex, 'hex'));
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${ivHex}:${encrypted}`;
};

export const decryptField = async (encrypted: string): Promise<string> => {
  const key = await SecureStore.getItemAsync(FIELD_KEY_KEY);
  if (!key) {
    throw new Error('Field encryption key not found');
  }
  const [ivHex, payload] = encrypted.split(':');
  const decipher = QuickCrypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key, 'hex'),
    Buffer.from(ivHex, 'hex'),
  );
  let decrypted = decipher.update(payload, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const encryptBackup = async (
  data: string,
  pin: string,
): Promise<{ encrypted: string; iv: string; checksum: string }> => {
  const key = await deriveKeyFromPIN(pin);
  const iv = await Crypto.getRandomBytesAsync(12);
  const ivHex = Buffer.from(iv).toString('hex');
  const cipher = QuickCrypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(ivHex, 'hex'));
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const checksum = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data);
  return { encrypted, iv: ivHex, checksum };
};

export const decryptBackup = async (
  encrypted: string,
  iv: string,
  checksum: string,
  pin: string,
): Promise<string> => {
  const key = await deriveKeyFromPIN(pin);
  const decipher = QuickCrypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  const computed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, decrypted);
  if (computed !== checksum) {
    throw new Error('INTEGRITY_FAILED');
  }
  return decrypted;
};
