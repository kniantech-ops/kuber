import { router } from 'expo-router';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { GlassCard } from '@/components/ui/GlassCard';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useMembers } from '@/hooks/useMembers';

export default function MembersIndexScreen() {
  const { items } = useMembers();

  return (
    <AppScreen>
      <SectionHeader title="Members" subtitle="KYC-ready member registry with encrypted sensitive fields" />
      <AppButton label="Add Member" onPress={() => router.push('/(tabs)/members/new')} />
      <GlassCard style={{ gap: 14 }}>
        {items.map((member) => (
          <ListRow
            key={member.id}
            title={member.name}
            subtitle={`${member.city} • Ticket ${member.ticketNumber}`}
            right={<StatusBadge status={member.status === 'exited' ? 'pending' : member.status} />}
          />
        ))}
      </GlassCard>
    </AppScreen>
  );
}
