import { router } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLanguageStore } from '@/store/language.store';
import { colors } from '@/theme/colors';

export default function PrivacyNoticeScreen() {
  const t = useLanguageStore((state) => state.t);

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'space-between', flexGrow: 1 }}>
      <GlassCard>
        <SectionHeader title={t('privacyNoticeTitle')} subtitle={t('tagline')} />
        <AppText style={{ marginTop: 18, color: colors.textMuted, lineHeight: 22 }}>{t('privacyNoticeText')}</AppText>
        <AppText style={{ marginTop: 18 }}>{t('worksOffline')}</AppText>
        <AppText style={{ marginTop: 8, color: colors.accent }}>{t('notEvenWeCanRead')}</AppText>
      </GlassCard>
      <AppButton label={t('iUnderstand')} onPress={() => router.push('/(auth)/pin')} />
    </AppScreen>
  );
}
