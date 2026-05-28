import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Gift, Wallet, PiggyBank, Clock, TrendingUp, Gauge, ArrowRight } from 'lucide-react';
import { calculateSubsidy } from '../lib/utils';

/* ─── Animated Number Counter ─── */
function AnimatedValue({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 250; // Snappy 250ms count-up/down
    const startVal = prevValueRef.current;
    const endVal = value;
    prevValueRef.current = value;

    if (startVal === endVal) {
      if (spanRef.current) {
        const num = decimals > 0 ? endVal.toFixed(decimals) : Math.round(endVal).toLocaleString('en-IN');
        spanRef.current.innerText = `${prefix}${num}${suffix}`;
      }
      return;
    }

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease out quad
      const easedProgress = progress * (2 - progress);
      const currentVal = startVal + (endVal - startVal) * easedProgress;

      if (spanRef.current) {
        const num = decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal).toLocaleString('en-IN');
        spanRef.current.innerText = `${prefix}${num}${suffix}`;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, prefix, suffix, decimals]);

  // Render initial value on mount
  const initialNum = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN');
  return <span ref={spanRef}>{`${prefix}${initialNum}${suffix}`}</span>;
}

/* ─── IndianRupee inline icon ─── */
function RupeeIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
      <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3c3.5 0 6-2.5 6-5H6" />
    </svg>
  );
}

/* ─── Result Card ─── */
interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  accent?: 'default' | 'gold' | 'cyan' | 'emerald' | 'indigo' | 'purple';
  hero?: boolean;
  delay?: number;
}

function ResultCard({ icon, label, value, accent = 'default', hero = false, delay = 0 }: CardProps) {
  const panelAccentClass = {
    default: 'solar-panel-card-gold',
    gold: 'solar-panel-card-gold',
    cyan: 'solar-panel-card-sky',
    indigo: 'solar-panel-card-sky',
    purple: 'solar-panel-card-sky',
    emerald: 'solar-panel-card-emerald',
  }[accent];

  const valueColor = {
    default: 'text-solar-text',
    gold: 'text-amber-400',
    cyan: 'text-blue-400',
    indigo: 'text-blue-400',
    purple: 'text-sky-400',
    emerald: 'text-emerald-400',
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`
        solar-panel-card ${panelAccentClass} p-5 cursor-default group
        ${hero ? 'md:col-span-1' : ''}
      `}
    >
      {/* Corner brackets */}
      <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
      <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
      <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
      <span className="solar-panel-card-corner solar-panel-card-corner-br" />

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <span className={`
          ${accent === 'gold' ? 'text-amber-500/70' :
            accent === 'cyan' ? 'text-cyan-500/70' :
            accent === 'emerald' ? 'text-emerald-500/70' :
            'text-solar-text-dim'}
        `}>
          {icon}
        </span>
        <span className="text-[11px] font-medium tracking-wider uppercase text-solar-text-muted font-body">
          {label}
        </span>
      </div>

      <div className={`font-heading font-bold leading-none relative z-10 ${valueColor} ${hero ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
        {value}
      </div>
    </motion.div>
  );
}

/* ─── Main SubsidyCalculator ─── */
export default function SubsidyCalculator() {
  const [bill, setBill] = useState(3000);
  const result = useMemo(() => calculateSubsidy(bill), [bill]);

  const sliderPercent = ((bill - 500) / (15000 - 500)) * 100;

  return (
    <section id="calculator" className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="section-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <span className="section-label inline-flex items-center gap-2" style={{ color: '#F59E0B' }}>
            <Zap className="w-3.5 h-3.5" />
            SAVINGS CALCULATOR
          </span>
          <h2 className="section-heading mt-2">See How Much You'll Save</h2>
        </motion.div>

        {/* Calculator Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-solar-border bg-solar-card backdrop-blur-xl overflow-hidden"
        >
          {/* Gold top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          {/* ─── Slider Area ─── */}
          <div className="px-6 sm:px-10 pt-10 pb-8 border-b border-solar-border">
            <p className="text-solar-text-muted text-sm font-body tracking-wide text-center mb-6">
              What's your monthly electricity bill?
            </p>

            {/* Big Bill Display */}
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <div className="font-heading font-extrabold text-5xl sm:text-7xl md:text-8xl text-amber-400 tabular-nums">
                <AnimatedValue value={bill} prefix="₹" />
              </div>
              <span className="text-solar-text-dim text-lg sm:text-xl font-body">/month</span>
            </div>

            {/* Custom Slider */}
            <div className="relative max-w-2xl mx-auto">
              {/* Track background */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-solar-border" />
              {/* Track fill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-75"
                style={{ width: `${sliderPercent}%` }}
              />
              {/* Glow on thumb position */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-500/30 blur-xl pointer-events-none transition-all duration-75"
                style={{ left: `calc(${sliderPercent}% - 24px)` }}
              />

              <input
                type="range"
                min={500}
                max={15000}
                step={100}
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="relative z-10 w-full h-2 appearance-none bg-transparent cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-amber-400
                  [&::-webkit-slider-thumb]:border-[3px]
                  [&::-webkit-slider-thumb]:border-gray-900
                  [&::-webkit-slider-thumb]:shadow-[0_0_16px_rgba(245,158,11,0.5)]
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:duration-150
                  [&::-webkit-slider-thumb]:hover:scale-125
                  [&::-moz-range-thumb]:w-6
                  [&::-moz-range-thumb]:h-6
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-amber-400
                  [&::-moz-range-thumb]:border-[3px]
                  [&::-moz-range-thumb]:border-gray-900
                  [&::-moz-range-thumb]:cursor-pointer
                "
              />
            </div>

            <div className="flex justify-between max-w-2xl mx-auto mt-3 text-xs text-solar-text-dim font-body">
              <span>₹500</span>
              <span>₹15,000</span>
            </div>
          </div>

          {/* ─── Results Dashboard ─── */}
          <div className="px-6 sm:px-10 py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <ResultCard
                icon={<Zap className="w-4 h-4" />}
                label="Recommended System"
                value={<><AnimatedValue value={result.systemSize} /> <span className="text-sm font-normal text-solar-text-dim">kW</span></>}
                delay={0}
              />
              <ResultCard
                icon={<RupeeIcon className="w-4 h-4" />}
                label="Total Cost"
                value={<AnimatedValue value={result.totalCost} prefix="₹" />}
                delay={0.05}
              />
              <ResultCard
                icon={<Gift className="w-4 h-4" />}
                label="Government Subsidy"
                value={<AnimatedValue value={result.totalSubsidy} prefix="₹" />}
                accent="emerald"
                delay={0.1}
              />
              <ResultCard
                icon={<Wallet className="w-4 h-4" />}
                label="You Pay Only"
                value={<AnimatedValue value={result.netCost} prefix="₹" />}
                accent="gold"
                hero
                delay={0.15}
              />
              <ResultCard
                icon={<PiggyBank className="w-4 h-4" />}
                label="Monthly Savings"
                value={<AnimatedValue value={Math.round(result.annualSavings / 12)} prefix="₹" />}
                delay={0.2}
              />
              <ResultCard
                icon={<Clock className="w-4 h-4" />}
                label="Payback Period"
                value={<><AnimatedValue value={result.paybackYears} decimals={1} /> <span className="text-sm font-normal text-solar-text-dim">Years</span></>}
                delay={0.25}
              />
              <ResultCard
                icon={<TrendingUp className="w-4 h-4" />}
                label="25-Year Savings"
                value={<AnimatedValue value={Math.round(result.savings25Year)} prefix="₹" />}
                accent="cyan"
                hero
                delay={0.3}
              />
              <ResultCard
                icon={<Gauge className="w-4 h-4" />}
                label="Monthly Generation"
                value={<><AnimatedValue value={result.monthlyGeneration} /> <span className="text-sm font-normal text-solar-text-dim">units</span></>}
                delay={0.35}
              />
            </div>
          </div>

          {/* ─── Bottom CTA ─── */}
          <div className="px-6 sm:px-10 pb-10 text-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="
                inline-flex items-center gap-2
                px-8 py-4 rounded-full
                bg-gradient-to-r from-amber-500 to-amber-400
                text-gray-950 font-heading font-bold text-base
                shadow-[0_0_30px_rgba(245,158,11,0.3)]
                hover:shadow-[0_0_50px_rgba(245,158,11,0.45)]
                transition-shadow duration-300
              "
            >
              Get Your Exact Quote
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <p className="mt-4 text-xs text-solar-text-dim font-body">
              Free consultation • No obligation • Subsidy assistance included
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
