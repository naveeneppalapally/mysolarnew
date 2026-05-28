import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Award } from 'lucide-react';
import ContactForm from '../ContactForm';

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

export default function StandardsView() {
  const [openStandardIndex, setOpenStandardIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-solar-bg-secondary border-b border-solar-border">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-7 space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 font-body"
            >
              Safety Guidelines
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
            >
              10-Point{' '}
              <span className="text-solar-gold">
                Technical Code
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto font-body leading-relaxed"
            >
              Safety and longevity are non-negotiable. Our engineering crews install residential and commercial systems strictly adhering to this comprehensive 10-Point Technical Code.
            </motion.p>
          </div>

          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            {/* Visual background glow */}
            <div className="absolute inset-0 bg-amber-500/10 rounded-3xl blur-2xl pointer-events-none scale-90" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden border border-solar-border/80 bg-solar-card shadow-card-lg max-w-md w-full"
            >
              <img 
                src="/standards_tech.webp" 
                alt="10-Point Technical Code Inverter Setup"
                width="800"
                height="600"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-white/90 bg-gray-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-body">
                <span className="font-semibold">Professional Inverter Setup</span>
                <span className="text-amber-400 font-bold">100% Code Compliant</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl border border-solar-border bg-solar-card backdrop-blur-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

          {/* Title */}
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-[10px] font-semibold tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/10 mb-3 font-body flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Engineering Code
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
              10-Point Installation Code of Conduct
            </h3>
          </div>

          <div className="space-y-4 mt-8">
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
        </motion.div>
      </section>

      {/* Lead Capture */}
      <ContactForm />
    </div>
  );
}
