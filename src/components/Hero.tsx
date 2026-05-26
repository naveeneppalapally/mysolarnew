import * as React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SunParticles from './SunParticles';
import { scrollToSection } from '../lib/utils';
import { useCountUp } from '../hooks/useCountUp';

/* ============================================
   HEADLINE
   ============================================ */
const headlineLines = [
  'Power Your Home.',
  'Cut Bills by 90%.',
  'Start Today.',
];

function AnimatedHeadline() {
  return (
    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] sm:leading-[1.08] tracking-[-0.03em]">
      {headlineLines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className="block"
        >
          {line.split(' ').map((word, wordIdx) => (
            <span
              key={wordIdx}
              className={`inline-block mr-[0.3em] ${
                lineIdx === 1
                  ? 'bg-gradient-to-r from-solar-gold to-solar-gold-bright bg-clip-text text-transparent'
                  : 'text-solar-text'
              }`}
              style={{ display: 'inline-block' }}
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ============================================
   SOLAR PANEL SVG ILLUSTRATION (Rooftop Solar Array)
   ============================================ */
export function SolarPanelSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Glow and shadows */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#34D399" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        
        {/* Sky/Atmosphere dynamic gradient */}
        <radialGradient id="skyAtmosphere" cx="70%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#059669" stopOpacity="0.03" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Panel 3D bevel and frame */}
        <linearGradient id="panelBevel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D3A5D" />
          <stop offset="35%" stopColor="#1E2B4B" />
          <stop offset="100%" stopColor="#0B132B" />
        </linearGradient>

        {/* Silicon cell base gradient */}
        <linearGradient id="siliconCell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#122552" />
          <stop offset="50%" stopColor="#0A1838" />
          <stop offset="100%" stopColor="#050C1E" />
        </linearGradient>

        {/* Diagonal glass reflection */}
        <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
          <stop offset="30%" stopColor="rgba(255, 255, 255, 0.05)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>

        {/* Clean Energy Pulse */}
        <linearGradient id="energyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        {/* Lucide-like Glow filter */}
        <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Background Aura ── */}
      <circle cx="200" cy="200" r="185" fill="url(#sunGlow)" />
      <circle cx="200" cy="200" r="170" fill="url(#skyAtmosphere)" />

      {/* ── Floating Concentric Tech Orbits (Energy Rings) ── */}
      <g opacity="0.25">
        <circle cx="200" cy="200" r="140" stroke="var(--solar-border)" strokeWidth="1" strokeDasharray="5 15" />
        <ellipse cx="200" cy="200" rx="170" ry="85" stroke="var(--solar-border)" strokeWidth="1" strokeDasharray="8 6" transform="rotate(-15 200 200)" />
        <ellipse cx="200" cy="200" rx="145" ry="60" stroke="#34D399" strokeWidth="0.75" strokeDasharray="3 12" transform="rotate(25 200 200)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="25 200 200"
            to="385 200 200"
            dur="20s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>

      {/* ── Glowing Sun and Ray Arc ── */}
      <g filter="url(#vectorGlow)" opacity="0.85">
        {/* Sun source */}
        <circle cx="310" cy="90" r="18" fill="url(#energyGold)" />
        {/* Radiating particle circles */}
        <circle cx="310" cy="90" r="30" stroke="#34D399" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.5">
          <animate attributeName="r" values="24;42;24" dur="4s" repeatCount="indefinite" />
        </circle>
        
        {/* Sun rays sweeping from top right */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={310 + Math.cos(rad) * 22}
              y1={90 + Math.sin(rad) * 22}
              x2={310 + Math.cos(rad) * 38}
              y2={90 + Math.sin(rad) * 38}
              stroke="#34D399"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.8;0.2"
                dur="2.5s"
                begin={`${i * 0.2}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
      </g>

      {/* ── Pure Floating 3D Solar Array (Tilted Perspective) ── */}
      {/* Skewed and translated group to float cleanly in center without base stands */}
      <g transform="translate(60, 95)" filter="drop-shadow(0 25px 30px rgba(0,0,0,0.45))">
        
        {/* 3D Depth Plate Behind Frame (Bevel Edge) */}
        <polygon
          points="15,225 265,225 278,215 28,215"
          fill="#0B132B"
        />
        <polygon
          points="265,25 278,15 278,215 265,225"
          fill="#1E2B4B"
        />

        {/* Main Panel Outer Frame */}
        <polygon
          points="0,210 250,210 265,10 15,10"
          fill="url(#panelBevel)"
          stroke="#475B82"
          strokeWidth="1.5"
        />

        {/* Inner Panel Grid Grid Area */}
        <polygon
          points="8,202 242,202 255,18 21,18"
          fill="#050C1E"
        />

        {/* Silicon Cells (3 Columns x 2 Rows Representation) with perspective */}
        {/* Cell 1: Top-Left */}
        <polygon
          points="25,105 92,105 97,22 30,22"
          fill="url(#siliconCell)"
          stroke="#2A3F6D"
          strokeWidth="0.75"
        />
        <polygon points="25,105 92,105 97,22 30,22" fill="url(#glassReflection)" />

        {/* Cell 2: Top-Middle */}
        <polygon
          points="98,105 165,105 170,22 103,22"
          fill="url(#siliconCell)"
          stroke="#2A3F6D"
          strokeWidth="0.75"
        />
        <polygon points="98,105 165,105 170,22 103,22" fill="url(#glassReflection)" />

        {/* Cell 3: Top-Right */}
        <polygon
          points="171,105 238,105 243,22 176,22"
          fill="url(#siliconCell)"
          stroke="#2A3F6D"
          strokeWidth="0.75"
        />
        <polygon points="171,105 238,105 243,22 176,22" fill="url(#glassReflection)" />

        {/* Cell 4: Bottom-Left */}
        <polygon
          points="18,198 87,198 91,111 22,111"
          fill="url(#siliconCell)"
          stroke="#2A3F6D"
          strokeWidth="0.75"
        />
        <polygon points="18,198 87,198 91,111 22,111" fill="url(#glassReflection)" />

        {/* Cell 5: Bottom-Middle */}
        <polygon
          points="93,198 162,198 166,111 97,111"
          fill="url(#siliconCell)"
          stroke="#2A3F6D"
          strokeWidth="0.75"
        />
        <polygon points="93,198 162,198 166,111 97,111" fill="url(#glassReflection)" />

        {/* Cell 6: Bottom-Right */}
        <polygon
          points="168,198 237,198 241,111 172,111"
          fill="url(#siliconCell)"
          stroke="#2A3F6D"
          strokeWidth="0.75"
        />
        <polygon points="168,198 237,198 241,111 172,111" fill="url(#glassReflection)" />

        {/* Cell Grid Lines and Busbars (Golden Highlights) */}
        <g stroke="#10B981" strokeWidth="0.5" opacity="0.35">
          {/* Main vertical busbars */}
          <line x1="59" y1="20" x2="52" y2="200" />
          <line x1="134" y1="20" x2="128" y2="200" strokeWidth="0.75" />
          <line x1="209" y1="20" x2="203" y2="200" />
        </g>

        {/* Glowing Energy Grid Nodes */}
        <g filter="url(#vectorGlow)">
          <circle cx="131" cy="110" r="3.5" fill="#34D399" />
          <circle cx="56" cy="110" r="2.5" fill="#34D399" />
          <circle cx="206" cy="110" r="2.5" fill="#34D399" />
          
          <circle cx="131" cy="110" r="6" stroke="#34D399" strokeWidth="0.5" opacity="0.5">
            <animate attributeName="r" values="3;9;3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Golden Sweep Sheen Overlay across entire array */}
        <polygon
          points="0,210 250,210 265,10 15,10"
          fill="url(#glassReflection)"
          opacity="0.7"
          pointerEvents="none"
        />
      </g>

      {/* ── Orbiting Clean Energy Particle (Animated Ring Flight) ── */}
      <g filter="url(#vectorGlow)">
        {/* Glowing flight particle */}
        <circle cx="200" cy="200" r="4" fill="#34D399">
          <animateMotion
            path="M -135,0 A 135,50 0 1,1 135,0 A 135,50 0 1,1 -135,0"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="200" r="8" stroke="#34D399" strokeWidth="0.5" opacity="0.5">
          <animateMotion
            path="M -135,0 A 135,50 0 1,1 135,0 A 135,50 0 1,1 -135,0"
            dur="6s"
            repeatCount="indefinite"
          />
          <animate attributeName="r" values="4;10;4" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ── Lightning Core Floating Energy Bolt Emblem ── */}
      <g transform="translate(182, 335) scale(1.3)" filter="url(#vectorGlow)">
        <circle cx="12" cy="12" r="11" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.75" />
        <path
          d="M12 2 L6 12 L11 12 L8 22 L18 10 L13 10 L16 2 Z"
          fill="#34D399"
          opacity="0.9"
        >
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

/* ============================================
   TRUST BADGES
   ============================================ */
const trustBadges = [
  'TSSPDCL & TSNPDCL Approved',
  'MNRE Empanelled',
  'PM Surya Ghar Registered',
  'TSREDCO Empanelled',
];

/* ============================================
   STAT ITEM
   ============================================ */
interface StatConfig {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

const statsData: StatConfig[] = [
  { end: 15, suffix: '+', label: 'Installations' },
  { end: 70, suffix: ' kW', label: 'Capacity Installed' },
  { end: 78, prefix: '₹', suffix: 'K', label: 'Max Subsidy' },
  { end: 25, suffix: ' Yr', label: 'Panel Warranty' },
];

function StatItem({ end, prefix = '', suffix = '', label, decimals = 0 }: StatConfig) {
  const { ref, displayValue } = useCountUp({ end, prefix, suffix, decimals, duration: 2200 });
  return (
    <div className="text-center px-3 py-2">
      <p ref={ref as React.RefObject<HTMLParagraphElement>} className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--solar-gold)' }}>
        {displayValue}
      </p>
      <p className="text-solar-text-muted text-[11px] sm:text-xs mt-0.5 font-body">{label}</p>
    </div>
  );
}

/* ============================================
   HERO
   ============================================ */
export default function Hero() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [hidePanel, setHidePanel] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobileDevice = 
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
      ('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0);
    
    // Hide panel on all mobile/touch devices (both normal mobile view and desktop site mode)
    setHidePanel(isMobileDevice);
  }, []);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize coordinates
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);
    
    setTilt({
      x: -normY * 15, // tilt up/down
      y: normX * 15,  // tilt left/right
    });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <section id="home" className="relative overflow-visible" style={{ background: 'var(--solar-bg)', paddingTop: 'calc(4rem + 0.25rem)' }}>
      {/* Cinematic particles background */}
      <SunParticles />

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse at 80% 15%, rgba(16,185,129,0.08) 0%, transparent 55%)' }} />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="section-wrapper w-full !pt-6 md:!pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

            {/* LEFT: Text */}
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Badge */}
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border" style={{ color: 'var(--gold-heading)', borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.05)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-solar-emerald animate-pulse" />
                  Hyderabad's Trusted Solar Installer
                </span>
              </div>

              <AnimatedHeadline />

              <p className="text-solar-text-muted text-sm sm:text-base max-w-lg leading-relaxed font-body">
                MNRE empanelled, DISCOM-approved. Residential 3–10 kW systems.
                We handle <strong className="text-solar-text font-medium">100% subsidy paperwork</strong> — PM Surya Ghar up to ₹78,000.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => scrollToSection('contact')} className="shimmer-btn px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer">
                  Get Free Quote →
                </button>
                <button onClick={() => scrollToSection('process')} className="outline-btn px-6 py-3 rounded-xl text-sm cursor-pointer">
                  How It Works
                </button>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                {trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-solar-emerald flex-shrink-0" />
                    <span className="text-xs text-solar-text-muted font-body">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Icon-type animated solar panel SVG with parallax tilt (hidden ONLY in mobile Chrome desktop site mode) */}
            {!hidePanel && (
              <div className="flex justify-center items-center mt-6 lg:mt-0">
                <div
                  ref={panelRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[360px] relative animate-float cursor-grab active:cursor-grabbing"
                  style={{
                    perspective: '1000px',
                  }}
                >
                  <motion.div
                    style={{
                      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                      transition: 'transform 0.15s ease-out',
                      transformStyle: 'preserve-3d',
                    }}
                    className="w-full relative z-10"
                  >
                    <SolarPanelSVG />
                  </motion.div>
                  {/* Modern subtle ambient glow behind the SVG */}
                  <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-solar-gold/20 to-solar-emerald/10 blur-2xl opacity-70 z-0 pointer-events-none" />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 w-full mt-6 md:mt-10 pb-6 md:pb-8">
        <div className="section-wrapper !py-0 !pb-4 md:!pb-5">
          <div className="glass-card px-4 py-3 md:px-8 md:py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 md:divide-x" style={{ borderColor: 'var(--solar-border)' }}>
              {statsData.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
