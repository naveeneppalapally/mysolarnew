import { useRef, useEffect, useCallback } from 'react';
import { useSolarTime } from '../context/SolarTimeContext';
import type { SolarPhase } from '../context/SolarTimeContext';

/* ============================================
   PARTICLE INTERFACE
   ============================================ */
interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  amplitudeX: number;
  amplitudeY: number;
}

interface Ray {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

/* ============================================
   CONSTANTS & COLORS
   ============================================ */
const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 120;
const MOUSE_RADIUS = 150;

const PHASE_COLORS: Record<SolarPhase, string[]> = {
  dawn: ['#F97316', '#FB923C', '#FDBA74', '#FFEDD5', '#EA580C'],
  noon: ['#F59E0B', '#FBBF24', '#FCD34D', '#FEF3C7', '#D97706'],
  dusk: ['#EC4899', '#F43F5E', '#8B5CF6', '#D946EF', '#A21CAF'],
  night: ['#3B82F6', '#6366F1', '#06B6D4', '#E2E8F0', '#1E1B4B']
};

/* ============================================
   CREATE PARTICLE
   ============================================ */
function createParticle(w: number, h: number): Particle {
  const x = Math.random() * w;
  const y = Math.random() * h;
  return {
    x,
    y,
    baseX: x,
    baseY: y,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: 1 + Math.random() * 3,
    alpha: 0.2 + Math.random() * 0.5,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    speedX: 0.003 + Math.random() * 0.008,
    speedY: 0.004 + Math.random() * 0.007,
    amplitudeX: 20 + Math.random() * 40,
    amplitudeY: 15 + Math.random() * 30,
  };
}

/* ============================================
   COMPONENT
   ============================================ */
export default function SunParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const raysRef = useRef<Ray[]>([]);
  const cachedCardsRef = useRef<{ left: number; top: number; right: number; bottom: number }[]>([]);
  
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const { currentPhase } = useSolarTime();
  const currentPhaseRef = useRef(currentPhase);

  // Sync phase to ref for access in canvas animation frame loop
  useEffect(() => {
    currentPhaseRef.current = currentPhase;
  }, [currentPhase]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resizeCanvas = () => {
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
    };

    resizeCanvas();

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(w, h)
    );
    raysRef.current = [];
    cachedCardsRef.current = [];

    /* ---------- DRAW LOOP ---------- */
    const animate = () => {
      timeRef.current += 1;
      const t = timeRef.current;
      const phase = currentPhaseRef.current;
      const colors = PHASE_COLORS[phase];

      ctx.clearRect(0, 0, w, h);

      // Subtle radial ambient glow based on active phase color
      const glowX = w * 0.8;
      const glowY = h * 0.12;
      const glowGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, w * 0.45);
      const primaryColor = colors[0];
      
      glowGrad.addColorStop(0, hexToRgba(primaryColor, 0.07));
      glowGrad.addColorStop(0.4, hexToRgba(primaryColor, 0.02));
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // Update & cache active solar cards coordinates
      if (t % 60 === 0) {
        const cards = document.querySelectorAll('.solar-panel-card');
        const canvasRect = canvas.getBoundingClientRect();
        cachedCardsRef.current = Array.from(cards).map((card) => {
          const rect = card.getBoundingClientRect();
          return {
            left: rect.left - canvasRect.left,
            top: rect.top - canvasRect.top,
            right: rect.right - canvasRect.left,
            bottom: rect.bottom - canvasRect.top,
          };
        });
      }

      // Spawn rays descending from top
      if (raysRef.current.length < 15 && Math.random() < 0.06) {
        raysRef.current.push({
          x: Math.random() * w,
          y: -10,
          vx: (Math.random() - 0.5) * 1.2,
          vy: 1.8 + Math.random() * 2.2,
          length: 12 + Math.random() * 18,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.15 + Math.random() * 0.4,
          life: 180,
          maxLife: 180,
        });
      }

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pColor = colors[i % colors.length];

        // Sine wave floating
        p.phaseX += p.speedX;
        p.phaseY += p.speedY;
        const targetX = p.baseX + Math.sin(p.phaseX) * p.amplitudeX;
        const targetY = p.baseY + Math.sin(p.phaseY) * p.amplitudeY;

        // Smooth drift toward target
        p.x += (targetX - p.x) * 0.02 + p.vx;
        p.y += (targetY - p.y) * 0.02 + p.vy;

        // Mouse interaction (gentle repulsion)
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const pushX = (dx / dist) * force * 2;
          const pushY = (dy / dist) * force * 2;
          p.x += pushX;
          p.y += pushY;
        }

        // Wrap around edges
        if (p.x < -20) { p.x = w + 20; p.baseX = w + 20; }
        if (p.x > w + 20) { p.x = -20; p.baseX = -20; }
        if (p.y < -20) { p.y = h + 20; p.baseY = h + 20; }
        if (p.y > h + 20) { p.y = -20; p.baseY = -20; }

        // Subtle opacity pulse
        const alphaPulse = p.alpha + Math.sin(t * 0.02 + i) * 0.1;
        const finalAlpha = Math.max(0.08, Math.min(0.7, alphaPulse));

        // Draw particle glow (translucent aura)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(pColor, finalAlpha * 0.3);
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(pColor, finalAlpha);
        ctx.fill();

        // Bright center dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba('#FFFFFF', finalAlpha * 0.9);
        ctx.fill();
      }

      // Update & draw ray casting lines with card reflection/bouncing
      const rays = raysRef.current;
      const cachedCards = cachedCardsRef.current;
      for (let r = rays.length - 1; r >= 0; r--) {
        const ray = rays[r];
        ray.x += ray.vx;
        ray.y += ray.vy;
        ray.life--;

        // Check bounce against cards top borders
        for (let c = 0; c < cachedCards.length; c++) {
          const card = cachedCards[c];
          if (
            ray.x >= card.left &&
            ray.x <= card.right &&
            ray.y >= card.top &&
            ray.y <= card.bottom
          ) {
            // Reflect off solar panels!
            ray.vy = -ray.vy * 0.65; // bounce back up
            ray.vx += (Math.random() - 0.5) * 1.5; // scatter
            ray.y = card.top - 2; // offset from card
            ray.color = '#FFFFFF'; // spark flash
            break;
          }
        }

        // Ray cleanup
        if (ray.life <= 0 || ray.y > h + 20 || ray.x < -20 || ray.x > w + 20) {
          rays.splice(r, 1);
          continue;
        }

        const rayLifeRatio = ray.life / ray.maxLife;
        ctx.beginPath();
        ctx.moveTo(ray.x - ray.vx * 2, ray.y - ray.vy * 2);
        ctx.lineTo(ray.x, ray.y);
        ctx.strokeStyle = hexToRgba(ray.color, ray.alpha * rayLifeRatio);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = hexToRgba(colors[0], opacity);
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(w, h)
      );
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ pointerEvents: 'auto' }}
      aria-hidden="true"
    />
  );
}

/* ============================================
   HEX TO RGBA HELPER
   ============================================ */
function hexToRgba(hex: string, alpha: number): string {
  // Catch already formatted rgb/rgba strings
  if (hex.startsWith('rgb')) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
