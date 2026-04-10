import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function BackupScreen() {
  return (
    <AppScreen>
      <SectionHeader title="Backup" subtitle="Encrypted export-ready backup flow" />
      <GlassCard style={{ gap: 14 }}>
        <AppText>Backups should be encrypted with a PIN-derived key before export or cloud upload.</AppText>
        <AppButton label="Backup Now" />
      </GlassCard>
    </AppScreen>
  );
}
