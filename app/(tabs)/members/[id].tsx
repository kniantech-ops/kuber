import { useLocalSearchParams } from 'expo-router';
import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function MemberDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <AppScreen>
      <SectionHeader title={`Member ${id}`} subtitle="Statement, ticket transfers, and default tracking plug in here" />
      <GlassCard>
        <AppText>This details view is wired for future encrypted member statement flows.</AppText>
      </GlassCard>
    </AppScreen>
  );
}
