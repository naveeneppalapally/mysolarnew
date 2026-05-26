import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { scrollToSection } from '../lib/utils';

// Updated to real WhatsApp number: +919493936249
const WHATSAPP_URL =
  'https://wa.me/919493936249?text=Hi%2C%20I%20want%20a%20free%20solar%20quote%20for%20my%20home';

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.11-1.14l-.29-.174-2.87.852.852-2.87-.174-.29A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
      />
    </svg>
  );
}

export default function FloatingCTA() {
  const { isPast30 } = useScrollProgress();
  const [isDismissed, setIsDismissed] = useState(false);

  const showQuoteBtn = isPast30 && !isDismissed;

  return (
    <>
      {/* ─── WhatsApp Button (Bottom-Right, inside viewport) ─── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] shadow-lg shadow-green-500/30 hover:scale-110 transition-transform duration-300 cursor-pointer"
        style={{ bottom: '1.5rem', right: '1.5rem' }}
      >
        {/* Double pulsing rings */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-35" style={{ animationDelay: '0s', animationDuration: '1.8s' }} />
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20" style={{ animationDelay: '0.6s', animationDuration: '1.8s' }} />
        <WhatsAppIcon />
      </a>

      {/* ─── Free Quote Button (Bottom-Left) ─── */}
      <AnimatePresence>
        {showQuoteBtn && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed z-50"
            style={{ bottom: '1.5rem', left: '1.5rem' }}
          >
            <div className="relative">
              {/* Dismiss button */}
              <button
                onClick={() => setIsDismissed(true)}
                aria-label="Dismiss"
                className="absolute -top-2 -right-2 z-10 flex items-center justify-center w-5 h-5 rounded-full bg-solar-bg-light border border-solar-border text-solar-text-muted hover:text-solar-gold hover:border-solar-gold transition-colors duration-200 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="shimmer-btn rounded-full px-5 py-3 font-heading font-bold text-sm cursor-pointer shadow-lg"
              >
                ☀ Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
