import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface CropInfo {
  name: string;
  emoji: string;
  sowingSeason: string;
  soilType: string;
  expectedYield: string;
  waterRequirement: string;
  organicTips: string[];
  pestsAndDiseases: string;
}

interface RegionData {
  crops: CropInfo[];
  climate: string;
  description: string;
}

const regionCropData: Record<string, RegionData> = {
  Maharashtra: {
    climate: 'Semi-arid to tropical',
    description: 'Maharashtra has diverse agro-climatic zones ranging from coastal Konkan to the Deccan plateau, supporting a wide variety of crops.',
    crops: [
      {
        name: 'Sugarcane',
        emoji: '🌿',
        sowingSeason: 'October – November (Adsali), February – March (Suru)',
        soilType: 'Deep black cotton soil (Vertisol)',
        expectedYield: '80–100 tonnes/acre',
        waterRequirement: 'High (1500–2500 mm/season)',
        organicTips: [
          'Apply press mud compost at 10 t/ha before planting',
          'Use Trichoderma-enriched bio-compost to prevent root rot',
          'Intercrop with legumes like cowpea to fix nitrogen',
        ],
        pestsAndDiseases: 'Pyrilla, early shoot borer, red rot, smut',
      },
      {
        name: 'Cotton',
        emoji: '🌸',
        sowingSeason: 'June – July (Kharif)',
        soilType: 'Black cotton soil (Vertisol)',
        expectedYield: '8–12 quintals/acre (seed cotton)',
        waterRequirement: 'Moderate (700–1200 mm)',
        organicTips: [
          'Apply FYM 10 t/ha at land preparation',
          'Use neem oil spray (3%) for bollworm control',
          'Practice crop rotation with soybean or chickpea',
        ],
        pestsAndDiseases: 'Bollworm, whitefly, leaf curl virus, root rot',
      },
      {
        name: 'Soybean',
        emoji: '🫘',
        sowingSeason: 'June – July (Kharif)',
        soilType: 'Well-drained loamy to clay loam',
        expectedYield: '10–15 quintals/acre',
        waterRequirement: 'Moderate (450–700 mm)',
        organicTips: [
          'Seed treatment with Rhizobium culture for nitrogen fixation',
          'Apply vermicompost 2 t/ha at sowing',
          'Use yellow sticky traps for whitefly monitoring',
        ],
        pestsAndDiseases: 'Girdle beetle, stem fly, yellow mosaic virus',
      },
      {
        name: 'Jowar (Sorghum)',
        emoji: '🌾',
        sowingSeason: 'June – July (Kharif), October – November (Rabi)',
        soilType: 'Medium to deep black soil',
        expectedYield: '12–18 quintals/acre',
        waterRequirement: 'Low to moderate (400–600 mm)',
        organicTips: [
          'Apply compost 5 t/ha before sowing',
          'Use pheromone traps for shoot fly monitoring',
          'Intercrop with pigeonpea for better land use',
        ],
        pestsAndDiseases: 'Shoot fly, stem borer, grain mold, downy mildew',
      },
      {
        name: 'Turmeric',
        emoji: '🟡',
        sowingSeason: 'May – June',
        soilType: 'Well-drained loamy or sandy loam',
        expectedYield: '20–25 quintals/acre (dry)',
        waterRequirement: 'Moderate (1500 mm)',
        organicTips: [
          'Apply neem cake 250 kg/ha to prevent rhizome rot',
          'Mulch with paddy straw to retain moisture',
          'Use Pseudomonas fluorescens for disease management',
        ],
        pestsAndDiseases: 'Rhizome rot, leaf blotch, shoot borer',
      },
      {
        name: 'Onion',
        emoji: '🧅',
        sowingSeason: 'October – November (Rabi), May – June (Kharif)',
        soilType: 'Well-drained sandy loam to loam',
        expectedYield: '80–120 quintals/acre',
        waterRequirement: 'Moderate (350–550 mm)',
        organicTips: [
          'Apply well-decomposed FYM 20 t/ha before transplanting',
          'Use Trichoderma viride for soil treatment',
          'Spray diluted cow urine (10%) for thrips control',
        ],
        pestsAndDiseases: 'Thrips, purple blotch, basal rot, downy mildew',
      },
      {
        name: 'Grapes',
        emoji: '🍇',
        sowingSeason: 'October – November (pruning)',
        soilType: 'Well-drained sandy loam to loam',
        expectedYield: '8–12 tonnes/acre',
        waterRequirement: 'Moderate with drip irrigation',
        organicTips: [
          'Apply compost 20 kg/vine annually',
          'Use Bordeaux mixture (organic) for downy mildew',
          'Maintain proper canopy management for air circulation',
        ],
        pestsAndDiseases: 'Downy mildew, powdery mildew, mealy bug, thrips',
      },
      {
        name: 'Pomegranate',
        emoji: '🍎',
        sowingSeason: 'June – July or February – March',
        soilType: 'Well-drained sandy loam to medium black soil',
        expectedYield: '6–8 tonnes/acre',
        waterRequirement: 'Low to moderate (500–800 mm)',
        organicTips: [
          'Apply vermicompost 10 kg/plant/year',
          'Use pheromone traps for fruit borer',
          'Mulch basin with dry leaves to conserve moisture',
        ],
        pestsAndDiseases: 'Fruit borer, bacterial blight, Alternaria fruit spot',
      },
    ],
  },
  Punjab: {
    climate: 'Semi-arid continental',
    description: 'Punjab is the breadbasket of India with fertile alluvial plains, ideal for wheat-rice rotation and other cereal crops.',
    crops: [
      {
        name: 'Wheat',
        emoji: '🌾',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Alluvial loamy soil',
        expectedYield: '18–22 quintals/acre',
        waterRequirement: 'Moderate (400–500 mm)',
        organicTips: [
          'Apply FYM 10 t/ha before sowing',
          'Use bio-fertilizers like Azotobacter for nitrogen',
          'Seed treatment with Trichoderma for root diseases',
        ],
        pestsAndDiseases: 'Yellow rust, brown rust, aphids, loose smut',
      },
      {
        name: 'Rice (Paddy)',
        emoji: '🌾',
        sowingSeason: 'June – July (Kharif)',
        soilType: 'Clay loam to heavy clay',
        expectedYield: '20–25 quintals/acre',
        waterRequirement: 'High (1200–1600 mm)',
        organicTips: [
          'Use SRI (System of Rice Intensification) method',
          'Apply green manure (Sesbania) before transplanting',
          'Use Azolla as biofertilizer in paddy fields',
        ],
        pestsAndDiseases: 'Brown plant hopper, stem borer, blast, sheath blight',
      },
      {
        name: 'Maize',
        emoji: '🌽',
        sowingSeason: 'March – April (Spring), June – July (Kharif)',
        soilType: 'Well-drained loamy soil',
        expectedYield: '20–25 quintals/acre',
        waterRequirement: 'Moderate (500–700 mm)',
        organicTips: [
          'Apply compost 8 t/ha at land preparation',
          'Use Trichogramma cards for stem borer control',
          'Intercrop with legumes for soil health',
        ],
        pestsAndDiseases: 'Fall armyworm, stem borer, turcicum leaf blight',
      },
      {
        name: 'Sunflower',
        emoji: '🌻',
        sowingSeason: 'February – March (Spring), July – August (Kharif)',
        soilType: 'Well-drained loamy to sandy loam',
        expectedYield: '6–8 quintals/acre',
        waterRequirement: 'Moderate (400–600 mm)',
        organicTips: [
          'Apply vermicompost 3 t/ha before sowing',
          'Use neem-based pesticides for head borer',
          'Maintain proper spacing for air circulation',
        ],
        pestsAndDiseases: 'Head borer, Alternaria leaf spot, downy mildew',
      },
      {
        name: 'Potato',
        emoji: '🥔',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Sandy loam to loam',
        expectedYield: '80–120 quintals/acre',
        waterRequirement: 'Moderate (500–700 mm)',
        organicTips: [
          'Apply well-rotted FYM 20 t/ha before planting',
          'Use certified disease-free seed tubers',
          'Apply Bordeaux mixture for late blight prevention',
        ],
        pestsAndDiseases: 'Late blight, early blight, aphids, tuber moth',
      },
      {
        name: 'Chickpea (Gram)',
        emoji: '🫘',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Well-drained sandy loam to loam',
        expectedYield: '8–12 quintals/acre',
        waterRequirement: 'Low (300–400 mm)',
        organicTips: [
          'Seed inoculation with Rhizobium culture',
          'Apply phosphate-solubilizing bacteria (PSB)',
          'Use pheromone traps for pod borer monitoring',
        ],
        pestsAndDiseases: 'Pod borer, wilt, Ascochyta blight',
      },
      {
        name: 'Mustard',
        emoji: '🌼',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Well-drained loamy to sandy loam',
        expectedYield: '6–8 quintals/acre',
        waterRequirement: 'Low to moderate (250–400 mm)',
        organicTips: [
          'Apply FYM 5 t/ha before sowing',
          'Use neem oil for aphid control',
          'Intercrop with wheat for better land utilization',
        ],
        pestsAndDiseases: 'Aphids, white rust, Alternaria blight, powdery mildew',
      },
      {
        name: 'Sugarcane',
        emoji: '🌿',
        sowingSeason: 'February – March (Spring)',
        soilType: 'Deep loamy to clay loam',
        expectedYield: '300–400 quintals/acre',
        waterRequirement: 'High (1500–2000 mm)',
        organicTips: [
          'Apply press mud compost 10 t/ha',
          'Use Trichoderma for red rot prevention',
          'Trash mulching to conserve moisture',
        ],
        pestsAndDiseases: 'Pyrilla, top borer, red rot, smut',
      },
    ],
  },
  'Tamil Nadu': {
    climate: 'Tropical with northeast and southwest monsoons',
    description: 'Tamil Nadu has a tropical climate with two monsoon seasons, supporting rice cultivation, plantation crops, and diverse vegetables.',
    crops: [
      {
        name: 'Rice (Paddy)',
        emoji: '🌾',
        sowingSeason: 'June – July (Kuruvai), September – October (Samba)',
        soilType: 'Clay loam to heavy clay',
        expectedYield: '20–28 quintals/acre',
        waterRequirement: 'High (1200–1500 mm)',
        organicTips: [
          'Use SRI method to reduce water and seed usage',
          'Apply green manure (Dhaincha) before transplanting',
          'Use Azolla as biofertilizer',
        ],
        pestsAndDiseases: 'Blast, sheath blight, brown plant hopper, gall midge',
      },
      {
        name: 'Banana',
        emoji: '🍌',
        sowingSeason: 'Year-round (best June – July)',
        soilType: 'Well-drained loamy to clay loam',
        expectedYield: '20–30 tonnes/acre',
        waterRequirement: 'High (1200–2200 mm)',
        organicTips: [
          'Apply FYM 25 kg/plant at planting',
          'Use Pseudomonas for Panama wilt management',
          'Mulch with dry leaves to conserve moisture',
        ],
        pestsAndDiseases: 'Panama wilt, Sigatoka leaf spot, banana weevil',
      },
      {
        name: 'Coconut',
        emoji: '🥥',
        sowingSeason: 'June – September',
        soilType: 'Sandy loam to laterite',
        expectedYield: '80–100 nuts/palm/year',
        waterRequirement: 'Moderate (1500–2000 mm)',
        organicTips: [
          'Apply compost 50 kg/palm/year',
          'Use Trichoderma for bud rot prevention',
          'Intercrop with banana or turmeric',
        ],
        pestsAndDiseases: 'Rhinoceros beetle, red palm weevil, bud rot, leaf blight',
      },
      {
        name: 'Groundnut',
        emoji: '🥜',
        sowingSeason: 'June – July (Kharif), December – January (Rabi)',
        soilType: 'Well-drained sandy loam',
        expectedYield: '8–12 quintals/acre',
        waterRequirement: 'Moderate (500–700 mm)',
        organicTips: [
          'Seed treatment with Rhizobium and PSB',
          'Apply gypsum 200 kg/ha at pegging stage',
          'Use neem cake 250 kg/ha for soil pests',
        ],
        pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner, thrips',
      },
      {
        name: 'Sugarcane',
        emoji: '🌿',
        sowingSeason: 'January – February, June – July',
        soilType: 'Deep loamy to clay loam',
        expectedYield: '350–450 quintals/acre',
        waterRequirement: 'High (1500–2500 mm)',
        organicTips: [
          'Apply press mud compost 10 t/ha',
          'Use Trichoderma for red rot',
          'Trash mulching to conserve moisture',
        ],
        pestsAndDiseases: 'Early shoot borer, internode borer, red rot, smut',
      },
      {
        name: 'Turmeric',
        emoji: '🟡',
        sowingSeason: 'May – June',
        soilType: 'Well-drained loamy or sandy loam',
        expectedYield: '25–30 quintals/acre (dry)',
        waterRequirement: 'Moderate (1500 mm)',
        organicTips: [
          'Apply neem cake 250 kg/ha',
          'Mulch with paddy straw',
          'Use Pseudomonas fluorescens for rhizome rot',
        ],
        pestsAndDiseases: 'Rhizome rot, leaf blotch, shoot borer, scale insects',
      },
      {
        name: 'Tapioca (Cassava)',
        emoji: '🌱',
        sowingSeason: 'May – June, October – November',
        soilType: 'Well-drained sandy loam to loam',
        expectedYield: '150–200 quintals/acre',
        waterRequirement: 'Low to moderate (1000–1500 mm)',
        organicTips: [
          'Apply FYM 10 t/ha before planting',
          'Use neem oil for mite control',
          'Intercrop with groundnut or cowpea',
        ],
        pestsAndDiseases: 'Cassava mosaic virus, mites, mealy bug',
      },
      {
        name: 'Mango',
        emoji: '🥭',
        sowingSeason: 'June – August (planting)',
        soilType: 'Deep well-drained loamy to laterite',
        expectedYield: '5–8 tonnes/acre (mature orchard)',
        waterRequirement: 'Low to moderate (750–1250 mm)',
        organicTips: [
          'Apply compost 50 kg/tree/year',
          'Use pheromone traps for fruit fly',
          'Spray neem oil for powdery mildew',
        ],
        pestsAndDiseases: 'Mango hopper, fruit fly, powdery mildew, anthracnose',
      },
    ],
  },
  Karnataka: {
    climate: 'Tropical to semi-arid',
    description: 'Karnataka has diverse agro-climatic zones from the Western Ghats to the Deccan plateau, supporting coffee, spices, and food crops.',
    crops: [
      {
        name: 'Coffee',
        emoji: '☕',
        sowingSeason: 'May – June (planting)',
        soilType: 'Well-drained laterite to loamy',
        expectedYield: '5–8 quintals/acre (cured)',
        waterRequirement: 'High (1500–2500 mm)',
        organicTips: [
          'Apply coffee pulp compost 5 t/ha',
          'Use shade trees for microclimate management',
          'Apply Bordeaux mixture for leaf rust',
        ],
        pestsAndDiseases: 'Coffee berry borer, white stem borer, leaf rust',
      },
      {
        name: 'Ragi (Finger Millet)',
        emoji: '🌾',
        sowingSeason: 'June – July (Kharif)',
        soilType: 'Red loamy to sandy loam',
        expectedYield: '8–12 quintals/acre',
        waterRequirement: 'Low (350–500 mm)',
        organicTips: [
          'Apply FYM 5 t/ha before sowing',
          'Use Azospirillum seed treatment',
          'Intercrop with cowpea or horsegram',
        ],
        pestsAndDiseases: 'Blast, foot rot, aphids, shoot fly',
      },
      {
        name: 'Maize',
        emoji: '🌽',
        sowingSeason: 'June – July (Kharif), November – December (Rabi)',
        soilType: 'Well-drained loamy to sandy loam',
        expectedYield: '20–28 quintals/acre',
        waterRequirement: 'Moderate (500–700 mm)',
        organicTips: [
          'Apply compost 8 t/ha at land preparation',
          'Use Trichogramma for stem borer',
          'Seed treatment with Trichoderma',
        ],
        pestsAndDiseases: 'Fall armyworm, stem borer, turcicum leaf blight',
      },
      {
        name: 'Sunflower',
        emoji: '🌻',
        sowingSeason: 'September – October (Rabi), February – March (Summer)',
        soilType: 'Well-drained loamy to sandy loam',
        expectedYield: '6–8 quintals/acre',
        waterRequirement: 'Moderate (400–600 mm)',
        organicTips: [
          'Apply vermicompost 3 t/ha',
          'Use neem-based pesticides for head borer',
          'Maintain proper plant spacing',
        ],
        pestsAndDiseases: 'Head borer, Alternaria leaf spot, downy mildew',
      },
      {
        name: 'Groundnut',
        emoji: '🥜',
        sowingSeason: 'June – July (Kharif)',
        soilType: 'Well-drained sandy loam to red loam',
        expectedYield: '8–12 quintals/acre',
        waterRequirement: 'Moderate (500–700 mm)',
        organicTips: [
          'Seed treatment with Rhizobium and PSB',
          'Apply gypsum 200 kg/ha at pegging',
          'Use neem cake for soil pests',
        ],
        pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner',
      },
      {
        name: 'Tomato',
        emoji: '🍅',
        sowingSeason: 'June – July, October – November',
        soilType: 'Well-drained sandy loam to loam',
        expectedYield: '150–200 quintals/acre',
        waterRequirement: 'Moderate (600–800 mm)',
        organicTips: [
          'Apply FYM 20 t/ha before transplanting',
          'Use yellow sticky traps for whitefly',
          'Spray neem oil for mite control',
        ],
        pestsAndDiseases: 'Fruit borer, whitefly, early blight, leaf curl virus',
      },
      {
        name: 'Arecanut',
        emoji: '🌴',
        sowingSeason: 'May – June (planting)',
        soilType: 'Well-drained laterite to loamy',
        expectedYield: '1–2 tonnes/acre (dry)',
        waterRequirement: 'High (1500–2500 mm)',
        organicTips: [
          'Apply compost 12 kg/palm/year',
          'Use Trichoderma for foot rot',
          'Intercrop with pepper or banana',
        ],
        pestsAndDiseases: 'Yellow leaf disease, bud rot, inflorescence dieback',
      },
      {
        name: 'Jowar (Sorghum)',
        emoji: '🌾',
        sowingSeason: 'June – July (Kharif), October – November (Rabi)',
        soilType: 'Medium to deep black soil',
        expectedYield: '12–18 quintals/acre',
        waterRequirement: 'Low to moderate (400–600 mm)',
        organicTips: [
          'Apply compost 5 t/ha before sowing',
          'Use pheromone traps for shoot fly',
          'Intercrop with pigeonpea',
        ],
        pestsAndDiseases: 'Shoot fly, stem borer, grain mold, downy mildew',
      },
    ],
  },
  'Uttar Pradesh': {
    climate: 'Sub-tropical continental',
    description: 'Uttar Pradesh has fertile Gangetic plains with sub-tropical climate, ideal for wheat, rice, sugarcane, and vegetables.',
    crops: [
      {
        name: 'Wheat',
        emoji: '🌾',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Alluvial loamy soil',
        expectedYield: '18–22 quintals/acre',
        waterRequirement: 'Moderate (400–500 mm)',
        organicTips: [
          'Apply FYM 10 t/ha before sowing',
          'Use Azotobacter bio-fertilizer',
          'Seed treatment with Trichoderma',
        ],
        pestsAndDiseases: 'Yellow rust, brown rust, aphids, loose smut',
      },
      {
        name: 'Sugarcane',
        emoji: '🌿',
        sowingSeason: 'February – March (Spring)',
        soilType: 'Deep loamy to clay loam',
        expectedYield: '300–400 quintals/acre',
        waterRequirement: 'High (1500–2000 mm)',
        organicTips: [
          'Apply press mud compost 10 t/ha',
          'Use Trichoderma for red rot',
          'Trash mulching to conserve moisture',
        ],
        pestsAndDiseases: 'Pyrilla, top borer, red rot, smut',
      },
      {
        name: 'Rice (Paddy)',
        emoji: '🌾',
        sowingSeason: 'June – July (Kharif)',
        soilType: 'Clay loam to heavy clay',
        expectedYield: '18–22 quintals/acre',
        waterRequirement: 'High (1200–1500 mm)',
        organicTips: [
          'Use SRI method for water conservation',
          'Apply green manure before transplanting',
          'Use Azolla as biofertilizer',
        ],
        pestsAndDiseases: 'Blast, sheath blight, brown plant hopper',
      },
      {
        name: 'Potato',
        emoji: '🥔',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Sandy loam to loam',
        expectedYield: '80–120 quintals/acre',
        waterRequirement: 'Moderate (500–700 mm)',
        organicTips: [
          'Apply well-rotted FYM 20 t/ha',
          'Use certified disease-free seed tubers',
          'Apply Bordeaux mixture for late blight',
        ],
        pestsAndDiseases: 'Late blight, early blight, aphids, tuber moth',
      },
      {
        name: 'Mustard',
        emoji: '🌼',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Well-drained loamy to sandy loam',
        expectedYield: '6–8 quintals/acre',
        waterRequirement: 'Low to moderate (250–400 mm)',
        organicTips: [
          'Apply FYM 5 t/ha before sowing',
          'Use neem oil for aphid control',
          'Intercrop with wheat',
        ],
        pestsAndDiseases: 'Aphids, white rust, Alternaria blight',
      },
      {
        name: 'Pea',
        emoji: '🫛',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Well-drained loamy to sandy loam',
        expectedYield: '30–40 quintals/acre (green pods)',
        waterRequirement: 'Low to moderate (350–500 mm)',
        organicTips: [
          'Seed inoculation with Rhizobium',
          'Apply compost 5 t/ha before sowing',
          'Use neem-based spray for pod borer',
        ],
        pestsAndDiseases: 'Pod borer, powdery mildew, root rot',
      },
      {
        name: 'Lentil (Masoor)',
        emoji: '🫘',
        sowingSeason: 'October – November (Rabi)',
        soilType: 'Well-drained loamy to clay loam',
        expectedYield: '6–8 quintals/acre',
        waterRequirement: 'Low (250–350 mm)',
        organicTips: [
          'Seed treatment with Rhizobium culture',
          'Apply phosphate-solubilizing bacteria',
          'Intercrop with wheat for better yield',
        ],
        pestsAndDiseases: 'Pod borer, rust, wilt, Stemphylium blight',
      },
      {
        name: 'Mango',
        emoji: '🥭',
        sowingSeason: 'June – August (planting)',
        soilType: 'Deep well-drained loamy',
        expectedYield: '5–8 tonnes/acre (mature)',
        waterRequirement: 'Low to moderate (750–1250 mm)',
        organicTips: [
          'Apply compost 50 kg/tree/year',
          'Use pheromone traps for fruit fly',
          'Spray neem oil for powdery mildew',
        ],
        pestsAndDiseases: 'Mango hopper, fruit fly, powdery mildew, anthracnose',
      },
    ],
  },
  'Madhya Pradesh': {
    climate: 'Sub-tropical to semi-arid',
    description: 'Madhya Pradesh is a major producer of soybean, wheat, and pulses with diverse soil types across its vast plateau region.',
    crops: [
      { name: 'Soybean', emoji: '🫘', sowingSeason: 'June – July', soilType: 'Black to medium loamy', expectedYield: '10–15 quintals/acre', waterRequirement: 'Moderate (450–700 mm)', organicTips: ['Rhizobium seed treatment', 'Apply vermicompost 2 t/ha', 'Yellow sticky traps for whitefly'], pestsAndDiseases: 'Girdle beetle, stem fly, yellow mosaic virus' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Black to alluvial loamy', expectedYield: '18–22 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['Apply FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Chickpea', emoji: '🫘', sowingSeason: 'October – November', soilType: 'Well-drained sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Low (300–400 mm)', organicTips: ['Rhizobium inoculation', 'PSB application', 'Pheromone traps for pod borer'], pestsAndDiseases: 'Pod borer, wilt, Ascochyta blight' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['Apply FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'June – July', soilType: 'Well-drained loamy', expectedYield: '20–25 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Jowar', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Medium to deep black soil', expectedYield: '12–18 quintals/acre', waterRequirement: 'Low to moderate (400–600 mm)', organicTips: ['Compost 5 t/ha', 'Pheromone traps for shoot fly', 'Intercrop with pigeonpea'], pestsAndDiseases: 'Shoot fly, stem borer, grain mold' },
      { name: 'Linseed', emoji: '🌱', sowingSeason: 'October – November', soilType: 'Well-drained loamy to clay loam', expectedYield: '4–6 quintals/acre', waterRequirement: 'Low (250–350 mm)', organicTips: ['Apply FYM 5 t/ha', 'Seed treatment with Trichoderma', 'Intercrop with wheat'], pestsAndDiseases: 'Powdery mildew, rust, bud fly' },
      { name: 'Garlic', emoji: '🧄', sowingSeason: 'October – November', soilType: 'Well-drained sandy loam to loam', expectedYield: '40–60 quintals/acre', waterRequirement: 'Moderate (350–500 mm)', organicTips: ['Apply FYM 15 t/ha', 'Neem cake for soil pests', 'Trichoderma for basal rot'], pestsAndDiseases: 'Thrips, purple blotch, basal rot' },
    ],
  },
  Rajasthan: {
    climate: 'Arid to semi-arid',
    description: 'Rajasthan is an arid state with limited water resources, best suited for drought-tolerant crops like bajra, jowar, and oilseeds.',
    crops: [
      { name: 'Bajra (Pearl Millet)', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Sandy to sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Very low (200–350 mm)', organicTips: ['Apply FYM 5 t/ha', 'Azospirillum seed treatment', 'Intercrop with moth bean'], pestsAndDiseases: 'Downy mildew, ergot, shoot fly, stem borer' },
      { name: 'Jowar', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Sandy loam to medium black', expectedYield: '10–15 quintals/acre', waterRequirement: 'Low (300–450 mm)', organicTips: ['Compost 5 t/ha', 'Pheromone traps for shoot fly', 'Intercrop with cowpea'], pestsAndDiseases: 'Shoot fly, stem borer, grain mold' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained sandy loam', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Moth Bean', emoji: '🫘', sowingSeason: 'June – July', soilType: 'Sandy to sandy loam', expectedYield: '4–6 quintals/acre', waterRequirement: 'Very low (200–300 mm)', organicTips: ['Rhizobium inoculation', 'Minimal tillage to conserve moisture', 'Intercrop with bajra'], pestsAndDiseases: 'Pod borer, leaf spot, powdery mildew' },
      { name: 'Cluster Bean (Guar)', emoji: '🌱', sowingSeason: 'June – July', soilType: 'Sandy to loamy', expectedYield: '6–10 quintals/acre', waterRequirement: 'Very low (200–350 mm)', organicTips: ['Rhizobium seed treatment', 'Apply compost 3 t/ha', 'Minimal irrigation'], pestsAndDiseases: 'Pod borer, bacterial blight, leaf spot' },
      { name: 'Sesame', emoji: '🌿', sowingSeason: 'June – July', soilType: 'Well-drained sandy loam', expectedYield: '3–5 quintals/acre', waterRequirement: 'Low (300–400 mm)', organicTips: ['Apply FYM 5 t/ha', 'Neem cake for soil pests', 'Intercrop with bajra'], pestsAndDiseases: 'Phyllody, leaf roller, powdery mildew' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Alluvial loamy (irrigated areas)', expectedYield: '15–20 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Cumin', emoji: '🌱', sowingSeason: 'November – December', soilType: 'Well-drained sandy loam', expectedYield: '3–5 quintals/acre', waterRequirement: 'Low (200–300 mm)', organicTips: ['Apply FYM 5 t/ha', 'Seed treatment with Trichoderma', 'Avoid waterlogging'], pestsAndDiseases: 'Wilt, blight, aphids, thrips' },
    ],
  },
  Gujarat: {
    climate: 'Semi-arid to tropical',
    description: 'Gujarat is a major producer of cotton, groundnut, and castor with diverse agro-climatic zones from coastal to semi-arid regions.',
    crops: [
      { name: 'Cotton', emoji: '🌸', sowingSeason: 'June – July', soilType: 'Black cotton soil to sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (700–1200 mm)', organicTips: ['FYM 10 t/ha', 'Neem oil for bollworm', 'Crop rotation with legumes'], pestsAndDiseases: 'Bollworm, whitefly, leaf curl virus' },
      { name: 'Groundnut', emoji: '🥜', sowingSeason: 'June – July (Kharif)', soilType: 'Well-drained sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Rhizobium + PSB seed treatment', 'Gypsum 200 kg/ha at pegging', 'Neem cake for soil pests'], pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner' },
      { name: 'Castor', emoji: '🌱', sowingSeason: 'June – July', soilType: 'Well-drained sandy loam to loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Low to moderate (400–600 mm)', organicTips: ['Apply FYM 5 t/ha', 'Neem oil for semi-looper', 'Intercrop with groundnut'], pestsAndDiseases: 'Semi-looper, capsule borer, wilt' },
      { name: 'Bajra', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Sandy to sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Very low (200–350 mm)', organicTips: ['FYM 5 t/ha', 'Azospirillum seed treatment', 'Intercrop with cowpea'], pestsAndDiseases: 'Downy mildew, ergot, shoot fly' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Alluvial loamy', expectedYield: '15–20 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Cumin', emoji: '🌱', sowingSeason: 'November – December', soilType: 'Well-drained sandy loam', expectedYield: '3–5 quintals/acre', waterRequirement: 'Low (200–300 mm)', organicTips: ['FYM 5 t/ha', 'Trichoderma seed treatment', 'Avoid waterlogging'], pestsAndDiseases: 'Wilt, blight, aphids, thrips' },
      { name: 'Fennel', emoji: '🌿', sowingSeason: 'October – November', soilType: 'Well-drained sandy loam to loam', expectedYield: '5–8 quintals/acre', waterRequirement: 'Low to moderate (300–450 mm)', organicTips: ['Apply FYM 8 t/ha', 'Neem oil for aphids', 'Proper spacing for air circulation'], pestsAndDiseases: 'Aphids, powdery mildew, leaf spot' },
      { name: 'Mango', emoji: '🥭', sowingSeason: 'June – August (planting)', soilType: 'Deep well-drained loamy', expectedYield: '5–8 tonnes/acre', waterRequirement: 'Low to moderate (750–1250 mm)', organicTips: ['Compost 50 kg/tree/year', 'Pheromone traps for fruit fly', 'Neem oil for powdery mildew'], pestsAndDiseases: 'Mango hopper, fruit fly, powdery mildew' },
    ],
  },
  'Andhra Pradesh': {
    climate: 'Tropical to semi-arid',
    description: 'Andhra Pradesh is known for rice, tobacco, and chilli cultivation with diverse coastal and inland agro-climatic zones.',
    crops: [
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July (Kharif), November – December (Rabi)', soilType: 'Clay loam to heavy clay', expectedYield: '22–28 quintals/acre', waterRequirement: 'High (1200–1500 mm)', organicTips: ['SRI method for water conservation', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Chilli', emoji: '🌶️', sowingSeason: 'June – July, October – November', soilType: 'Well-drained sandy loam to loam', expectedYield: '15–20 quintals/acre (dry)', waterRequirement: 'Moderate (600–800 mm)', organicTips: ['FYM 20 t/ha before transplanting', 'Yellow sticky traps for thrips', 'Neem oil for mite control'], pestsAndDiseases: 'Thrips, mites, fruit borer, leaf curl virus' },
      { name: 'Tobacco', emoji: '🌿', sowingSeason: 'October – November', soilType: 'Well-drained sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Apply FYM 10 t/ha', 'Neem cake for soil pests', 'Crop rotation with legumes'], pestsAndDiseases: 'Budworm, aphids, mosaic virus, black shank' },
      { name: 'Groundnut', emoji: '🥜', sowingSeason: 'June – July (Kharif)', soilType: 'Well-drained sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Rhizobium + PSB seed treatment', 'Gypsum 200 kg/ha at pegging', 'Neem cake for soil pests'], pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner' },
      { name: 'Cotton', emoji: '🌸', sowingSeason: 'June – July', soilType: 'Black cotton soil to sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (700–1200 mm)', organicTips: ['FYM 10 t/ha', 'Neem oil for bollworm', 'Crop rotation with legumes'], pestsAndDiseases: 'Bollworm, whitefly, leaf curl virus' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'June – July, October – November', soilType: 'Well-drained loamy', expectedYield: '20–28 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Mango', emoji: '🥭', sowingSeason: 'June – August (planting)', soilType: 'Deep well-drained loamy', expectedYield: '5–8 tonnes/acre', waterRequirement: 'Low to moderate (750–1250 mm)', organicTips: ['Compost 50 kg/tree/year', 'Pheromone traps for fruit fly', 'Neem oil for powdery mildew'], pestsAndDiseases: 'Mango hopper, fruit fly, powdery mildew' },
      { name: 'Banana', emoji: '🍌', sowingSeason: 'Year-round (best June – July)', soilType: 'Well-drained loamy to clay loam', expectedYield: '20–30 tonnes/acre', waterRequirement: 'High (1200–2200 mm)', organicTips: ['FYM 25 kg/plant at planting', 'Pseudomonas for Panama wilt', 'Mulch with dry leaves'], pestsAndDiseases: 'Panama wilt, Sigatoka leaf spot, banana weevil' },
    ],
  },
  Telangana: {
    climate: 'Tropical semi-arid',
    description: 'Telangana is known for cotton, rice, and maize cultivation with red and black soils across its plateau region.',
    crops: [
      { name: 'Cotton', emoji: '🌸', sowingSeason: 'June – July', soilType: 'Black cotton soil', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (700–1200 mm)', organicTips: ['FYM 10 t/ha', 'Neem oil for bollworm', 'Crop rotation with legumes'], pestsAndDiseases: 'Bollworm, whitefly, leaf curl virus' },
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July (Kharif)', soilType: 'Clay loam to heavy clay', expectedYield: '20–25 quintals/acre', waterRequirement: 'High (1200–1500 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'June – July, October – November', soilType: 'Well-drained loamy', expectedYield: '20–28 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Soybean', emoji: '🫘', sowingSeason: 'June – July', soilType: 'Well-drained loamy to clay loam', expectedYield: '10–15 quintals/acre', waterRequirement: 'Moderate (450–700 mm)', organicTips: ['Rhizobium seed treatment', 'Vermicompost 2 t/ha', 'Yellow sticky traps for whitefly'], pestsAndDiseases: 'Girdle beetle, stem fly, yellow mosaic virus' },
      { name: 'Groundnut', emoji: '🥜', sowingSeason: 'June – July', soilType: 'Well-drained sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Rhizobium + PSB seed treatment', 'Gypsum 200 kg/ha at pegging', 'Neem cake for soil pests'], pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner' },
      { name: 'Chilli', emoji: '🌶️', sowingSeason: 'June – July, October – November', soilType: 'Well-drained sandy loam to loam', expectedYield: '15–20 quintals/acre (dry)', waterRequirement: 'Moderate (600–800 mm)', organicTips: ['FYM 20 t/ha before transplanting', 'Yellow sticky traps for thrips', 'Neem oil for mite control'], pestsAndDiseases: 'Thrips, mites, fruit borer, leaf curl virus' },
      { name: 'Turmeric', emoji: '🟡', sowingSeason: 'May – June', soilType: 'Well-drained loamy or sandy loam', expectedYield: '20–25 quintals/acre (dry)', waterRequirement: 'Moderate (1500 mm)', organicTips: ['Neem cake 250 kg/ha', 'Mulch with paddy straw', 'Pseudomonas fluorescens for rhizome rot'], pestsAndDiseases: 'Rhizome rot, leaf blotch, shoot borer' },
      { name: 'Jowar', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Medium to deep black soil', expectedYield: '12–18 quintals/acre', waterRequirement: 'Low to moderate (400–600 mm)', organicTips: ['Compost 5 t/ha', 'Pheromone traps for shoot fly', 'Intercrop with pigeonpea'], pestsAndDiseases: 'Shoot fly, stem borer, grain mold' },
    ],
  },
  'West Bengal': {
    climate: 'Tropical humid',
    description: 'West Bengal has a humid tropical climate with fertile alluvial plains, ideal for rice, jute, and vegetables.',
    crops: [
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July (Aman), November – December (Boro)', soilType: 'Clay loam to heavy clay', expectedYield: '20–28 quintals/acre', waterRequirement: 'High (1200–1600 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper, gall midge' },
      { name: 'Jute', emoji: '🌿', sowingSeason: 'March – May', soilType: 'Well-drained alluvial loamy', expectedYield: '15–20 quintals/acre (dry fibre)', waterRequirement: 'High (1000–1500 mm)', organicTips: ['Apply FYM 5 t/ha', 'Seed treatment with Trichoderma', 'Crop rotation with rice'], pestsAndDiseases: 'Stem rot, root rot, semilooper, Bihar hairy caterpillar' },
      { name: 'Potato', emoji: '🥔', sowingSeason: 'October – November', soilType: 'Sandy loam to loam', expectedYield: '80–120 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['FYM 20 t/ha', 'Certified disease-free seed tubers', 'Bordeaux mixture for late blight'], pestsAndDiseases: 'Late blight, early blight, aphids, tuber moth' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'March – April, June – July', soilType: 'Well-drained loamy', expectedYield: '20–25 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Vegetables (Mixed)', emoji: '🥦', sowingSeason: 'Year-round (season-specific)', soilType: 'Well-drained loamy to sandy loam', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['Apply FYM 15 t/ha', 'Use yellow sticky traps for pests', 'Neem oil spray for mite control'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
      { name: 'Tea', emoji: '🍵', sowingSeason: 'March – May (planting)', soilType: 'Well-drained acidic loamy (pH 4.5–5.5)', expectedYield: '1500–2000 kg/acre (made tea)', waterRequirement: 'High (1500–2500 mm)', organicTips: ['Apply compost 5 t/ha', 'Use shade trees for microclimate', 'Neem oil for red spider mite'], pestsAndDiseases: 'Red spider mite, tea mosquito bug, blister blight' },
      { name: 'Banana', emoji: '🍌', sowingSeason: 'Year-round (best June – July)', soilType: 'Well-drained loamy to clay loam', expectedYield: '20–30 tonnes/acre', waterRequirement: 'High (1200–2200 mm)', organicTips: ['FYM 25 kg/plant', 'Pseudomonas for Panama wilt', 'Mulch with dry leaves'], pestsAndDiseases: 'Panama wilt, Sigatoka leaf spot, banana weevil' },
    ],
  },
  Kerala: {
    climate: 'Tropical humid',
    description: 'Kerala has a humid tropical climate with high rainfall, ideal for spices, plantation crops, and rice cultivation.',
    crops: [
      { name: 'Coconut', emoji: '🥥', sowingSeason: 'June – September', soilType: 'Sandy loam to laterite', expectedYield: '80–100 nuts/palm/year', waterRequirement: 'Moderate (1500–2000 mm)', organicTips: ['Compost 50 kg/palm/year', 'Trichoderma for bud rot', 'Intercrop with banana or turmeric'], pestsAndDiseases: 'Rhinoceros beetle, red palm weevil, bud rot' },
      { name: 'Rubber', emoji: '🌳', sowingSeason: 'May – June (planting)', soilType: 'Well-drained laterite to loamy', expectedYield: '500–700 kg/acre (dry rubber)', waterRequirement: 'High (2000–3000 mm)', organicTips: ['Apply compost 10 kg/tree/year', 'Use cover crops to prevent erosion', 'Bordeaux mixture for panel diseases'], pestsAndDiseases: 'Abnormal leaf fall, pink disease, panel canker' },
      { name: 'Black Pepper', emoji: '🌿', sowingSeason: 'May – June (planting)', soilType: 'Well-drained laterite to loamy', expectedYield: '1–2 quintals/acre (dry)', waterRequirement: 'High (2000–3000 mm)', organicTips: ['Apply compost 5 kg/vine/year', 'Trichoderma for Phytophthora', 'Mulch with dry leaves'], pestsAndDiseases: 'Phytophthora foot rot, pollu beetle, top dying' },
      { name: 'Cardamom', emoji: '🌱', sowingSeason: 'May – June (planting)', soilType: 'Well-drained loamy to laterite (shade)', expectedYield: '1–2 quintals/acre (dry)', waterRequirement: 'High (1500–2500 mm)', organicTips: ['Apply compost 2 kg/clump/year', 'Maintain shade trees', 'Neem oil for thrips control'], pestsAndDiseases: 'Thrips, shoot fly, Katte mosaic virus' },
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July (Virippu), September – October (Mundakan)', soilType: 'Clay loam to heavy clay', expectedYield: '15–20 quintals/acre', waterRequirement: 'High (1200–1500 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Banana', emoji: '🍌', sowingSeason: 'Year-round (best June – July)', soilType: 'Well-drained loamy to clay loam', expectedYield: '20–30 tonnes/acre', waterRequirement: 'High (1200–2200 mm)', organicTips: ['FYM 25 kg/plant', 'Pseudomonas for Panama wilt', 'Mulch with dry leaves'], pestsAndDiseases: 'Panama wilt, Sigatoka leaf spot, banana weevil' },
      { name: 'Ginger', emoji: '🫚', sowingSeason: 'April – May', soilType: 'Well-drained loamy to sandy loam', expectedYield: '40–60 quintals/acre (fresh)', waterRequirement: 'Moderate (1500–2000 mm)', organicTips: ['Apply FYM 25 t/ha', 'Trichoderma for rhizome rot', 'Mulch with dry leaves'], pestsAndDiseases: 'Rhizome rot, leaf spot, shoot borer' },
      { name: 'Tapioca', emoji: '🌱', sowingSeason: 'May – June, October – November', soilType: 'Well-drained sandy loam to loam', expectedYield: '150–200 quintals/acre', waterRequirement: 'Low to moderate (1000–1500 mm)', organicTips: ['FYM 10 t/ha', 'Neem oil for mite control', 'Intercrop with groundnut'], pestsAndDiseases: 'Cassava mosaic virus, mites, mealy bug' },
    ],
  },
  Haryana: {
    climate: 'Semi-arid continental',
    description: 'Haryana has fertile alluvial plains with semi-arid climate, ideal for wheat, rice, and oilseed crops.',
    crops: [
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Alluvial loamy', expectedYield: '18–22 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Clay loam to heavy clay', expectedYield: '18–22 quintals/acre', waterRequirement: 'High (1200–1500 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Sugarcane', emoji: '🌿', sowingSeason: 'February – March', soilType: 'Deep loamy to clay loam', expectedYield: '300–400 quintals/acre', waterRequirement: 'High (1500–2000 mm)', organicTips: ['Press mud compost 10 t/ha', 'Trichoderma for red rot', 'Trash mulching'], pestsAndDiseases: 'Pyrilla, top borer, red rot, smut' },
      { name: 'Bajra', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Sandy to sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Very low (200–350 mm)', organicTips: ['FYM 5 t/ha', 'Azospirillum seed treatment', 'Intercrop with cowpea'], pestsAndDiseases: 'Downy mildew, ergot, shoot fly' },
      { name: 'Sunflower', emoji: '🌻', sowingSeason: 'February – March, July – August', soilType: 'Well-drained loamy', expectedYield: '6–8 quintals/acre', waterRequirement: 'Moderate (400–600 mm)', organicTips: ['Vermicompost 3 t/ha', 'Neem-based pesticides for head borer', 'Proper plant spacing'], pestsAndDiseases: 'Head borer, Alternaria leaf spot, downy mildew' },
      { name: 'Chickpea', emoji: '🫘', sowingSeason: 'October – November', soilType: 'Well-drained sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Low (300–400 mm)', organicTips: ['Rhizobium inoculation', 'PSB application', 'Pheromone traps for pod borer'], pestsAndDiseases: 'Pod borer, wilt, Ascochyta blight' },
      { name: 'Potato', emoji: '🥔', sowingSeason: 'October – November', soilType: 'Sandy loam to loam', expectedYield: '80–120 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['FYM 20 t/ha', 'Certified disease-free seed tubers', 'Bordeaux mixture for late blight'], pestsAndDiseases: 'Late blight, early blight, aphids, tuber moth' },
    ],
  },
  Bihar: {
    climate: 'Sub-tropical humid',
    description: 'Bihar has fertile Gangetic plains with sub-tropical humid climate, ideal for rice, wheat, maize, and vegetables.',
    crops: [
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Clay loam to heavy clay', expectedYield: '18–22 quintals/acre', waterRequirement: 'High (1200–1500 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Alluvial loamy', expectedYield: '18–22 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'March – April, June – July', soilType: 'Well-drained loamy', expectedYield: '20–25 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Lentil', emoji: '🫘', sowingSeason: 'October – November', soilType: 'Well-drained loamy to clay loam', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low (250–350 mm)', organicTips: ['Rhizobium seed treatment', 'PSB application', 'Intercrop with wheat'], pestsAndDiseases: 'Pod borer, rust, wilt, Stemphylium blight' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Sugarcane', emoji: '🌿', sowingSeason: 'February – March', soilType: 'Deep loamy to clay loam', expectedYield: '300–400 quintals/acre', waterRequirement: 'High (1500–2000 mm)', organicTips: ['Press mud compost 10 t/ha', 'Trichoderma for red rot', 'Trash mulching'], pestsAndDiseases: 'Pyrilla, top borer, red rot, smut' },
      { name: 'Potato', emoji: '🥔', sowingSeason: 'October – November', soilType: 'Sandy loam to loam', expectedYield: '80–120 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['FYM 20 t/ha', 'Certified disease-free seed tubers', 'Bordeaux mixture for late blight'], pestsAndDiseases: 'Late blight, early blight, aphids, tuber moth' },
      { name: 'Vegetables (Mixed)', emoji: '🥦', sowingSeason: 'Year-round', soilType: 'Well-drained loamy', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['FYM 15 t/ha', 'Yellow sticky traps for pests', 'Neem oil spray'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
    ],
  },
  Odisha: {
    climate: 'Tropical humid to sub-humid',
    description: 'Odisha has a tropical climate with high rainfall, ideal for rice, pulses, and oilseeds cultivation.',
    crops: [
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July (Kharif)', soilType: 'Clay loam to heavy clay', expectedYield: '18–22 quintals/acre', waterRequirement: 'High (1200–1600 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper, gall midge' },
      { name: 'Groundnut', emoji: '🥜', sowingSeason: 'June – July', soilType: 'Well-drained sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Rhizobium + PSB seed treatment', 'Gypsum 200 kg/ha at pegging', 'Neem cake for soil pests'], pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'June – July', soilType: 'Well-drained loamy', expectedYield: '20–25 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Turmeric', emoji: '🟡', sowingSeason: 'May – June', soilType: 'Well-drained loamy or sandy loam', expectedYield: '20–25 quintals/acre (dry)', waterRequirement: 'Moderate (1500 mm)', organicTips: ['Neem cake 250 kg/ha', 'Mulch with paddy straw', 'Pseudomonas fluorescens for rhizome rot'], pestsAndDiseases: 'Rhizome rot, leaf blotch, shoot borer' },
      { name: 'Sugarcane', emoji: '🌿', sowingSeason: 'February – March', soilType: 'Deep loamy to clay loam', expectedYield: '300–400 quintals/acre', waterRequirement: 'High (1500–2000 mm)', organicTips: ['Press mud compost 10 t/ha', 'Trichoderma for red rot', 'Trash mulching'], pestsAndDiseases: 'Pyrilla, top borer, red rot, smut' },
      { name: 'Sesame', emoji: '🌿', sowingSeason: 'June – July', soilType: 'Well-drained sandy loam', expectedYield: '3–5 quintals/acre', waterRequirement: 'Low (300–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem cake for soil pests', 'Intercrop with bajra'], pestsAndDiseases: 'Phyllody, leaf roller, powdery mildew' },
      { name: 'Vegetables (Mixed)', emoji: '🥦', sowingSeason: 'Year-round', soilType: 'Well-drained loamy', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['FYM 15 t/ha', 'Yellow sticky traps for pests', 'Neem oil spray'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
    ],
  },
  Assam: {
    climate: 'Tropical humid',
    description: 'Assam has a humid tropical climate with high rainfall, ideal for tea, rice, and jute cultivation.',
    crops: [
      { name: 'Tea', emoji: '🍵', sowingSeason: 'March – May (planting)', soilType: 'Well-drained acidic loamy (pH 4.5–5.5)', expectedYield: '1500–2000 kg/acre (made tea)', waterRequirement: 'High (1500–2500 mm)', organicTips: ['Compost 5 t/ha', 'Shade trees for microclimate', 'Neem oil for red spider mite'], pestsAndDiseases: 'Red spider mite, tea mosquito bug, blister blight' },
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July (Sali), March – April (Boro)', soilType: 'Clay loam to heavy clay', expectedYield: '15–20 quintals/acre', waterRequirement: 'High (1200–1600 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Jute', emoji: '🌿', sowingSeason: 'March – May', soilType: 'Well-drained alluvial loamy', expectedYield: '15–20 quintals/acre (dry fibre)', waterRequirement: 'High (1000–1500 mm)', organicTips: ['FYM 5 t/ha', 'Trichoderma seed treatment', 'Crop rotation with rice'], pestsAndDiseases: 'Stem rot, root rot, semilooper' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '6–8 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Banana', emoji: '🍌', sowingSeason: 'Year-round (best June – July)', soilType: 'Well-drained loamy to clay loam', expectedYield: '20–30 tonnes/acre', waterRequirement: 'High (1200–2200 mm)', organicTips: ['FYM 25 kg/plant', 'Pseudomonas for Panama wilt', 'Mulch with dry leaves'], pestsAndDiseases: 'Panama wilt, Sigatoka leaf spot, banana weevil' },
      { name: 'Ginger', emoji: '🫚', sowingSeason: 'April – May', soilType: 'Well-drained loamy to sandy loam', expectedYield: '40–60 quintals/acre (fresh)', waterRequirement: 'Moderate (1500–2000 mm)', organicTips: ['FYM 25 t/ha', 'Trichoderma for rhizome rot', 'Mulch with dry leaves'], pestsAndDiseases: 'Rhizome rot, leaf spot, shoot borer' },
      { name: 'Turmeric', emoji: '🟡', sowingSeason: 'May – June', soilType: 'Well-drained loamy or sandy loam', expectedYield: '20–25 quintals/acre (dry)', waterRequirement: 'Moderate (1500 mm)', organicTips: ['Neem cake 250 kg/ha', 'Mulch with paddy straw', 'Pseudomonas fluorescens for rhizome rot'], pestsAndDiseases: 'Rhizome rot, leaf blotch, shoot borer' },
      { name: 'Vegetables (Mixed)', emoji: '🥦', sowingSeason: 'Year-round', soilType: 'Well-drained loamy', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['FYM 15 t/ha', 'Yellow sticky traps for pests', 'Neem oil spray'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
    ],
  },
  'Himachal Pradesh': {
    climate: 'Temperate to alpine',
    description: 'Himachal Pradesh has a temperate to alpine climate, ideal for apple, stone fruits, wheat, and off-season vegetables.',
    crops: [
      { name: 'Apple', emoji: '🍎', sowingSeason: 'January – February (pruning)', soilType: 'Well-drained loamy to sandy loam', expectedYield: '8–12 tonnes/acre (mature orchard)', waterRequirement: 'Moderate (1000–1500 mm)', organicTips: ['Apply compost 50 kg/tree/year', 'Use pheromone traps for codling moth', 'Bordeaux mixture for scab'], pestsAndDiseases: 'Codling moth, woolly apple aphid, scab, fire blight' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '15–18 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'April – May', soilType: 'Well-drained loamy', expectedYield: '15–20 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Potato', emoji: '🥔', sowingSeason: 'March – April', soilType: 'Sandy loam to loam', expectedYield: '80–120 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['FYM 20 t/ha', 'Certified disease-free seed tubers', 'Bordeaux mixture for late blight'], pestsAndDiseases: 'Late blight, early blight, aphids, tuber moth' },
      { name: 'Pea', emoji: '🫛', sowingSeason: 'October – November (Rabi)', soilType: 'Well-drained loamy to sandy loam', expectedYield: '30–40 quintals/acre (green pods)', waterRequirement: 'Low to moderate (350–500 mm)', organicTips: ['Rhizobium inoculation', 'Compost 5 t/ha', 'Neem-based spray for pod borer'], pestsAndDiseases: 'Pod borer, powdery mildew, root rot' },
      { name: 'Ginger', emoji: '🫚', sowingSeason: 'April – May', soilType: 'Well-drained loamy to sandy loam', expectedYield: '40–60 quintals/acre (fresh)', waterRequirement: 'Moderate (1500–2000 mm)', organicTips: ['FYM 25 t/ha', 'Trichoderma for rhizome rot', 'Mulch with dry leaves'], pestsAndDiseases: 'Rhizome rot, leaf spot, shoot borer' },
      { name: 'Plum', emoji: '🍑', sowingSeason: 'January – February (pruning)', soilType: 'Well-drained loamy to sandy loam', expectedYield: '5–8 tonnes/acre (mature)', waterRequirement: 'Moderate (800–1200 mm)', organicTips: ['Compost 30 kg/tree/year', 'Pheromone traps for fruit fly', 'Bordeaux mixture for brown rot'], pestsAndDiseases: 'Fruit fly, brown rot, leaf spot, aphids' },
      { name: 'Off-season Vegetables', emoji: '🥦', sowingSeason: 'March – April, September – October', soilType: 'Well-drained loamy', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['FYM 15 t/ha', 'Yellow sticky traps for pests', 'Neem oil spray'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
    ],
  },
  Uttarakhand: {
    climate: 'Temperate to alpine',
    description: 'Uttarakhand has diverse agro-climatic zones from the Terai plains to the Himalayan highlands, supporting basmati rice, wheat, and horticulture.',
    crops: [
      { name: 'Basmati Rice', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Well-drained loamy to sandy loam', expectedYield: '12–15 quintals/acre', waterRequirement: 'High (1200–1500 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '15–18 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Apple', emoji: '🍎', sowingSeason: 'January – February (pruning)', soilType: 'Well-drained loamy to sandy loam', expectedYield: '8–12 tonnes/acre', waterRequirement: 'Moderate (1000–1500 mm)', organicTips: ['Compost 50 kg/tree/year', 'Pheromone traps for codling moth', 'Bordeaux mixture for scab'], pestsAndDiseases: 'Codling moth, woolly apple aphid, scab, fire blight' },
      { name: 'Potato', emoji: '🥔', sowingSeason: 'March – April', soilType: 'Sandy loam to loam', expectedYield: '80–120 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['FYM 20 t/ha', 'Certified disease-free seed tubers', 'Bordeaux mixture for late blight'], pestsAndDiseases: 'Late blight, early blight, aphids, tuber moth' },
      { name: 'Mandua (Finger Millet)', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Red loamy to sandy loam', expectedYield: '8–12 quintals/acre', waterRequirement: 'Low (350–500 mm)', organicTips: ['FYM 5 t/ha', 'Azospirillum seed treatment', 'Intercrop with cowpea'], pestsAndDiseases: 'Blast, foot rot, aphids' },
      { name: 'Soybean', emoji: '🫘', sowingSeason: 'June – July', soilType: 'Well-drained loamy to clay loam', expectedYield: '10–15 quintals/acre', waterRequirement: 'Moderate (450–700 mm)', organicTips: ['Rhizobium seed treatment', 'Vermicompost 2 t/ha', 'Yellow sticky traps for whitefly'], pestsAndDiseases: 'Girdle beetle, stem fly, yellow mosaic virus' },
      { name: 'Ginger', emoji: '🫚', sowingSeason: 'April – May', soilType: 'Well-drained loamy to sandy loam', expectedYield: '40–60 quintals/acre (fresh)', waterRequirement: 'Moderate (1500–2000 mm)', organicTips: ['FYM 25 t/ha', 'Trichoderma for rhizome rot', 'Mulch with dry leaves'], pestsAndDiseases: 'Rhizome rot, leaf spot, shoot borer' },
      { name: 'Off-season Vegetables', emoji: '🥦', sowingSeason: 'March – April, September – October', soilType: 'Well-drained loamy', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['FYM 15 t/ha', 'Yellow sticky traps for pests', 'Neem oil spray'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
    ],
  },
  Jharkhand: {
    climate: 'Sub-tropical humid',
    description: 'Jharkhand has a sub-tropical humid climate with red and laterite soils, suitable for rice, maize, and oilseeds.',
    crops: [
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Red laterite to clay loam', expectedYield: '15–20 quintals/acre', waterRequirement: 'High (1200–1500 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'June – July', soilType: 'Well-drained loamy', expectedYield: '15–20 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '12–15 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '5–7 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Groundnut', emoji: '🥜', sowingSeason: 'June – July', soilType: 'Well-drained sandy loam', expectedYield: '6–10 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Rhizobium + PSB seed treatment', 'Gypsum 200 kg/ha at pegging', 'Neem cake for soil pests'], pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner' },
      { name: 'Linseed', emoji: '🌱', sowingSeason: 'October – November', soilType: 'Well-drained loamy to clay loam', expectedYield: '4–6 quintals/acre', waterRequirement: 'Low (250–350 mm)', organicTips: ['FYM 5 t/ha', 'Trichoderma seed treatment', 'Intercrop with wheat'], pestsAndDiseases: 'Powdery mildew, rust, bud fly' },
      { name: 'Vegetables (Mixed)', emoji: '🥦', sowingSeason: 'Year-round', soilType: 'Well-drained loamy', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['FYM 15 t/ha', 'Yellow sticky traps for pests', 'Neem oil spray'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
      { name: 'Arhar (Pigeonpea)', emoji: '🫘', sowingSeason: 'June – July', soilType: 'Well-drained loamy to sandy loam', expectedYield: '6–10 quintals/acre', waterRequirement: 'Low to moderate (600–1000 mm)', organicTips: ['Rhizobium inoculation', 'Intercrop with sorghum or maize', 'Neem oil for pod borer'], pestsAndDiseases: 'Pod borer, wilt, sterility mosaic' },
    ],
  },
  Chhattisgarh: {
    climate: 'Sub-tropical humid',
    description: 'Chhattisgarh is known as the "Rice Bowl of India" with fertile plains and tribal farming traditions.',
    crops: [
      { name: 'Rice (Paddy)', emoji: '🌾', sowingSeason: 'June – July', soilType: 'Clay loam to heavy clay', expectedYield: '18–22 quintals/acre', waterRequirement: 'High (1200–1600 mm)', organicTips: ['SRI method', 'Green manure before transplanting', 'Azolla as biofertilizer'], pestsAndDiseases: 'Blast, sheath blight, brown plant hopper, gall midge' },
      { name: 'Maize', emoji: '🌽', sowingSeason: 'June – July', soilType: 'Well-drained loamy', expectedYield: '15–20 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Compost 8 t/ha', 'Trichogramma for stem borer', 'Intercrop with legumes'], pestsAndDiseases: 'Fall armyworm, stem borer, leaf blight' },
      { name: 'Soybean', emoji: '🫘', sowingSeason: 'June – July', soilType: 'Well-drained loamy to clay loam', expectedYield: '10–15 quintals/acre', waterRequirement: 'Moderate (450–700 mm)', organicTips: ['Rhizobium seed treatment', 'Vermicompost 2 t/ha', 'Yellow sticky traps for whitefly'], pestsAndDiseases: 'Girdle beetle, stem fly, yellow mosaic virus' },
      { name: 'Arhar (Pigeonpea)', emoji: '🫘', sowingSeason: 'June – July', soilType: 'Well-drained loamy to sandy loam', expectedYield: '6–10 quintals/acre', waterRequirement: 'Low to moderate (600–1000 mm)', organicTips: ['Rhizobium inoculation', 'Intercrop with sorghum', 'Neem oil for pod borer'], pestsAndDiseases: 'Pod borer, wilt, sterility mosaic' },
      { name: 'Groundnut', emoji: '🥜', sowingSeason: 'June – July', soilType: 'Well-drained sandy loam', expectedYield: '6–10 quintals/acre', waterRequirement: 'Moderate (500–700 mm)', organicTips: ['Rhizobium + PSB seed treatment', 'Gypsum 200 kg/ha at pegging', 'Neem cake for soil pests'], pestsAndDiseases: 'Tikka leaf spot, stem rot, leaf miner' },
      { name: 'Wheat', emoji: '🌾', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '12–15 quintals/acre', waterRequirement: 'Moderate (400–500 mm)', organicTips: ['FYM 10 t/ha', 'Azotobacter bio-fertilizer', 'Trichoderma seed treatment'], pestsAndDiseases: 'Yellow rust, aphids, loose smut' },
      { name: 'Mustard', emoji: '🌼', sowingSeason: 'October – November', soilType: 'Well-drained loamy', expectedYield: '5–7 quintals/acre', waterRequirement: 'Low to moderate (250–400 mm)', organicTips: ['FYM 5 t/ha', 'Neem oil for aphids', 'Intercrop with wheat'], pestsAndDiseases: 'Aphids, white rust, Alternaria blight' },
      { name: 'Vegetables (Mixed)', emoji: '🥦', sowingSeason: 'Year-round', soilType: 'Well-drained loamy', expectedYield: 'Varies by crop', waterRequirement: 'Moderate (500–800 mm)', organicTips: ['FYM 15 t/ha', 'Yellow sticky traps for pests', 'Neem oil spray'], pestsAndDiseases: 'Aphids, whitefly, fruit borer, leaf spot' },
    ],
  },
};

const REGIONS = Object.keys(regionCropData);

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn';
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, animation = 'fadeIn', className = '', delay = 0 }: AnimatedSectionProps) {
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
      className={`${className} ${visible ? `animate-${animation}` : 'opacity-0'}`}
      style={{ animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}

const howItWorks = [
  {
    step: 1,
    icon: '📍',
    title: 'Select Your Region',
    description: 'Choose your state or region from the dropdown. Our database covers 20+ Indian states with region-specific agricultural data.',
  },
  {
    step: 2,
    icon: '🌡️',
    title: 'Analyze Climate & Soil',
    description: 'We analyze the typical climate patterns, rainfall, temperature ranges, and predominant soil types of your selected region.',
  },
  {
    step: 3,
    icon: '🌱',
    title: 'Get Crop Recommendations',
    description: 'Receive a curated list of 8+ crops best suited for your region, complete with sowing seasons, yield expectations, and water requirements.',
  },
  {
    step: 4,
    icon: '🌿',
    title: 'Apply Organic Practices',
    description: 'Each crop card includes 2–3 organic farming tips and common pest/disease information to help you farm sustainably and profitably.',
  },
];

export default function CropSuggestions() {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const navigate = useNavigate();

  const regionData = selectedRegion ? regionCropData[selectedRegion] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn" className="relative overflow-hidden">
        <div className="hero-gradient py-20 px-4 text-center relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🌾</div>
            <div className="absolute top-20 right-20 text-6xl">🌱</div>
            <div className="absolute bottom-10 left-1/4 text-7xl">🌿</div>
            <div className="absolute bottom-20 right-1/3 text-5xl">🍃</div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>📍</span>
              <span>Location-Based Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Location-Based Crop Suggestions
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover the best crops for your region with detailed agronomic information, organic farming tips, and pest management guidance tailored to Indian agro-climatic zones.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-white/80 text-sm">
              <span className="flex items-center gap-1"><span>✅</span> 20+ Indian States</span>
              <span className="flex items-center gap-1"><span>✅</span> 8+ Crops Per Region</span>
              <span className="flex items-center gap-1"><span>✅</span> Organic Farming Tips</span>
              <span className="flex items-center gap-1"><span>✅</span> Pest & Disease Info</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our location-based crop recommendation system uses regional agro-climatic data to suggest the most suitable crops for your area.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <AnimatedSection key={item.step} animation="slideUp" delay={index * 100}>
                <div className="eco-card text-center h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Region Selector Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">Select Your Region</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose your state to get personalized crop recommendations based on local climate, soil type, and agricultural practices.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={100}>
            <div className="max-w-md mx-auto mb-10">
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-4 pr-10 rounded-xl border-2 border-primary/30 bg-background text-foreground text-lg font-medium focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer shadow-sm"
                >
                  <option value="">🗺️ Select a State / Region</option>
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Region Info Banner */}
          {regionData && (
            <AnimatedSection animation="slideUp">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-10 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="text-4xl">🌍</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{selectedRegion}</h3>
                    <p className="text-primary font-medium text-sm mb-1">Climate: {regionData.climate}</p>
                    <p className="text-muted-foreground text-sm">{regionData.description}</p>
                  </div>
                  <div className="md:ml-auto text-center bg-primary text-primary-foreground px-4 py-2 rounded-xl">
                    <div className="text-2xl font-bold">{regionData.crops.length}+</div>
                    <div className="text-xs">Crops</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Crop Cards Grid */}
          {regionData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {regionData.crops.map((crop, index) => (
                <AnimatedSection key={crop.name} animation="slideUp" delay={index * 80}>
                  <div className="eco-card h-full flex flex-col">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {crop.emoji}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{crop.name}</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          {crop.soilType.split(' ')[0]} soil
                        </span>
                      </div>
                    </div>

                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <span>📅</span> Sowing Season
                        </div>
                        <div className="text-xs font-medium text-foreground leading-tight">{crop.sowingSeason}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <span>💧</span> Water Need
                        </div>
                        <div className="text-xs font-medium text-foreground leading-tight">{crop.waterRequirement}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <span>🌍</span> Soil Type
                        </div>
                        <div className="text-xs font-medium text-foreground leading-tight">{crop.soilType}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <span>📊</span> Expected Yield
                        </div>
                        <div className="text-xs font-medium text-foreground leading-tight">{crop.expectedYield}</div>
                      </div>
                    </div>

                    {/* Organic Tips */}
                    <div className="mb-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">🌿</span>
                        <h4 className="text-sm font-semibold text-foreground">Organic Farming Tips</h4>
                      </div>
                      <ul className="space-y-1">
                        {crop.organicTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pests & Diseases */}
                    <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">⚠️</span>
                        <h4 className="text-xs font-semibold text-foreground">Common Pests & Diseases</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{crop.pestsAndDiseases}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection animation="fadeIn">
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🗺️</div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Select a Region to Get Started</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Choose your state from the dropdown above to see detailed crop recommendations tailored to your region's climate and soil conditions.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection animation="slideUp">
        <section className="py-16 px-4 bg-primary/5 border-t border-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Need More Agricultural Guidance?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our organic farming techniques, government schemes, and expert resources to maximize your farm's productivity sustainably.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate({ to: '/techniques' })}
                className="eco-btn-primary px-6 py-3 rounded-xl font-semibold"
              >
                🌿 Organic Techniques
              </button>
              <button
                onClick={() => navigate({ to: '/schemes' })}
                className="eco-btn-secondary px-6 py-3 rounded-xl font-semibold"
              >
                🏛️ Government Schemes
              </button>
              <button
                onClick={() => navigate({ to: '/contact' })}
                className="eco-btn-secondary px-6 py-3 rounded-xl font-semibold"
              >
                📞 Contact Expert
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
