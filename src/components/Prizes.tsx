import { motion } from 'framer-motion';
import { Trophy, Lock, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';

type Prize = {
  place: string;
  amount: string;
  icon: typeof Trophy;
  accent: string;
  featured?: boolean;
};

const PRIZES: Prize[] = [
  {
    place: '2nd',
    amount: '₹15,000',
    icon: Lock,
    accent: '#9ca3af',
  },
  {
    place: '1st',
    amount: '₹20,000',
    icon: Trophy,
    accent: '#39ff8f',
    featured: true,
  },
  {
    place: '3rd',
    amount: '₹10,000',
    icon: Zap,
    accent: '#cd7f32',
  },
];

const MOB_PRIZES: Prize[] = [
  {
    place: '1st',
    amount: '₹20,000',
    icon: Trophy,
    accent: '#39ff8f',
    featured: true,
  },
  {
    place: '2nd',
    amount: '₹15,000',
    icon: Lock,
    accent: '#9ca3af',
  },
  {
    place: '3rd',
    amount: '₹10,000',
    icon: Zap,
    accent: '#cd7f32',
  },
];

function PrizeCard({
  prize,
  index,
  isDesktop = false,
}: {
  prize: Prize;
  index: number;
  isDesktop?: boolean;
}) {
  const Icon = prize.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -8, rotateX: 4 }}
      style={{ perspective: 800 }}
      className={`group relative ${
        prize.featured && isDesktop ? 'md:-mt-6 md:mb-0' : ''
      }`}
    >
      {prize.featured && (
        <div
          className="pointer-events-none absolute -inset-px opacity-70 blur-md"
          style={{
            background:
              'linear-gradient(135deg, #39ff8f, #d9ffe9, #00b34d, #39ff8f)',
          }}
        />
      )}
      <div
        className={`terminal-window relative h-full overflow-hidden p-6 text-center transition-all ${
          prize.featured
            ? 'border-2 border-[#39ff8f] animate-pulse-glow'
            : 'hover:border-matrix-500/50'
        }`}
        style={
          prize.featured
            ? {
                background:
                  'linear-gradient(160deg, rgba(57,255,143,0.16), rgba(6,20,13,0.9) 55%)',
                boxShadow:
                  '0 0 35px rgba(57,255,143,0.4), inset 0 0 25px rgba(57,255,143,0.1)',
              }
            : undefined
        }
      >
        {/* Accent glow bar */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${prize.accent}, transparent)`,
          }}
        />

        {/* Status */}
        <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
          <span
            className="flex items-center gap-1"
            style={{ color: prize.accent }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: prize.accent }}
            />
            ACTIVE
          </span>
          {prize.featured && (
            <span
              className="rounded-sm border px-1.5 py-0.5 tracking-[0.25em]"
              style={{ borderColor: '#39ff8f', color: '#39ff8f' }}
            >
              WINNER
            </span>
          )}
        </div>

        {/* Prize icon */}
        <div className="my-5 flex justify-center">
          <div
            className={`flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 ${
              prize.featured ? 'h-20 w-20' : 'h-16 w-16'
            }`}
            style={{
              borderColor: prize.accent,
              boxShadow: prize.featured
                ? `0 0 30px ${prize.accent}90, 0 0 60px ${prize.accent}40`
                : `0 0 20px ${prize.accent}40`,
              transform: 'rotate(45deg)',
              background: prize.featured
                ? 'radial-gradient(circle, rgba(57,255,143,0.2), transparent 70%)'
                : undefined,
            }}
          >
            <Icon
              className={prize.featured ? 'h-9 w-9' : 'h-7 w-7'}
              style={{
                color: prize.accent,
                transform: 'rotate(-45deg)',
                filter: prize.featured
                  ? 'drop-shadow(0 0 8px rgba(57,255,143,0.9))'
                  : undefined,
              }}
            />
          </div>
        </div>

        {/* Prize amount */}
        <div
          className={`font-mono font-extrabold ${
            prize.featured ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
          }`}
          style={{
            color: prize.accent,
            textShadow: prize.featured
              ? `0 0 24px ${prize.accent}99, 0 0 48px ${prize.accent}55`
              : `0 0 16px ${prize.accent}66`,
          }}
        >
          {prize.amount}
        </div>

        {/* Place */}
        <div
          className={`mt-1 font-mono text-xs ${
            prize.featured ? 'font-bold tracking-widest' : 'text-white/40'
          }`}
          style={prize.featured ? { color: '#39ff8f' } : undefined}
        >
          {prize.place} PLACE
        </div>

        <div className="my-4 h-px bg-matrix-500/15" />
      </div>
    </motion.div>
  );
}

export default function Prizes() {
  return (
    <section id="prizes" className="section-pad relative overflow-hidden">
      {/* Green ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(0,255,102,0.06), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          title="PRIZES"

        />

        {/* Desktop: 2nd → 1st → 3rd */}
        <div className="mt-8 hidden gap-6 md:grid md:grid-cols-3">
          {PRIZES.map((prize, index) => (
            <PrizeCard
              key={`desktop-${prize.place}`}
              prize={prize}
              index={index}
              isDesktop
            />
          ))}
        </div>

        {/* Mobile: 1st → 2nd → 3rd */}
        <div className="mt-8 grid gap-6 md:hidden">
          {MOB_PRIZES.map((prize, index) => (
            <PrizeCard
              key={`mobile-${prize.place}`}
              prize={prize}
              index={index}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center font-mono text-sm text-white/40"
        >
          Build. Break. Debug. Win.
        </motion.p>
      </div>
    </section>
  );
}