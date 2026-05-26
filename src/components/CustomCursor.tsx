import { useEffect, useRef, useState, useCallback } from 'react';

/* ============================================
   CUSTOM CURSOR — Dot + Ring follower
   Desktop only, gold themed
   ============================================ */

type CursorVariant = 'default' | 'button' | 'text';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
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

    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);

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
      document.body.style.cursor = '';
      const el = document.getElementById('custom-cursor-style');
      if (el) el.remove();
    };
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

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

  // Animation loop
  useEffect(() => {
    if (isTouch) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        // Dot follows exactly
        dot.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;

        // Ring follows with lerp delay
        ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
        ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isTouch, handleMouseMove, handleMouseOver, handleMouseLeaveWindow, handleMouseEnterWindow]);

  // Don't render on touch devices
  if (isTouch) return null;

  // Variant styles
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
          background: '#F59E0B',
          boxShadow: '0 0 8px rgba(245,158,11,0.6)',
        };
      case 'text':
        return {
          ...base,
          width: '6px',
          height: '6px',
          background: '#F59E0B',
          boxShadow: '0 0 6px rgba(245,158,11,0.4)',
        };
      default:
        return {
          ...base,
          width: '8px',
          height: '8px',
          background: '#F59E0B',
          boxShadow: '0 0 10px rgba(245,158,11,0.5)',
        };
    }
  };

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
          border: '1.5px solid rgba(245,158,11,0.5)',
          background: 'rgba(245,158,11,0.04)',
          boxShadow: '0 0 20px rgba(245,158,11,0.1)',
        };
      case 'text':
        return {
          ...base,
          width: '56px',
          height: '56px',
          border: '1px solid rgba(245,158,11,0.2)',
          background: 'rgba(245,158,11,0.06)',
        };
      default:
        return {
          ...base,
          width: '40px',
          height: '40px',
          border: '1px solid rgba(245,158,11,0.35)',
          background: 'transparent',
        };
    }
  };

  return (
    <>
      <div ref={dotRef} style={getDotStyle()} />
      <div ref={ringRef} style={getRingStyle()} />
    </>
  );
}
