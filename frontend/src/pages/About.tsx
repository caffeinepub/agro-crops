import React from 'react';
import { Mail, Phone, Users, Target, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';

const team = [
  { name: 'Chaitanya Kharat', role: 'CEO & Founder', initials: 'CK', phone: '8421016006', email: 'kharatchaitanya03@gmail.com' },
  { name: 'Aditya Anarase', role: 'Chief Agricultural Officer', initials: 'AA', phone: '8421016006', email: '' },
  { name: 'Dhananjay Dhadge', role: 'Head of Marketing', initials: 'DD', phone: '8421016006', email: '' },
  { name: 'Shivam Murkute', role: 'Head of Technology', initials: 'SM', phone: '8421016006', email: '' },
];

const stats = [
  { value: '10,000+', label: 'Farmers Helped' },
  { value: '20+', label: 'Crop Varieties' },
  { value: '18', label: 'Gov. Schemes Listed' },
  { value: '15', label: 'Livestock Guides' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="bg-eco-primary py-20 text-white text-center">
        <AnimatedSection animation="slideUp">
          <h1 className="text-4xl font-display font-bold mb-4">{t('aboutUs')}</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Dedicated to empowering Indian farmers with knowledge, technology, and sustainable practices.
          </p>
        </AnimatedSection>
      </section>

      {/* Stats */}
      <section className="py-12 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} animation="zoomIn" delay={i * 100}>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-display font-bold text-eco-primary mb-1">{s.value}</div>
                  <div className="text-gray-600 text-sm">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection animation="slideUp">
              <div className="bg-eco-light rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-eco-primary rounded-full flex items-center justify-center">
                    <Target size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-eco-dark">{t('ourMission')}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To provide Indian farmers with comprehensive, accessible, and actionable agricultural knowledge that enables them to adopt sustainable farming practices, increase productivity, and improve their livelihoods through modern techniques and government support.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slideUp" delay={150}>
              <div className="bg-eco-light rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-eco-secondary rounded-full flex items-center justify-center">
                    <Eye size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-eco-dark">{t('ourVision')}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  A future where every Indian farmer has access to the best agricultural knowledge, tools, and resources, enabling them to build profitable, sustainable farms that contribute to food security and environmental health for generations to come.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-eco-dark mb-3">{t('ourTeam')}</h2>
              <p className="text-gray-600">The passionate people behind Agro Crops</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} animation="zoomIn" delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{member.initials}</span>
                  </div>
                  <h3 className="font-bold text-eco-dark mb-1">{member.name}</h3>
                  <p className="text-eco-primary text-sm mb-3">{member.role}</p>
                  <div className="space-y-1">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-eco-primary transition-colors">
                        <Mail size={12} /> {member.email}
                      </a>
                    )}
                    <a href={`tel:+91${member.phone}`} className="flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-eco-primary transition-colors">
                      <Phone size={12} /> +91 {member.phone}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 bg-eco-dark text-white text-center">
        <AnimatedSection animation="slideUp">
          <div className="max-w-2xl mx-auto px-4">
            <Users size={48} className="mx-auto mb-4 text-eco-accent" />
            <h2 className="text-3xl font-display font-bold mb-4">{t('joinUs')}</h2>
            <p className="text-white/80 mb-6">
              Join thousands of farmers who are already benefiting from our platform. Together, we can build a more sustainable agricultural future.
            </p>
            <a href="mailto:kharatchaitanya03@gmail.com" className="eco-btn-secondary inline-flex items-center gap-2">
              <Mail size={18} /> {t('getInTouch')}
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
