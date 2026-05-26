import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Why Solar', href: '#why-solar' },
  { label: 'Services', href: '#services' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Subsidy', href: '#subsidy' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
          onClick={() => scrollTo('#hero')}
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
        <div className="hidden lg:flex items-center gap-4">
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
          className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
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
            className="fixed inset-0 z-[99] bg-gray-950/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-2">
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
