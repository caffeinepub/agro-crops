# Specification

## Summary
**Goal:** Add multi-language support (English, Hindi, Marathi) with a language switcher to the Agro Crops frontend.

**Planned changes:**
- Create `LanguageContext.tsx` with a `useLanguage` hook exposing `{ language, setLanguage, t }`, persisting the selected language to localStorage
- Create `translations.ts` with translation strings in English, Hindi (Devanagari), and Marathi (Devanagari) covering navigation labels, section titles, button labels, form field labels, and status messages
- Create a `LanguageSwitcher` component (EN / हि / म) and integrate it into the Header on desktop and mobile
- Wrap the root `App` with `LanguageProvider`
- Replace hardcoded English strings with `t(key)` calls across all major pages (Home, About, Techniques, Farm, Shop, Cattle, Equipment, Contact, GovernmentSchemes, Signup, OtpVerification) and shared components (Header, Footer)

**User-visible outcome:** Users can switch between English, Hindi, and Marathi using a language switcher in the header; all major UI text updates instantly without a page reload, and the language choice is remembered across sessions.
