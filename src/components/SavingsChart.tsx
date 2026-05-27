import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { generateSavingsData, formatCurrency } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

/* ─── Custom Tooltip Types ─── */
interface TooltipPayloadEntry {
  color?: string;
  name?: string;
  value?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string | number;
}

/* ─── Custom Tooltip ─── */
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-solar-border bg-solar-card-solid backdrop-blur-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-solar-text-dim font-body mb-2">Year {label}</p>
      {payload.map((entry: TooltipPayloadEntry, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm font-body">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-solar-text-muted">{entry.name}:</span>
          <span className="font-semibold text-solar-text">{formatCurrency(entry.value ?? 0)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Custom Legend Types ─── */
interface LegendPayloadEntry {
  color?: string;
  value?: string;
}

interface CustomLegendProps {
  payload?: LegendPayloadEntry[];
}

/* ─── Custom Legend ─── */
function CustomLegend({ payload }: CustomLegendProps) {
  if (!payload) return null;
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry: LegendPayloadEntry, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs font-body text-solar-text-muted">
          <span className="w-3 h-1 rounded-full" style={{ background: entry.color }} />
          {entry.value}
        </div>
      ))}
    </div>
  );
}

export default function SavingsChart() {
  const { theme } = useTheme();
  const data = useMemo(() => generateSavingsData(), []);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const totalSavings25 = data[data.length - 1]?.risingRate ?? 0;
  const totalSavingsLakhs = (totalSavings25 / 100000).toFixed(1);

  // Theme-specific colors
  const isLight = theme === 'light';
  const risingColor = isLight ? '#d97706' : '#FBBF24'; // Rich gold vs Champagne
  const flatColor = isLight ? '#ea580c' : '#F97316';   // Deep orange vs Bright orange

  return (
    <section id="savings-chart" className="relative section-alt overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="section-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <span className="section-label inline-flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            25-YEAR PROJECTION
          </span>
          <h2 className="section-heading mt-2">Your Solar Investment Over Time</h2>
        </motion.div>

        {/* Chart Container */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-solar-border bg-solar-card backdrop-blur-xl overflow-hidden"
        >
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

          <div className="px-4 sm:px-8 pt-8 pb-6">
            <div
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <ResponsiveContainer width="100%" height={380}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradRising" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={risingColor} stopOpacity={isLight ? 0.15 : 0.3} />
                      <stop offset="100%" stopColor={risingColor} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradFlat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={flatColor} stopOpacity={isLight ? 0.1 : 0.2} />
                      <stop offset="100%" stopColor={flatColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--solar-border)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="year"
                    tick={{ fill: 'var(--solar-text-dim)', fontSize: 11, fontFamily: 'DM Sans' }}
                    axisLine={{ stroke: 'var(--solar-border)' }}
                    tickLine={false}
                    interval={4}
                    label={{
                      value: 'Years',
                      position: 'insideBottomRight',
                      offset: -5,
                      style: { fill: 'var(--solar-text-dim)', fontSize: 10, fontFamily: 'DM Sans' },
                    }}
                  />
                  <YAxis
                    tick={{ fill: 'var(--solar-text-dim)', fontSize: 11, fontFamily: 'DM Sans' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`}
                    width={55}
                  />

                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />

                  <Area
                    type="monotone"
                    dataKey="risingRate"
                    name="With Solar (Savings)"
                    stroke={risingColor}
                    strokeWidth={2.5}
                    fill="url(#gradRising)"
                    dot={false}
                    activeDot={{ r: 5, fill: risingColor, stroke: isLight ? '#FFFFFF' : '#0A0A0A', strokeWidth: 2 }}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                  <Area
                    type="monotone"
                    dataKey="flatRate"
                    name="Without Solar (Rising Bills)"
                    stroke={flatColor}
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    fill="url(#gradFlat)"
                    dot={false}
                    activeDot={{ r: 4, fill: flatColor, stroke: isLight ? '#FFFFFF' : '#0A0A0A', strokeWidth: 2 }}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="border-t border-solar-border px-6 sm:px-10 py-8 text-center">
            <p className="text-sm text-solar-text-muted font-body mb-2">Total 25-Year Savings</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 120 }}
              className="font-heading font-extrabold text-4xl sm:text-5xl text-amber-400"
            >
              ₹{totalSavingsLakhs} Lakhs
            </motion.p>
            <p className="text-xs text-solar-text-dim font-body mt-2">
              Based on a 3 kW system with 5% annual tariff escalation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
