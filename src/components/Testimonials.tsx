import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    location: 'Hayathnagar',
    quote:
      'MyHome Solar made the entire process seamless. From subsidy paperwork to installation, everything was handled professionally. My electricity bill went from ₹4,000 to almost zero!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    location: 'LB Nagar',
    quote:
      'I was skeptical about solar panels, but the team explained everything clearly. The subsidy of ₹78,000 was credited to my account within 30 days. Best investment ever!',
    rating: 5,
  },
  {
    name: 'Venkat Reddy',
    location: 'Uppal',
    quote:
      'Excellent service! They designed a 5kW system perfectly suited for my home. The net metering setup was done quickly. Highly recommend MyHome Solar.',
    rating: 5,
  },
  {
    name: 'Lakshmi Devi',
    location: 'Dilsukhnagar',
    quote:
      'The team was very helpful in explaining the PM Surya Ghar scheme. My 3kW system was installed in just 2 days. Very professional and reliable.',
    rating: 4,
  },
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

                <div className="relative z-10">
                  <StarRating rating={t.rating} />

                  <p className="text-solar-text-muted italic leading-relaxed mb-6 text-[15px]">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Avatar circle */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-cyan-500/20 flex items-center justify-center text-solar-text font-semibold text-sm font-heading border border-solar-border">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-solar-text font-semibold text-sm">
                        {t.name}
                      </p>
                      <p className="text-solar-text-dim text-xs">{t.location}</p>
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
