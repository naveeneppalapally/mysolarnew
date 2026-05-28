import { motion } from 'framer-motion';
import { Wind, Check, Award } from 'lucide-react';
import ContactForm from '../ContactForm';

export default function StructureView() {
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
              Structural Mounts
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
            >
              DeccanShield™{' '}
              <span className="text-solar-gold">
                WindPro Structure
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-solar-text-muted max-w-2xl font-body leading-relaxed"
            >
              Telangana's extreme summer temperatures and pre-monsoon squalls can damage standard light-gauge steel solar structures. To safeguard your investment, we engineer every structure to our rigid, heavy-duty DeccanShield™ specifications.
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
                src="/structure_tech.png" 
                alt="DeccanShield WindPro Structure"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-white/90 bg-gray-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-body">
                <span className="font-semibold">DeccanShield™ Steel Mount</span>
                <span className="text-amber-400 font-bold">160 km/h Wind Certified</span>
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
              Telangana Engineering Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
              High-Performance Structural Engineering
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mt-8">
            <div className="space-y-5">
              <h4 className="text-xl font-bold font-heading text-solar-text flex items-center gap-2">
                <Wind className="w-5 h-5 text-amber-400" />
                DeccanShield™ WindPro Mounts
              </h4>
              <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
                Our structural mount setups are specifically reinforced to withstand high-velocity tropical storms and extreme heat slabs common to Hyderabad and surrounding districts.
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
        </motion.div>
      </section>

      {/* Lead Capture */}
      <ContactForm />
    </div>
  );
}
