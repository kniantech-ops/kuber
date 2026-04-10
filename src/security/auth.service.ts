import * as Crypto from 'expo-crypto';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Buffer } from 'buffer';
import { deriveKeyFromPIN, FIELD_KEY_KEY, hashPIN, storeDBKey, verifyPIN } from '@/security/crypto.service';

const MAX_ATTEMPTS = 5;
const LOCKOUTS = [30, 60, 300, 900, 3600];
const PIN_HASH_KEY = 'kuber_v3_pin_hash';
const ATTEMPTS_KEY = 'kuber_v3_attempts';
const LOCKOUT_KEY = 'kuber_v3_lockout';
const LOCKOUT_COUNT_KEY = 'kuber_v3_lockout_count';
const BIOMETRIC_KEY = 'kuber_v3_biometric';

export const setupPIN = async (pin: string): Promise<void> => {
  const hash = await hashPIN(pin);
  const dbKey = await deriveKeyFromPIN(pin);
  const fieldKeyBytes = await Crypto.getRandomBytesAsync(32);
  const fieldKey = Buffer.from(fieldKeyBytes).toString('hex');

  await SecureStore.setItemAsync(PIN_HASH_KEY, hash, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
  await storeDBKey(dbKey);
  await SecureStore.setItemAsync(FIELD_KEY_KEY, fieldKey, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
  await Promise.all([
    SecureStore.deleteItemAsync(ATTEMPTS_KEY),
    SecureStore.deleteItemAsync(LOCKOUT_KEY),
    SecureStore.deleteItemAsync(LOCKOUT_COUNT_KEY),
  ]);
};

export const verifyPINAttempt = async (
  pin: string,
): Promise<{ success: boolean; locked: boolean; lockoutSeconds?: number; attemptsRemaining?: number }> => {
  const lockoutUntil = await SecureStore.getItemAsync(LOCKOUT_KEY);
  if (lockoutUntil) {
    const remaining = Number.parseInt(lockoutUntil, 10) - Date.now();
    if (remaining > 0) {
      return { success: false, locked: true, lockoutSeconds: Math.ceil(remaining / 1000) };
    }
  }

  const storedHash = await SecureStore.getItemAsync(PIN_HASH_KEY);
  if (!storedHash) {
    return { success: false, locked: false };
  }

  const correct = await verifyPIN(pin, storedHash);
  if (correct) {
    await Promise.all([
      SecureStore.deleteItemAsync(ATTEMPTS_KEY),
      SecureStore.deleteItemAsync(LOCKOUT_KEY),
    ]);
    return { success: true, locked: false };
  }

  const attempts = Number.parseInt((await SecureStore.getItemAsync(ATTEMPTS_KEY)) ?? '0', 10) + 1;
  await SecureStore.setItemAsync(ATTEMPTS_KEY, attempts.toString());

  if (attempts >= MAX_ATTEMPTS) {
    const lockoutCount = Number.parseInt((await SecureStore.getItemAsync(LOCKOUT_COUNT_KEY)) ?? '0', 10);
    const duration = LOCKOUTS[Math.min(lockoutCount, LOCKOUTS.length - 1)];
    await Promise.all([
      SecureStore.setItemAsync(LOCKOUT_KEY, (Date.now() + duration * 1000).toString()),
      SecureStore.setItemAsync(LOCKOUT_COUNT_KEY, (lockoutCount + 1).toString()),
      SecureStore.setItemAsync(ATTEMPTS_KEY, '0'),
    ]);
    return { success: false, locked: true, lockoutSeconds: duration };
  }

  return { success: false, locked: false, attemptsRemaining: MAX_ATTEMPTS - attempts };
};

export const isBiometricAvailable = async (): Promise<boolean> => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
};

export const setBiometricEnabled = async (enabled: boolean): Promise<void> => {
  await SecureStore.setItemAsync(BIOMETRIC_KEY, enabled ? 'true' : 'false');
};
