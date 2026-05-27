import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ClipboardCheck,
  PenTool,
  FileText,
  HardHat,
  Gauge,
  HeartHandshake,
} from 'lucide-react';
import { fadeInUp, staggerContainer, sectionViewport } from '../lib/animations';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Free Site Survey',
    description:
      'Our team visits your home for a free assessment — evaluating roof area, orientation, shading, and your energy consumption.',
  },
  {
    icon: PenTool,
    title: 'Custom System Design',
    description:
      'We design the optimal system for your roof layout and monthly usage, maximizing generation and ROI.',
  },
  {
    icon: FileText,
    title: 'Subsidy Paperwork',
    description:
      'We handle all PM Surya Ghar and TSREDCO subsidy applications, approvals, and documentation — zero hassle for you.',
  },
  {
    icon: HardHat,
    title: 'Professional Installation',
    description:
      'Certified technicians install your entire system in just 1-2 days with minimal disruption to your daily routine.',
  },
  {
    icon: Gauge,
    title: 'Net Metering Setup',
    description:
      'We coordinate with DISCOM for bidirectional meter installation so you can sell excess power back to the grid.',
  },
  {
    icon: HeartHandshake,
    title: 'Lifetime Support',
    description:
      '25-year warranty with annual maintenance included. Real-time monitoring and dedicated support whenever you need it.',
  },
];

function TimelineStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-4 sm:gap-6 lg:gap-8 ${
        /* On large screens, alternate: even = card on right, odd = card on left */
        ''
      }`}
    >
      {/* Desktop: Alternating layout */}
      {/* Left content area (desktop only) */}
      <div className="hidden lg:flex flex-1 justify-end">
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="max-w-md w-full"
          >
            <StepCard step={step} index={index} />
          </motion.div>
        )}
      </div>

      {/* Timeline line + circle */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Circle */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0.5, opacity: 0 }
          }
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative z-10"
        >
          {/* Pulse ring when in view */}
          {isInView && (
            <div className="absolute inset-0 rounded-full bg-amber-400/30 animate-pulse-ring" />
          )}
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm sm:text-base transition-all duration-700 ${
              isInView
                ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-gray-900 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                : 'timeline-inactive-node'
            }`}
          >
            {index + 1}
          </div>
        </motion.div>

        {/* Vertical line segment */}
        {index < steps.length - 1 && (
          <div className="w-px flex-1 min-h-[60px] relative">
            <div className="absolute inset-0 timeline-inactive-line" />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-amber-400/60 to-amber-500/20"
            />
          </div>
        )}
      </div>

      {/* Right content area (desktop) / Main content area (mobile) */}
      <div className="flex-1 pb-12 sm:pb-16 lg:pb-20">
        {/* Mobile + Tablet: Always show here */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <StepCard step={step} index={index} />
          </motion.div>
        </div>

        {/* Desktop: Show only for even steps */}
        <div className="hidden lg:block">
          {isEven && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="max-w-md"
            >
              <StepCard step={step} index={index} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  return (
    <div className="solar-panel-card solar-panel-card-gold p-5 sm:p-6 cursor-default group relative overflow-hidden">
      {/* Corner brackets */}
      <span className="solar-panel-card-corner solar-panel-card-corner-tl" />
      <span className="solar-panel-card-corner solar-panel-card-corner-tr" />
      <span className="solar-panel-card-corner solar-panel-card-corner-bl" />
      <span className="solar-panel-card-corner solar-panel-card-corner-br" />

      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-500/10 border border-amber-500/15">
          <step.icon className="w-4 h-4 text-amber-400" />
        </div>
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-400/60 font-body">
          Step {index + 1}
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-solar-text mb-2 font-heading relative z-10">
        {step.title}
      </h3>
      <p className="text-sm text-solar-text-muted leading-relaxed font-body relative z-10">
        {step.description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/[0.015] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-amber-400 mb-4 font-body"
          >
            The Process
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-solar-text mb-5 leading-tight"
          >
            How It{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-solar-text-muted max-w-2xl mx-auto font-body"
          >
            From inquiry to installation in as little as 7 days. Here's our
            streamlined process designed for zero hassle.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <TimelineStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
