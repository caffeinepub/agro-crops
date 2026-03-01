import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { translations, Language, TranslationKey } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('agro-language');
    if (stored === 'en' || stored === 'hi' || stored === 'mr') return stored;
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem('agro-language', lang);
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const langMap = translations[language] as Record<string, string>;
      const enMap = translations['en'] as Record<string, string>;
      return langMap[key] || enMap[key] || key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
