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

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentPhase } = useSolarTime();

  useEffect(() => {
    // Let the Loader component control its own timing
    // Must match the soothing solar sunrise timeline: fade-in(1.6s) + buffer(0.1s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (typeof window === 'undefined') return;

    // Prevent Lenis smooth scroll on mobile devices
    const isMobileDevice =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0);

    if (isMobileDevice || window.innerWidth < 1024) return;

    // Initialize Lenis smooth scroll for true desktop environments only
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

      {/* Loader */}
      <Loader isVisible={isLoading} />

      {/* Main Site */}
      <div
        className={`transition-opacity duration-700 phase-${currentPhase} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
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
        <AppContent />
      </SolarTimeProvider>
    </BackgroundSettingsProvider>
  );
}

export default App;
