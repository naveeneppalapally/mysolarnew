import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ArrowRight, Moon, ChevronDown, Home, Building2, Landmark, Sprout, Shield, Database, Hammer, Calculator, Phone } from 'lucide-react';
import { useSolarTime } from '../context/SolarTimeContext';
import { useTheme } from '../context/ThemeContext';
import { smoothScrollTo, throttleAnimationFrame } from '../lib/utils';

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
    icon: <Building2 className="w-5 h-5 text-sky-400" />,
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
    href: '#structure',
    icon: <Shield className="w-5 h-5 text-amber-400" />,
  },
  {
    label: 'Tier-1 Panels Database',
    description: 'Premier Energies TOPCon & Adani Mono-PERC datasheets.',
    href: '#panels',
    icon: <Database className="w-5 h-5 text-sky-400" />,
  },
  {
    label: '10-Point Technical Code',
    description: 'Rigid installation standards & safety SOPs.',
    href: '#standards',
    icon: <Hammer className="w-5 h-5 text-emerald-400" />,
  },
];

function BioSolarMenuIcon({ isOpen }: { isOpen: boolean }) {
  const { theme } = useTheme();
  const baseColor = theme === 'dark' ? '#f3f4f6' : '#1f2937';
  const activeColor = '#F59E0B'; // Premium Brand Gold

  return (
    <div className="relative w-6 h-5 flex flex-col justify-between items-center cursor-pointer">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8, backgroundColor: activeColor } : { rotate: 0, y: 0, backgroundColor: baseColor }}
        transition={{ duration: 0.3 }}
        className="w-6 h-[2.5px] rounded origin-center"
      />
      <motion.span
        animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1, backgroundColor: baseColor }}
        transition={{ duration: 0.2 }}
        className="w-6 h-[2.5px] rounded origin-center"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8, backgroundColor: activeColor } : { rotate: 0, y: 0, backgroundColor: baseColor }}
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
      {/* UPGRADED: current time text is amber colored and slightly spaced */}
      <span className="text-[9px] font-mono tracking-[0.15em] text-solar-gold transition-colors">
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
            className="text-blue-600 group-hover:text-blue-500"
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
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const [hoveredMenu, setHoveredMenu] = useState<'offerings' | 'tech' | null>(null);
  
  // Track active menu items for mobile collapsible panels
  const [mobileOfferingsOpen, setMobileOfferingsOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);

  // Lock body scroll when mobile menu is open using high-fidelity overflow control (preventing scroll interference)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = throttleAnimationFrame(() => {
      setScrolled(window.scrollY > 50);
    });
    
    const handleHashChange = () => {
      const fullHash = window.location.hash || '#home';
      const baseHash = fullHash.split('?')[0];
      setActiveHash(baseHash);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('resize', handleResize);
    
    setScrolled(window.scrollY > 50);
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigateTo = (href: string) => {
    setMobileOpen(false);
    setHoveredMenu(null);
    
    const [path] = href.split('?');
    
    if (path === '#contact' || path === '#quote-form') {
      const targetId = 'quote-form';
      if (window.location.hash !== '#home' && window.location.hash !== '') {
        window.location.hash = '#home';
        setTimeout(() => {
          smoothScrollTo(targetId);
        }, 150);
      } else {
        smoothScrollTo(targetId);
      }
    } else if (path === '#home') {
      if (window.location.hash === '#home' || window.location.hash === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.hash = '#home';
      }
    } else {
      window.location.hash = href;
    }
  };

  const isSolutionsActive = offeringsItems.some(item => activeHash === item.href);
  const isTechActive = ['#structure', '#panels', '#standards'].includes(activeHash);

  // UPGRADED: stagger animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // 50ms stagger delay per item
        duration: 0.25,
        ease: 'easeOut' as const,
      },
    }),
  };

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
          <div className="w-8 h-8 rounded-lg bg-solar-card border border-solar-border flex items-center justify-center text-solar-gold">
            <Sun size={16} />
          </div>
          <span className="text-lg font-bold font-heading tracking-wide">
            <span className="text-solar-gold">
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
              activeHash === '#home' ? 'text-solar-gold font-semibold' : 'text-solar-text-muted hover:text-solar-text'
            }`}
          >
            Home
          </button>

          {/* Solutions Dropdown Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setHoveredMenu('offerings')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1 ${
                isSolutionsActive ? 'text-solar-gold font-semibold' : 'text-solar-text-muted hover:text-solar-text'
              }`}
            >
              Solutions
              <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredMenu === 'offerings' ? 'rotate-180' : ''}`} />
            </button>

            {/* solutions Mega Menu Dropdown */}
            <AnimatePresence>
              {hoveredMenu === 'offerings' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-[-80px] mt-3 w-[560px] rounded-2xl border border-solar-border bg-solar-card-solid backdrop-blur-3xl shadow-card-lg p-5 grid grid-cols-2 gap-4 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
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
                isTechActive ? 'text-solar-gold font-semibold' : 'text-solar-text-muted hover:text-solar-text'
              }`}
            >
              Technology
              <ChevronDown size={14} className={`transition-transform duration-200 ${hoveredMenu === 'tech' ? 'rotate-180' : ''}`} />
            </button>

            {/* tech Dropdown Menu */}
            <AnimatePresence>
              {hoveredMenu === 'tech' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-[-100px] mt-3 w-[340px] rounded-2xl border border-solar-border bg-solar-card-solid backdrop-blur-3xl shadow-card-lg p-3 space-y-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
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
              activeHash === '#calculator' ? 'text-solar-gold font-semibold' : 'text-solar-text-muted hover:text-solar-text'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Calculator
          </button>

          {/* FAQ Link */}
          <button
            onClick={() => navigateTo('#faq')}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeHash === '#faq' ? 'text-solar-gold font-semibold' : 'text-solar-text-muted hover:text-solar-text'
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-6">
          <SolarOrbitSlider />
          <ThemeToggle />
          <a
            href="tel:9493936249"
            className="text-solar-gold hover:text-solar-gold-bright text-sm font-semibold transition-colors flex items-center gap-1.5"
            title="Call MyHome Solar"
          >
            <Phone size={14} className="text-solar-gold" />
            <span>9493936249</span>
          </a>
          <button
            onClick={() => navigateTo('#contact')}
            className="relative group overflow-hidden rounded-lg px-5 py-2.5 text-xs font-semibold text-gray-950 cursor-pointer hover:bg-solar-gold-bright transition-colors duration-300"
            style={{
              backgroundColor: 'var(--solar-gold)',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-1 font-heading">
              Get Quote <ArrowRight size={12} />
            </span>
          </button>
        </div>

        {/* Mobile hamburger */}
        {/* UPGRADED: thin circle border around X, rotates 90deg and subtle amber glow on hover/tap */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden relative w-10 h-10 flex items-center justify-center text-solar-text cursor-pointer z-50 transition-all duration-300 rounded-full ${
            mobileOpen 
              ? 'border border-solar-gold/30 hover:rotate-90 hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] active:rotate-90 focus:rotate-90 text-solar-gold bg-white/[0.02]' 
              : 'border border-transparent'
          }`}
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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            /* UPGRADED: The outer container is completely fixed, does NOT scroll, and extends far below the screen to prevent background leak during overscroll/dynamic URL bar resizing */
            className="fixed top-0 left-0 right-0 z-[99] text-solar-text overflow-hidden lg:hidden"
            style={{
              /* UPGRADED: subtle gradient background that dynamically adapts to light/dark themes */
              background: theme === 'light'
                ? 'linear-gradient(to bottom, #faf7f2 0%, #ede5d8 100%)'
                : 'linear-gradient(to bottom, #0a0f1e 0%, #030712 100%)',
              bottom: '-150px', // UPGRADED: Over-extend backdrop far below screen to 100% block dynamic viewport leaks
            }}
          >
            {/* UPGRADED: The inner container handles native scrolling comfortably high above phone dynamic bottom nav bars */}
            <div 
              data-lenis-prevent
              className="w-full h-screen overflow-y-auto pt-24 pb-36 px-4"
              style={{
                overscrollBehavior: 'contain',
              }}
            >
              <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
                {/* UPGRADED: subtle glow behind the sun arc */}
                <div className="mb-6 scale-110 flex justify-center items-center gap-6 relative">
                  <div 
                    className="absolute inset-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-xl pointer-events-none -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ opacity: 0.05 }}
                  />
                  <SolarOrbitSlider />
                  <ThemeToggle />
                </div>

                {/* UPGRADED: horizontal divider line below the arc with fade-out on both ends */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />

                {/* Home Link */}
                {/* UPGRADED: stagger animation wrapper (custom={0}) */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="w-full"
                >
                  {/* UPGRADED: left border only on active/current page item and group hover/tap translation */}
                  <button
                    onClick={() => navigateTo('#home')}
                    className={`w-full text-left py-4 pl-3 border-l-2 transition-all duration-200 flex items-center justify-between group ${
                      activeHash === '#home' ? 'border-solar-gold text-solar-gold' : 'border-transparent text-solar-text-muted hover:text-solar-text'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-heading font-bold">Home</span>
                      {/* UPGRADED: subtitle under nav label */}
                      <span className="text-xs font-normal text-gray-500 font-body mt-0.5">Overview & highlights</span>
                    </div>
                    {/* UPGRADED: arrow icon is amber-colored and slides right on hover/tap */}
                    <ArrowRight size={16} className="text-solar-gold transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
                  </button>
                </motion.div>

                {/* UPGRADED: gradient divider between items */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                {/* Solutions Panel Trigger */}
                {/* UPGRADED: stagger animation wrapper (custom={1}) */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="w-full"
                >
                  {/* UPGRADED: left border only on active/current page item */}
                  <div className={`py-4 pl-3 border-l-2 transition-all duration-200 ${
                    isSolutionsActive ? 'border-solar-gold' : 'border-transparent'
                  }`}>
                    <button
                      onClick={() => setMobileOfferingsOpen(!mobileOfferingsOpen)}
                      className={`w-full text-xl font-heading font-bold text-left flex items-center justify-between transition-colors duration-200 group ${
                        isSolutionsActive ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
                      }`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-lg font-heading font-bold">Solutions</span>
                        {/* UPGRADED: subtitle under nav label */}
                        <span className="text-xs font-normal text-gray-500 font-body mt-0.5">Residential & commercial</span>
                      </div>
                      {/* UPGRADED: arrow icon is amber-colored and slides right on hover/tap */}
                      <ChevronDown size={18} className={`text-solar-gold transition-all duration-200 group-hover:translate-x-1 group-active:translate-x-1 ${mobileOfferingsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileOfferingsOpen && (
                      <div className="pl-4 mt-3 space-y-3 pb-1">
                        {offeringsItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => navigateTo(item.href)}
                            className={`w-full text-left py-2 flex items-center gap-3 transition-colors duration-200 ${
                              activeHash === item.href ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
                            }`}
                          >
                            <div className="p-1 rounded-md bg-solar-card border border-solar-border text-solar-gold shrink-0">
                              {item.icon}
                            </div>
                            <span className="text-sm font-semibold">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* UPGRADED: gradient divider between items */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                {/* Tech Panel Trigger */}
                {/* UPGRADED: stagger animation wrapper (custom={2}) */}
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="w-full"
                >
                  {/* UPGRADED: left border only on active/current page item */}
                  <div className={`py-4 pl-3 border-l-2 transition-all duration-200 ${
                    isTechActive ? 'border-solar-gold' : 'border-transparent'
                  }`}>
                    <button
                      onClick={() => setMobileTechOpen(!mobileTechOpen)}
                      className={`w-full text-xl font-heading font-bold text-left flex items-center justify-between transition-colors duration-200 group ${
                        isTechActive ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
                      }`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-lg font-heading font-bold">Technology & Specs</span>
                        {/* UPGRADED: subtitle under nav label */}
                        <span className="text-xs font-normal text-gray-500 font-body mt-0.5">Panels, inverters & more</span>
                      </div>
                      {/* UPGRADED: arrow icon is amber-colored and slides right on hover/tap */}
                      <ChevronDown size={18} className={`text-solar-gold transition-all duration-200 group-hover:translate-x-1 group-active:translate-x-1 ${mobileTechOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileTechOpen && (
                      <div className="pl-4 mt-3 space-y-3 pb-1">
                        {techItems.map((item) => {
                          const isActive = window.location.hash === item.href;
                          return (
                            <button
                              key={item.label}
                              onClick={() => navigateTo(item.href)}
                              className={`w-full text-left py-2 flex items-center gap-3 transition-colors duration-200 ${
                                isActive ? 'text-solar-gold' : 'text-solar-text-muted hover:text-solar-text'
                              }`}
                            >
                              <div className="p-1 rounded-md bg-solar-card border border-solar-border text-solar-gold shrink-0">
                                {item.icon}
                              </div>
                              <span className="text-sm font-semibold">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* UPGRADED: gradient divider between items */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                {/* Calculator */}
                {/* UPGRADED: stagger animation wrapper (custom={3}) */}
                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="w-full"
                >
                  {/* UPGRADED: left border only on active/current page item */}
                  <button
                    onClick={() => navigateTo('#calculator')}
                    className={`w-full text-left py-4 pl-3 border-l-2 transition-all duration-200 flex items-center justify-between group ${
                      activeHash === '#calculator' ? 'border-solar-gold text-solar-gold' : 'border-transparent text-solar-text-muted hover:text-solar-text'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-heading font-bold">Cost Calculator</span>
                      {/* UPGRADED: subtitle under nav label */}
                      <span className="text-xs font-normal text-gray-500 font-body mt-0.5">Estimate your savings</span>
                    </div>
                    {/* UPGRADED: arrow icon is amber-colored and slides right on hover/tap */}
                    <ArrowRight size={16} className="text-solar-gold transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
                  </button>
                </motion.div>

                {/* UPGRADED: gradient divider between items */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                {/* FAQ */}
                {/* UPGRADED: stagger animation wrapper (custom={4}) */}
                <motion.div
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="w-full"
                >
                  {/* UPGRADED: left border only on active/current page item */}
                  <button
                    onClick={() => navigateTo('#faq')}
                    className={`w-full text-left py-4 pl-3 border-l-2 transition-all duration-200 flex items-center justify-between group ${
                      activeHash === '#faq' ? 'border-solar-gold text-solar-gold' : 'border-transparent text-solar-text-muted hover:text-solar-text'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-heading font-bold">FAQ & Knowledge Base</span>
                      {/* UPGRADED: subtitle under nav label */}
                      <span className="text-xs font-normal text-gray-500 font-body mt-0.5">Common questions answered</span>
                    </div>
                    {/* UPGRADED: arrow icon is amber-colored and slides right on hover/tap */}
                    <ArrowRight size={16} className="text-solar-gold transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
                  </button>
                </motion.div>

                {/* Contact Actions */}
                {/* UPGRADED: stagger animation wrapper (custom={5}) */}
                <motion.div
                  custom={5}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="mt-8 flex flex-col items-center gap-4 text-center"
                >
                  {/* UPGRADED: phone number wrapped in subtle dark pill background with border */}
                  <a
                    href="tel:9493936249"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.05] text-solar-gold text-base font-semibold hover:bg-white/[0.08] hover:text-solar-gold-bright transition-all duration-300"
                  >
                    {/* UPGRADED: thin phone icon to the left */}
                    <Phone size={16} className="text-solar-gold" strokeWidth={1.5} />
                    <span>+91 9493936249</span>
                  </a>
                </motion.div>

                {/* UPGRADED: stagger animation wrapper (custom={6}) */}
                <motion.div
                  custom={6}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                  className="mt-4 w-full"
                >
                  {/* UPGRADED: Get Free Quote CTA button with shimmer sweep, 14px border radius, and faint glow */}
                  <button
                    onClick={() => navigateTo('#contact')}
                    className="w-full rounded-[14px] py-3.5 text-sm font-bold text-gray-950 font-heading cursor-pointer hover:bg-solar-gold-bright transition-all duration-300 relative overflow-hidden"
                    style={{
                      backgroundColor: 'var(--solar-gold)',
                      boxShadow: '0 8px 32px rgba(245,158,11,0.25)',
                    }}
                  >
                    {/* UPGRADED: shimmer on CTA */}
                    <div 
                      className="absolute top-0 left-0 w-3/5 h-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                        animation: 'shimmer-sweep 3s ease-in-out infinite',
                      }}
                    />
                    <span className="relative z-10">Get Free Quote →</span>
                  </button>
                </motion.div>
              </div>
            </div> {/* UPGRADED: Close inner scrollable container */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
