import * as React from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SunParticles from './SunParticles';
import { scrollToSection } from '../lib/utils';
import { useCountUp } from '../hooks/useCountUp';
import { useTheme } from '../context/ThemeContext';

/* ============================================
   ANIMATED HEADLINE — Clip-reveal per word
   ============================================ */
const headlineLines = [
  { text: 'Harness The', isGold: false },
  { text: 'Power Of The Sun', isGold: true },
  { text: 'Save Up To 90%', isGold: false },
];

function AnimatedHeadline() {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });

  let globalWordIndex = 0;

  return (
    <h1
      ref={ref}
      className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.08] tracking-[-0.03em]"
    >
      {headlineLines.map((line, lineIdx) => {
        const words = line.text.split(' ');
        return (
          <span key={lineIdx} className="block overflow-hidden">
            {words.map((word, wordIdx) => {
              const delay = globalWordIndex * 0.08;
              globalWordIndex++;
              return (
                <span
                  key={wordIdx}
                  className="inline-block overflow-hidden mr-[0.3em]"
                >
                  <motion.span
                    className={`inline-block ${
                      line.isGold
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent'
                        : 'text-solar-text'
                    }`}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

/* ============================================
   SOLAR PANEL SVG — Gold/Amber Theme
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
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        
        {/* Sky/Atmosphere dynamic gradient */}
        <radialGradient id="skyAtmosphere" cx="70%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#D97706" stopOpacity="0.03" />
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

        {/* Clean Energy Pulse — Gold */}
        <linearGradient id="energyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Glow filter */}
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

      {/* ── Floating Concentric Tech Orbits ── */}
      <g opacity="0.25">
        <circle cx="200" cy="200" r="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="5 15" />
        <ellipse cx="200" cy="200" rx="170" ry="85" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="8 6" transform="rotate(-15 200 200)" />
        <ellipse cx="200" cy="200" rx="145" ry="60" stroke="#FBBF24" strokeWidth="0.75" strokeDasharray="3 12" transform="rotate(25 200 200)">
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
        <circle cx="310" cy="90" r="18" fill="url(#energyGold)" />
        <circle cx="310" cy="90" r="30" stroke="#FBBF24" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.5">
          <animate attributeName="r" values="24;42;24" dur="4s" repeatCount="indefinite" />
        </circle>
        
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={310 + Math.cos(rad) * 22}
              y1={90 + Math.sin(rad) * 22}
              x2={310 + Math.cos(rad) * 38}
              y2={90 + Math.sin(rad) * 38}
              stroke="#FBBF24"
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

      {/* ── Floating 3D Solar Array ── */}
      <g transform="translate(60, 95)" filter="drop-shadow(0 25px 30px rgba(0,0,0,0.45))">
        {/* 3D Depth Plate */}
        <polygon points="15,225 265,225 278,215 28,215" fill="#0B132B" />
        <polygon points="265,25 278,15 278,215 265,225" fill="#1E2B4B" />

        {/* Main Panel Outer Frame */}
        <polygon points="0,210 250,210 265,10 15,10" fill="url(#panelBevel)" stroke="#475B82" strokeWidth="1.5" />

        {/* Inner Panel Grid Area */}
        <polygon points="8,202 242,202 255,18 21,18" fill="#050C1E" />

        {/* Silicon Cells */}
        <polygon points="25,105 92,105 97,22 30,22" fill="url(#siliconCell)" stroke="#2A3F6D" strokeWidth="0.75" />
        <polygon points="25,105 92,105 97,22 30,22" fill="url(#glassReflection)" />

        <polygon points="98,105 165,105 170,22 103,22" fill="url(#siliconCell)" stroke="#2A3F6D" strokeWidth="0.75" />
        <polygon points="98,105 165,105 170,22 103,22" fill="url(#glassReflection)" />

        <polygon points="171,105 238,105 243,22 176,22" fill="url(#siliconCell)" stroke="#2A3F6D" strokeWidth="0.75" />
        <polygon points="171,105 238,105 243,22 176,22" fill="url(#glassReflection)" />

        <polygon points="18,198 87,198 91,111 22,111" fill="url(#siliconCell)" stroke="#2A3F6D" strokeWidth="0.75" />
        <polygon points="18,198 87,198 91,111 22,111" fill="url(#glassReflection)" />

        <polygon points="93,198 162,198 166,111 97,111" fill="url(#siliconCell)" stroke="#2A3F6D" strokeWidth="0.75" />
        <polygon points="93,198 162,198 166,111 97,111" fill="url(#glassReflection)" />

        <polygon points="168,198 237,198 241,111 172,111" fill="url(#siliconCell)" stroke="#2A3F6D" strokeWidth="0.75" />
        <polygon points="168,198 237,198 241,111 172,111" fill="url(#glassReflection)" />

        {/* Cell Grid Lines — Gold Busbars */}
        <g stroke="#F59E0B" strokeWidth="0.5" opacity="0.35">
          <line x1="59" y1="20" x2="52" y2="200" />
          <line x1="134" y1="20" x2="128" y2="200" strokeWidth="0.75" />
          <line x1="209" y1="20" x2="203" y2="200" />
        </g>

        {/* Glowing Energy Grid Nodes — Gold */}
        <g filter="url(#vectorGlow)">
          <circle cx="131" cy="110" r="3.5" fill="#FBBF24" />
          <circle cx="56" cy="110" r="2.5" fill="#FBBF24" />
          <circle cx="206" cy="110" r="2.5" fill="#FBBF24" />
          <circle cx="131" cy="110" r="6" stroke="#FBBF24" strokeWidth="0.5" opacity="0.5">
            <animate attributeName="r" values="3;9;3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Glass Sheen */}
        <polygon points="0,210 250,210 265,10 15,10" fill="url(#glassReflection)" opacity="0.7" pointerEvents="none" />
      </g>

      {/* ── Orbiting Energy Particle ── */}
      <g filter="url(#vectorGlow)">
        <circle cx="200" cy="200" r="4" fill="#FBBF24">
          <animateMotion
            path="M -135,0 A 135,50 0 1,1 135,0 A 135,50 0 1,1 -135,0"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="200" r="8" stroke="#FBBF24" strokeWidth="0.5" opacity="0.5">
          <animateMotion
            path="M -135,0 A 135,50 0 1,1 135,0 A 135,50 0 1,1 -135,0"
            dur="6s"
            repeatCount="indefinite"
          />
          <animate attributeName="r" values="4;10;4" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ── Lightning Energy Bolt Emblem ── */}
      <g transform="translate(182, 335) scale(1.3)" filter="url(#vectorGlow)">
        <circle cx="12" cy="12" r="11" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.2)" strokeWidth="0.75" />
        <path
          d="M12 2 L6 12 L11 12 L8 22 L18 10 L13 10 L16 2 Z"
          fill="#FBBF24"
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
  'TSREDCO Empanelled',
  'MNRE Empanelled (TSRE260875)',
  'TSSPDCL & TSNPDCL Approved',
  'PM Surya Ghar Registered',
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
  { end: 70, suffix: '+ kW', label: 'Capacity Installed' },
  { end: 25, suffix: ' Year', label: 'Warranty' },
  { end: 4.8, suffix: '★', label: 'Rating', decimals: 1 },
];

function StatItem({ end, prefix = '', suffix = '', label, decimals = 0 }: StatConfig) {
  const { ref, displayValue } = useCountUp({ end, prefix, suffix, decimals, duration: 2200 });
  return (
    <div className="text-center px-4 py-3">
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {displayValue}
      </p>
      <p className="text-solar-text-dim text-[11px] sm:text-xs mt-1 font-body tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}

/* ============================================
   SHIMMER BUTTON
   ============================================ */
function ShimmerButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`magnetic relative overflow-hidden font-heading font-semibold px-8 py-4 rounded-xl text-sm cursor-pointer ${className}`}
      style={{
        background: 'linear-gradient(135deg, #F59E0B, #D97706)',
        color: '#030712',
        boxShadow: '0 4px 24px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 8px 32px rgba(245,158,11,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={{ transform: ['translateX(-100%)', 'translateX(200%)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
    </motion.button>
  );
}

/* ============================================
   HERO COMPONENT
   ============================================ */
export default function Hero() {
  const { theme } = useTheme();
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [hidePanel, setHidePanel] = React.useState(false);
  const badgeRef = React.useRef<HTMLSpanElement>(null);
  const badgeInView = useInView(badgeRef, { once: true });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobileDevice =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    const timer = setTimeout(() => {
      setHidePanel(isMobileDevice);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = panelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const normX = x / (rect.width / 2);
      const normY = y / (rect.height / 2);
      setTilt({ x: -normY * 15, y: normX * 15 });
    },
    []
  );

  const handleMouseLeave = React.useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex flex-col"
      style={{ background: 'var(--solar-bg)', paddingTop: 'calc(4rem + 0.25rem)' }}
    >
      {/* Particle background */}
      <SunParticles />

      {/* Premium Trifold "Solar Eclipse" Aura Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden flex items-center justify-center">
        {/* Massive circular purple-indigo atmosphere background */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, var(--solar-purple) 0%, var(--solar-indigo) 50%, transparent 70%)',
            transform: 'translate(30%, -20%)',
            opacity: theme === 'light' ? 0.35 : 0.35,
          }}
        />
        
        {/* The Solar Eclipse Core (behind the panels on the right side) */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full flex items-center justify-center opacity-50 blur-[40px]"
          style={{
            transform: 'translate(35%, -10%)',
          }}
        >
          {/* Glowing Gold Ring */}
          <div className="absolute w-[270px] h-[270px] rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 blur-[8px] animate-glow-pulse" style={{ opacity: theme === 'light' ? 0.55 : 0.35 }} />
          
          {/* Glowing Purple atmospheric halo */}
          <div className="absolute w-[365px] h-[365px] rounded-full bg-indigo-600/30 blur-[24px]" />
          
          {/* The Moon / Dark Silicon Center Disc */}
          <div className="absolute w-[248px] h-[248px] rounded-full bg-solar-bg-secondary border border-solar-border shadow-[inset_0_4px_16px_rgba(255,255,255,0.02)]" />
        </div>
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full flex-1 flex items-center">
        <div className="section-wrapper w-full !py-8 md:!py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT: Text content */}
            <motion.div
              className="flex flex-col gap-5 md:gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  ref={badgeRef}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-full border"
                  style={{
                    color: '#F59E0B',
                    borderColor: 'rgba(245,158,11,0.25)',
                    background: 'rgba(245,158,11,0.06)',
                    boxShadow: badgeInView
                      ? '0 0 20px rgba(245,158,11,0.1), inset 0 0 20px rgba(245,158,11,0.03)'
                      : 'none',
                    transition: 'box-shadow 1s ease',
                  }}
                >
                  <span className="text-sm">☀️</span>
                  Telangana's Authorised Solar Vendor
                </span>
              </motion.div>

              {/* Headline */}
              <AnimatedHeadline />

              {/* Subheadline */}
              <motion.p
                className="text-solar-text-muted text-sm sm:text-base max-w-lg leading-relaxed font-body"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Government subsidies up to{' '}
                <strong className="text-solar-text font-medium">₹78,000</strong>. MNRE
                Empanelled Vendor (TSRE260875) serving Hyderabad, Mancherial, Rangareddy, and Medchal. We handle{' '}
                <strong className="text-solar-text font-medium">100% paperwork</strong>.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 mt-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ShimmerButton onClick={() => scrollToSection('calculator')}>
                  Calculate Your Savings →
                </ShimmerButton>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="magnetic font-heading font-semibold px-8 py-4 rounded-xl text-sm cursor-pointer border"
                  style={{
                    borderColor: 'var(--solar-border)',
                    color: 'var(--solar-text)',
                    background: 'transparent',
                  }}
                  whileHover={{
                    borderColor: 'rgba(245,158,11,0.5)',
                    color: '#F59E0B',
                    background: 'rgba(245,158,11,0.05)',
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Free Consultation
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap gap-x-5 gap-y-2.5 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {trustBadges.map((badge, i) => (
                  <motion.div
                    key={badge}
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.06 }}
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: '#F59E0B' }}
                    />
                    <span className="text-xs text-solar-text-muted font-body">{badge}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: Solar Panel SVG (desktop only) */}
            {!hidePanel && (
              <motion.div
                className="hidden lg:flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  ref={panelRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full max-w-[380px] relative cursor-grab active:cursor-grabbing"
                  style={{ perspective: '1000px' }}
                >
                  {/* Float animation wrapper */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
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
                  </motion.div>

                  {/* Ambient glow behind SVG */}
                  <div
                    className="absolute -inset-8 rounded-[32px] blur-3xl opacity-60 z-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.05) 50%, transparent 70%)',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 w-full pb-6 md:pb-10">
        <div className="section-wrapper !py-0">
          <motion.div
            className="rounded-2xl border px-4 py-4 md:px-8 md:py-5 border-solar-border bg-solar-card backdrop-blur-xl"
            style={{
              boxShadow: 'var(--shadow-card-lg)',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 md:divide-x divide-solar-border">
              {statsData.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
