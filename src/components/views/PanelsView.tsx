import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import ContactForm from '../ContactForm';

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

export default function PanelsView() {
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
              Tier-1 Panels
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
            >
              Hardware &{' '}
              <span className="text-solar-gold">
                Panels Database
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto font-body leading-relaxed"
            >
              Telangana's summer heat exceeding 43°C directly impacts panel output. Standard panels lose significant power under thermal stress. We exclusively install Tier-1 modules with industry-leading temperature coefficients and DCR compliance.
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
                src="/panels_tech.webp" 
                alt="Tier-1 Solar Panels Database"
                width="800"
                height="600"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-white/90 bg-gray-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-body">
                <span className="font-semibold">Tier-1 TOPCon Solar Cells</span>
                <span className="text-amber-400 font-bold">22.2%+ High Efficiency</span>
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
              Hardware Database
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-solar-text">
              Tier-1 Certified Solar Hardware
            </h3>
          </div>

          <div className="space-y-6 mt-8">
            <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body max-w-3xl">
              We verify and audit cell datasheets to ensure that your solar investment generates reliable electricity over its entire 25-year lifetime.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {panels.map((p) => (
                <div key={p.model} className="border border-solar-border rounded-2xl p-5 bg-solar-card-solid flex flex-col justify-between hover:border-sky-500/20 transition-all duration-300 group">
                  <div>
                    <h5 className="font-bold text-base font-heading text-solar-text group-hover:text-solar-gold transition-colors mb-1">{p.model}</h5>
                    <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/10 font-mono tracking-wider">{p.type}</span>
                    
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
        </motion.div>
      </section>

      {/* Lead Capture */}
      <ContactForm />
    </div>
  );
}
