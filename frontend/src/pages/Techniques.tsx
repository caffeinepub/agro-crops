import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const techniques = [
  {
    emoji: '♻️',
    title: 'Composting',
    subtitle: 'Nature\'s Recycling System',
    desc: 'Composting transforms organic waste into nutrient-rich fertilizer. By decomposing kitchen scraps, crop residues, and animal manure, farmers create a powerful soil amendment that improves structure, water retention, and microbial activity.',
    steps: ['Collect organic waste', 'Layer greens and browns', 'Maintain moisture', 'Turn regularly', 'Apply to soil'],
    color: 'border-primary',
    bg: 'bg-green-pale',
  },
  {
    emoji: '🐛',
    title: 'Pest Control',
    subtitle: 'Natural Defense Strategies',
    desc: 'Organic pest control uses biological, cultural, and mechanical methods to manage pests without synthetic chemicals. This includes companion planting, beneficial insects, neem-based sprays, and crop rotation to break pest cycles.',
    steps: ['Identify pests early', 'Use neem oil spray', 'Introduce beneficial insects', 'Plant companion crops', 'Physical barriers'],
    color: 'border-brown-warm',
    bg: 'bg-brown-light/10',
  },
  {
    emoji: '🔄',
    title: 'Crop Rotation',
    subtitle: 'Soil Renewal Through Diversity',
    desc: 'Crop rotation involves growing different crops in the same field across seasons. This practice prevents soil depletion, breaks pest and disease cycles, improves soil structure, and reduces the need for external inputs.',
    steps: ['Plan seasonal rotation', 'Alternate crop families', 'Include legumes', 'Track soil health', 'Adjust annually'],
    color: 'border-chart-2',
    bg: 'bg-accent',
  },
];

const additionalTechniques = [
  { emoji: '🌊', title: 'Drip Irrigation', desc: 'Water-efficient irrigation delivering water directly to roots.' },
  { emoji: '🌻', title: 'Cover Cropping', desc: 'Planting cover crops to protect and enrich soil between seasons.' },
  { emoji: '🐝', title: 'Pollinator Gardens', desc: 'Attracting bees and butterflies to improve crop yields naturally.' },
  { emoji: '🌱', title: 'Mulching', desc: 'Covering soil with organic material to retain moisture and suppress weeds.' },
];

export default function Techniques() {
  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="gradient-green py-16 px-4 text-center">
        <AnimatedSection animation="fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            🌿 Organic Techniques
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
            Farming Techniques
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Master these proven organic farming techniques to maximize yield while protecting the environment.
          </p>
        </AnimatedSection>
      </section>

      {/* Main Techniques */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {techniques.map((tech, i) => (
              <AnimatedSection key={tech.title} animation="slideUp" delay={i * 100}>
                <div className={`eco-card p-8 border-l-4 ${tech.color}`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`w-20 h-20 ${tech.bg} rounded-2xl flex items-center justify-center text-4xl flex-shrink-0`}>
                      {tech.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h2 className="text-2xl font-bold text-foreground font-merriweather">{tech.title}</h2>
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit">
                          {tech.subtitle}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">{tech.desc}</p>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Key Steps:</p>
                        <div className="flex flex-wrap gap-2">
                          {tech.steps.map((step, si) => (
                            <span key={step} className="flex items-center gap-1.5 text-xs bg-green-pale text-primary px-3 py-1.5 rounded-full font-medium">
                              <span className="w-4 h-4 gradient-green text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {si + 1}
                              </span>
                              {step}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Techniques */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">More Organic Practices</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {additionalTechniques.map((t, i) => (
              <AnimatedSection key={t.title} animation="zoomIn" delay={i * 100}>
                <div className="eco-card p-6 text-center h-full">
                  <div className="text-4xl mb-3">{t.emoji}</div>
                  <h3 className="font-semibold text-foreground mb-2">{t.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background text-center">
        <AnimatedSection animation="zoomIn">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-merriweather">
              Ready to Apply These Techniques?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get all the organic seeds, fertilizers, and tools you need to implement these techniques on your farm.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 gradient-green text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-green hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Categories <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
