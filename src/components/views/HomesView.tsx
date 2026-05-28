import { motion } from 'framer-motion';
import WhySolar from '../WhySolar';
import HowItWorks from '../HowItWorks';
import ContactForm from '../ContactForm';

export default function HomesView() {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-solar-bg-secondary border-b border-solar-border">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 mb-3 font-body"
          >
            Residential Solar Guide
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
          >
            Solar for Homes &{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Villas
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto mt-4 font-body leading-relaxed"
          >
            Slash your monthly electricity bills by up to 90% with our high-efficiency solar setups. We manage everything from feasibility tests to the direct central subsidy credit.
          </motion.p>
        </div>
      </section>

      {/* Why Solar Component (Features specs drawer, panels specs, DeccanShield windPro specs) */}
      <WhySolar />

      {/* How It Works Component (Features 6-step net metering timeline) */}
      <HowItWorks />

      {/* Document checklist & Contact form */}
      <ContactForm />
    </div>
  );
}
