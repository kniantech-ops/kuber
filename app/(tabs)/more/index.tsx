import { router } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { GlassCard } from '@/components/ui/GlassCard';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function MoreScreen() {
  return (
    <AppScreen>
      <SectionHeader title="More" subtitle="Security, language, backup, and subscription controls" />
      <GlassCard style={{ gap: 16 }}>
        <ListRow title="Security Dashboard" subtitle="Threat surface, lock settings, and device binding" right={<AppButton label="Open" tone="secondary" onPress={() => router.push('/(tabs)/more/security')} />} />
        <ListRow title="Language" subtitle="12-language registry with regional digit toggle" right={<AppButton label="Open" tone="secondary" onPress={() => router.push('/(tabs)/more/language')} />} />
        <ListRow title="Backup" subtitle="Offline-first export and encrypted backup hooks" right={<AppButton label="Open" tone="secondary" onPress={() => router.push('/(tabs)/more/backup')} />} />
        <ListRow title="Subscription" subtitle="Premium trust messaging and plan presentation" right={<AppButton label="Open" tone="secondary" onPress={() => router.push('/(tabs)/more/subscription')} />} />
      </GlassCard>
    </AppScreen>
  );
}
