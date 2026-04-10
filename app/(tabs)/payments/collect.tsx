import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useChitAssignments } from '@/hooks/useChitAssignments';
import { useChits } from '@/hooks/useChits';
import { paymentsRepo } from '@/db/repositories/payments.repo';
import { colors } from '@/theme/colors';

export default function CollectPaymentScreen() {
  const { items: chits } = useChits();
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [chitId, setChitId] = useState('');
  const { items: assignments } = useChitAssignments(chitId || undefined);
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'cash' | 'upi' | 'bank' | 'cheque'>('cash');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!memberId || !chitId || !amount) {
      setError('Please select a member, chit group, and amount.');
      return;
    }

    setSaving(true);
    setError('');
    const paymentId = await paymentsRepo.create({
      memberId,
      memberName,
      amount: Math.round(Number(amount) * 100),
      mode,
      reference,
      chitId,
    });
    router.replace({
      pathname: '/modals/receipt-preview',
      params: { paymentId },
    });
  };

  return (
    <AppScreen>
      <SectionHeader title="Collect Payment" subtitle="Amount, mode, reference, balance, and receipt data" />
      <GlassCard style={{ gap: 12 }}>
        <AppText style={styles.label}>Select Chit Group</AppText>
        <View style={styles.chipWrap}>
          {chits.map((chit) => (
            <Pressable
              key={chit.id}
              onPress={() => {
                setChitId(chit.id);
                setMemberId('');
                setMemberName('');
              }}
              style={[styles.chip, chitId === chit.id && styles.chipActive]}
            >
              <AppText style={[styles.chipText, chitId === chit.id && styles.chipTextActive]}>
                {chit.name}
              </AppText>
            </Pressable>
          ))}
        </View>
        <AppText style={styles.label}>Select Member</AppText>
        <View style={styles.chipWrap}>
          {assignments.map((member) => (
            <Pressable
              key={member.memberId}
              onPress={() => {
                setMemberId(member.memberId);
                setMemberName(member.memberName);
              }}
              style={[styles.chip, memberId === member.memberId && styles.chipActive]}
            >
              <AppText style={[styles.chipText, memberId === member.memberId && styles.chipTextActive]}>
                {member.memberName}
              </AppText>
            </Pressable>
          ))}
        </View>
        {chitId && assignments.length === 0 ? (
          <AppText style={{ color: colors.textMuted }}>No members are assigned to this chit yet.</AppText>
        ) : null}
        <AppInput placeholder="Amount received" keyboardType="number-pad" value={amount} onChangeText={setAmount} />
        <AppInput placeholder="Payment mode (cash, upi, bank, cheque)" value={mode} onChangeText={(value) => setMode((value as typeof mode) || 'cash')} />
        <AppInput placeholder="Reference number" value={reference} onChangeText={setReference} />
        {error ? <AppText style={{ color: colors.danger }}>{error}</AppText> : null}
        <AppButton label={saving ? 'Saving...' : 'Generate Receipt'} onPress={() => void handleSave()} />
      </GlassCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
  chipWrap: {
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
  chipActive: {
    backgroundColor: `${colors.accent}22`,
    borderColor: colors.accent,
  },
  chipText: {
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.accent,
    fontWeight: '700',
  },
});
