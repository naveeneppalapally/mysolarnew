import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  specs: string;
  impact: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Srinivasa Rao (Retired Central Govt. Employee)',
    location: 'Phase 3, KPHB Colony, Kukatpally, Hyderabad',
    quote:
      'Our monthly household bills averaged ₹3,800 to ₹4,200 during summer heatwaves, driven by two 1.5-ton ACs. Since MyHome Solar handled our TGSPDCL connection paperwork and installed our 3 kW array, our bills dropped to the base fixed charges of ₹180 to ₹220. The government subsidy of ₹78,000 was credited directly to my bank account within 24 days. The DeccanShield structural wind anchors are robust and survived heavy pre-monsoon storm winds without a single vibration.',
    rating: 5,
    specs: '3 kW System — 6x Premier Energies 550W Mono-PERC + Solis S6 String Inverter',
    impact: 'Monthly Bill: ₹4,000 → ₹200 (₹78,000 Subsidy Credited)'
  },
  {
    name: 'Ananya Reddy (Software Architect)',
    location: 'Narsingi, Near Gachibowli ORR, Hyderabad',
    quote:
      'We wanted to transition to solar energy but were unwilling to lose our open terrace usability. MyHome Solar custom-engineered an elevated DeccanShield galvanized steel structure, raising the panels 9 feet above our terrace floor to preserve our patio space while positioning panels above the shadow of the overhead water tank. Our system now generates an average of 620 units per month, completely offsetting our Gachibowli villa bill and charging our EV overnight.',
    rating: 5,
    specs: '5 kW System (Elevated) — 9x Premier Energies NeoBlack 600W TOPCon Bifacial + Growatt MIN 5000TL-X',
    impact: 'Average Generation: 620 Units/Month (EV Charger Compatible)'
  },
  {
    name: 'Dr. K. Bhaskar (Medical Practitioner)',
    location: 'Hunter Road, Hanamkonda, Warangal District',
    quote:
      'My clinic and residence share a single three-phase commercial connection in Hanamkonda. Our monthly bill was touching ₹9,500 due to high air-conditioning loads during peak patient hours. MyHome Solar executed a detailed shadow analysis, and optimized the stringing configuration to ensure maximum output despite minor shadow casting from a neighboring building. Our monthly bills have plunged by 85%, and the excess generation credits are settled twice a year by TGNPDCL.',
    rating: 5,
    specs: '10 kW System — 18x Waaree Bi-550W Mono-PERC Bifacial + Sungrow 10kW Inverter',
    impact: 'Plunged Bills by 85% (Three-Phase Clinic Setup)'
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-transparent text-gray-600'
          }
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Decorative orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-amber-500/30 text-amber-400 bg-amber-500/5 mb-6 font-heading">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-solar-text mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Homeowners
            </span>
          </h2>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative h-full"
            >
              <div className="solar-panel-card solar-panel-card-gold p-8 h-full">
                {/* Corner brackets */}
                <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
                <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-br" />

                {/* Quote decoration */}
                <div className="absolute top-4 right-6 text-7xl leading-none font-serif text-amber-500/[0.07] select-none pointer-events-none">
                  "
                </div>

                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <StarRating rating={t.rating} />
                      <span className="text-[9px] uppercase font-bold tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/10 px-2 py-0.5 rounded font-mono">
                        {t.impact}
                      </span>
                    </div>

                    <p className="text-solar-text-muted italic leading-relaxed mb-6 text-[14px]">
                      "{t.quote}"
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-solar-gold mb-5 bg-amber-500/5 dark:bg-amber-500/[0.03] px-3 py-2 rounded border border-solar-border flex items-center gap-1.5">
                      <span className="text-solar-gold">⚙️</span> {t.specs}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Avatar circle */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-purple-500/20 flex items-center justify-center text-solar-text font-semibold text-sm font-heading border border-solar-border shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-solar-text font-bold text-sm">
                          {t.name}
                        </p>
                        <p className="text-solar-text-dim text-xs font-body">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
