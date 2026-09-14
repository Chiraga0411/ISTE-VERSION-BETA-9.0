import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import SectionHeading from './SectionHeading';

type Slide = {
  id: number;
  label: string;
  caption: string;
  edition: string;
  /** optional real photo — drop an image path here and it renders instead of the placeholder */
  image?: string;
};

const SLIDES: Slide[] = [
  { id: 0, label: 'Session', caption: 'Speaker Session', edition: 'VB 8.0', image: '/images/gallery/1.jpg' },
  { id: 1, label: 'Audience', caption: 'Attentive Minds', edition: 'VB 8.0', image: '/images/gallery/2.jpg' },
  { id: 2, label: 'Opening', caption: 'Inauguration', edition: 'VB 8.0', image: '/images/gallery/3.png' },
  { id: 3, label: 'Winners', caption: 'Winners Crowned', edition: 'VB 8.0', image: '/images/gallery/4.jpg' },
  { id: 4, label: 'Team', caption: 'Team Spirit', edition: 'VB 8.0', image: '/images/gallery/5.jpg' },
];

const AUTO_MS = 3200;

export default function Gallery() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setActive((current) => {
      const next = current + dir;
      if (next < 0) return SLIDES.length - 1;
      if (next >= SLIDES.length) return 0;
      return next;
    });
  }, []);

  // auto-slide
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(interval);
  }, [paused, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section id="gallery" className="section-pad relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          title="GALLERY"

        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* 3D coverflow stage */}
          <div
            className="coverflow-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="coverflow-grid" aria-hidden="true" />

            {SLIDES.map((s, i) => {
              let offset = i - active;
              // wrap-around so the deck never looks like it "jumps"
              if (offset > SLIDES.length / 2) offset -= SLIDES.length;
              if (offset < -SLIDES.length / 2) offset += SLIDES.length;

              const abs = Math.abs(offset);
              const isActive = offset === 0;
              const visible = abs <= 2;

              const translateX = offset * 62;
              const translateZ = isActive ? 0 : -180 - abs * 40;
              const rotateY = offset === 0 ? 0 : offset > 0 ? -52 : 52;
              const scale = isActive ? 1 : 0.72 - (abs - 1) * 0.08;
              const opacity = visible ? (isActive ? 1 : 0.55 - (abs - 1) * 0.15) : 0;
              const zIndex = 50 - abs;

              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  aria-label={`Show ${s.caption}`}
                  className={`coverflow-card ${isActive ? 'is-active' : ''}`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: visible ? 'auto' : 'none',
                  }}
                >
                  <div className="slide-inner relative h-full w-full overflow-hidden">
                    <div className="slide-hatch" />
                    <div className="slide-sheen" style={{ opacity: isActive ? 1 : 0.4 }} />
                    <span
                      className={`slide-shape ${s.id % 2 === 0 ? 'shape-circle' : ''} ${
                        s.id % 3 === 0 ? 'shape-bar' : ''
                      }`}
                    />

                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.caption}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <ImageIcon className="h-9 w-9 text-matrix-300/40" />
                      </div>
                    )}

                    <span className="slide-label">{s.label}</span>
                    <span className="slide-index">/ 0{s.id + 1} — REPLACEABLE</span>

                    <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-cyber-black/95 to-transparent p-4 pt-8">
                      <span className="font-mono text-xs text-matrix-400">{'> '}</span>
                      <span className="font-mono text-sm text-white/90">{s.caption}</span>
                      <span className="ml-2 font-mono text-[10px] text-matrix-500/50">
                        {s.edition}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center border border-matrix-500/40 text-matrix-400 transition-all hover:border-matrix-400 hover:shadow-[0_0_12px_rgba(0,255,102,0.4)]"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 transition-all ${
                    i === active
                      ? 'w-6 bg-matrix-400 shadow-[0_0_8px_rgba(0,255,102,0.8)]'
                      : 'w-1.5 bg-matrix-500/30 hover:bg-matrix-500/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center border border-matrix-500/40 text-matrix-400 transition-all hover:border-matrix-400 hover:shadow-[0_0_12px_rgba(0,255,102,0.4)]"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
