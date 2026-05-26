import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Gift,
  Wallet,
  PiggyBank,
  Clock,
  TrendingUp,
  ArrowRight,
  IndianRupee,
} from 'lucide-react';
import { calculateSubsidy, scrollToSection } from '../lib/utils';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

/* ------------------------------------------------------------------ */
/*  Animated number display – uses Framer Motion spring for smoothness */
/* ------------------------------------------------------------------ */
function AnimatedValue({ value, prefix = '₹' }: { value: number; prefix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.4, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="inline-block"
    >
      {prefix}
      {value.toLocaleString('en-IN')}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Result card                                                        */
/* ------------------------------------------------------------------ */
interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  highlight?: 'gold' | 'emerald';
  large?: boolean;
}

function ResultCard({
  icon,
  label,
  value,
  prefix = '₹',
  suffix = '',
  highlight,
  large,
}: ResultCardProps) {
  const colorClass =
    highlight === 'gold'
      ? 'text-solar-gold-bright'
      : highlight === 'emerald'
        ? 'text-solar-emerald'
        : 'text-solar-text';

  return (
    <motion.div
      variants={fadeInUp}
      className={`glass-card gold-glow-hover p-3 sm:p-5 flex flex-col items-start gap-1.5 sm:gap-2 ${
        large ? 'col-span-2 sm:col-span-2 lg:col-span-1' : 'col-span-1'
      }`}
    >
      <div className="flex items-center gap-2 text-solar-text-muted text-sm font-body">
        {icon}
        <span>{label}</span>
      </div>
      <p className={`font-heading font-bold ${large ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} ${colorClass} tracking-tight`}>
        <AnimatedValue value={value} prefix={prefix} />
        {suffix && <span className="text-base font-normal ml-1">{suffix}</span>}
      </p>
    </motion.div>
  );
}

/* ================================================================== */
/*  SubsidyCalculator                                                  */
/* ================================================================== */
export default function SubsidyCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const result = useMemo(() => calculateSubsidy(monthlyBill), [monthlyBill]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      className="glass-card mt-16 border-t-2 border-solar-gold/60 p-6 sm:p-10"
    >
      {/* ---- Title ---- */}
      <motion.h3
        variants={fadeInUp}
        className="font-heading font-bold text-2xl sm:text-3xl text-solar-text mb-8 text-center"
      >
        🧮 Calculate Your Solar Savings
      </motion.h3>

      {/* ---- Slider section ---- */}
      <motion.div variants={fadeInUp} className="max-w-xl mx-auto mb-10">
        <label
          htmlFor="bill-slider"
          className="block font-body text-solar-text-muted text-center text-base sm:text-lg mb-6"
        >
          How much is your monthly electricity bill?
        </label>

        {/* Current value display */}
        <div className="text-center mb-5">
          <motion.span
            key={monthlyBill}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="inline-block font-heading font-bold text-4xl sm:text-5xl text-solar-gold-bright tracking-tight"
          >
            ₹{monthlyBill.toLocaleString('en-IN')}
            <span className="text-lg font-body font-normal text-solar-text-muted ml-1">
              /month
            </span>
          </motion.span>
        </div>

        {/* Range slider */}
        <input
          id="bill-slider"
          type="range"
          min={1000}
          max={10000}
          step={100}
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(Number(e.target.value))}
          className="gold-slider w-full"
        />
        <div className="flex justify-between text-xs text-solar-text-muted mt-2 font-body">
          <span>₹1,000</span>
          <span>₹10,000+</span>
        </div>
      </motion.div>

      {/* ---- Results grid ---- */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
      >
        <ResultCard
          icon={<Zap className="w-4 h-4 text-solar-gold" />}
          label="Recommended System"
          value={result.systemSize}
          prefix=""
          suffix="kW"
        />
        <ResultCard
          icon={<IndianRupee className="w-4 h-4 text-solar-gold" />}
          label="Estimated Total Cost"
          value={result.totalCost}
        />
        <ResultCard
          icon={<Gift className="w-4 h-4 text-solar-emerald" />}
          label="Your Subsidy"
          value={result.totalSubsidy}
          highlight="emerald"
        />
        <ResultCard
          icon={<PiggyBank className="w-4 h-4 text-solar-gold" />}
          label="Annual Savings"
          value={result.annualSavings}
        />
        <ResultCard
          icon={<Wallet className="w-4 h-4 text-solar-gold-bright" />}
          label="You Pay Only"
          value={result.netCost}
          highlight="gold"
          large
        />
        <ResultCard
          icon={<Clock className="w-4 h-4 text-solar-gold" />}
          label="Payback Period"
          value={result.paybackYears}
          prefix=""
          suffix="Years"
        />
        <ResultCard
          icon={<TrendingUp className="w-4 h-4 text-solar-emerald" />}
          label="25-Year Savings"
          value={Math.round(result.savings25Year)}
          highlight="emerald"
        />
      </motion.div>

      {/* ---- CTA ---- */}
      <motion.div variants={fadeInUp} className="mt-10 text-center">
        <button
          onClick={() => scrollToSection('contact')}
          className="shimmer-btn px-8 py-4 rounded-full text-base sm:text-lg inline-flex items-center gap-2"
        >
          Get Your Exact Quote
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-solar-text-muted text-sm font-body mt-4 max-w-md mx-auto">
          Subsidy credited directly to your bank in 30 days after DISCOM inspection.
        </p>
      </motion.div>
    </motion.div>
  );
}
