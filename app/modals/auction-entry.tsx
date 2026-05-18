import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useChitAssignments } from '@/hooks/useChitAssignments';
import { useAuction } from '@/hooks/useAuction';
import { colors } from '@/theme/colors';

export default function AuctionEntryModal() {
  const { chitId, monthId } = useLocalSearchParams<{ chitId: string; monthId: string }>();
  const { items: assignments } = useChitAssignments(chitId);
  const { confirmAuction, saving, error } = useAuction();
  const [winnerChitMemberId, setWinnerChitMemberId] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');

  const handleConfirm = async () => {
    if (!chitId || !monthId || !winnerChitMemberId || !discountAmount) {
      return;
    }

    const success = await confirmAuction({
      chitId,
      monthId,
      winnerChitMemberId,
      discountAmount: Math.round(Number(discountAmount) * 100),
    });

    if (success) {
      router.back();
    }
  };

  return (
    <AppScreen>
      <SectionHeader title="Auction Result" subtitle="Record winner and discount for this month" />
      <GlassCard style={{ gap: 14 }}>
        <AppText style={styles.label}>Select Winner</AppText>
        <View style={styles.chips}>
          {assignments.map((assignment) => (
            <Pressable
              key={assignment.id}
              onPress={() => setWinnerChitMemberId(assignment.id)}
              style={[styles.chip, winnerChitMemberId === assignment.id && styles.chipActive]}
            >
              <AppText style={[styles.chipText, winnerChitMemberId === assignment.id && styles.chipTextActive]}>
                {`${assignment.memberName} • ${assignment.ticketNumber}`}
              </AppText>
            </Pressable>
          ))}
        </View>
        <AppInput
          placeholder="Discount amount in rupees"
          keyboardType="number-pad"
          value={discountAmount}
          onChangeText={setDiscountAmount}
        />
        {error ? <AppText style={{ color: colors.danger }}>{error}</AppText> : null}
        <AppButton label={saving ? 'Saving...' : 'Confirm Auction'} onPress={() => void handleConfirm()} />
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
