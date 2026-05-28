import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Sun, Wrench, Building2, Factory, FileText, Gauge, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

const services = [
  {
    icon: Sun,
    title: 'Residential Solar',
    description:
      '3kW to 10kW premium rooftop systems custom-designed for homes and villas. Tier-1 panels, high-efficiency inverters, and maximum savings.',
  },
  {
    icon: Building2,
    title: 'Commercial Solar',
    description:
      'High-return solar power systems optimized for office buildings, retail shops, hospitals, and commercial real estate to cut operational overheads.',
  },
  {
    icon: Factory,
    title: 'Industrial Solar',
    description:
      'Large-scale MW/kW grid-tied solar systems designed for factories, cold storage units, warehouses, and heavy industrial facilities.',
  },
  {
    icon: FileText,
    title: '100% Subsidy Paperwork',
    description:
      'Hassle-free central and state government subsidy processing. We manage all registrations and approvals on behalf of our customers.',
  },
  {
    icon: Gauge,
    title: 'Net Metering Setup',
    description:
      'Complete bidirectional net meter coordination and installation with TGSPDCL & TGNPDCL to sell surplus solar power back to the grid.',
  },
  {
    icon: Wrench,
    title: 'Operations & Maintenance',
    description:
      'Annual maintenance contracts including expert solar panel cleaning, inverter efficiency checks, and lifetime wiring inspection.',
  },
];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.97,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/[0.02] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-amber-500/[0.015] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-amber-400 mb-4 font-body"
          >
            Our Services
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-solar-text mb-5 leading-tight"
          >
            Complete Solar{' '}
            <span className="text-solar-gold">
              Solutions
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-solar-text-muted max-w-2xl mx-auto font-body"
          >
            From installation to maintenance, we handle everything — so you can
            sit back and watch your savings grow.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-20"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              className="solar-panel-card solar-panel-card-gold p-6 sm:p-7 cursor-default group"
            >
              {/* Corner brackets */}
              <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
              <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-br" />

              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 group-hover:border-amber-400/40 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-500">
                    <service.icon className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                  </div>

                  {/* Arrow that slides in on hover */}
                  <div className="overflow-hidden w-8 h-8">
                    <div className="flex items-center justify-center w-8 h-8 -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                      <ArrowRight className="w-4 h-4 text-amber-400/70" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-solar-text mb-2.5 font-heading group-hover:text-solar-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-solar-text-muted leading-relaxed font-body">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Grid-Tied Inverter Specs Database ─── */}
        <InvertersSpecsBlock />
      </div>
    </section>
  );
}

/* ─── Inverters Database sub-component ─── */
import { Cpu, ShieldAlert, Wifi, Activity, CheckSquare } from 'lucide-react';

function InvertersSpecsBlock() {
  const inverters = [
    {
      brand: 'Growatt MIN 3000-10000TL-X',
      arch: 'Single-Phase On-Grid (Dual MPPT Tracker)',
      eff: 'Max: 98.4% | MPPT: 99.9%',
      protection: 'DC Switch, DC/AC Type II SPD, Anti-islanding (IEEE 1547), Ground fault monitor',
      monitoring: 'WiFi-X, ShineServer Web Portal & Mobile App',
      warranty: '5-Year Standard Warranty'
    },
    {
      brand: 'Solis (Ginlong) S6-GR1P',
      arch: 'Single-Phase On-Grid (Wide Voltage Range)',
      eff: 'Max: 97.7% | MPPT: 99.5%',
      protection: 'AFCI (Arc Fault protection), Leakage current, IP66 waterproof, DC reverse-polarity',
      monitoring: 'Solis Datalogger (Wi-Fi/GPRS), SolisCloud App',
      warranty: '5-Year Manufacturer Warranty'
    },
    {
      brand: 'Enphase Energy IQ8HC',
      arch: 'Panel-Level Distributed Microinverter (Rapid Shutdown)',
      eff: 'CEC: 97.0% | Max Peak: 384 VA',
      protection: 'Sub-50V DC low-voltage, Integrated shutdown (NEC 2017), Class II double-insulated, Grid-forming',
      monitoring: 'Enphase Envoy-S Gateway, module-level analytics',
      warranty: '15-Year Standard Warranty'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="rounded-3xl border border-solar-border bg-solar-card backdrop-blur-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="flex flex-col items-center text-center mb-8">
        <span className="text-[10px] font-semibold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/10 mb-3 font-body flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" />
          DISCOM Empanelled Brains
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
          Authorized Grid-Tie Inverters Database
        </h3>
        <p className="text-sm text-solar-text-muted max-w-2xl mt-2 font-body">
          We exclusively install high-efficiency inverters fully empanelled under TGSPDCL & TGNPDCL grid guidelines for safety and performance compliance.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {inverters.map((inv) => (
          <div key={inv.brand} className="border border-solar-border rounded-2xl p-5 bg-solar-card-solid hover:border-amber-500/20 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-bold text-base text-solar-text group-hover:text-solar-gold transition-colors">{inv.brand}</h4>
                <p className="text-[10px] text-solar-text-dim font-body tracking-wider mt-0.5">{inv.arch}</p>
              </div>

              <div className="space-y-2.5 text-xs font-body text-solar-text-muted">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-500/60 shrink-0" />
                  <span><strong>Conversion:</strong> {inv.eff}</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500/60 shrink-0 mt-0.5" />
                  <span><strong>Protections:</strong> {inv.protection}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Wifi className="w-4 h-4 text-amber-500/60 shrink-0 mt-0.5" />
                  <span><strong>Monitoring:</strong> {inv.monitoring}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-amber-500/60 shrink-0" />
                  <span className="text-sky-400 font-semibold">{inv.warranty}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
