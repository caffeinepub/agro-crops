import React from 'react';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';

const languages: { code: LanguageCode; label: string; fullLabel: string }[] = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'hi', label: 'हि', fullLabel: 'हिंदी' },
  { code: 'mr', label: 'म', fullLabel: 'मराठी' },
];

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          title={lang.fullLabel}
          className={`
            px-2 py-1 rounded text-xs font-semibold transition-all duration-200 border
            ${language === lang.code
              ? 'bg-primary text-primary-foreground border-primary shadow-sm'
              : 'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground'
            }
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
