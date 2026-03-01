import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Leaf, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const mobile = sessionStorage.getItem('pendingMobile') || '';

  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate({ to: '/' });
    }
  }, [navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp === '1234') {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate({ to: '/' });
    } else {
      setError(t('invalidOtp'));
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setError('');
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-white to-eco-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf size={40} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-2xl text-eco-primary">Agro Crops</h1>
          </div>

          <button
            onClick={() => navigate({ to: '/signup' })}
            className="flex items-center gap-1 text-eco-primary text-sm mb-4 hover:underline"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <h2 className="text-xl font-bold text-eco-dark mb-2">{t('enterOtp')}</h2>
          <p className="text-gray-500 text-sm mb-6">
            OTP sent to +91 {mobile}
          </p>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex gap-3 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-eco-primary/30 rounded-xl focus:outline-none focus:border-eco-primary text-eco-dark"
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {resent && <p className="text-eco-primary text-sm text-center">OTP resent successfully!</p>}

            <button
              type="submit"
              className="w-full bg-eco-primary hover:bg-eco-dark text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {t('verifyOtp')}
            </button>

            <button
              type="button"
              onClick={handleResend}
              className="w-full text-eco-primary text-sm hover:underline"
            >
              {t('resendOtp')}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">Demo OTP: 1234</p>
        </div>
      </div>
    </div>
  );
}
