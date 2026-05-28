import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileText, CheckCircle2, ChevronDown, ChevronUp, Zap, HelpCircle } from 'lucide-react';
import { staggerContainer, sectionViewport } from '../lib/animations';

const sizingGrid = [
  { bill: 'Under ₹1,500', size: '1 kWp', area: '100 sq. ft.', units: '120 units', subsidy: '₹30,000' },
  { bill: '₹1,500 – ₹3,000', size: '2 kWp', area: '200 sq. ft.', units: '240 units', subsidy: '₹60,000' },
  { bill: '₹3,000 – ₹5,000', size: '3 kWp', area: '300 sq. ft.', units: '360 units', subsidy: '₹78,000' },
  { bill: '₹5,000 – ₹8,000', size: '5 kWp', area: '500 sq. ft.', units: '600 units', subsidy: '₹78,000 (Max Cap)' },
  { bill: 'Above ₹8,000', size: '8 – 10 kWp', area: '800 – 1000 sq. ft.', units: '960 – 1,200 units', subsidy: '₹78,000 (Max Cap)' }
];

const documents = [
  { title: 'Latest Electricity Bill', desc: 'Must be from TGSPDCL/TGNPDCL (within last 2 months), showing active domestic LT connection.' },
  { title: 'Aadhaar Card copy', desc: 'Must belong to the owner of the property. Aadhaar name must match the electricity bill name.' },
  { title: 'Registered Sale Deed', desc: 'Or ownership registry certificate proving legal title of the rooftop/house.' },
  { title: 'Paid Property Tax Receipt', desc: 'Copy of the most recent annual municipal property tax receipt paid to GHMC/municipality.' },
  { title: 'Passport-Sized Photos', desc: 'Two passport-size physical photographs for DISCOM Net-Metering agreements.' }
];

const residentialFaqs = [
  {
    q: 'How does the Gruha Jyothi scheme (free 200 units) affect my solar savings?',
    a: 'The Gruha Jyothi scheme applies only to households consuming under 200 units/month who hold a White Ration Card. If your household consumption exceeds 200 units even by a small margin, you are billed at telescopic rates (up to ₹10/unit). Installing solar is highly profitable for homes consuming over 200 units as it offsets your highest tariff slabs, bringing you back down into the lowest-rate bracket or zero-bill zone.'
  },
  {
    q: 'Can a 3 kWp residential solar system run a 1.5-ton inverter AC?',
    a: 'Yes. A 3 kWp system produces around 12–14 units of electricity daily during peak sunlight hours. A 1.5-ton inverter air conditioner typically consumes about 1.0 to 1.5 kW of power. When running during the day, the solar energy directly powers your AC, and any shortfall is automatically drawn from the grid without interruption.'
  },
  {
    q: 'How long does the PM Surya Ghar subsidy transfer take to credit?',
    a: 'The central government subsidy (DBT) is credited directly to your Aadhaar-linked bank account within 30 days of net-meter commissioning. Once the net meter is integrated and the completion report is uploaded to the National Solar Portal, the approval process starts automatically.'
  },
  {
    q: 'Do I need to clean the solar panels? What is the maintenance?',
    a: 'Solar panels require simple cleaning with clean water every 12–15 days to remove dust (which can reduce efficiency by 5–15%). No heavy chemicals or scrubbers are needed. MyHome Solar offers annual maintenance packages covering deep cleaning, wiring checks, and inverter safety audits.'
  }
];

export default function ResidentialExtras() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative py-24 bg-solar-bg overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/[0.015] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/[0.015] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* 1. DeccanShield Leakage-Proof System Details */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block text-[10px] font-semibold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/10">
              Structural Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text leading-tight">
              DeccanShield™ Leakage-Proof{' '}
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Anchoring Process
              </span>
            </h2>
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
              Traditional solar installations rely on mechanical expansion anchor bolts that puncture your roof slab, fracturing the waterproofing layer and causing major water leakages during monsoons. 
            </p>
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
              MyHome Solar utilizes a zero-mechanical-puncture engineering standard:
            </p>
            <ul className="space-y-4">
              {[
                { title: 'Chemical Resins', desc: 'We drill shallow pilot holes and fill them with Hilti HIT-RE 500 chemical concrete resin, forming a waterproof molecular bond.' },
                { title: 'Raised Concrete Pedestals', desc: 'We cast elevated reinforced cement concrete (RCC) pedestals to lift the structures above rainwater levels.' },
                { title: 'Dual-Stage Waterproofing Seal', desc: 'Each anchoring node is coated with a dual-stage polyurethane sealant (Dr. Fixit Polyplus) to prevent any water seepage.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-solar-text font-heading">{item.title}</h4>
                    <p className="text-xs text-solar-text-muted font-body leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 solar-panel-card solar-panel-card-gold p-8 relative flex flex-col justify-center space-y-6"
          >
            <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
            <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
            <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
            <span className="solar-panel-card-corner solar-panel-card-corner-br" />
            
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-heading text-solar-text">
              Leakage-Free Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-solar-text-muted leading-relaxed font-body">
              We are so confident in our chemical anchoring waterproofing process that we back every residential installation with a physical **Leakage-Proof Warranty**. If any water leak is detected at our anchor points within 5 years, we repair the roof and compensate up to ₹1,00,000 for verified interior damages.
            </p>
            <div className="pt-4 border-t border-solar-border flex justify-between items-center text-xs">
              <span className="text-solar-text-dim uppercase tracking-wider font-semibold font-body">Guarantee Cap</span>
              <span className="font-bold text-amber-400 font-heading">₹1,00,000 Cash Cover</span>
            </div>
          </motion.div>
        </section>

        {/* 2. Sizing Guidelines & Documents Checklist */}
        <section className="grid lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Bill-to-System Sizing Matrix */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider font-body">
                <Zap className="w-3.5 h-3.5" /> Sizing Guideline
              </div>
              <h3 className="text-2xl font-bold font-heading text-solar-text">
                Rooftop Solar Sizing Matrix
              </h3>
              <p className="text-xs sm:text-sm text-solar-text-muted font-body leading-relaxed">
                Determine the approximate solar system capacity your home requires based on your average monthly TGSPDCL/TGNPDCL electricity bill.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-solar-border bg-solar-card/50 backdrop-blur-md">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-solar-border bg-solar-card/80 text-solar-text font-heading font-semibold">
                    <th className="p-4">Monthly Bill</th>
                    <th className="p-4">Solar Size</th>
                    <th className="p-4">Roof Area</th>
                    <th className="p-4">Est. Generation</th>
                    <th className="p-4">Govt. Subsidy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-solar-border/60 font-body text-solar-text-muted">
                  {sizingGrid.map((row, idx) => (
                    <tr key={idx} className="hover:bg-solar-card/30 transition-colors">
                      <td className="p-4 font-bold text-solar-text">{row.bill}</td>
                      <td className="p-4 text-amber-400 font-semibold">{row.size}</td>
                      <td className="p-4">{row.area}</td>
                      <td className="p-4">{row.units}</td>
                      <td className="p-4 text-emerald-400 font-semibold">{row.subsidy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Physical Documents Checklist */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wider font-body">
                <FileText className="w-3.5 h-3.5" /> Documentation
              </div>
              <h3 className="text-2xl font-bold font-heading text-solar-text">
                Net Metering Files Checklist
              </h3>
              <p className="text-xs sm:text-sm text-solar-text-muted font-body leading-relaxed">
                The following files are required for uploading to the National Solar Portal to process your grid connection and direct bank transfer subsidy.
              </p>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-solar-border/60 bg-solar-card/20 hover:border-solar-border transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-sky-400 font-heading font-bold text-sm shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-solar-text font-heading">{doc.title}</h4>
                    <p className="text-[11px] leading-relaxed text-solar-text-muted font-body">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3. Residential-Specific FAQs */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider font-body">
              <HelpCircle className="w-3.5 h-3.5" /> Knowledge Base
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
              Residential Solar FAQ
            </h3>
            <p className="text-xs sm:text-sm text-solar-text-muted font-body max-w-lg mx-auto leading-relaxed">
              Common questions Hyderabad homeowners ask when transitioning to grid-connected solar power.
            </p>
          </div>

          <div className="space-y-3">
            {residentialFaqs.map((faq, idx) => {
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
