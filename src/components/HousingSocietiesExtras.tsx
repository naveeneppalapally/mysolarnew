import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const loadAnalysis = [
  {
    title: 'Water & Fire Pumps',
    desc: 'Submersible water supply pumps run daily for hours, drawing massive continuous power. Offset up to 90% of their operational costs.',
    stat: '30% of Common Bill'
  },
  {
    title: 'Elevators & Lifts',
    desc: 'Lifts require high starting surge currents. Solar inverters are optimized to buffer motor start-up surges without tripping.',
    stat: '25% of Common Bill'
  },
  {
    title: 'Clubhouses & Gyms',
    desc: 'Gym air conditioning, swimming pool filtration pumps, and lighting are direct, heavy daytime loads that sync perfectly with solar peak hours.',
    stat: '20% of Common Bill'
  },
  {
    title: 'Basement & Corridor Lights',
    desc: 'Pathways, parking areas, and basement ventilation lighting are active 24/7 or 12 hours a day. Solar provides a perpetual energy cushion.',
    stat: '15% of Common Bill'
  }
];

const roadmapSteps = [
  {
    step: '01',
    title: 'RWA / GBM Consent',
    desc: 'Pass a General Body resolution securing a simple majority (50%+) consent from apartment owners to approve rooftop solar deployment.'
  },
  {
    step: '02',
    title: '3D Shadow Mapping',
    desc: 'MyHome Solar engineers construct a 3D digital twin of your terrace to avoid shadow zones cast by lift rooms, water tanks, and cell towers.'
  },
  {
    step: '03',
    title: 'DISCOM Feasibility Approval',
    desc: 'We submit net metering load applications to TGSPDCL/TGNPDCL. The utility issues technical clearance within 10 days.'
  },
  {
    step: '04',
    title: 'Elevated Structure Erection',
    desc: 'We install hot-dip galvanized elevated structures (raised up to 10 ft if needed) to keep your terrace usable for recreation.'
  },
  {
    step: '05',
    title: 'Net Metering & Subsidy Credit',
    desc: 'Bidirectional net meter is installed. The central RWA subsidy of ₹18,000/kW is credited directly to the society bank account within 30 days.'
  }
];

const rwaFaqs = [
  {
    q: 'How are the solar savings distributed among individual flat owners?',
    a: 'The solar plant is connected directly to the society\'s common area service meter (which powers lifts, pumps, and parking lights). By slashing this common electricity bill (often by 80–90%), the RWA\'s monthly common maintenance overheads drop significantly. These savings are passed on to owners in the form of reduced monthly maintenance fees.'
  },
  {
    q: 'Will installing solar consume our entire recreational roof terrace?',
    a: 'No. MyHome Solar specializes in Elevated Column Superstructures. We raise the structural column heights by 8 to 10 feet, creating a high-overhead canopy. This leaves the roof floor 100% free for walking, general maintenance, recreation, or building a rooftop gazebo.'
  },
  {
    q: 'What is the required member voting approval needed in Telangana housing societies?',
    a: 'Under cooperative society guidelines, a simple majority (50%+) vote or consensus during an Annual General Body Meeting (AGM) or Special General Body Meeting (EGM) is sufficient to pass the solar resolution and authorize the RWA management to sign agreements.'
  },
  {
    q: 'How do CAPEX, ZIP, and OPEX financing options compare for apartments?',
    a: 'Under CAPEX, the RWA buys the system upfront to get the highest ROI (payback in 4.5 years). ZIP is a bank-financed solar loan where EMIs are funded directly from monthly electricity bill savings. Under OPEX/RESCO, a developer installs panels for free, and the society buys solar power at 30-40% cheaper rates than the DISCOM tariff.'
  }
];

export default function HousingSocietiesExtras() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative py-24 bg-solar-bg-secondary border-t border-solar-border overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-solar-purple opacity-[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-solar-gold opacity-[0.015] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* 1. Common Area Load Analysis */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-purple uppercase bg-solar-purple-10 px-3 py-1 rounded-full border border-solar-purple-20">
              Load Analysis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text">
              Common Area Electricity Breakdown
            </h2>
            <p className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto font-body leading-relaxed">
              Housing society bills are heavily driven by large inductive motors and 24/7 utility lighting. Solar offsets these high-tariff commercial slabs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadAnalysis.map((item, idx) => (
              <div 
                key={idx}
                className="solar-panel-card solar-panel-card-sky p-6 flex flex-col justify-between space-y-5"
              >
                <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
                <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-br" />

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-solar-purple-10 border border-solar-purple-20 text-solar-purple flex items-center justify-center font-heading font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="font-heading font-bold text-base text-solar-text">{item.title}</h4>
                  <p className="text-xs text-solar-text-muted font-body leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-solar-border/60 flex items-center justify-between text-[11px] font-body">
                   <span className="text-solar-text-dim">Est. Consumption</span>
                  <span className="font-semibold text-solar-purple">{item.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Step-by-Step Installation Roadmap */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-gold uppercase bg-solar-gold-10 px-3 py-1 rounded-full border border-solar-gold-20">
              Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text">
              RWA Solar Commissioning Roadmap
            </h2>
            <p className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto font-body leading-relaxed">
              We manage 100% of the timeline — from physical feasibility audits to structural certification and final subsidy credit.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div 
              className="hidden lg:block absolute top-1/2 left-4 right-4 h-[2px] -translate-y-1/2 pointer-events-none" 
              style={{ background: 'linear-gradient(90deg, rgba(var(--solar-purple-rgb), 0.1), rgba(var(--solar-purple-rgb), 0.3), rgba(var(--solar-purple-rgb), 0.1))' }}
            />

            <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
              {roadmapSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="relative p-5 rounded-2xl border border-solar-border bg-solar-card/40 backdrop-blur-md hover:border-solar-border-hover transition-colors space-y-3"
                >
                  <div 
                    className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-white font-heading font-bold text-[10px] tracking-wide"
                    style={{ backgroundColor: 'var(--solar-purple)' }}
                  >
                    STEP {step.step}
                  </div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-solar-text pt-2">{step.title}</h4>
                  <p className="text-xs text-solar-text-muted font-body leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Financing Comparison Matrix */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-purple uppercase bg-solar-purple-10 px-3 py-1 rounded-full border border-solar-purple-20">
              Financial Models
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text">
              Adoption Models Side-by-Side
            </h2>
            <p className="text-xs sm:text-sm text-solar-text-muted max-w-xl mx-auto font-body leading-relaxed">
               RWAs can choose from three structured models depending on capital availability and ROI goals.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-solar-border bg-solar-card/50 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-solar-border bg-solar-card/85 text-solar-text font-heading font-semibold">
                  <th className="p-4 sm:p-5">Parameter</th>
                  <th className="p-4 sm:p-5">CAPEX (Direct Purchase)</th>
                  <th className="p-4 sm:p-5">ZIP (Zero Upfront Loan)</th>
                  <th className="p-4 sm:p-5">OPEX / RESCO (PPA Model)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-solar-border/60 font-body text-solar-text-muted">
                {[
                  { param: 'Upfront Investment', capex: '100% Society Corpus', zip: '₹0 Upfront (100% Financed)', opex: '₹0 Upfront (Developer Owned)' },
                  { param: 'Ownership of Panels', capex: 'Society (from Day 1)', zip: 'Society (Hypothecated to Bank)', opex: 'Developer (Leased to RWA)' },
                  { param: 'Tariff Benefit', capex: '100% Free Solar Generation', zip: 'Free generation (minus EMI payout)', opex: '30–40% Discount on DISCOM rate' },
                  { param: 'Maintenance & Audits', capex: 'Society (AMC Packages)', zip: 'Society (Warranty coverage)', opex: '100% Developer Responsibility' },
                  { param: 'Payback / ROI', capex: 'Highest ROI (~4.5 Year Payback)', zip: 'Neutral flow (EMI < bill savings)', opex: 'No payback (Immediate discounts)' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-solar-card/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-solar-text">{row.param}</td>
                    <td className="p-4 sm:p-5 text-solar-gold font-semibold">{row.capex}</td>
                    <td className="p-4 sm:p-5 text-solar-purple font-semibold">{row.zip}</td>
                    <td className="p-4 sm:p-5 text-solar-emerald font-semibold">{row.opex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. RWA FAQ accordion list */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-gold uppercase bg-solar-gold-10 px-3 py-1 rounded-full border border-solar-gold-20">
              RWA FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
              RWA & Housing Society FAQ
            </h3>
            <p className="text-xs sm:text-sm text-solar-text-muted font-body max-w-lg mx-auto leading-relaxed">
              Answers to critical regulatory and spatial constraints regarding apartment solar deployment in Telangana.
            </p>
          </div>

          <div className="space-y-3">
            {rwaFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-solar-border bg-solar-card/30 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between text-solar-text hover:text-solar-gold transition-colors font-heading text-sm sm:text-base font-semibold"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-solar-text-muted border-t border-solar-border/40 font-body leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
