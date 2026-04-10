import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';

const toneMap = {
  paid: colors.success,
  partial: colors.gold,
  pending: colors.info,
  defaulted: colors.danger,
  active: colors.accent,
  prized: colors.gold,
};

export function StatusBadge({ status }: { status: keyof typeof toneMap }) {
  return (
    <View style={[styles.badge, { backgroundColor: `${toneMap[status]}22` }]}>
      <AppText style={[styles.text, { color: toneMap[status] }]}>{status.toUpperCase()}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});
