import { motion } from 'framer-motion';
import { Gauge, Home, Tractor } from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  sectionViewport,
} from '../lib/animations';

interface PolicyCard {
  icon: React.ElementType;
  title: string;
  points: string[];
  highlight: string;
}

const policyCards: PolicyCard[] = [
  {
    icon: Gauge,
    title: 'Net Metering (TGERC 2025)',
    points: [
      'Residential consumers can install up to 500 kW under net metering',
      'Excess power fed to grid earns you credits',
      'No cross-subsidy or wheeling charges',
    ],
    highlight: 'Earn from your rooftop!',
  },
  {
    icon: Home,
    title: 'PM Surya Ghar Yojana',
    points: [
      'Goal: 1 crore homes solarized by 2027',
      'Only ~10 lakh done so far — massive opportunity',
      'Subsidy credited to bank within 30 days',
    ],
    highlight: 'Target will be met → subsidy may stop. Act NOW.',
  },
  {
    icon: Tractor,
    title: 'PM-KUSUM for Farmers',
    points: [
      '60% Low-Cost EMI Loan (30% Central + 30% State)',
      'Farmers contribute only 40%, loans reduce share to 10%',
      'Solar plants + standalone pumps + solarized grid pumps',
    ],
    highlight: 'Steady income via surplus power sales',
  },
];

const TelanganaPolicy = () => {
  return (
    <section id="policy" className="relative section-alt overflow-hidden">
      {/* Subtle amber radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(245,166,35,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(16,185,129,0.04) 0%, transparent 50%)',
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
            Telangana Solar Policy 2025 —{' '}
            <span className="text-solar-gold">What You Must Know</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="section-subheading mx-auto mt-4"
          >
            Important regulations and schemes that benefit Telangana homeowners.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          {policyCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              className="glass-card gold-glow-hover border-l-4 border-solar-gold p-8 flex flex-col"
            >
              {/* Icon */}
              <div className="bg-solar-gold/10 rounded-2xl p-4 mb-6 w-fit">
                <card.icon className="w-8 h-8 text-solar-gold card-icon" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-solar-text mb-5">
                {card.title}
              </h3>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-6 flex-1">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-solar-gold shrink-0" />
                    <span className="text-solar-text-muted text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Highlight */}
              <div className="mt-auto pt-4 border-t border-solar-border">
                <p className="text-solar-gold font-heading font-semibold text-sm flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  {card.highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Urgency Callout */}
        <motion.div
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={fadeInUp}
        >
          <div className="relative rounded-2xl border-2 border-solar-gold/40 bg-solar-gold/5 p-6 md:p-8 text-center overflow-hidden">
            {/* Animated glow border */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <p className="font-heading text-lg md:text-xl font-bold text-solar-gold mb-2">
                ⏰ Subsidy Window Is Closing Fast
              </p>
              <p className="text-solar-text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                The PM Surya Ghar Yojana targets 1 crore homes — once achieved,
                subsidies will likely be discontinued. Telangana's net metering
                regulations are among the most favorable in India right now. Lock
                in your benefits before policies tighten.
              </p>
              <p className="mt-4 font-heading font-bold text-solar-gold-bright text-base md:text-lg">
                Don't wait. Go solar today — save lakhs over 25 years.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TelanganaPolicy;
