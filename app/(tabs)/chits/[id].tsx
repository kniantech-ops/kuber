import { useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { AmountText } from '@/components/ui/AmountText';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { chitMembersRepo } from '@/db/repositories/chit-members.repo';
import { useChitAssignments } from '@/hooks/useChitAssignments';
import { useChitDetails } from '@/hooks/useChitDetails';
import { useMembers } from '@/hooks/useMembers';
import { colors } from '@/theme/colors';
import { formatDate } from '@/utils/date';

export default function ChitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { chit, months, dues, refresh } = useChitDetails(id);
  const { items: assignments, refresh: refreshAssignments } = useChitAssignments(id);
  const { items: members } = useMembers();

  const unassignedMembers = members.filter(
    (member) => !assignments.some((assignment) => assignment.memberId === member.id),
  );

  const handleAssign = async (memberId: string) => {
    if (!id) {
      return;
    }

    await chitMembersRepo.assignMember(id, memberId);
    refresh();
    refreshAssignments();
  };

  return (
    <AppScreen>
      <SectionHeader
        title={chit?.name ?? `Chit ${id}`}
        subtitle="Monthly schedule is generated locally and stays on-device"
      />
      <GlassCard style={{ gap: 12 }}>
        <ListRow title="Current Month" subtitle={`${chit?.currentMonth ?? 1} / ${chit?.durationMonths ?? 0}`} />
        <ListRow title="Type" subtitle={chit?.type ?? 'auction'} />
        <ListRow title="Pot Value" right={chit ? <AmountText value={chit.chitValue} /> : undefined} />
        <ListRow title="Subscription" right={chit ? <AmountText value={chit.subscriptionAmount} /> : undefined} />
      </GlassCard>
      <GlassCard style={{ gap: 14 }}>
        <SectionHeader title="Month Schedule" subtitle={`${months.length} instalment cycles created`} />
        {months.map((month) => (
          <ListRow
            key={month.id}
            title={`Month ${month.monthNumber}`}
            subtitle={`${formatDate(month.monthDate)} • Prize ${Math.round(month.netPrizeAmount / 100).toLocaleString('en-IN')}`}
            right={<StatusBadge status={month.status === 'pending' ? 'pending' : 'paid'} />}
          />
        ))}
        {months.length === 0 ? <AppText>No schedule generated yet.</AppText> : null}
      </GlassCard>
      <GlassCard style={{ gap: 14 }}>
        <SectionHeader title="Assigned Members" subtitle={`${assignments.length} members linked to this chit`} />
        {assignments.map((assignment) => (
          <ListRow
            key={assignment.id}
            title={assignment.memberName}
            subtitle={`Ticket ${assignment.ticketNumber}`}
            right={<StatusBadge status={assignment.status === 'exited' ? 'pending' : assignment.status} />}
          />
        ))}
        {assignments.length === 0 ? <AppText>No members assigned yet.</AppText> : null}
      </GlassCard>
      <GlassCard style={{ gap: 14 }}>
        <SectionHeader title="Current Dues" subtitle={`${dues.length} instalments tracked`} />
        {dues.map((due) => (
          <ListRow
            key={due.id}
            title={due.memberName}
            subtitle={`Month ${due.monthNumber} • ${formatDate(due.dueDate)}`}
            right={<AmountText value={due.balance} />}
          />
        ))}
        {dues.length === 0 ? <AppText>No dues tracked yet.</AppText> : null}
      </GlassCard>
      <GlassCard style={{ gap: 14 }}>
        <SectionHeader title="Assign Members" subtitle="Tap a member to add them to this chit and generate dues" />
        <View style={styles.chips}>
          {unassignedMembers.map((member) => (
            <Pressable key={member.id} onPress={() => void handleAssign(member.id)} style={styles.chip}>
              <AppText style={styles.chipText}>{member.name}</AppText>
            </Pressable>
          ))}
        </View>
        {unassignedMembers.length === 0 ? <AppText>All saved members are already assigned.</AppText> : null}
      </GlassCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.panelMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
});
