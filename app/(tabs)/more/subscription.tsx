import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function SubscriptionScreen() {
  return (
    <AppScreen>
      <SectionHeader title="Subscription" subtitle="Pro plan messaging scaffolded" />
      <GlassCard style={{ gap: 12 }}>
        <AppText>Primary trust line: your data stays with you, encrypted and offline-first.</AppText>
        <AppText>Billing hooks can be connected here once plan logic is finalized.</AppText>
        <AppButton label="Upgrade to Pro" />
      </GlassCard>
    </AppScreen>
  );
}
