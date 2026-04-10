import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AmountText } from '@/components/ui/AmountText';
import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SecurityBadge } from '@/components/ui/SecurityBadge';
import { useChits } from '@/hooks/useChits';
import { useReports } from '@/hooks/useReports';
import { useLanguageStore } from '@/store/language.store';
import { colors } from '@/theme/colors';
import { formatDate } from '@/utils/date';

export default function DashboardScreen() {
  const t = useLanguageStore((state) => state.t);
  const { items: chits } = useChits();
  const summary = useReports();
  const expected = chits.reduce((sum, chit) => sum + chit.subscriptionAmount * chit.totalMembers, 0);
  const collected = summary.collected;
  const outstanding = summary.outstanding;
  const portfolioPercent = expected === 0 ? 0 : Math.min(Math.round((collected / expected) * 100), 100);
  const totalDefaulters = chits.reduce((sum, chit) => sum + chit.defaultersCount, 0);

  return (
    <AppScreen>
      <SectionHeader title={t('dashboard')} subtitle={t('securityTagline')} />
      <SecurityBadge score={85} />
      <GlassCard style={styles.hero}>
        <AppText style={styles.eyebrow}>{t('totalCollection')}</AppText>
        <AmountText value={collected} style={styles.heroAmount} />
        <AppText style={styles.heroSub}>{t('notEvenWeCanRead')}</AppText>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${portfolioPercent}%` }]} />
        </View>
        <View style={styles.row}>
          <AppText style={styles.metaMuted}>{t('expectedThisMonth')}</AppText>
          <AmountText value={expected} />
        </View>
      </GlassCard>
      <View style={styles.grid}>
        <GlassCard style={styles.tile}>
          <AppText style={styles.metaMuted}>{t('activeChits')}</AppText>
          <AppText style={styles.metric}>{chits.length}</AppText>
        </GlassCard>
        <GlassCard style={styles.tile}>
          <AppText style={styles.metaMuted}>{t('outstanding')}</AppText>
          <AmountText value={outstanding} style={styles.metric} />
        </GlassCard>
      </View>
      <View style={styles.grid}>
        <GlassCard style={styles.tile}>
          <AppText style={styles.metaMuted}>Portfolio Collection</AppText>
          <AppText style={styles.metric}>{`${portfolioPercent}%`}</AppText>
        </GlassCard>
        <GlassCard style={styles.tile}>
          <AppText style={styles.metaMuted}>{t('defaulters')}</AppText>
          <AppText style={styles.metric}>{totalDefaulters}</AppText>
        </GlassCard>
      </View>
      <GlassCard style={{ gap: 12 }}>
        <SectionHeader title={t('quickActions')} />
        <AppButton label={t('newChit')} onPress={() => router.push('/(tabs)/chits/new')} />
        <AppButton label={t('recordPayment')} tone="secondary" onPress={() => router.push('/(tabs)/payments/collect')} />
        <AppButton label={t('newMember')} tone="secondary" onPress={() => router.push('/(tabs)/members/new')} />
      </GlassCard>
      <GlassCard style={{ gap: 12 }}>
        <SectionHeader title={t('upcomingAuctions')} />
        {chits.map((chit) => (
          <View key={chit.id} style={styles.row}>
            <View>
              <AppText style={styles.rowTitle}>{chit.name}</AppText>
              <AppText style={styles.metaMuted}>{`${formatDate(chit.nextAuctionDate)} • ${chit.collectionPercent}% collected`}</AppText>
            </View>
            <AmountText value={chit.chitValue} />
          </View>
        ))}
      </GlassCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 14 },
  eyebrow: { color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontSize: 12 },
  heroAmount: { fontSize: 34, fontWeight: '800' },
  heroSub: { color: colors.accent },
  progressTrack: {
    height: 12,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.panelMuted,
  },
  progressFill: { height: '100%', backgroundColor: colors.accent },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 },
  metaMuted: { color: colors.textMuted },
  grid: { flexDirection: 'row', gap: 16 },
  tile: { flex: 1, gap: 10 },
  metric: { fontSize: 26, fontWeight: '700' },
  rowTitle: { fontSize: 16, fontWeight: '700' },
});
