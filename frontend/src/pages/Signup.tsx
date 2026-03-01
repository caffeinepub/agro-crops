import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Leaf, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Signup() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate({ to: '/' });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setError(t('invalidMobile'));
      return;
    }
    setError('');
    sessionStorage.setItem('pendingMobile', mobile);
    navigate({ to: '/otp' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-white to-eco-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf size={40} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-2xl text-eco-primary">Agro Crops</h1>
            <p className="text-gray-500 text-sm mt-1">Sustainable Farming Platform</p>
          </div>

          <h2 className="text-xl font-bold text-eco-dark text-center mb-6">{t('welcomeBack')}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-eco-dark mb-1">{t('mobileNumber')}</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-eco-primary" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => {
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                    setError('');
                  }}
                  placeholder={t('enterMobile')}
                  className="w-full pl-10 pr-4 py-3 border border-eco-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-primary text-eco-dark"
                  maxLength={10}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-eco-primary hover:bg-eco-dark text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {t('sendOtp')}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
