import { useRef, useEffect } from 'react';
import { useSolarTime } from '../context/SolarTimeContext';
import { useBackgroundSettings } from '../context/BackgroundSettingsContext';
import type { SolarPhase } from '../context/SolarTimeContext';
import { useTheme } from '../context/ThemeContext';

/* ===========================================================
   MULTI-MODE INTERACTIVE BACKGROUND CANVAS — 12 MODES
   =========================================================== */

interface EnergyPulse {
  x: number;
  y: number;
  direction: 'h' | 'v';
  speed: number;
  length: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  angle: number;
  speed: number;
}

interface LavaBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseOffset: number;
}

interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  lastUpdate: number;
}

interface PrismaticShard {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  color: string;
  sides: number;
}

const GRID_SPACING = 60;

// Style-specific locked color palettes to deliver 100% radical visual differences out-of-the-box
const CYBER_GRID_PALETTE = ['#8B5CF6', '#4F46E5', '#fbbf24', '#f97316']; // Royal Purple, Deep Indigo, Satin Gold nodes

const PALETTES: Record<SolarPhase, string[]> = {
  dawn:  ['#fbbf24', '#f59e0b', '#f97316', '#8b5cf6'], /* Champagne Gold, Amber, Orange, Amethyst Purple */
  noon:  ['#FFFFFF', '#FFFBEB', '#fbbf24', '#f59e0b'], /* Diamond White, Champagne, Solar Gold */
  dusk:  ['#8b5cf6', '#a78bfa', '#6366f1', '#fbbf24'], /* Royal Purple, Amethyst, Royal Indigo, Champagne Gold */
  night: ['#4f46e5', '#6366f1', '#1e1b4b', '#8b5cf6'], /* Deep Indigo, Royal Purple, Amethyst, Obsidian Slate */
};

// Richer, high-visibility palettes for Light Mode so elements don't wash out on light backdrops
const LIGHT_PALETTES: Record<SolarPhase, string[]> = {
  dawn:  ['#8b5cf6', '#7c3aed', '#a78bfa', '#d946ef'], /* Amethyst Purple, Royal Purple, Lavender, Orchid Pink */
  noon:  ['#7c3aed', '#8b5cf6', '#c084fc', '#d97706'], /* Royal Purple, Amethyst, Light Amethyst, Gold */
  dusk:  ['#8b5cf6', '#a78bfa', '#d8b4fe', '#db2777'], /* Amethyst, Lavender, Pale Amethyst, Rich Rose */
  night: ['#7c3aed', '#8b5cf6', '#a78bfa', '#6d28d9'], /* Royal Purple, Amethyst, Lavender, Deep Velvet Purple */
};

export default function SunParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // Settings Context values
  const { backgroundStyle, particleCount, speedMultiplier } = useBackgroundSettings();
  const { currentPhase } = useSolarTime();

  // Settings Context values as refs synchronized within an effect
  const styleRef = useRef(backgroundStyle);
  const countRef = useRef(particleCount);
  const speedRef = useRef(speedMultiplier);
  const phaseRef = useRef(currentPhase);
  const themeRef = useRef(theme);

  useEffect(() => {
    styleRef.current = backgroundStyle;
    countRef.current = particleCount;
    speedRef.current = speedMultiplier;
    phaseRef.current = currentPhase;
    themeRef.current = theme;
  }, [backgroundStyle, particleCount, speedMultiplier, currentPhase, theme]);
  
  const timeRef = useRef(0);
  const pulsesRef = useRef<EnergyPulse[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });
  const animFrameRef = useRef<number>(0);

  // Handle mouse movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    // Local physics data structures (captured in effect closure, re-initialized on resize)
    let lavaBlobs: LavaBlob[] = [];
    let matrixDrops: MatrixDrop[] = [];
    let crystalShards: PrismaticShard[] = [];

    // Helper: Get active theme and phase adapted colors dynamically
    const getColors = () => {
      const currentPhase = phaseRef.current;
      const isLight = themeRef.current === 'light';
      const palette = isLight ? LIGHT_PALETTES : PALETTES;
      return palette[currentPhase] || palette.noon;
    };

    // Helper: Initialize particles array
    const initParticles = (width: number, height: number) => {
      const particles: Particle[] = [];
      const colors = getColors();
      const count = countRef.current;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 0.8 + Math.random() * 2.2,
          alpha: themeRef.current === 'light' ? 0.35 + Math.random() * 0.50 : 0.1 + Math.random() * 0.5,
          baseAlpha: themeRef.current === 'light' ? 0.30 + Math.random() * 0.40 : 0.1 + Math.random() * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)] || '#FBBF24',
          angle: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.35,
        });
      }
      particlesRef.current = particles;
    };

    // Helper: Initialize Liquid Lava Blobs
    const initLavaBlobs = (width: number, height: number) => {
      const list: LavaBlob[] = [];
      const colors = getColors();
      const count = Math.max(5, Math.floor(countRef.current / 5));
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: 60 + Math.random() * 90,
          color: colors[Math.floor(Math.random() * colors.length)] || '#FBBF24',
          pulseOffset: Math.random() * Math.PI * 2
        });
      }
      return list;
    };

    // Helper: Initialize falling telemetry rain matrix
    const initDigitalRain = (width: number) => {
      const list: MatrixDrop[] = [];
      const count = Math.max(5, Math.min(Math.ceil(width / 22), Math.floor(countRef.current / 3)));
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * -1000,
          speed: 1.8 + Math.random() * 3.5,
          chars: Array.from({ length: 15 }, () => getRandomTelemetryChar()),
          lastUpdate: 0
        });
      }
      return list;
    };

    // Helper: Initialize Rotating crystal shards
    const initCrystalShards = (width: number, height: number) => {
      const list: PrismaticShard[] = [];
      const colors = getColors();
      const count = Math.max(2, Math.floor(countRef.current / 15));
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 110 + Math.random() * 150,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.002,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          color: colors[Math.floor(Math.random() * colors.length)] || '#FBBF24',
          sides: Math.random() > 0.5 ? 3 : 4 
        });
      }
      return list;
    };

    // Matrix character generator
    const getRandomTelemetryChar = () => {
      const chars = [
        '0', '1', '7E', 'A5', 'FF', 'C4', '☀️', '⚡', '⎔', '◆', 
        'P', 'W', 'V', 'A', 'SYS', 'OK', 'GEN', 'GRID', 'SOLAR'
      ];
      return chars[Math.floor(Math.random() * chars.length)] || '1';
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize all physics systems with fresh canvas bounds
      initParticles(w, h);
      lavaBlobs = initLavaBlobs(w, h);
      matrixDrops = initDigitalRain(w);
      crystalShards = initCrystalShards(w, h);
    };

    resize();
    pulsesRef.current = [];

    // ============================================================
    // 12 RENDERING HELPERS (Closure-based, accessing w & h)
    // ============================================================

    // 1. Particle System (classic-network / cosmic-wind / gradient-embers)
    const drawParticlesSystem = (
      enableMouseInteract: boolean
    ) => {
      const particles = particlesRef.current;
      const colors = getColors();
      const targetCount = countRef.current;
      const speed = speedRef.current;

      // Adjust particle count dynamically on-the-fly
      if (particles.length < targetCount) {
        for (let i = particles.length; i < targetCount; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: 0.8 + Math.random() * 2.2,
            alpha: themeRef.current === 'light' ? 0.35 + Math.random() * 0.50 : 0.1 + Math.random() * 0.5,
            baseAlpha: themeRef.current === 'light' ? 0.30 + Math.random() * 0.40 : 0.1 + Math.random() * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)] || '#FBBF24',
            angle: Math.random() * Math.PI * 2,
            speed: 0.15 + Math.random() * 0.35,
          });
        }
      } else if (particles.length > targetCount) {
        particles.length = targetCount;
      }

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.angle += 0.005 * speed;
        p.x += (Math.cos(p.angle) * p.speed + p.vx) * speed;
        p.y += (Math.sin(p.angle) * p.speed + p.vy) * speed;

        if (enableMouseInteract && mouseRef.current.x > 0) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            p.x += (dx / dist) * force * 1.5 * speed;
            p.y += (dy / dist) * force * 1.5 * speed;
          }
        }

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const breathing = Math.sin(timeRef.current * 0.01 + i) * 0.08;
        const currentAlpha = Math.max(0.02, Math.min(0.8, p.baseAlpha + breathing));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, currentAlpha);
        ctx.fill();

        if (p.radius > 2.0) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
          glow.addColorStop(0, hexToRgba(p.color, currentAlpha * 0.35));
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }
    };

    // 3. Silicon Cyber Grid
    const drawSiliconGrid = () => {
      const speed = speedRef.current;
      const targetCount = countRef.current;
      
      const isLight = themeRef.current === 'light';
      const gridColor = isLight ? '#7c3aed' : CYBER_GRID_PALETTE[0]; // Amethyst purple in light mode
      const gridAlpha = isLight ? 0.20 : 0.05;
      ctx.strokeStyle = hexToRgba(gridColor, gridAlpha);
      ctx.lineWidth = 0.5;

      for (let x = GRID_SPACING; x < w; x += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = GRID_SPACING; y < h; y += GRID_SPACING) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw intersection nodes (amethyst lavender in light mode, orange in dark mode)
      const nodeColor = isLight ? '#a78bfa' : CYBER_GRID_PALETTE[3];
      const nodeAlpha = isLight ? 0.24 : 0.12;
      for (let x = GRID_SPACING; x < w; x += GRID_SPACING) {
        for (let y = GRID_SPACING; y < h; y += GRID_SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(nodeColor, nodeAlpha);
          ctx.fill();
        }
      }

      const maxPulses = Math.max(4, Math.floor(targetCount / 4));
      
      if (pulsesRef.current.length < maxPulses && Math.random() < 0.03 * speed) {
        const isHorizontal = Math.random() > 0.5;
        // Pulse color: Amethyst variants in light theme, Cyan/Neon-Blue variants in dark theme
        const color = isLight 
          ? ['#7c3aed', '#8b5cf6', '#a78bfa'][Math.floor(Math.random() * 3)]
          : (CYBER_GRID_PALETTE[Math.floor(Math.random() * 3)] || '#00F5FF');

        if (isHorizontal) {
          const gridRow = Math.floor(Math.random() * (h / GRID_SPACING)) + 1;
          const y = gridRow * GRID_SPACING;
          const goRight = Math.random() > 0.5;

          pulsesRef.current.push({
            x: goRight ? -40 : w + 40,
            y,
            direction: 'h',
            speed: (goRight ? 1 : -1) * (1.2 + Math.random() * 2.2) * speed,
            length: 80 + Math.random() * 120,
            alpha: 0.25 + Math.random() * 0.35,
            life: 350 + Math.random() * 150,
            maxLife: 350 + Math.random() * 150,
            color,
          });
        } else {
          const gridCol = Math.floor(Math.random() * (w / GRID_SPACING)) + 1;
          const x = gridCol * GRID_SPACING;
          const goDown = Math.random() > 0.5;

          pulsesRef.current.push({
            x,
            y: goDown ? -40 : h + 40,
            direction: 'v',
            speed: (goDown ? 1 : -1) * (1.2 + Math.random() * 2.2) * speed,
            length: 80 + Math.random() * 120,
            alpha: 0.25 + Math.random() * 0.35,
            life: 350 + Math.random() * 150,
            maxLife: 350 + Math.random() * 150,
            color,
          });
        }
      }

      const pulses = pulsesRef.current;
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.life -= 1;

        if (p.life <= 0) {
          pulses.splice(i, 1);
          continue;
        }

        if (p.direction === 'h') {
          p.x += p.speed;
        } else {
          p.y += p.speed;
        }

        if (p.x < -p.length - 50 || p.x > w + p.length + 50 ||
            p.y < -p.length - 50 || p.y > h + p.length + 50) {
          pulses.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const fadeAlpha = p.alpha * Math.min(1, lifeRatio * 4);

        if (p.direction === 'h') {
          const tailX = p.x - (p.speed > 0 ? p.length : -p.length);
          const grad = ctx.createLinearGradient(tailX, p.y, p.x, p.y);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(0.7, hexToRgba(p.color, fadeAlpha * 0.4));
          grad.addColorStop(1, hexToRgba(p.color, fadeAlpha));

          ctx.beginPath();
          ctx.moveTo(tailX, p.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          const headGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
          headGlow.addColorStop(0, hexToRgba('#FFFFFF', fadeAlpha * 0.85));
          headGlow.addColorStop(0.3, hexToRgba(p.color, fadeAlpha * 0.6));
          headGlow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = headGlow;
          ctx.fill();
        } else {
          const tailY = p.y - (p.speed > 0 ? p.length : -p.length);
          const grad = ctx.createLinearGradient(p.x, tailY, p.x, p.y);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(0.7, hexToRgba(p.color, fadeAlpha * 0.4));
          grad.addColorStop(1, hexToRgba(p.color, fadeAlpha));

          ctx.beginPath();
          ctx.moveTo(p.x, tailY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          const headGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
          headGlow.addColorStop(0, hexToRgba('#FFFFFF', fadeAlpha * 0.85));
          headGlow.addColorStop(0.3, hexToRgba(p.color, fadeAlpha * 0.6));
          headGlow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = headGlow;
          ctx.fill();
        }

        const nearX = Math.round(p.x / GRID_SPACING) * GRID_SPACING;
        const nearY = Math.round(p.y / GRID_SPACING) * GRID_SPACING;
        const dist = Math.sqrt((p.x - nearX) ** 2 + (p.y - nearY) ** 2);

        if (dist < 15) {
          const intensity = (1 - dist / 15) * fadeAlpha;
          const nodeGlow = ctx.createRadialGradient(nearX, nearY, 0, nearX, nearY, 10);
          nodeGlow.addColorStop(0, hexToRgba(p.color, intensity * 0.8));
          nodeGlow.addColorStop(0.5, hexToRgba(p.color, intensity * 0.25));
          nodeGlow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(nearX, nearY, 10, 0, Math.PI * 2);
          ctx.fillStyle = nodeGlow;
          ctx.fill();
        }
      }
    };

    // 2. Solar Energy Waves
    const drawEnergyWaves = () => {
      const t = timeRef.current;
      const speed = speedRef.current;
      const colors = getColors();
      
      ctx.lineWidth = 2.0;
      for (let i = 0; i < 3; i++) {
        const color = colors[i % colors.length] || '#FBBF24';
        ctx.beginPath();
        const baseline = h * (0.35 + i * 0.15);
        const amplitude = 30 + i * 15;
        const freq = 0.002 + i * 0.0015;
        const waveSpeed = 0.015 - i * 0.004;
        
        ctx.moveTo(0, baseline + Math.sin(t * waveSpeed * speed) * amplitude);
        for (let x = 0; x < w; x += 10) {
          const y = baseline + Math.sin(x * freq + t * waveSpeed * speed) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hexToRgba(color, 0.08);
        ctx.stroke();
        
        // Glowing shadow line
        ctx.lineWidth = 6.0;
        ctx.strokeStyle = hexToRgba(color, 0.03);
        ctx.stroke();
        ctx.lineWidth = 2.0;
      }
    };

    // 5. Magnetic Flux Loops
    const drawMagneticFlux = () => {
      const t = timeRef.current;
      const speed = speedRef.current;
      const colors = getColors();
      
      const cx = w * 0.8;
      const cy = h * 0.15;
      ctx.lineWidth = 0.7;
      
      for (let i = 0; i < 6; i++) {
        const color = colors[i % colors.length] || '#FBBF24';
        const radiusX = 60 + i * 45;
        const radiusY = 40 + i * 30;
        const rotation = Math.sin(t * 0.002 * speed + i) * 0.1;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation + (i * Math.PI / 6));
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(color, 0.05);
        ctx.stroke();
        ctx.restore();
      }
    };

    // 6. Glowing Honeycomb Cells
    const drawHexCells = () => {
      const t = timeRef.current;
      const speed = speedRef.current;
      const colors = getColors();
      
      const hexSize = 42;
      const hSpacing = hexSize * 1.5;
      const vSpacing = hexSize * Math.sqrt(3);
      
      ctx.lineWidth = 0.6;
      for (let x = 0; x < w + hexSize; x += hSpacing) {
        for (let y = 0; y < h + hexSize; y += vSpacing) {
          const finalY = y + (Math.floor(x / hSpacing) % 2 === 0 ? 0 : vSpacing / 2);
          
          // Calculate dynamic glowing opacity based on position and time
          const noise = Math.sin((x * 0.005) + (finalY * 0.005) + (t * 0.008 * speed));
          if (noise < 0.2) continue; // Only draw some hexes to keep it clean and fast
          
          const alpha = (noise - 0.2) * 0.08;
          const color = colors[Math.floor((x + finalY) / 100) % colors.length] || '#FBBF24';
          
          // Draw hexagon
          ctx.beginPath();
          for (let side = 0; side < 6; side++) {
            const angle = (side * Math.PI) / 3;
            const hx = x + hexSize * Math.cos(angle);
            const hy = finalY + hexSize * Math.sin(angle);
            if (side === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.strokeStyle = hexToRgba(color, alpha);
          ctx.stroke();
        }
      }
    };

    // 4. Solar Aurora Warp
    const drawSolarAurora = () => {
      const t = timeRef.current;
      const speed = speedRef.current;
      const colors = getColors();
      const targetCount = countRef.current;

      const curtainCount = Math.max(1, Math.min(5, Math.floor(targetCount / 25)));
      for (let layer = 0; layer < curtainCount; layer++) {
        const color = colors[layer % colors.length] || '#FBBF24';
        const alpha = (0.06 - layer * 0.012);
        const speedScale = (0.0022 + layer * 0.001) * speed;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 15) {
          const w1 = Math.sin(x * 0.0016 + t * speedScale) * (h * 0.14);
          const w2 = Math.cos(x * 0.0032 - t * speedScale * 1.3) * (h * 0.065);
          const y = h * (0.33 + layer * 0.11) + w1 + w2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, hexToRgba(color, alpha));
        grad.addColorStop(0.45, hexToRgba(color, alpha * 0.4));
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = hexToRgba(color, alpha * 2.6);
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
    };

    // 7. Liquid Solar Plasma
    const drawLiquidLava = () => {
      const t = timeRef.current;
      const speed = speedRef.current;
      const targetCount = countRef.current;
      
      const desiredBlobs = Math.max(5, Math.floor(targetCount / 5));
      if (lavaBlobs.length < desiredBlobs) {
        const colors = getColors();
        for (let i = lavaBlobs.length; i < desiredBlobs; i++) {
          lavaBlobs.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: 50 + Math.random() * 80,
            color: colors[Math.floor(Math.random() * colors.length)] || '#FBBF24',
            pulseOffset: Math.random() * Math.PI * 2
          });
        }
      } else if (lavaBlobs.length > desiredBlobs) {
        lavaBlobs.length = desiredBlobs;
      }

      lavaBlobs.forEach((b) => {
        b.x += b.vx * speed;
        b.y += b.vy * speed;

        if (mouseRef.current.x > 0) {
          const dx = mouseRef.current.x - b.x;
          const dy = mouseRef.current.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 400) {
            const force = (400 - dist) / 400 * 0.5 * speed;
            const angle = Math.atan2(dy, dx) + Math.PI / 2; 
            b.x += Math.cos(angle) * force * 1.8;
            b.y += Math.sin(angle) * force * 1.8;
          }
        }

        if (b.x < -b.radius) b.x = w + b.radius;
        if (b.x > w + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = h + b.radius;
        if (b.y > h + b.radius) b.y = -b.radius;

        const breathing = Math.sin(t * 0.005 * speed + b.pulseOffset) * 15;
        // Shield radial gradient size against index errors (cannot be <= 0)
        const currentRadius = Math.max(1, b.radius + breathing);

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, currentRadius);
        grad.addColorStop(0, hexToRgba(b.color, 0.18));
        grad.addColorStop(0.5, hexToRgba(b.color, 0.08));
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    };


    // 9. Solar Telemetry Matrix
    const drawDigitalRain = () => {
      const t = timeRef.current;
      const speed = speedRef.current;
      const colors = getColors();
      const targetCount = countRef.current;

      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';

      const desiredColumns = Math.max(5, Math.min(Math.ceil(w / 22), Math.floor(targetCount / 3)));
      if (matrixDrops.length < desiredColumns) {
        for (let i = matrixDrops.length; i < desiredColumns; i++) {
          matrixDrops.push({
            x: Math.random() * w,
            y: Math.random() * -1000,
            speed: 1.8 + Math.random() * 3.5,
            chars: Array.from({ length: 15 }, () => getRandomTelemetryChar()),
            lastUpdate: 0
          });
        }
      } else if (matrixDrops.length > desiredColumns) {
        matrixDrops.length = desiredColumns;
      }

      matrixDrops.forEach((d) => {
        d.y += d.speed * speed;

        if (t - d.lastUpdate > 10) {
          d.chars.shift();
          d.chars.push(getRandomTelemetryChar());
          d.lastUpdate = t;
        }

        if (d.y > h + 300) {
          d.y = Math.random() * -600;
          d.x = Math.random() * w; // Randomize x position on reset!
          d.speed = 1.8 + Math.random() * 3.5;
        }

        const tailLength = d.chars.length;
        for (let i = 0; i < tailLength; i++) {
          const charY = d.y - (tailLength - 1 - i) * 16;
          if (charY < 0 || charY > h) continue;

          const alphaRatio = (i + 1) / tailLength;
          const alpha = alphaRatio * 0.22;
          
          const isHead = i === tailLength - 1;
          ctx.fillStyle = isHead 
            ? 'rgba(255, 255, 255, 0.7)' 
            : hexToRgba(colors[i % colors.length] || '#FBBF24', alpha);

          const character = d.chars[i] || '0';
          ctx.fillText(character, d.x, charY);

          if (isHead) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = colors[0] || '#FBBF24';
            ctx.fillText(character, d.x, charY);
            ctx.shadowBlur = 0; 
          }
        }
      });
    };

    // 10. Luxury Crystal Shards
    const drawPrismaticShards = () => {
      const speed = speedRef.current;
      const targetCount = countRef.current;

      const desiredShards = Math.max(2, Math.floor(targetCount / 15));
      if (crystalShards.length < desiredShards) {
        const colors = getColors();
        for (let i = crystalShards.length; i < desiredShards; i++) {
          crystalShards.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: 100 + Math.random() * 140,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.002,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            color: colors[Math.floor(Math.random() * colors.length)] || '#FBBF24',
            sides: Math.random() > 0.5 ? 3 : 4
          });
        }
      } else if (crystalShards.length > desiredShards) {
        crystalShards.length = desiredShards;
      }

      crystalShards.forEach((s) => {
        s.rotation += s.rotSpeed * speed;
        s.x += s.vx * speed;
        s.y += s.vy * speed;

        if (s.x < -s.radius) s.x = w + s.radius;
        if (s.x > w + s.radius) s.x = -s.radius;
        if (s.y < -s.radius) s.y = h + s.radius;
        if (s.y > h + s.radius) s.y = -s.radius;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);

        ctx.beginPath();
        for (let i = 0; i < s.sides; i++) {
          const angle = (i * Math.PI * 2) / s.sides;
          const rx = s.radius * Math.cos(angle);
          const ry = s.radius * 0.55 * Math.sin(angle); 
          if (i === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();

        const grad = ctx.createLinearGradient(-s.radius, -s.radius, s.radius, s.radius);
        grad.addColorStop(0, hexToRgba(s.color, 0.045));
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
        grad.addColorStop(1, hexToRgba('#FFFFFF', 0.005));

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = hexToRgba(s.color, 0.08);
        ctx.lineWidth = 0.7;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let i = 0; i < s.sides; i++) {
          const angle = (i * Math.PI * 2) / s.sides;
          ctx.lineTo(s.radius * Math.cos(angle), s.radius * 0.55 * Math.sin(angle));
          ctx.moveTo(0, 0);
        }
        ctx.stroke();

        ctx.restore();
      });
    };

    // ────────────────────────────────────────────────────────
    // MAIN RENDERING LOOP SWITCH PANEL
    // ────────────────────────────────────────────────────────
    const animate = () => {
      timeRef.current += speedRef.current;

      // Dynamically detect container size changes (e.g. after loader hides or parent layout finishes)
      const parent = canvas.parentElement;
      if (parent) {
        const currentW = parent.clientWidth;
        const currentH = parent.clientHeight;
        if (currentW > 0 && currentH > 0 && (currentW !== w || currentH !== h)) {
          resize();
        }
      }

      const currentStyle = styleRef.current;
      const colors = getColors();

      ctx.clearRect(0, 0, w, h);

      // Draw style-specific premium deep-ambient backdrop washes directly in the canvas overlay
      let bgGrad;
      const isLight = themeRef.current === 'light';
      if (!isLight) {
        switch (currentStyle) {
          case 'silicon-grid':
            bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            bgGrad.addColorStop(0, '#02040a');
            bgGrad.addColorStop(1, '#040a15');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'liquid-lava':
            bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            bgGrad.addColorStop(0, '#100101');
            bgGrad.addColorStop(0.7, '#040000');
            bgGrad.addColorStop(1, '#000000');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'cosmic-wind':
            bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.8);
            bgGrad.addColorStop(0, '#0d0422');
            bgGrad.addColorStop(0.5, '#04010b');
            bgGrad.addColorStop(1, '#000000');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'digital-rain':
            bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            bgGrad.addColorStop(0, '#000502');
            bgGrad.addColorStop(1, '#000000');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'prismatic-shards':
            bgGrad = ctx.createLinearGradient(0, 0, w, h);
            bgGrad.addColorStop(0, '#010512');
            bgGrad.addColorStop(1, '#000000');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'solar-aurora':
            bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            bgGrad.addColorStop(0, '#01020a');
            bgGrad.addColorStop(1, '#050a1e');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'energy-waves':
            bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            bgGrad.addColorStop(0, '#02040c');
            bgGrad.addColorStop(1, '#000002');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'magnetic-resonance':
            bgGrad = ctx.createRadialGradient(w * 0.8, h * 0.15, 0, w * 0.8, h * 0.15, w * 0.55);
            bgGrad.addColorStop(0, hexToRgba(colors[0] || '#FBBF24', 0.04));
            bgGrad.addColorStop(1, '#02040a');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'hex-cells':
            bgGrad = ctx.createLinearGradient(0, 0, w, h);
            bgGrad.addColorStop(0, '#020308');
            bgGrad.addColorStop(1, '#000000');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          case 'none':
            bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            bgGrad.addColorStop(0, '#02040a');
            bgGrad.addColorStop(1, '#040a15');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);
            break;
          default:
            break;
        }
      }

      switch (currentStyle) {
        case 'silicon-grid':
          drawSiliconGrid();
          break;

        case 'gradient-embers': {
          const g1 = ctx.createRadialGradient(w * 0.25, h * 0.2, 0, w * 0.25, h * 0.2, w * 0.4);
          g1.addColorStop(0, hexToRgba(colors[0] || '#FB923C', 0.05));
          g1.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g1;
          ctx.fillRect(0, 0, w, h);

          const g2 = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, w * 0.5);
          g2.addColorStop(0, hexToRgba(colors[1] || '#FDBA74', 0.04));
          g2.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g2;
          ctx.fillRect(0, 0, w, h);

          drawParticlesSystem(false);
          break;
        }

        case 'energy-waves':
          drawEnergyWaves();
          break;

        case 'cosmic-wind':
          drawParticlesSystem(true);
          break;

        case 'solar-aurora':
          drawSolarAurora();
          break;

        case 'magnetic-resonance':
          drawMagneticFlux();
          break;

        case 'hex-cells':
          drawHexCells();
          break;

        case 'liquid-lava':
          drawLiquidLava();
          break;

        case 'digital-rain':
          drawDigitalRain();
          break;

        case 'prismatic-shards':
          drawPrismaticShards();
          break;

        case 'none':
          // Static background: do not draw any overlays or animations
          break;

        default:
          drawSiliconGrid();
          break;
      }

      // Universal background atmospheric warm pulse
      const wash = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.8);
      wash.addColorStop(0, hexToRgba(colors[0] || '#FBBF24', 0.012));
      wash.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}

/* ── Hex → RGBA Helper ── */
function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return `rgba(255,255,255,${alpha})`;
  if (hex.startsWith('rgb')) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
