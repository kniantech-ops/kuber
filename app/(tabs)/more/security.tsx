import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAuditTrail } from '@/hooks/useAuditTrail';
import { useSecurity } from '@/hooks/useSecurity';
import { formatDate } from '@/utils/date';

export default function SecurityScreen() {
  const { score, items, chainValid } = useSecurity();
  const { items: auditItems } = useAuditTrail();

  return (
    <AppScreen>
      <SectionHeader title="Security Dashboard" subtitle={`Score ${score}/100`} />
      <GlassCard style={{ gap: 16 }}>
        <AppText>Your database key never leaves the device, and app access is guarded by local credentials.</AppText>
        {items.map((item) => (
          <ListRow key={item.label} title={item.label} subtitle={`${item.points} points`} right={<AppText>{item.enabled ? 'ON' : 'OFF'}</AppText>} />
        ))}
      </GlassCard>
      <GlassCard style={{ gap: 16 }}>
        <SectionHeader
          title="Audit Chain"
          subtitle={chainValid === null ? 'Checking integrity...' : chainValid ? 'Hash chain intact' : 'Hash chain broken'}
        />
        {auditItems.map((item) => (
          <ListRow
            key={item.id}
            title={`${item.entityType} ${item.action}`}
            subtitle={`${formatDate(item.timestamp)} • ${item.hash.slice(0, 12)}...`}
            right={<AppText>{item.entityId.slice(0, 6)}</AppText>}
          />
        ))}
        {auditItems.length === 0 ? <AppText>No audited actions yet.</AppText> : null}
      </GlassCard>
    </AppScreen>
  );
}
