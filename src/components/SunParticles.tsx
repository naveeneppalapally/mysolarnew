import { useRef, useEffect, useCallback } from 'react';

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
  color: string;
  alpha: number;
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
  amplitudeX: number;
  amplitudeY: number;
}

/* ============================================
   CONSTANTS
   ============================================ */
const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 120;
const MOUSE_RADIUS = 150;

const COLORS = [
  '#F59E0B', // gold
  '#FBBF24', // amber
  '#F97316', // warm orange
  '#FCD34D', // light gold
  '#D97706', // deep amber
];

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
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
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
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

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

    /* ---------- DRAW LOOP ---------- */
    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, w, h);

      // Subtle radial ambient glow
      const glowX = w * 0.8;
      const glowY = h * 0.12;
      const glowGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, w * 0.45);
      glowGrad.addColorStop(0, 'rgba(245,158,11,0.06)');
      glowGrad.addColorStop(0.4, 'rgba(251,191,36,0.02)');
      glowGrad.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = timeRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

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

        // Draw particle glow (draw filled circle with transparency)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, finalAlpha * 0.3);
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, finalAlpha);
        ctx.fill();

        // Bright center dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba('#FEF3C7', finalAlpha * 0.9);
        ctx.fill();
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
            ctx.strokeStyle = hexToRgba('#F59E0B', opacity);
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
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
