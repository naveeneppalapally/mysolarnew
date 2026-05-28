import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Home, Building2, Landmark, Sprout, ArrowRight } from 'lucide-react';
import Hero from '../Hero';
import Marquee from '../Marquee';
import Testimonials from '../Testimonials';
import ContactForm from '../ContactForm';
import { fadeInUp, staggerContainer, sectionViewport } from '../../lib/animations';

const offerings = [
  {
    title: 'Solar for Homes (Residential)',
    description: 'Save up to 90% on your home electricity bill under the PM Surya Ghar Muft Bijli Yojana. We provide Tier-1 panels, DeccanShield structural mounts, and CEA-compliant inverters backed by a 25-year linear performance guarantee.',
    icon: <Home className="w-6 h-6 text-solar-gold" />,
    badge: 'Up to ₹78,000 Subsidy',
    hash: '#homes',
    stats: [
      { label: 'System Size', value: '1kW – 10kWp' },
      { label: 'Average Payback', value: '4.2 Years' },
    ],
    accent: 'amber' as const,
  },
  {
    title: 'Housing Societies & RWAs',
    description: 'Cut common area maintenance costs (elevators, water pumps, lighting) dramatically. RWAs and GHS complexes in Telangana can install common rooftop arrays with huge capital subsidies and flexible payment/loan choices.',
    icon: <Building2 className="w-6 h-6 text-solar-purple" />,
    badge: '₹18,000 / kW Subsidy',
    hash: '#societies',
    stats: [
      { label: 'Capacity Cap', value: 'Up to 500 kWp' },
      { label: 'Subsidy Cap', value: 'Max ₹90 Lakhs' },
    ],
    accent: 'sky' as const,
  },
  {
    title: 'Commercial & Industrial Solar',
    description: 'Reduce high business overheads under the TSERC 2025 regulatory framework. Claim a first-year 40% Accelerated Depreciation tax benefit, and enjoy grid exemptions with paybacks under 4 years.',
    icon: <Landmark className="w-6 h-6 text-solar-emerald" />,
    badge: 'Slash Overheads by 80%',
    hash: '#commercial',
    stats: [
      { label: 'Net Metering', value: 'Up to 500 kWp' },
      { label: 'Surcharge', value: '100% Exempt' },
    ],
    accent: 'emerald' as const,
  },
  {
    title: 'Agricultural Solar (PM-KUSUM)',
    description: 'Empowering Telangana farmers with reliable solar energy. Special government subsidies for off-grid water pumps and opportunities to monetize barren/fallow land with grid-connected power plants.',
    icon: <Sprout className="w-6 h-6 text-solar-emerald" />,
    badge: 'Up to 60% Subsidized',
    hash: '#farmers',
    stats: [
      { label: 'Pump Sizing', value: 'Up to 7.5 HP' },
      { label: 'PPA Tenure', value: '25 Years Income' },
    ],
    accent: 'emerald' as const,
  }
];

const accentMap = {
  amber: {
    border: 'border-solar-gold/20 hover:border-solar-gold/40',
    iconBg: 'bg-solar-gold-10',
    iconText: 'text-solar-gold',
    glow: 'group-hover:shadow-glow-gold',
    statBg: 'bg-solar-gold-6',
    statText: 'text-solar-gold',
    line: 'via-solar-gold',
    badge: 'bg-solar-gold-10 text-solar-gold border-solar-gold-20',
    btn: 'bg-solar-gold text-gray-950 hover:bg-solar-gold-bright shadow-[0_0_15px_rgba(245,158,11,0.2)]',
  },
  sky: {
    border: 'border-solar-purple-20 hover:border-solar-purple-40',
    iconBg: 'bg-solar-purple-10',
    iconText: 'text-solar-purple',
    glow: 'group-hover:shadow-glow-purple',
    statBg: 'bg-solar-purple-6',
    statText: 'text-solar-purple',
    line: 'via-solar-purple',
    badge: 'bg-solar-purple-10 text-solar-purple border-solar-purple-20',
    btn: 'bg-solar-indigo text-white hover:bg-solar-purple shadow-[0_0_15px_rgba(3,105,161,0.25)]',
  },
  emerald: {
    border: 'border-solar-emerald-20 hover:border-solar-emerald-40',
    iconBg: 'bg-solar-emerald-10',
    iconText: 'text-solar-emerald',
    glow: 'group-hover:shadow-glow-purple',
    statBg: 'bg-solar-emerald-6',
    statText: 'text-solar-emerald',
    line: 'via-solar-emerald',
    badge: 'bg-solar-emerald-10 text-solar-emerald border-solar-emerald-20',
    btn: 'bg-solar-emerald text-white hover:opacity-90 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.12 + i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function HomeView() {
  const handleNavigate = (hash: string) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Block */}
      <Hero />

      {/* 2. Trust Marquee */}
      <Marquee />

      {/* 3. Our Solutions Segment Showcase */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-solar-bg">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/[0.015] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/[0.015] blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-solar-gold mb-4 font-body"
            >
              Our Offerings
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-solar-text mb-5 leading-tight"
            >
              Rooftop Solar Solutions for{' '}
              <span className="text-solar-gold">
                Every Sector
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-solar-text-muted max-w-2xl mx-auto font-body"
            >
              Discover customized solar layouts engineered to deliver maximum savings, structural stability, and regulatory compliance.
            </motion.p>
          </motion.div>

          {/* Offerings Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {offerings.map((off, i) => {
              const a = accentMap[off.accent];
              const panelAccentClass = 
                off.accent === 'amber' ? 'solar-panel-card-gold' :
                off.accent === 'sky' ? 'solar-panel-card-sky' :
                'solar-panel-card-emerald';

              return (
                <motion.div
                  key={off.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={cardVariants}
                  className={`solar-panel-card ${panelAccentClass} cursor-default group flex flex-col justify-between`}
                >
                  {/* Corner brackets */}
                  <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
                  <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
                  <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
                  <span className="solar-panel-card-corner solar-panel-card-corner-br" />

                  {/* Top line gradient */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${a.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      {/* Icon + Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${a.iconBg} ${a.iconText} transition-transform duration-300 group-hover:scale-110`}>
                          {off.icon}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase border ${a.badge}`}>
                          {off.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-xl text-solar-text group-hover:text-solar-gold transition-colors">
                        {off.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-solar-text-muted font-body leading-relaxed">
                        {off.description}
                      </p>
                    </div>

                    {/* Stats & Actions */}
                    <div className="space-y-5 pt-2 border-t border-solar-border mt-auto">
                      <div className="grid grid-cols-2 gap-4">
                        {off.stats.map((stat) => (
                          <div key={stat.label} className={`rounded-xl p-3 ${a.statBg}`}>
                            <p className="text-[10px] text-solar-text-dim uppercase tracking-wider font-semibold">{stat.label}</p>
                            <p className={`font-bold text-sm sm:text-base ${a.statText} mt-0.5`}>{stat.value}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleNavigate(off.hash)}
                        className={`w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${a.btn}`}
                      >
                        Explore Detailed Guide
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Testimonials Deck */}
      <Testimonials />

      {/* 5. Contact Section */}
      <ContactForm />
    </div>
  );
}
