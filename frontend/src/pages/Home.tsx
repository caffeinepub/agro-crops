import React from 'react';
import { Link } from '@tanstack/react-router';
import { Leaf, Sprout, TrendingUp, BookOpen, ArrowRight, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';

const regionCrops = [
  { region: 'Maharashtra', crops: ['Sugarcane', 'Cotton', 'Soybean', 'Jowar'] },
  { region: 'Punjab', crops: ['Wheat', 'Rice', 'Maize', 'Barley'] },
  { region: 'Karnataka', crops: ['Coffee', 'Ragi', 'Sunflower', 'Groundnut'] },
  { region: 'Uttar Pradesh', crops: ['Wheat', 'Sugarcane', 'Potato', 'Mustard'] },
];

const schemeHighlights = [
  { name: 'PM-KISAN', desc: '₹6,000/year direct income support to farmers', icon: '💰' },
  { name: 'PMFBY', desc: 'Crop insurance at minimal premium rates', icon: '🛡️' },
  { name: 'KCC', desc: 'Kisan Credit Card for easy farm credit', icon: '💳' },
  { name: 'Soil Health Card', desc: 'Free soil testing and nutrient recommendations', icon: '🌱' },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="/assets/generated/hero-farm.dim_1400x600.png"
          alt="Farm"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-eco-dark/80 to-eco-dark/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <AnimatedSection animation="slideUp">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-xl">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="eco-btn-primary flex items-center gap-2">
                  {t('exploreShop')} <ArrowRight size={18} />
                </Link>
                <Link to="/techniques" className="eco-btn-secondary flex items-center gap-2">
                  {t('learnTechniques')} <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-3xl font-display font-bold text-eco-dark text-center mb-12">
              Why Choose Organic Farming?
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Leaf size={32} />, title: t('organicFarming'), desc: t('organicFarmingDesc') },
              { icon: <TrendingUp size={32} />, title: t('modernTechniques'), desc: t('modernTechniquesDesc') },
              { icon: <BookOpen size={32} />, title: t('govSchemes'), desc: t('govSchemesDesc') },
              { icon: <Sprout size={32} />, title: t('cropGuide'), desc: t('cropGuideDesc') },
            ].map((item, i) => (
              <AnimatedSection key={i} animation="zoomIn" delay={i * 100}>
                <div className="bg-eco-light rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-eco-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Region Crops */}
      <section className="py-16 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-eco-dark mb-3">Region-wise Crop Guide</h2>
              <p className="text-gray-600">Discover the best crops for your region</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {regionCrops.map((r, i) => (
              <AnimatedSection key={r.region} animation="fadeIn" delay={i * 80}>
                <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-eco-primary mb-3">{r.region}</h3>
                  <ul className="space-y-1">
                    {r.crops.map(crop => (
                      <li key={crop} className="flex items-center gap-2 text-sm text-gray-700">
                        <Sprout size={14} className="text-eco-secondary" /> {crop}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center">
            <Link to="/crop-suggestions" className="eco-btn-primary inline-flex items-center gap-2">
              {t('viewDetailedCropSuggestions')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Scheme Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-eco-dark mb-3">Government Scheme Highlights</h2>
              <p className="text-gray-600">Key schemes supporting Indian farmers</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {schemeHighlights.map((s, i) => (
              <AnimatedSection key={s.name} animation="zoomIn" delay={i * 100}>
                <div className="bg-eco-light rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-eco-dark mb-2">{s.name}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center">
            <Link to="/schemes" className="eco-btn-primary inline-flex items-center gap-2">
              View All Schemes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-16 bg-eco-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold mb-3">Future of Farming</h2>
              <p className="text-white/80">Embracing technology for sustainable agriculture</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Precision Agriculture', desc: 'Using IoT sensors and data analytics for optimized crop management', icon: '📡' },
              { title: 'Drone Technology', desc: 'Aerial monitoring and precision spraying for large-scale farms', icon: '🚁' },
              { title: 'AI-Powered Insights', desc: 'Machine learning for crop disease detection and yield prediction', icon: '🤖' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} animation="fadeIn" delay={i * 150}>
                <div className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-eco-accent mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Callout */}
      <section className="py-12 bg-eco-primary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-2xl font-display font-bold text-white mb-4">Have Questions? Contact Us!</h2>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="mailto:kharatchaitanya03@gmail.com" className="flex items-center gap-2 text-white hover:text-eco-accent transition-colors">
                <Mail size={20} /> kharatchaitanya03@gmail.com
              </a>
              <a href="tel:+918421016006" className="flex items-center gap-2 text-white hover:text-eco-accent transition-colors">
                <Phone size={20} /> +91 8421016006
              </a>
            </div>
            <Link to="/contact" className="eco-btn-secondary inline-flex items-center gap-2">
              Contact Us <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
