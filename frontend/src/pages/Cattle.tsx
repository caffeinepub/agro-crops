import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const animals = [
  {
    name: 'Cow',
    emoji: '🐄',
    image: '/assets/generated/animal-cow.dim_400x300.png',
    breed: 'Gir, Sahiwal, Red Sindhi',
    summary: 'Cows are the backbone of Indian organic farming, providing milk, dung for manure, and urine for bio-pesticides.',
    food: 'Green fodder (napier grass, maize), dry fodder (wheat straw), mineral supplements, clean water',
    care: 'Daily grooming, regular deworming, vaccination schedule, clean shelter with proper ventilation',
    details: 'Organic cow farming focuses on natural feeding, stress-free environment, and avoiding synthetic hormones. Cow dung is used to make vermicompost and biogas. Cow urine (Gomutra) is used as a natural pesticide. Milk yield improves with proper nutrition and care.',
  },
  {
    name: 'Buffalo',
    emoji: '🐃',
    image: '/assets/generated/animal-buffalo.dim_400x300.png',
    breed: 'Murrah, Surti, Nili-Ravi',
    summary: 'Buffaloes produce high-fat milk ideal for dairy products and are excellent draft animals for farm work.',
    food: 'Green fodder, silage, concentrate feed, mineral mixture, plenty of water (60–80 liters/day)',
    care: 'Regular bathing, wallowing facility, hoof trimming, vaccination against FMD and HS',
    details: 'Buffalo milk has higher fat content (6–8%) than cow milk, making it valuable for ghee and paneer production. They are more heat-tolerant and disease-resistant. Organic buffalo farming avoids growth hormones and uses natural breeding methods.',
  },
  {
    name: 'Goat',
    emoji: '🐐',
    image: '/assets/generated/animal-goat.dim_400x300.png',
    breed: 'Jamunapari, Beetal, Sirohi',
    summary: 'Goats are ideal for small farmers — low investment, high returns, and adaptable to various climates.',
    food: 'Leaves, shrubs, grass, legume hay, kitchen waste, mineral licks',
    care: 'Deworming every 3 months, vaccination, clean dry housing, separate kids from adults',
    details: 'Goat farming requires minimal investment and space. Goat milk is easily digestible and has medicinal properties. Goat manure is an excellent organic fertilizer. They can be raised on marginal lands unsuitable for other livestock.',
  },
  {
    name: 'Sheep',
    emoji: '🐑',
    image: '/assets/generated/animal-goat.dim_400x300.png',
    breed: 'Merino, Deccani, Nellore',
    summary: 'Sheep provide wool, meat, and manure. They are excellent for grazing and maintaining pasture health.',
    food: 'Pasture grass, legume hay, grain supplements during pregnancy, salt licks',
    care: 'Shearing twice yearly, foot rot prevention, vaccination, protection from predators',
    details: 'Organic sheep farming emphasizes natural grazing on chemical-free pastures. Sheep manure is rich in nitrogen and phosphorus. Wool from organically raised sheep commands premium prices in international markets.',
  },
  {
    name: 'Poultry',
    emoji: '🐓',
    image: '/assets/generated/animal-poultry.dim_400x300.png',
    breed: 'Kadaknath, Aseel, Gramapriya',
    summary: 'Free-range organic poultry provides eggs, meat, and manure while controlling insects in the farm.',
    food: 'Grains (maize, sorghum), kitchen scraps, insects, green vegetables, calcium supplements',
    care: 'Free-range access, clean water, nesting boxes, protection from predators, natural light',
    details: 'Organic poultry farming avoids antibiotics and synthetic growth promoters. Free-range chickens naturally control pests and weeds. Poultry manure is a fast-acting organic fertilizer. Eggs from free-range birds have higher nutritional value.',
  },
];

const benefits = [
  { icon: '🌱', text: 'Organic manure improves soil fertility naturally' },
  { icon: '💰', text: 'Premium prices for organic dairy and meat products' },
  { icon: '🏥', text: 'Healthier animals with fewer diseases' },
  { icon: '🌍', text: 'Reduced environmental impact from farming' },
  { icon: '🔄', text: 'Integrated farming creates a sustainable cycle' },
  { icon: '🐝', text: 'Supports biodiversity and natural ecosystems' },
];

export default function Cattle() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = animals.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="gradient-green py-16 px-4 text-center">
        <AnimatedSection animation="fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            🐄 Cattle Care
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
            Organic Cattle Rearing
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Learn about organic animal husbandry practices for healthier livestock and better farm productivity.
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
            placeholder="Search animals..."
            className="search-input pl-12"
          />
        </div>
      </section>

      {/* Animal Cards */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No animals found</h3>
              <p className="text-muted-foreground">Try searching for cow, buffalo, goat, or poultry</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((animal, i) => (
                <AnimatedSection key={animal.name} animation="slideUp" delay={i * 100}>
                  <div className="eco-card overflow-hidden flex flex-col h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={animal.image}
                        alt={animal.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 gradient-hero opacity-40" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className="text-2xl">{animal.emoji}</span>
                        <div>
                          <h3 className="text-white font-bold text-lg font-merriweather">{animal.name}</h3>
                          <p className="text-white/80 text-xs">{animal.breed}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{animal.summary}</p>

                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-1">🌾 Food & Nutrition</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{animal.food}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-1">🏥 Basic Care</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{animal.care}</p>
                        </div>
                      </div>

                      {expanded === animal.name && (
                        <div className="mb-4 p-3 bg-green-pale/50 rounded-xl animate-slideUp">
                          <p className="text-xs font-semibold text-foreground mb-1">📋 Detailed Information</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{animal.details}</p>
                        </div>
                      )}

                      <button
                        onClick={() => setExpanded(expanded === animal.name ? null : animal.name)}
                        className="mt-auto flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                      >
                        {expanded === animal.name ? (
                          <><ChevronUp className="w-4 h-4" /> View Less</>
                        ) : (
                          <><ChevronDown className="w-4 h-4" /> View More</>
                        )}
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
            <h2 className="section-title text-foreground">Benefits of Organic Cattle Rearing</h2>
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
