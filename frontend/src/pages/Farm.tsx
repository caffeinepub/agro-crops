import React, { useState } from 'react';
import { Search, Leaf, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';

const crops = [
  { name: 'Wheat', season: 'Rabi (Winter)', soilType: 'Loamy', benefits: 'High protein, staple food', tips: 'Sow in October-November, ensure proper irrigation' },
  { name: 'Rice', season: 'Kharif (Monsoon)', soilType: 'Clay', benefits: 'Staple food, high yield', tips: 'Transplant seedlings, maintain water level' },
  { name: 'Cotton', season: 'Kharif (Monsoon)', soilType: 'Black Cotton', benefits: 'Cash crop, high value', tips: 'Use organic pest control, proper spacing' },
  { name: 'Sugarcane', season: 'Year-round', soilType: 'Loamy', benefits: 'High sugar content, multiple uses', tips: 'Plant in February-March, regular irrigation' },
  { name: 'Soybean', season: 'Kharif (Monsoon)', soilType: 'Well-drained', benefits: 'High protein, nitrogen fixation', tips: 'Inoculate seeds with Rhizobium bacteria' },
  { name: 'Tomato', season: 'Year-round', soilType: 'Sandy Loam', benefits: 'Rich in vitamins, high demand', tips: 'Use drip irrigation, stake plants properly' },
  { name: 'Onion', season: 'Rabi (Winter)', soilType: 'Sandy Loam', benefits: 'High market value, long shelf life', tips: 'Transplant at 6-8 weeks, reduce irrigation before harvest' },
  { name: 'Turmeric', season: 'Kharif (Monsoon)', soilType: 'Loamy', benefits: 'Medicinal value, high demand', tips: 'Plant rhizomes in April-May, mulch heavily' },
];

const organicBenefits = [
  'Improves soil health and biodiversity',
  'Reduces chemical runoff and water pollution',
  'Produces nutritionally superior food',
  'Supports local ecosystems and pollinators',
  'Increases long-term farm profitability',
  'Reduces carbon footprint of agriculture',
];

export default function Farm() {
  const [search, setSearch] = useState('');
  const { t } = useLanguage();

  const filtered = crops.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.season.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Leaf className="w-4 h-4" />
            <span>Organic Cultivation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('farmHeroTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('farmHeroSubtitle')}</p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchCrops')}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Crops Table */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-accent/50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">{t('crop')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">{t('season')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">{t('soilType')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">{t('benefits')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">{t('cultivationTips')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((crop, i) => (
                  <tr key={i} className={`border-t border-border ${i % 2 === 0 ? 'bg-card' : 'bg-background'}`}>
                    <td className="px-4 py-3 font-medium text-foreground">{crop.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{crop.season}</td>
                    <td className="px-4 py-3 text-muted-foreground">{crop.soilType}</td>
                    <td className="px-4 py-3 text-muted-foreground">{crop.benefits}</td>
                    <td className="px-4 py-3 text-muted-foreground">{crop.tips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">{t('benefitsOfOrganicFarming')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {organicBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
