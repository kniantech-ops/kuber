import { create } from 'zustand';

interface AuthState {
  unlocked: boolean;
  onboardingComplete: boolean;
  setUnlocked: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  unlocked: false,
  onboardingComplete: false,
  setUnlocked: (value) => set({ unlocked: value }),
  setOnboardingComplete: (value) => set({ onboardingComplete: value }),
}));
