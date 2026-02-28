import AnimatedSection from '../components/AnimatedSection';
import { CheckCircle, Info, Users, Sprout, Droplets, CreditCard, Shield, Leaf } from 'lucide-react';

interface Scheme {
  id: string;
  icon: React.ReactNode;
  name: string;
  shortName: string;
  description: string;
  benefits: string[];
  eligibility: string;
  accentColor: string;
}

const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    icon: <Users className="w-6 h-6" />,
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    shortName: 'PM-KISAN',
    description:
      'A central government scheme that provides direct income support of ₹6,000 per year to all landholding farmer families across India. The amount is transferred in three equal installments of ₹2,000 directly to the bank accounts of beneficiaries.',
    benefits: [
      '₹6,000 annual financial assistance in 3 installments',
      'Direct Benefit Transfer (DBT) to bank account',
      'No middlemen — funds credited directly',
      'Covers all small and marginal farmers',
    ],
    eligibility:
      'All landholding farmer families with cultivable land, subject to certain exclusion criteria (income tax payers, institutional landholders, etc.).',
    accentColor: 'border-green-600',
  },
  {
    id: 'pmfby',
    icon: <Shield className="w-6 h-6" />,
    name: 'Pradhan Mantri Fasal Bima Yojana',
    shortName: 'PMFBY',
    description:
      'A comprehensive crop insurance scheme that provides financial support to farmers suffering crop loss or damage due to unforeseen events like natural calamities, pests, and diseases. It aims to stabilize the income of farmers and encourage them to adopt innovative practices.',
    benefits: [
      'Low premium: 2% for Kharif, 1.5% for Rabi crops',
      'Coverage for pre-sowing to post-harvest losses',
      'Protection against natural calamities, pests & diseases',
      'Use of technology for quick claim settlement',
    ],
    eligibility:
      'All farmers growing notified crops in notified areas. Loanee farmers are enrolled compulsorily; non-loanee farmers can opt in voluntarily.',
    accentColor: 'border-blue-600',
  },
  {
    id: 'kcc',
    icon: <CreditCard className="w-6 h-6" />,
    name: 'Kisan Credit Card Scheme',
    shortName: 'KCC',
    description:
      'Provides farmers with affordable and timely credit for their agricultural needs including crop cultivation, post-harvest expenses, maintenance of farm assets, and allied activities. The scheme simplifies the credit delivery mechanism for farmers.',
    benefits: [
      'Flexible credit limit based on land holding & crops',
      'Interest subvention — effective rate as low as 4% p.a.',
      'Covers crop loans, allied activities & consumption needs',
      'Revolving credit facility with ATM/debit card access',
    ],
    eligibility:
      'All farmers — individual/joint borrowers who are owner cultivators, tenant farmers, oral lessees, share croppers, and SHGs or JLGs of farmers.',
    accentColor: 'border-amber-600',
  },
  {
    id: 'nmsa',
    icon: <Leaf className="w-6 h-6" />,
    name: 'National Mission for Sustainable Agriculture',
    shortName: 'NMSA',
    description:
      'Aims to make Indian agriculture more productive, sustainable, remunerative, and climate-resilient by promoting location-specific integrated/composite farming systems. It focuses on soil health management, water use efficiency, and climate change adaptation.',
    benefits: [
      'Soil health management and improvement support',
      'Promotion of organic and natural farming',
      'Subsidies on micro-irrigation systems',
      'Training and capacity building for farmers',
    ],
    eligibility:
      'All farmers, with priority to small and marginal farmers, SC/ST farmers, and farmers in rain-fed and drought-prone areas.',
    accentColor: 'border-emerald-600',
  },
  {
    id: 'soil-health',
    icon: <Sprout className="w-6 h-6" />,
    name: 'Soil Health Card Scheme',
    shortName: 'SHC',
    description:
      'Provides every farmer a Soil Health Card that carries crop-wise recommendations of nutrients and fertilizers required for individual farms to help farmers improve productivity through judicious use of inputs. Cards are issued once every two years.',
    benefits: [
      'Free soil testing and analysis for every farm',
      'Crop-wise fertilizer recommendations',
      'Helps reduce input costs and improve yield',
      'Promotes balanced use of nutrients',
    ],
    eligibility:
      'All farmers across India are eligible to receive a Soil Health Card. Farmers can approach their nearest Krishi Vigyan Kendra or agriculture department office.',
    accentColor: 'border-yellow-600',
  },
  {
    id: 'pmksy',
    icon: <Droplets className="w-6 h-6" />,
    name: 'PM Krishi Sinchayee Yojana',
    shortName: 'PMKSY',
    description:
      'Aims to achieve convergence of investments in irrigation at the field level, expand cultivable area under assured irrigation, improve on-farm water use efficiency, introduce sustainable water conservation practices, and ensure "Har Khet Ko Pani, More Crop Per Drop".',
    benefits: [
      'Subsidy on drip and sprinkler irrigation systems',
      'Expansion of irrigation coverage to new areas',
      'Improved water use efficiency on farms',
      'Watershed development and groundwater recharge',
    ],
    eligibility:
      'All farmers are eligible. Priority is given to small and marginal farmers, SC/ST farmers, and farmers in water-stressed regions. Subsidy varies by state.',
    accentColor: 'border-cyan-600',
  },
];

export default function GovernmentSchemes() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Header */}
      <section className="gradient-green py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white" />
        </div>
        <AnimatedSection animation="fadeIn">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              🏛️ Government Initiatives
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-merriweather">
              Government Schemes for Farmers
            </h1>
            <p className="text-white/85 text-lg leading-relaxed">
              Discover the key Indian government schemes designed to support farmers with financial aid,
              crop insurance, credit access, and sustainable farming practices.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Info Banner */}
      <section className="bg-green-pale/50 border-b border-primary/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm text-muted-foreground">
          <Info className="w-4 h-4 text-primary flex-shrink-0" />
          <p>
            These schemes are offered by the Government of India. Visit your nearest{' '}
            <span className="font-semibold text-primary">Krishi Vigyan Kendra</span> or the official{' '}
            <span className="font-semibold text-primary">PM-KISAN portal</span> to apply and learn more.
          </p>
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground font-merriweather mb-3">
                Key Schemes at a Glance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore 6 major government programs that provide financial support, insurance, credit, and
                resources to Indian farmers.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme, index) => (
              <AnimatedSection key={scheme.id} animation="slideUp" delay={index * 80}>
                <div className={`bg-card rounded-2xl border-l-4 ${scheme.accentColor} border border-border shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col`}>
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center text-white shadow-green flex-shrink-0">
                        {scheme.icon}
                      </div>
                      <div>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full mb-1">
                          {scheme.shortName}
                        </span>
                        <h3 className="text-base font-bold text-foreground font-merriweather leading-snug">
                          {scheme.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="px-6 pb-4 flex-1">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-1.5">
                      {scheme.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div className="px-6 pb-6">
                    <div className="bg-green-pale/50 rounded-xl p-3 border border-primary/10">
                      <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Eligibility
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {scheme.eligibility}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-pale/40">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="zoomIn">
            <div className="eco-card p-10">
              <div className="w-16 h-16 gradient-green rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-green">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground font-merriweather mb-3">
                Need Help Applying?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our team can guide you through the application process for any of these government schemes.
                Reach out to us and we'll help you access the benefits you deserve.
              </p>
              <a
                href="/contact"
                className="inline-block gradient-green text-white px-8 py-3 rounded-xl font-semibold shadow-green hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                Contact Us for Guidance
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
