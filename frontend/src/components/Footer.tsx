import React from 'react';
import { Link } from '@tanstack/react-router';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-eco-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-eco-primary rounded-full flex items-center justify-center">
                <Leaf size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">Agro Crops</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering farmers with knowledge, tools, and resources for sustainable and profitable agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eco-accent">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: t('home') },
                { to: '/about', label: t('about') },
                { to: '/techniques', label: t('techniques') },
                { to: '/farm', label: t('farm') },
                { to: '/shop', label: t('shop') },
                { to: '/schemes', label: t('schemes') },
                { to: '/crop-suggestions', label: t('cropSuggestions') },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-300 hover:text-eco-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-eco-accent">{t('contactInfo')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} className="text-eco-accent flex-shrink-0" />
                <a href="mailto:kharatchaitanya03@gmail.com" className="hover:text-eco-accent transition-colors">
                  kharatchaitanya03@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={16} className="text-eco-accent flex-shrink-0" />
                <a href="tel:+918421016006" className="hover:text-eco-accent transition-colors">
                  +91 8421016006
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin size={16} className="text-eco-accent flex-shrink-0 mt-0.5" />
                <span>Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {year} Agro Crops. {t('rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
