import React, { useEffect, useRef, useState } from 'react';

interface Scheme {
  name: string;
  description: string;
  benefits: string[];
  eligibility: string;
  officialWebsite: string;
  applyUrl: string;
  icon: string;
  color: string;
}

const schemes: Scheme[] = [
  {
    name: 'PM-KISAN',
    description: 'Pradhan Mantri Kisan Samman Nidhi provides direct income support of ₹6,000 per year to all landholding farmer families across India. The amount is transferred in three equal installments of ₹2,000 directly to the bank accounts of beneficiaries. This scheme aims to supplement the financial needs of farmers in procuring inputs for crop health and yield. Over 11 crore farmers have benefited since its launch in 2019.',
    benefits: [
      '₹6,000 annual direct income support in 3 installments',
      'Direct bank transfer — no middlemen',
      'Covers all landholding farmer families',
      'Helps purchase seeds, fertilizers, and equipment',
      'Linked with Kisan Credit Card for additional credit',
    ],
    eligibility: 'All landholding farmer families with cultivable land. Excludes institutional landholders, government employees, income tax payers, and professionals.',
    officialWebsite: 'https://pmkisan.gov.in',
    applyUrl: 'https://pmkisan.gov.in',
    icon: '💰',
    color: 'from-green-500/20 to-emerald-500/10',
  },
  {
    name: 'PMFBY',
    description: 'Pradhan Mantri Fasal Bima Yojana provides comprehensive crop insurance coverage against natural calamities, pests, and diseases. Farmers pay a very low premium (2% for Kharif, 1.5% for Rabi, 5% for commercial crops) while the government subsidizes the rest. The scheme uses technology like satellite imagery and drones for quick claim settlement. It covers pre-sowing to post-harvest losses including prevented sowing.',
    benefits: [
      'Low premium: 2% Kharif, 1.5% Rabi, 5% commercial crops',
      'Coverage from pre-sowing to post-harvest',
      'Technology-driven quick claim settlement',
      'Covers localized calamities like hailstorm and landslide',
      'Mandatory for loanee farmers, voluntary for others',
    ],
    eligibility: 'All farmers growing notified crops in notified areas. Mandatory for loanee farmers; voluntary for non-loanee farmers.',
    officialWebsite: 'https://pmfby.gov.in',
    applyUrl: 'https://pmfby.gov.in',
    icon: '🛡️',
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    name: 'Kisan Credit Card',
    description: 'Kisan Credit Card (KCC) provides farmers with affordable and timely credit for agricultural and allied activities. The scheme offers revolving credit facility with a flexible repayment schedule based on harvesting and marketing period. Interest subvention of 2% is provided, making effective interest rate as low as 4% for prompt repayers. The card also covers post-harvest expenses, maintenance of farm assets, and consumption requirements.',
    benefits: [
      'Credit up to ₹3 lakh at 4% interest for prompt repayment',
      'Flexible repayment aligned with crop cycles',
      'Covers crop cultivation, post-harvest, and allied activities',
      'Personal accident insurance coverage included',
      'ATM-enabled RuPay card for easy access',
    ],
    eligibility: 'All farmers including tenant farmers, oral lessees, sharecroppers, and SHG/JLG members engaged in agriculture and allied activities.',
    officialWebsite: 'https://www.nabard.org/content1.aspx?id=572',
    applyUrl: 'https://www.nabard.org/content1.aspx?id=572',
    icon: '💳',
    color: 'from-purple-500/20 to-violet-500/10',
  },
  {
    name: 'NMSA',
    description: 'National Mission for Sustainable Agriculture promotes sustainable farming practices to enhance agricultural productivity while conserving natural resources. The mission focuses on soil health management, water use efficiency, and climate change adaptation. It integrates traditional knowledge with modern technology to develop location-specific farming systems. NMSA supports organic farming, integrated farming systems, and precision agriculture.',
    benefits: [
      'Promotes soil health and organic matter improvement',
      'Water conservation and efficient irrigation support',
      'Climate-resilient crop varieties and practices',
      'Integrated farming system development',
      'Training and capacity building for farmers',
    ],
    eligibility: 'All farmers, especially those in rain-fed areas, hill regions, and areas prone to climate variability. Priority to small and marginal farmers.',
    officialWebsite: 'https://nmsa.dac.gov.in',
    applyUrl: 'https://nmsa.dac.gov.in',
    icon: '🌱',
    color: 'from-teal-500/20 to-green-500/10',
  },
  {
    name: 'Soil Health Card',
    description: 'The Soil Health Card scheme provides farmers with a card containing information about their soil\'s nutrient status and recommendations for appropriate dosage of nutrients. Soil samples are collected and tested at government labs every 2 years. The card recommends fertilizer doses based on actual soil nutrient levels, helping farmers optimize input use. This scheme has helped reduce fertilizer overuse and improve crop yields across India.',
    benefits: [
      'Free soil testing every 2 years',
      'Crop-wise fertilizer recommendations',
      'Reduces input costs by optimizing fertilizer use',
      'Improves soil health and long-term productivity',
      'Available in local language for easy understanding',
    ],
    eligibility: 'All farmers across India. Soil samples collected from every 2.5 hectares in irrigated areas and 10 hectares in rain-fed areas.',
    officialWebsite: 'https://soilhealth.dac.gov.in',
    applyUrl: 'https://soilhealth.dac.gov.in',
    icon: '🌍',
    color: 'from-amber-500/20 to-yellow-500/10',
  },
  {
    name: 'PMKSY',
    description: 'Pradhan Mantri Krishi Sinchayee Yojana aims to achieve "Har Khet Ko Pani" (water to every field) and "More Crop Per Drop" through improved water use efficiency. The scheme integrates water sources, distribution networks, and farm-level application to ensure end-to-end irrigation solutions. It promotes micro-irrigation (drip and sprinkler) with 55% subsidy for small/marginal farmers. PMKSY has brought over 76 lakh hectares under micro-irrigation.',
    benefits: [
      'Subsidy up to 55% on drip and sprinkler irrigation',
      'Convergence of all water-related schemes',
      'Watershed development and groundwater recharge',
      'Reduces water consumption by 40–50%',
      'Increases crop yield by 40–50% with same water',
    ],
    eligibility: 'All farmers with agricultural land. Priority to small/marginal farmers, SC/ST farmers, and farmers in water-stressed areas.',
    officialWebsite: 'https://pmksy.gov.in',
    applyUrl: 'https://pmksy.gov.in',
    icon: '💧',
    color: 'from-sky-500/20 to-blue-500/10',
  },
  {
    name: 'RKVY',
    description: 'Rashtriya Krishi Vikas Yojana is a state-plan scheme that provides flexibility and autonomy to states to plan and execute programs for agriculture and allied sectors. The scheme focuses on bridging yield gaps, reducing production costs, and increasing farmers\' income through holistic development. RKVY-RAFTAAR (Remunerative Approaches for Agriculture and Allied sector Rejuvenation) supports agri-entrepreneurship and innovation. It has funded over 7,000 projects across India.',
    benefits: [
      'Flexible funding for state-specific agricultural needs',
      'Support for agri-startups and innovation (RAFTAAR)',
      'Infrastructure development for agriculture',
      'Skill development and capacity building',
      'Promotes value chain development and market linkages',
    ],
    eligibility: 'State governments implement schemes for farmers. Individual farmers benefit through state-level programs for infrastructure, technology, and market access.',
    officialWebsite: 'https://rkvy.nic.in',
    applyUrl: 'https://rkvy.nic.in',
    icon: '🚜',
    color: 'from-orange-500/20 to-red-500/10',
  },
  {
    name: 'PKVY',
    description: 'Paramparagat Krishi Vikas Yojana promotes organic farming through cluster-based approach and PGS (Participatory Guarantee System) certification. Farmers are organized into clusters of 50 farmers covering 50 acres for collective organic farming. Financial assistance of ₹50,000 per hectare over 3 years is provided for conversion to organic farming. PKVY helps farmers access premium organic markets and reduce input costs.',
    benefits: [
      '₹50,000/hectare financial assistance over 3 years',
      'Free PGS organic certification',
      'Cluster approach for collective marketing',
      'Training on organic farming practices',
      'Market linkage support for organic produce',
    ],
    eligibility: 'Farmers willing to convert to organic farming. Organized in clusters of 50 farmers covering 50 acres. Priority to traditional organic farming areas.',
    officialWebsite: 'https://pgsindia-ncof.gov.in',
    applyUrl: 'https://pgsindia-ncof.gov.in/pkvy/Index.aspx',
    icon: '🌿',
    color: 'from-lime-500/20 to-green-500/10',
  },
  {
    name: 'NFSM',
    description: 'National Food Security Mission aims to increase production of rice, wheat, pulses, coarse cereals, and commercial crops through area expansion and productivity enhancement. The mission provides improved seeds, farm machinery, and training to farmers in identified districts. NFSM has successfully increased food grain production by over 25 million tonnes since its launch. It focuses on technology dissemination and bridging yield gaps in low-productivity districts.',
    benefits: [
      'Subsidized improved seed varieties distribution',
      'Farm machinery and equipment support',
      'Demonstration of improved technologies',
      'Training and capacity building programs',
      'Soil amelioration and micronutrient management',
    ],
    eligibility: 'Farmers in identified NFSM districts across India. Priority to small and marginal farmers in low-productivity areas.',
    officialWebsite: 'https://nfsm.gov.in',
    applyUrl: 'https://nfsm.gov.in',
    icon: '🌾',
    color: 'from-yellow-500/20 to-amber-500/10',
  },
  {
    name: 'MIDH',
    description: 'Mission for Integrated Development of Horticulture promotes holistic growth of horticulture sector including fruits, vegetables, mushrooms, spices, flowers, aromatic plants, coconut, cashew, and bamboo. The mission provides financial assistance for area expansion, protected cultivation, post-harvest management, and market development. MIDH has helped India become the second-largest producer of fruits and vegetables globally. It supports cold chain infrastructure and processing facilities.',
    benefits: [
      'Subsidy for protected cultivation (polyhouse, greenhouse)',
      'Post-harvest infrastructure support',
      'Cold storage and processing facility assistance',
      'Planting material support for quality cultivation',
      'Market development and export promotion',
    ],
    eligibility: 'All horticulture farmers. Special focus on NE states, Himalayan states, and tribal areas. Subsidy varies by category and state.',
    officialWebsite: 'https://midh.gov.in',
    applyUrl: 'https://midh.gov.in',
    icon: '🍎',
    color: 'from-red-500/20 to-pink-500/10',
  },
  {
    name: 'PM-AASHA',
    description: 'Pradhan Mantri Annadata Aay SanraksHan Abhiyan ensures remunerative prices to farmers for their produce through Price Support Scheme (PSS), Price Deficiency Payment Scheme (PDPS), and Private Procurement & Stockist Scheme (PPSS). The scheme protects farmers from price crashes during bumper production years. It covers oilseeds, pulses, and copra under MSP operations. PM-AASHA has significantly improved farmer income stability.',
    benefits: [
      'MSP-based procurement for oilseeds and pulses',
      'Price deficiency payment when market price falls below MSP',
      'Private procurement with government support',
      'Protects against distress selling',
      'Covers 23 crops under MSP operations',
    ],
    eligibility: 'Farmers growing notified oilseeds, pulses, and copra in states that have signed MoU with central government for scheme implementation.',
    officialWebsite: 'https://agricoop.nic.in',
    applyUrl: 'https://pmaasha.dac.gov.in',
    icon: '🏦',
    color: 'from-indigo-500/20 to-blue-500/10',
  },
  {
    name: 'Agriculture Infrastructure Fund',
    description: 'Agriculture Infrastructure Fund (AIF) provides medium-long term debt financing for investment in viable projects for post-harvest management infrastructure and community farming assets. The scheme offers interest subvention of 3% per annum on loans up to ₹2 crore. Credit guarantee coverage is provided through CGTMSE for loans up to ₹2 crore. AIF has mobilized over ₹30,000 crore investment in agri-infrastructure.',
    benefits: [
      '3% interest subvention on loans up to ₹2 crore',
      'Credit guarantee through CGTMSE',
      'Covers cold storage, warehouses, processing units',
      'Available to FPOs, PACS, cooperatives, and entrepreneurs',
      'Moratorium period of 6 months to 2 years',
    ],
    eligibility: 'Farmers, FPOs, PACS, cooperatives, agri-entrepreneurs, startups, and central/state agencies for post-harvest and agri-infrastructure projects.',
    officialWebsite: 'https://agriinfra.dac.gov.in',
    applyUrl: 'https://agriinfra.dac.gov.in',
    icon: '🏗️',
    color: 'from-slate-500/20 to-gray-500/10',
  },
  {
    name: 'SMAM',
    description: 'Sub-Mission on Agricultural Mechanization promotes farm mechanization to reduce drudgery, improve timeliness of operations, and enhance productivity. The scheme provides subsidy of 40–50% on farm machinery and equipment to individual farmers and 80% to custom hiring centers. It establishes Farm Machinery Banks and Custom Hiring Centers to make machinery accessible to small farmers. SMAM has distributed over 15 lakh machines to farmers.',
    benefits: [
      '40–50% subsidy on farm machinery for individual farmers',
      '80% subsidy for Custom Hiring Centers',
      'Farm Machinery Banks for small farmers',
      'Covers tractors, power tillers, harvesters, and implements',
      'Training on machinery operation and maintenance',
    ],
    eligibility: 'All farmers with priority to small/marginal farmers, SC/ST farmers, and women farmers. FPOs and cooperatives eligible for Custom Hiring Centers.',
    officialWebsite: 'https://farmech.dac.gov.in',
    applyUrl: 'https://agrimachinery.nic.in',
    icon: '⚙️',
    color: 'from-zinc-500/20 to-neutral-500/10',
  },
  {
    name: 'NBHM',
    description: 'National Beekeeping and Honey Mission promotes scientific beekeeping for improving crop productivity through pollination and generating additional income for farmers. The mission aims to make India the largest honey producer globally. Financial assistance is provided for bee colonies, beehives, honey processing equipment, and training. NBHM supports the establishment of Integrated Beekeeping Development Centers across India.',
    benefits: [
      'Subsidy on bee colonies and beehives',
      'Honey processing and testing equipment support',
      'Training on scientific beekeeping practices',
      'Market linkage for honey and bee products',
      'Improves crop yield through pollination by 20–30%',
    ],
    eligibility: 'Farmers, unemployed youth, women, and tribal communities interested in beekeeping. FPOs and cooperatives for large-scale operations.',
    officialWebsite: 'https://nbb.gov.in',
    applyUrl: 'https://nbb.gov.in',
    icon: '🐝',
    color: 'from-yellow-500/20 to-orange-500/10',
  },
  {
    name: 'PMMSY',
    description: 'Pradhan Mantri Matsya Sampada Yojana aims to bring about a Blue Revolution through sustainable and responsible development of fisheries sector. The scheme targets doubling fishers\' income and creating 55 lakh employment opportunities by 2024–25. It provides financial assistance for aquaculture, capture fisheries, post-harvest infrastructure, and marketing. PMMSY has a total investment of ₹20,050 crore over 5 years.',
    benefits: [
      'Subsidy for fish pond construction and renovation',
      'Support for cage culture and biofloc technology',
      'Fishing vessel and equipment assistance',
      'Cold chain and processing infrastructure support',
      'Insurance coverage for fishers and fishing vessels',
    ],
    eligibility: 'Fishers, fish farmers, fish workers, fish vendors, FPOs, cooperatives, and entrepreneurs in fisheries sector. SC/ST and women get additional subsidy.',
    officialWebsite: 'https://pmmsy.dof.gov.in',
    applyUrl: 'https://pmmsy.dac.gov.in',
    icon: '🐟',
    color: 'from-cyan-500/20 to-teal-500/10',
  },
  {
    name: 'National Livestock Mission',
    description: 'National Livestock Mission focuses on sustainable development of livestock sector including cattle, buffalo, sheep, goat, pig, and poultry. The mission supports breed improvement, feed and fodder development, risk management, and extension services. It promotes entrepreneurship development in livestock sector through financial assistance and training. NLM has helped establish over 10,000 livestock-based enterprises across India.',
    benefits: [
      'Breed improvement through AI and ET technology',
      'Feed and fodder development support',
      'Livestock insurance at subsidized premium',
      'Entrepreneurship development in livestock sector',
      'Training and skill development for farmers',
    ],
    eligibility: 'All livestock farmers including cattle, buffalo, sheep, goat, pig, and poultry farmers. Priority to small/marginal farmers and women.',
    officialWebsite: 'https://dahd.nic.in',
    applyUrl: 'https://nlm.udyamimitra.in',
    icon: '🐄',
    color: 'from-brown-500/20 to-amber-500/10',
  },
  {
    name: 'e-NAM',
    description: 'National Agriculture Market (e-NAM) is a pan-India electronic trading portal that networks existing APMC mandis to create a unified national market for agricultural commodities. Farmers can sell their produce online to buyers across India, getting better prices through transparent price discovery. The platform has over 1.76 crore registered farmers and 2.39 lakh traders. e-NAM has facilitated trade worth over ₹2 lakh crore since its launch.',
    benefits: [
      'Access to national market from local mandi',
      'Transparent price discovery through online bidding',
      'Reduced transaction costs and middlemen',
      'Online payment directly to farmer\'s bank account',
      'Quality assaying and grading facilities at mandis',
    ],
    eligibility: 'All farmers in states/UTs that have joined e-NAM platform. Farmers need to register at their nearest e-NAM mandi with Aadhaar and bank account.',
    officialWebsite: 'https://enam.gov.in',
    applyUrl: 'https://www.enam.gov.in',
    icon: '🖥️',
    color: 'from-violet-500/20 to-purple-500/10',
  },
  {
    name: 'Agri-UDAAN',
    description: 'Agri-UDAAN is a mentorship program that helps agri-food startups scale their businesses and connect with investors, mentors, and markets. The program provides intensive mentoring, networking opportunities, and access to government schemes for agricultural innovation. It focuses on technology-driven solutions for farm productivity, supply chain, and market access. Agri-UDAAN has supported over 500 agri-startups across India.',
    benefits: [
      'Intensive mentorship from industry experts',
      'Access to investor network and funding opportunities',
      'Market linkage and pilot project support',
      'Technology and innovation support',
      'Access to government schemes and funding',
    ],
    eligibility: 'Agri-food startups and entrepreneurs with innovative solutions for agriculture. Focus on technology-driven solutions for farm productivity and market access.',
    officialWebsite: 'https://agricoop.nic.in',
    applyUrl: 'https://agricoop.nic.in',
    icon: '🚀',
    color: 'from-rose-500/20 to-pink-500/10',
  },
];

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function GovernmentSchemes() {
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleScheme = (name: string) => {
    setExpandedScheme(expandedScheme === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-primary/60 text-primary-foreground py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Government Agricultural Schemes</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover and apply for government schemes designed to support Indian farmers with financial aid, insurance, credit, and modern farming resources.
          </p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-full text-foreground bg-background/95 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xl">🔍</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'Active Schemes', value: '18+' },
            { label: 'Farmers Benefited', value: '11 Cr+' },
            { label: 'Annual Support', value: '₹6,000+' },
            { label: 'States Covered', value: 'All India' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredSchemes.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">No schemes found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary underline hover:no-underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme, index) => (
                <AnimatedSection key={scheme.name} delay={index * 60}>
                  <div className="eco-card h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
                    {/* Card Header */}
                    <div className={`bg-gradient-to-br ${scheme.color} rounded-t-xl p-5 flex items-start gap-3`}>
                      <span className="text-3xl flex-shrink-0">{scheme.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-foreground leading-tight">{scheme.name}</h2>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {scheme.description}
                      </p>

                      {/* Key Benefits */}
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                          Key Benefits
                        </h3>
                        <ul className="space-y-1">
                          {scheme.benefits.slice(0, expandedScheme === scheme.name ? scheme.benefits.length : 3).map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Eligibility */}
                      {expandedScheme === scheme.name && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">
                            Eligibility
                          </h3>
                          <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                        </div>
                      )}

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Toggle Button */}
                      <button
                        onClick={() => toggleScheme(scheme.name)}
                        className="text-xs text-primary hover:underline mb-4 text-left"
                      >
                        {expandedScheme === scheme.name ? '▲ Show less' : '▼ Show more details'}
                      </button>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                        <a
                          href={scheme.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-sm"
                        >
                          <span>✅</span>
                          Apply Now
                        </a>
                        <a
                          href={scheme.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors duration-200"
                        >
                          <span>🌐</span>
                          Official Site
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="text-4xl mb-4">📞</div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Need Help Applying?
            </h2>
            <p className="text-muted-foreground mb-6 text-base">
              Our team can guide you through the application process for any government scheme. Reach out to us for personalized assistance.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-md"
            >
              Contact Us for Help
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
