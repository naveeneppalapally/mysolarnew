import { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { generateSavingsData, formatCurrency } from '../lib/utils';

/* ─── Custom Tooltip ─── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-gray-950/90 backdrop-blur-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-white/40 font-body mb-2">Year {label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm font-body">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-white/60">{entry.name}:</span>
          <span className="font-semibold text-white">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Custom Legend ─── */
function CustomLegend({ payload }: any) {
  if (!payload) return null;
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs font-body text-white/50">
          <span className="w-3 h-1 rounded-full" style={{ background: entry.color }} />
          {entry.value}
        </div>
      ))}
    </div>
  );
}

export default function SavingsChart() {
  const data = useMemo(() => generateSavingsData(), []);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const totalSavings25 = data[data.length - 1]?.risingRate ?? 0;
  const totalSavingsLakhs = (totalSavings25 / 100000).toFixed(1);

  return (
    <section id="savings-chart" className="relative section-alt overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="section-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <span className="section-label inline-flex items-center gap-2" style={{ color: '#06B6D4' }}>
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
          className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden"
        >
          {/* Cyan top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

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
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradFlat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="year"
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Sans' }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                    tickLine={false}
                    interval={4}
                    label={{
                      value: 'Years',
                      position: 'insideBottomRight',
                      offset: -5,
                      style: { fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontFamily: 'DM Sans' },
                    }}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'DM Sans' }}
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
                    stroke="#FBBF24"
                    strokeWidth={2.5}
                    fill="url(#gradRising)"
                    dot={false}
                    activeDot={{ r: 5, fill: '#FBBF24', stroke: '#0A0A0A', strokeWidth: 2 }}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                  <Area
                    type="monotone"
                    dataKey="flatRate"
                    name="Without Solar (Rising Bills)"
                    stroke="#F97316"
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    fill="url(#gradFlat)"
                    dot={false}
                    activeDot={{ r: 4, fill: '#F97316', stroke: '#0A0A0A', strokeWidth: 2 }}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="border-t border-white/[0.06] px-6 sm:px-10 py-8 text-center">
            <p className="text-sm text-white/40 font-body mb-2">Total 25-Year Savings</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 120 }}
              className="font-heading font-extrabold text-4xl sm:text-5xl text-amber-400"
            >
              ₹{totalSavingsLakhs} Lakhs
            </motion.p>
            <p className="text-xs text-white/25 font-body mt-2">
              Based on a 3 kW system with 5% annual tariff escalation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
