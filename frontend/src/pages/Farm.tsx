import { useState } from 'react';
import { Search, Leaf, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const crops = [
  {
    name: 'Wheat',
    emoji: '🌾',
    season: 'Rabi (Oct–Mar)',
    soil: 'Loamy, well-drained',
    guidance: 'Sow in October–November. Use organic compost at 5 tons/acre. Irrigate 4–6 times. Harvest when golden yellow.',
    tips: ['Use certified organic seeds', 'Apply neem cake for pest control', 'Rotate with legumes'],
  },
  {
    name: 'Rice',
    emoji: '🌾',
    season: 'Kharif (Jun–Nov)',
    soil: 'Clay, water-retentive',
    guidance: 'Transplant seedlings in June–July. Maintain 2–5 cm water level. Use green manure. Harvest at 80% grain maturity.',
    tips: ['Use SRI method for higher yield', 'Apply azolla as biofertilizer', 'Avoid waterlogging'],
  },
  {
    name: 'Maize',
    emoji: '🌽',
    season: 'Kharif & Rabi',
    soil: 'Sandy loam, fertile',
    guidance: 'Sow seeds 3–5 cm deep with 60×25 cm spacing. Apply vermicompost. Irrigate at critical stages. Harvest when husks dry.',
    tips: ['Intercrop with legumes', 'Use pheromone traps for pests', 'Mulch to retain moisture'],
  },
  {
    name: 'Sugarcane',
    emoji: '🎋',
    season: 'Year-round',
    soil: 'Deep loamy, fertile',
    guidance: 'Plant setts in February–March. Apply organic manure heavily. Earthing up at 3 months. Harvest at 10–12 months.',
    tips: ['Use trash mulching', 'Apply biofertilizers', 'Intercrop with short-duration crops'],
  },
  {
    name: 'Cotton',
    emoji: '🌸',
    season: 'Kharif (Apr–Nov)',
    soil: 'Black cotton soil',
    guidance: 'Sow in April–May. Use organic pest management. Apply compost at planting. Harvest bolls when fully open.',
    tips: ['Use Bt-free organic varieties', 'Spray neem oil for bollworm', 'Practice crop rotation'],
  },
  {
    name: 'Tomato',
    emoji: '🍅',
    season: 'Year-round',
    soil: 'Well-drained, loamy',
    guidance: 'Transplant 25-day seedlings. Apply vermicompost. Stake plants at 30 cm height. Harvest when fully red.',
    tips: ['Use drip irrigation', 'Apply Trichoderma for disease control', 'Remove suckers regularly'],
  },
  {
    name: 'Potato',
    emoji: '🥔',
    season: 'Rabi (Oct–Mar)',
    soil: 'Sandy loam, loose',
    guidance: 'Plant seed tubers in October. Apply organic manure in furrows. Earth up at 30 days. Harvest when tops die.',
    tips: ['Use certified disease-free seeds', 'Apply wood ash for potassium', 'Avoid waterlogging'],
  },
];

const benefits = [
  { icon: '🌱', text: 'Improves soil health and biodiversity' },
  { icon: '💧', text: 'Reduces water pollution from chemical runoff' },
  { icon: '🏥', text: 'Produces healthier, chemical-free food' },
  { icon: '💰', text: 'Commands 20–30% premium market prices' },
  { icon: '🌍', text: 'Reduces greenhouse gas emissions' },
  { icon: '🐝', text: 'Supports pollinators and beneficial insects' },
  { icon: '🔄', text: 'Creates a sustainable farming ecosystem' },
];

export default function Farm() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = crops.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="gradient-green py-16 px-4 text-center">
        <AnimatedSection animation="fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            🌾 Crop Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
            Organic Farm Guide
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Comprehensive guidance for growing crops organically. Search for your crop to get started.
          </p>
        </AnimatedSection>
      </section>

      {/* Intro */}
      <section className="py-10 px-4 bg-green-pale/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slideUp">
            <div className="eco-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-3 font-merriweather">
                🌿 Organic Farming Principles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">01.</span>
                  <span><strong className="text-foreground">No Synthetic Chemicals</strong> — Use only natural fertilizers and pesticides.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">02.</span>
                  <span><strong className="text-foreground">Biodiversity</strong> — Grow multiple crops to maintain ecological balance.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">03.</span>
                  <span><strong className="text-foreground">Soil First</strong> — Healthy soil is the foundation of organic farming.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Search Crops</h2>
            <div className="max-w-lg mx-auto mb-10 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search wheat, rice, maize..."
                className="search-input pl-12"
              />
            </div>
          </AnimatedSection>

          {filtered.length === 0 ? (
            <AnimatedSection animation="fadeIn">
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No crops found</h3>
                <p className="text-muted-foreground">Try searching for wheat, rice, maize, or tomato</p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((crop, i) => (
                <AnimatedSection key={crop.name} animation="slideUp" delay={i * 80}>
                  <div className="eco-card overflow-hidden h-full flex flex-col">
                    <div className="gradient-green p-5 flex items-center gap-3">
                      <span className="text-4xl">{crop.emoji}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white font-merriweather">{crop.name}</h3>
                        <span className="text-white/75 text-xs">{crop.season}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Leaf className="w-3.5 h-3.5 text-primary" />
                        <span>Soil: {crop.soil}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                        {crop.guidance}
                      </p>
                      {expanded === crop.name && (
                        <div className="mb-4 animate-slideUp">
                          <p className="text-xs font-semibold text-foreground mb-2">Organic Tips:</p>
                          <ul className="space-y-1">
                            {crop.tips.map(tip => (
                              <li key={tip} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button
                        onClick={() => setExpanded(expanded === crop.name ? null : crop.name)}
                        className="text-primary text-sm font-medium hover:underline text-left"
                      >
                        {expanded === crop.name ? '▲ Show Less' : '▼ Show Tips'}
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Benefits of Organic Farming</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.text} animation="slideInLeft" delay={i * 80}>
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <span className="text-2xl flex-shrink-0">{b.icon}</span>
                  <span className="text-foreground text-sm font-medium">{b.text}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
