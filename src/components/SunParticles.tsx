import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const PARTICLE_COUNT = 55;

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  const sourceX = canvasWidth * (0.75 + Math.random() * 0.2);
  const sourceY = canvasHeight * (0.05 + Math.random() * 0.15);
  const angle = Math.PI * (0.15 + Math.random() * 0.7);
  const speed = 0.15 + Math.random() * 0.45;
  const maxLife = 200 + Math.random() * 300;

  return {
    x: sourceX + (Math.random() - 0.5) * 60,
    y: sourceY + (Math.random() - 0.5) * 40,
    vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? -1 : 0.5),
    vy: Math.sin(angle) * speed,
    radius: 1.2 + Math.random() * 2.8,
    opacity: 0,
    life: Math.random() * maxLife,
    maxLife,
  };
}

export default function SunParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      ctx.scale(dpr, dpr);
      return { width: canvasWidth, height: canvasHeight };
    };

    const dims = resizeCanvas();

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(dims.width, dims.height)
    );

    const animate = () => {
      const w = canvasWidth;
      const h = canvasHeight;

      // Detect light/dark mode by checking the html element class
      const isDark = document.documentElement.classList.contains('dark');
      // In light mode, reduce particle opacity so they don't look garish on white
      const opacityScale = isDark ? 1 : 0.35;

      ctx.clearRect(0, 0, w, h);

      // Subtle glow at source
      const glowX = w * 0.85;
      const glowY = h * 0.1;
      const glowGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, w * 0.4);
      glowGrad.addColorStop(0, `rgba(16, 185, 129, ${0.07 * opacityScale})`);
      glowGrad.addColorStop(0.4, `rgba(52, 211, 153, ${0.03 * opacityScale})`);
      glowGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.life += 1;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.15) {
          p.opacity = (lifeRatio / 0.15) * (0.18 + Math.random() * 0.05);
        } else if (lifeRatio > 0.7) {
          p.opacity *= 0.986;
        }
        p.opacity = Math.min(p.opacity, 0.75);

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.002;
        p.vx += (Math.random() - 0.5) * 0.008;

        if (
          p.opacity <= 0.01 ||
          p.life >= p.maxLife ||
          p.x < -20 || p.x > w + 20 ||
          p.y < -20 || p.y > h + 20
        ) {
          particlesRef.current[i] = createParticle(w, h);
          particlesRef.current[i].life = 0;
          continue;
        }

        const scaledOpacity = p.opacity * opacityScale;

        // Radial gradient per particle
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        pGrad.addColorStop(0, `rgba(52, 211, 153, ${scaledOpacity})`);
        pGrad.addColorStop(0.5, `rgba(16, 185, 129, ${scaledOpacity * 0.5})`);
        pGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 253, 244, ${scaledOpacity * 0.9})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const newDims = resizeCanvas();
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(newDims.width, newDims.height)
      );
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
