import * as ScreenCapture from 'expo-screen-capture';
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';
import { isDeviceRooted } from '@/security/tamper.service';

const PIN_HASH_KEY = 'kuber_v3_pin_hash';
const BIOMETRIC_KEY = 'kuber_v3_biometric';

export const enableScreenProtection = async (): Promise<void> => {
  await ScreenCapture.preventScreenCaptureAsync();
};

export const setupBackgroundBlur = (showBlur: () => void, hideBlur: () => void) => {
  let backgrounded = false;
  return AppState.addEventListener('change', (state) => {
    if (state === 'background' || state === 'inactive') {
      backgrounded = true;
      showBlur();
    } else if (state === 'active' && backgrounded) {
      backgrounded = false;
      hideBlur();
    }
  });
};

export const calculateSecurityScore = async (): Promise<{
  score: number;
  items: Array<{ label: string; enabled: boolean; points: number }>;
}> => {
  const hasPIN = Boolean(await SecureStore.getItemAsync(PIN_HASH_KEY));
  const hasBiometric = (await SecureStore.getItemAsync(BIOMETRIC_KEY)) === 'true';
  const rooted = await isDeviceRooted();
  const items = [
    { label: 'PIN Protected (PBKDF2)', enabled: hasPIN, points: 25 },
    { label: 'Biometric Unlock', enabled: hasBiometric, points: 15 },
    { label: 'Backup Encrypted', enabled: false, points: 20 },
    { label: 'Screenshot Blocked', enabled: true, points: 20 },
    { label: 'Device Secure', enabled: !rooted, points: 20 },
  ];
  return {
    score: items.reduce((sum, item) => sum + (item.enabled ? item.points : 0), 0),
    items,
  };
};
