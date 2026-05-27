import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import WhySolar from './components/WhySolar';
import SubsidySection from './components/SubsidySection';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import TelanganaPolicy from './components/TelanganaPolicy';
import SavingsChart from './components/SavingsChart';
import SubsidyCalculator from './components/SubsidyCalculator';
import Financing from './components/Financing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import BackgroundSettings from './components/BackgroundSettings';
import { SolarTimeProvider, useSolarTime } from './context/SolarTimeContext';
import { BackgroundSettingsProvider } from './context/BackgroundSettingsContext';

// How long the loader plays before hiding (ms) — keep in sync with Loader.tsx
const LOADER_HIDE_DELAY = 950;

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  // A second flag that lags slightly so the opacity CSS transition has started
  // before we render children. This gives the fade-in a head start.
  const [showContent, setShowContent] = useState(false);
  const { currentPhase } = useSolarTime();

  useEffect(() => {
    // Step 1: hide the loader overlay
    const hideTimer = setTimeout(() => setIsLoading(false), LOADER_HIDE_DELAY);
    // Step 2: mount main content one frame later so the wrapper's opacity
    // transition has already begun → smooth fade while animations play fresh
    const showTimer = setTimeout(() => setShowContent(true), LOADER_HIDE_DELAY + 50);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;
    if (typeof window === 'undefined') return;

    const isMobileDevice =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0);

    if (isMobileDevice || window.innerWidth < 1024) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [showContent]);

  return (
    <>
      {/* Custom cursor - desktop only */}
      <CustomCursor />

      {/* Loader overlay — sits on top, exits after LOADER_HIDE_DELAY */}
      <Loader isVisible={isLoading} />

      {/*
        Main site wrapper.
        - Opacity 0 while loader is showing, fades to 1 once loader exits.
        - Content is NOT rendered (showContent=false) until 50ms after the
          opacity transition starts. This means Framer Motion components
          mount fresh — their useInView / entry animations have never
          pre-fired, so everything plays correctly on first paint.
      */}
      <div
        className={`transition-opacity duration-700 phase-${currentPhase}`}
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {showContent && (
          <>
            <div className="noise-overlay" />
            <Navbar />
            <main>
              <Hero />
              <Marquee />
              <WhySolar />
              <SubsidySection />
              <Services />
              <HowItWorks />
              <SubsidyCalculator />
              <SavingsChart />
              <TelanganaPolicy />
              <Financing />
              <Testimonials />
              <FAQ />
              <ContactForm />
            </main>
            <Footer />
            <FloatingCTA />
            <ScrollToTop />
            <BackgroundSettings />
          </>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <BackgroundSettingsProvider>
      <SolarTimeProvider>
        <AppContent />
      </SolarTimeProvider>
    </BackgroundSettingsProvider>
  );
}

export default App;
