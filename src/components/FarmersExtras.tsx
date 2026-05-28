import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandPlot, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { staggerContainer, sectionViewport } from '../lib/animations';

const pumpSubsidyGrid = [
  {
    hp: '3 HP DC Surface / Submersible',
    cost: '₹1,80,000',
    subsidy: '₹1,08,000 (60%)',
    farmer: '₹72,000',
    depth: 'Up to 200 feet'
  },
  {
    hp: '5 HP DC Submersible',
    cost: '₹2,60,000',
    subsidy: '₹1,56,000 (60%)',
    farmer: '₹1,04,000',
    depth: '200 to 350 feet',
    isEmerald: true
  },
  {
    hp: '7.5 HP DC Submersible',
    cost: '₹3,50,000',
    subsidy: '₹2,10,000 (60%)',
    farmer: '₹1,40,000',
    depth: '350 to 500 feet'
  }
];

const checklist = [
  { title: 'Pattadar Passbook (Land Title)', desc: 'Proof of agriculture land ownership in Telangana. Joint holdings require NOCs from other co-owners.' },
  { title: 'Aadhaar Card & Bank Passbook', desc: 'Aadhaar-linked active bank account to process subsidies and direct payouts.' },
  { title: 'Borewell / Openwell Certificate', desc: 'Certification from local authorities confirming active groundwater source existence on site.' },
  { title: 'Caste Certificate (If Applicable)', desc: 'SC/ST category farmers qualify for additional state top-up incentives, reducing their contribution.' }
];

const farmerFaqs = [
  {
    q: 'Who is eligible to apply for the 60% solar water pump subsidy in Telangana?',
    a: 'Any farmer holding cultivable agricultural land with a valid water source (borewell, open well, or farm pond) is eligible to apply. Small and marginal farmers, SC/ST categories, and farmers in non-electrified areas receive highest priority in matching DISCOM quotas.'
  },
  {
    q: 'How does the land leasing income model (Component A) work?',
    a: 'Under PM-KUSUM Component A, farmers can lease their barren or uncultivable land to developers for setting up solar plants (500 kW to 2 MW). The developer pays the farmer an annual lease rental (typically ₹30,000 to ₹40,000 per acre) with a 5% compounding annual increase, backed by a 25-year PPA signed with the state DISCOM.'
  },
  {
    q: 'Can we run the solar agricultural pump during the night?',
    a: 'No. Standalone solar water pumps (Component B) do not use expensive battery banks due to high operational costs. They run directly on solar DC power during daytime sunlight hours. Water is pumped into elevated storage tanks during the day for nighttime irrigation.'
  },
  {
    q: 'What is the warranty coverage on KUSUM solar pump systems?',
    a: 'The PM-KUSUM scheme mandates a 5-year comprehensive system warranty. This covers the solar PV modules, the solar pump motor, and the electronic controller. Solar panels carry an additional 25-year performance warranty.'
  }
];

export default function FarmersExtras() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative py-24 bg-solar-bg overflow-hidden border-t border-solar-border">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-solar-emerald opacity-[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-solar-gold opacity-[0.015] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* 1. KUSUM Pump Subsidy Matrix */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-emerald uppercase bg-solar-emerald-10 px-3 py-1 rounded-full border border-solar-emerald-20">
              Pump Subsidies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text">
              Standalone Solar Pump Subsidy Splits
            </h2>
            <p className="text-xs sm:text-sm text-solar-text-muted max-w-xl mx-auto font-body leading-relaxed">
              Under PM-KUSUM Component B, farmers pay only 40% of the total system cost, with the central and state governments co-funding the remaining 60%.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-solar-border bg-solar-card/50 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-solar-border bg-solar-card/85 text-solar-text font-heading font-semibold">
                  <th className="p-4 sm:p-5">Pump Capacity</th>
                  <th className="p-4 sm:p-5">Est. Total Cost</th>
                  <th className="p-4 sm:p-5">Govt. Subsidy (60%)</th>
                  <th className="p-4 sm:p-5">Farmer Contribution (40%)</th>
                  <th className="p-4 sm:p-5">Ideal Borewell Depth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-solar-border/60 font-body text-solar-text-muted">
                {pumpSubsidyGrid.map((row, idx) => (
                  <tr key={idx} className="hover:bg-solar-card/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-solar-text">{row.hp}</td>
                    <td className="p-4 sm:p-5 font-semibold">{row.cost}</td>
                    <td className="p-4 sm:p-5 text-solar-emerald font-semibold">{row.subsidy}</td>
                    <td className="p-4 sm:p-5 text-solar-gold font-bold">{row.farmer}</td>
                    <td className="p-4 sm:p-5">{row.depth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Land Leasing Details (Component A) */}
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
              <LandPlot className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-heading text-solar-text">
              Barren Land Lease Revenue Model
            </h3>
            
            <div className="space-y-3 font-body text-xs text-solar-text-muted">
              <div className="flex justify-between border-b border-solar-border/50 pb-2">
                <span>Lease Payout (Per Acre)</span>
                <span className="font-bold text-solar-text">₹30,000 – ₹40,000 / Year</span>
              </div>
              <div className="flex justify-between border-b border-solar-border/50 pb-2">
                <span>PPA Agreement Tenure</span>
                <span className="font-semibold text-solar-emerald">25 Years Secure</span>
              </div>
              <div className="flex justify-between border-b border-solar-border/50 pb-2">
                <span>Compounding Escalation</span>
                <span className="font-bold text-solar-gold">5% Annual Increase</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Required Plot Size</span>
                <span className="font-bold text-solar-text">Minimum 2 Acres</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-6"
          >
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-emerald uppercase bg-solar-emerald-10 px-3 py-1 rounded-full border border-solar-emerald-20 font-body">
              Fallow Land Leasing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text leading-tight">
              Earn Stable Income by Leasing{' '}
              <span className="text-solar-emerald">
                Barren Land
              </span>
            </h2>
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
              Under PM-KUSUM Component A, farmers holding uncultivable, dry, or barren land near local sub-stations can lease their acreage to solar power developers.
            </p>
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
              This guarantees a steady, risk-free annual income source for 25 years. MyHome Solar coordinates with regional developers and manages grid integration logistics.
            </p>
          </motion.div>
        </section>

        {/* 3. Checklist of Documents */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-emerald uppercase bg-solar-emerald-10 px-3 py-1 rounded-full border border-solar-emerald-20">
              Checklist
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-solar-text">
              PM-KUSUM Document Requirements
            </h2>
            <p className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto font-body leading-relaxed">
              Telangana farmers must present the following legal documents to regional DISCOM offices to apply for KUSUM solar pump allocations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {checklist.map((item, idx) => (
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

        {/* 4. Farmers FAQs */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold tracking-widest text-solar-emerald uppercase bg-solar-emerald-10 px-3 py-1 rounded-full border border-solar-emerald-20">
              Farmers FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
              Agricultural Solar FAQ
            </h3>
            <p className="text-xs sm:text-sm text-solar-text-muted font-body max-w-lg mx-auto leading-relaxed">
              Answers to common operational and eligibility queries about rural solar programs in Telangana.
            </p>
          </div>

          <div className="space-y-3">
            {farmerFaqs.map((faq, idx) => {
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
