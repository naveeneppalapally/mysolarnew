import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  sectionViewport,
} from '../lib/animations';

const testimonials = [
  {
    stars: 5,
    quote:
      'Installed a 5 kW Waaree system. Bill dropped from ₹4,200 to under ₹300. Team handled all DISCOM paperwork and the subsidy was credited in 28 days. Very professional.',
    name: 'Suresh Reddy',
    location: 'Hayathnagar, Rangareddy',
    initials: 'SR',
  },
  {
    stars: 5,
    quote:
      'Got a 3 kW Tata Power Solar system. EMI is ₹2,800/month — less than my old electricity bill! MyHome Solar team did everything from survey to net meter setup.',
    name: 'Priya Sharma',
    location: 'Medchal, Hyderabad',
    initials: 'PS',
  },
  {
    stars: 5,
    quote:
      'PM Surya Ghar subsidy of ₹78,000 came in exactly 30 days. System generating 18–20 units/day. Best financial decision for my family. Highly recommend MyHome Solar.',
    name: 'Venkat Narayana',
    location: 'Mancherial, Telangana',
    initials: 'VN',
  },
];


const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll carousel on mobile
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let currentIndex = 0;
    const totalCards = testimonials.length;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      const cardWidth = container.scrollWidth / totalCards;
      container.scrollTo({
        left: cardWidth * currentIndex,
        behavior: 'smooth',
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative section-alt overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="section-wrapper">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section-heading">
            Trusted by 500+ Hyderabad Families
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="section-subheading mx-auto mt-4"
          >
            Real stories from real customers who went solar with us.
          </motion.p>
        </motion.div>

        {/* Desktop: 3-column grid — Mobile: horizontal scroll-snap carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>

          {/* Mobile carousel */}
          <div
            ref={scrollRef}
            className="md:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-2 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="snap-center flex-shrink-0"
                style={{ width: '85vw', maxWidth: '360px' }}
              >
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>

          {/* Mobile scroll indicators */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-solar-gold/30"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---- Testimonial Card ---- */
interface TestimonialCardProps {
  testimonial: {
    stars: number;
    quote: string;
    name: string;
    location: string;
    initials: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { stars, quote, name, location, initials } = testimonial;

  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-8 relative flex flex-col h-full"
    >
      {/* Decorative quote mark */}
      <Quote
        className="absolute top-5 left-6 w-10 h-10 text-solar-gold/20 rotate-180"
        strokeWidth={1.5}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-5 relative z-10">
        {Array.from({ length: stars }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-solar-gold fill-solar-gold"
          />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-solar-text italic leading-relaxed text-[15px] flex-1 relative z-10">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-solar-border/30 relative z-10">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-solar-bg shrink-0"
          style={{
            background: 'linear-gradient(135deg, #059669, #10B981)',
          }}
        >
          {initials}
        </div>
        <div>
          <p className="font-heading font-semibold text-solar-text text-sm">
            {name}
          </p>
          <p className="text-solar-text-muted text-xs">{location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
