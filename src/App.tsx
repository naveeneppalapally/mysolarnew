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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Let the Loader component control its own timing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
        className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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
      </div>
    </>
  );
}

export default App;
