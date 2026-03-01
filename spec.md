# Specification

## Summary
**Goal:** Fix the language switcher so UI text updates instantly across all pages, and add a voice text-to-speech reader that works in English, Hindi, and Marathi for uneducated/hearing-impaired farmers.

**Planned changes:**
- Audit and fix `LanguageContext`, `LanguageProvider`, and `useLanguage` hook so language changes trigger immediate re-renders across all pages and components without a page reload.
- Ensure the selected language is persisted to and restored from `localStorage`.
- Verify all page components (Home, About, Techniques, Farm, Shop, Cattle, Equipment, Contact, GovernmentSchemes, Signup, OtpVerification, CropSuggestions) and shared components (Header, Footer) use the `useLanguage` hook and re-render on language change.
- Create a reusable `VoiceReader` component with a fixed floating action button (bottom-right corner) featuring Play, Pause/Resume, and Stop controls using the browser's Web Speech API (`window.speechSynthesis`).
- Set the utterance language to `en-IN`, `hi-IN`, or `mr-IN` based on the currently selected language from `LanguageContext`.
- Display a translated tooltip above the voice button ("Read Aloud" / "पढ़ें" / "वाचा").
- Show a friendly message if `speechSynthesis` is not supported in the browser.
- Integrate `VoiceReader` into the authenticated layout so it appears on all pages except Signup and OTP.
- Add translation keys `readAloud`, `pause`, `resume`, `stop`, and `voiceNotSupported` to `translations.ts` for all three languages.

**User-visible outcome:** Farmers can switch between English, Hindi, and Marathi and see all page text update instantly. A floating speaker button on every authenticated page lets them hear the page content read aloud in their chosen language, supporting uneducated or low-literacy users.
