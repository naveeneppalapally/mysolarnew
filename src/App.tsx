import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import BackgroundSettings from './components/BackgroundSettings';
import HomeView from './components/views/HomeView';
import HomesView from './components/views/HomesView';
import SocietiesView from './components/views/SocietiesView';
import CommercialView from './components/views/CommercialView';
import FarmersView from './components/views/FarmersView';
import CalculatorView from './components/views/CalculatorView';
import FAQView from './components/views/FAQView';
import { SolarTimeProvider, useSolarTime } from './context/SolarTimeContext';
import { BackgroundSettingsProvider } from './context/BackgroundSettingsContext';
import { ThemeProvider } from './context/ThemeContext';

// How long the loader plays before fading out (ms)
const LOADER_HIDE_DELAY = 2400;

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentPhase } = useSolarTime();
  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash || '#home';
    }
    return '#home';
  });

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

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash || '#home';
      // Normalize e.g., #homes?tab=panels -> #homes
      const baseHash = fullHash.split('?')[0];
      setCurrentHash(baseHash);
      
      // Reset scroll position to top instantly when page changes
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Sync initial hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderActiveView = () => {
    switch (currentHash) {
      case '#home':
        return <HomeView />;
      case '#homes':
        return <HomesView />;
      case '#societies':
        return <SocietiesView />;
      case '#commercial':
        return <CommercialView />;
      case '#farmers':
        return <FarmersView />;
      case '#calculator':
        return <CalculatorView />;
      case '#faq':
        return <FAQView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <>
      <CustomCursor />

      {/* Loader sits on top as a fixed overlay with z-100 */}
      <Loader isVisible={isLoading} />

      <div
        className={`transition-all duration-1000 ease-in-out phase-${currentPhase}`}
        style={{
          background: 'var(--solar-bg)',
          minHeight: '100vh',
          opacity: isLoading ? 0 : 1
        }}
      >
        {!isLoading && (
          <>
            <div className="noise-overlay" />
            <Navbar />
            <main>
              {renderActiveView()}
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
