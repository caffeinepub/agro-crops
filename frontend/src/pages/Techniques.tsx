import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';

const techniques = [
  {
    id: 1, icon: '🌿', name: 'Composting',
    overview: 'Transform organic waste into nutrient-rich compost to improve soil health and fertility naturally.',
    steps: ['Collect organic waste (kitchen scraps, crop residues)', 'Layer green and brown materials alternately', 'Maintain moisture and aerate regularly', 'Turn pile every 2-3 weeks', 'Compost is ready in 2-3 months'],
    benefits: ['Improves soil structure', 'Increases microbial activity', 'Reduces chemical fertilizer need', 'Recycles farm waste'],
    tools: ['Compost bin or pit', 'Pitchfork', 'Water source', 'Organic waste materials'],
    proTip: 'Maintain a 3:1 ratio of brown to green materials for optimal decomposition.',
  },
  {
    id: 2, icon: '🐛', name: 'Natural Pest Control',
    overview: 'Use biological and botanical methods to manage pests without harmful chemicals.',
    steps: ['Identify pest species correctly', 'Introduce beneficial insects (ladybugs, lacewings)', 'Apply neem oil spray', 'Use sticky traps for monitoring', 'Plant companion crops as deterrents'],
    benefits: ['No chemical residues', 'Preserves beneficial insects', 'Cost-effective', 'Environmentally safe'],
    tools: ['Neem oil', 'Spray pump', 'Sticky traps', 'Beneficial insect colonies'],
    proTip: 'Spray neem oil in the evening to avoid harming beneficial pollinators.',
  },
  {
    id: 3, icon: '🔄', name: 'Crop Rotation',
    overview: 'Systematically change crops in a field each season to maintain soil health and break pest cycles.',
    steps: ['Plan 3-4 year rotation schedule', 'Alternate legumes with cereals', 'Include cover crops in rotation', 'Document crop history per plot', 'Adjust based on soil test results'],
    benefits: ['Breaks pest and disease cycles', 'Improves soil nitrogen', 'Reduces weed pressure', 'Increases overall yield'],
    tools: ['Farm map/planner', 'Soil testing kit', 'Crop calendar', 'Record keeping system'],
    proTip: 'Always follow a nitrogen-fixing legume with a heavy feeder like corn or wheat.',
  },
  {
    id: 4, icon: '🍂', name: 'Mulching',
    overview: 'Cover soil with organic materials to retain moisture, suppress weeds, and improve soil quality.',
    steps: ['Clear weeds from the area', 'Water the soil thoroughly', 'Apply 3-4 inch layer of mulch', 'Keep mulch away from plant stems', 'Replenish as mulch decomposes'],
    benefits: ['Retains soil moisture', 'Suppresses weed growth', 'Regulates soil temperature', 'Adds organic matter'],
    tools: ['Straw or hay', 'Wood chips', 'Dried leaves', 'Plastic mulch film'],
    proTip: 'Use black plastic mulch for warm-season crops to increase soil temperature.',
  },
  {
    id: 5, icon: '🌾', name: 'Green Manuring',
    overview: 'Grow and incorporate specific plants into soil to add nutrients and organic matter.',
    steps: ['Select appropriate green manure crop', 'Sow seeds at recommended density', 'Allow to grow for 6-8 weeks', 'Incorporate before flowering', 'Wait 2-3 weeks before planting main crop'],
    benefits: ['Adds nitrogen to soil', 'Improves soil structure', 'Suppresses weeds', 'Increases organic matter'],
    tools: ['Legume seeds (dhaincha, sunhemp)', 'Tractor/cultivator', 'Irrigation system'],
    proTip: 'Dhaincha (Sesbania) is excellent for waterlogged conditions and adds 80-100 kg N/ha.',
  },
  {
    id: 6, icon: '💧', name: 'Drip Irrigation',
    overview: 'Deliver water directly to plant roots through a network of pipes and emitters for maximum efficiency.',
    steps: ['Design system layout for your field', 'Install main and sub-main pipes', 'Place drip laterals along crop rows', 'Install filters and pressure regulators', 'Monitor and maintain regularly'],
    benefits: ['Saves 40-60% water', 'Reduces weed growth', 'Prevents fungal diseases', 'Enables fertigation'],
    tools: ['Drip pipes and emitters', 'Filter unit', 'Pressure gauge', 'Fertilizer tank'],
    proTip: 'Flush drip lines weekly to prevent clogging from mineral deposits.',
  },
  {
    id: 7, icon: '🪱', name: 'Vermicomposting',
    overview: 'Use earthworms to convert organic waste into high-quality compost (vermicast).',
    steps: ['Set up vermicompost bed (1m x 2m)', 'Add bedding material (coir, straw)', 'Introduce red wigglers (Eisenia fetida)', 'Add organic waste in thin layers', 'Harvest vermicast after 45-60 days'],
    benefits: ['High nutrient content', 'Improves soil biology', 'Fast decomposition', 'Excellent plant growth promoter'],
    tools: ['Vermicompost bed/bin', 'Red wiggler worms', 'Organic waste', 'Moisture meter'],
    proTip: 'Maintain moisture at 60-70% and temperature between 15-25°C for optimal worm activity.',
  },
  {
    id: 8, icon: '🦠', name: 'Biofertilizers',
    overview: 'Use beneficial microorganisms to enhance soil fertility and plant nutrient uptake.',
    steps: ['Select appropriate biofertilizer (Rhizobium, PSB, etc.)', 'Mix with carrier material', 'Apply as seed treatment or soil application', 'Store in cool, dark place', 'Use within expiry date'],
    benefits: ['Fixes atmospheric nitrogen', 'Solubilizes phosphorus', 'Improves root growth', 'Reduces chemical fertilizer need'],
    tools: ['Rhizobium culture', 'Azospirillum', 'PSB (Phosphate Solubilizing Bacteria)', 'Mycorrhiza'],
    proTip: 'Never mix biofertilizers with chemical fertilizers or fungicides as they kill beneficial microbes.',
  },
  {
    id: 9, icon: '🌱', name: 'Intercropping',
    overview: 'Grow two or more crops simultaneously in the same field to maximize land use and reduce risks.',
    steps: ['Select compatible crop combinations', 'Plan row arrangements', 'Adjust plant spacing accordingly', 'Manage nutrients for both crops', 'Harvest at different times'],
    benefits: ['Maximizes land use', 'Reduces pest pressure', 'Provides income security', 'Improves biodiversity'],
    tools: ['Seed drill', 'Row markers', 'Crop planning chart'],
    proTip: 'Pair tall crops with short ones (maize + beans) for optimal light utilization.',
  },
  {
    id: 10, icon: '🌧️', name: 'Rainwater Harvesting',
    overview: 'Collect and store rainwater for agricultural use during dry periods.',
    steps: ['Assess catchment area and rainfall', 'Design storage structure (farm pond)', 'Construct bunds and channels', 'Install filtration system', 'Connect to irrigation network'],
    benefits: ['Water security during drought', 'Reduces irrigation costs', 'Recharges groundwater', 'Prevents soil erosion'],
    tools: ['Farm pond liner', 'Earthmoving equipment', 'Pipes and pumps', 'Water level gauge'],
    proTip: 'A 1-acre farm pond can store enough water to irrigate 5-7 acres during dry spells.',
  },
  {
    id: 11, icon: '⚗️', name: 'Soil pH Management',
    overview: 'Monitor and adjust soil pH to optimize nutrient availability for crops.',
    steps: ['Test soil pH using kit or lab', 'Identify target pH for your crop', 'Apply lime to raise pH (acidic soil)', 'Apply sulfur to lower pH (alkaline soil)', 'Retest after 3-6 months'],
    benefits: ['Optimizes nutrient availability', 'Improves fertilizer efficiency', 'Enhances microbial activity', 'Increases crop yield'],
    tools: ['pH testing kit', 'Agricultural lime', 'Sulfur powder', 'Spreader'],
    proTip: 'Most crops prefer pH 6.0-7.0. Test soil every 2-3 years for best results.',
  },
  {
    id: 12, icon: '🌰', name: 'Seed Treatment & Selection',
    overview: 'Treat and select quality seeds to improve germination, disease resistance, and yield.',
    steps: ['Select certified, disease-free seeds', 'Test germination rate', 'Treat with fungicide/biofertilizer', 'Dry treated seeds in shade', 'Store in cool, dry conditions'],
    benefits: ['Better germination rate', 'Disease protection', 'Uniform crop stand', 'Higher yield potential'],
    tools: ['Seed treatment drum', 'Fungicide/biofertilizer', 'Germination tray', 'Moisture meter'],
    proTip: 'Always use seeds with >85% germination rate for commercial crops.',
  },
];

export default function Techniques() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-eco-primary py-16 text-white text-center">
        <AnimatedSection animation="slideUp">
          <h1 className="text-4xl font-display font-bold mb-4">{t('techniquesTitle')}</h1>
          <p className="text-white/80 max-w-2xl mx-auto">{t('techniquesSubtitle')}</p>
        </AnimatedSection>
      </section>

      {/* Techniques Grid */}
      <section className="py-16 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((tech, i) => (
              <AnimatedSection key={tech.id} animation="fadeIn" delay={i * 60}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{tech.icon}</span>
                      <h3 className="font-bold text-eco-dark text-lg">{tech.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{tech.overview}</p>
                    <button
                      onClick={() => setExpanded(expanded === tech.id ? null : tech.id)}
                      className="flex items-center gap-1 text-eco-primary font-medium text-sm hover:underline"
                    >
                      {expanded === tech.id ? t('hideGuide') : t('viewFullGuide')}
                      {expanded === tech.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {expanded === tech.id && (
                    <div className="border-t border-eco-primary/10 p-6 bg-eco-light space-y-4">
                      <div>
                        <h4 className="font-semibold text-eco-dark mb-2">📋 {t('steps')}</h4>
                        <ol className="space-y-1">
                          {tech.steps.map((step, j) => (
                            <li key={j} className="text-sm text-gray-700 flex gap-2">
                              <span className="text-eco-primary font-bold">{j + 1}.</span> {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold text-eco-dark mb-2">✅ {t('benefits')}</h4>
                        <ul className="space-y-1">
                          {tech.benefits.map((b, j) => (
                            <li key={j} className="text-sm text-gray-700 flex gap-2">
                              <span className="text-eco-secondary">•</span> {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-eco-dark mb-2">🔧 {t('tools')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {tech.tools.map((tool, j) => (
                            <span key={j} className="bg-white text-eco-dark text-xs px-2 py-1 rounded-full border border-eco-primary/20">{tool}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-eco-primary/10 rounded-xl p-3">
                        <h4 className="font-semibold text-eco-primary mb-1">💡 {t('proTip')}</h4>
                        <p className="text-sm text-gray-700">{tech.proTip}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-eco-dark text-white text-center">
        <AnimatedSection animation="fadeIn">
          <h2 className="text-2xl font-display font-bold mb-3">Ready to Transform Your Farm?</h2>
          <p className="text-white/80 mb-6">Apply these techniques and see the difference in your harvest.</p>
          <a href="/contact" className="eco-btn-secondary inline-block">Contact Our Experts</a>
        </AnimatedSection>
      </section>
    </div>
  );
}
