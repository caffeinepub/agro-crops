import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Leaf, Sun, Droplets, Shield, TrendingUp, Cpu, Bot, Link2, Users, Store, ChevronRight, MapPin, Mail, Phone } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const benefits = [
  { icon: <Leaf className="w-6 h-6" />, title: 'Healthier Food', desc: 'No harmful chemicals or pesticides in your food.' },
  { icon: <Sun className="w-6 h-6" />, title: 'Soil Health', desc: 'Maintains and improves soil fertility naturally.' },
  { icon: <Droplets className="w-6 h-6" />, title: 'Water Conservation', desc: 'Organic methods reduce water usage significantly.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Eco-Friendly', desc: 'Reduces carbon footprint and protects biodiversity.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Better Income', desc: 'Organic produce commands premium market prices.' },
];

const regionCrops: Record<string, { crops: string[]; season: string }> = {
  'North India': { crops: ['Wheat', 'Rice', 'Sugarcane', 'Mustard', 'Potato'], season: 'Rabi & Kharif' },
  'South India': { crops: ['Rice', 'Coconut', 'Banana', 'Coffee', 'Pepper'], season: 'Year-round' },
  'East India': { crops: ['Rice', 'Jute', 'Tea', 'Maize', 'Pulses'], season: 'Kharif' },
  'West India': { crops: ['Cotton', 'Groundnut', 'Soybean', 'Jowar', 'Bajra'], season: 'Kharif' },
  'Central India': { crops: ['Soybean', 'Wheat', 'Pulses', 'Maize', 'Chickpea'], season: 'Rabi & Kharif' },
};

const schemes = [
  {
    name: 'PM-KISAN',
    desc: 'Direct income support of ₹6,000/year to farmer families across India.',
    icon: '🌾',
    color: 'bg-green-pale',
  },
  {
    name: 'Paramparagat Krishi Vikas Yojana',
    desc: 'Promotes organic farming through cluster approach and PGS certification.',
    icon: '🌿',
    color: 'bg-accent',
  },
  {
    name: 'Soil Health Card Scheme',
    desc: 'Provides soil health cards to farmers with crop-wise nutrient recommendations.',
    icon: '🧪',
    color: 'bg-secondary',
  },
  {
    name: 'National Organic Farming Mission',
    desc: 'Financial assistance for organic input production and certification support.',
    icon: '🏛️',
    color: 'bg-green-pale',
  },
];

const futureScope = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'IoT-Based Smart Farming',
    desc: 'Real-time soil moisture, temperature, and crop health monitoring using IoT sensors for precision agriculture.',
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'AI Chatbot for Farmers',
    desc: 'Multilingual AI assistant supporting local languages to answer farming queries and provide personalized guidance.',
  },
  {
    icon: <Link2 className="w-8 h-8" />,
    title: 'Blockchain Supply Chain',
    desc: 'Transparent, tamper-proof tracking of organic produce from farm to consumer using blockchain technology.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community Knowledge Platform',
    desc: 'Peer-to-peer knowledge sharing platform where farmers exchange tips, experiences, and best practices.',
  },
  {
    icon: <Store className="w-8 h-8" />,
    title: 'B2B & B2C Marketplace',
    desc: 'Expanded marketplace connecting farmers directly with retailers, restaurants, and end consumers.',
  },
];

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState('North India');

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/assets/generated/hero-farm.dim_1400x600.png')" }}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Welcome to Agro Crops
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-merriweather leading-tight">
            Grow Organic,<br />
            <span className="text-green-light">Live Healthy</span>
          </h1>
          <p className="text-white/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Your complete platform for organic farming guidance, quality seeds, and sustainable agriculture practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/farm"
              className="inline-flex items-center gap-2 gradient-green text-white px-8 py-3.5 rounded-xl font-semibold shadow-green hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Farming <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Why Choose Organic Farming?</h2>
            <p className="section-subtitle">
              Discover the transformative benefits of organic farming for your health, income, and the environment.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} animation="zoomIn" delay={i * 100}>
                <div className="eco-card p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center mx-auto mb-4 text-white shadow-green">
                    {b.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Region-wise Crops */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Region-wise Organic Crops</h2>
            <p className="section-subtitle">
              Explore the best organic crops suited for your region and season.
            </p>
          </AnimatedSection>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Object.keys(regionCrops).map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedRegion === region
                    ? 'gradient-green text-white shadow-green'
                    : 'bg-background text-muted-foreground border border-border hover:border-primary hover:text-primary'
                }`}
              >
                <MapPin className="w-3 h-3 inline mr-1" />
                {region}
              </button>
            ))}
          </div>

          <AnimatedSection animation="zoomIn" key={selectedRegion}>
            <div className="eco-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-green rounded-xl flex items-center justify-center text-white shadow-green">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg font-merriweather">{selectedRegion}</h3>
                  <p className="text-muted-foreground text-sm">Season: {regionCrops[selectedRegion].season}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {regionCrops[selectedRegion].crops.map(crop => (
                  <span
                    key={crop}
                    className="px-4 py-2 bg-green-pale text-primary rounded-full text-sm font-medium border border-primary/20"
                  >
                    🌿 {crop}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Government Schemes for Farmers</h2>
            <p className="section-subtitle">
              Take advantage of these government initiatives designed to support organic farmers across India.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {schemes.map((scheme, i) => (
              <AnimatedSection key={scheme.name} animation="slideUp" delay={i * 100}>
                <div className={`eco-card p-6 h-full`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${scheme.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                      {scheme.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 font-merriweather">{scheme.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{scheme.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Future of Agro Crops</h2>
            <p className="section-subtitle">
              We're building the next generation of smart farming tools to empower every Indian farmer.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {futureScope.map((item, i) => (
              <AnimatedSection key={item.title} animation="zoomIn" delay={i * 100}>
                <div className="eco-card p-6 h-full">
                  <div className="w-14 h-14 gradient-green rounded-2xl flex items-center justify-center mb-4 text-white shadow-green">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-merriweather">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Callout */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="zoomIn">
            <div className="gradient-green rounded-3xl p-10 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-white" />
                <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-white" />
              </div>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🌾</div>
                <h2 className="text-3xl font-bold mb-3 font-merriweather">Ready to Start Your Organic Journey?</h2>
                <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
                  Our experts are here to guide you every step of the way. Get in touch with us today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a
                    href="mailto:kharatchaitanya03@gmail.com"
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/30"
                  >
                    <Mail className="w-4 h-4" />
                    kharatchaitanya03@gmail.com
                  </a>
                  <a
                    href="tel:+918421016006"
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/30"
                  >
                    <Phone className="w-4 h-4" />
                    +91 8421016006
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
                >
                  Contact Us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
