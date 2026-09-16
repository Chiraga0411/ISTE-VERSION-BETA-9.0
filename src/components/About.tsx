import { motion } from 'framer-motion';

import SectionHeading from './SectionHeading';
import student from './student.jpg'

// Pure CSS 3D wireframe cube
function WireCube({ size, className }: { size: number; className?: string }) {
  const h = size / 2;
  const face = (transform: string, opacity = 0.12) => (
    <div
      className="absolute border border-matrix-500"
      style={{
        width: size,
        height: size,
        marginLeft: -h,
        marginTop: -h,
        transform,
        background: `rgba(0,255,102,${opacity})`,
      }}
    />
  );
  return (
    <div
      className={className}
      style={{ width: size, height: size, perspective: 600 }}
    >
      <div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg) rotateY(30deg)' }}
      >
        {face(`translateZ(${h}px)`, 0.05)}
        {face(`rotateY(180deg) translateZ(${h}px)`, 0.05)}
        {face(`rotateY(90deg) translateZ(${h}px)`, 0.08)}
        {face(`rotateY(-90deg) translateZ(${h}px)`, 0.08)}
        {face(`rotateX(90deg) translateZ(${h}px)`, 0.06)}
        {face(`rotateX(-90deg) translateZ(${h}px)`, 0.06)}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden pb-8 md:pb-12">
      {/* floating 3D shapes */}
      <WireCube
        size={120}
        className="absolute left-[6%] top-[18%] animate-float-slow opacity-50"
      />
      <WireCube
        size={80}
        className="absolute right-[8%] top-[12%] animate-float-slower opacity-40"
      />
      <WireCube
        size={60}
        className="absolute right-[18%] bottom-[14%] animate-float-slow opacity-30"
      />
      <div className="absolute left-[12%] bottom-[10%] h-24 w-24 animate-spin-slow opacity-20">
        <div className="h-full w-full border-2 border-matrix-500/40" style={{ transform: 'rotate(45deg)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          title="ABOUT"
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* MLH badge card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center gap-5"
          >
            <div className="terminal-window animate-pulse-glow w-full h-full flex flex-col justify-center min-w-[40vw] p-4 md:min-w-[440px] md:p-6">
              <img src={student} className="w-full h-auto rounded-sm" alt="Students" />
            </div>
          </motion.div>

          {/* narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="terminal-window space-y-5 p-6 md:p-8"
          >

            <p className="font-sans text-base leading-relaxed text-white/80 md:text-lg">
              <span className="font-mono text-matrix-400">{'> '}</span>
              Version Beta is the amalgamation of some of the nation's greatest
              technological minds, with an ideal platform for technology
              enthusiasts to demonstrate their talents and ingenuity. After
              successfully organizing its digital variation for the last two
              years we are back this year, grander than ever, to build on the
              legacy of our offline editions.
            </p>
            <p className="font-sans text-base leading-relaxed text-white/70 md:text-lg">
              <span className="font-mono text-matrix-400">{'> '}</span>
              To bring you an array of diverse activities, we have included
              synchronized delivery of workshops, and guest speakers of the
              highest caliber from the world of technology and
              entrepreneurship. It is accompanied by a{' '}
              <span className="neon-text font-semibold">36-hour hack-a-thon</span>{' '}
              powered by MLH, the largest in central India, allowing
              participants to test their intelligence, be recognized and get
              rewarded while rubbing shoulders with the offline NIT-B campus
              experience and real-time guidance from the MLH community.
            </p>
            <p className="font-sans text-base leading-relaxed text-white/70 md:text-lg">
              <span className="font-mono text-matrix-400">{'> '}</span>
              In a stroke, Version Beta is the souls' satisfiers of tech
              aficionados while fostering the next generation of developers,
              thinkers, and entrepreneurs.
            </p>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
