import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Home, Building2, Landmark, Sprout, ArrowRight } from 'lucide-react';
import Hero from '../Hero';
import Marquee from '../Marquee';
import Testimonials from '../Testimonials';
import ContactForm from '../ContactForm';
import { fadeInUp, staggerContainer, sectionViewport } from '../../lib/animations';
import { useBackgroundSettings } from '../../context/BackgroundSettingsContext';

const offerings = [
  {
    title: 'Solar for Homes (Residential)',
    description: 'Save up to 90% on your home electricity bill under the PM Surya Ghar Muft Bijli Yojana. We provide Tier-1 panels, DeccanShield structural mounts, and CEA-compliant inverters backed by a 25-year linear performance guarantee.',
    icon: <Home className="w-5 h-5" />,
    badge: 'Up to ₹78,000 Subsidy',
    hash: '#homes',
    trifoldAccent: 'amber' as const,
    stats: [
      { label: 'System Size', value: '1kW – 10kWp' },
      { label: 'Avg Payback', value: '4.2 Years' },
    ],
  },
  {
    title: 'Housing Societies & RWAs',
    description: 'Cut common area maintenance costs dramatically. RWAs and GHS complexes in Telangana can install common rooftop arrays with huge capital subsidies and flexible payment choices.',
    icon: <Building2 className="w-5 h-5" />,
    badge: '₹18,000 / kW Subsidy',
    hash: '#societies',
    trifoldAccent: 'sky' as const,
    stats: [
      { label: 'Capacity Cap', value: 'Up to 500 kWp' },
      { label: 'Subsidy Cap', value: 'Max ₹90 Lakhs' },
    ],
  },
  {
    title: 'Commercial & Industrial Solar',
    description: 'Reduce high business overheads under the TSERC 2025 regulatory framework. Claim a first-year 40% Accelerated Depreciation tax benefit and enjoy grid exemptions with paybacks under 4 years.',
    icon: <Landmark className="w-5 h-5" />,
    badge: 'Slash Overheads by 80%',
    hash: '#commercial',
    trifoldAccent: 'emerald' as const,
    stats: [
      { label: 'Net Metering', value: 'Up to 500 kWp' },
      { label: 'Surcharge', value: '100% Exempt' },
    ],
  },
  {
    title: 'Agricultural Solar (PM-KUSUM)',
    description: 'Empowering Telangana farmers with reliable solar energy. Special government subsidies for off-grid water pumps and opportunities to monetize barren/fallow land with grid-connected power plants.',
    icon: <Sprout className="w-5 h-5" />,
    badge: 'Up to 60% Subsidized',
    hash: '#farmers',
    trifoldAccent: 'emerald' as const,
    stats: [
      { label: 'Pump Sizing', value: 'Up to 7.5 HP' },
      { label: 'PPA Tenure', value: '25 Years Income' },
    ],
  },
];

// Trifold accent colors (original multi-color card style)
const trifoldMap = {
  amber: {
    icon: 'rgba(245,158,11,0.08)',
    iconColor: '#F59E0B',
    badge: { color: '#F59E0B', border: 'rgba(245,158,11,0.2)', bg: 'rgba(245,158,11,0.06)' },
    stat: { bg: 'rgba(245,158,11,0.06)', color: '#F59E0B' },
    btn: { bg: 'rgba(245,158,11,0.05)', color: '#F59E0B', border: 'rgba(245,158,11,0.35)', hoverBg: '#F59E0B', hoverColor: '#0a0a0a' },
    topBorder: 'rgba(245,158,11,0.6)',
    hoverBorder: 'rgba(245,158,11,0.3)',
    hoverShadow: 'rgba(245,158,11,0.08)',
  },
  sky: {
    icon: 'rgba(56,189,248,0.08)',
    iconColor: '#38BDF8',
    badge: { color: '#38BDF8', border: 'rgba(56,189,248,0.2)', bg: 'rgba(56,189,248,0.06)' },
    stat: { bg: 'rgba(56,189,248,0.06)', color: '#38BDF8' },
    btn: { bg: 'rgba(56,189,248,0.05)', color: '#38BDF8', border: 'rgba(56,189,248,0.35)', hoverBg: '#38BDF8', hoverColor: '#0a0a0a' },
    topBorder: 'rgba(56,189,248,0.6)',
    hoverBorder: 'rgba(56,189,248,0.3)',
    hoverShadow: 'rgba(56,189,248,0.08)',
  },
  emerald: {
    icon: 'rgba(52,211,153,0.08)',
    iconColor: '#34D399',
    badge: { color: '#34D399', border: 'rgba(52,211,153,0.2)', bg: 'rgba(52,211,153,0.06)' },
    stat: { bg: 'rgba(52,211,153,0.06)', color: '#34D399' },
    btn: { bg: 'rgba(52,211,153,0.05)', color: '#34D399', border: 'rgba(52,211,153,0.35)', hoverBg: '#34D399', hoverColor: '#0a0a0a' },
    topBorder: 'rgba(52,211,153,0.6)',
    hoverBorder: 'rgba(52,211,153,0.3)',
    hoverShadow: 'rgba(52,211,153,0.08)',
  },
};

// Unified gold colors (corrected style)
const goldAccent = {
  icon: 'rgba(245,158,11,0.08)',
  iconColor: '#F59E0B',
  badge: { color: '#F59E0B', border: 'rgba(245,158,11,0.2)', bg: 'rgba(245,158,11,0.06)' },
  stat: { bg: 'rgba(245,158,11,0.04)', color: '#F59E0B' },
  btn: { bg: 'rgba(245,158,11,0.04)', color: '#F59E0B', border: 'rgba(245,158,11,0.35)', hoverBg: '#F59E0B', hoverColor: '#030712' },
  topBorder: 'rgba(245,158,11,0.6)',
  hoverBorder: 'rgba(245,158,11,0.3)',
  hoverShadow: 'rgba(245,158,11,0.06)',
};

// Brochure panels: Panel A is deep saturated cobalt, Panel B is deep premium bronze-charcoal (bespoke out-of-website luxury tone)
const panelDarkGoldAccent = {
  isDark: true,
  background: '#061148',
  border: 'rgba(212, 165, 26, 0.25)',
  text: '#FFFFFF',
  textMuted: '#CBD5E1',
  textDim: '#94A3B8',
  icon: 'rgba(212, 165, 26, 0.12)',
  iconColor: '#D4A51A',
  badge: { color: '#D4A51A', border: 'rgba(212, 165, 26, 0.3)', bg: 'rgba(212, 165, 26, 0.08)' },
  stat: { bg: 'rgba(212, 165, 26, 0.06)', color: '#D4A51A' },
  btn: { bg: 'rgba(212, 165, 26, 0.05)', color: '#D4A51A', border: 'rgba(212, 165, 26, 0.35)', hoverBg: '#D4A51A', hoverColor: '#061148' },
  topBorder: 'rgba(212, 165, 26, 0.7)',
  hoverBorder: 'rgba(212, 165, 26, 0.45)',
  hoverShadow: 'rgba(212, 165, 26, 0.15)',
};

const panelBronzeGoldAccent = {
  isDark: true,
  background: '#0A1C66', // Deep secondary saturated ink-blue (perfectly matches website design system)
  border: 'rgba(212, 165, 26, 0.20)',
  text: '#FFFFFF', // Clean white
  textMuted: '#CBD5E1', // Muted slate text
  textDim: '#94A3B8', // Dimmed slate text
  icon: 'rgba(212, 165, 26, 0.12)',
  iconColor: '#D4A51A',
  badge: { color: '#D4A51A', border: 'rgba(212, 165, 26, 0.3)', bg: 'rgba(212, 165, 26, 0.08)' },
  stat: { bg: 'rgba(212, 165, 26, 0.06)', color: '#D4A51A' },
  btn: { bg: 'rgba(212, 165, 26, 0.05)', color: '#D4A51A', border: 'rgba(212, 165, 26, 0.35)', hoverBg: '#D4A51A', hoverColor: '#0A1C66' },
  topBorder: 'rgba(212, 165, 26, 0.7)',
  hoverBorder: 'rgba(212, 165, 26, 0.45)',
  hoverShadow: 'rgba(212, 165, 26, 0.15)',
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.08 + i * 0.09,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function HomeView() {
  const { cardColorMode } = useBackgroundSettings();

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

      {/* 3. Our Solutions */}
      <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'var(--solar-bg)' }}>
        {/* Single subtle background glow — gold only */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-4 font-body"
              style={{ color: 'var(--solar-gold)' }}
            >
              Our Offerings
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold font-heading mb-4 leading-tight"
              style={{ color: 'var(--solar-text)' }}
            >
              Rooftop Solar for{' '}
              <span style={{ color: 'var(--solar-gold)' }}>Every Sector</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base max-w-xl mx-auto font-body"
              style={{ color: 'var(--solar-text-muted)' }}
            >
              Customized solar layouts engineered for maximum savings, structural stability, and regulatory compliance.
            </motion.p>
          </motion.div>

          {/* Offerings Grid */}
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {offerings.map((off, i) => {
              // Pick accent based on mode
              const isBrochurePanels = cardColorMode === 'brochure-panels';
              let a: any;
              if (cardColorMode === 'trifold') {
                a = trifoldMap[off.trifoldAccent];
              } else if (isBrochurePanels) {
                // Alternate panels: index 0 and 2 are dark/blue, 1 and 3 are dark bronze-charcoal
                a = i % 2 === 0 ? panelDarkGoldAccent : panelBronzeGoldAccent;
              } else {
                a = goldAccent;
              }

              const bgStyle = isBrochurePanels ? a.background : 'var(--solar-card)';
              const borderStyle = isBrochurePanels ? `1px solid ${a.border}` : '1px solid var(--solar-border)';
              const defaultHoverBorder = isBrochurePanels ? a.border : 'var(--solar-border)';

              return (
              <motion.div
                key={off.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={cardVariants}
                className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: bgStyle,
                  border: borderStyle,
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = a.hoverBorder;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${a.hoverShadow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = defaultHoverBorder;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                {/* Hover top border accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${a.topBorder}, transparent)` }}
                />

                <div className="p-6 sm:p-7 flex flex-col h-full gap-5">
                  {/* Top row: icon + badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: a.icon, color: a.iconColor }}
                    >
                      {off.icon}
                    </div>
                    <span
                      className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border flex-shrink-0"
                      style={{
                        color: a.badge.color,
                        borderColor: a.badge.border,
                        background: a.badge.bg,
                      }}
                    >
                      {off.badge}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="space-y-2 flex-1">
                    <h3
                      className="font-heading font-bold text-lg leading-snug"
                      style={{ color: isBrochurePanels ? a.text : 'var(--solar-text)' }}
                    >
                      {off.title}
                    </h3>
                    <p
                      className="text-sm font-body leading-relaxed"
                      style={{ color: isBrochurePanels ? a.textMuted : 'var(--solar-text-muted)' }}
                    >
                      {off.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div
                    className="grid grid-cols-2 gap-3 pt-4"
                    style={{ borderTop: isBrochurePanels ? `1px solid ${a.border}` : '1px solid var(--solar-border)' }}
                  >
                    {off.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl p-3"
                        style={{ background: a.stat.bg }}
                      >
                        <p
                          className="text-[10px] uppercase tracking-wider font-semibold mb-0.5"
                          style={{ color: isBrochurePanels ? a.textDim : 'var(--solar-text-dim)' }}
                        >
                          {stat.label}
                        </p>
                        <p
                          className="font-bold text-sm"
                          style={{ color: a.stat.color }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => handleNavigate(off.hash)}
                    className="w-full py-3 px-5 rounded-xl font-heading font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                    style={{
                      border: `1px solid ${a.btn.border}`,
                      color: a.btn.color,
                      background: a.btn.bg,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = a.btn.hoverBg;
                      (e.currentTarget as HTMLButtonElement).style.color = a.btn.hoverColor;
                      (e.currentTarget as HTMLButtonElement).style.borderColor = a.btn.hoverBg;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = a.btn.bg;
                      (e.currentTarget as HTMLButtonElement).style.color = a.btn.color;
                      (e.currentTarget as HTMLButtonElement).style.borderColor = a.btn.border;
                    }}
                  >
                    Explore Detailed Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <Testimonials />

      {/* 5. Contact */}
      <ContactForm />
    </div>
  );
}
