import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurvedDivider from './components/CurvedDivider';
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
import { ThemeProvider } from './context/ThemeContext';

// How long the loader plays before fading out (ms)
const LOADER_HIDE_DELAY = 2400;

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentPhase } = useSolarTime();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADER_HIDE_DELAY);
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
      <CustomCursor />

      {/* Loader sits on top as a fixed overlay with z-100 */}
      <Loader isVisible={isLoading} />

      {/*
        All content is ALWAYS mounted (no conditional rendering).
        The Loader covers it as a z-100 overlay, so users can't see it.
        Hero uses whileInView (viewport: once) so animations only fire
        when the element is actually visible — which happens naturally
        after the Loader fades out. No mount burst, no jank.
      */}
      <div
        className={`transition-opacity duration-1000 phase-${currentPhase}`}
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {!isLoading && (
          <>
            <div className="noise-overlay" />
            <Navbar />
            <main>
              <Hero />
              <CurvedDivider />
              <Marquee />
              <WhySolar />
              <SubsidySection />
              <Services />
              <CurvedDivider />
              <HowItWorks />
              <SubsidyCalculator />
              <CurvedDivider />
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
    <ThemeProvider>
      <BackgroundSettingsProvider>
        <SolarTimeProvider>
          <AppContent />
        </SolarTimeProvider>
      </BackgroundSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
