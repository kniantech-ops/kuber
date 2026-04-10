import '@/i18n/config';
import '@/styles/global.css';
import 'react-native-get-random-values';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { initializeDatabase } from '@/db';
import { bindToDevice } from '@/security/tamper.service';
import { enableScreenProtection } from '@/security/device.service';
import { useLanguageStore } from '@/store/language.store';

export default function RootLayout() {
  const hydrate = useLanguageStore((state) => state.hydrate);

  useEffect(() => {
    void hydrate();
    void initializeDatabase();
    void bindToDevice();
    void enableScreenProtection();
  }, [hydrate]);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modals" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
