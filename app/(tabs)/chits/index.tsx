import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AmountText } from '@/components/ui/AmountText';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useChits } from '@/hooks/useChits';
import { colors } from '@/theme/colors';

export default function ChitsIndexScreen() {
  const { items } = useChits();

  return (
    <AppScreen>
      <SectionHeader title="Chit Groups" subtitle="Auction, lucky draw, and fixed rotation groups" />
      <AppButton label="New Chit" onPress={() => router.push('/(tabs)/chits/new')} />
      {items.map((chit) => (
        <GlassCard key={chit.id} style={{ gap: 12 }}>
          <View style={styles.row}>
            <View>
              <AppText style={styles.title}>{chit.name}</AppText>
              <AppText style={styles.subtitle}>{`${chit.currentMonth}/${chit.durationMonths} months • ${chit.type}`}</AppText>
            </View>
            <AmountText value={chit.chitValue} />
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${chit.collectionPercent}%` }]} />
          </View>
          <View style={styles.row}>
            <AppText style={styles.subtitle}>{`Collection ${chit.collectionPercent}% • Defaulters ${chit.defaultersCount}`}</AppText>
            <AppButton label="Open" tone="secondary" onPress={() => router.push(`/(tabs)/chits/${chit.id}`)} />
          </View>
        </GlassCard>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 },
  title: { fontSize: 17, fontWeight: '700' },
  subtitle: { color: colors.textMuted },
  progressTrack: { height: 10, borderRadius: 999, overflow: 'hidden', backgroundColor: colors.panelMuted },
  progressFill: { height: '100%', backgroundColor: colors.gold },
});
