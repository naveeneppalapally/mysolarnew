import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Award } from 'lucide-react';
import SubsidyCalculator from './SubsidyCalculator';
import {
  staggerContainer,
  fadeInUp,
  scaleIn,
  sectionViewport,
} from '../lib/animations';

/* ================================================================== */
/*  SubsidySection                                                     */
/* ================================================================== */
export default function SubsidySection() {
  return (
    <section id="subsidy" className="relative bg-solar-bg overflow-hidden">
      {/* Decorative top gradient divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-solar-gold/30 to-transparent" />

      <div className="section-wrapper">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="flex flex-col items-center"
        >
          {/* ---- Heading ---- */}
          <motion.h2 variants={fadeInUp} className="section-heading text-center">
            Get Up to <span className="text-solar-gold">₹78,000</span> in Central Subsidy
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subheading text-center mb-10">
            PM Surya Ghar Yojana — Central Government subsidy for rooftop solar.{' '}
            <strong className="text-solar-text">We handle 100% of the paperwork.</strong>
          </motion.p>

          {/* ---- Central subsidy breakdown ---- */}
          <motion.div
            variants={fadeInUp}
            className="w-full max-w-3xl glass-card border-l-4 border-l-solar-gold p-6 sm:p-8 mb-6"
          >
            <h3 className="font-heading font-bold text-lg sm:text-xl text-solar-text mb-5 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-solar-gold shrink-0" />
              Central Govt (PM Surya Ghar Yojana)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '1 kW System', value: '₹30,000' },
                { label: '2 kW System', value: '₹60,000' },
                { label: '3 kW System', value: '₹78,000' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="bg-solar-bg/60 rounded-xl px-4 py-4 text-center"
                >
                  <p className="text-solar-text-muted text-sm font-body mb-2">{row.label}</p>
                  <p className="font-heading font-bold text-xl text-solar-gold">{row.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---- Combined highlight ---- */}
          <motion.div
            variants={scaleIn}
            className="w-full max-w-3xl glass-card border border-solar-gold/40 p-5 sm:p-7 mb-6 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-solar-text-muted text-sm font-body mb-1 tracking-wide uppercase">
                Applicable for 3 kW system
              </p>
              <p className="font-heading font-bold text-2xl sm:text-3xl text-solar-text leading-tight">
                Max Subsidy:{' '}
                <span className="text-solar-gold-bright">₹78,000</span>
              </p>
              <p className="text-solar-text-muted text-sm mt-2 font-body">
                Credited directly to your bank within 30 days of DISCOM inspection
              </p>
            </div>
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-solar-gold/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* ---- Calculator ---- */}
          <div className="w-full max-w-4xl">
            <SubsidyCalculator />
          </div>

          {/* ---- Eligibility ---- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="w-full max-w-3xl mt-12"
          >
            <motion.h3
              variants={fadeInUp}
              className="font-heading font-bold text-xl sm:text-2xl text-solar-text mb-5 text-center"
            >
              Eligibility Criteria
            </motion.h3>

            <div className="flex flex-col gap-3">
              {[
                'Must use MNRE-approved, Made-in-India panels',
                'On-grid solar system only (not off-grid)',
                'Must install through TSREDCO/DISCOM empanelled vendor — that\'s us!',
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="flex items-start gap-3 bg-solar-bg-light/60 rounded-xl px-5 py-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-solar-emerald flex-shrink-0 mt-0.5" />
                  <p className="font-body text-base text-solar-text">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ---- Urgency note — tight margin ---- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="mt-6 max-w-2xl mx-auto flex items-start gap-3 bg-solar-gold/10 border border-solar-gold/25 rounded-xl px-5 py-4"
          >
            <AlertTriangle className="w-5 h-5 text-solar-gold flex-shrink-0 mt-0.5" />
            <p className="font-body text-sm text-solar-gold font-medium">
              Subsidy available while the PM Surya Ghar quota lasts — act{' '}
              <span className="font-bold">now</span> before spots run out!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
