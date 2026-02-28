import { useState } from 'react';
import { Search, X, Play, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

type Category = 'All' | 'Tillage' | 'Seeding' | 'Harvesting' | 'Irrigation' | 'Post-Harvest' | 'Crop Protection';

interface EquipmentItem {
  id: string;
  name: string;
  emoji: string;
  image: string;
  category: Exclude<Category, 'All'>;
  desc: string;
  uses: string[];
  power: string;
  suitable: string;
  terrain: string;
  specs: { label: string; value: string }[];
  tutorialTitle: string;
  tutorialDesc: string;
  youtubeSearch: string;
  youtubeEmbed?: string;
}

const equipmentData: EquipmentItem[] = [
  {
    id: 'tractor',
    name: 'Tractor',
    emoji: '🚜',
    image: '/assets/generated/equipment-tractor.dim_400x300.png',
    category: 'Tillage',
    desc: 'The backbone of modern farming. Used for ploughing, tilling, sowing, and transporting produce across large fields. Modern tractors come with GPS guidance and precision farming attachments.',
    uses: ['Land preparation', 'Seed sowing', 'Crop harvesting', 'Material transport'],
    power: '35–75 HP',
    suitable: 'Large farms (5+ acres)',
    terrain: 'Flat to moderate slopes',
    specs: [
      { label: 'Engine', value: 'Diesel, 35–75 HP' },
      { label: 'PTO Speed', value: '540 / 1000 RPM' },
      { label: 'Fuel Tank', value: '60–90 litres' },
      { label: 'Weight', value: '1,500–3,500 kg' },
    ],
    tutorialTitle: 'How to Operate a Farm Tractor Safely',
    tutorialDesc: 'Learn tractor controls, safety checks, hitching implements, and field operation techniques for beginners and experienced farmers.',
    youtubeSearch: 'how+to+operate+farm+tractor+tutorial+for+beginners',
    youtubeEmbed: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workFarm',
  },
  {
    id: 'plough',
    name: 'Plough',
    emoji: '⚙️',
    image: '/assets/generated/equipment-plough.dim_400x300.png',
    category: 'Tillage',
    desc: 'Essential for breaking and turning soil before planting. Organic farming uses disc and mould-board ploughs to incorporate crop residues and improve soil structure for better root penetration.',
    uses: ['Soil turning', 'Weed burial', 'Residue incorporation', 'Seedbed preparation'],
    power: 'Tractor-mounted',
    suitable: 'All farm sizes',
    terrain: 'All terrain types',
    specs: [
      { label: 'Type', value: 'Disc / Mould-board / Chisel' },
      { label: 'Working Depth', value: '15–30 cm' },
      { label: 'Working Width', value: '60–120 cm' },
      { label: 'Tractor Req.', value: '35+ HP' },
    ],
    tutorialTitle: 'Ploughing Techniques for Better Soil Health',
    tutorialDesc: 'Understand different plough types, correct depth settings, and how to achieve uniform soil turning for optimal seedbed preparation.',
    youtubeSearch: 'ploughing+techniques+farm+soil+preparation+tutorial',
  },
  {
    id: 'rotavator',
    name: 'Rotavator',
    emoji: '🔄',
    image: '/assets/generated/equipment-rotavator.dim_400x300.png',
    category: 'Tillage',
    desc: 'Breaks clods and prepares a fine seedbed in a single pass. Ideal for incorporating organic matter, green manure, and crop residues into the soil quickly and efficiently.',
    uses: ['Seedbed preparation', 'Organic matter mixing', 'Weed control', 'Soil aeration'],
    power: 'Tractor-mounted (35–55 HP)',
    suitable: 'All farm sizes',
    terrain: 'Flat to gently sloped',
    specs: [
      { label: 'Working Width', value: '1.2–2.1 m' },
      { label: 'Working Depth', value: '10–20 cm' },
      { label: 'Blade Type', value: 'L-shaped / C-type' },
      { label: 'Tractor Req.', value: '35–55 HP' },
    ],
    tutorialTitle: 'Rotavator Operation & Seedbed Preparation',
    tutorialDesc: 'Step-by-step guide on setting rotavator depth, blade selection, and achieving the perfect fine tilth for sowing.',
    youtubeSearch: 'rotavator+operation+seedbed+preparation+tutorial+farming',
  },
  {
    id: 'power-tiller',
    name: 'Power Tiller',
    emoji: '🌿',
    image: '/assets/generated/equipment-power-tiller.dim_400x300.png',
    category: 'Tillage',
    desc: 'A versatile two-wheel tractor ideal for small and marginal farmers. Can be used for tilling, puddling in paddy fields, inter-cultivation, and transportation with a trailer attachment.',
    uses: ['Paddy puddling', 'Inter-cultivation', 'Small field tilling', 'Trailer transport'],
    power: '8–12 HP diesel engine',
    suitable: 'Small to medium farms (1–5 acres)',
    terrain: 'Flat fields, paddy fields',
    specs: [
      { label: 'Engine', value: '8–12 HP Diesel' },
      { label: 'Tilling Width', value: '60–90 cm' },
      { label: 'Tilling Depth', value: '15–25 cm' },
      { label: 'Weight', value: '250–400 kg' },
    ],
    tutorialTitle: 'Power Tiller Operation for Small Farmers',
    tutorialDesc: 'Complete guide to operating a power tiller for paddy puddling, dry land tilling, and inter-row cultivation with safety tips.',
    youtubeSearch: 'power+tiller+operation+tutorial+small+farm+paddy',
  },
  {
    id: 'seed-drill',
    name: 'Seed Drill',
    emoji: '🌱',
    image: '/assets/generated/equipment-seed-drill.dim_400x300.png',
    category: 'Seeding',
    desc: 'Ensures precise seed placement at correct depth and spacing, dramatically improving germination rates and reducing seed wastage by up to 30% compared to broadcast sowing.',
    uses: ['Precise seed sowing', 'Uniform row spacing', 'Depth control', 'Fertilizer placement'],
    power: 'Tractor-mounted',
    suitable: 'Medium to large farms',
    terrain: 'Flat to gently sloped',
    specs: [
      { label: 'Row Spacing', value: '15–25 cm adjustable' },
      { label: 'Seed Depth', value: '2–8 cm' },
      { label: 'Working Width', value: '1.5–3.5 m' },
      { label: 'Tractor Req.', value: '35+ HP' },
    ],
    tutorialTitle: 'Seed Drill Calibration & Operation Guide',
    tutorialDesc: 'Learn how to calibrate seed rate, set row spacing, adjust sowing depth, and maintain your seed drill for optimal performance.',
    youtubeSearch: 'seed+drill+calibration+operation+tutorial+farming',
  },
  {
    id: 'paddy-transplanter',
    name: 'Paddy Transplanter',
    emoji: '🌾',
    image: '/assets/generated/equipment-paddy-transplanter.dim_400x300.png',
    category: 'Seeding',
    desc: 'Mechanizes paddy transplanting to save up to 80% labor compared to manual transplanting. Ensures uniform plant spacing and depth for better tillering and higher yields.',
    uses: ['Paddy transplanting', 'Uniform spacing', 'Reduced labor cost', 'Timely planting'],
    power: '4–8 HP engine',
    suitable: 'Paddy growing regions',
    terrain: 'Puddled paddy fields',
    specs: [
      { label: 'Row Spacing', value: '25–30 cm' },
      { label: 'Plant Spacing', value: '12–16 cm' },
      { label: 'Rows', value: '4 / 6 / 8 rows' },
      { label: 'Capacity', value: '0.1–0.2 ha/hr' },
    ],
    tutorialTitle: 'Paddy Transplanter Setup & Field Operation',
    tutorialDesc: 'How to prepare mat nursery, load seedling trays, set transplanting depth, and operate the paddy transplanter efficiently.',
    youtubeSearch: 'paddy+transplanter+operation+tutorial+rice+farming',
  },
  {
    id: 'pneumatic-planter',
    name: 'Pneumatic Planter',
    emoji: '🎯',
    image: '/assets/generated/equipment-pneumatic-planter.dim_400x300.png',
    category: 'Seeding',
    desc: 'Uses air pressure for precise single-seed placement, ideal for maize, sunflower, soybean, and cotton. Reduces seed cost significantly and ensures optimal plant population.',
    uses: ['Single seed placement', 'Maize/cotton sowing', 'Precision farming', 'Fertilizer co-placement'],
    power: 'Tractor-mounted (45+ HP)',
    suitable: 'Medium to large farms',
    terrain: 'Well-prepared flat fields',
    specs: [
      { label: 'Seed Spacing', value: '15–75 cm adjustable' },
      { label: 'Row Spacing', value: '45–90 cm' },
      { label: 'Vacuum Pressure', value: '20–40 mbar' },
      { label: 'Capacity', value: '0.5–1.5 ha/hr' },
    ],
    tutorialTitle: 'Pneumatic Planter Calibration & Operation',
    tutorialDesc: 'Master seed disc selection, vacuum pressure settings, and field calibration for perfect single-seed placement with a pneumatic planter.',
    youtubeSearch: 'pneumatic+planter+calibration+operation+maize+soybean',
  },
  {
    id: 'thresher',
    name: 'Thresher',
    emoji: '🌾',
    image: '/assets/generated/equipment-thresher.dim_400x300.png',
    category: 'Harvesting',
    desc: 'Separates grain from stalks and husks efficiently. Reduces post-harvest losses by up to 40% and saves significant labor time during the critical harvest season.',
    uses: ['Grain separation', 'Straw collection', 'Seed cleaning', 'Reducing harvest loss'],
    power: '5–15 HP engine',
    suitable: 'Medium to large farms',
    terrain: 'Stationary use',
    specs: [
      { label: 'Capacity', value: '300–800 kg/hr' },
      { label: 'Crops', value: 'Wheat, paddy, soybean' },
      { label: 'Power Source', value: 'Engine / Tractor PTO' },
      { label: 'Grain Loss', value: '<1%' },
    ],
    tutorialTitle: 'Thresher Operation & Grain Loss Reduction',
    tutorialDesc: 'Learn correct feeding rate, drum speed adjustment, and cleaning fan settings to minimize grain loss and maximize threshing efficiency.',
    youtubeSearch: 'thresher+operation+tutorial+grain+wheat+paddy+farming',
  },
  {
    id: 'combine-harvester',
    name: 'Combine Harvester',
    emoji: '🏗️',
    image: '/assets/generated/equipment-combine-harvester.dim_400x300.png',
    category: 'Harvesting',
    desc: 'Performs reaping, threshing, and winnowing in a single pass. Reduces harvest time from weeks to days and cuts post-harvest losses dramatically for large-scale grain farming.',
    uses: ['Simultaneous reaping & threshing', 'Straw spreading', 'Large-scale harvesting', 'Grain tank storage'],
    power: '100–300 HP',
    suitable: 'Large farms (20+ acres)',
    terrain: 'Flat to gently rolling',
    specs: [
      { label: 'Cutting Width', value: '3–7 m' },
      { label: 'Grain Tank', value: '4,000–10,000 litres' },
      { label: 'Capacity', value: '2–8 ha/hr' },
      { label: 'Engine', value: '100–300 HP diesel' },
    ],
    tutorialTitle: 'Combine Harvester Operation & Settings',
    tutorialDesc: 'Comprehensive guide to combine harvester header height, concave clearance, fan speed, and sieve settings for different crops.',
    youtubeSearch: 'combine+harvester+operation+settings+tutorial+wheat+paddy',
  },
  {
    id: 'crop-reaper',
    name: 'Crop Reaper / Cutter',
    emoji: '✂️',
    image: '/assets/generated/equipment-crop-reaper.dim_400x300.png',
    category: 'Harvesting',
    desc: 'A compact harvesting machine for cutting standing crops like wheat, paddy, and sorghum. Ideal for small and medium farms where a combine harvester is not economical.',
    uses: ['Crop cutting', 'Paddy harvesting', 'Wheat reaping', 'Reduced harvest time'],
    power: '5–8 HP engine',
    suitable: 'Small to medium farms',
    terrain: 'Flat paddy/wheat fields',
    specs: [
      { label: 'Cutting Width', value: '1.0–1.5 m' },
      { label: 'Capacity', value: '0.1–0.3 ha/hr' },
      { label: 'Crop Height', value: '60–120 cm' },
      { label: 'Weight', value: '80–150 kg' },
    ],
    tutorialTitle: 'Crop Reaper Operation for Paddy & Wheat',
    tutorialDesc: 'Step-by-step guide on adjusting cutting height, operating speed, and maintaining the crop reaper for efficient small-farm harvesting.',
    youtubeSearch: 'crop+reaper+cutter+operation+tutorial+paddy+wheat+harvesting',
  },
  {
    id: 'drip-irrigation',
    name: 'Drip Irrigation System',
    emoji: '💧',
    image: '/assets/generated/equipment-drip-irrigation.dim_400x300.png',
    category: 'Irrigation',
    desc: 'Delivers water directly to the root zone, saving up to 50% water compared to flood irrigation. Ideal for vegetables, fruits, and cash crops with precise fertigation capability.',
    uses: ['Water-efficient irrigation', 'Fertigation', 'Vegetable/fruit crops', 'Saline water management'],
    power: '1–3 HP pump',
    suitable: 'All farm sizes',
    terrain: 'All terrain types',
    specs: [
      { label: 'Emitter Flow', value: '2–8 litres/hr' },
      { label: 'Lateral Spacing', value: '30–150 cm' },
      { label: 'Operating Pressure', value: '0.5–2.5 kg/cm²' },
      { label: 'Water Saving', value: '40–60% vs flood' },
    ],
    tutorialTitle: 'Drip Irrigation System Design & Installation',
    tutorialDesc: 'Learn how to design a drip system layout, select emitters, install filters, and set up fertigation for maximum water use efficiency.',
    youtubeSearch: 'drip+irrigation+system+installation+tutorial+farming+india',
  },
  {
    id: 'sprayer',
    name: 'Power Sprayer',
    emoji: '🌊',
    image: '/assets/generated/equipment-sprayer.dim_400x300.png',
    category: 'Crop Protection',
    desc: 'Used to apply organic pesticides, neem oil, and liquid fertilizers uniformly across crops. Available in manual, battery, and tractor-mounted versions for all farm sizes.',
    uses: ['Organic pesticide application', 'Foliar fertilization', 'Disease control', 'Weed management'],
    power: 'Manual / Battery / Engine',
    suitable: 'All farm sizes',
    terrain: 'All terrain types',
    specs: [
      { label: 'Tank Capacity', value: '16–400 litres' },
      { label: 'Pressure', value: '2–40 kg/cm²' },
      { label: 'Nozzle Types', value: 'Flat fan / Hollow cone' },
      { label: 'Coverage', value: '0.5–3 ha/hr' },
    ],
    tutorialTitle: 'Sprayer Calibration & Safe Chemical Application',
    tutorialDesc: 'How to calibrate spray volume, select correct nozzles, maintain proper pressure, and follow safety protocols for pesticide application.',
    youtubeSearch: 'power+sprayer+calibration+operation+tutorial+pesticide+farming',
  },
  {
    id: 'laser-leveler',
    name: 'Laser Land Leveler',
    emoji: '📡',
    image: '/assets/generated/equipment-laser-leveler.dim_400x300.png',
    category: 'Post-Harvest',
    desc: 'Uses laser technology to achieve precise land leveling, improving water distribution uniformity by up to 90%. Reduces water use, improves crop stand, and increases yields by 10–15%.',
    uses: ['Precision land leveling', 'Water distribution', 'Reduced waterlogging', 'Improved crop uniformity'],
    power: 'Tractor-mounted (50+ HP)',
    suitable: 'Medium to large farms',
    terrain: 'Flat agricultural land',
    specs: [
      { label: 'Laser Accuracy', value: '±2 mm/10 m' },
      { label: 'Scraper Capacity', value: '1.5–3.0 m³' },
      { label: 'Coverage', value: '1–2 ha/hr' },
      { label: 'Tractor Req.', value: '50–75 HP' },
    ],
    tutorialTitle: 'Laser Land Leveling Setup & Operation',
    tutorialDesc: 'Complete guide to setting up the laser transmitter, receiver, and control box, and operating the scraper for precision field leveling.',
    youtubeSearch: 'laser+land+leveling+operation+tutorial+farming+india',
  },
  {
    id: 'mulching-machine',
    name: 'Mulching Machine',
    emoji: '🍂',
    image: '/assets/generated/equipment-mulching-machine.dim_400x300.png',
    category: 'Post-Harvest',
    desc: 'Shreds and spreads crop residues as mulch to conserve soil moisture, suppress weeds, and improve organic matter. Eliminates the need for stubble burning and improves soil health.',
    uses: ['Residue mulching', 'Weed suppression', 'Moisture conservation', 'Soil organic matter'],
    power: 'Tractor-mounted (45+ HP)',
    suitable: 'Medium to large farms',
    terrain: 'Flat to moderate slopes',
    specs: [
      { label: 'Working Width', value: '1.2–2.5 m' },
      { label: 'Mulch Size', value: '3–8 cm pieces' },
      { label: 'Capacity', value: '0.5–1.5 ha/hr' },
      { label: 'Tractor Req.', value: '45–65 HP' },
    ],
    tutorialTitle: 'Mulching Machine Operation & Residue Management',
    tutorialDesc: 'Learn how to use a mulching machine for crop residue management, avoid stubble burning, and improve soil health through mulching.',
    youtubeSearch: 'mulching+machine+operation+crop+residue+management+tutorial',
  },
];

const categories: Category[] = ['All', 'Tillage', 'Seeding', 'Harvesting', 'Irrigation', 'Crop Protection', 'Post-Harvest'];

const categoryIcons: Record<Category, string> = {
  All: '🌾',
  Tillage: '⚙️',
  Seeding: '🌱',
  Harvesting: '🌾',
  Irrigation: '💧',
  'Crop Protection': '🛡️',
  'Post-Harvest': '📦',
};

const maintenanceTips = [
  { icon: '🔧', text: 'Clean equipment after every use to prevent rust and contamination' },
  { icon: '🛢️', text: 'Lubricate moving parts regularly with food-grade or organic lubricants' },
  { icon: '🔍', text: 'Inspect for wear and damage before each season begins' },
  { icon: '📦', text: 'Store in dry, covered areas to protect from weather damage' },
  { icon: '📋', text: 'Keep maintenance logs for each piece of equipment' },
  { icon: '👨‍🔧', text: 'Get annual professional servicing for heavy machinery' },
];

interface TutorialPanelProps {
  item: EquipmentItem;
  onClose: () => void;
}

function TutorialPanel({ item, onClose }: TutorialPanelProps) {
  const searchUrl = `https://www.youtube.com/results?search_query=${item.youtubeSearch}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gradient-green p-5 rounded-t-2xl flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-white/80 text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">{item.category}</span>
            </div>
            <h3 className="text-white font-bold text-xl font-merriweather">{item.tutorialTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors flex-shrink-0 bg-white/10 hover:bg-white/20 rounded-lg p-1.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Placeholder */}
        <div className="p-5">
          <div className="relative bg-foreground/5 rounded-xl overflow-hidden aspect-video flex flex-col items-center justify-center border-2 border-dashed border-border group">
            <div className="w-16 h-16 gradient-green rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
            <p className="text-foreground font-semibold text-center px-4 mb-1">{item.tutorialTitle}</p>
            <p className="text-muted-foreground text-sm text-center px-6 mb-5">{item.tutorialDesc}</p>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          </div>

          {/* Equipment Specs */}
          <div className="mt-5">
            <h4 className="font-bold text-foreground mb-3 font-merriweather">Technical Specifications</h4>
            <div className="grid grid-cols-2 gap-3">
              {item.specs.map(spec => (
                <div key={spec.label} className="bg-green-pale/40 rounded-xl p-3 border border-border/50">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">{spec.label}</p>
                  <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Uses */}
          <div className="mt-4">
            <h4 className="font-bold text-foreground mb-3 font-merriweather">Key Applications</h4>
            <div className="flex flex-wrap gap-2">
              {item.uses.map(use => (
                <span key={use} className="text-sm bg-green-pale text-primary px-3 py-1.5 rounded-lg font-medium">
                  ✓ {use}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center bg-card border border-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Power</p>
              <p className="text-xs font-semibold text-foreground">⚡ {item.power}</p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Suitable For</p>
              <p className="text-xs font-semibold text-foreground">🌾 {item.suitable}</p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Terrain</p>
              <p className="text-xs font-semibold text-foreground">🏔️ {item.terrain}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface EquipmentCardProps {
  item: EquipmentItem;
  index: number;
  onWatchTutorial: (item: EquipmentItem) => void;
}

function EquipmentCard({ item, index, onWatchTutorial }: EquipmentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedSection animation="slideUp" delay={index * 80}>
      <div className="eco-card overflow-hidden flex flex-col h-full group">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-primary text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              {item.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 w-10 h-10 gradient-green rounded-xl flex items-center justify-center text-xl shadow-lg">
            {item.emoji}
          </div>
          {/* Tutorial badge */}
          <div className="absolute bottom-3 right-3">
            <button
              onClick={() => onWatchTutorial(item)}
              className="flex items-center gap-1.5 bg-black/70 hover:bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Play className="w-3 h-3" />
              Tutorial
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-foreground mb-2 font-merriweather">{item.name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>

          {/* Quick specs */}
          <div className="flex gap-3 text-xs text-muted-foreground mb-4 pb-3 border-b border-border/50">
            <span className="flex items-center gap-1">⚡ <span className="font-medium text-foreground">{item.power}</span></span>
            <span className="flex items-center gap-1">🌾 <span className="font-medium text-foreground">{item.suitable}</span></span>
          </div>

          {/* Key Uses */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground mb-2">Key Uses:</p>
            <div className="flex flex-wrap gap-1.5">
              {item.uses.slice(0, 3).map(use => (
                <span key={use} className="text-xs bg-green-pale text-primary px-2 py-1 rounded-lg font-medium">
                  {use}
                </span>
              ))}
              {item.uses.length > 3 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-lg font-medium">
                  +{item.uses.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Expandable Specs */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-primary hover:text-primary/80 transition-colors mb-2"
          >
            <span>Technical Specifications</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expanded && (
            <div className="grid grid-cols-2 gap-2 mb-4 animate-fadeIn">
              {item.specs.map(spec => (
                <div key={spec.label} className="bg-green-pale/40 rounded-lg p-2 border border-border/50">
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="text-xs font-semibold text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Watch Tutorial Button */}
          <button
            onClick={() => onWatchTutorial(item)}
            className="btn-primary flex items-center justify-center gap-2 text-sm mt-auto"
          >
            <Play className="w-4 h-4" />
            Watch Tutorial
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Equipment() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [tutorialItem, setTutorialItem] = useState<EquipmentItem | null>(null);

  const filtered = equipmentData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === 'All'
      ? equipmentData.length
      : equipmentData.filter(e => e.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="gradient-green py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🚜</div>
          <div className="absolute top-20 right-20 text-6xl">⚙️</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">🌾</div>
          <div className="absolute bottom-5 right-1/3 text-5xl">💧</div>
        </div>
        <AnimatedSection animation="fadeIn">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-5">
              🔧 Advanced Farm Machinery & Tools
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 font-merriweather leading-tight">
              Modern Farm Equipment
              <br />
              <span className="text-white/80 text-3xl md:text-4xl">& Agricultural Tools</span>
            </h1>
            <p className="text-white/85 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Explore our comprehensive guide to traditional and advanced mechanized farming tools.
              Each equipment comes with detailed specifications, key applications, and step-by-step tutorial videos
              to help you maximize productivity and reduce costs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full">
                <span>📋</span> {equipmentData.length}+ Equipment Items
              </div>
              <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full">
                <span>🎬</span> Tutorial Videos for Each Tool
              </div>
              <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full">
                <span>📊</span> Detailed Technical Specs
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-8 px-4 bg-green-pale/30 border-b border-border/50 sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="max-w-lg mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search equipment by name, category, or use..."
              className="search-input pl-12"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                  selectedCategory === cat
                    ? 'gradient-green text-white border-transparent shadow-md scale-105'
                    : 'bg-card text-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                <span>{categoryIcons[cat]}</span>
                {cat}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            Showing <span className="font-semibold text-primary">{filtered.length}</span> of{' '}
            <span className="font-semibold">{equipmentData.length}</span> equipment items
            {selectedCategory !== 'All' && (
              <span> in <span className="font-semibold text-primary">{selectedCategory}</span></span>
            )}
            {search && (
              <span> matching "<span className="font-semibold text-primary">{search}</span>"</span>
            )}
          </p>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="section-padding bg-background pt-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-7xl mb-5">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 font-merriweather">No equipment found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or selecting a different category.
              </p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  index={i}
                  onWatchTutorial={setTutorialItem}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tutorial Videos Section */}
      <section className="section-padding bg-green-pale/20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">📹 Tutorial Video Library</h2>
            <p className="section-subtitle">
              Click "Watch Tutorial" on any equipment card above, or browse quick-access tutorial links below.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {equipmentData.map((item, i) => (
              <AnimatedSection key={item.id} animation="slideUp" delay={i * 60}>
                <div
                  className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => setTutorialItem(item)}
                >
                  <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.tutorialTitle}</p>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-200">
                    <Play className="w-3.5 h-3.5 text-primary group-hover:text-white" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slideUp">
            <h2 className="section-title text-foreground">🔧 Equipment Maintenance Tips</h2>
            <p className="section-subtitle">
              Proper maintenance extends equipment life and ensures safe, efficient operation throughout the season.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {maintenanceTips.map((tip, i) => (
              <AnimatedSection key={tip.text} animation="slideInLeft" delay={i * 80}>
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card border border-border/50 hover:border-primary/30 transition-colors duration-200">
                  <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                  <span className="text-foreground text-sm font-medium">{tip.text}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="section-padding bg-green-pale/20">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="zoomIn">
            <div className="gradient-green rounded-3xl p-8 md:p-10 text-center text-white">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-3 font-merriweather">Safety First — Always</h2>
              <p className="text-white/85 leading-relaxed max-w-xl mx-auto mb-6">
                Always wear appropriate protective gear when operating farm equipment. Read the operator's manual
                before use, ensure all safety guards are in place, and never operate machinery when fatigued.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Wear safety goggles',
                  'Use ear protection',
                  'Keep bystanders away',
                  'Check fuel/oil levels',
                  'Never bypass safety guards',
                  'Read operator manual',
                ].map(item => (
                  <span key={item} className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-medium">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tutorial Modal */}
      {tutorialItem && (
        <TutorialPanel item={tutorialItem} onClose={() => setTutorialItem(null)} />
      )}
    </div>
  );
}
