import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import devfolio from './img/devfolio.png';
import kgen from './img/kgen.png';
import ims from './img/IMS.png';
import stockgro from './img/stockgro.png';

const SPONSORS = [
  { name: 'DEVFOLIO', featured: true, img: devfolio, refer: 'https://devfolio.co/' },
  { name: 'KGEN', featured: false, img: kgen, refer: 'https://kgen.io/' },
  { name: 'IMS', featured: false, img: ims, refer: 'https://www.imsindia.com/' },
  { name: 'STOCKGRO', featured: false, img: stockgro, refer: 'https://www.stockgro.club/' },
];

const PAST = ['MLH', 'GitLab', 'GitHub', 'Polygon', 'Replit', 'Echo3D'];

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-pad relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          title="SPONSORS"

        />

        {/* primary sponsors */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPONSORS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.refer}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative flex flex-col items-center justify-center gap-4 border p-8 transition-all ${
                s.featured
                  ? 'border-matrix-400/50 bg-matrix-950/20 hover:border-matrix-400 hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]'
                  : 'border-matrix-500/25 bg-cyber-ink/60 hover:border-matrix-500/60 hover:shadow-[0_0_20px_rgba(0,255,102,0.2)]'
              }`}
            >
              {/* <span className="absolute left-3 top-3 font-mono text-[9px] text-matrix-500/40">
                0{i + 1}
              </span> */}

              {/* Logo (freely rendered, without individual square/rectangle bounding box) */}
              <div className="flex h-16 w-full items-center justify-center">
                <img
                  src={s.img}
                  alt={s.name}
                  className="max-h-14 max-w-[140px] object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(0,255,102,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,102,0.4)]"
                />
              </div>

              {/* Company name */}
              <div className="text-center">
                <div
                  className={`font-mono text-xl font-extrabold tracking-wide transition-colors ${
                    s.featured ? 'text-white group-hover:text-matrix-300' : 'text-white/80 group-hover:text-white'
                  }`}
                >
                  {s.name}
                </div>
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
