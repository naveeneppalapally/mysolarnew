import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun } from 'lucide-react';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--solar-bg)' }}
        >
          {/* Ambient background glow */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(245,166,35,0.4) 0%, rgba(255,215,0,0.15) 50%, transparent 70%)',
            }}
          />

          {/* Solar animation container */}
          <div className="relative flex items-center justify-center w-32 h-32 mb-8">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: '#F5A623',
                borderRightColor: '#FFD700',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Second ring – counter rotation */}
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                border: '1.5px solid transparent',
                borderBottomColor: '#FFD700',
                borderLeftColor: 'rgba(245,166,35,0.5)',
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Inner glow ring */}
            <motion.div
              className="absolute inset-5 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)',
                border: '1px solid rgba(245,166,35,0.2)',
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Radiating rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4"
                style={{
                  background:
                    'linear-gradient(to top, transparent, #F5A623)',
                  transformOrigin: 'center 46px',
                  transform: `rotate(${i * 45}deg)`,
                }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}

            {/* Center sun icon */}
            <motion.div
              className="relative z-10"
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sun
                className="w-10 h-10"
                style={{
                  color: '#FFD700',
                  filter: 'drop-shadow(0 0 12px rgba(245,166,35,0.6))',
                }}
                strokeWidth={1.5}
              />
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-center"
          >
            <h1
              className="font-heading text-2xl sm:text-3xl font-bold tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #F5A623, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MyHome Solar
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase mt-1"
              style={{ color: '#94A3B8' }}
            >
              Hyderabad's Solar Experts
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-16 w-40 h-0.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(245,166,35,0.15)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #F5A623, #FFD700)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
