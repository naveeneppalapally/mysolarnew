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
function AnimatedSun({ moonOffset, showDiamond }: { moonOffset: number; showDiamond: boolean }) {
  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
      {/* Outer Corona Glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.8) 0%, rgba(251,191,36,0.3) 50%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Sun Core */}
      <div 
        className="absolute w-[100px] h-[100px] rounded-full border border-amber-400 bg-amber-500/10"
        style={{
          boxShadow: '0 0 45px rgba(245, 158, 11, 0.65), inset 0 0 25px rgba(251, 191, 36, 0.4)',
        }}
      />

      {/* Corona rays */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[130px] bg-gradient-to-t from-transparent via-amber-400/25 to-transparent"
          style={{
            transform: `rotate(${i * 45}deg)`,
          }}
        />
      ))}

      {/* Moon */}
      <div
        className="absolute w-[98px] h-[98px] rounded-full bg-[#030712] border border-white/5"
        style={{
          transform: `translateX(${moonOffset}%)`,
          boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.8)',
        }}
      />

      {/* Diamond Ring Effect */}
      {showDiamond && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1], scale: [0.4, 1] }}
          className="absolute w-7 h-7 rounded-full bg-white z-20"
          style={{
            top: '36px',
            right: '36px',
            boxShadow: '0 0 25px #fff, 0 0 45px rgba(251, 191, 36, 0.9), 0 0 75px rgba(245, 158, 11, 1)',
          }}
        >
          {/* Flare sparkles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-[2px] bg-white blur-[0.5px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-14 bg-white blur-[0.5px]" />
        </motion.div>
      )}
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
      }, 50);
      return () => clearInterval(interval);
    }, 200);
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
  const [moonOffset, setMoonOffset] = useState(0);
  const [showDiamond, setShowDiamond] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let flashTriggered = false;

    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const easeInOutCubic = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    let frameId: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < 1000) {
        // Phase 1: Moon covers sun, progress fills (0ms - 1000ms)
        const pct = elapsed / 1000;
        const eased = easeOutCubic(pct);
        setProgress(Math.round(eased * 100));
        setMoonOffset(0); // Moon stays covering the sun
        setShowDiamond(false);
      } else if (elapsed < 1300) {
        // Phase 2: Diamond ring + flash (1000ms - 1300ms)
        setProgress(100);
        setMoonOffset(0);
        setShowDiamond(true);
        if (!flashTriggered) {
          setFlash(true);
          flashTriggered = true;
        }
      } else if (elapsed < 1900) {
        // Phase 3: Moon slides out to reveal the sun (1300ms - 1900ms)
        const pct = (elapsed - 1300) / 600;
        const eased = easeInOutCubic(pct);
        setProgress(100);
        setMoonOffset(eased * 130);
        setShowDiamond(false);
        setFlash(false);
      } else if (elapsed < 2100) {
        // Phase 4: Hold on revealed sun (1900ms - 2100ms)
        setProgress(100);
        setMoonOffset(130);
        setShowDiamond(false);
        setFlash(false);
      } else {
        // End of loading
        setProgress(100);
        setMoonOffset(130);
        setShowDiamond(false);
        setFlash(false);
        setIsLoading(false);
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
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

          {/* Diamond Flash Overlay */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 bg-white z-[110] pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Sun animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <AnimatedSun moonOffset={moonOffset} showDiamond={showDiamond} />
          </motion.div>

          {/* Brand text with typewriter */}
          <TypewriterText />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
              <div
                className="h-full rounded-full transition-all duration-75 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #F59E0B, #FBBF24, #F97316)',
                  boxShadow: '0 0 12px rgba(245,158,11,0.5)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
