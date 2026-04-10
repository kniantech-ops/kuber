import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { AmountText } from '@/components/ui/AmountText';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { paymentsRepo } from '@/db/repositories/payments.repo';
import { formatDate } from '@/utils/date';

export default function ReceiptPreviewModal() {
  const { paymentId } = useLocalSearchParams<{ paymentId: string }>();
  const [receipt, setReceipt] = useState<Awaited<ReturnType<typeof paymentsRepo.getReceiptDetails>>>(null);

  useEffect(() => {
    if (!paymentId) {
      return;
    }

    void paymentsRepo.getReceiptDetails(paymentId).then(setReceipt);
  }, [paymentId]);

  return (
    <AppScreen>
      <SectionHeader title="Receipt Preview" subtitle="Saved payment receipt generated from local data" />
      <GlassCard style={{ gap: 14 }}>
        <ListRow title="Receipt Number" subtitle={receipt?.receiptNumber || 'Loading...'} />
        <ListRow title="Member" subtitle={receipt?.memberName || ''} />
        <ListRow title="Phone" subtitle={receipt?.memberPhone || ''} />
        <ListRow title="Chit Group" subtitle={receipt?.chitName || ''} />
        <ListRow title="Date" subtitle={receipt ? formatDate(receipt.createdAt) : ''} />
        <ListRow title="Payment Mode" subtitle={receipt?.mode || ''} />
        <ListRow title="Reference" subtitle={receipt?.reference || 'Auto-generated receipt'} />
        {receipt ? <AmountText value={receipt.amount} style={{ fontSize: 28, fontWeight: '800' }} /> : null}
        <AppText>Secured by Kuber</AppText>
      </GlassCard>
    </AppScreen>
  );
}
