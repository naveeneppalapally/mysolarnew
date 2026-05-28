import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ArrowRight, Moon, ChevronDown, Home, Building2, Landmark, Sprout, Shield, Database, Hammer, Calculator } from 'lucide-react';
import { useSolarTime } from '../context/SolarTimeContext';
import { useTheme } from '../context/ThemeContext';
import { smoothScrollTo } from '../lib/utils';

interface DropdownItem {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const offeringsItems: DropdownItem[] = [
  {
    label: 'Solar for Homes',
    description: 'Save up to 90% on home electricity. Subsidy guides & net metering.',
    href: '#homes',
    icon: <Home className="w-5 h-5 text-amber-400" />,
  },
  {
    label: 'Housing Societies (RWAs)',
    description: 'R rooftop solar for shared apartments and housing societies.',
    href: '#societies',
    icon: <Building2 className="w-5 h-5 text-purple-400" />,
  },
  {
    label: 'Commercial & Industrial',
    description: 'C&I solar under TSERC 2025 guidelines. Surcharge exemptions.',
    href: '#commercial',
    icon: <Landmark className="w-5 h-5 text-emerald-400" />,
  },
  {
    label: 'PM-KUSUM for Farmers',
    description: 'Agricultural solar pumps and fallow land leasing models.',
    href: '#farmers',
    icon: <Sprout className="w-5 h-5 text-emerald-500" />,
  },
];

const techItems: DropdownItem[] = [
  {
    label: 'DeccanShield™ Structure',
    description: 'Cyclone-grade 160km/h structural engineering & chemical anchoring.',
    href: '#homes?tab=structure',
    icon: <Shield className="w-5 h-5 text-amber-400" />,
  },
  {
    label: 'Tier-1 Panels Database',
    description: 'Premier Energies TOPCon & Adani Mono-PERC datasheets.',
    href: '#homes?tab=panels',
    icon: <Database className="w-5 h-5 text-purple-400" />,
  },
  {
    label: '10-Point Technical Code',
    description: 'Rigid installation standards & safety SOPs.',
    href: '#homes?tab=standards',
    icon: <Hammer className="w-5 h-5 text-emerald-400" />,
  },
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
    } catch {
      /* ignore pointer capture error */
    }
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

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-solar-border bg-solar-card backdrop-blur-md transition-all duration-300 hover:border-solar-border-hover hover:bg-solar-gold/5 group"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="light-moon"
            initial={{ y: 20, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.3 }}
            className="text-purple-600 group-hover:text-purple-500"
          >
            <Moon size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="dark-sun"
            initial={{ y: 20, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.3 }}
            className="text-amber-400 group-hover:text-amber-300"
          >
            <Sun size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [hoveredMenu, setHoveredMenu] = useState<'offerings' | 'tech' | null>(null);
  
  // Track active menu items for mobile collapsible panels
  const [mobileOfferingsOpen, setMobileOfferingsOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleHashChange = () => {
      const fullHash = window.location.hash || '#home';
      const baseHash = fullHash.split('?')[0];
      setActiveHash(baseHash);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    
    handleScroll();
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateTo = (href: string) => {
    setMobileOpen(false);
    setHoveredMenu(null);
    
    const [path] = href.split('?');
    
    if (path === '#contact') {
      // If navigating to contact, go to home hash first then scroll
      if (window.location.hash !== '#home') {
        window.location.hash = '#home';
        setTimeout(() => {
          smoothScrollTo('contact');
        }, 150);
      } else {
        smoothScrollTo('contact');
      }
    } else {
      window.location.hash = href;
    }
  };

  const isSolutionsActive = offeringsItems.some(item => activeHash === item.href);
  const isTechActive = techItems.some(item => activeHash.startsWith(item.href.split('?')[0]));

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300"
        animate={{
          height: scrolled ? 60 : 72,
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'rgba(3,7,18,0)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigateTo('#home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
            <Sun size={16} className="text-gray-900" />
          </div>
          <span className="text-lg font-bold font-heading tracking-wide">
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              MYHOME
            </span>{' '}
            <span className="text-solar-text">SOLAR</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 h-full">
          {/* Home Link */}
          <button
            onClick={() => navigateTo('#home')}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeHash === '#home' ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
            }`}
          >
            Home
            <motion.span
              className="absolute bottom-[-10px] left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
              initial={false}
              animate={{ scaleX: activeHash === '#home' ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>

          {/* Solutions Dropdown Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setHoveredMenu('offerings')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1 ${
                isSolutionsActive ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
              }`}
            >
              Solutions
              <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredMenu === 'offerings' ? 'rotate-180' : ''}`} />
              <motion.span
                className="absolute bottom-[-10px] left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-purple-500 rounded-full"
                initial={false}
                animate={{ scaleX: isSolutionsActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>

            {/* solutions Mega Menu Dropdown */}
            <AnimatePresence>
              {hoveredMenu === 'offerings' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-[80%] left-[-80px] w-[560px] rounded-2xl border border-solar-border bg-solar-card-solid backdrop-blur-3xl shadow-card-lg p-5 grid grid-cols-2 gap-4"
                >
                  {offeringsItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => navigateTo(item.href)}
                      className={`text-left p-3.5 rounded-xl border border-transparent transition-all duration-300 hover:border-solar-border hover:bg-solar-card group flex items-start gap-3.5 cursor-pointer ${
                        activeHash === item.href ? 'border-amber-500/20 bg-amber-500/[0.02]' : ''
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-solar-card border border-solar-border group-hover:border-amber-500/20 group-hover:scale-105 transition-all">
                        {item.icon}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold font-heading transition-colors ${activeHash === item.href ? 'text-solar-gold' : 'text-solar-text group-hover:text-solar-gold'}`}>
                          {item.label}
                        </p>
                        <p className="text-[10px] text-solar-text-muted leading-relaxed font-body">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Technology & Safety Dropdown Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setHoveredMenu('tech')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1 ${
                isTechActive ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
              }`}
            >
              Technology
              <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredMenu === 'tech' ? 'rotate-180' : ''}`} />
              <motion.span
                className="absolute bottom-[-10px] left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-purple-500 rounded-full"
                initial={false}
                animate={{ scaleX: isTechActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>

            {/* tech Dropdown Menu */}
            <AnimatePresence>
              {hoveredMenu === 'tech' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-[80%] left-[-100px] w-[340px] rounded-2xl border border-solar-border bg-solar-card-solid backdrop-blur-3xl shadow-card-lg p-3 space-y-1"
                >
                  {techItems.map((item) => {
                    const isActive = window.location.hash === item.href;
                    return (
                      <button
                        key={item.label}
                        onClick={() => navigateTo(item.href)}
                        className={`w-full text-left p-3 rounded-xl border border-transparent transition-all duration-300 hover:border-solar-border hover:bg-solar-card group flex items-start gap-3 cursor-pointer ${
                          isActive ? 'border-amber-500/20 bg-amber-500/[0.02]' : ''
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-solar-card border border-solar-border group-hover:border-amber-500/20 transition-colors">
                          {item.icon}
                        </div>
                        <div className="space-y-0.5">
                          <p className={`text-xs font-bold font-heading transition-colors ${isActive ? 'text-solar-gold' : 'text-solar-text group-hover:text-solar-gold'}`}>
                            {item.label}
                          </p>
                          <p className="text-[9px] text-solar-text-muted leading-relaxed font-body">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Calculator Link */}
          <button
            onClick={() => navigateTo('#calculator')}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeHash === '#calculator' ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Calculator
            <motion.span
              className="absolute bottom-[-10px] left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
              initial={false}
              animate={{ scaleX: activeHash === '#calculator' ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>

          {/* FAQ Link */}
          <button
            onClick={() => navigateTo('#faq')}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeHash === '#faq' ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
            }`}
          >
            FAQ
            <motion.span
              className="absolute bottom-[-10px] left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
              initial={false}
              animate={{ scaleX: activeHash === '#faq' ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-6">
          <SolarOrbitSlider />
          <ThemeToggle />
          <a
            href="tel:9493936249"
            className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors flex items-center gap-1.5"
            title="Call MyHome Solar"
          >
            <span>📞</span> 9493936249
          </a>
          <button
            onClick={() => navigateTo('#contact')}
            className="relative group overflow-hidden rounded-lg px-4.5 py-2.5 text-xs font-semibold text-gray-900 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)',
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
          className="lg:hidden relative w-10 h-10 flex items-center justify-center text-solar-text cursor-pointer z-50"
          aria-label="Toggle menu"
        >
          <BioSolarMenuIcon isOpen={mobileOpen} />
        </button>
      </motion.nav>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-solar-bg-secondary/95 text-solar-text backdrop-blur-2xl flex flex-col justify-start pt-24 pb-8 overflow-y-auto px-4"
          >
            <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
              <div className="mb-6 scale-110 flex justify-center items-center gap-6">
                <SolarOrbitSlider />
                <ThemeToggle />
              </div>

              {/* Home */}
              <button
                onClick={() => navigateTo('#home')}
                className={`text-xl font-heading font-bold text-left py-2 border-b border-solar-border/40 ${
                  activeHash === '#home' ? 'text-solar-gold' : 'text-solar-text-muted'
                }`}
              >
                Home
              </button>

              {/* Solutions Panel Trigger */}
              <div className="border-b border-solar-border/40 py-2">
                <button
                  onClick={() => setMobileOfferingsOpen(!mobileOfferingsOpen)}
                  className={`w-full text-xl font-heading font-bold text-left flex items-center justify-between ${
                    isSolutionsActive ? 'text-solar-gold' : 'text-solar-text-muted'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown size={18} className={`transition-transform duration-200 ${mobileOfferingsOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileOfferingsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {offeringsItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => navigateTo(item.href)}
                        className={`w-full text-left py-1.5 flex items-center gap-2.5 ${
                          activeHash === item.href ? 'text-solar-gold' : 'text-solar-text-muted'
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tech Panel Trigger */}
              <div className="border-b border-solar-border/40 py-2">
                <button
                  onClick={() => setMobileTechOpen(!mobileTechOpen)}
                  className={`w-full text-xl font-heading font-bold text-left flex items-center justify-between ${
                    isTechActive ? 'text-solar-gold' : 'text-solar-text-muted'
                  }`}
                >
                  <span>Technology & Specs</span>
                  <ChevronDown size={18} className={`transition-transform duration-200 ${mobileTechOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileTechOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {techItems.map((item) => {
                      const isActive = window.location.hash === item.href;
                      return (
                        <button
                          key={item.label}
                          onClick={() => navigateTo(item.href)}
                          className={`w-full text-left py-1.5 flex items-center gap-2.5 ${
                            isActive ? 'text-solar-gold' : 'text-solar-text-muted'
                          }`}
                        >
                          {item.icon}
                          <span className="text-sm font-semibold">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Calculator */}
              <button
                onClick={() => navigateTo('#calculator')}
                className={`text-xl font-heading font-bold text-left py-2 border-b border-solar-border/40 ${
                  activeHash === '#calculator' ? 'text-solar-gold' : 'text-solar-text-muted'
                }`}
              >
                Cost Calculator
              </button>

              {/* FAQ */}
              <button
                onClick={() => navigateTo('#faq')}
                className={`text-xl font-heading font-bold text-left py-2 border-b border-solar-border/40 ${
                  activeHash === '#faq' ? 'text-solar-gold' : 'text-solar-text-muted'
                }`}
              >
                FAQ & Knowledge Base
              </button>

              {/* Contact Actions */}
              <div className="mt-8 flex flex-col items-center gap-4 text-center">
                <a
                  href="tel:9493936249"
                  className="text-amber-400 text-lg font-semibold flex items-center gap-2"
                >
                  📞 +91 9493936249
                </a>
                <button
                  onClick={() => navigateTo('#contact')}
                  className="w-full rounded-xl py-3.5 text-sm font-bold text-gray-900 font-heading cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
                  }}
                >
                  Get Free Quote →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
