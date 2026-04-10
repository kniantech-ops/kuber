import { create } from 'zustand';

export const useThemeStore = create<{
  mode: 'dark' | 'light';
  setMode: (mode: 'dark' | 'light') => void;
}>((set) => ({
  mode: 'dark',
  setMode: (mode) => set({ mode }),
}));
