import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';

export function SecurityBadge({ score }: { score: number }) {
  return (
    <View style={styles.badge}>
      <AppText style={styles.label}>{`LOCK ${score}/100`}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: `${colors.accent}22`,
    borderWidth: 1,
    borderColor: `${colors.accent}44`,
  },
  label: {
    fontWeight: '700',
    color: colors.accent,
  },
});
