export const settingsRepo = {
  async getThemeMode(): Promise<'dark' | 'light'> {
    return 'dark';
  },
  async getLanguageCode(): Promise<string> {
    return 'en';
  },
};
