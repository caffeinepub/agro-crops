import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import type { Language } from "../utils/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      data-ocid="header.language.select"
      className="text-sm font-medium border border-eco-primary/30 rounded-full px-3 py-1.5 bg-eco-light text-eco-dark focus:outline-none focus:ring-2 focus:ring-eco-primary/50 cursor-pointer"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="mr">मराठी</option>
    </select>
  );
}
