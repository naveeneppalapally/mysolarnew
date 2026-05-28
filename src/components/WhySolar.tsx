import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { TrendingDown, Leaf, Home, ShieldCheck } from 'lucide-react';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Slash Bills by 90%',
    description:
      'Dramatically reduce your monthly electricity bills. Most homeowners see savings from the very first month after installation.',
  },
  {
    icon: Leaf,
    title: 'Go Green',
    description:
      'A single rooftop system offsets over 50 tonnes of CO₂ in its lifetime — equivalent to planting 2,500 trees.',
  },
  {
    icon: Home,
    title: 'Increase Property Value',
    description:
      'Homes with solar installations sell for 4-6% more. It\'s an asset that appreciates while saving you money.',
  },
  {
    icon: ShieldCheck,
    title: '25-Year Warranty',
    description:
      'Tier-1 panels built to last. Rain, hail, or extreme heat — your investment is protected for over two decades.',
  },
];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function WhySolar() {
  return (
    <section id="why-solar" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
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
            Why Solar
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-solar-text mb-5 leading-tight"
          >
            The Smart Investment{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              That Pays You Back
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-solar-text-muted max-w-2xl mx-auto font-body"
          >
            Solar energy isn't just good for the planet — it's the smartest
            financial decision you'll make for your home. Here's why thousands
            across Telangana are making the switch.
          </motion.p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
        >
          {benefits.map((benefit, i) => {
            const isPurple = i % 2 !== 0;
            return (
              <motion.div
                key={benefit.title}
                custom={i}
                variants={cardVariants}
                className={`solar-panel-card ${isPurple ? 'solar-panel-card-indigo' : 'solar-panel-card-gold'} p-6 sm:p-8 cursor-default group`}
              >
                {/* Corner brackets */}
                <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
                <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-br" />

                {/* Card glow on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                  isPurple ? 'from-purple-500/[0.04]' : 'from-amber-500/[0.03]'
                } to-transparent pointer-events-none`} />

                <div className="relative flex items-start gap-5">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${
                      isPurple 
                        ? 'from-purple-500/20 to-indigo-600/10 border border-purple-500/20 group-hover:border-purple-400/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
                        : 'from-amber-500/20 to-amber-600/10 border border-amber-500/20 group-hover:border-amber-400/40 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    } transition-all duration-500`}>
                      <benefit.icon className={`w-6 h-6 ${
                        isPurple ? 'text-purple-400 group-hover:text-purple-300' : 'text-amber-400 group-hover:text-amber-300'
                      } transition-colors duration-300`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-solar-text mb-2 font-heading group-hover:text-solar-gold transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Technical Specifications & Engineering Slabs Section ─── */}
        <TechnicalSpecsBlock />
      </div>
    </section>
  );
}

/* ─── Premium Sub-Component for Databases & Code of Conduct ─── */
import { useState, useEffect } from 'react';
import { Database, Hammer, Shield, ChevronDown, ChevronUp, Check, Award, Wind } from 'lucide-react';

function TechnicalSpecsBlock() {
  const [activeTab, setActiveTab] = useState<'structure' | 'panels' | 'standards'>('structure');
  const [openStandardIndex, setOpenStandardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('tab=structure')) {
        setActiveTab('structure');
      } else if (hash.includes('tab=panels')) {
        setActiveTab('panels');
      } else if (hash.includes('tab=standards')) {
        setActiveTab('standards');
      }
    };
    
    // Listen for hash change events
    window.addEventListener('hashchange', handleHashChange);
    
    // Run initial check
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const panels = [
    {
      model: 'Premier Energies NeoBlack 132 Half-Cut',
      type: 'N-Type TOPCon (Bifacial Glass-Glass)',
      power: '600 W – 630 W',
      efficiency: '22.21% – 23.32%',
      tempCoeff: '-0.29%/°C',
      standards: 'Cell: G12R (210mm x 182.3mm), Anodized Black frame, 2.0mm+2.0mm tempered glass, DCR (Domestic Content Requirement) Compliant, BIS Certified: IS 14286.'
    },
    {
      model: 'Adani Solar Eternal Series Monofacial',
      type: 'P-Type Mono-PERC (144 Half-Cut cells)',
      power: '540 W – 555 W',
      efficiency: '20.89% – 21.48%',
      tempCoeff: '-0.35%/°C',
      standards: 'Cell: M10 (182mm x 182mm), Silver Anodized frame, 3.2mm high-transmission ARC glass, Salt mist resistance (IEC 61701), BIS Certified.'
    },
    {
      model: 'Waaree Energies Bi-55 Series',
      type: 'P-Type Mono-PERC (Bifacial Glass-Backsheet)',
      power: '540 W – 550 W',
      efficiency: '20.90% – 21.29%',
      tempCoeff: '-0.35%/°C',
      standards: 'Cell: M10 (10 Busbar technology), Anodized Aluminium alloy, IP68 split layout junction box, Front load: 5400 Pa; Back: 2400 Pa, BIS Certified.'
    }
  ];

  const standardsList = [
    { title: '1. DC Cabling', sop: 'All DC runs must be housed inside high-grade, heavy-duty UV-resistant PVC conduits to prevent sun exposure.', params: 'XLPE insulated, flame retardant, low smoke, 4mm² / 6mm² cross-section copper solar cables.' },
    { title: '2. Electrical Earthing', sop: 'Dual dedicated chemical earthing pits must be excavated (one for DC module structure, one for AC inverter output).', params: '250mm diameter pits backfilled with low-resistance bentonite clay, 3-meter copper-bonded steel rods.' },
    { title: '3. Lightning Protection', sop: 'A high-conductivity lightning arrestor must be installed at the highest point, wired directly to a dedicated third earthing pit.', params: 'Early Streamer Emission (ESE) lightning arrestor conforming to NFC 17-102 standards.' },
    { title: '4. Surge Protection', sop: 'Dedicated AC and DC Distribution Boxes (ACDB & DCDB) must be installed prior to the inverter.', params: 'Type II Surge Protection Devices (SPDs), along with quick-acting DC fuses (15A/20A) to protect inverter.' },
    { title: '5. Cable Routing', sop: 'No cables are allowed to hang loose or rest on the hot concrete roof floor. All wiring must run along structural channels.', params: 'Perforated hot-dip galvanized steel cable trays with lock-cover lids to safeguard against monsoons.' },
    { title: '6. Roof Anchoring', sop: 'Structures must be chemically anchored to the roof slab. No mechanical anchor expansion bolts are permitted.', params: 'Hilti HIT-RE 500 or Fischer FIS-EM chemical resins, creating a waterproof molecular concrete bond.' },
    { title: '7. Fastener Materials', sop: 'All mechanical fastenings connecting panels to rails and rails to the structure must use stainless steel hardware.', params: 'SS304 structural-grade fasteners (bolts, spring washers, flange nuts) tightened to exact torque specs.' },
    { title: '8. Structural Finish', sop: 'All structures must be fully hot-dip galvanized after cut and weld processes are completed. No raw on-site welding.', params: 'Hot-dip galvanization conforming to IS 4759 with a guaranteed minimum zinc coating thickness of 80 microns.' },
    { title: '9. Waterproofing Restoration', sop: 'Every chemical anchoring point must be sealed with a dual-stage industrial waterproof polyurethane compound.', params: 'Dr. Fixit Polyplus / Hilti weatherproofing sealants to prevent moisture ingress under concrete columns.' },
    { title: '10. Safety Switchgear', sop: 'A manual bi-polar DC isolator switch must be integrated within reach of the inverter for immediate shutdown.', params: 'IP65-rated manual DC Isolator switch certified under IEC 60947-3, ensuring safety during routine maintenance.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-20 rounded-3xl border border-solar-border bg-solar-card backdrop-blur-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Title */}
      <div className="flex flex-col items-center text-center mb-8">
        <span className="text-[10px] font-semibold tracking-widest text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/10 mb-3 font-body flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          Telangana Engineering Standards
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
          High-Performance Solar Engineering
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-solar-border pb-6">
        {[
          { id: 'structure', label: 'DeccanShield™ Structure', icon: Shield },
          { id: 'panels', label: 'Tier-1 Panels Database', icon: Database },
          { id: 'standards', label: '10-Point Code of Conduct', icon: Hammer }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide font-heading cursor-pointer transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/15 to-purple-500/15 border border-purple-500/30 text-solar-gold shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                  : 'border border-solar-border text-solar-text-muted hover:text-solar-text hover:bg-solar-card-solid'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-solar-gold' : 'text-solar-text-dim'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {/* 1. DECCANSHIELD MOUNTS */}
        {activeTab === 'structure' && (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <h4 className="text-xl font-bold font-heading text-solar-text flex items-center gap-2">
                <Wind className="w-5 h-5 text-amber-400" />
                DeccanShield™ WindPro Mounts
              </h4>
              <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
                Telangana's extreme summer temperatures and pre-monsoon squalls can damage standard light-gauge steel solar structures. To safeguard your investment, we engineer every structure to our rigid, heavy-duty <strong>DeccanShield™</strong> specifications.
              </p>
              <ul className="space-y-3 font-body text-sm text-solar-text-muted">
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cyclone-Grade Wind Resistance:</strong> Designed to withstand wind speeds up to 160 km/h, strictly conforming to the IS 875 (Part 3) load code.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>80-Micron Hot-Dip Galvanization:</strong> Prevents corrosion for 25+ years in high humidity and extreme heat. Conforms to IS 2062 & IS 4759.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero-Drill Chemical Anchoring:</strong> Utilizes Hilti HIT-RE 500 or Fischer epoxy resins to bond steel legs directly to concrete slabs, preventing water leakage.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Industrial SS304 Fasteners:</strong> High-grade stainless steel hardware prevents galvanic rust and ensures lifetime structural integrity.</span>
                </li>
              </ul>
            </div>

            <div className="border border-solar-border rounded-2xl overflow-hidden bg-solar-card-solid">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-body">
                <thead>
                  <tr className="border-b border-solar-border bg-solar-card">
                    <th className="p-4 font-bold text-solar-text uppercase">Parameter</th>
                    <th className="p-4 font-bold text-solar-text uppercase">Specification</th>
                    <th className="p-4 font-bold text-solar-text uppercase">IS Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-solar-border text-solar-text-muted">
                  <tr>
                    <td className="p-4 font-semibold text-solar-text">Material</td>
                    <td className="p-4">HDG Steel / Aluminium AL6005-T5</td>
                    <td className="p-4">IS 2062 / IS 4759</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-solar-text">Wind Velocity</td>
                    <td className="p-4">160 km/h (44 m/s) Certified</td>
                    <td className="p-4">IS 875 (Part 3)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-solar-text">Roof Bond</td>
                    <td className="p-4">Chemical Anchoring (No mechanical bolts)</td>
                    <td className="p-4">DIN 1045</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-solar-text">Fasteners</td>
                    <td className="p-4">Grade SS304 Stainless Steel</td>
                    <td className="p-4">IS 1367</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. SOLAR PANELS DATABASE */}
        {activeTab === 'panels' && (
          <div className="space-y-6">
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body max-w-3xl">
              Telangana's summer heat exceeding 43°C directly impacts panel output. Standard panels lose significant power under thermal stress. We exclusively install Tier-1 modules with industry-leading temperature coefficients and DCR compliance.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {panels.map((p) => (
                <div key={p.model} className="border border-solar-border rounded-2xl p-5 bg-solar-card-solid flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 group">
                  <div>
                    <h5 className="font-bold text-base font-heading text-solar-text group-hover:text-solar-gold transition-colors mb-1">{p.model}</h5>
                    <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/10 font-mono tracking-wider">{p.type}</span>
                    
                    <div className="grid grid-cols-2 gap-4 my-4 font-body">
                      <div>
                        <p className="text-[10px] text-solar-text-dim uppercase tracking-wider">Power Output</p>
                        <p className="font-bold text-sm text-solar-text">{p.power}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-solar-text-dim uppercase tracking-wider">Max Efficiency</p>
                        <p className="font-bold text-sm text-solar-text">{p.efficiency}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] text-solar-text-dim uppercase tracking-wider">Temp. Coefficient (Pmax)</p>
                        <p className="font-semibold text-xs text-amber-500">{p.tempCoeff}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-solar-border text-xs text-solar-text-muted leading-relaxed font-body">
                    {p.standards}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. 10-POINT CODE OF CONDUCT */}
        {activeTab === 'standards' && (
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body max-w-3xl mb-4">
              To guarantee absolute safety, zero roof leaks, and high performance over 25 years, our engineering crews operate strictly under a certified 10-Point Installation Code of Conduct.
            </p>
            <div className="space-y-2">
              {standardsList.map((std, i) => {
                const isOpen = openStandardIndex === i;
                return (
                  <div key={i} className="border border-solar-border rounded-xl overflow-hidden bg-solar-card-solid">
                    <button
                      onClick={() => setOpenStandardIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-solar-card transition-colors text-left"
                    >
                      <span className="font-heading font-bold text-sm sm:text-base text-solar-text">{std.title}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-solar-gold" /> : <ChevronDown className="w-4 h-4 text-solar-text-muted" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-solar-card/30 border-t border-solar-border grid md:grid-cols-2 gap-4 text-xs sm:text-sm font-body">
                        <div>
                          <p className="text-[10px] text-solar-text-dim uppercase tracking-wider mb-1 font-semibold">Standard Operating Procedure (SOP)</p>
                          <p className="text-solar-text-muted leading-relaxed">{std.sop}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-solar-text-dim uppercase tracking-wider mb-1 font-semibold">Technical Parameter / Material</p>
                          <p className="text-solar-text-muted leading-relaxed">{std.params}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
