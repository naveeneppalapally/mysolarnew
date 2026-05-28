import { motion } from 'framer-motion';
import TechnicalSpecsBlock from '../TechnicalSpecsBlock';
import ContactForm from '../ContactForm';

export default function TechnologyView() {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-solar-bg-secondary border-b border-solar-border">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-purple-400 mb-3 font-body"
          >
            Engineering & Hardware
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
          >
            Our Technology &{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Standards
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto mt-4 font-body leading-relaxed"
          >
            Discover the structural mounts, Tier-1 solar panels database, and the rigid installation standards we utilize to deliver high-performance solar assets across Telangana.
          </motion.p>
        </div>
      </section>

      {/* Main Technology Specifications Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <TechnicalSpecsBlock />
      </div>

      {/* Contact lead capture */}
      <ContactForm />
    </div>
  );
}
