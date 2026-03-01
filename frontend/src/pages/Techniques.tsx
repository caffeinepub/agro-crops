import React, { useState } from 'react';
import {
  Leaf, Bug, RefreshCw, Layers, Sprout, Droplets, Worm, FlaskConical, Grid3X3,
  CloudRain, TestTube, Dna, ChevronDown, ChevronUp, CheckCircle2, Wrench, Lightbulb, ListOrdered
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Technique {
  emoji: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  color: string;
  bgGradient: string;
  steps: string[];
  benefits: string[];
  tools: string[];
  proTip: string;
}

export default function Techniques() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const techniques: Technique[] = [
    {
      emoji: '🌱',
      icon: <Leaf className="w-7 h-7" />,
      titleKey: 'composting',
      descKey: 'compostingDesc',
      color: 'bg-green-100 text-green-700',
      bgGradient: 'from-green-50 to-emerald-50',
      steps: [
        'Collect kitchen scraps (vegetable peels, fruit waste) and dry garden material (leaves, straw) in a 1:3 ratio.',
        'Layer green (nitrogen-rich) and brown (carbon-rich) materials alternately in a compost bin or pit.',
        'Maintain moisture by sprinkling water — the pile should feel like a wrung-out sponge.',
        'Turn the pile every 7–10 days to aerate and speed up decomposition.',
        'Harvest mature compost (dark, crumbly, earthy smell) after 6–8 weeks and apply to fields.',
      ],
      benefits: [
        'Improves soil structure, aeration, and water-holding capacity.',
        'Supplies macro and micro nutrients slowly over time.',
        'Reduces landfill waste and lowers greenhouse gas emissions.',
        'Suppresses soil-borne diseases and harmful pathogens.',
        'Increases beneficial microbial activity in the soil.',
      ],
      tools: ['Compost bin or pit (1m × 1m × 1m)', 'Garden fork or turning tool', 'Moisture meter or spray can', 'Thermometer (optional)'],
      proTip: 'Add a handful of finished compost or garden soil to each new layer — it acts as a microbial starter and cuts decomposition time by up to 30%.',
    },
    {
      emoji: '🐛',
      icon: <Bug className="w-7 h-7" />,
      titleKey: 'naturalPestControl',
      descKey: 'naturalPestControlDesc',
      color: 'bg-yellow-100 text-yellow-700',
      bgGradient: 'from-yellow-50 to-amber-50',
      steps: [
        'Identify the pest species accurately before choosing a control method.',
        'Introduce beneficial insects (ladybugs, lacewings, parasitic wasps) to prey on harmful pests.',
        'Prepare neem oil spray (5 ml neem oil + 1 ml liquid soap per litre of water) and apply every 7 days.',
        'Use sticky yellow traps for whiteflies and aphids; pheromone traps for moths and borers.',
        'Plant companion crops like marigold, basil, or garlic around the main crop as natural repellents.',
      ],
      benefits: [
        'Eliminates chemical residues from produce, making it safer for consumers.',
        'Preserves natural predator populations and biodiversity.',
        'Reduces input costs compared to synthetic pesticides.',
        'Prevents pest resistance that develops with repeated chemical use.',
        'Protects pollinators like bees and butterflies essential for crop yield.',
      ],
      tools: ['Neem oil concentrate', 'Knapsack sprayer', 'Yellow/blue sticky traps', 'Pheromone lure traps', 'Hand lens for pest identification'],
      proTip: 'Scout your field early morning or late evening when pests are most active. Early detection reduces the need for large-scale intervention by up to 60%.',
    },
    {
      emoji: '🔄',
      icon: <RefreshCw className="w-7 h-7" />,
      titleKey: 'cropRotation',
      descKey: 'cropRotationDesc',
      color: 'bg-blue-100 text-blue-700',
      bgGradient: 'from-blue-50 to-sky-50',
      steps: [
        'Divide your farm into 3–4 equal plots and assign each a crop family (cereals, legumes, vegetables, fallow).',
        'Plan a 3–4 year rotation cycle so no crop family returns to the same plot within that period.',
        'Follow a heavy feeder (maize, wheat) with a nitrogen-fixer (soybean, groundnut) to restore soil fertility.',
        'Include a fallow or cover-crop phase to rest the soil and suppress weeds.',
        'Record each season\'s crop, yield, and soil health observations to refine future rotations.',
      ],
      benefits: [
        'Breaks pest and disease cycles that depend on a single host crop.',
        'Reduces nitrogen fertilizer needs by up to 40% when legumes are included.',
        'Improves soil organic matter and microbial diversity over time.',
        'Controls weeds naturally by alternating crops with different canopy structures.',
        'Spreads financial risk by diversifying income sources across seasons.',
      ],
      tools: ['Farm map or plot diagram', 'Crop rotation planning chart', 'Soil test kit', 'Record-keeping notebook or app'],
      proTip: 'Always follow a deep-rooted crop (like sunflower or sorghum) with a shallow-rooted crop (like onion or garlic) to break soil compaction layers and improve drainage.',
    },
    {
      emoji: '🍂',
      icon: <Layers className="w-7 h-7" />,
      titleKey: 'mulching',
      descKey: 'mulchingDesc',
      color: 'bg-orange-100 text-orange-700',
      bgGradient: 'from-orange-50 to-amber-50',
      steps: [
        'Choose mulch material: straw, dry leaves, sugarcane bagasse, or black plastic film depending on crop type.',
        'Prepare the soil bed — weed, water, and level it before applying mulch.',
        'Spread organic mulch 5–10 cm thick around plants, keeping a 5 cm gap from the stem to prevent rot.',
        'For plastic mulch, lay the film tightly over the bed and make holes at planting positions.',
        'Replenish organic mulch every 4–6 weeks as it decomposes and adds organic matter to the soil.',
      ],
      benefits: [
        'Reduces soil moisture evaporation by up to 70%, cutting irrigation frequency.',
        'Suppresses weed germination and growth, reducing manual weeding labour.',
        'Moderates soil temperature, protecting roots from extreme heat and cold.',
        'Prevents soil erosion caused by heavy rain and wind.',
        'Organic mulch improves soil structure as it breaks down over time.',
      ],
      tools: ['Straw or dry leaves (organic mulch)', 'Black/silver plastic mulch film', 'Mulch layer or manual spreader', 'Drip tape (used under plastic mulch)'],
      proTip: 'Silver-reflective plastic mulch repels aphids and whiteflies while also conserving moisture — a dual benefit for summer vegetable crops like tomato and capsicum.',
    },
    {
      emoji: '🌿',
      icon: <Sprout className="w-7 h-7" />,
      titleKey: 'greenManuring',
      descKey: 'greenManuringDesc',
      color: 'bg-emerald-100 text-emerald-700',
      bgGradient: 'from-emerald-50 to-green-50',
      steps: [
        'Select a fast-growing legume (dhaincha, sunhemp, cowpea, or sesbania) suited to your climate.',
        'Broadcast seeds at 25–30 kg/ha immediately after the previous crop harvest.',
        'Allow the green manure crop to grow for 45–60 days until it reaches the flowering stage.',
        'Incorporate the standing crop into the soil using a rotavator or disc harrow while still green.',
        'Wait 2–3 weeks for decomposition before planting the next main crop.',
      ],
      benefits: [
        'Adds 60–150 kg nitrogen per hectare, equivalent to 2–3 bags of urea.',
        'Improves soil organic carbon and microbial biomass significantly.',
        'Suppresses weeds during the fallow period between main crops.',
        'Prevents soil erosion and nutrient leaching during off-season.',
        'Improves soil porosity and water infiltration for the next crop.',
      ],
      tools: ['Green manure seeds (dhaincha, sunhemp, cowpea)', 'Seed broadcaster or manual sowing', 'Rotavator or disc harrow for incorporation', 'Soil organic matter test kit'],
      proTip: 'Inoculate legume seeds with Rhizobium bacteria culture before sowing — it boosts nitrogen fixation by 30–50% and ensures nodule formation even in soils with low native Rhizobium populations.',
    },
    {
      emoji: '💧',
      icon: <Droplets className="w-7 h-7" />,
      titleKey: 'dripIrrigation',
      descKey: 'dripIrrigationDesc',
      color: 'bg-cyan-100 text-cyan-700',
      bgGradient: 'from-cyan-50 to-blue-50',
      steps: [
        'Design the layout: calculate field area, crop spacing, and water requirement per plant per day.',
        'Install the main pipeline, sub-main, and lateral drip lines along crop rows.',
        'Place drip emitters (2–4 LPH) at each plant base or use inline drippers for row crops.',
        'Connect a fertigation unit (venturi injector or fertilizer tank) to apply liquid nutrients through the system.',
        'Schedule irrigation based on crop stage and evapotranspiration data — typically 1–3 times daily in short pulses.',
      ],
      benefits: [
        'Saves 40–60% water compared to flood or furrow irrigation.',
        'Delivers nutrients directly to the root zone, improving fertilizer use efficiency by up to 30%.',
        'Reduces weed growth in inter-row spaces by keeping them dry.',
        'Minimizes soil erosion and nutrient runoff from the field.',
        'Enables irrigation on sloped or uneven terrain where flood irrigation is impractical.',
      ],
      tools: ['HDPE main and sub-main pipes', 'Inline drip laterals with emitters', 'Filter unit (sand + screen filter)', 'Fertigation tank or venturi injector', 'Pressure gauge and flow meter'],
      proTip: 'Flush drip laterals every 15 days by opening the end caps and running water at full pressure for 2–3 minutes — this prevents emitter clogging and extends system life by years.',
    },
    {
      emoji: '🪱',
      icon: <Worm className="w-7 h-7" />,
      titleKey: 'vermicomposting',
      descKey: 'vermicompostingDesc',
      color: 'bg-amber-100 text-amber-700',
      bgGradient: 'from-amber-50 to-yellow-50',
      steps: [
        'Set up a vermicompost bed (1m × 2m × 0.5m) using bricks, wood, or a plastic tub in a shaded area.',
        'Add a 10 cm base layer of moist coir pith or dry leaves, then add pre-decomposed organic waste.',
        'Introduce Eisenia fetida (red wigglers) at 1–2 kg per square metre of bed surface.',
        'Feed worms with kitchen waste, crop residues, and cow dung — avoid citrus, onion, and meat.',
        'Harvest vermicompost after 45–60 days when the material turns dark, granular, and odourless.',
      ],
      benefits: [
        'Vermicompost contains 5× more nitrogen, 7× more phosphorus, and 11× more potassium than regular compost.',
        'Produces vermicompost tea (liquid leachate) — a potent liquid fertilizer and bio-stimulant.',
        'Improves soil aeration, drainage, and water retention simultaneously.',
        'Suppresses soil pathogens and nematodes through beneficial microbial activity.',
        'Converts waste into high-value product — 1 kg of worms produces 1 kg of vermicompost per day.',
      ],
      tools: ['Vermicompost bed or tub', 'Eisenia fetida worms (1–2 kg/m²)', 'Coir pith or dry leaves (bedding)', 'Watering can for moisture maintenance', 'Shade net or cover'],
      proTip: 'Maintain bed moisture at 60–70% (squeeze a handful — a few drops should come out). Too dry kills worms; too wet causes anaerobic conditions and foul odour.',
    },
    {
      emoji: '🧫',
      icon: <FlaskConical className="w-7 h-7" />,
      titleKey: 'biofertilizers',
      descKey: 'biofertilizersDesc',
      color: 'bg-purple-100 text-purple-700',
      bgGradient: 'from-purple-50 to-violet-50',
      steps: [
        'Select the right biofertilizer: Rhizobium for legumes, Azotobacter for cereals, PSB for phosphorus mobilization, VAM for root colonization.',
        'Prepare seed treatment: mix 200 g biofertilizer with 200 ml water and coat seeds just before sowing.',
        'For soil application, mix 2–4 kg biofertilizer with 50 kg compost and broadcast in the root zone.',
        'Apply biofertilizers in the evening or on cloudy days to protect microorganisms from UV radiation.',
        'Combine 2–3 compatible biofertilizers for synergistic effects on nitrogen fixation and phosphorus solubilization.',
      ],
      benefits: [
        'Fixes 20–200 kg atmospheric nitrogen per hectare depending on the organism and crop.',
        'Solubilizes locked phosphorus in soil, making it available to plants without chemical fertilizers.',
        'Produces plant growth hormones (auxins, gibberellins) that stimulate root development.',
        'Reduces chemical fertilizer requirement by 25–50%, lowering input costs significantly.',
        'Improves soil microbial diversity and long-term soil health.',
      ],
      tools: ['Biofertilizer packets (Rhizobium, Azotobacter, PSB, VAM)', 'Seed coating drum or bucket', 'Shade cloth for drying treated seeds', 'Compost for soil application carrier'],
      proTip: 'Never mix biofertilizers with chemical fertilizers or fungicides — the chemicals kill the beneficial microorganisms. Apply biofertilizers at least 7 days before or after chemical inputs.',
    },
    {
      emoji: '🌾',
      icon: <Grid3X3 className="w-7 h-7" />,
      titleKey: 'intercropping',
      descKey: 'intercroppingDesc',
      color: 'bg-teal-100 text-teal-700',
      bgGradient: 'from-teal-50 to-cyan-50',
      steps: [
        'Choose compatible crop pairs: tall + short (maize + bean), deep-rooted + shallow-rooted (sorghum + groundnut).',
        'Plan row ratios: common systems are 2:1, 4:2, or 6:2 (main crop rows : intercrop rows).',
        'Sow the main crop first; introduce the intercrop 2–3 weeks later to avoid competition during establishment.',
        'Manage fertilizer and water based on the higher-demand crop; the intercrop benefits from residual inputs.',
        'Harvest intercrops first (usually shorter duration) to reduce competition for the main crop at maturity.',
      ],
      benefits: [
        'Increases total land productivity by 20–50% compared to monoculture (measured as Land Equivalent Ratio).',
        'Legume intercrops fix nitrogen, reducing fertilizer needs for the main crop.',
        'Diversifies income — two crops from the same land in the same season.',
        'Reduces pest and disease pressure through habitat diversification.',
        'Provides ground cover that reduces soil erosion and moisture loss.',
      ],
      tools: ['Row marker or rope for spacing', 'Seed drill or manual dibbler', 'Intercropping planning chart', 'Soil moisture sensor (optional)'],
      proTip: 'The classic maize + cowpea intercrop is one of the most productive combinations in India — cowpea fixes nitrogen, suppresses weeds, and provides an additional harvest within 60 days.',
    },
    {
      emoji: '🌧️',
      icon: <CloudRain className="w-7 h-7" />,
      titleKey: 'rainwaterHarvesting',
      descKey: 'rainwaterHarvestingDesc',
      color: 'bg-sky-100 text-sky-700',
      bgGradient: 'from-sky-50 to-blue-50',
      steps: [
        'Survey the farm to identify natural slopes, drainage channels, and low-lying areas suitable for water collection.',
        'Construct farm ponds (0.1–0.5 ha) at the lowest point of the field to capture runoff during monsoon.',
        'Build contour bunds or check dams across slopes to slow runoff and allow groundwater recharge.',
        'Install rooftop rainwater collection systems on farm buildings with gutters and storage tanks.',
        'Use harvested water for supplemental irrigation during dry spells between monsoon rains.',
      ],
      benefits: [
        'Stores monsoon water for use during dry periods, reducing dependence on groundwater.',
        'Recharges groundwater table, benefiting the entire farming community.',
        'Reduces soil erosion by slowing surface runoff velocity.',
        'Provides water security for livestock and domestic use on the farm.',
        'Eligible for government subsidies under MGNREGS and watershed development schemes.',
      ],
      tools: ['Farm pond liner (HDPE geomembrane)', 'Earthmoving equipment or manual labour', 'Contour bund marker (A-frame level)', 'Inlet and outlet pipes with filters', 'Water level gauge'],
      proTip: 'A 1-hectare farm pond with 3-metre depth can store approximately 30,000 cubic metres of water — enough to irrigate 5–7 hectares of crops during a 3-month dry period.',
    },
    {
      emoji: '🧪',
      icon: <TestTube className="w-7 h-7" />,
      titleKey: 'soilPhManagement',
      descKey: 'soilPhManagementDesc',
      color: 'bg-rose-100 text-rose-700',
      bgGradient: 'from-rose-50 to-pink-50',
      steps: [
        'Test soil pH using a digital pH meter or soil test kit — collect samples from 5–10 spots per field at 15 cm depth.',
        'For acidic soils (pH < 6.0): apply agricultural lime (calcium carbonate) at 1–4 tonnes/ha based on soil test recommendation.',
        'For alkaline soils (pH > 7.5): apply gypsum (calcium sulphate) at 2–5 tonnes/ha or elemental sulphur at 200–500 kg/ha.',
        'Incorporate amendments thoroughly into the top 15–20 cm of soil using a rotavator.',
        'Retest soil pH after 3–4 months and repeat treatment if needed; maintain target pH of 6.0–7.0 for most crops.',
      ],
      benefits: [
        'Optimal pH (6.0–7.0) maximizes availability of all essential plant nutrients.',
        'Correcting acidic soils reduces aluminium and manganese toxicity that stunts root growth.',
        'Liming acidic soils improves phosphorus availability and microbial activity.',
        'Gypsum application improves soil structure in heavy clay soils, enhancing drainage.',
        'Proper pH management can increase crop yields by 15–30% without additional fertilizer.',
      ],
      tools: ['Digital soil pH meter', 'Agricultural lime or dolomite', 'Gypsum or elemental sulphur', 'Rotavator for incorporation', 'Soil sampling auger'],
      proTip: 'Apply lime in the dry season before ploughing — it needs 3–4 months to fully react with the soil. Never apply lime and ammonium-based fertilizers together as they react and release nitrogen as gas.',
    },
    {
      emoji: '🌱',
      icon: <Dna className="w-7 h-7" />,
      titleKey: 'seedTreatment',
      descKey: 'seedTreatmentDesc',
      color: 'bg-lime-100 text-lime-700',
      bgGradient: 'from-lime-50 to-green-50',
      steps: [
        'Select certified, disease-free seeds from a reliable source; check germination rate (should be >85%).',
        'Perform hot water treatment: soak seeds in water at 50–55°C for 20–30 minutes to kill seed-borne pathogens.',
        'Treat seeds with Trichoderma viride (4 g/kg seed) or Pseudomonas fluorescens (10 g/kg) for bio-protection.',
        'Apply biofertilizer coating (Rhizobium for legumes, Azospirillum for cereals) as the final layer before drying.',
        'Dry treated seeds in shade for 30 minutes before sowing; never expose to direct sunlight after treatment.',
      ],
      benefits: [
        'Reduces seed-borne diseases by 60–80%, improving germination and seedling vigour.',
        'Biological seed treatment eliminates the need for chemical fungicide seed dressings.',
        'Trichoderma colonizes roots and provides protection against soil-borne pathogens throughout the crop cycle.',
        'Biofertilizer coating ensures early nutrient availability right from germination.',
        'Improves crop stand uniformity, reducing the need for gap-filling and replanting.',
      ],
      tools: ['Seed treatment drum or bucket', 'Trichoderma viride or Pseudomonas fluorescens', 'Biofertilizer culture (Rhizobium/Azospirillum)', 'Thermometer for hot water treatment', 'Shade net for drying'],
      proTip: 'Always treat seeds on the day of sowing. Pre-treated seeds stored for more than 24 hours lose microbial viability rapidly, reducing the effectiveness of biological seed treatments.',
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Leaf className="w-4 h-4" />
            <span>Sustainable Methods</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('techniquesHeroTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('techniquesHeroSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
              <span className="text-primary font-bold text-base">12</span> Techniques Covered
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Step-by-Step Guides
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
              <Lightbulb className="w-4 h-4 text-primary" /> Expert Pro Tips
            </div>
          </div>
        </div>
      </section>

      {/* Techniques Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((tech, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <div
                  key={i}
                  className={`eco-card rounded-2xl border border-border bg-card transition-all duration-300 overflow-hidden ${isExpanded ? 'shadow-lg ring-2 ring-primary/20' : 'hover:shadow-md'}`}
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-br ${tech.bgGradient} p-6`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${tech.color}`}>
                          {tech.icon}
                        </div>
                        <div>
                          <span className="text-2xl">{tech.emoji}</span>
                          <h3 className="font-bold text-foreground text-lg leading-tight">{t(tech.titleKey)}</h3>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-3">{t(tech.descKey)}</p>
                  </div>

                  {/* Quick Benefits Preview */}
                  <div className="px-6 pt-4 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {tech.benefits.slice(0, 2).map((benefit, bi) => (
                        <span key={bi} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          {benefit.split(',')[0].split('.')[0].substring(0, 40)}{benefit.length > 40 ? '…' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <div className="px-6 pb-4 pt-2">
                    <button
                      onClick={() => toggleExpand(i)}
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary border border-primary/30 rounded-xl py-2.5 hover:bg-primary/5 transition-colors"
                    >
                      {isExpanded ? (
                        <>Hide Details <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>View Full Guide <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-border px-6 pb-6 pt-5 space-y-5 animate-in slide-in-from-top-2 duration-200">

                      {/* Step-by-Step Process */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ListOrdered className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Step-by-Step Process</h4>
                        </div>
                        <ol className="space-y-2">
                          {tech.steps.map((step, si) => (
                            <li key={si} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center mt-0.5">
                                {si + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Key Benefits */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Key Benefits</h4>
                        </div>
                        <ul className="space-y-2">
                          {tech.benefits.map((benefit, bi) => (
                            <li key={bi} className="flex gap-2 text-sm text-muted-foreground">
                              <span className="flex-shrink-0 text-emerald-500 mt-0.5">✓</span>
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Tools */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Wrench className="w-4 h-4 text-orange-500" />
                          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Recommended Tools & Inputs</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tech.tools.map((tool, ti) => (
                            <span key={ti} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-lg px-3 py-1.5 font-medium">
                              🔧 {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pro Tip */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">Pro Tip</span>
                            <p className="text-sm text-amber-800 leading-relaxed">{tech.proTip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 border border-primary/20">
            <Sprout className="w-4 h-4" />
            <span>Start Your Journey</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore our full range of organic products, crop guides, and government schemes to get started with sustainable farming today.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-md"
          >
            <Leaf className="w-5 h-5" />
            {t('exploreCategories')}
          </a>
        </div>
      </section>
    </div>
  );
}
