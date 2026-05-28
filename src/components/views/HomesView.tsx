import { motion } from 'framer-motion';
import WhySolar from '../WhySolar';
import HowItWorks from '../HowItWorks';
import ResidentialExtras from '../ResidentialExtras';
import ContactForm from '../ContactForm';

export default function HomesView() {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-solar-bg-secondary border-b border-solar-border">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-7 space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 font-body"
            >
              Residential Solar Guide
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
            >
              Solar for Homes &{' '}
              <span className="text-solar-gold">
                Villas
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-solar-text-muted max-w-2xl font-body leading-relaxed"
            >
              Slash your monthly electricity bills by up to 90% with our high-efficiency solar setups. We manage everything from feasibility tests to the direct central subsidy credit.
            </motion.p>
          </div>

          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            {/* Visual background glow */}
            <div className="absolute inset-0 bg-amber-500/10 rounded-3xl blur-2xl pointer-events-none scale-90" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden border border-solar-border/80 bg-solar-card shadow-card-lg max-w-md w-full"
            >
              <img 
                src="/residential_hero.png" 
                alt="Solar Powered Modern Villa"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-white/90 bg-gray-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-body">
                <span className="font-semibold">Premium Residential System</span>
                <span className="text-amber-400 font-bold">1kW – 10kWp Sizing</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Solar Component (Features specs drawer, panels specs, DeccanShield windPro specs) */}
      <WhySolar />

      {/* How It Works Component (Features 6-step net metering timeline) */}
      <HowItWorks />

      {/* Information dense tables, leakage anchoring guarantee and checklists */}
      <ResidentialExtras />

      {/* Document checklist & Contact form */}
      <ContactForm />
    </div>
  );
}
