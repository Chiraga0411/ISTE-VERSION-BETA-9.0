import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Skip on touch / coarse pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      if (hidden) setHidden(false);

      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, [data-cursor="hover"], input, .faq-item'));
    };

    const onLeave = () => setHidden(true);
    const onDown = () => setHovering((h) => h);
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
    };
  }, [hidden]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.2s' }}
    >
      {/* Outer crosshair ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0"
        style={{ marginLeft: '-16px', marginTop: '-16px' }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center transition-transform duration-150"
          style={{ transform: hovering ? 'scale(150%)' : 'scale(100%)' }}
        >
          <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-matrix-500/70" />
          <div className="absolute left-1/2 bottom-0 h-2 w-px -translate-x-1/2 bg-matrix-500/70" />
          <div className="absolute top-1/2 left-0 w-2 h-px -translate-y-1/2 bg-matrix-500/70" />
          <div className="absolute top-1/2 right-0 w-2 h-px -translate-y-1/2 bg-matrix-500/70" />
          <div
            className={`rounded-full border transition-all duration-150 ${
              hovering ? 'h-8 w-8 border-matrix-400/80' : 'h-5 w-5 border-matrix-500/50'
            }`}
            style={{ boxShadow: '0 0 8px rgba(0,255,102,0.5)' }}
          />
        </div>
      </div>
      {/* Inner block */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0"
        style={{ marginLeft: '-2px', marginTop: '-2px' }}
      >
        <div
          className={`bg-matrix-400 transition-all duration-100 ${
            hovering ? 'h-3 w-3' : 'h-1.5 w-1.5'
          }`}
          style={{ boxShadow: '0 0 6px rgba(0,255,102,0.9)' }}
        />
      </div>
    </div>
  );
}
