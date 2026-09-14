import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import SectionHeading from './SectionHeading';

const EVENTS = [
  {
    date: '29th Sep',
    title: 'Registration Opens',
    desc: 'The gates lift. Assemble your squad and lock in your slot for the arena.',
    tag: 'REG_OPEN',
  },
  {
    date: 'Till 18th Oct',
    title: 'Ideation Phase',
    desc: 'Brainstorm, scope, and sharpen your concept. Submit your proposal for review.',
    tag: 'IDEATE',
  },
  {
    date: '20th Oct',
    title: 'Shortlist Announcement',
    desc: 'Selected teams are revealed. Check your inbox — the subject line says ACCESS GRANTED.',
    tag: 'SHORTLIST',
  },
  {
    date: '21st Oct',
    title: 'Team Formation',
    desc: 'Finalize your roster. Confirm teammates, roles, and stack before the clock starts.',
    tag: 'TEAM_UP',
  },
  {
    date: '30th Oct — 1st Nov',
    title: 'Hackathon Weekend',
    desc: '36 hours. One campus. Zero excuses. Build, break, and ship — live at NIT-B.',
    tag: 'LIVE',
    highlight: true,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          index="02"
          title="TIMELINE"

        />

        <div className="relative mt-6">
          {/* vertical line */}
          <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-matrix-500 via-matrix-700/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {EVENTS.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative flex items-start gap-6 pl-12 md:min-h-[120px] md:gap-0 md:pl-0 ${
                  i % 2 === 0
                    ? 'md:flex-row-reverse md:text-right'
                    : 'md:flex-row'
                }`}
              >
                {/* node */}
                <div className="absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2">
                  <span
                    className={`flex h-3 w-3 items-center justify-center rounded-full ${
                      e.highlight ? 'bg-matrix-400' : 'bg-matrix-600'
                    }`}
                    style={{
                      boxShadow: e.highlight
                        ? '0 0 12px rgba(0,255,102,0.9)'
                        : '0 0 6px rgba(0,255,102,0.5)',
                    }}
                  />
                  {e.highlight && (
                    <span className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-matrix-400/60" />
                  )}
                </div>

                {/* spacer for desktop alternation */}
                <div className="hidden md:block md:w-1/2" />

                {/* card */}
                <div
                  className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}
                >
                  <div
                    className={`terminal-window group p-5 transition-all hover:shadow-[0_0_25px_rgba(0,255,102,0.2)] ${
                      e.highlight ? 'border-matrix-400/60' : ''
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        i % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <Calendar className="h-5 w-5 text-matrix-400" />
                      <span className="font-mono text-lg font-bold text-matrix-400 md:text-xl">
                        {e.date}
                      </span>
                      <span className="ml-auto rounded-sm border border-matrix-500/30 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-matrix-500/70">
                        {e.tag}
                      </span>
                    </div>
                    <h3 className="mt-2 font-mono text-lg font-bold text-white">
                      {e.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-white/60">
                      {e.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
