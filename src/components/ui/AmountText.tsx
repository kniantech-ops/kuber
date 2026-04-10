import { AppText } from '@/components/ui/AppText';
import { useLanguageStore } from '@/store/language.store';

export function AmountText({ value, style }: { value: number; style?: object }) {
  const formatAmount = useLanguageStore((state) => state.formatAmount);
  return <AppText style={style}>{formatAmount(value)}</AppText>;
}
