import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Pause, Play, Square, VolumeX } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type ReadState = 'idle' | 'reading' | 'paused';

const LANG_CODE: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
};

function getPageText(): string {
  const main = document.querySelector('main');
  const container = main || document.body;
  const elements = container.querySelectorAll('h1, h2, h3, h4, p, li');
  if (elements.length > 0) {
    return Array.from(elements)
      .map(el => (el as HTMLElement).innerText?.trim())
      .filter(Boolean)
      .join('. ');
  }
  return (container as HTMLElement).innerText || '';
}

export default function VoiceReader() {
  const { language, t } = useLanguage();
  const [readState, setReadState] = useState<ReadState>('idle');
  const [supported, setSupported] = useState(true);
  const [showUnsupported, setShowUnsupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }
  }, []);

  // Stop speech when language changes
  useEffect(() => {
    if (readState !== 'idle') {
      window.speechSynthesis?.cancel();
      setReadState('idle');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stopReading = useCallback(() => {
    window.speechSynthesis?.cancel();
    utteranceRef.current = null;
    setReadState('idle');
  }, []);

  const startReading = useCallback(() => {
    if (!supported) {
      setShowUnsupported(true);
      setTimeout(() => setShowUnsupported(false), 4000);
      return;
    }

    window.speechSynthesis.cancel();

    const text = getPageText();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_CODE[language] || 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => setReadState('idle');
    utterance.onerror = () => setReadState('idle');

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setReadState('reading');
  }, [supported, language]);

  const togglePauseResume = useCallback(() => {
    if (readState === 'reading') {
      window.speechSynthesis?.pause();
      setReadState('paused');
    } else if (readState === 'paused') {
      window.speechSynthesis?.resume();
      setReadState('reading');
    }
  }, [readState]);

  const handleMainButton = () => {
    if (readState === 'idle') {
      startReading();
    } else {
      togglePauseResume();
    }
  };

  const mainIcon =
    readState === 'idle' ? (
      <Volume2 className="w-5 h-5" />
    ) : readState === 'reading' ? (
      <Pause className="w-5 h-5" />
    ) : (
      <Play className="w-5 h-5" />
    );

  const mainLabel =
    readState === 'idle'
      ? t('readAloud')
      : readState === 'reading'
      ? t('pause')
      : t('resume');

  if (!supported) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => { setShowUnsupported(true); setTimeout(() => setShowUnsupported(false), 4000); }}
          title={t('voiceNotSupported')}
          className="flex items-center gap-2 bg-gray-200 text-gray-500 rounded-full px-4 py-3 shadow-lg font-semibold text-sm cursor-not-allowed"
          disabled
        >
          <VolumeX className="w-5 h-5" />
          <span>{t('readAloud')}</span>
        </button>
        {showUnsupported && (
          <div className="absolute bottom-14 right-0 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2 shadow-md w-64 text-right">
            {t('voiceNotSupported')}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Stop button — only visible when reading or paused */}
      {readState !== 'idle' && (
        <button
          onClick={stopReading}
          title={t('stop')}
          className="flex items-center gap-2 bg-white border border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white transition-all duration-200 rounded-full px-4 py-2 shadow-lg text-sm font-medium"
        >
          <Square className="w-4 h-4" />
          <span>{t('stop')}</span>
        </button>
      )}

      {/* Main play/pause/resume button */}
      <button
        onClick={handleMainButton}
        title={mainLabel}
        className={`flex items-center gap-2 transition-all duration-200 rounded-full px-4 py-3 shadow-lg font-semibold text-sm ${
          readState === 'reading'
            ? 'bg-amber-500 text-white hover:bg-amber-600'
            : 'bg-eco-primary text-white hover:bg-eco-dark'
        }`}
      >
        {mainIcon}
        <span>{mainLabel}</span>
      </button>
    </div>
  );
}
