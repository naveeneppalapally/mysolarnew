import { useEffect, useRef, useState, useCallback } from 'react';

/* ============================================
   CUSTOM CURSOR — Dot + Ring + Spark overlay
   Desktop only, gold themed with photon trail grids
   ============================================ */

type CursorVariant = 'default' | 'button' | 'text';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  cardRect: { left: number; top: number; right: number; bottom: number };
  direction: 'h' | 'v';
  lockCoord: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);
  
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isTouch, setIsTouch] = useState(true); // default hidden until we detect non-touch
  const [isVisible, setIsVisible] = useState(false);

  // Detect touch device
  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const timer = setTimeout(() => {
      setIsTouch(isTouchDevice);
    }, 0);

    if (isTouchDevice) {
      return () => clearTimeout(timer);
    }

    // Add cursor:none to body
    document.body.style.cursor = 'none';

    // Add cursor:none to all interactive elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      a, button, input, textarea, select, [role="button"], .magnetic, label {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearTimeout(timer);
      document.body.style.cursor = '';
      const el = document.getElementById('custom-cursor-style');
      if (el) el.remove();
    };
  }, []);

  // Detect hover targets
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const isButton = target.closest('button, a, [role="button"], .magnetic, input[type="submit"], input[type="button"]');
    const isText = target.closest('h1, h2, h3, h4, h5, h6, p, span, li, td, th, label, blockquote');

    if (isButton) {
      setVariant('button');
    } else if (isText) {
      setVariant('text');
    } else {
      setVariant('default');
    }
  }, []);

  const handleMouseLeaveWindow = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnterWindow = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Animation and event listener loop
  useEffect(() => {
    if (isTouch) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Handle mouse move & spark spawning on solar panel cards
    const handleMouseMoveWithSparks = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const card = target?.closest('.solar-panel-card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        // Control spawning density
        if (Math.random() < 0.4) {
          const isHorizontal = Math.random() > 0.5;
          const w = rect.width;
          const h = rect.height;
          // Grid line ratios mapping to cell splits
          const gridRatios = [0, 0.25, 0.5, 0.75, 1];
          const ratio = gridRatios[Math.floor(Math.random() * gridRatios.length)];

          if (isHorizontal) {
            const lockCoord = rect.top + h * ratio;
            sparksRef.current.push({
              x: e.clientX,
              y: lockCoord,
              vx: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2),
              vy: 0,
              color: Math.random() > 0.5 ? 'var(--solar-gold-bright)' : 'var(--solar-gold)',
              size: 1 + Math.random() * 1.5,
              life: 40,
              maxLife: 40,
              cardRect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom },
              direction: 'h',
              lockCoord,
            });
          } else {
            const lockCoord = rect.left + w * ratio;
            sparksRef.current.push({
              x: lockCoord,
              y: e.clientY,
              vx: 0,
              vy: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2),
              color: Math.random() > 0.5 ? 'var(--solar-gold-bright)' : 'var(--solar-orange)',
              size: 1 + Math.random() * 1.5,
              life: 40,
              maxLife: 40,
              cardRect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom },
              direction: 'v',
              lockCoord,
            });
          }
        }
      }
    };

    const canvas = canvasRef.current;
    
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        // Dot follows cursor
        dot.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;

        // Ring follows cursor with lerp inertia
        ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
        ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      // Draw sparks canvas overlay
      const canvasEl = canvasRef.current;
      const ctx = canvasEl?.getContext('2d');
      if (canvasEl && ctx) {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        const sparks = sparksRef.current;

        for (let s = sparks.length - 1; s >= 0; s--) {
          const spark = sparks[s];

          if (spark.direction === 'h') {
            spark.x += spark.vx;
          } else {
            spark.y += spark.vy;
          }

          spark.life--;

          // Bounds containment check inside the solar card box
          const isOut =
            spark.x < spark.cardRect.left ||
            spark.x > spark.cardRect.right ||
            spark.y < spark.cardRect.top ||
            spark.y > spark.cardRect.bottom;

          if (spark.life <= 0 || isOut) {
            sparks.splice(s, 1);
            continue;
          }

          const ratio = spark.life / spark.maxLife;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
          ctx.fillStyle = spark.color;
          
          // Glow effect
          ctx.shadowColor = spark.color;
          ctx.shadowBlur = 4;
          ctx.globalAlpha = ratio;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0; // reset
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMoveWithSparks);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMoveWithSparks);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isTouch, isVisible, handleMouseOver, handleMouseLeaveWindow, handleMouseEnterWindow]);

  // Don't render on touch devices
  if (isTouch) return null;

  // Variant styles for cursor dot
  const getDotStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      borderRadius: '50%',
      transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, opacity 0.2s ease',
      willChange: 'transform',
      opacity: isVisible ? 1 : 0,
    };

    switch (variant) {
      case 'button':
        return {
          ...base,
          width: '4px',
          height: '4px',
          background: 'var(--solar-gold)',
          boxShadow: '0 0 8px var(--solar-border-hover)',
        };
      case 'text':
        return {
          ...base,
          width: '6px',
          height: '6px',
          background: 'var(--solar-gold)',
          boxShadow: '0 0 6px var(--solar-border-hover)',
        };
      default:
        return {
          ...base,
          width: '8px',
          height: '8px',
          background: 'var(--solar-gold)',
          boxShadow: '0 0 10px var(--solar-border-hover)',
        };
    }
  };

  // Variant styles for cursor outer ring
  const getRingStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 9998,
      borderRadius: '50%',
      transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), border 0.3s ease, background 0.3s ease, opacity 0.2s ease',
      willChange: 'transform',
      opacity: isVisible ? 1 : 0,
    };

    switch (variant) {
      case 'button':
        return {
          ...base,
          width: '60px',
          height: '60px',
          border: '1.5px solid var(--solar-border-hover)',
          background: 'transparent',
          boxShadow: '0 0 20px var(--solar-border-hover)',
        };
      case 'text':
        return {
          ...base,
          width: '56px',
          height: '56px',
          border: '1px solid var(--solar-border)',
          background: 'transparent',
        };
      default:
        return {
          ...base,
          width: '40px',
          height: '40px',
          border: '1px solid var(--solar-border-hover)',
          background: 'transparent',
        };
    }
  };

  return (
    <>
      <div ref={dotRef} style={getDotStyle()} />
      <div ref={ringRef} style={getRingStyle()} />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />
    </>
  );
}
