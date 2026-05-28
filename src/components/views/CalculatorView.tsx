import { motion } from 'framer-motion';
import SubsidyCalculator from '../SubsidyCalculator';
import SavingsChart from '../SavingsChart';

export default function CalculatorView() {
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
            Interactive Solar Sizer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
          >
            Rooftop Cost & Savings{' '}
            <span className="text-solar-gold">
              Calculator
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-solar-text-muted max-w-2xl mx-auto mt-4 font-body leading-relaxed"
          >
            Compute your exact system size, direct central government subsidy, net cost, and cumulative 25-year returns based on TGSPDCL & TGNPDCL telescopic domestic billing.
          </motion.p>
        </div>
      </section>

      {/* Subsidy Calculator Component */}
      <SubsidyCalculator />

      {/* Savings Projection Chart */}
      <SavingsChart />
    </div>
  );
}
