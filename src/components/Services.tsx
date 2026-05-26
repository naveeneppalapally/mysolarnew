import { motion } from 'framer-motion';
import {
  Sun,
  Wrench,
  Droplets,
  Shield,
  Battery,
  FileText,
} from 'lucide-react';
import {
  staggerContainer,
  fadeInUp,
  sectionViewport,
} from '../lib/animations';

const services = [
  {
    icon: Sun,
    title: 'Residential Solar EPC',
    description:
      'On-grid & off-grid system design, supply, and installation for homes of all sizes.',
  },
  {
    icon: Wrench,
    title: 'Solar O&M Services',
    description:
      'Annual maintenance contracts, performance monitoring, cleaning, and repairs.',
  },
  {
    icon: Droplets,
    title: 'Solar Water Heaters',
    description:
      'Slash your geyser electricity bill by 80%. Residential & commercial solutions.',
  },
  {
    icon: Shield,
    title: 'Solar Fencing & CAMS',
    description:
      'Agricultural solar fencing and solar-powered security cameras for farms.',
  },
  {
    icon: Battery,
    title: 'Battery Storage Solutions',
    description:
      'Hybrid systems with lithium-ion backup. Never face power cuts again.',
  },
  {
    icon: FileText,
    title: 'Net Metering Guidance',
    description:
      'Full assistance with DISCOM paperwork, approvals, and net meter setup.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative section-alt overflow-hidden">
      {/* Subtle background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-solar-gold/[0.03] rounded-full blur-[120px]" />
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
            Complete Solar Solutions
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="section-heading"
          >
            Everything Solar, Under One Roof
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="section-subheading mx-auto"
          >
            From installation to maintenance, we handle your complete solar journey.
          </motion.p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="glass-card p-8 gold-glow-hover tilt-card group"
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-xl bg-solar-gold/10 border border-solar-gold/20 flex items-center justify-center group-hover:bg-solar-gold/15 transition-colors duration-300">
                    <Icon
                      className="w-7 h-7 text-solar-gold card-icon group-hover:text-solar-gold-bright transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Decorative glow behind icon */}
                  <div className="absolute -inset-2 bg-solar-gold/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl text-solar-text font-semibold mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-solar-text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
