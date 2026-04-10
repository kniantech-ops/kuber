import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { I18nManager } from 'react-native';
import i18n from '@/i18n/config';
import { LANGUAGES, type LanguageMeta } from '@/i18n/registry';

interface LanguageStore {
  current: LanguageMeta;
  scriptMode: 'regional' | 'english';
  setLanguage: (code: string) => Promise<void>;
  toggleScript: () => Promise<void>;
  hydrate: () => Promise<void>;
  formatAmount: (paise: number) => string;
  t: (key: string) => string;
}

const toScript = (value: string, digits: string[]) =>
  value
    .split('')
    .map((char) => {
      const parsed = Number.parseInt(char, 10);
      return Number.isNaN(parsed) ? char : digits[parsed];
    })
    .join('');

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  current: LANGUAGES[0],
  scriptMode: 'english',
  setLanguage: async (code) => {
    const next = LANGUAGES.find((item) => item.code === code) ?? LANGUAGES[0];
    await i18n.changeLanguage(next.code);
    await SecureStore.setItemAsync('kuber_lang', next.code);
    if (next.rtl !== I18nManager.isRTL) {
      I18nManager.allowRTL(next.rtl);
      I18nManager.forceRTL(next.rtl);
    }
    set({ current: next });
  },
  toggleScript: async () => {
    const next = get().scriptMode === 'english' ? 'regional' : 'english';
    await SecureStore.setItemAsync('kuber_script', next);
    set({ scriptMode: next });
  },
  hydrate: async () => {
    const language = await SecureStore.getItemAsync('kuber_lang');
    const scriptMode = await SecureStore.getItemAsync('kuber_script');
    if (language) {
      await get().setLanguage(language);
    }
    if (scriptMode === 'regional' || scriptMode === 'english') {
      set({ scriptMode });
    }
  },
  formatAmount: (paise) => {
    const rupees = paise / 100;
    const formatted = rupees.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
    if (get().scriptMode === 'english') {
      return `₹${formatted}`;
    }
    return `₹${toScript(formatted, get().current.digits)}`;
  },
  t: (key) => i18n.t(key),
}));
