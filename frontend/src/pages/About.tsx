import React from 'react';
import { Mail, Phone, Target, Eye, Users, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const stats = [
  { valueKey: '10000+', labelKey: 'happyFarmers' },
  { valueKey: '5000+', labelKey: 'organicFarms' },
  { valueKey: '200+', labelKey: 'products' },
  { valueKey: '15+', labelKey: 'countries' },
];

const team = [
  { name: 'Chaitanya Kharat', roleKey: 'ceoFounder', initials: 'CK' },
  { name: 'Priya Sharma', roleKey: 'chiefAgriculturalOfficer', initials: 'PS' },
  { name: 'Rahul Verma', roleKey: 'headOfMarketing', initials: 'RV' },
  { name: 'Anita Patel', roleKey: 'leadDeveloper', initials: 'AP' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Leaf className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t('aboutHeroTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('aboutHeroSubtitle')}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-bold text-primary mb-2">{s.valueKey}</div>
                <div className="text-muted-foreground text-sm">{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="eco-card p-8 rounded-2xl border border-border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('ourMission')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('ourMissionDesc')}</p>
            </div>
            <div className="eco-card p-8 rounded-2xl border border-border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('ourVision')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('ourVisionDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('meetOurTeam')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="eco-card p-6 rounded-xl border border-border bg-card text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">{member.initials}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{t(member.roleKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('joinUs')}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">{t('joinUsDesc')}</p>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{t('getInTouch')}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:kharatchaitanya03@gmail.com" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">kharatchaitanya03@gmail.com</span>
            </a>
            <a href="tel:+918421016006" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">+91 8421016006</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
