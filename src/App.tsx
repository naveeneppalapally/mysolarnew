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
import { LoaderDoneProvider } from './context/LoaderDoneContext';

// Loader duration constants (ms) - keep in sync with Loader.tsx
const LOADER_HIDE_DELAY = 1700;   // when loader becomes invisible
const LOADER_DONE_DELAY = 2000;   // when page animations should start

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentPhase } = useSolarTime();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADER_HIDE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
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
  }, [isLoading]);

  return (
    <>
      {/* Custom cursor - desktop only */}
      <CustomCursor />

      {/* Loader overlay */}
      <Loader isVisible={isLoading} />

      {/* Main Site — kept in DOM but invisible until loader exits.
          Using opacity+pointer-events instead of visibility:hidden so that
          React can mount components but Framer Motion won't "pre-play" their
          entry animations (they only trigger when loaderDone becomes true). */}
      <div
        className={`transition-opacity duration-700 phase-${currentPhase}`}
        style={{
          opacity: isLoading ? 0 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        {/* Noise texture overlay */}
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
      </div>
    </>
  );
}

function App() {
  return (
    <BackgroundSettingsProvider>
      <SolarTimeProvider>
        {/* LoaderDoneProvider fires at LOADER_DONE_DELAY (slightly after loader
            exits) so Hero and other page-entry animations play cleanly */}
        <LoaderDoneProvider delay={LOADER_DONE_DELAY}>
          <AppContent />
        </LoaderDoneProvider>
      </SolarTimeProvider>
    </BackgroundSettingsProvider>
  );
}

export default App;
