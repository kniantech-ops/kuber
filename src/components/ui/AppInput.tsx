import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { colors } from '@/theme/colors';

export function AppInput(props: TextInputProps) {
  return <TextInput placeholderTextColor={colors.textMuted} {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelMuted,
    color: colors.text,
    paddingHorizontal: 16,
  },
});
