import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, Zap, ArrowRight, TrendingUp, ShieldAlert } from 'lucide-react';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

const highlights = [
  {
    title: 'C&I Net Metering',
    subtitle: 'Up to 500 kWp Systems',
    description: 'Install a rooftop PV system up to 80% of your contracted demand. Export excess daytime generation to the TGSPDCL/TGNPDCL grid. Exported units are adjusted against your monthly consumption, dramatically reducing your high-rate slab charges.',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    stats: 'Up to 80% Sanctioned Load Cap'
  },
  {
    title: 'Complete Surcharge Exemptions',
    subtitle: 'TSERC 2025 Grid Regulation',
    description: 'To promote clean energy, the 2025 TSERC policy grants absolute exemptions from banking charges, wheeling charges, cross-subsidy surcharges, and any additional utility surcharges for Net and Gross Metered installations.',
    icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    stats: '100% Exempt'
  },
  {
    title: 'Accelerated Depreciation',
    subtitle: '40% First-Year Tax Benefit',
    description: 'Businesses can claim 40% accelerated depreciation in the first year of installation, allowing massive tax savings that lower the net project cost and accelerate the return on your solar investment.',
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    stats: '40% AD Benefit'
  },
  {
    title: 'Turnkey Compliance & CEIG',
    subtitle: 'Safety Clearance Management',
    description: 'Large commercial installations require complex technical approvals. Our team handles the entire process: initial structural wind load certification (up to 160 km/h), grid feasibility filings, CEIG safety clearance for systems above 56 kWp, and bi-directional net meter integration.',
    icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
    stats: 'CEIG Clearance (>56 kWp)'
  }
];

const policyTable = [
  { parameter: 'Solar Capacity Limit', rule: 'Capped at a maximum of 80% of the active sanctioned load / contracted demand.' },
  { parameter: 'Net Metering Limit', rule: 'Available for commercial systems up to 500 kWp.' },
  { parameter: 'Gross Metering Limit', rule: 'Available for systems up to 1 MWp (1,000 kWp).' },
  { parameter: 'Surcharge Exemptions', rule: '100% exempt from banking, wheeling, cross-subsidy, and additional surcharges.' },
  { parameter: 'CEIG Approval Requirement', rule: 'Mandatory physical inspection and clearance from the CEIG for systems exceeding 56 kWp.' }
];

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

export default function CommercialSolar() {
  return (
    <section id="commercial-solar" className="relative py-24 sm:py-32 overflow-hidden bg-solar-bg-secondary">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/[0.015] blur-[100px] pointer-events-none" />

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
            For Business & Industry
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-solar-text mb-5 leading-tight"
          >
            Commercial & Industrial Solar:{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Slash Overhead by 80%
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-solar-text-muted max-w-3xl mx-auto font-body"
          >
            Commercial establishments, private schools, corporate offices, hospitals, and cold storages in Hyderabad face some of the highest power tariffs in the country, often exceeding ₹9.50 to ₹11.50 per unit during peak hours. Under the newly enacted TSERC Rooftop Solar PV Grid Interactive Systems Regulation, commercial consumers can offset these costs through grid-synchronized solar.
          </motion.p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              className="solar-panel-card solar-panel-card-gold p-6 sm:p-8 cursor-default group flex flex-col justify-between"
            >
              {/* Corner brackets */}
              <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
              <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-br" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-solar-card border border-solar-border flex items-center justify-center group-hover:border-amber-400/30 transition-colors">
                    {h.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-solar-text group-hover:text-solar-gold transition-colors">{h.title}</h3>
                    <p className="text-[10px] text-solar-text-dim font-body tracking-wider uppercase">{h.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-solar-text-muted leading-relaxed font-body">
                  {h.description}
                </p>

                <div className="pt-3 border-t border-solar-border flex justify-between items-center text-xs">
                  <span className="text-solar-text-dim uppercase font-semibold tracking-wider font-body">Key Metric</span>
                  <span className="text-purple-400 font-bold font-heading">{h.stats}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regulatory TSERC 2025 Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-solar-border rounded-3xl p-6 sm:p-8 lg:p-10 bg-solar-card backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-2/5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 font-body">
                Policy Compliance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-solar-text">
                TSERC 2025 C&I Regulatory Framework
              </h3>
              <p className="text-sm text-solar-text-muted leading-relaxed font-body">
                Protect your business from future utility tariff hikes. Our commercial projects deliver a typical payback period of 3.8 to 4.2 years, followed by 20+ years of free electricity. We navigate all complex state policies and CEIG approvals to keep your system fully compliant.
              </p>
            </div>

            <div className="lg:w-3/5 w-full border border-solar-border rounded-2xl overflow-hidden bg-solar-card-solid">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-body">
                <thead>
                  <tr className="border-b border-solar-border bg-solar-card">
                    <th className="p-4 font-bold text-solar-text uppercase w-1/3">Parameter</th>
                    <th className="p-4 font-bold text-solar-text uppercase w-2/3">TSERC 2025 Regulation Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-solar-border text-solar-text-muted">
                  {policyTable.map((row) => (
                    <tr key={row.parameter}>
                      <td className="p-4 font-semibold text-solar-text">{row.parameter}</td>
                      <td className="p-4 leading-relaxed">{row.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

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
            Request Commercial Quote
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
