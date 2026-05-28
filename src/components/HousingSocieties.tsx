import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Landmark, ShieldCheck, Zap, ArrowRight, Award } from 'lucide-react';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

const models = [
  {
    title: '1. CAPEX Model (Direct Purchase)',
    badge: 'Maximum Return',
    description: 'The society invests its own corpus funds to buy the solar asset. This yields the highest long-term Return on Investment (ROI) with payback periods averaging 4.5 years. The society receives the direct government subsidy of ₹18,000 per kW and offsets up to 90% of common area billing.',
    icon: <ShieldCheck className="w-7 h-7" />,
    accent: 'amber' as const,
    stats: [
      { label: 'Subsidy Received', value: '₹18k / kW' },
      { label: 'Payback Period', value: '4.5 Years' },
      { label: 'Bill Offset', value: 'Up to 90%' },
    ]
  },
  {
    title: '2. ZIP (Zero upfront solar loan)',
    badge: 'Corpus Preserved',
    description: 'We arrange 100% financing for the installation through partner banks. The society pays zero upfront capital. The monthly EMIs are paid out of the immediate electricity bill savings, preserving the society\'s liquid corpus funds.',
    icon: <Landmark className="w-7 h-7" />,
    accent: 'sky' as const,
    stats: [
      { label: 'Upfront Capital', value: '₹0 Upfront' },
      { label: 'Financing', value: '100% Covered' },
      { label: 'EMI Funding', value: 'From Savings' },
    ]
  },
  {
    title: '3. OPEX / RESCO Model (PPA)',
    badge: 'Zero Maintenance',
    description: 'A third-party developer installs, owns, and maintains the solar system on your terrace. The society pays zero installation or maintenance costs. Instead, the society signs a Power Purchase Agreement (PPA) to buy solar power at a rate 30% to 40% lower than the TGSPDCL tariff for a fixed 25-year tenure.',
    icon: <Zap className="w-7 h-7" />,
    accent: 'emerald' as const,
    stats: [
      { label: 'Installation Cost', value: '₹0 Cost' },
      { label: 'Tariff Rate', value: '30–40% Lower' },
      { label: 'Maintenance', value: '100% Developer' },
    ]
  }
];

const accentMap = {
  amber: {
    border: 'border-amber-500/20 hover:border-amber-500/40',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.18)]',
    statBg: 'bg-amber-500/[0.06]',
    statText: 'text-amber-400',
    line: 'via-amber-500',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  sky: {
    border: 'border-sky-500/20 hover:border-sky-500/40',
    iconBg: 'bg-sky-500/10',
    iconText: 'text-sky-400',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(14,165,233,0.18)]',
    statBg: 'bg-sky-500/[0.06]',
    statText: 'text-sky-400',
    line: 'via-sky-500',
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  emerald: {
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.18)]',
    statBg: 'bg-emerald-500/[0.06]',
    statText: 'text-emerald-400',
    line: 'via-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
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
      delay: 0.1 + i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function HousingSocieties() {

  return (
    <section id="housing-societies" className="relative py-24 sm:py-32 overflow-hidden bg-solar-bg">
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/[0.015] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-amber-400 mb-4 font-body"
          >
            Apartments & RWAs
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-solar-text mb-5 leading-tight"
          >
            Rooftop Solar for High-Rises &{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Housing Societies
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-solar-text-muted max-w-3xl mx-auto font-body"
          >
            Common area maintenance charges in Hyderabad's apartment complexes are heavily driven by municipal water pumps, elevators, parking lot lighting, and clubhouses. Under the PM Surya Ghar Muft Bijli Yojana, Residential Welfare Associations (RWAs) and Group Housing Societies (GHS) can transition to solar with massive financial incentives.
          </motion.p>
        </motion.div>

        {/* Subsidy Highlights Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 border border-solar-border rounded-3xl p-6 sm:p-8 lg:p-10 bg-solar-card backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left items-center">
            <div className="md:col-span-2 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-body">
                <Award className="w-3.5 h-3.5" /> PM Surya Ghar RWA Scheme
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-solar-text">
                Registered GHS / RWA Direct Subsidies
              </h3>
              <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
                Make your common area electricity bills nearly zero using DCR-compliant solar modules. Our expert engineering team conducts virtual shadow path mapping of high-rise roofs, ensuring panels are placed clear of water tanks, lift cabins, and cellular towers to achieve maximum generation efficiency. We handle the entire application process on the National Portal and coordinate directly with TGSPDCL/TGNPDCL divisional engineers.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:border-l md:border-solar-border md:pl-8">
              <div className="border border-solar-border rounded-2xl p-4 bg-solar-card-solid">
                <p className="text-[10px] text-solar-text-dim uppercase tracking-wider font-semibold">Subsidy Cap</p>
                <p className="font-bold text-lg sm:text-xl text-amber-400 mt-1">₹18,000</p>
                <p className="text-[10px] text-solar-text-muted mt-0.5">per installed kW</p>
              </div>
              <div className="border border-solar-border rounded-2xl p-4 bg-solar-card-solid">
                <p className="text-[10px] text-solar-text-dim uppercase tracking-wider font-semibold">Capacity Cap</p>
                <p className="font-bold text-lg sm:text-xl text-sky-400 mt-1">500 kW</p>
                <p className="text-[10px] text-solar-text-muted mt-0.5">Max ₹90L Subsidy</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Adoption Models Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {models.map((model, i) => {
            const a = accentMap[model.accent];
            const panelAccentClass = 
              model.accent === 'amber' ? 'solar-panel-card-gold' :
              model.accent === 'sky' ? 'solar-panel-card-sky' :
              'solar-panel-card-emerald';

            return (
              <motion.div
                key={model.title}
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
                {/* Accent top line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${a.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${a.iconBg} ${a.iconText} transition-transform duration-300 group-hover:scale-110`}>
                        {model.icon}
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase border ${a.badge}`}>
                        {model.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-lg text-solar-text mb-3 group-hover:text-solar-gold transition-colors">
                      {model.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-solar-text-muted font-body leading-relaxed mb-6">
                      {model.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mt-auto">
                    {model.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2 ${a.statBg}`}
                      >
                        <span className="text-[11px] text-solar-text-muted font-body">{stat.label}</span>
                        <span className={`text-xs sm:text-sm font-heading font-bold ${a.statText}`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="
              inline-flex items-center gap-2
              px-8 py-4 rounded-full
              bg-gradient-to-r from-amber-500 to-amber-400
              text-gray-950 font-heading font-bold text-base
              shadow-[0_0_30px_rgba(245,158,11,0.3)]
              hover:shadow-[0_0_50px_rgba(245,158,11,0.45)]
              transition-shadow duration-300
            "
          >
            Get Society Feasibility Report
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
