import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Landmark, Building2, IndianRupee, ArrowDown, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

/**
 * Hook: animated count-up from 0 to target value
 */
function useCountUp(target: number, duration = 2000, trigger = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) {
      const timer = setTimeout(() => {
        setValue(0);
      }, 0);
      return () => clearTimeout(timer);
    }

    let start = 0;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setValue(current);

      if (progress < 1) {
        start = requestAnimationFrame(animate);
      }
    }

    start = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(start);
  }, [target, duration, trigger]);

  return value;
}

function formatINR(amount: number): string {
  return amount.toLocaleString('en-IN');
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function SubsidySection() {
  const totalRef = useRef<HTMLDivElement>(null);
  const totalInView = useInView(totalRef, { once: false, amount: 0.5 });
  const totalValue = useCountUp(78000, 2000, totalInView);

  return (
    <section id="subsidy" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/[0.015] rounded-full blur-[100px]" />
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
            Government Subsidies
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-solar-text mb-5 leading-tight"
          >
            Save Up To{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              ₹78,000
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-solar-text-muted max-w-2xl mx-auto font-body"
          >
            Central government subsidies under PM Surya Ghar Muft Bijli Yojana make solar incredibly affordable. We handle all paperwork so you can claim your subsidy easily.
          </motion.p>
        </motion.div>

        {/* Two subsidy cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14"
        >
          {/* Card 1: Central Subsidy */}
          <motion.div
            custom={0}
            variants={cardVariants}
            className="group relative rounded-2xl overflow-hidden"
          >
            {/* Gold top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            <div className="solar-panel-card solar-panel-card-gold p-6 sm:p-8">
              {/* Corner brackets */}
              <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
              <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-br" />
              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20">
                  <Landmark className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-amber-400/80 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/15 font-body">
                  Central Govt
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-solar-text mb-2 font-heading">
                PM Surya Ghar Muft Bijli Yojana
              </h3>
              <p className="text-sm text-solar-text-muted mb-6 font-body">
                National subsidy scheme for residential rooftop solar systems
              </p>

              {/* Amount */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-solar-text-dim mb-1 font-body">
                  Subsidy up to
                </p>
                <p className="text-4xl sm:text-5xl font-bold font-heading bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  ₹78,000
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-solar-card border border-solar-border">
                  <span className="text-sm text-solar-text-muted font-body">
                    First 2 kW
                  </span>
                  <span className="text-sm font-semibold text-amber-300 font-body">
                    ₹30,000/kW
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-solar-card border border-solar-border">
                  <span className="text-sm text-solar-text-muted font-body">
                    2 kW – 3 kW
                  </span>
                  <span className="text-sm font-semibold text-amber-300 font-body">
                    ₹18,000/kW
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-solar-card border border-solar-border">
                  <span className="text-sm text-solar-text-muted font-body">
                    Above 3 kW
                  </span>
                  <span className="text-sm font-semibold text-amber-300 font-body">
                    Capped at ₹78,000
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: State Subsidy -> Replaced by Claim Process */}
          <motion.div
            custom={1}
            variants={cardVariants}
            className="group relative rounded-2xl overflow-hidden"
          >
            {/* Purple top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

            <div className="solar-panel-card solar-panel-card-indigo p-6 sm:p-8">
              {/* Corner brackets */}
              <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
              <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-br" />
              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20">
                  <Building2 className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-purple-400/80 bg-purple-400/10 px-3 py-1.5 rounded-full border border-purple-400/15 font-body">
                  Direct Credit
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-solar-text mb-2 font-heading">
                100% Direct Bank Transfer
              </h3>
              <p className="text-sm text-solar-text-muted mb-6 font-body">
                Subsidy is credited directly to your bank account, with zero dealer intervention
              </p>



              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-solar-card border border-solar-border">
                  <ArrowDown className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm text-solar-text-muted font-body">
                    Disbursed directly after net meter commissioning
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-solar-card border border-solar-border">
                  <IndianRupee className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm text-solar-text-muted font-body">
                    Aadhaar-linked Direct Benefit Transfer (DBT)
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-solar-card border border-solar-border">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-sm text-solar-text-muted font-body">
                    We handle 100% of the portal submissions & approvals
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Summary bar */}
        <motion.div
          ref={totalRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 p-px">
            <div className="w-full h-full rounded-2xl bg-solar-bg-secondary" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10 text-center">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-amber-500/[0.04] rounded-full blur-[80px]" />
            </div>

            <div className="relative">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-solar-text-dim mb-3 font-body">
                Maximum Direct Subsidy
              </p>
              <p className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent mb-4 tabular-nums">
                ₹{formatINR(totalValue)}
              </p>
              <p className="text-sm sm:text-base text-solar-text-muted max-w-lg mx-auto font-body">
                Subsidy credited directly to your bank account after
                system commissioning. We handle the entire claim process.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
