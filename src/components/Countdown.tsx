import { useEffect, useRef, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET = new Date('2026-10-30T09:00:00+05:30').getTime();

function calc(): TimeLeft {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(calc);
  const prev = useRef(time);

  useEffect(() => {
    const id = setInterval(() => {
      prev.current = time;
      setTime(calc());
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const units: { label: string; value: number }[] = [
    { label: 'DAYS', value: time.days },
    { label: 'HOURS', value: time.hours },
    { label: 'MINS', value: time.minutes },
    { label: 'SECS', value: time.seconds },
  ];

  return (
    <div className="flex flex-wrap items-stretch gap-2 sm:gap-3 md:gap-4">
      {units.map((u, i) => (
        <div
          key={u.label}
          className="group relative flex min-w-[64px] flex-col items-center justify-center border border-matrix-500/30 bg-cyber-ink/80 px-3 py-3 backdrop-blur-sm transition-all hover:border-matrix-400/60 hover:shadow-[0_0_20px_rgba(0,255,102,0.25)] sm:min-w-[80px] md:min-w-[96px] md:py-4"
          style={{ perspective: '400px' }}
        >
          {/* corner brackets */}
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-matrix-400" />
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-matrix-400" />
          <span className="absolute left-0 bottom-0 h-2 w-2 border-b border-l border-matrix-400" />
          <span className="absolute right-0 bottom-0 h-2 w-2 border-b border-r border-matrix-400" />

          <span
            className="font-mono text-2xl font-extrabold tabular-nums text-matrix-400 sm:text-3xl md:text-4xl"
            style={{ textShadow: '0 0 12px rgba(0,255,102,0.6)' }}
          >
            {pad(u.value)}
          </span>
          <span className="mt-1 font-mono text-[9px] tracking-[0.15em] text-white/40 sm:text-[10px] md:text-xs">
            {u.label}
          </span>
          {i < units.length - 1 && (
            <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-mono text-matrix-500/50 sm:block md:-right-2.5 md:text-lg">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
