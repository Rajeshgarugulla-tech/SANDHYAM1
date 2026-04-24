import { create } from 'zustand';
import { Language } from '@/types';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en' as Language,
  setLanguage: (lang: Language) => {
    set({ language: lang });
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  },
}));

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage) {
    useLanguageStore.setState({ language: savedLanguage });
  }
}
