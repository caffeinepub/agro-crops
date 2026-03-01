import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';

const crops = [
  { name: 'Wheat', season: 'Rabi (Oct-Mar)', soil: 'Loamy, Clay Loam', benefits: 'High protein, staple food', tips: 'Irrigate at crown root initiation stage' },
  { name: 'Rice', season: 'Kharif (Jun-Nov)', soil: 'Clay, Clayey Loam', benefits: 'Staple food, high yield', tips: 'Maintain 5cm water level during tillering' },
  { name: 'Maize', season: 'Kharif/Rabi', soil: 'Sandy Loam, Loam', benefits: 'Versatile crop, animal feed', tips: 'Ensure proper drainage to avoid waterlogging' },
  { name: 'Sugarcane', season: 'Year-round', soil: 'Deep Loam, Clay Loam', benefits: 'High income, sugar production', tips: 'Ratoon crop management saves replanting cost' },
  { name: 'Cotton', season: 'Kharif (May-Nov)', soil: 'Black Cotton Soil', benefits: 'Cash crop, fiber production', tips: 'Monitor for bollworm regularly' },
  { name: 'Soybean', season: 'Kharif (Jun-Sep)', soil: 'Well-drained Loam', benefits: 'High protein, nitrogen fixation', tips: 'Inoculate seeds with Rhizobium before sowing' },
  { name: 'Groundnut', season: 'Kharif/Rabi', soil: 'Sandy Loam', benefits: 'Oil crop, high protein', tips: 'Ensure calcium availability for pod development' },
  { name: 'Tomato', season: 'Year-round', soil: 'Sandy Loam, Loam', benefits: 'High value, vitamin rich', tips: 'Stake plants and prune suckers for better yield' },
  { name: 'Onion', season: 'Rabi (Oct-Apr)', soil: 'Sandy Loam, Loam', benefits: 'High demand, good storage', tips: 'Stop irrigation 10 days before harvest' },
  { name: 'Potato', season: 'Rabi (Oct-Mar)', soil: 'Sandy Loam, Loam', benefits: 'Versatile vegetable, high yield', tips: 'Earth up plants when 15cm tall' },
  { name: 'Mustard', season: 'Rabi (Oct-Feb)', soil: 'Sandy Loam, Loam', benefits: 'Oil crop, cold tolerant', tips: 'Apply sulfur fertilizer for better oil content' },
  { name: 'Sunflower', season: 'Kharif/Rabi', soil: 'Sandy Loam, Loam', benefits: 'Oil crop, drought tolerant', tips: 'Hand pollinate for better seed set' },
  { name: 'Chickpea', season: 'Rabi (Oct-Mar)', soil: 'Sandy Loam, Loam', benefits: 'Protein rich, nitrogen fixation', tips: 'Avoid excess moisture to prevent wilt' },
  { name: 'Lentil', season: 'Rabi (Oct-Mar)', soil: 'Sandy Loam, Loam', benefits: 'High protein, low water need', tips: 'Inoculate with Rhizobium for better yield' },
  { name: 'Jowar', season: 'Kharif (Jun-Oct)', soil: 'Medium to Heavy', benefits: 'Drought tolerant, animal feed', tips: 'Thin plants to 15cm spacing for best yield' },
  { name: 'Bajra', season: 'Kharif (Jun-Sep)', soil: 'Sandy, Sandy Loam', benefits: 'Drought tolerant, nutritious', tips: 'Grows well in low rainfall areas' },
  { name: 'Turmeric', season: 'Kharif (May-Nov)', soil: 'Loamy, Clay Loam', benefits: 'Medicinal value, high price', tips: 'Mulch with dry leaves to retain moisture' },
  { name: 'Ginger', season: 'Kharif (Apr-Dec)', soil: 'Sandy Loam, Loam', benefits: 'High value spice, medicinal', tips: 'Provide shade during summer months' },
  { name: 'Banana', season: 'Year-round', soil: 'Rich Loam, Clay Loam', benefits: 'High income, year-round harvest', tips: 'Remove suckers except one ratoon' },
  { name: 'Mango', season: 'Summer (Mar-Jun)', soil: 'Deep Loam, Laterite', benefits: 'High value fruit, long bearing', tips: 'Prune after harvest for better next season' },
  { name: 'Papaya', season: 'Year-round', soil: 'Sandy Loam, Loam', benefits: 'Fast growing, high yield', tips: 'Ensure good drainage to prevent root rot' },
  { name: 'Brinjal', season: 'Year-round', soil: 'Sandy Loam, Loam', benefits: 'High demand, nutritious', tips: 'Stake plants and monitor for shoot borer' },
];

export default function Farm() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = crops.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.season.toLowerCase().includes(search.toLowerCase()) ||
    c.soil.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-eco-primary py-16 text-white text-center">
        <AnimatedSection animation="slideUp">
          <h1 className="text-4xl font-display font-bold mb-4">{t('farmTitle')}</h1>
          <p className="text-white/80 max-w-2xl mx-auto">{t('farmSubtitle')}</p>
        </AnimatedSection>
      </section>

      {/* Search */}
      <section className="py-8 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative max-w-md mx-auto">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-eco-primary" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`${t('search')} crops...`}
              className="w-full pl-10 pr-4 py-3 border border-eco-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-primary bg-white"
            />
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-eco-primary/10">
            <table className="w-full">
              <thead className="bg-eco-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">{t('cropName')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">{t('season')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">{t('soilType')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">{t('cropBenefits')}</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold hidden xl:table-cell">{t('tips')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((crop, i) => (
                  <tr key={crop.name} className={i % 2 === 0 ? 'bg-white' : 'bg-eco-light/50'}>
                    <td className="px-4 py-3 font-medium text-eco-dark text-sm">{crop.name}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{crop.season}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm hidden md:table-cell">{crop.soil}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm hidden lg:table-cell">{crop.benefits}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm hidden xl:table-cell">{crop.tips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">No crops found matching your search.</div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-3">{filtered.length} crops found</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-2xl font-display font-bold text-eco-dark mb-6 text-center">Benefits of Organic Farming</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '🌱 Improves soil health and biodiversity',
              '💧 Conserves water resources',
              '🚫 Eliminates harmful chemical residues',
              '💰 Premium prices in organic markets',
              '🌍 Reduces carbon footprint',
              '🏥 Healthier food for consumers',
            ].map((benefit, i) => (
              <AnimatedSection key={i} animation="zoomIn" delay={i * 80}>
                <div className="bg-white rounded-xl p-4 shadow-sm text-sm text-gray-700">{benefit}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
