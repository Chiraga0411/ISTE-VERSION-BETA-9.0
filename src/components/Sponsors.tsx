import { motion } from 'framer-motion';
import { Box } from 'lucide-react';
import SectionHeading from './SectionHeading';
import devfolio from './img/devfolio.png';
import kgen from './img/kgen.png';
import ims from './img/IMS.png';
import stockgro from './img/stockgro.png';

const SPONSORS = [
  { name: 'DEVFOLIO', tier: 'PLATFORM PARTNER', featured: true,img:devfolio,refer:'https://devfolio.co/' },
  { name: 'KGEN', tier: 'ECOSYSTEM PARTNER', featured: false,img:kgen,refer:'https://kgen.io/' },
  { name: 'IMS', tier: 'SUPPORTING PARTNER', featured: false,img:ims,refer:'https://www.imsindia.com/' },
  { name: 'STOCKGRO', tier: 'SUPPORTING PARTNER', featured: false ,img:stockgro,refer:'https://www.stockgro.club/'},
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSORS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.refer}
              data-cursor="hover"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative flex flex-col items-center justify-center gap-3 border p-8 transition-all ${
                s.featured
                  ? 'border-matrix-400/50 bg-matrix-950/20 hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]'
                  : 'border-matrix-500/25 bg-cyber-ink/60 hover:border-matrix-500/50 hover:shadow-[0_0_20px_rgba(0,255,102,0.15)]'
              }`}
            >
              <span className="absolute left-2 top-2 font-mono text-[9px] text-matrix-500/40">
                0{i + 1}
              </span>
              <div
                className={`flex h-14 w-14 items-center justify-center border transition-all group-hover:rotate-45 ${
                  s.featured
                    ? 'border-matrix-400 text-matrix-400'
                    : 'border-matrix-500/40 text-matrix-500/70'
                }`}
              > 
              <img src={s.img} />
              </div>
              <div className="text-center">
                <div
                  className={`font-mono text-xl font-extrabold tracking-wide ${
                    s.featured ? 'text-white' : 'text-white/80'
                  }`}
                >
                  {s.name}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-matrix-500/60">
                  {s.tier}
                </div>
              </div>
              {/* hover line */}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-matrix-400 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
