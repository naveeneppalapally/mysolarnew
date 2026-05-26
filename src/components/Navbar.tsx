import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ArrowRight } from 'lucide-react';
import { useSolarTime } from '../context/SolarTimeContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Why Solar', href: '#why-solar' },
  { label: 'Services', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Subsidy', href: '#subsidy' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

function BioSolarMenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between items-center cursor-pointer">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "rgb(239, 68, 68)" } : { rotate: 0, y: 0, backgroundColor: "rgb(16, 185, 129)" }}
        transition={{ duration: 0.3 }}
        className="w-6 h-[2.5px] rounded origin-center"
      />
      <motion.span
        animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1, backgroundColor: "rgb(52, 211, 153)" }}
        transition={{ duration: 0.2 }}
        className="w-6 h-[2.5px] rounded origin-center"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "rgb(239, 68, 68)" } : { rotate: 0, y: 0, backgroundColor: "rgb(5, 150, 105)" }}
        transition={{ duration: 0.3 }}
        className="w-6 h-[2.5px] rounded origin-center"
      />
    </div>
  );
}

function SolarOrbitSlider() {
  const { timeOfDay, setTimeOfDay, currentPhase } = useSolarTime();
  
  const x = (timeOfDay / 24) * 80 + 10;
  const t = (x - 50) / 40;
  const y = 8 + 20 * (t * t);
  
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.buttons !== 1) return;
    updateTimeFromEvent(e);
  };
  
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
    updateTimeFromEvent(e);
  };
  
  const updateTimeFromEvent = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, (clickX - 10) / 80));
    setTimeOfDay(Math.round(pct * 24 * 10) / 10);
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'dawn': return 'rgba(251, 146, 60, 0.9)';
      case 'noon': return 'rgba(250, 204, 21, 0.95)';
      case 'dusk': return 'rgba(244, 63, 94, 0.9)';
      case 'night': return 'rgba(99, 102, 241, 0.9)';
      default: return 'rgba(250, 204, 21, 0.9)';
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const mins = Math.round((time - hours) * 60).toString().padStart(2, '0');
    return `${hours.toString().padStart(2, '0')}:${mins}`;
  };

  return (
    <div className="flex flex-col items-center gap-1 group relative cursor-pointer select-none">
      <div className="relative w-[100px] h-[36px]">
        <svg 
          width="100" 
          height="36" 
          className="overflow-visible touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
        >
          <path 
            d="M 10 28 Q 50 8 90 28" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.15)" 
            strokeWidth="2" 
            strokeDasharray="2,3"
            className="group-hover:stroke-amber-500/30 transition-colors"
          />
          <path 
            d="M 10 28 Q 50 8 90 28" 
            fill="none" 
            stroke={getPhaseColor()} 
            strokeWidth="1.5" 
            className="opacity-20"
          />
          <g transform={`translate(${x}, ${y})`}>
            <circle 
              r="6" 
              fill={getPhaseColor()} 
              style={{
                filter: `drop-shadow(0 0 6px ${getPhaseColor()})`
              }} 
            />
            {currentPhase === 'night' && (
              <circle r="4" cx="-2" cy="-2" fill="#030712" />
            )}
          </g>
        </svg>
      </div>
      <span className="text-[9px] font-mono tracking-wider text-gray-500 group-hover:text-amber-400 transition-colors">
        {formatTime(timeOfDay)} ({currentPhase.toUpperCase()})
      </span>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300"
        animate={{
          height: scrolled ? 56 : 64,
          backgroundColor: scrolled
            ? 'rgba(3,7,18,0.85)'
            : 'rgba(3,7,18,0)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderBottom: scrolled
            ? '1px solid rgba(245,158,11,0.1)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center">
            <Sun size={16} className="text-gray-900" />
          </div>
          <span className="text-lg font-bold font-heading tracking-wide">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              MYHOME
            </span>{' '}
            <span className="text-white">SOLAR</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-amber-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {/* Underline */}
                <motion.span
                  className="absolute bottom-0 left-3 right-3 h-px bg-amber-400"
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: 'center' }}
                />
              </button>
            );
          })}
        </div>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-6">
          <SolarOrbitSlider />
          <a
            href="tel:9550130770"
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors flex items-center gap-1"
          >
            <span>📞</span> 9550130770
          </a>
          <button
            onClick={() => scrollTo('#contact')}
            className="relative group overflow-hidden rounded-lg px-4 py-2 text-xs font-semibold text-gray-900 cursor-pointer"
            style={{
              background:
                'linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)',
              backgroundSize: '200% 200%',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-1 font-heading">
              Get Quote <ArrowRight size={12} />
            </span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white cursor-pointer z-50"
          aria-label="Toggle menu"
        >
          <BioSolarMenuIcon isOpen={mobileOpen} />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-gray-950/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-28 pb-8 overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-2 w-full">
              <div className="mb-6 scale-110 flex justify-center">
                <SolarOrbitSlider />
              </div>
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => scrollTo(link.href)}
                    className={`text-2xl font-heading font-bold py-2 px-4 transition-colors cursor-pointer ${
                      isActive ? 'text-amber-400' : 'text-gray-300'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <a
                  href="tel:9550130770"
                  className="text-amber-400 text-lg font-medium flex items-center gap-2"
                >
                  📞 9550130770
                </a>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="rounded-lg px-6 py-3 text-sm font-semibold text-gray-900 font-heading cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(135deg, #F59E0B, #FBBF24)',
                  }}
                >
                  Get Free Quote →
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
