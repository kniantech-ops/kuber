import { useState } from 'react';
import { router } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { setupPIN } from '@/security/auth.service';
import { useLanguageStore } from '@/store/language.store';
import { colors } from '@/theme/colors';

export default function PinSetupScreen() {
  const t = useLanguageStore((state) => state.t);
  const [pin, setPin] = useState('');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    setSaving(true);
    await setupPIN(pin || '1234');
    router.push('/(auth)/biometric');
  };

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'space-between', flexGrow: 1 }}>
      <GlassCard>
        <SectionHeader title={t('setupPin')} subtitle={t('securityTagline')} />
        <AppText style={{ marginTop: 18, color: colors.textMuted }}>
          This PIN derives your local encryption keys. If you forget it, your protected data cannot be restored.
        </AppText>
        <AppInput
          style={{ marginTop: 18 }}
          value={pin}
          onChangeText={setPin}
          placeholder="4-6 digit PIN"
          keyboardType="number-pad"
          secureTextEntry
          maxLength={6}
        />
      </GlassCard>
      <AppButton label={saving ? 'Securing...' : t('next')} onPress={() => void handleContinue()} />
    </AppScreen>
  );
}
