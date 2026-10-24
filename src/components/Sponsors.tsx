import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import devfolio from './img/devfolio.png';
import kgen from './img/kgen.png';
import ims from './img/IMS.png';
import stockgro from './img/stockgro.png';
import omnirush from './img/Artboard_1.png';

type Sponsor = {
  name: string;
  featured: boolean;
  img: string;
  refer: string;
  /** true for logos that come with their own solid background (e.g. a square app icon) */
  boxed?: boolean;
};

const SPONSORS: Sponsor[] = [
  { name: 'DEVFOLIO', featured: true, img: devfolio, refer: 'https://devfolio.co/' },
  { name: 'KGEN', featured: false, img: kgen, refer: 'https://kgen.io/' },
  { name: 'IMS', featured: false, img: ims, refer: 'https://www.imsindia.com/' },
  { name: 'STOCKGRO', featured: false, img: stockgro, refer: 'https://www.stockgro.club/' },
  { name: 'OMNIRUSH', featured: false, img: omnirush, refer: 'https://omnirush.ai/', boxed: true },
];

const PAST = ['MLH', 'GitLab', 'GitHub', 'Polygon', 'Replit', 'Echo3D'];

/* Little L-shaped HUD brackets on each corner of a card */
const CORNERS = [
  'left-0 top-0 border-l-2 border-t-2',
  'right-0 top-0 border-r-2 border-t-2',
  'bottom-0 left-0 border-b-2 border-l-2',
  'bottom-0 right-0 border-b-2 border-r-2',
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-pad relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading index="05" title="SPONSORS" />

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {SPONSORS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.refer}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.name} (opens in a new tab)`}
              data-cursor="hover"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative flex w-full flex-col items-center justify-center gap-6 border px-6 py-10 transition-all sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-matrix-400 ${
                s.featured
                  ? 'border-matrix-400/50 bg-matrix-950/20 hover:border-matrix-400 hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]'
                  : 'border-matrix-500/25 bg-cyber-ink/60 hover:border-matrix-500/60 hover:shadow-[0_0_20px_rgba(0,255,102,0.2)]'
              }`}
            >
              {/* Corner brackets: dim at rest, bright + slightly larger on hover */}
              {CORNERS.map((pos) => (
                <span
                  key={pos}
                  aria-hidden="true"
                  className={`pointer-events-none absolute h-3 w-3 transition-all duration-300 group-hover:h-5 group-hover:w-5 ${pos} ${
                    s.featured
                      ? 'border-matrix-400'
                      : 'border-matrix-500/50 group-hover:border-matrix-400'
                  }`}
                />
              ))}

              {/* Logo: fixed-size box so every logo gets the same visual footprint */}
              <div className="flex h-20 w-full items-center justify-center">
                <img
                  src={s.img}
                  alt={s.name}
                  className={`max-h-20 max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105 ${
                    s.boxed
                      ? 'h-16 w-16 rounded-lg'
                      : 'drop-shadow-[0_0_10px_rgba(0,255,102,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                  }`}
                />
              </div>

              {/* Name: quieter than the logo so the logo stays the hero */}
              <div
                className={`text-center font-mono text-sm font-semibold tracking-[0.25em] transition-colors ${
                  s.featured
                    ? 'text-matrix-300 group-hover:text-white'
                    : 'text-white/60 group-hover:text-matrix-300'
                }`}
              >
                {s.name}
              </div>

              {/* Cyber hover line */}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-matrix-400 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}