import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  index: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ index, title, subtitle }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-sm text-matrix-500/70"
      >
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-2 font-mono text-4xl font-extrabold tracking-tight text-white md:text-6xl"
      >
        <span className="glitch neon-text" data-text={title}>
          {title}
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 max-w-2xl font-mono text-sm text-white/50 md:text-base"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 h-px origin-left bg-gradient-to-r from-matrix-500 via-matrix-700 to-transparent"
      />
    </div>
  );
}
