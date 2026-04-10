import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function PaymentHistoryScreen() {
  return (
    <AppScreen>
      <SectionHeader title="Payment History" subtitle="Receipt regeneration, date filters, and export hooks live here" />
      <GlassCard>
        <AppText>History table scaffolded.</AppText>
      </GlassCard>
    </AppScreen>
  );
}
