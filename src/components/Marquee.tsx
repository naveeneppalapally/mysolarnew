import { motion } from 'framer-motion';
import { sectionViewport } from '../lib/animations';

const trustItems = [
  'TSREDCO Empanelled',
  'MNRE Vendor ID: TSRE260875',
  'TGSPDCL & TGNPDCL Approved',
  'PM Surya Ghar Registered',
  '15+ Completed Projects',
  '70+ kW Capacity Installed',
  '25 Year Warranty',
  '₹78,000 Max Subsidy',
];

function MarqueeRow({
  direction = 'left',
}: {
  direction?: 'left' | 'right';
}) {
  // Duplicate items 4x for seamless loop
  const items = [...trustItems, ...trustItems, ...trustItems, ...trustItems];
  const animationClass =
    direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div className="flex overflow-hidden">
      <div className={`flex shrink-0 ${animationClass}`}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-amber-200/70 whitespace-nowrap px-2 sm:px-4 font-body">
              {item}
            </span>
            <span className="text-amber-400/50 text-xs mx-1 sm:mx-3 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]">
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={sectionViewport}
      transition={{ duration: 0.8 }}
      className="relative w-full overflow-hidden py-5 sm:py-6"
      style={{
        background:
          'linear-gradient(180deg, rgba(245,158,11,0.03) 0%, rgba(15,18,28,1) 15%, rgba(15,18,28,1) 85%, rgba(245,158,11,0.03) 100%)',
      }}
    >
      {/* Top border line with gold gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Bottom border line with gold gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-16 bg-amber-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-16 bg-amber-500/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Row 1 - Scrolls left */}
      <div className="mb-3">
        <MarqueeRow direction="left" />
      </div>

      {/* Row 2 - Scrolls right */}
      <div>
        <MarqueeRow direction="right" />
      </div>
    </motion.section>
  );
}
