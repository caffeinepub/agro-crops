import React from 'react';
import { Leaf, Bug, RefreshCw, Layers, Sprout, Droplets, Worm, FlaskConical, Grid3X3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Techniques() {
  const { t } = useLanguage();

  const techniques = [
    {
      icon: <Leaf className="w-7 h-7" />,
      titleKey: 'composting',
      descKey: 'compostingDesc',
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: <Bug className="w-7 h-7" />,
      titleKey: 'naturalPestControl',
      descKey: 'naturalPestControlDesc',
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      icon: <RefreshCw className="w-7 h-7" />,
      titleKey: 'cropRotation',
      descKey: 'cropRotationDesc',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: <Layers className="w-7 h-7" />,
      titleKey: 'mulching',
      descKey: 'mulchingDesc',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      icon: <Sprout className="w-7 h-7" />,
      titleKey: 'greenManuring',
      descKey: 'greenManuringDesc',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: <Droplets className="w-7 h-7" />,
      titleKey: 'dripIrrigation',
      descKey: 'dripIrrigationDesc',
      color: 'bg-cyan-100 text-cyan-700',
    },
    {
      icon: <Worm className="w-7 h-7" />,
      titleKey: 'vermicomposting',
      descKey: 'vermicompostingDesc',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      icon: <FlaskConical className="w-7 h-7" />,
      titleKey: 'biofertilizers',
      descKey: 'biofertilizersDesc',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: <Grid3X3 className="w-7 h-7" />,
      titleKey: 'intercropping',
      descKey: 'intercroppingDesc',
      color: 'bg-teal-100 text-teal-700',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Leaf className="w-4 h-4" />
            <span>Sustainable Methods</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('techniquesHeroTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('techniquesHeroSubtitle')}</p>
        </div>
      </section>

      {/* Techniques Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((tech, i) => (
              <div key={i} className="eco-card p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${tech.color}`}>
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{t(tech.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(tech.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
