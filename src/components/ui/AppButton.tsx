import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { colors } from '@/theme/colors';

type Props = PressableProps & {
  label: string;
  tone?: 'primary' | 'secondary';
  containerStyle?: StyleProp<ViewStyle>;
};

export function AppButton({ label, tone = 'primary', containerStyle, ...props }: Props) {
  return (
    <Pressable
      {...props}
      style={[styles.base, tone === 'secondary' ? styles.secondary : styles.primary, containerStyle]}
    >
      <AppText style={[styles.label, tone === 'secondary' && styles.labelSecondary]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: '#03110b',
    fontSize: 16,
    fontWeight: '700',
  },
  labelSecondary: {
    color: colors.text,
  },
});
