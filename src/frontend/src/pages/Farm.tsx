import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { useLanguage } from "../contexts/LanguageContext";

type CropCategory =
  | "Cereals"
  | "Vegetables"
  | "Fruits"
  | "Spices"
  | "Pulses"
  | "Oilseeds"
  | "Cash Crops";

interface Crop {
  name: string;
  emoji: string;
  category: CropCategory;
  season: string;
  soil: string;
  benefits: string;
  tips: string;
  waterReq: string;
  duration: string;
  bestStates: string;
  fertilizerTip: string;
}

const crops: Crop[] = [
  {
    name: "Wheat",
    emoji: "🌾",
    category: "Cereals",
    season: "Rabi (Oct-Mar)",
    soil: "Loamy, Clay Loam",
    benefits: "High protein, staple food",
    tips: "Irrigate at crown root initiation stage",
    waterReq: "Moderate (400–500 mm)",
    duration: "120–130 days",
    bestStates: "Punjab, Haryana, UP, MP",
    fertilizerTip: "Apply FYM 10 t/ha + Azotobacter bio-fertilizer at sowing",
  },
  {
    name: "Rice",
    emoji: "🍚",
    category: "Cereals",
    season: "Kharif (Jun-Nov)",
    soil: "Clay, Clayey Loam",
    benefits: "Staple food, high yield",
    tips: "Maintain 5cm water level during tillering",
    waterReq: "High (1200–1600 mm)",
    duration: "100–140 days",
    bestStates: "WB, UP, Punjab, AP, TN",
    fertilizerTip:
      "Use Azolla as green manure + green manure (Sesbania) incorporation",
  },
  {
    name: "Maize",
    emoji: "🌽",
    category: "Cereals",
    season: "Kharif/Rabi",
    soil: "Sandy Loam, Loam",
    benefits: "Versatile crop, animal feed",
    tips: "Ensure proper drainage to avoid waterlogging",
    waterReq: "Moderate (500–700 mm)",
    duration: "90–110 days",
    bestStates: "Karnataka, AP, Bihar, MP, Rajasthan",
    fertilizerTip:
      "Apply compost 8 t/ha; use Trichogramma cards for stem borer control",
  },
  {
    name: "Sugarcane",
    emoji: "🌿",
    category: "Cash Crops",
    season: "Year-round",
    soil: "Deep Loam, Clay Loam",
    benefits: "High income, sugar production",
    tips: "Ratoon crop management saves replanting cost",
    waterReq: "High (1500–2500 mm)",
    duration: "12–18 months",
    bestStates: "UP, Maharashtra, Karnataka, TN",
    fertilizerTip:
      "Press mud compost 10 t/ha + trash mulching to conserve moisture",
  },
  {
    name: "Cotton",
    emoji: "🌸",
    category: "Cash Crops",
    season: "Kharif (May-Nov)",
    soil: "Black Cotton Soil",
    benefits: "Cash crop, fiber production",
    tips: "Monitor for bollworm regularly",
    waterReq: "Moderate (700–1200 mm)",
    duration: "150–180 days",
    bestStates: "Maharashtra, Gujarat, Telangana, Punjab",
    fertilizerTip:
      "Apply FYM 10 t/ha; use neem oil spray (3%) for bollworm control",
  },
  {
    name: "Soybean",
    emoji: "🫘",
    category: "Oilseeds",
    season: "Kharif (Jun-Sep)",
    soil: "Well-drained Loam",
    benefits: "High protein, nitrogen fixation",
    tips: "Inoculate seeds with Rhizobium before sowing",
    waterReq: "Moderate (450–700 mm)",
    duration: "90–110 days",
    bestStates: "MP, Maharashtra, Rajasthan, Chhattisgarh",
    fertilizerTip: "Rhizobium seed treatment + vermicompost 2 t/ha at sowing",
  },
  {
    name: "Groundnut",
    emoji: "🥜",
    category: "Oilseeds",
    season: "Kharif/Rabi",
    soil: "Sandy Loam",
    benefits: "Oil crop, high protein",
    tips: "Ensure calcium availability for pod development",
    waterReq: "Moderate (500–700 mm)",
    duration: "100–130 days",
    bestStates: "Gujarat, AP, TN, Rajasthan, Karnataka",
    fertilizerTip:
      "Rhizobium + PSB seed treatment; gypsum 200 kg/ha at pegging stage",
  },
  {
    name: "Tomato",
    emoji: "🍅",
    category: "Vegetables",
    season: "Year-round",
    soil: "Sandy Loam, Loam",
    benefits: "High value, vitamin rich",
    tips: "Stake plants and prune suckers for better yield",
    waterReq: "Moderate (600–800 mm)",
    duration: "70–90 days",
    bestStates: "Karnataka, AP, Maharashtra, WB",
    fertilizerTip:
      "Apply FYM 20 t/ha before transplanting; use yellow sticky traps for whitefly",
  },
  {
    name: "Onion",
    emoji: "🧅",
    category: "Vegetables",
    season: "Rabi (Oct-Apr)",
    soil: "Sandy Loam, Loam",
    benefits: "High demand, good storage",
    tips: "Stop irrigation 10 days before harvest",
    waterReq: "Moderate (350–550 mm)",
    duration: "90–120 days",
    bestStates: "Maharashtra, Karnataka, MP, Gujarat",
    fertilizerTip:
      "Apply FYM 20 t/ha before transplanting; Trichoderma viride for soil treatment",
  },
  {
    name: "Potato",
    emoji: "🥔",
    category: "Vegetables",
    season: "Rabi (Oct-Mar)",
    soil: "Sandy Loam, Loam",
    benefits: "Versatile vegetable, high yield",
    tips: "Earth up plants when 15cm tall",
    waterReq: "Moderate (500–700 mm)",
    duration: "80–100 days",
    bestStates: "UP, WB, Bihar, Punjab, HP",
    fertilizerTip:
      "Apply FYM 20 t/ha; use Bordeaux mixture for late blight prevention",
  },
  {
    name: "Mustard",
    emoji: "🌼",
    category: "Oilseeds",
    season: "Rabi (Oct-Feb)",
    soil: "Sandy Loam, Loam",
    benefits: "Oil crop, cold tolerant",
    tips: "Apply sulfur fertilizer for better oil content",
    waterReq: "Low–Moderate (250–400 mm)",
    duration: "110–130 days",
    bestStates: "Rajasthan, UP, Haryana, MP, WB",
    fertilizerTip: "Apply FYM 5 t/ha before sowing; neem oil for aphid control",
  },
  {
    name: "Sunflower",
    emoji: "🌻",
    category: "Oilseeds",
    season: "Kharif/Rabi",
    soil: "Sandy Loam, Loam",
    benefits: "Oil crop, drought tolerant",
    tips: "Hand pollinate for better seed set",
    waterReq: "Moderate (400–600 mm)",
    duration: "85–95 days",
    bestStates: "Karnataka, AP, Haryana, Maharashtra",
    fertilizerTip:
      "Apply vermicompost 3 t/ha; neem-based pesticides for head borer",
  },
  {
    name: "Chickpea",
    emoji: "🫘",
    category: "Pulses",
    season: "Rabi (Oct-Mar)",
    soil: "Sandy Loam, Loam",
    benefits: "Protein rich, nitrogen fixation",
    tips: "Avoid excess moisture to prevent wilt",
    waterReq: "Low (300–400 mm)",
    duration: "90–110 days",
    bestStates: "MP, Rajasthan, Maharashtra, UP, Haryana",
    fertilizerTip:
      "Seed inoculation with Rhizobium + PSB; pheromone traps for pod borer",
  },
  {
    name: "Lentil",
    emoji: "🫘",
    category: "Pulses",
    season: "Rabi (Oct-Mar)",
    soil: "Sandy Loam, Loam",
    benefits: "High protein, low water need",
    tips: "Inoculate with Rhizobium for better yield",
    waterReq: "Low (250–350 mm)",
    duration: "90–110 days",
    bestStates: "UP, MP, Bihar, WB, Jharkhand",
    fertilizerTip:
      "Rhizobium seed treatment + phosphate-solubilizing bacteria (PSB) application",
  },
  {
    name: "Jowar",
    emoji: "🌾",
    category: "Cereals",
    season: "Kharif (Jun-Oct)",
    soil: "Medium to Heavy",
    benefits: "Drought tolerant, animal feed",
    tips: "Thin plants to 15cm spacing for best yield",
    waterReq: "Low–Moderate (400–600 mm)",
    duration: "100–115 days",
    bestStates: "Maharashtra, Karnataka, Rajasthan, MP",
    fertilizerTip:
      "Apply compost 5 t/ha; pheromone traps for shoot fly monitoring",
  },
  {
    name: "Bajra",
    emoji: "🌾",
    category: "Cereals",
    season: "Kharif (Jun-Sep)",
    soil: "Sandy, Sandy Loam",
    benefits: "Drought tolerant, nutritious",
    tips: "Grows well in low rainfall areas",
    waterReq: "Very Low (200–350 mm)",
    duration: "70–90 days",
    bestStates: "Rajasthan, Gujarat, Haryana, UP",
    fertilizerTip:
      "Apply FYM 5 t/ha; Azospirillum seed treatment for nitrogen fixation",
  },
  {
    name: "Turmeric",
    emoji: "🟡",
    category: "Spices",
    season: "Kharif (May-Nov)",
    soil: "Loamy, Clay Loam",
    benefits: "Medicinal value, high price",
    tips: "Mulch with dry leaves to retain moisture",
    waterReq: "Moderate (1500 mm)",
    duration: "8–9 months",
    bestStates: "AP, Telangana, TN, Odisha, Maharashtra",
    fertilizerTip:
      "Apply neem cake 250 kg/ha; use Pseudomonas fluorescens for rhizome rot prevention",
  },
  {
    name: "Ginger",
    emoji: "🫚",
    category: "Spices",
    season: "Kharif (Apr-Dec)",
    soil: "Sandy Loam, Loam",
    benefits: "High value spice, medicinal",
    tips: "Provide shade during summer months",
    waterReq: "Moderate–High (1500–2000 mm)",
    duration: "8–10 months",
    bestStates: "Kerala, Karnataka, Assam, AP, HP",
    fertilizerTip:
      "Apply FYM 25 t/ha; Trichoderma for rhizome rot; mulch with dry leaves",
  },
  {
    name: "Banana",
    emoji: "🍌",
    category: "Fruits",
    season: "Year-round",
    soil: "Rich Loam, Clay Loam",
    benefits: "High income, year-round harvest",
    tips: "Remove suckers except one ratoon",
    waterReq: "High (1200–2200 mm)",
    duration: "10–12 months",
    bestStates: "TN, AP, Maharashtra, Gujarat, WB",
    fertilizerTip:
      "Apply FYM 25 kg/plant at planting; Pseudomonas for Panama wilt management",
  },
  {
    name: "Mango",
    emoji: "🥭",
    category: "Fruits",
    season: "Summer (Mar-Jun)",
    soil: "Deep Loam, Laterite",
    benefits: "High value fruit, long bearing",
    tips: "Prune after harvest for better next season",
    waterReq: "Low–Moderate (750–1250 mm)",
    duration: "3–5 months fruiting",
    bestStates: "UP, AP, TN, Maharashtra, Gujarat",
    fertilizerTip:
      "Apply compost 50 kg/tree/year; pheromone traps for fruit fly management",
  },
  {
    name: "Papaya",
    emoji: "🍈",
    category: "Fruits",
    season: "Year-round",
    soil: "Sandy Loam, Loam",
    benefits: "Fast growing, high yield",
    tips: "Ensure good drainage to prevent root rot",
    waterReq: "Moderate (1000–1500 mm)",
    duration: "9–11 months to first fruit",
    bestStates: "AP, TN, Karnataka, Gujarat, Maharashtra",
    fertilizerTip:
      "Apply FYM 10 t/ha before planting; neem cake for soil nematodes",
  },
  {
    name: "Brinjal",
    emoji: "🍆",
    category: "Vegetables",
    season: "Year-round",
    soil: "Sandy Loam, Loam",
    benefits: "High demand, nutritious",
    tips: "Stake plants and monitor for shoot borer",
    waterReq: "Moderate (500–700 mm)",
    duration: "60–70 days after transplanting",
    bestStates: "WB, Bihar, Odisha, Gujarat, TN",
    fertilizerTip:
      "Apply FYM 15 t/ha before transplanting; use neem oil for shoot borer",
  },
  // 13 New crops
  {
    name: "Amla (Indian Gooseberry)",
    emoji: "🫐",
    category: "Fruits",
    season: "Year-round",
    soil: "Sandy Loam",
    benefits: "High Vitamin C, drought tolerant",
    tips: "Drought tolerant; minimal irrigation after establishment",
    waterReq: "Moderate (400–600 mm)",
    duration: "4–5 years to bear",
    bestStates: "MP, Rajasthan, UP, Uttarakhand",
    fertilizerTip:
      "Apply compost 20 kg/tree/year; Trichoderma for root rot; neem cake as basal",
  },
  {
    name: "Drumstick (Moringa)",
    emoji: "🌿",
    category: "Vegetables",
    season: "Year-round",
    soil: "Sandy Loam",
    benefits: "Highest nutrition density, fast growing",
    tips: "Fast growing; prune to 1m height to promote bushiness",
    waterReq: "Low (500–700 mm)",
    duration: "8 months to first harvest",
    bestStates: "TN, AP, Karnataka, Gujarat, Rajasthan",
    fertilizerTip:
      "Apply FYM 5 kg/plant; minimal chemical inputs needed; drought hardy",
  },
  {
    name: "Bitter Gourd",
    emoji: "🥒",
    category: "Vegetables",
    season: "Kharif (Jun-Sep)",
    soil: "Sandy Loam",
    benefits: "Medicinal value, diabetic-friendly",
    tips: "Train on trellis or bamboo support for better yield",
    waterReq: "Moderate (600–800 mm)",
    duration: "55–60 days",
    bestStates: "All India (primarily UP, WB, Kerala)",
    fertilizerTip:
      "Apply FYM 20 t/ha before sowing; neem oil for aphids and mites",
  },
  {
    name: "Bottle Gourd",
    emoji: "🥬",
    category: "Vegetables",
    season: "Kharif/Summer",
    soil: "Sandy Loam",
    benefits: "High yield, cooling vegetable",
    tips: "Apply FYM 20 t/ha and train on trellis",
    waterReq: "Moderate (600–800 mm)",
    duration: "55–65 days",
    bestStates: "UP, Bihar, WB, MP, Maharashtra",
    fertilizerTip:
      "Apply FYM 20 t/ha; use yellow sticky traps for aphids and pests",
  },
  {
    name: "Okra (Bhindi)",
    emoji: "🫑",
    category: "Vegetables",
    season: "Kharif/Summer",
    soil: "Sandy Loam",
    benefits: "High demand, nutritious pods",
    tips: "Pick pods frequently (every 2 days) for tender quality",
    waterReq: "Moderate (600–900 mm)",
    duration: "50–60 days",
    bestStates: "All India (UP, WB, Bihar, Maharashtra)",
    fertilizerTip:
      "Apply FYM 15 t/ha; use neem oil for yellow vein mosaic and jassids",
  },
  {
    name: "Cowpea",
    emoji: "🫘",
    category: "Pulses",
    season: "Kharif (Jun-Sep)",
    soil: "Sandy Loam",
    benefits: "Nitrogen fixing, dual purpose",
    tips: "Rhizobium inoculation doubles nitrogen fixation",
    waterReq: "Low (400–600 mm)",
    duration: "60–90 days",
    bestStates: "AP, TN, Karnataka, Maharashtra",
    fertilizerTip:
      "Rhizobium inoculation before sowing; minimal nitrogen fertilizer needed",
  },
  {
    name: "Pigeonpea (Arhar)",
    emoji: "🫘",
    category: "Pulses",
    season: "Kharif (Jun-Oct)",
    soil: "Medium Loam",
    benefits: "Drought tolerant protein source",
    tips: "Intercrop with sorghum or maize for better land use",
    waterReq: "Low–Moderate (600–1000 mm)",
    duration: "150–180 days",
    bestStates: "MP, Maharashtra, UP, Karnataka, Jharkhand",
    fertilizerTip:
      "Rhizobium seed treatment; apply FYM 5 t/ha; intercrop with cereals for nitrogen",
  },
  {
    name: "Horse Gram",
    emoji: "🫘",
    category: "Pulses",
    season: "Kharif/Rabi",
    soil: "Sandy Loam",
    benefits: "Drought hardy, nutritious pulse",
    tips: "Minimal inputs; ideal for dryland farming",
    waterReq: "Very Low (300–400 mm)",
    duration: "90–120 days",
    bestStates: "Karnataka, TN, AP, Odisha",
    fertilizerTip:
      "Minimal inputs needed; Rhizobium inoculation; FYM 3 t/ha for good yields",
  },
  {
    name: "Safflower",
    emoji: "🌼",
    category: "Oilseeds",
    season: "Rabi (Oct-Feb)",
    soil: "Black Loam",
    benefits: "Oil and dye crop, drought tolerant",
    tips: "Avoid waterlogging at all stages of crop growth",
    waterReq: "Low (300–450 mm)",
    duration: "120–150 days",
    bestStates: "Maharashtra, Karnataka, AP, Rajasthan",
    fertilizerTip:
      "Apply FYM 5 t/ha; avoid excessive nitrogen as it reduces oil content",
  },
  {
    name: "Sesame",
    emoji: "🌿",
    category: "Oilseeds",
    season: "Kharif (Jun-Sep)",
    soil: "Sandy Loam",
    benefits: "High oil content, short season",
    tips: "Short season crop; harvest when lower capsules turn yellow",
    waterReq: "Low (300–400 mm)",
    duration: "80–90 days",
    bestStates: "WB, Odisha, Rajasthan, Gujarat, Maharashtra",
    fertilizerTip:
      "Apply FYM 5 t/ha; neem cake 100 kg/ha for soil pests; avoid waterlogging",
  },
  {
    name: "Cardamom",
    emoji: "🌱",
    category: "Spices",
    season: "Perennial (planted May-Jun)",
    soil: "Laterite Loam",
    benefits: "Highest value spice, export crop",
    tips: "Requires shade — plant under forest canopy or shade trees",
    waterReq: "High (1500–2500 mm)",
    duration: "3 years to first harvest",
    bestStates: "Kerala, Karnataka, TN (Nilgiris)",
    fertilizerTip: "Apply compost 2 kg/clump/year; neem oil for thrips control",
  },
  {
    name: "Clove",
    emoji: "🌸",
    category: "Spices",
    season: "Perennial (planted May-Jun)",
    soil: "Laterite Loam",
    benefits: "High export value, essential oil",
    tips: "Plant in deep fertile laterite soil with good drainage",
    waterReq: "High (1500–2500 mm)",
    duration: "5–7 years to bearing",
    bestStates: "Kerala (primary), Karnataka, TN",
    fertilizerTip:
      "Apply compost 50 kg/tree/year; Bordeaux mixture for bacterial blight",
  },
  {
    name: "Litchi",
    emoji: "🍒",
    category: "Fruits",
    season: "Summer (May-Jun)",
    soil: "Sandy Loam",
    benefits: "Premium fruit, high market value",
    tips: "Regular irrigation during fruit development for quality",
    waterReq: "Moderate–High (1200–1500 mm)",
    duration: "5 years to first bearing",
    bestStates: "Bihar, WB, UP, HP, Jharkhand",
    fertilizerTip:
      "Apply compost 40 kg/tree/year; pheromone traps for fruit borer",
  },
];

const cropCategories: Array<"All" | CropCategory> = [
  "All",
  "Cereals",
  "Vegetables",
  "Fruits",
  "Spices",
  "Pulses",
  "Oilseeds",
  "Cash Crops",
];

const categoryEmojis: Record<string, string> = {
  All: "🌾",
  Cereals: "🌾",
  Vegetables: "🥦",
  Fruits: "🍎",
  Spices: "🌶️",
  Pulses: "🫘",
  Oilseeds: "🌻",
  "Cash Crops": "💰",
};

const monthCalendar = [
  { month: "Jan", kharif: false, rabi: true, yearRound: true },
  { month: "Feb", kharif: false, rabi: true, yearRound: true },
  { month: "Mar", kharif: false, rabi: true, yearRound: true },
  { month: "Apr", kharif: true, rabi: false, yearRound: true },
  { month: "May", kharif: true, rabi: false, yearRound: true },
  { month: "Jun", kharif: true, rabi: false, yearRound: true },
  { month: "Jul", kharif: true, rabi: false, yearRound: true },
  { month: "Aug", kharif: true, rabi: false, yearRound: true },
  { month: "Sep", kharif: true, rabi: false, yearRound: true },
  { month: "Oct", kharif: false, rabi: true, yearRound: true },
  { month: "Nov", kharif: false, rabi: true, yearRound: true },
  { month: "Dec", kharif: false, rabi: true, yearRound: true },
];

export default function Farm() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | CropCategory
  >("All");
  const [expandedCrop, setExpandedCrop] = useState<string | null>(null);

  const filtered = crops.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.season.toLowerCase().includes(search.toLowerCase()) ||
      c.soil.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const kharifCount = crops.filter((c) =>
    c.season.toLowerCase().includes("kharif"),
  ).length;
  const rabiCount = crops.filter((c) =>
    c.season.toLowerCase().includes("rabi"),
  ).length;
  const yearRoundCount = crops.filter((c) =>
    c.season.toLowerCase().includes("year-round"),
  ).length;

  const categoryCounts = cropCategories.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat] =
        cat === "All"
          ? crops.length
          : crops.filter((c) => c.category === cat).length;
      return acc;
    },
    {},
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-eco-primary py-16 text-white text-center">
        <AnimatedSection animation="slideUp">
          <h1 className="text-4xl font-display font-bold mb-4">
            {t("farmTitle")}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">{t("farmSubtitle")}</p>
        </AnimatedSection>
      </section>

      {/* Stats Bar */}
      <section className="bg-eco-dark py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Crops", value: crops.length, emoji: "🌱" },
              { label: "Kharif Crops", value: kharifCount, emoji: "☀️" },
              { label: "Rabi Crops", value: rabiCount, emoji: "❄️" },
              { label: "Year-Round", value: yearRoundCount, emoji: "🔄" },
            ].map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="text-2xl font-bold text-eco-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Category Filters */}
      <section className="py-6 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative max-w-md mx-auto mb-5">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-eco-primary"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`${t("search")} crops...`}
              className="w-full pl-10 pr-4 py-3 border border-eco-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-primary bg-white"
              data-ocid="farm.search_input"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {cropCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`farm.${cat.toLowerCase().replace(/\s+/g, "_")}.tab`}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                  selectedCategory === cat
                    ? "bg-eco-primary text-white border-eco-primary shadow-md"
                    : "bg-white text-eco-dark border-eco-primary/20 hover:border-eco-primary hover:text-eco-primary"
                }`}
              >
                <span>{categoryEmojis[cat]}</span>
                {cat}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-eco-primary/10 text-eco-primary"
                  }`}
                >
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop Table */}
      <section className="py-8 bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto rounded-2xl shadow-sm border border-eco-primary/10">
            <table className="w-full">
              <thead className="bg-eco-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Crop
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    {t("season")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold hidden lg:table-cell">
                    {t("soilType")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold hidden xl:table-cell">
                    {t("cropBenefits")}
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((crop, i) => (
                  <React.Fragment key={crop.name}>
                    <tr
                      className={`cursor-pointer transition-colors duration-150 ${
                        i % 2 === 0 ? "bg-white" : "bg-eco-light/50"
                      } hover:bg-eco-light`}
                      onClick={() =>
                        setExpandedCrop(
                          expandedCrop === crop.name ? null : crop.name,
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setExpandedCrop(
                            expandedCrop === crop.name ? null : crop.name,
                          );
                      }}
                    >
                      <td className="px-4 py-3 font-medium text-eco-dark text-sm">
                        <span className="mr-2">{crop.emoji}</span>
                        {crop.name}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="text-xs bg-eco-primary/10 text-eco-primary px-2 py-0.5 rounded-full font-medium">
                          {categoryEmojis[crop.category]} {crop.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {crop.season}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm hidden lg:table-cell">
                        {crop.soil}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm hidden xl:table-cell">
                        {crop.benefits}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          data-ocid="farm.crop.toggle"
                          className="text-eco-primary hover:text-eco-dark transition-colors"
                          aria-label={`${expandedCrop === crop.name ? "Collapse" : "Expand"} ${crop.name}`}
                        >
                          {expandedCrop === crop.name ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedCrop === crop.name && (
                      <tr className="bg-eco-light/80 border-t border-eco-primary/10">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                              <p className="text-xs text-gray-500 font-medium mb-1">
                                💧 Water Req.
                              </p>
                              <p className="text-sm font-semibold text-eco-dark">
                                {crop.waterReq}
                              </p>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                              <p className="text-xs text-gray-500 font-medium mb-1">
                                ⏱️ Duration
                              </p>
                              <p className="text-sm font-semibold text-eco-dark">
                                {crop.duration}
                              </p>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                              <p className="text-xs text-gray-500 font-medium mb-1">
                                📍 Best States
                              </p>
                              <p className="text-sm font-semibold text-eco-dark">
                                {crop.bestStates}
                              </p>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm">
                              <p className="text-xs text-gray-500 font-medium mb-1">
                                🌿 Organic Tip
                              </p>
                              <p className="text-sm font-semibold text-eco-dark">
                                {crop.fertilizerTip}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 bg-eco-primary/10 rounded-xl p-3">
                            <p className="text-xs text-eco-primary font-semibold mb-1">
                              💡 Farming Tip
                            </p>
                            <p className="text-sm text-gray-700">{crop.tips}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div
                className="text-center py-12 text-gray-400"
                data-ocid="farm.empty_state"
              >
                No crops found matching your search.
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            {filtered.length} crops found
          </p>
        </div>
      </section>

      {/* Mobile Cards */}
      <section className="py-6 bg-white md:hidden">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 && (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="farm.empty_state"
            >
              No crops found matching your search.
            </div>
          )}
          <div className="space-y-4">
            {filtered.map((crop, i) => (
              <AnimatedSection
                key={crop.name}
                animation="slideUp"
                delay={i * 40}
              >
                <div className="bg-eco-light rounded-2xl shadow-sm border border-eco-primary/10 overflow-hidden">
                  <button
                    type="button"
                    className="flex items-center justify-between p-4 cursor-pointer w-full text-left"
                    onClick={() =>
                      setExpandedCrop(
                        expandedCrop === crop.name ? null : crop.name,
                      )
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{crop.emoji}</span>
                      <div>
                        <p className="font-bold text-eco-dark text-sm">
                          {crop.name}
                        </p>
                        <p className="text-xs text-gray-500">{crop.season}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-eco-primary/10 text-eco-primary px-2 py-0.5 rounded-full hidden sm:inline font-medium">
                        {crop.category}
                      </span>
                      {expandedCrop === crop.name ? (
                        <ChevronUp size={18} className="text-eco-primary" />
                      ) : (
                        <ChevronDown size={18} className="text-eco-primary" />
                      )}
                    </div>
                  </button>
                  {expandedCrop === crop.name && (
                    <div className="px-4 pb-4 border-t border-eco-primary/10 pt-3">
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-white rounded-xl p-2.5">
                          <p className="text-xs text-gray-500">🌍 Soil</p>
                          <p className="text-xs font-semibold text-eco-dark mt-0.5">
                            {crop.soil}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-2.5">
                          <p className="text-xs text-gray-500">💧 Water</p>
                          <p className="text-xs font-semibold text-eco-dark mt-0.5">
                            {crop.waterReq}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-2.5">
                          <p className="text-xs text-gray-500">⏱️ Duration</p>
                          <p className="text-xs font-semibold text-eco-dark mt-0.5">
                            {crop.duration}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-2.5">
                          <p className="text-xs text-gray-500">
                            📍 Best States
                          </p>
                          <p className="text-xs font-semibold text-eco-dark mt-0.5">
                            {crop.bestStates}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 mb-2">
                        <p className="text-xs text-gray-500 mb-0.5">
                          ✅ Benefits
                        </p>
                        <p className="text-xs text-eco-dark">{crop.benefits}</p>
                      </div>
                      <div className="bg-eco-primary/10 rounded-xl p-2.5">
                        <p className="text-xs text-eco-primary font-semibold mb-0.5">
                          💡 Tip
                        </p>
                        <p className="text-xs text-gray-700">{crop.tips}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
            {filtered.length} crops found
          </p>
        </div>
      </section>

      {/* Growing Calendar */}
      <section className="py-10 bg-eco-light">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-2xl font-display font-bold text-eco-dark mb-2 text-center">
              🗓️ Growing Calendar
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              Monthly sowing activity guide for major crop seasons
            </p>
          </AnimatedSection>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-eco-dark text-white">
                  <th className="px-3 py-2 text-left text-sm font-semibold w-32">
                    Season
                  </th>
                  {monthCalendar.map((m) => (
                    <th
                      key={m.month}
                      className="px-2 py-2 text-center text-xs font-semibold"
                    >
                      {m.month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-3 py-3 text-sm font-medium text-eco-dark">
                    ☀️ Kharif
                  </td>
                  {monthCalendar.map((m) => (
                    <td key={m.month} className="px-2 py-3 text-center">
                      <div
                        className={`w-6 h-6 rounded-full mx-auto ${
                          m.kharif ? "bg-eco-primary" : "bg-gray-100"
                        }`}
                        title={m.kharif ? "Active" : "Inactive"}
                      />
                    </td>
                  ))}
                </tr>
                <tr className="bg-eco-light/50">
                  <td className="px-3 py-3 text-sm font-medium text-eco-dark">
                    ❄️ Rabi
                  </td>
                  {monthCalendar.map((m) => (
                    <td key={m.month} className="px-2 py-3 text-center">
                      <div
                        className={`w-6 h-6 rounded-full mx-auto ${
                          m.rabi ? "bg-eco-secondary" : "bg-gray-100"
                        }`}
                        title={m.rabi ? "Active" : "Inactive"}
                      />
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="px-3 py-3 text-sm font-medium text-eco-dark">
                    🔄 Year-Round
                  </td>
                  {monthCalendar.map((m) => (
                    <td key={m.month} className="px-2 py-3 text-center">
                      <div
                        className="w-6 h-6 rounded-full mx-auto bg-eco-accent/60"
                        title="Active"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-eco-primary inline-block" />
              Kharif (Jun–Oct)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-eco-secondary inline-block" />
              Rabi (Oct–Mar)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-eco-accent/60 inline-block" />
              Year-Round
            </span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <h2 className="text-2xl font-display font-bold text-eco-dark mb-6 text-center">
              Benefits of Organic Farming
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "🌱 Improves soil health and biodiversity",
              "💧 Conserves water resources",
              "🚫 Eliminates harmful chemical residues",
              "💰 Premium prices in organic markets",
              "🌍 Reduces carbon footprint",
              "🏥 Healthier food for consumers",
            ].map((benefit, i) => (
              <AnimatedSection key={benefit} animation="zoomIn" delay={i * 80}>
                <div className="bg-eco-light rounded-xl p-4 shadow-sm text-sm text-gray-700">
                  {benefit}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
