import { motion } from 'framer-motion';
import CommercialSolar from '../CommercialSolar';

export default function CommercialView() {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-solar-bg-secondary border-b border-solar-border">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 mb-3 font-body"
          >
            C&I Solar Solutions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
          >
            Commercial &{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Industrial Solar
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto mt-4 font-body leading-relaxed"
          >
            Lower your operational margins under the TSERC 2025 policy framework. Bank energy without charges, claim accelerated tax depreciation, and secure fast capital return.
          </motion.p>
        </div>
      </section>

      {/* Commercial Solar Content */}
      <CommercialSolar />
    </div>
  );
}
