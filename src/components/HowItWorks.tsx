import { motion } from 'framer-motion';
import {
  Phone,
  Search,
  ClipboardList,
  Hammer,
  CheckCircle,
} from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  sectionViewport,
} from '../lib/animations';

const steps = [
  {
    icon: Phone,
    title: 'Free Call & Consult',
    description: 'Share your electricity bill details. We assess your solar potential.',
  },
  {
    icon: Search,
    title: 'Site Visit & Survey',
    description: 'Our expert visits your rooftop. Shadow analysis, measurements, planning.',
  },
  {
    icon: ClipboardList,
    title: 'Custom Proposal',
    description: 'Detailed quote with system design, subsidy breakdown, and financing options.',
  },
  {
    icon: Hammer,
    title: 'Installation',
    description: 'Professional installation in 1–3 days. We handle all DISCOM approvals.',
  },
  {
    icon: CheckCircle,
    title: 'Subsidy Claimed',
    description: 'Net meter installed. Government subsidy credited to your bank in 30 days.',
  },
];

/* Connector line that animates from scale 0→1 */
const connectorLine = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: {
    scaleX: 1,
    scaleY: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

/* Step reveal — staggered fade-in-up */
const stepReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: 'easeOut' as const,
    },
  }),
};

export default function HowItWorks() {
  return (
    <section id="process" className="relative overflow-hidden" style={{ background: 'var(--solar-bg)' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-solar-gold/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-solar-emerald/[0.02] rounded-full blur-[80px]" />
      </div>

      <div className="section-wrapper relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="text-solar-gold font-body text-sm tracking-[0.2em] uppercase mb-4"
          >
            5-Step Solar Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="section-heading"
          >
            Your 5-Step Solar Journey
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="section-subheading mx-auto"
          >
            From first call to free electricity — we make it simple.
          </motion.p>
        </motion.div>

        {/* ========== DESKTOP TIMELINE (lg+) ========== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="hidden lg:flex items-start justify-between relative"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;

            return (
              <div key={step.title} className="relative flex flex-col items-center flex-1">
                {/* Step content */}
                <motion.div
                  custom={i}
                  variants={stepReveal}
                  className="flex flex-col items-center text-center"
                >
                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 z-20 w-6 h-6 rounded-full bg-solar-gold flex items-center justify-center">
                    <span className="text-[11px] font-heading font-bold text-solar-bg">
                      {i + 1}
                    </span>
                  </div>

                  {/* Icon circle */}
                  <div className="relative w-16 h-16 rounded-full bg-solar-gold/10 border border-solar-gold/30 flex items-center justify-center mb-5 group">
                    <Icon
                      className="w-7 h-7 text-solar-gold"
                      strokeWidth={1.5}
                    />
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-full border border-solar-gold/20 animate-ping opacity-0 group-hover:opacity-30" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg text-solar-text font-semibold mb-2 whitespace-nowrap">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-solar-text-muted text-sm leading-relaxed max-w-[180px]">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector line (horizontal) — between steps */}
                {!isLast && (
                  <motion.div
                    variants={connectorLine}
                    className="absolute top-8 left-[60%] right-[-40%] h-[2px] bg-gradient-to-r from-solar-gold/60 to-solar-gold/20 origin-left z-0"
                    style={{ originX: 0 }}
                  />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ========== MOBILE / TABLET TIMELINE (< lg) ========== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="lg:hidden relative pl-12 md:pl-16"
        >
          {/* Vertical golden line */}
          <motion.div
            variants={connectorLine}
            className="absolute left-5 md:left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-solar-gold/60 via-solar-gold/30 to-solar-gold/10 origin-top"
            style={{ originY: 0 }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  custom={i}
                  variants={stepReveal}
                  className="relative flex items-start gap-5"
                >
                  {/* Icon circle on the line */}
                  <div className="absolute -left-12 md:-left-16 flex items-center justify-center">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-solar-bg-light border border-solar-gold/30 flex items-center justify-center">
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6 text-solar-gold"
                        strokeWidth={1.5}
                      />
                      {/* Number badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-solar-gold flex items-center justify-center">
                        <span className="text-[10px] font-heading font-bold text-solar-bg">
                          {i + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="font-heading text-lg text-solar-text font-semibold mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-solar-text-muted text-sm leading-relaxed max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
