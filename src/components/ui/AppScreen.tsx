import { ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

type Props = ScrollViewProps & {
  children: React.ReactNode;
};

export function AppScreen({ children, contentContainerStyle, ...props }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.background} />
      <ScrollView
        {...props}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    gap: 16,
  },
});
