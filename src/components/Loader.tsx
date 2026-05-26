import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================================
   SPARKLE PARTICLE
   ============================================ */
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  angle: number;
  distance: number;
}

function generateSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 10,
    y: 50 + (Math.random() - 0.5) * 10,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 2,
    angle: Math.random() * 360,
    distance: 60 + Math.random() * 80,
  }));
}

/* ============================================
   ANIMATED SUN SVG
   ============================================ */
function AnimatedSun() {
  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
      {/* Outermost glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.05) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Concentric ring 1 — outermost */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '-8px',
          border: '1px solid rgba(245,158,11,0.12)',
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Concentric ring 2 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '6px',
          border: '1px solid rgba(251,191,36,0.18)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Concentric ring 3 — rotating */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '18px',
          border: '1.5px solid transparent',
          borderTopColor: '#F59E0B',
          borderRightColor: 'rgba(251,191,36,0.4)',
        }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{
          scale: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.8, delay: 0.5 },
          rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Concentric ring 4 — counter-rotating */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '30px',
          border: '1px solid transparent',
          borderBottomColor: '#FBBF24',
          borderLeftColor: 'rgba(245,158,11,0.3)',
        }}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: -360 }}
        transition={{
          scale: { duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.7, delay: 0.65 },
          rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* Radiating rays */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: '2px',
            height: '16px',
            marginLeft: '-1px',
            marginTop: '-8px',
            background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? '#F59E0B' : '#FBBF24'})`,
            transformOrigin: `center ${i % 3 === 0 ? '58px' : '52px'}`,
            transform: `rotate(${i * 30}deg)`,
            borderRadius: '1px',
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0.15, 0.85, 0.15],
            scaleY: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6 + i * 0.08,
          }}
        />
      ))}

      {/* Inner glow core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '42px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(251,191,36,0.08) 60%, transparent 100%)',
          border: '1px solid rgba(245,158,11,0.15)',
        }}
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center sun SVG icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 16px rgba(245,158,11,0.7))' }}
          animate={{ scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="12" cy="12" r="4" fill="rgba(251,191,36,0.3)" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

/* ============================================
   TYPEWRITER TEXT
   ============================================ */
const brandText = 'MYHOME SOLAR';

function TypewriterText() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setVisibleCount(count);
        if (count >= brandText.length) {
          clearInterval(interval);
        }
      }, 85);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.25em] select-none">
      {brandText.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={i < visibleCount ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-block',
            background: char === ' ' ? 'none' : 'linear-gradient(135deg, #F59E0B, #FBBF24, #F97316)',
            WebkitBackgroundClip: char === ' ' ? undefined : 'text',
            WebkitTextFillColor: char === ' ' ? undefined : 'transparent',
            minWidth: char === ' ' ? '0.5em' : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
      {/* Blinking cursor */}
      <motion.span
        className="inline-block w-[2px] h-[1em] ml-1 align-middle"
        style={{ background: '#F59E0B' }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: (t) => Math.round(t) }}
      />
    </h1>
  );
}

/* ============================================
   LOADER COMPONENT
   ============================================ */
interface LoaderProps {
  isVisible?: boolean;
}

const Loader = ({ isVisible }: LoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sparkles] = useState(() => generateSparkles(24));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress
    const startTime = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - pct) * (1 - pct);
      setProgress(Math.round(eased * 100));
      if (pct < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const getSparklePosition = useCallback((sparkle: Sparkle) => {
    const rad = (sparkle.angle * Math.PI) / 180;
    return {
      x: `calc(${sparkle.x}% + ${Math.cos(rad) * sparkle.distance}px)`,
      y: `calc(${sparkle.y}% + ${Math.sin(rad) * sparkle.distance}px)`,
    };
  }, []);

  return (
    <AnimatePresence>
      {(isVisible !== undefined ? isVisible : isLoading) && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#030712' }}
        >
          {/* Deep ambient glow */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[150px]"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(251,191,36,0.1) 40%, transparent 70%)',
            }}
          />

          {/* Secondary ambient */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[100px] translate-y-12"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 60%)',
            }}
          />

          {/* Sparkle particles */}
          {sparkles.map((sparkle) => {
            const pos = getSparklePosition(sparkle);
            return (
              <motion.div
                key={sparkle.id}
                className="absolute rounded-full"
                style={{
                  width: sparkle.size,
                  height: sparkle.size,
                  left: pos.x,
                  top: pos.y,
                  background: sparkle.id % 3 === 0 ? '#F59E0B' : sparkle.id % 3 === 1 ? '#FBBF24' : '#F97316',
                  boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.id % 3 === 0 ? 'rgba(245,158,11,0.6)' : 'rgba(251,191,36,0.5)'}`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: sparkle.duration,
                  repeat: Infinity,
                  delay: sparkle.delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}

          {/* Sun animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <AnimatedSun />
          </motion.div>

          {/* Brand text with typewriter */}
          <TypewriterText />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="font-body text-[11px] sm:text-xs tracking-[0.35em] uppercase mt-3"
            style={{ color: '#64748B' }}
          >
            Hyderabad's Solar Experts
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-14 sm:bottom-16 w-48 sm:w-56 flex flex-col items-center gap-3">
            {/* Percentage text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-xs tracking-[0.2em]"
              style={{ color: 'rgba(245,158,11,0.5)' }}
            >
              {progress}%
            </motion.span>

            {/* Bar track */}
            <div
              className="w-full h-[2px] rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #F59E0B, #FBBF24, #F97316)',
                  boxShadow: '0 0 12px rgba(245,158,11,0.5)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
