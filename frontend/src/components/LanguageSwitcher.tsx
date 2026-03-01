import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../utils/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'mr', label: 'MR' },
  ];

  return (
    <div className="flex items-center gap-1 bg-eco-light rounded-full px-1 py-1">
      {langs.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${
            language === code
              ? 'bg-eco-primary text-white shadow'
              : 'text-eco-dark hover:bg-eco-primary/20'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
