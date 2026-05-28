import { motion } from 'framer-motion';
import TelanganaPolicy from '../TelanganaPolicy';
import FarmersExtras from '../FarmersExtras';
import ContactForm from '../ContactForm';

export default function FarmersView() {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-solar-bg-secondary border-b border-solar-border">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-7 space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-emerald-500 font-body"
            >
              Agricultural Solar
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-solar-text leading-tight"
            >
              PM-KUSUM Scheme for{' '}
              <span className="text-solar-emerald">
                Farmers
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-solar-text-muted max-w-2xl font-body leading-relaxed"
            >
              Switch diesel and grid water pumps to clean solar power. Secure up to 60% capital subsidies or earn a stable long-term income by leasing fallow lands.
            </motion.p>
          </div>

          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            {/* Visual background glow */}
            <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-2xl pointer-events-none scale-90" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden border border-solar-border/80 bg-solar-card shadow-card-lg max-w-md w-full"
            >
              <img 
                src="/farmers_hero.png" 
                alt="Solar Powered Agriculture Pump"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-white/90 bg-gray-950/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-body">
                <span className="font-semibold">Subsidized Solar Ag Pump</span>
                <span className="text-emerald-400 font-bold">Up to 60% Subsidized</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farmers PM-KUSUM Content */}
      <TelanganaPolicy />

      {/* Farmers extras: pump splits, leasing income guide, agricultural FAQs */}
      <FarmersExtras />

      {/* Lead Capture Form */}
      <ContactForm />
    </div>
  );
}
