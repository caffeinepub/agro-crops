import React from 'react';
import { Link } from '@tanstack/react-router';
import { Leaf, TrendingUp, Shield, Droplets, Users, Sun, ArrowRight, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const regionCrops = [
  { region: 'Maharashtra', crops: ['Sugarcane', 'Cotton', 'Soybean', 'Jowar'], climate: 'Semi-arid' },
  { region: 'Punjab', crops: ['Wheat', 'Rice', 'Maize', 'Barley'], climate: 'Sub-tropical' },
  { region: 'Kerala', crops: ['Coconut', 'Rubber', 'Pepper', 'Cardamom'], climate: 'Tropical' },
  { region: 'Rajasthan', crops: ['Bajra', 'Mustard', 'Cumin', 'Moth Bean'], climate: 'Arid' },
  { region: 'West Bengal', crops: ['Rice', 'Jute', 'Tea', 'Potato'], climate: 'Humid' },
  { region: 'Karnataka', crops: ['Coffee', 'Ragi', 'Sunflower', 'Areca Nut'], climate: 'Varied' },
];

const govSchemes = [
  { name: 'PM-KISAN', desc: 'Direct income support of ₹6,000/year to farmer families.' },
  { name: 'PMFBY', desc: 'Crop insurance scheme providing financial support against crop loss.' },
  { name: 'KCC', desc: 'Kisan Credit Card for easy credit access to farmers.' },
];

const futureItems = [
  { key: 'futureScopeDesc1', icon: '🤖' },
  { key: 'futureScopeDesc2', icon: '🔗' },
  { key: 'futureScopeDesc3', icon: '🌱' },
];

export default function Home() {
  const { t } = useLanguage();

  const benefits = [
    { icon: <Leaf className="w-6 h-6" />, titleKey: 'healthierFood', descKey: 'healthierFoodDesc' },
    { icon: <Shield className="w-6 h-6" />, titleKey: 'environmentFriendly', descKey: 'environmentFriendlyDesc' },
    { icon: <TrendingUp className="w-6 h-6" />, titleKey: 'betterIncome', descKey: 'betterIncomeDesc' },
    { icon: <Sun className="w-6 h-6" />, titleKey: 'sustainableFuture', descKey: 'sustainableFutureDesc' },
    { icon: <Droplets className="w-6 h-6" />, titleKey: 'waterConservation', descKey: 'waterConservationDesc' },
    { icon: <Users className="w-6 h-6" />, titleKey: 'communitySupport', descKey: 'communitySupportDesc' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/generated/hero-farm.dim_1400x600.png" alt="Farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
              <Leaf className="w-4 h-4" />
              <span>100% Organic & Sustainable</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="eco-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                {t('exploreCategories')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/techniques" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-border text-foreground hover:bg-accent transition-colors">
                {t('watchTutorial')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Organic */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('whyChooseOrganic')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('whyChooseOrganicSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="eco-card p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {b.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t(b.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(b.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location-Based Crops */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('locationBasedCrops')}</h2>
            <p className="text-muted-foreground text-lg">{t('locationBasedCropsDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionCrops.map((r, i) => (
              <div key={i} className="eco-card p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{r.region}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{r.climate}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.crops.map((crop, j) => (
                    <span key={j} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md border border-border">{crop}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t('governmentSchemesTitle')}</h2>
              <p className="text-muted-foreground">{t('governmentSchemesSubtitle')}</p>
            </div>
            <Link to="/schemes" className="hidden sm:inline-flex items-center gap-2 text-primary font-medium hover:underline">
              {t('viewAllSchemes')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {govSchemes.map((s, i) => (
              <div key={i} className="eco-card p-6 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.name}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link to="/schemes" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              {t('viewAllSchemes')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('futureScopeTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {futureItems.map((item, i) => (
              <div key={i} className="eco-card p-6 rounded-xl border border-border bg-card text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(item.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Callout */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('getInTouch')}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <a href="mailto:kharatchaitanya03@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-5 h-5" />
              <span>kharatchaitanya03@gmail.com</span>
            </a>
            <a href="tel:+918421016006" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-5 h-5" />
              <span>+91 8421016006</span>
            </a>
            <Link to="/contact" className="bg-primary-foreground text-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
