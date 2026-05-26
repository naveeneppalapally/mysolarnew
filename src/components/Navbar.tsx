import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import { scrollToSection } from '../lib/utils';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'Home',      sectionId: 'home' },
  { label: 'Services',  sectionId: 'services' },
  { label: 'Why Solar', sectionId: 'why-solar' },
  { label: 'Subsidy',   sectionId: 'subsidy' },
  { label: 'Process',   sectionId: 'process' },
  { label: 'Contact',   sectionId: 'contact' },
] as const;

/* ── Full-screen mobile menu overlay ── */
function MobileOverlay({
  isOpen,
  onClose,
  onNav,
  theme,
  onToggleTheme,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNav: (id: string) => void;
  theme: string;
  onToggleTheme: () => void;
}) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-overlay"
          className="fixed inset-0 z-[60] flex flex-col"
          style={{
            background: 'var(--nav-overlay-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Top bar with logo + close */}
          <div className="flex items-center justify-between px-5 sm:px-8 h-16">
            <button
              onClick={() => onNav('home')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-solar-border bg-transparent">
                <img src="/logo.png" alt="MyHome Solar" className="w-full h-full object-contain transition-transform" />
              </div>
              <span className="font-heading font-bold text-[15px] text-solar-text">
                MyHome <span className="text-solar-gold">Solar</span>
              </span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--solar-border)', color: 'var(--solar-text-muted)', background: 'transparent' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--solar-border)', color: 'var(--solar-text-muted)', background: 'transparent' }}
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav links — full page, centered, large font */}
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-12">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.sectionId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
                onClick={() => onNav(link.sectionId)}
                className="text-left py-3.5 border-b font-heading text-lg sm:text-xl font-semibold cursor-pointer tracking-tight"
                style={{
                  color: 'var(--solar-text)',
                  borderColor: 'var(--solar-border)',
                  background: 'transparent',
                }}
              >
                  {link.label}
              </motion.button>
            ))}
          </div>

          {/* Bottom bar — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="px-8 sm:px-12 pb-8 flex gap-3"
          >
            <a
              href="tel:+919493936249"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold border cursor-pointer font-heading"
              style={{ borderColor: 'var(--solar-border)', color: 'var(--solar-text-muted)', background: 'transparent' }}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={() => onNav('contact')}
              className="flex-1 shimmer-btn py-3.5 rounded-xl text-sm cursor-pointer"
            >
              Free Quote →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isScrolled } = useScrollProgress();
  const { theme, toggle } = useTheme();

  const handleNavClick = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group cursor-pointer shrink-0"
              aria-label="MyHome Solar — Home"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-solar-border bg-transparent shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
                <img src="/logo.png" alt="MyHome Solar" className="w-full h-full object-contain transition-transform" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-[15px] tracking-tight text-solar-text">
                  MyHome <span className="text-solar-gold">Solar</span>
                </span>
                <span className="font-body text-[10px] tracking-wider text-solar-text-muted">
                  SOLARSMART ENERGIES
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="nav-link text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggle}
                aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                className="w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer transition-colors hover:border-solar-emerald hover:text-solar-emerald"
                style={{ borderColor: 'var(--solar-border)', color: 'var(--solar-text-muted)', background: 'transparent' }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <a
                href="tel:+919493936249"
                className="flex items-center gap-2 font-body text-sm font-medium px-4 py-2 rounded-lg border transition-colors hover:border-solar-emerald hover:text-solar-emerald"
                style={{ borderColor: 'var(--solar-border)', color: 'var(--solar-text-muted)' }}
              >
                <Phone className="w-3.5 h-3.5" />
                94939 36249
              </a>

              <button
                onClick={() => handleNavClick('contact')}
                className="shimmer-btn px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
              >
                Free Quote →
              </button>
            </div>

            {/* Mobile Right */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--solar-border)', color: 'var(--solar-text-muted)', background: 'transparent' }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer"
                style={{ borderColor: 'var(--solar-border)', color: 'var(--solar-text-muted)', background: 'transparent' }}
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Overlay */}
      <MobileOverlay
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNav={handleNavClick}
        theme={theme}
        onToggleTheme={toggle}
      />
    </>
  );
}
