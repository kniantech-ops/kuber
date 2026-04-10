import { AppScreen } from '@/components/ui/AppScreen';
import { AppText } from '@/components/ui/AppText';
import { GlassCard } from '@/components/ui/GlassCard';
import { LangToggle } from '@/components/ui/LangToggle';
import { ListRow } from '@/components/ui/ListRow';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LANGUAGES } from '@/i18n/registry';
import { useLanguageStore } from '@/store/language.store';

export default function LanguageScreen() {
  const current = useLanguageStore((state) => state.current);
  const scriptMode = useLanguageStore((state) => state.scriptMode);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const toggleScript = useLanguageStore((state) => state.toggleScript);

  return (
    <AppScreen>
      <SectionHeader title="Language" subtitle={`${current.nativeName} selected`} />
      <GlassCard style={{ gap: 16 }}>
        <ListRow title="Number Script" subtitle="Switch between English digits and regional digits" right={<LangToggle value={scriptMode} onToggle={() => void toggleScript()} />} />
        {LANGUAGES.map((language) => (
          <ListRow
            key={language.code}
            title={language.nativeName}
            subtitle={language.name}
            right={<AppText onPress={() => void setLanguage(language.code)}>{current.code === language.code ? 'Selected' : 'Use'}</AppText>}
          />
        ))}
      </GlassCard>
    </AppScreen>
  );
}
