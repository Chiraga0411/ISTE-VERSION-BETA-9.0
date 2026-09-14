import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo.svg';

type BootScreenProps = {
  onComplete: () => void;
};

// Edit these to change what the boot log "types out" each visit.
const BOOT_LINES = [
  'booting version_os',
  'linking iste.manit.core',
  'compiling hackathon.exe',
  'access: granted',
];

const CHAR_DELAY = 16; // ms per typed character
const LINE_PAUSE = 160; // ms pause after a line finishes
const HOLD_AFTER_DONE = 480; // ms to sit on the finished state before unmounting

// Hexagon vertices (viewBox 0 0 220 220, center 110,110, radius 80)
const HEX_POINTS: [number, number][] = [
  [110, 30],
  [179, 70],
  [179, 150],
  [110, 190],
  [41, 150],
  [41, 70],
];
const HEX_PATH = `M${HEX_POINTS.map((p) => p.join(',')).join(' L')} Z`;

// Spokes running from alternating vertices toward the centre chip
const SPOKES = [
  'M110,30 L110,72',
  'M179,150 L146,130',
  'M41,150 L74,130',
];

const NODE_THRESHOLDS = [9, 18, 27, 37, 46, 55];

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export default function LoadingScreen({ onComplete }: BootScreenProps) {
  const [doneLines, setDoneLines] = useState<string[]>([]);
  const [currentTyped, setCurrentTyped] = useState('');
  const [typedCount, setTypedCount] = useState(0);
  const [complete, setComplete] = useState(false);

  const totalChars = useMemo(
    () => BOOT_LINES.reduce((sum, line) => sum + line.length, 0),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];
    const after = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    let lineIdx = 0;
    let charIdx = 0;

    const typeNext = () => {
      if (cancelled) return;

      if (lineIdx >= BOOT_LINES.length) {
        setComplete(true);
        after(onComplete, HOLD_AFTER_DONE);
        return;
      }

      const line = BOOT_LINES[lineIdx];
      charIdx += 1;
      setCurrentTyped(line.slice(0, charIdx));
      setTypedCount((prev) => prev + 1);

      if (charIdx >= line.length) {
        after(() => {
          setDoneLines((prev) => [...prev, line]);
          setCurrentTyped('');
          lineIdx += 1;
          charIdx = 0;
          typeNext();
        }, LINE_PAUSE);
      } else {
        after(typeNext, CHAR_DELAY);
      }
    };

    typeNext();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = Math.min(100, Math.round((typedCount / totalChars) * 100));

  const hexDraw = clamp01(progress / 55);
  const spokeDraw = clamp01((progress - 35) / 35);
  const chipOpacity = clamp01((progress - 55) / 15);
  const logoOpacity = clamp01((progress - 75) / 20);
  const hexStr = `0x${progress.toString(16).toUpperCase().padStart(2, '0')}`;
  const ticks = Array.from({ length: 20 }, (_, i) => i < Math.round((progress / 100) * 20));

  const skip = () => {
    setComplete(true);
    onComplete();
  };

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
      exit={{ clipPath: 'inset(100% 0 0% 0)', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="preloader-grid" aria-hidden="true" />

      <div className="preloader-inner">
        <div className="preloader-circuit-wrap">
          <svg viewBox="0 0 220 220" className="preloader-circuit" aria-hidden="true">
            <path d={HEX_PATH} className="circuit-ghost" />
            <motion.path
              d={HEX_PATH}
              className="circuit-line"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: hexDraw }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            {SPOKES.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                className="circuit-line circuit-spoke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: spokeDraw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
            ))}
            {HEX_POINTS.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                className={`circuit-node ${progress >= NODE_THRESHOLDS[i] ? 'is-active' : ''}`}
              />
            ))}
            <rect
              x={82}
              y={82}
              width={56}
              height={56}
              rx={6}
              className="circuit-chip"
              style={{ opacity: chipOpacity }}
            />
          </svg>
          <img
            src={Logo}
            alt="ISTE SC MANIT"
            className="preloader-logo"
            style={{ opacity: logoOpacity }}
          />
        </div>

        <div className="preloader-terminal">
          <div className="preloader-terminal-head">sys://boot</div>
          {doneLines.map((line, i) => (
            <div className="preloader-line is-done" key={i}>
              <span className="ok-tag">OK</span>
              {line}
            </div>
          ))}
          {!complete && (
            <div className="preloader-line is-current">
              <span className="prompt-tag">$</span>
              {currentTyped}
              <span className="preloader-cursor" />
            </div>
          )}
        </div>

        <div className="preloader-meta">
          <div className="preloader-ticks" aria-hidden="true">
            {ticks.map((active, i) => (
              <span key={i} className={active ? 'is-active' : ''} />
            ))}
          </div>
          <div className="preloader-hex">{hexStr}</div>
        </div>
      </div>

      <div className={`preloader-flash ${complete ? 'is-active' : ''}`} aria-hidden="true" />

      <button className="preloader-skip" onClick={skip}>
        Skip
      </button>
    </motion.div>
  );
}