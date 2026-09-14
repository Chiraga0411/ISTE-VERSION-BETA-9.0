import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import Logo from './Logo.svg';
const LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'PRIZES', href: '#prizes' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'SPONSORS', href: '#sponsors' },
  { label: 'FAQS', href: '#faqs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      // track active section
      const sections = LINKS.map((l) => document.querySelector(l.href));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= y) {
          setActive(LINKS[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled ? 'glass-panel border-b border-matrix-500/25' : 'bg-transparent'
      }`}
    >
      <nav className="flex w-full items-center justify-between px-5 py-2.5 md:px-12 md:py-3 lg:px-20 lg:py-3.5 xl:px-28">
        {/* Logo */}
        <button
          onClick={() => go('#home')}
          className="group flex items-center gap-2.5"
          data-cursor="hover"
        >
          <span className="flex h-11 items-center justify-center transition-all md:h-12 lg:h-14">
            <img src={Logo} alt="ISTE SC MANIT" className="h-full w-auto" />
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => go(l.href)}
                data-cursor="hover"
                className={`relative px-3 py-2 font-mono text-sm tracking-wider transition-colors ${
                  active === l.href
                    ? 'text-matrix-400'
                    : 'text-white/60 hover:text-matrix-300'
                }`}
              >
                <span className="text-matrix-500/50"></span>
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-1 -bottom-0.5 h-px bg-matrix-400"
                    style={{ boxShadow: '0 0 6px rgba(0,255,102,0.8)' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center border border-matrix-500/40 text-matrix-400 lg:hidden"
          data-cursor="hover"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden glass-panel border-b border-matrix-500/25 lg:hidden"
          >
            <ul className="flex flex-col px-5 py-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    className={`flex w-full items-center gap-2 border-b border-matrix-500/10 py-3 font-mono text-sm tracking-wider ${
                      active === l.href ? 'text-matrix-400' : 'text-white/70'
                    }`}
                  >
                    <span className="text-matrix-500/50"></span>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
