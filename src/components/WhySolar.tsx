import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { TrendingDown, Leaf, Home, ShieldCheck } from 'lucide-react';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Slash Bills by 90%',
    description:
      'Dramatically reduce your monthly electricity bills. Most homeowners see savings from the very first month after installation.',
  },
  {
    icon: Leaf,
    title: 'Go Green',
    description:
      'A single rooftop system offsets over 50 tonnes of CO₂ in its lifetime — equivalent to planting 2,500 trees.',
  },
  {
    icon: Home,
    title: 'Increase Property Value',
    description:
      'Homes with solar installations sell for 4-6% more. It\'s an asset that appreciates while saving you money.',
  },
  {
    icon: ShieldCheck,
    title: '25-Year Warranty',
    description:
      'Tier-1 panels built to last. Rain, hail, or extreme heat — your investment is protected for over two decades.',
  },
];

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function WhySolar() {
  return (
    <section id="why-solar" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-amber-400 mb-4 font-body"
          >
            Why Solar
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-5 leading-tight"
          >
            The Smart Investment{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              That Pays You Back
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-solar-text-muted max-w-2xl mx-auto font-body"
          >
            Solar energy isn't just good for the planet — it's the smartest
            financial decision you'll make for your home. Here's why thousands
            across Telangana are making the switch.
          </motion.p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="group relative rounded-2xl p-6 sm:p-8 cursor-default
                         bg-gradient-to-br from-white/[0.04] to-white/[0.01]
                         border border-white/[0.06]
                         backdrop-blur-sm
                         transition-all duration-500
                         hover:border-amber-500/30
                         hover:shadow-[0_8px_40px_rgba(245,158,11,0.08),0_0_60px_rgba(245,158,11,0.04)]"
            >
              {/* Card glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-500/[0.04] to-transparent pointer-events-none" />

              <div className="relative flex items-start gap-5">
                {/* Icon */}
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 group-hover:border-amber-400/40 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-500">
                    <benefit.icon className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading group-hover:text-amber-50 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-solar-text-muted leading-relaxed font-body">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
