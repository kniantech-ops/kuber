import { router } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { isBiometricAvailable, setBiometricEnabled } from '@/security/auth.service';
import { colors } from '@/theme/colors';

export default function BiometricScreen() {
  const finish = async (enabled: boolean) => {
    if (enabled && !(await isBiometricAvailable())) {
      enabled = false;
    }
    await setBiometricEnabled(enabled);
    router.replace('/(tabs)/dashboard');
  };

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'space-between', flexGrow: 1 }}>
      <GlassCard>
        <SectionHeader title="Biometric Unlock" subtitle="Convenience layer on top of PIN encryption" />
        <AppText style={{ marginTop: 18, color: colors.textMuted }}>
          Add biometric unlock for faster access without changing the root encryption key derived from your PIN.
        </AppText>
      </GlassCard>
      <GlassCard style={{ gap: 12 }}>
        <AppButton label="Enable Biometrics" onPress={() => void finish(true)} />
        <AppButton label="Skip for Now" tone="secondary" onPress={() => void finish(false)} />
      </GlassCard>
    </AppScreen>
  );
}
