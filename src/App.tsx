import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ThemeProvider } from './context/ThemeContext';
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
import Testimonials from './components/Testimonials';
import Financing from './components/Financing';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent Lenis smooth scroll on mobile devices (even in "Desktop site" mode)
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
  }, []);

  return (
    <ThemeProvider>
      {isLoading && <Loader />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <WhySolar />
          <SubsidySection />
          <Services />
          <HowItWorks />
          <TelanganaPolicy />
          <SavingsChart />
          <Testimonials />
          <Financing />
          <FAQ />
          <ContactForm />
        </main>
        <Footer />
        <FloatingCTA />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
