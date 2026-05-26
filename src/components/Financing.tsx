import { motion } from 'framer-motion';
import { Landmark, Calendar, Gift } from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  sectionViewport,
} from '../lib/animations';
import { scrollToSection } from '../lib/utils';

const financingOptions = [
  {
    icon: Landmark,
    iconColor: 'text-solar-gold',
    iconBg: 'bg-solar-gold/10',
    title: 'Bank Loan Available',
    points: [
      'Collateral-free solar loans from partner banks',
      'Attractive interest rates',
      'Flexible repayment terms',
    ],
    tag: 'Low Interest',
    tagStyle: 'bg-solar-emerald/15 text-solar-emerald border-solar-emerald/30',
    featured: false,
  },
  {
    icon: Calendar,
    iconColor: 'text-solar-emerald',
    iconBg: 'bg-solar-emerald/10',
    title: 'Zero / Low Cost EMI',
    points: [
      'Start solar for as low as ₹2,000/month',
      'Your EMI < Your current bill!',
      '0% EMI options available',
    ],
    tag: 'Most Popular',
    tagStyle: 'bg-solar-gold/15 text-solar-gold border-solar-gold/30',
    featured: true,
  },
  {
    icon: Gift,
    iconColor: 'text-solar-gold',
    iconBg: 'bg-solar-gold/10',
    title: 'Government Subsidy',
    points: [
      'Up to ₹78,000 subsidy',
      'Directly to your bank',
      'Within 30 days of inspection',
      'We handle all paperwork',
    ],
    tag: 'Up to ₹78K',
    tagStyle: 'bg-solar-gold/15 text-solar-gold border-solar-gold/30',
    featured: false,
  },
];

const Financing = () => {
  return (
    <section id="financing" className="relative bg-solar-bg overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 80%, rgba(16,185,129,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(52,211,153,0.05) 0%, transparent 50%)',
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
            Your Solar Journey, Your Way to Pay
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="section-subheading mx-auto mt-4"
          >
            Multiple financing options to make solar accessible for every
            household.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          {financingOptions.map((option) => (
            <motion.div
              key={option.title}
              variants={fadeInUp}
              className={`glass-card gold-glow-hover p-8 flex flex-col relative ${
                option.featured
                  ? 'border-t-2 border-t-solar-gold md:scale-105 md:-my-2 z-10'
                  : ''
              }`}
            >
              {/* Featured label */}
              {option.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-solar-gold to-solar-gold-bright text-solar-bg text-xs font-bold font-heading px-4 py-1 rounded-full shadow-lg shadow-solar-gold/20">
                    ★ MOST POPULAR
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`${option.iconBg} rounded-2xl p-4 mb-6 w-fit`}>
                <option.icon className={`w-8 h-8 card-icon ${option.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-solar-text mb-4">
                {option.title}
              </h3>

              {/* Points */}
              <ul className="space-y-3 flex-1 mb-6">
                {option.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-solar-text-muted text-sm leading-relaxed"
                  >
                    <span className="text-solar-emerald mt-0.5 shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Tag */}
              <div className="mt-auto">
                <span
                  className={`inline-block text-xs font-semibold font-heading px-3 py-1.5 rounded-full border ${option.tagStyle}`}
                >
                  {option.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={fadeInUp}
        >
          <button
            onClick={() => scrollToSection('subsidy')}
            className="outline-btn text-base px-8 py-3"
          >
            Calculate Your Savings →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Financing;
