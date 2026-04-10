import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { GlassCard } from '@/components/ui/GlassCard';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';

const reports = ['Collection Report', 'Outstanding Report', 'Defaulter Report', 'Auction History'];

export default function ReportsScreen() {
  return (
    <AppScreen>
      <SectionHeader title="Reports" subtitle="Export-ready report hub for PDF and CSV output" />
      <GlassCard style={{ gap: 16 }}>
        {reports.map((title) => (
          <ListRow key={title} title={title} subtitle="Structured output scaffolded" />
        ))}
      </GlassCard>
      <AppButton label="Export PDF" />
    </AppScreen>
  );
}
