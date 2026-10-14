import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown';

export default function Hero() {
  const isLocal =
    typeof window !== 'undefined' &&
    ['localhost', '127.0.0.1'].includes(window.location.hostname);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24"
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,4,2,0.5), rgba(0,4,2,0.7)), url('/images/hero-bg-hacker.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Green glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,255,102,0.10), transparent 70%)',
        }}
      />

      {/* Perspective floor grid */}
      <div
        className="absolute bottom-0 left-1/2 h-1/2 w-[200%] opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,102,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.18) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'translateX(-50%) perspective(400px) rotateX(70deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 0.8 }}
          transition={{
            duration: 0.8,
            delay: 0.05,
            ease: 'easeOut',
          }}
          className="hero-logo-wrap scale-[0.8]"
        >
          <span className="hero-logo-orbit" aria-hidden="true" />

          <img
            src="/image.png"
            alt="Version Beta"
            className="hero-logo"
          />

          <span className="hero-logo-scan" aria-hidden="true" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 flex w-full justify-center text-center font-mono text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span
            className="glitch neon-text block animate-flicker"
            data-text="Version Beta 9.0"
          >
            Version Beta 9.0
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-10 max-w-2xl text-center font-sans text-base text-white/70 md:text-xl"
        >
          Enter the arena where bugs fall, and coders rise! Where every error
          fuels your next breakthrough!
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-8 text-center md:flex-row md:gap-12"
        >
          <div className="flex flex-col items-center gap-2">
            <Countdown />
          </div>
        </motion.div>

        {/* Event details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center font-mono text-lg font-bold text-white/80 md:text-2xl"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-matrix-500">{'>_'}</span>
            Oct 30 — Nov 1, 2026
          </span>

          <span className="hidden h-5 w-px bg-matrix-500/50 sm:block" />

          <span>MANIT, Bhopal</span>
        </motion.div>

        {/* Registration button */}
        <div className="mt-10 flex w-full justify-center">
          {isLocal ? (
            <a
              href="https://version-beta-9.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply with Devfolio"
              className="flex items-center justify-center bg-[#3770FF] text-white transition-colors hover:bg-[#2F5FE0]"
              style={{
                height: '44px',
                width: '312px',
                maxWidth: '100%',
                borderRadius: '4px',
                fontFamily: 'Inter, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <img src="/images/devfolio.png" alt="" className="mr-3 h-7 w-7" />
              Apply with Devfolio
            </a>
          ) : (
            <div
              className="apply-button"
              data-hackathon-slug="version-beta-9"
              data-button-theme="light"
              style={{ height: '44px', width: '312px', maxWidth: '100%' }}
            ></div>
          )}
        </div>
      </div>
    </section>
  );
}