import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      setProgress(scrollPercent);
      setVisible(scrollPercent > 0.15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle dimensions
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer group"
          style={{
            background: 'var(--solar-card)',
            border: '1px solid var(--solar-border)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 0 15px rgba(16,185,129,0.1)',
          }}
          aria-label="Scroll to top"
        >
          {/* Circular progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            {/* Background ring */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="var(--solar-border)"
              strokeWidth="2"
            />
            {/* Progress ring */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="var(--solar-emerald)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
          </svg>

          {/* Arrow icon */}
          <ChevronUp className="w-5 h-5 text-solar-gold relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
