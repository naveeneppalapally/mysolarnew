import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Calculator, CheckCircle2 } from 'lucide-react';
import { staggerContainer, sectionViewport } from '../lib/animations';

const regulatoryGrid = [
  {
    parameter: 'Maximum System Size',
    net: 'Up to 500 kWp (or 80% of sanctioned load)',
    gross: 'Up to 1 MWp (1,000 kWp)'
  },
  {
    parameter: 'Connection Connection',
    net: 'Single bi-directional meter (LT or HT)',
    gross: 'Two independent meters (Import & Export)',
    isPurple: true
  },
  {
    parameter: 'Financial Credit Value',
    net: 'Saves full retail slab rate (e.g. ₹9.50 – ₹11.50/unit)',
    gross: 'Fixed feed-in tariff (TSERC APPC ~₹4.00 – ₹4.30/unit)'
  },
  {
    parameter: 'Ideal Consumer Profile',
    net: 'Factories, offices, and hotels with high daytime load',
    gross: 'Warehouses or leasing models with low power usage',
    isPurple: true
  }
];

const ceigChecklist = [
  { title: 'Chartered Structural Load Certificate', desc: 'Required for all systems. Certifies structure stability under cyclone-grade wind speeds up to 160 km/h.' },
  { title: 'CEIG Clearance (>56 kWp)', desc: 'Mandatory safety check by the Chief Electrical Inspector to the Government of Telangana before grid synchronization.' },
  { title: 'Bi-directional Meter Calibration', desc: 'Meter testing and certificate verification at the TGSPDCL/TGNPDCL laboratory prior to installation.' },
  { title: 'Earth Fault & Surge Relays', desc: 'Grid protection relays configured to isolate solar arrays immediately during utility lines maintenance.' }
];

const businessFaqs = [
  {
    q: 'How does the 40% Accelerated Depreciation tax benefit work in India?',
    a: 'Under Section 32 of the Income Tax Act, businesses can claim a 40% depreciation allowance on solar assets in the first financial year of commissioning. For a 100 kWp system costing ₹40 Lakhs, the business can write off ₹16 Lakhs in Year 1. Assuming a standard corporate tax slab of 25.17%, this yields a direct tax saving of ₹4.02 Lakhs, effectively reducing the net project cost.'
  },
  {
    q: 'What happens to our surplus solar power exported during company weekends?',
    a: 'For Net Metered C&I consumers, excess electricity exported on weekends is accumulated as credit units in your DISCOM ledger. These credit units are adjusted against your electricity bill consumption in the next billing cycle. At the end of the settlement year (typically March 31st), any unadjusted credit units are paid out by the DISCOM at the average power purchase rate.'
  },
  {
    q: 'Is a CEIG inspection safety approval required for systems under 50 kWp?',
    a: 'No. Systems up to 56 kWp (under LT connection limits) do not require a physical inspection from the CEIG (Chief Electrical Inspector to the Government). They only require a self-declaration completion report submitted by an authorized A-grade electrical contractor (which MyHome Solar manages).'
  },
  {
    q: 'Are there any cross-subsidy surcharges or banking charges for commercial rooftop solar?',
    a: 'Under the active TSERC guidelines, grid-connected rooftop solar installations using Net or Gross Metering are 100% exempt from cross-subsidy surcharges, wheeling charges, transmission charges, and banking fees, making rooftop systems highly profitable compared to open-access models.'
  }
];

export default function CommercialSolarExtras() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative py-24 bg-solar-bg overflow-hidden border-t border-solar-border">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-solar-emerald opacity-[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-solar-gold opacity-[0.015] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* 1. Net vs Gross Metering Grid */}
        <section className="space-y-8 w-full overflow-hidden">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-emerald uppercase bg-solar-emerald-10 px-3 py-1 rounded-full border border-solar-emerald-20">
              Billing Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text">
              Net Metering vs Gross Metering Comparison
            </h2>
            <p className="text-xs sm:text-sm text-solar-text-muted max-w-xl mx-auto font-body leading-relaxed">
              Understand the core commercial grid integration options available under active TSERC guidelines.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-solar-border bg-solar-card/50 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-solar-border bg-solar-card/85 text-solar-text font-heading font-semibold">
                  <th className="p-4 sm:p-5">Parameter</th>
                  <th className="p-4 sm:p-5">TSERC Net Metering Mode</th>
                  <th className="p-4 sm:p-5">TSERC Gross Metering Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-solar-border/60 font-body text-solar-text-muted">
                {regulatoryGrid.map((row, idx) => (
                  <tr key={idx} className="hover:bg-solar-card/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-solar-text">{row.parameter}</td>
                    <td className="p-4 sm:p-5 text-solar-gold font-semibold">{row.net}</td>
                    <td className="p-4 sm:p-5 text-solar-emerald font-semibold">{row.gross}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Tax Depreciation Calculation */}
        <section className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 solar-panel-card solar-panel-card-emerald p-8 relative flex flex-col justify-center space-y-6"
          >
            <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
            <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
            <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
            <span className="solar-panel-card-corner solar-panel-card-corner-br" />

            <div className="w-14 h-14 rounded-2xl bg-solar-emerald-10 flex items-center justify-center border border-solar-emerald-20 text-solar-emerald">
              <Calculator className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-heading text-solar-text">
              Corporate Tax Depreciation Saving Example
            </h3>
            
            <div className="space-y-3 font-body text-xs text-solar-text-muted">
              <div className="flex justify-between border-b border-solar-border/50 pb-2">
                <span>System Size / Project Cost</span>
                <span className="font-bold text-solar-text">100 kWp / ₹40,00,000</span>
              </div>
              <div className="flex justify-between border-b border-solar-border/50 pb-2">
                <span>Year 1 Accelerated Depreciation (40%)</span>
                <span className="font-semibold text-solar-gold">₹16,00,000 write-off</span>
              </div>
              <div className="flex justify-between border-b border-solar-border/50 pb-2">
                <span>Effective Tax Saving (at 25.17% slab)</span>
                <span className="font-bold text-solar-emerald">₹4,02,720 Cash Saved</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Adjusted Net Project Cost</span>
                <span className="font-bold text-solar-text">₹35,97,280</span>
              </div>
            </div>
            
            <p className="text-[10px] text-solar-text-dim font-body leading-relaxed">
              *Disclaimer: Calculation is for reference. Please consult your chartered accountant (CA) to confirm applicability.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-gold uppercase bg-solar-gold-10 px-3 py-1 rounded-full border border-solar-gold-20 font-body">
              Tax Optimization
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text leading-tight">
              40% Accelerated Depreciation{' '}
              <span className="text-solar-gold">
                Tax Write-Off
              </span>
            </h2>
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
              Solar plants qualify as energy-saving equipment under the Indian Income Tax Act. Companies can offset up to 40% of the capital investment in solar machinery during the first year of operation.
            </p>
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
              This tax write-off dramatically shortens the investment payback window, transferring corporate tax liabilities directly into corporate solar equity asset gains.
            </p>
          </motion.div>
        </section>

        {/* 3. CEIG Checklist */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-purple uppercase bg-solar-purple-10 px-3 py-1 rounded-full border border-solar-purple-20">
              Regulatory Approval
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text">
              CEIG & Grid Approval Roadmap
            </h2>
            <p className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto font-body leading-relaxed">
              We manage all complex technical approvals. Systems above 56 kWp require physical safety clearances from the Chief Electrical Inspector to the Government (CEIG).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ceigChecklist.map((item, idx) => (
              <div 
                key={idx}
                className="flex gap-4 p-5 rounded-2xl border border-solar-border/60 bg-solar-card/25 hover:border-solar-border transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-solar-emerald shrink-0 mt-1" />
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-solar-text">{item.title}</h4>
                  <p className="text-xs text-solar-text-muted font-body leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Commercial FAQs */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/10">
              Business FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
              Commercial Solar FAQ
            </h3>
            <p className="text-xs sm:text-sm text-solar-text-muted font-body max-w-lg mx-auto leading-relaxed">
              Answers to critical technical, financial, and regulatory questions regarding commercial installations in Telangana.
            </p>
          </div>

          <div className="space-y-3">
            {businessFaqs.map((faq, idx) => {
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
                        <div className="p-5 pt-4 text-xs sm:text-sm text-solar-text-muted border-t border-solar-border/40 font-body leading-relaxed">
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
