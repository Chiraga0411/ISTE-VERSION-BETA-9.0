import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeading from './SectionHeading';

const FAQS = [
  {
    q: 'Who are we?',
    a: "We are the ISTE Students' Chapter MANIT — a crew of builders, dreamers, and code-warriors from NIT Bhopal who live to ship. Version Beta is our flagship hackathon, now in its 9th iteration.",
  },
  {
    q: 'What are we looking in a team?',
    a: 'Passion, grit, and the ability to think under pressure. We want teams that can turn a wild idea into a working prototype in 36 hours — designers, devs, and dreamers alike.',
  },
  {
    q: 'What is version beta?',
    a: "Version Beta is a 36-hour offline hackathon powered by MLH, hosted at NIT Bhopal. It's where the brightest tech minds converge to build, break, and ship — all on the NIT-B campus.",
  },
  {
    q: 'Will Hackathon be conducted online?',
    a: 'No. Version Beta 9.0 is a fully offline, on-campus event. You hack live at MANIT, Bhopal. The full NIT-B experience — mentors, swag, midnight chai, and the arena.',
  },
  {
    q: 'Who should participate?',
    a: "Any college student with a pulse for problem-solving. Whether you're a seasoned hacker or a first-timer with a bold idea, there's a slot for you.",
  },
  {
    q: 'What is the goal of Hackathon?',
    a: "To build something that works — and something you'd be proud to show off. Network, learn from mentors, push your limits, and maybe walk away with a prize.",
  },
  {
    q: 'Number of members in a team?',
    a: 'A team can have 2 to 4 members. Solo hacking is allowed but we recommend teaming up — the best builds usually come from a balanced squad.',
  },
  {
    q: 'How would I know if I got selected?',
    a: 'Shortlisted teams are announced on 20th Oct via email and our social handles. Make sure you check the inbox you registered with — and your spam folder, just in case.',
  },
  {
    q: 'How to participate?',
    a: 'Register on our Devfolio portal when applications open on 29th Sep. Submit your idea during the ideation phase, and await the shortlist on 20th Oct.',
  },
  {
    q: 'Cost for participation?',
    a: 'Registration is free. Selected teams get access to the campus, meals during the hackathon, swag, and mentorship — all covered. Travel and accommodation are on you.',
  },
  {
    q: 'What is selection procedure?',
    a: 'Teams are shortlisted based on the strength of their idea submission during the ideation phase. Originality, feasibility, and impact carry the most weight.',
  },
];

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`faq-item terminal-window overflow-hidden transition-all ${
        isOpen ? 'border-matrix-400/50' : ''
      }`}
    >
      <button
        onClick={onToggle}
        data-cursor="hover"
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span className="font-mono text-xs text-matrix-500/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-matrix-500/60">{'>'}</span>
        <span className="flex-1 font-mono text-sm font-semibold text-white/90 md:text-base">
          {faq.q}
        </span>
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center border transition-all ${
            isOpen
              ? 'border-matrix-400 bg-matrix-400/10 text-matrix-400'
              : 'border-matrix-500/40 text-matrix-500'
          }`}
        >
          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-matrix-500/20 px-5 py-4">

              <p className="pl-4 border-l border-matrix-500/30 font-sans text-sm leading-relaxed text-white/70">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="section-pad relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading
          index="06"
          title="FAQs"

        />

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <FaqItem
                faq={f}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
