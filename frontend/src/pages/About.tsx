import { Target, Eye, Heart, Users, Award, Sprout, Mail, Phone } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const team = [
  { name: 'Dr. Ramesh Kumar', role: 'Founder & Agronomist', emoji: '👨‍🌾' },
  { name: 'Priya Sharma', role: 'Organic Farming Expert', emoji: '👩‍🔬' },
  { name: 'Arjun Patel', role: 'Technology Lead', emoji: '👨‍💻' },
];

const stats = [
  { value: '10,000+', label: 'Farmers Helped', icon: <Users className="w-5 h-5" /> },
  { value: '50+', label: 'Crop Varieties', icon: <Sprout className="w-5 h-5" /> },
  { value: '15+', label: 'States Covered', icon: <Award className="w-5 h-5" /> },
  { value: '5 Years', label: 'Of Excellence', icon: <Heart className="w-5 h-5" /> },
];

export default function About() {
  return (
    <div className="overflow-x-hidden">
      {/* Green Gradient Header */}
      <section className="gradient-green py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white" />
        </div>
        <AnimatedSection animation="fadeIn">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              🌿 About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
              About Agro Crops
            </h1>
            <p className="text-white/85 text-lg leading-relaxed">
              We are on a mission to transform Indian agriculture through organic farming practices,
              empowering farmers with knowledge, technology, and market access.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-green-pale/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} animation="zoomIn" delay={i * 100}>
              <div className="text-center">
                <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-green">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary font-merriweather">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Our Mission & Vision</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <AnimatedSection animation="slideInLeft" delay={100}>
              <div className="eco-card p-8 h-full border-l-4 border-primary">
                <div className="w-14 h-14 gradient-green rounded-2xl flex items-center justify-center mb-5 shadow-green">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-merriweather">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To empower every Indian farmer with accessible, affordable, and actionable organic farming knowledge
                  that improves their livelihoods while protecting our planet.
                </p>
                <ul className="space-y-2">
                  {[
                    'Provide free organic farming guidance',
                    'Connect farmers with quality organic inputs',
                    'Support sustainable agricultural practices',
                    'Bridge the gap between farmers and markets',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight" delay={200}>
              <div className="eco-card p-8 h-full border-l-4 border-brown-warm">
                <div className="w-14 h-14 bg-brown-light/20 rounded-2xl flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-brown-warm" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-merriweather">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A future where every farm in India is organic, every farmer is prosperous, and every consumer
                  has access to safe, nutritious, and sustainably grown food.
                </p>
                <ul className="space-y-2">
                  {[
                    'India as a global leader in organic farming',
                    'Zero chemical pesticide usage by 2035',
                    'Farmer income doubled through organic premium',
                    'Healthy food for every Indian household',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-brown-warm mt-0.5">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Our Core Values</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              { emoji: '🌱', title: 'Sustainability', desc: 'Every decision we make considers long-term environmental impact.' },
              { emoji: '🤝', title: 'Community', desc: 'We believe in the power of farmers helping farmers.' },
              { emoji: '💡', title: 'Innovation', desc: 'Combining traditional wisdom with modern technology.' },
            ].map((val, i) => (
              <AnimatedSection key={val.title} animation="zoomIn" delay={i * 150}>
                <div className="eco-card p-6 text-center h-full">
                  <div className="text-4xl mb-4">{val.emoji}</div>
                  <h3 className="font-semibold text-foreground text-lg mb-2 font-merriweather">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Meet Our Team</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} animation="zoomIn" delay={i * 150}>
                <div className="eco-card p-6 text-center h-full">
                  <div className="text-5xl mb-4">{member.emoji}</div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm mt-1">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Get in Touch</h2>
            <p className="section-subtitle">
              Have questions or want to collaborate? Reach out to us directly — we'd love to hear from you.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <AnimatedSection animation="slideInLeft" delay={100}>
              <a
                href="mailto:kharatchaitanya03@gmail.com"
                className="eco-card p-6 flex items-center gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-green">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Email Us</p>
                  <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                    kharatchaitanya03@gmail.com
                  </p>
                </div>
              </a>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight" delay={200}>
              <a
                href="tel:+918421016006"
                className="eco-card p-6 flex items-center gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-green">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Call Us</p>
                  <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                    +91 8421016006
                  </p>
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
