import * as Device from 'expo-device';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { deriveKeyFromPIN } from '@/security/crypto.service';

const DEVICE_BINDING_KEY = 'kuber_device_binding';

const generateDeviceFingerprint = async (): Promise<string> => {
  const raw = [
    Device.modelId ?? '',
    Device.modelName ?? '',
    Device.osVersion ?? '',
    Device.totalMemory?.toString() ?? '',
    Constants.expoConfig?.version ?? '',
    'kuber_v3_binding',
  ].join('|');
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, raw);
};

export const bindToDevice = async (): Promise<void> => {
  const existing = await SecureStore.getItemAsync(DEVICE_BINDING_KEY);
  if (existing) {
    return;
  }
  const fingerprint = await generateDeviceFingerprint();
  await SecureStore.setItemAsync(DEVICE_BINDING_KEY, fingerprint, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

export const verifyDeviceBinding = async (): Promise<{ valid: boolean; reason?: string }> => {
  const stored = await SecureStore.getItemAsync(DEVICE_BINDING_KEY);
  if (!stored) {
    await bindToDevice();
    return { valid: true };
  }
  const current = await generateDeviceFingerprint();
  return stored === current ? { valid: true } : { valid: false, reason: 'DEVICE_MISMATCH' };
};

export const isEmulator = (): boolean => !Device.isDevice;

export const isDeviceRooted = async (): Promise<boolean> => {
  if (!Device.isDevice) {
    return true;
  }
  return [Device.modelName?.toLowerCase().includes('generic'), Device.modelName?.toLowerCase().includes('sdk')].some(Boolean);
};

export const generateMigrationToken = async (pin: string): Promise<string> => {
  const key = await deriveKeyFromPIN(pin);
  const timestamp = Date.now();
  const raw = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${key}_${timestamp}_migration_token`,
  );
  await SecureStore.setItemAsync(
    'migration_token',
    JSON.stringify({ token: raw, expiry: timestamp + 30 * 60 * 1000 }),
  );
  return raw.slice(0, 8).toUpperCase();
};
