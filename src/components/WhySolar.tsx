import { motion } from 'framer-motion';
import { TrendingUp, Leaf, BarChart3 } from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  sectionViewport,
} from '../lib/animations';

const cards = [
  {
    icon: TrendingUp,
    iconColor: '#EF4444',
    iconBg: 'rgba(239,68,68,0.08)',
    title: 'Bills Rising 10% Every Year',
    description:
      'In 25 years, you\'ll pay ₹15–20 lakh in electricity bills. Solar costs ₹1.5–2.5 lakh (after subsidy). Forever free electricity.',
  },
  {
    icon: Leaf,
    iconColor: 'var(--solar-emerald)',
    iconBg: 'rgba(5,150,105,0.08)',
    title: 'Clean Energy. Zero Guilt.',
    description:
      '1 kW solar = 1.5 metric tons CO₂ saved/year = planting 22 trees. 5 kW system = 110 trees planted every year!',
  },
  {
    icon: BarChart3,
    iconColor: '#F5A623',
    iconBg: 'rgba(245,166,35,0.08)',
    title: 'Best ROI in India',
    description:
      'Solar delivers 30%+ annual return — beats FDs, gold, mutual funds. Payback period: just 3–5 years. Generates for 25+ years.',
  },
];

const WhySolar = () => {
  return (
    <section id="why-solar" className="relative section-alt overflow-hidden">
      <div className="section-wrapper">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="section-label">Why Solar?</motion.p>
          <motion.h2 variants={fadeInUp} className="section-heading">
            Stop Paying. Start Earning.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="section-subheading mx-auto"
          >
            Your electricity bill is a sinking investment. Solar turns your roof
            into a power plant.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              className="glass-card gold-glow-hover p-7 flex flex-col items-start"
            >
              {/* Icon */}
              <div
                className="rounded-xl p-3.5 mb-5"
                style={{ background: card.iconBg }}
              >
                <card.icon className="w-6 h-6 card-icon" style={{ color: card.iconColor }} />
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-bold text-solar-text mb-2">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-solar-text-muted text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhySolar;
