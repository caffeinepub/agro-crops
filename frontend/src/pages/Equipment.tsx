import { useState } from 'react';
import { Search } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const equipment = [
  {
    name: 'Tractor',
    emoji: '🚜',
    image: '/assets/generated/equipment-tractor.dim_400x300.png',
    category: 'Heavy Machinery',
    desc: 'The backbone of modern farming. Used for ploughing, tilling, sowing, and transporting produce across large fields.',
    uses: ['Land preparation', 'Seed sowing', 'Crop harvesting', 'Material transport'],
    power: '35–75 HP',
    suitable: 'Large farms (5+ acres)',
  },
  {
    name: 'Plough',
    emoji: '⚙️',
    image: '/assets/generated/equipment-plough.dim_400x300.png',
    category: 'Tillage Tool',
    desc: 'Essential for breaking and turning soil before planting. Organic farming uses disc and mould-board ploughs to incorporate crop residues.',
    uses: ['Soil turning', 'Weed burial', 'Residue incorporation', 'Seedbed preparation'],
    power: 'Tractor-mounted',
    suitable: 'All farm sizes',
  },
  {
    name: 'Thresher',
    emoji: '🌾',
    image: '/assets/generated/equipment-thresher.dim_400x300.png',
    category: 'Harvesting Equipment',
    desc: 'Separates grain from stalks and husks efficiently. Reduces post-harvest losses and saves significant labor time during harvest season.',
    uses: ['Grain separation', 'Straw collection', 'Seed cleaning', 'Reducing harvest loss'],
    power: '5–15 HP engine',
    suitable: 'Medium to large farms',
  },
  {
    name: 'Sprayer',
    emoji: '💧',
    image: '/assets/generated/equipment-sprayer.dim_400x300.png',
    category: 'Crop Protection',
    desc: 'Used to apply organic pesticides, neem oil, and liquid fertilizers uniformly across crops. Available in manual, battery, and tractor-mounted versions.',
    uses: ['Organic pesticide application', 'Foliar fertilization', 'Disease control', 'Weed management'],
    power: 'Manual / Battery / Engine',
    suitable: 'All farm sizes',
  },
  {
    name: 'Seed Drill',
    emoji: '🌱',
    image: '/assets/generated/equipment-plough.dim_400x300.png',
    category: 'Sowing Equipment',
    desc: 'Ensures precise seed placement at correct depth and spacing, improving germination rates and reducing seed wastage.',
    uses: ['Precise seed sowing', 'Uniform spacing', 'Depth control', 'Fertilizer placement'],
    power: 'Tractor-mounted',
    suitable: 'Medium to large farms',
  },
  {
    name: 'Rotavator',
    emoji: '🔄',
    image: '/assets/generated/equipment-tractor.dim_400x300.png',
    category: 'Tillage Tool',
    desc: 'Breaks clods and prepares fine seedbed in one pass. Ideal for incorporating organic matter and preparing land quickly.',
    uses: ['Seedbed preparation', 'Organic matter mixing', 'Weed control', 'Soil aeration'],
    power: 'Tractor-mounted',
    suitable: 'All farm sizes',
  },
];

const maintenanceTips = [
  { icon: '🔧', text: 'Clean equipment after every use to prevent rust and contamination' },
  { icon: '🛢️', text: 'Lubricate moving parts regularly with food-grade or organic lubricants' },
  { icon: '🔍', text: 'Inspect for wear and damage before each season begins' },
  { icon: '📦', text: 'Store in dry, covered areas to protect from weather damage' },
  { icon: '📋', text: 'Keep maintenance logs for each piece of equipment' },
  { icon: '👨‍🔧', text: 'Get annual professional servicing for heavy machinery' },
];

export default function Equipment() {
  const [search, setSearch] = useState('');

  const filtered = equipment.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="gradient-green py-16 px-4 text-center">
        <AnimatedSection animation="fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            🔧 Farm Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
            Farm Equipment
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Explore essential farming equipment and tools for efficient organic farming operations.
          </p>
        </AnimatedSection>
      </section>

      {/* Search */}
      <section className="py-8 px-4 bg-green-pale/30">
        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search equipment..."
            className="search-input pl-12"
          />
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No equipment found</h3>
              <p className="text-muted-foreground">Try searching for tractor, plough, thresher, or sprayer</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <AnimatedSection key={item.name} animation="slideUp" delay={i * 100}>
                  <div className="eco-card overflow-hidden flex flex-col h-full group">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 w-10 h-10 gradient-green rounded-xl flex items-center justify-center text-xl shadow-green">
                        {item.emoji}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-foreground mb-2 font-merriweather">{item.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-1.5">Key Uses:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.uses.map(use => (
                              <span key={use} className="text-xs bg-green-pale text-primary px-2 py-1 rounded-lg font-medium">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                          <span>⚡ {item.power}</span>
                          <span>🌾 {item.suitable}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="section-padding bg-green-pale/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">Equipment Maintenance Tips</h2>
            <p className="section-subtitle">
              Proper maintenance extends equipment life and ensures safe, efficient operation.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {maintenanceTips.map((tip, i) => (
              <AnimatedSection key={tip.text} animation="slideInLeft" delay={i * 80}>
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card border border-border/50">
                  <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                  <span className="text-foreground text-sm font-medium">{tip.text}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="zoomIn">
            <div className="gradient-green rounded-3xl p-8 md:p-10 text-center text-white">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-3 font-merriweather">Safety First</h2>
              <p className="text-white/85 leading-relaxed max-w-xl mx-auto mb-6">
                Always wear appropriate protective gear when operating farm equipment. Read the operator's manual
                before use and ensure all safety guards are in place.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Wear safety goggles', 'Use ear protection', 'Keep bystanders away', 'Check fuel/oil levels'].map(item => (
                  <span key={item} className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-medium">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
