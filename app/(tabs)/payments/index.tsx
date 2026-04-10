import { router } from 'expo-router';
import { AmountText } from '@/components/ui/AmountText';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { GlassCard } from '@/components/ui/GlassCard';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { usePayments } from '@/hooks/usePayments';
import { formatDate } from '@/utils/date';

export default function PaymentsIndexScreen() {
  const { items } = usePayments();

  return (
    <AppScreen>
      <SectionHeader title="Payments" subtitle="Daily dues, partial payments, and receipt generation" />
      <AppButton label="Collect Payment" onPress={() => router.push('/(tabs)/payments/collect')} />
      <GlassCard style={{ gap: 14 }}>
        {items.map((payment) => (
          <ListRow
            key={payment.id}
            title={payment.memberName}
            subtitle={formatDate(payment.createdAt)}
            right={<StatusBadge status={payment.status} />}
          />
        ))}
      </GlassCard>
      <AppButton label="View History" tone="secondary" onPress={() => router.push('/(tabs)/payments/history')} />
    </AppScreen>
  );
}
