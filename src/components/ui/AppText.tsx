import { Text, type TextProps } from 'react-native';
import { colors } from '@/theme/colors';

export function AppText({ style, ...props }: TextProps) {
  return <Text {...props} style={[{ color: colors.text }, style]} />;
}
