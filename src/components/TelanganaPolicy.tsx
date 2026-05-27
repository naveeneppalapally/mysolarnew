import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Sun, Droplets, Zap, ArrowRight, Sprout } from 'lucide-react';

/* ─── PM-KUSUM Component Data ─── */
const components = [
  {
    badge: 'A',
    title: 'Decentralized Solar Power Plants',
    description: 'Set up solar power plants of up to 2 MW capacity on barren or fallow land. Sell surplus power to DISCOMs and earn guaranteed income for 25 years.',
    subsidy: 'Revenue model',
    icon: <Sun className="w-6 h-6" />,
    highlights: ['Up to 2 MW capacity', 'Barren / fallow land', '25-year PPA income'],
  },
  {
    badge: 'B',
    title: 'Standalone Solar Water Pumps',
    description: 'Replace diesel and electric pumps with standalone solar pumps up to 7.5 HP. Massive subsidy makes it almost free for small and marginal farmers.',
    subsidy: '60% Subsidy',
    icon: <Droplets className="w-6 h-6" />,
    highlights: ['Up to 7.5 HP capacity', '60% government subsidy', 'Zero electricity bills'],
  },
  {
    badge: 'C',
    title: 'Solarize Grid-Connected Pumps',
    description: 'Convert your existing grid-connected agricultural pump to solar. Use solar power for irrigation and sell surplus electricity back to the grid.',
    subsidy: '30% Subsidy',
    icon: <Zap className="w-6 h-6" />,
    highlights: ['30% central subsidy', 'Sell surplus to grid', 'Existing pump conversion'],
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.15 + i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function TelanganaPolicy() {
  return (
    <section id="kusum" className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="section-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="section-label inline-flex items-center gap-2" style={{ color: '#10B981' }}>
            <Sprout className="w-3.5 h-3.5" />
            FOR FARMERS
          </span>
          <h2 className="section-heading mt-2">PM-KUSUM: Solar for Agriculture</h2>
          <p className="section-subheading mx-auto mt-3">
            Special scheme for farmers to install solar pumps and earn from surplus energy
          </p>
        </motion.div>

        {/* Component Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {components.map((comp, i) => (
            <motion.div
              key={comp.badge}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              className="solar-panel-card solar-panel-card-emerald cursor-default group"
            >
              {/* Corner brackets */}
              <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
              <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
              <span className="solar-panel-card-corner solar-panel-card-corner-br" />
              {/* Green accent top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-6 sm:p-7">
                {/* Badge + Icon Row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-heading font-bold text-lg">
                    {comp.badge}
                  </div>
                  <span className="text-emerald-500/40 group-hover:text-emerald-400 transition-colors duration-300">
                    {comp.icon}
                  </span>
                </div>

                {/* Subsidy Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                  {comp.subsidy}
                </span>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-solar-text mb-3 leading-snug">
                  {comp.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-solar-text-muted font-body leading-relaxed mb-5">
                  {comp.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {comp.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-solar-text-muted font-body">
                      <span className="w-1 h-1 rounded-full bg-emerald-500/60 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
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
              bg-gradient-to-r from-emerald-600 to-emerald-500
              text-white font-heading font-bold text-base
              shadow-[0_0_30px_rgba(16,185,129,0.25)]
              hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]
              transition-shadow duration-300
            "
          >
            Talk to Our Agricultural Solar Expert
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
