import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { throttleAnimationFrame } from '../lib/utils';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = throttleAnimationFrame(() => {
      setVisible(window.scrollY > 600);
    });
    window.addEventListener('scroll', handleScroll, { passive: true });
    setVisible(window.scrollY > 600);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed z-50 w-10 h-10 rounded-full border border-amber-500/40 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 transition-colors duration-200 cursor-pointer shadow-lg shadow-black/30"
          style={{ bottom: '96px', right: '24px' }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
