import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { generateSavingsData, formatCurrency } from '../lib/utils';
import {
  staggerContainer,
  fadeInUp,
  sectionViewport,
} from '../lib/animations';

// ===== DATA =====
const savingsData = generateSavingsData();

interface InvestmentBar {
  label: string;
  percentage: number;
  color: string;
  gradient: string;
}

const investmentBars: InvestmentBar[] = [
  {
    label: 'Solar (with subsidy)',
    percentage: 35,
    color: '#10B981',
    gradient: 'linear-gradient(90deg, #059669, #10B981)',
  },
  {
    label: 'Mutual Funds',
    percentage: 12,
    color: '#3B82F6',
    gradient: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
  },
  {
    label: 'Gold ETF',
    percentage: 10,
    color: '#D4A04A',
    gradient: 'linear-gradient(90deg, #D4A04A, #E8C468)',
  },
  {
    label: 'Fixed Deposit',
    percentage: 7,
    color: '#6B7280',
    gradient: 'linear-gradient(90deg, #6B7280, #9CA3AF)',
  },
];

// ===== CUSTOM TOOLTIP =====
interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="glass-card p-4 !rounded-xl border border-solar-emerald/30 min-w-[200px]">
      <p className="font-heading font-bold text-solar-emerald text-sm mb-2">
        Year {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-solar-text-muted text-xs">
              {entry.dataKey === 'flatRate' ? 'Current Rate' : 'Rising Tariff'}
            </span>
          </div>
          <span className="font-heading font-semibold text-solar-text text-xs">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

// ===== CUSTOM LEGEND =====
interface LegendPayloadItem {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendPayloadItem[];
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload) return null;

  const labelMap: Record<string, string> = {
    flatRate: 'At Current Rate',
    risingRate: 'With Rising Tariff',
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-4">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-solar-text-muted text-xs font-body">
            {labelMap[entry.value] || entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ===== ANIMATED BAR COMPONENT =====
const AnimatedBar = ({
  bar,
  index,
  isInView,
}: {
  bar: InvestmentBar;
  index: number;
  isInView: boolean;
}) => {
  const maxPercentage = 35; // Normalize against highest value

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-solar-text text-sm font-body font-medium">
          {bar.label}
        </span>
        <span
          className="font-heading font-bold text-sm"
          style={{ color: bar.color }}
        >
          {bar.percentage}% p.a.
        </span>
      </div>
      <div className="w-full h-8 rounded-full bg-white/5 overflow-hidden relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: bar.gradient }}
          initial={{ width: 0 }}
          animate={
            isInView
              ? { width: `${(bar.percentage / maxPercentage) * 100}%` }
              : { width: 0 }
          }
          transition={{
            duration: 1.2,
            delay: 0.2 + index * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// ===== MAIN COMPONENT =====
const SavingsChart = () => {
  const barsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barsRef, { once: false, amount: 0.3 });

  return (
    <section id="savings" className="relative bg-solar-bg overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(16,185,129,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="section-wrapper">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section-heading">
            See How Much You{' '}
            <span className="text-solar-gold">Save Over 25 Years</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="section-subheading mx-auto mt-4"
          >
            Real numbers based on Hyderabad solar irradiance and current
            electricity tariffs.
          </motion.p>
        </motion.div>

        {/* Two Chart Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          {/* ===== CHART A: Area Chart ===== */}
          <motion.div
            variants={fadeInUp}
            className="glass-card p-4 sm:p-6"
          >
            <h3 className="font-heading text-lg sm:text-xl font-bold text-solar-text mb-2">
              25-Year Cumulative Savings
            </h3>
            <p className="text-solar-text-muted text-xs sm:text-sm mb-6">
              3 kW system · Hyderabad irradiance
            </p>

            <div className="w-full h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={savingsData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34D399" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#34D399" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient
                      id="emeraldGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#059669" stopOpacity={0.4} />
                      <stop
                        offset="100%"
                        stopColor="#059669"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(245,166,35,0.08)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="year"
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(245,166,35,0.2)' }}
                    tickLine={{ stroke: 'rgba(245,166,35,0.2)' }}
                    label={{
                      value: 'Years',
                      position: 'insideBottomRight',
                      offset: -5,
                      fill: '#94A3B8',
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(245,166,35,0.2)' }}
                    tickLine={{ stroke: 'rgba(245,166,35,0.2)' }}
                    tickFormatter={(value: number) => formatCurrency(value)}
                    width={55}
                  />

                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: 'rgba(245,166,35,0.3)',
                      strokeWidth: 1,
                      strokeDasharray: '4 4',
                    }}
                  />

                  <Legend content={<CustomLegend />} />

                  <Area
                    type="monotone"
                    dataKey="flatRate"
                    name="flatRate"
                    stroke="#34D399"
                    strokeWidth={2}
                    fill="url(#goldGrad)"
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                  />

                  <Area
                    type="monotone"
                    dataKey="risingRate"
                    name="risingRate"
                    stroke="#059669"
                    strokeWidth={2}
                    fill="url(#emeraldGrad)"
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Caption */}
            <div className="mt-6 pt-4 border-t border-solar-border text-center">
              <p className="text-solar-gold font-heading font-semibold text-sm">
                ⚡ 3 kW system saves ₹3–12 lakh over 25 years!
              </p>
            </div>
          </motion.div>

          {/* ===== CHART B: Investment Comparison ===== */}
          <motion.div
            variants={fadeInUp}
            className="glass-card p-4 sm:p-6"
            ref={barsRef}
          >
            <h3 className="font-heading text-lg sm:text-xl font-bold text-solar-text mb-2">
              Annual Returns Comparison
            </h3>
            <p className="text-solar-text-muted text-xs sm:text-sm mb-8">
              Solar vs traditional investments
            </p>

            <div className="space-y-6">
              {investmentBars.map((bar, index) => (
                <AnimatedBar
                  key={bar.label}
                  bar={bar}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Solar advantage callout */}
            <div className="mt-8 p-4 rounded-xl bg-solar-gold/5 border border-solar-gold/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-heading font-bold text-solar-gold text-sm mb-1">
                    Solar delivers the best ROI of any investment in India.
                  </p>
                  <p className="text-solar-text-muted text-xs leading-relaxed">
                    After payback (3-5 years), your electricity is 100% free for
                    the next 20+ years — effectively a{' '}
                    <span className="text-solar-gold-bright font-semibold">
                      35%+ annualized return
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-6 pt-4 border-t border-solar-border text-center">
              <p className="text-solar-emerald font-heading font-semibold text-sm">
                📈 Solar delivers the best ROI of any investment in India.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SavingsChart;
