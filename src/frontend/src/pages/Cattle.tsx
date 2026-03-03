import React, { useState } from "react";

const animals = [
  {
    name: "Cow",
    emoji: "🐄",
    image: "/assets/generated/animal-cow.dim_400x300.png",
    summary:
      "Cows are the backbone of Indian agriculture, providing milk, dung for manure, and draught power for farming.",
    breeds: "Gir, Sahiwal, Red Sindhi, Tharparkar, Ongole",
    feed: "Green fodder (napier grass, maize), dry fodder (wheat straw, rice straw), concentrate feed (cotton seed cake, groundnut cake), mineral mixture",
    health:
      "Vaccinate against FMD, BQ, HS annually. Deworm every 3 months. Regular hoof trimming and body grooming.",
    diseases:
      "Foot & Mouth Disease (FMD), Brucellosis, Mastitis, Theileriosis — prevent with timely vaccination and clean housing.",
    housing:
      "Loose housing system with 40 sq ft per animal. Proper drainage, ventilation, and shade essential. Clean bedding daily.",
    productivity:
      "Gir: 10–15 litres/day; Sahiwal: 8–12 litres/day; Ongole: good draught power. Lactation period 280–300 days.",
    marketValue:
      "₹30,000–₹80,000 per animal depending on breed, age, and milk yield.",
  },
  {
    name: "Buffalo",
    emoji: "🐃",
    image: "/assets/generated/animal-buffalo.dim_400x300.png",
    summary:
      "Buffaloes are prized for their high-fat milk used in ghee and paneer production, and are well-adapted to Indian climate.",
    breeds: "Murrah, Surti, Mehsana, Jaffarabadi, Nili-Ravi",
    feed: "Green fodder (berseem, lucerne), dry fodder (paddy straw), concentrate (mustard cake, wheat bran), mineral supplements",
    health:
      "Vaccinate against FMD and HS. Regular deworming. Monitor for mastitis and reproductive disorders.",
    diseases:
      "Hemorrhagic Septicemia, FMD, Mastitis, Trypanosomiasis — maintain hygiene and timely vaccination.",
    housing:
      "Pucca shed with 50 sq ft per animal. Wallowing tank or sprinkler system for cooling in summer.",
    productivity:
      "Murrah: 15–25 litres/day with 7–8% fat content. Excellent for dairy processing.",
    marketValue:
      "₹50,000–₹1,50,000 per animal. Murrah buffaloes command premium prices.",
  },
  {
    name: "Goat",
    emoji: "🐐",
    image: "/assets/generated/animal-goat.dim_400x300.png",
    summary:
      'Goats are called the "poor man\'s cow" — they provide milk, meat, and fiber with low input costs and high adaptability.',
    breeds: "Jamunapari, Beetal, Barbari, Sirohi, Black Bengal",
    feed: "Browse (leaves, shrubs), green fodder, dry fodder, kitchen waste, mineral licks",
    health:
      "Vaccinate against PPR, Enterotoxemia, FMD. Deworm every 2 months. Trim hooves regularly.",
    diseases:
      "PPR (Goat Plague), Enterotoxemia, Foot Rot, Pneumonia — isolate sick animals immediately.",
    housing:
      "Elevated slatted floor housing (2 sq ft per adult). Good ventilation to prevent respiratory diseases.",
    productivity:
      "Jamunapari: 2–3 litres/day milk. Meat breeds: 25–35 kg live weight at 12 months.",
    marketValue:
      "₹5,000–₹25,000 per animal. High demand during Eid and festivals.",
  },
  {
    name: "Poultry",
    emoji: "🐔",
    image: "/assets/generated/animal-poultry.dim_400x300.png",
    summary:
      "Poultry farming provides eggs and meat with quick returns, making it ideal for small and marginal farmers.",
    breeds: "Kadaknath, Aseel, Giriraja, BV-380, Vanraja",
    feed: "Maize, soybean meal, fish meal, vitamin-mineral premix, oyster shell for calcium",
    health:
      "Vaccinate against Newcastle Disease, Marek's Disease, IBD. Biosecurity measures essential.",
    diseases:
      "Ranikhet Disease, Fowl Pox, Coccidiosis, Avian Influenza — strict biosecurity and vaccination schedule.",
    housing:
      "Deep litter system (1 sq ft per bird) or cage system. Proper ventilation and lighting management.",
    productivity:
      "Layer breeds: 280–300 eggs/year. Broiler: 2 kg in 6 weeks. Kadaknath: premium black meat.",
    marketValue:
      "Eggs: ₹5–8 each. Broiler: ₹100–150/kg live weight. Kadaknath: ₹500–800/kg.",
  },
  {
    name: "Sheep",
    emoji: "🐑",
    image: "/assets/generated/animal-cow.dim_400x300.png",
    summary:
      "Sheep provide wool, meat (mutton), and milk, and are well-suited for dry and semi-arid regions of India.",
    breeds: "Merino, Rambouillet, Deccani, Nellore, Marwari",
    feed: "Pasture grazing, dry fodder, concentrate supplement during pregnancy and lactation",
    health:
      "Vaccinate against Enterotoxemia, PPR, FMD. Shear wool twice a year. Regular foot bathing.",
    diseases:
      "Enterotoxemia, Foot Rot, Bluetongue, Internal parasites — rotational grazing reduces parasite load.",
    housing:
      "Simple shed with 10–15 sq ft per animal. Slatted floor preferred to prevent foot rot.",
    productivity:
      "Wool: 2–4 kg/year. Meat: 20–30 kg at 12 months. Milk: 0.5–1 litre/day.",
    marketValue:
      "₹5,000–₹15,000 per animal. Wool: ₹30–100/kg depending on quality.",
  },
  {
    name: "Horse",
    emoji: "🐎",
    image: "/assets/generated/cattle-horse.dim_400x300.png",
    summary:
      "Horses are used for transportation, agricultural work, sports, and tourism, with growing demand in equestrian activities across India.",
    breeds: "Marwari, Kathiawari, Thoroughbred, Sindhi, Manipuri Pony",
    feed: "Oats, barley, bran, green fodder (lucerne, berseem), hay, mineral supplements, salt licks",
    health:
      "Vaccinate against Equine Influenza, Tetanus, Strangles. Deworm every 6–8 weeks. Regular dental check-ups.",
    diseases:
      "Equine Influenza, Strangles, Colic, Laminitis — proper feeding management prevents most digestive issues.",
    housing:
      "Individual loose boxes (12×12 ft) with good ventilation. Bedding of straw or sawdust. Daily exercise essential.",
    productivity:
      "Draught work: 6–8 hours/day. Marwari horses fetch premium prices in equestrian sports and tourism.",
    marketValue:
      "₹50,000–₹5,00,000+ per animal. Marwari stallions can fetch ₹10–50 lakhs.",
  },
  {
    name: "Pig",
    emoji: "🐷",
    image: "/assets/generated/cattle-pig.dim_400x300.png",
    summary:
      "Pig farming offers the highest feed-to-meat conversion ratio among livestock, making it highly profitable for small farmers.",
    breeds:
      "Large White Yorkshire, Landrace, Duroc, Hampshire, Ghungroo (indigenous)",
    feed: "Kitchen waste, agricultural by-products, maize, rice bran, soybean meal, green fodder",
    health:
      "Vaccinate against Swine Fever, FMD, Erysipelas. Deworm every 3 months. Maintain strict hygiene.",
    diseases:
      "Classical Swine Fever, African Swine Fever, Porcine Parvovirus — biosecurity is critical.",
    housing:
      "Concrete floor pens (8 sq ft per pig). Separate farrowing pens. Wallowing area for temperature regulation.",
    productivity:
      "Litter size: 8–12 piglets. Market weight (80–100 kg) achieved in 6–7 months. FCR: 3:1.",
    marketValue: "₹150–250/kg live weight. Breeding boars: ₹15,000–40,000.",
  },
  {
    name: "Rabbit",
    emoji: "🐰",
    image: "/assets/generated/cattle-rabbit.dim_400x300.png",
    summary:
      "Rabbit farming requires minimal space and investment, producing lean meat and soft fur with rapid reproduction cycles.",
    breeds:
      "New Zealand White, Soviet Chinchilla, Grey Giant, Angora (for wool), White Giant",
    feed: "Green fodder (lucerne, berseem, cabbage leaves), dry fodder, pellets, fresh vegetables, hay",
    health:
      "Vaccinate against Myxomatosis and Rabbit Hemorrhagic Disease. Keep cages clean and dry.",
    diseases:
      "Coccidiosis, Pasteurellosis, Mange, Enteritis — maintain dry housing and avoid overcrowding.",
    housing:
      "Wire mesh cages (2.5×1.5 ft per rabbit) elevated 2–3 ft from ground. Separate breeding and growing cages.",
    productivity:
      "Does produce 4–6 litters/year with 6–8 kits each. Market weight (2 kg) in 8–10 weeks.",
    marketValue:
      "Meat: ₹300–500/kg. Angora wool: ₹1,000–2,000/kg. Breeding pairs: ₹1,500–3,000.",
  },
  {
    name: "Duck",
    emoji: "🦆",
    image: "/assets/generated/cattle-duck.dim_400x300.png",
    summary:
      "Ducks are hardy birds that thrive in wetland areas, producing eggs with higher nutritional value than chicken eggs.",
    breeds: "Khaki Campbell, Indian Runner, Pekin, Muscovy, Desi Duck",
    feed: "Aquatic plants, insects, snails, rice bran, maize, fish meal, commercial duck pellets",
    health:
      "Vaccinate against Duck Plague and Duck Cholera. Provide clean water for bathing and drinking.",
    diseases:
      "Duck Plague (Duck Virus Enteritis), Duck Cholera, Aspergillosis — avoid stagnant water sources.",
    housing:
      "Simple shed with access to water body. 3–4 sq ft per duck. Night shelter essential for predator protection.",
    productivity:
      "Khaki Campbell: 280–300 eggs/year. Eggs weigh 65–75g with rich yolk. Meat ducks: 2.5–3 kg in 8 weeks.",
    marketValue:
      "Duck eggs: ₹8–12 each. Meat: ₹180–250/kg. Khaki Campbell ducks: ₹300–600 each.",
  },
  {
    name: "Turkey",
    emoji: "🦃",
    image: "/assets/generated/cattle-turkey.dim_400x300.png",
    summary:
      "Turkey farming is gaining popularity in India for its lean, nutritious meat with growing demand in urban markets and hotels.",
    breeds:
      "Broad Breasted White, Bronze, Beltsville Small White, Black, Narragansett",
    feed: "Maize, sorghum, soybean meal, fish meal, green fodder, vitamin-mineral premix",
    health:
      "Vaccinate against Newcastle Disease, Fowl Pox. Keep separate from chickens to prevent Blackhead disease.",
    diseases:
      "Blackhead (Histomoniasis), Newcastle Disease, Fowl Cholera — never house with chickens.",
    housing:
      "Open range or semi-intensive system. 5–6 sq ft per bird indoors. Roosts at 2–3 ft height.",
    productivity:
      "Toms reach 10–15 kg in 20–24 weeks. Hens: 6–8 kg. Egg production: 80–100 eggs/year.",
    marketValue:
      "₹250–400/kg live weight. Whole dressed turkey: ₹400–600/kg. High demand during Christmas.",
  },
  {
    name: "Quail",
    emoji: "🐦",
    image: "/assets/generated/cattle-quail.dim_400x300.png",
    summary:
      "Japanese quail farming offers quick returns with eggs in just 6–7 weeks, requiring minimal space and investment.",
    breeds:
      "Japanese Quail (Coturnix coturnix japonica), White Breasted, Tuxedo, British Range",
    feed: "Quail starter feed (28% protein), grower feed (24% protein), layer feed (22% protein), grit",
    health:
      "Generally hardy birds. Vaccinate against Newcastle Disease. Maintain strict biosecurity.",
    diseases:
      "Ulcerative Enteritis, Quail Bronchitis, Coccidiosis — maintain dry litter and proper ventilation.",
    housing:
      "Battery cage system (1 sq ft per 6 birds) or deep litter (1 sq ft per 3 birds). Temperature 20–25°C.",
    productivity:
      "Egg laying starts at 6–7 weeks. 250–300 eggs/year. Meat birds: 200g in 5 weeks.",
    marketValue:
      "Quail eggs: ₹2–4 each. Meat: ₹200–300/kg. Day-old chicks: ₹15–25 each.",
  },
  {
    name: "Camel",
    emoji: "🐪",
    image: "/assets/generated/cattle-camel.dim_400x300.png",
    summary:
      'Camels are the "ships of the desert," providing milk, transportation, and draught power in arid regions of Rajasthan and Gujarat.',
    breeds: "Bikaneri, Jaisalmeri, Mewari, Kachchi, Sindhi",
    feed: "Desert shrubs, dry fodder, salt bush, dates, barley, wheat bran — can survive on minimal water",
    health:
      "Vaccinate against Camel Pox, Trypanosomiasis. Regular deworming. Foot care in rocky terrain.",
    diseases:
      "Camel Pox, Trypanosomiasis (Surra), Mange, Pneumonia — maintain good nutrition for immunity.",
    housing:
      "Open paddock with shade structure. 200 sq ft per camel. Sandy soil preferred for foot health.",
    productivity:
      "Milk: 5–10 litres/day with medicinal properties. Draught: can carry 200–300 kg loads.",
    marketValue:
      "₹50,000–₹2,00,000 per camel. Camel milk: ₹50–100/litre with premium health market.",
  },
  {
    name: "Donkey",
    emoji: "🫏",
    image: "/assets/generated/cattle-donkey.dim_400x300.png",
    summary:
      "Donkeys are invaluable working animals for small farmers, providing reliable transportation and draught power in hilly and rural areas.",
    breeds: "Spiti, Halari, Ladakhi, Kathiawari Donkey, Nagar",
    feed: "Dry fodder (wheat straw, hay), browse, minimal concentrate. Very efficient feed converters.",
    health:
      "Vaccinate against Tetanus, Equine Influenza. Regular hoof trimming every 6–8 weeks. Dental care.",
    diseases:
      "Strangles, Equine Influenza, Internal parasites, Skin diseases — regular deworming essential.",
    housing:
      "Simple shed with 40–50 sq ft per animal. Dry bedding. Shade and water access essential.",
    productivity:
      "Can carry 50–80 kg loads for 6–8 hours/day. Used in brick kilns, salt pans, and hill transport.",
    marketValue:
      "₹10,000–₹40,000 per animal. Working donkeys in high demand in construction and agriculture.",
  },
  {
    name: "Yak",
    emoji: "🐂",
    image: "/assets/generated/cattle-yak.dim_400x300.png",
    summary:
      "Yaks are the lifeline of high-altitude communities in Ladakh, Himachal Pradesh, and Sikkim, providing milk, meat, fiber, and transport.",
    breeds: "Wild Yak, Domestic Yak, Khainag (Yak-Cattle hybrid), Dzo",
    feed: "Alpine grasses, sedges, mosses, lichens — highly adapted to sparse high-altitude vegetation",
    health:
      "Vaccinate against FMD, HS. Resistant to many diseases due to harsh environment adaptation.",
    diseases:
      "Yak Pox, Theileriosis, Respiratory infections in lower altitudes — avoid heat stress.",
    housing:
      "Open grazing with simple stone shelters. Cannot tolerate temperatures above 15°C for extended periods.",
    productivity:
      "Milk: 1–2 litres/day with 6–7% fat. Fiber (khullu): 1–2 kg/year. Meat: excellent quality.",
    marketValue:
      "₹30,000–₹80,000 per animal. Yak fiber: ₹500–1,500/kg. High-value niche market.",
  },
  {
    name: "Fish",
    emoji: "🐟",
    image: "/assets/generated/cattle-fish.dim_400x300.png",
    summary:
      "Aquaculture is one of the fastest-growing food sectors in India, with fish farming providing high protein food and excellent income.",
    breeds:
      "Rohu, Catla, Mrigal, Common Carp, Tilapia, Pangasius, Freshwater Prawn",
    feed: "Supplementary feed (rice bran + mustard oil cake), commercial pellets, natural plankton, duckweed",
    health:
      "Maintain water quality (pH 7–8.5, DO >5 mg/L). Lime treatment before stocking. Regular monitoring.",
    diseases:
      "Epizootic Ulcerative Syndrome (EUS), Bacterial Gill Disease, Dropsy — maintain water quality.",
    housing:
      "Earthen ponds (0.1–1 ha), cement tanks, or cage culture. Stocking density: 5,000–10,000 fish/ha.",
    productivity:
      "Composite fish culture: 3,000–5,000 kg/ha/year. Tilapia: 5,000–8,000 kg/ha/year.",
    marketValue:
      "Rohu/Catla: ₹120–180/kg. Tilapia: ₹80–120/kg. Prawn: ₹300–600/kg.",
  },
];

const benefits = [
  {
    title: "Healthier Animals",
    detail:
      "Organic rearing practices reduce exposure to synthetic chemicals and antibiotics, resulting in stronger immune systems. Animals raised organically often exhibit better overall health, longevity, and natural disease resistance.",
  },
  {
    title: "Higher Quality Products",
    detail:
      "Organic milk, meat, and eggs contain higher levels of omega-3 fatty acids, vitamins, and antioxidants compared to conventionally produced products. Consumers increasingly prefer and pay premium prices for certified organic animal products.",
  },
  {
    title: "Environmental Sustainability",
    detail:
      "Organic cattle rearing reduces soil and water pollution by eliminating synthetic chemical inputs and promoting natural waste recycling. Organic manure enriches soil fertility and supports biodiversity on and around the farm.",
  },
  {
    title: "Better Animal Welfare",
    detail:
      "Organic standards mandate access to open pasture, natural behavior expression, and humane treatment throughout the animal's life. Animals raised in stress-free environments with natural diets show improved temperament and productivity.",
  },
  {
    title: "Premium Market Prices",
    detail:
      "Certified organic animal products command 20–50% higher prices in domestic and export markets. Growing consumer awareness about food safety and sustainability is driving rapid expansion of the organic livestock market.",
  },
  {
    title: "Reduced Input Costs",
    detail:
      "Organic farming relies on locally available feed, natural remedies, and traditional knowledge, significantly reducing dependency on expensive commercial inputs. Farmers who transition to organic methods often report lower veterinary and feed costs over time.",
  },
  {
    title: "Soil Health Improvement",
    detail:
      "Organic manure from cattle improves soil structure, water retention, and microbial activity far better than chemical fertilizers. Integrating livestock with crop farming creates a self-sustaining nutrient cycle that benefits the entire farm ecosystem.",
  },
  {
    title: "Carbon Footprint Reduction",
    detail:
      "Organic livestock systems sequester more carbon in soil through improved pasture management and reduced synthetic inputs. Sustainable grazing practices help mitigate climate change while maintaining productive farmland for future generations.",
  },
];

export default function Cattle() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = animals.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🐄</div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Organic Cattle & Livestock
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guide to organic livestock rearing — from traditional
            cattle to modern aquaculture. Discover breeds, feeding, health
            management, and market opportunities.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <input
            type="text"
            placeholder="🔍 Search animals (e.g., cow, goat, fish...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl mx-auto block px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {filtered.length} animal{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      {/* Animal Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((animal) => (
              <div
                key={animal.name}
                className="eco-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-primary/5">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute top-3 left-3 text-3xl">
                    {animal.emoji}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {animal.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {animal.summary}
                  </p>

                  {/* Quick Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-semibold min-w-[60px]">
                        Feed:
                      </span>
                      <span className="text-foreground/80 line-clamp-2">
                        {animal.feed}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-semibold min-w-[60px]">
                        Breeds:
                      </span>
                      <span className="text-foreground/80">
                        {animal.breeds}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setExpanded(expanded === animal.name ? null : animal.name)
                    }
                    className="w-full py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors"
                  >
                    {expanded === animal.name
                      ? "▲ Show Less"
                      : "▼ View More Details"}
                  </button>

                  {expanded === animal.name && (
                    <div className="mt-4 space-y-3 border-t border-border pt-4 animate-fadeIn">
                      <DetailRow label="🏥 Health Tips" value={animal.health} />
                      <DetailRow label="🦠 Diseases" value={animal.diseases} />
                      <DetailRow label="🏠 Housing" value={animal.housing} />
                      <DetailRow
                        label="📊 Productivity"
                        value={animal.productivity}
                      />
                      <DetailRow
                        label="💰 Market Value"
                        value={animal.marketValue}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">No animals found matching "{search}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits of Organic Cattle Rearing */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-3">
            Benefits of Organic Cattle Rearing
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Organic livestock farming creates a virtuous cycle of health,
            sustainability, and profitability for Indian farmers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="eco-card rounded-xl p-6 flex gap-4">
                <div className="text-2xl mt-1">✅</div>
                <div>
                  <h4 className="font-bold text-primary mb-1">{b.title}</h4>
                  <p className="text-sm text-muted-foreground">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm">
      <span className="font-semibold text-primary">{label}: </span>
      <span className="text-foreground/80">{value}</span>
    </div>
  );
}
