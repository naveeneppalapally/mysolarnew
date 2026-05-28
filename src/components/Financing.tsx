import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Landmark, CreditCard, BadgeCheck, ArrowRight, Percent, CalendarDays, ShieldCheck } from 'lucide-react';

/* ─── Financing Options Data ─── */
const options = [
  {
    title: 'Bank Loan',
    description: 'Finance your solar installation through partnered nationalized and private banks. Hassle-free processing with minimal documentation.',
    icon: <Landmark className="w-7 h-7" />,
    accent: 'amber' as const,
    stats: [
      { icon: <Percent className="w-3.5 h-3.5" />, label: 'Interest Rate', value: '7–8%' },
      { icon: <CalendarDays className="w-3.5 h-3.5" />, label: 'Tenure', value: '5–7 years' },
      { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: 'Financing', value: 'Up to 70%' },
    ],
  },
  {
    title: 'Zero-Cost EMI',
    description: 'Pay in easy monthly installments that are less than your current electricity bill. Start saving from day one with zero upfront investment.',
    icon: <CreditCard className="w-7 h-7" />,
    accent: 'sky' as const,
    stats: [
      { icon: <Percent className="w-3.5 h-3.5" />, label: 'Effective Rate', value: '0%' },
      { icon: <CalendarDays className="w-3.5 h-3.5" />, label: 'Duration', value: '12–24 mo' },
      { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: 'Down Payment', value: '₹0' },
    ],
  },
  {
    title: 'Outright Purchase',
    description: 'Pay upfront for the best value. Fastest payback period, maximum lifetime savings, and full ownership from day one.',
    icon: <BadgeCheck className="w-7 h-7" />,
    accent: 'emerald' as const,
    stats: [
      { icon: <Percent className="w-3.5 h-3.5" />, label: 'Best Value', value: 'Max ROI' },
      { icon: <CalendarDays className="w-3.5 h-3.5" />, label: 'Payback', value: '3–4 years' },
      { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: 'Savings', value: '₹20L+' },
    ],
  },
];

const accentMap = {
  amber: {
    border: 'border-solar-gold/20 hover:border-solar-gold/40',
    iconBg: 'bg-solar-gold-10',
    iconText: 'text-solar-gold',
    glow: 'group-hover:shadow-glow-gold',
    statBg: 'bg-solar-gold-6',
    statText: 'text-solar-gold',
    line: 'via-solar-gold',
    badge: 'bg-solar-gold-10 text-solar-gold border-solar-gold-20',
  },
  sky: {
    border: 'border-solar-purple-20 hover:border-solar-purple-40',
    iconBg: 'bg-solar-purple-10',
    iconText: 'text-solar-purple',
    glow: 'group-hover:shadow-glow-purple',
    statBg: 'bg-solar-purple-6',
    statText: 'text-solar-purple',
    line: 'via-solar-purple',
    badge: 'bg-solar-purple-10 text-solar-purple border-solar-purple-20',
  },
  emerald: {
    border: 'border-solar-emerald-20 hover:border-solar-emerald-40',
    iconBg: 'bg-solar-emerald-10',
    iconText: 'text-solar-emerald',
    glow: 'group-hover:shadow-glow-purple',
    statBg: 'bg-solar-emerald-6',
    statText: 'text-solar-emerald',
    line: 'via-solar-emerald',
    badge: 'bg-solar-emerald-10 text-solar-emerald border-solar-emerald-20',
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.12 + i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Financing() {
  return (
    <section id="financing" className="relative section-alt overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-sky-500/[0.02] blur-[100px] pointer-events-none" />

      <div className="section-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="section-label inline-flex items-center gap-2" style={{ color: '#F59E0B' }}>
            <CreditCard className="w-3.5 h-3.5" />
            EASY FINANCING
          </span>
          <h2 className="section-heading mt-2">Zero Upfront Cost Options</h2>
          <p className="section-subheading mx-auto mt-3">
            Make solar affordable with bank loans and EMI plans
          </p>
        </motion.div>

        {/* Financing Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {options.map((opt, i) => {
            const a = accentMap[opt.accent];
            const panelAccentClass = 
              opt.accent === 'amber' ? 'solar-panel-card-gold' :
              opt.accent === 'sky' ? 'solar-panel-card-sky' :
              'solar-panel-card-emerald';

            return (
              <motion.div
                key={opt.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={cardVariants}
                className={`solar-panel-card ${panelAccentClass} cursor-default group`}
              >
                {/* Corner brackets */}
                <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
                <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
                <span className="solar-panel-card-corner solar-panel-card-corner-br" />
                {/* Accent top line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${a.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="p-6 sm:p-7">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${a.iconBg} ${a.iconText} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    {opt.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-solar-text mb-3">
                    {opt.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-solar-text-muted font-body leading-relaxed mb-6">
                    {opt.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2.5">
                    {opt.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 ${a.statBg}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`${a.statText} opacity-50`}>{stat.icon}</span>
                          <span className="text-xs text-solar-text-muted font-body">{stat.label}</span>
                        </div>
                        <span className={`text-sm font-heading font-bold ${a.statText}`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="
              inline-flex items-center gap-2
              px-8 py-4 rounded-full
              text-gray-950 font-heading font-bold text-base
              shadow-[0_0_20px_rgba(245,158,11,0.2)]
              hover:bg-solar-gold-bright
              transition-colors duration-300
            "
            style={{ backgroundColor: 'var(--solar-gold)' }}
          >
            Explore Financing Options
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="mt-4 text-xs text-solar-text-dim font-body">
            We'll help you find the best payment plan for your budget
          </p>
        </motion.div>
      </div>
    </section>
  );
}
