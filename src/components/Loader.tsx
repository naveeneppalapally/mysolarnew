import { useEffect, useRef } from 'react';

/* ============================================
   ULTRA-REALISTIC SOOTHING SUN
   ============================================ */
interface RealisticSunProps {
  corona1Ref: React.RefObject<SVGGElement | null>;
  corona2Ref: React.RefObject<SVGGElement | null>;
  flareRef: React.RefObject<SVGRectElement | null>;
  lightRaysRef: React.RefObject<SVGGElement | null>;
}

function RealisticSun({
  corona1Ref,
  corona2Ref,
  flareRef,
  lightRaysRef,
}: RealisticSunProps) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center select-none">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Volumetric sun core gradient */}
          <radialGradient id="sunCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="15%" stopColor="#FFF9E6" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>

          {/* Large soft atmospheric glow */}
          <radialGradient id="sunAtmosphereGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>

          {/* Anamorphic horizontal lens flare gradient */}
          <linearGradient id="lensFlareGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#FBBF24" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          {/* Volumetric light ray gradient that fades out */}
          <linearGradient id="solarRayGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFbeb" stopOpacity="0.8" />
            <stop offset="12%" stopColor="#FBBF24" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft atmospheric aura */}
        <circle cx="200" cy="200" r="170" fill="url(#sunAtmosphereGrad)" className="opacity-90" />

        {/* Slow rotating corona filaments (Layer 1) */}
        <g ref={corona1Ref} style={{ transformOrigin: '200px 200px' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M200,70 Q212,110 200,150 Q188,110 200,70 Z"
              fill="#F59E0B"
              className="opacity-[0.08]"
              style={{ transform: `rotate(${i * 22.5}deg)`, transformOrigin: '200px 200px' }}
            />
          ))}
        </g>

        {/* Slow counter-rotating corona filaments (Layer 2) */}
        <g ref={corona2Ref} style={{ transformOrigin: '200px 200px' }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M200,50 Q220,110 200,170 Q180,110 200,50 Z"
              fill="#D97706"
              className="opacity-[0.05]"
              style={{ transform: `rotate(${i * 30 + 15}deg)`, transformOrigin: '200px 200px' }}
            />
          ))}
        </g>

        {/* Volumetric Ray Beams (Visible overlay, scaled, rotated, and noise-shifted dynamically) */}
        <g 
          ref={lightRaysRef} 
          style={{ 
            transformOrigin: '200px 200px', 
            opacity: 0,
            filter: 'blur(12px)',
            WebkitFilter: 'blur(12px)'
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '200px 200px' }}>
              {/* Wide volumetric glow shaft */}
              <polygon
                points="168,200 200,-1000 232,200"
                fill="url(#solarRayGrad)"
                opacity="0.32"
              />
              {/* Narrow intense beam core */}
              <polygon
                points="186,200 200,-1000 214,200"
                fill="url(#solarRayGrad)"
                opacity="0.65"
              />
            </g>
          ))}
        </g>

        {/* Realistic Burning Sun Core with Heat Shimmer */}
        <circle cx="200" cy="200" r="82" fill="url(#sunCoreGrad)" />

        {/* Horizontal Anamorphic Lens Flare */}
        <rect
          ref={flareRef}
          x="-100"
          y="196"
          width="600"
          height="8"
          fill="url(#lensFlareGrad)"
          style={{ 
            transformOrigin: '200px 200px',
            filter: 'blur(4px)',
            WebkitFilter: 'blur(4px)'
          }}
        />
      </svg>
    </div>
  );
}

/* ============================================
   TYPEWRITER TEXT
   ============================================ */
const brandText = 'MYHOME SOLAR';

function TypewriterText() {
  return (
    <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.25em] select-none flex items-center justify-center">
      <style>{`
        @keyframes typeInChar {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-char {
          display: inline-block;
          color: #F59E0B;
          opacity: 0;
          animation: typeInChar 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .typewriter-space {
          display: inline-block;
          min-width: 0.5em;
        }
        .typewriter-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          margin-left: 6px;
          background: #F59E0B;
          vertical-align: middle;
          animation: blinkCursor 0.8s steps(2, start) infinite;
        }
        @keyframes fadeInText {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .subtitle-fade-in {
          opacity: 0;
          animation: fadeInText 1.0s forwards;
          animation-delay: 1.5s;
        }
      `}</style>
      {brandText.split('').map((char, i) => {
        if (char === ' ') {
          return <span key={i} className="typewriter-space" />;
        }
        return (
          <span
            key={i}
            className="typewriter-char"
            style={{
              animationDelay: `${350 + i * 85}ms`,
            }}
          >
            {char}
          </span>
        );
      })}
      <span className="typewriter-cursor" />
    </h1>
  );
}

/* ============================================
   LOADER COMPONENT (SUN RAYS REVEAL)
   ============================================ */
interface LoaderProps {
  isVisible: boolean;
  onHidden?: () => void;
}

const Loader = ({ isVisible, onHidden }: LoaderProps) => {
  // References for direct high-performance DOM manipulation
  const containerRef = useRef<HTMLDivElement>(null);
  const sunWrapperRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const corona1Ref = useRef<SVGGElement>(null);
  const corona2Ref = useRef<SVGGElement>(null);
  const flareRef = useRef<SVGRectElement>(null);
  const lightRaysRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const startTime = Date.now();

    const easeInOutCubic = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);

    let frameId: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;

      // 1. Slow, realistic corona rotation
      if (corona1Ref.current) {
        corona1Ref.current.style.transform = `rotate(${elapsed * 0.006}deg)`;
      }
      if (corona2Ref.current) {
        corona2Ref.current.style.transform = `rotate(${-elapsed * 0.009}deg)`;
      }

      // 2. Flare shimmer scale
      if (flareRef.current) {
        const flareScale = 1.0 + Math.sin(elapsed * 0.003) * 0.06;
        flareRef.current.style.transform = `scaleY(${flareScale})`;
      }

      // 4. Reveal Mask & Opacity Timelines
      let rayScale = 0;
      let rayRotation = 0;
      let rayOpacity = 0;

      if (isVisible !== false) {
        if (elapsed < 1400) {
          // Phase 1: Sun slowly rises in brightness (0ms - 1400ms)
          const pct = elapsed / 1400;
          const eased = easeInOutCubic(pct);

          if (sunWrapperRef.current) {
            sunWrapperRef.current.style.opacity = String(eased);
            sunWrapperRef.current.style.transform = `scale(${0.92 + eased * 0.08})`;
          }
        } else {
          // Phase 2: Volumetric rays shoot out on black loading screen (1400ms - 2200ms)
          if (sunWrapperRef.current) {
            sunWrapperRef.current.style.opacity = '1';
            sunWrapperRef.current.style.transform = 'scale(1)';
          }

          const pct = Math.min(1, (elapsed - 1400) / 800);
          const eased = easeOutQuad(pct);
          rayScale = eased * 1.3;
          rayRotation = eased * 15;
          rayOpacity = eased * 0.85;
        }

        // Update visual volumetric rays transform and opacity in sync
        if (lightRaysRef.current) {
          lightRaysRef.current.style.transform = `rotate(${rayRotation}deg) scale(${rayScale})`;
          lightRaysRef.current.style.opacity = String(rayOpacity);
        }

        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#030712]"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.6s ease-out',
        willChange: 'opacity',
      }}
      onTransitionEnd={(e) => {
        if (e.target === containerRef.current && !isVisible && onHidden) {
          onHidden();
        }
      }}
    >
      {/* Ambient volumetric solar glow background */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.06) 50%, transparent 70%)',
        }}
      />

      {/* Volumetric Sun Wrapper */}
      <div
        ref={sunWrapperRef}
        className="mb-8 relative z-10"
        style={{ opacity: 0, transform: 'scale(0.92)', willChange: 'opacity, transform' }}
      >
        <RealisticSun
          corona1Ref={corona1Ref}
          corona2Ref={corona2Ref}
          flareRef={flareRef}
          lightRaysRef={lightRaysRef}
        />
      </div>

      {/* Brand text typewriter & Subtitle block */}
      <div
        ref={textContainerRef}
        className="relative z-10 flex flex-col items-center select-none"
        style={{ willChange: 'opacity' }}
      >
        <TypewriterText />

        <div
          className="font-body text-[11px] sm:text-xs tracking-[0.35em] uppercase mt-3 subtitle-fade-in"
          style={{ color: '#64748B' }}
        >
          Hyderabad's Solar Experts
        </div>
      </div>
    </div>
  );
};

export default Loader;
