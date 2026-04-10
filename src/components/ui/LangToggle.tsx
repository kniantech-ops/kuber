import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';

export function LangToggle({
  value,
  onToggle,
}: {
  value: 'english' | 'regional';
  onToggle: () => void;
}) {
  return (
    <Pressable onPress={onToggle} style={styles.wrap}>
      <View style={[styles.thumb, value === 'regional' && styles.thumbRight]} />
      <View style={styles.labels}>
        <AppText style={[styles.label, value === 'english' && styles.active]}>EN</AppText>
        <AppText style={[styles.label, value === 'regional' && styles.active]}>AA</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 90,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.panelMuted,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    left: 4,
    width: 38,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  thumbRight: {
    left: 48,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  active: {
    color: colors.background,
  },
});
