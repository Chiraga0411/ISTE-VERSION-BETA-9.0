import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const CONTACTS = [
  { name: 'Sanjana Malani', phone: '+91 7691929205' },
  { name: 'Tanishq Dinkar', phone: '+91 9109896779' },
];

const SOCIALS = [
  { Icon: Instagram, href: 'https://www.instagram.com/istemanit/', label: 'Instagram' },
  { Icon: Facebook, href: 'https://www.facebook.com/ISTESCMANIT', label: 'Facebook' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/iste-sc-manit/posts/?feedView=all', label: 'LinkedIn' },
];

const BOTTOM_LINKS = [
  { label: 'Code Of Conduct Devfolio', href: 'https://devfolio.co/code-of-conduct' },
  { label: 'Rulebook', href: 'https://version-beta-main.vercel.app/Images/VBrulebook-2024.pdf' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-matrix-500/25 bg-cyber-ink">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,255,102,0.6), transparent)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:divide-x md:divide-matrix-500/20">
          {/* Contact Us */}
          <div className="md:pr-12">
            <h4 className="mb-6 font-mono text-2xl font-bold tracking-wide text-matrix-400">
              Contact Us
            </h4>

            <div className="space-y-4">
              {CONTACTS.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-matrix-400" />
                  <span className="font-mono text-base text-white/85">{c.name}</span>
                  <span className="font-mono text-base text-white/60">{c.phone}</span>
                </div>
              ))}

              <div className="flex items-start gap-3 pt-1">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-matrix-400" />
                <span className="font-mono text-base leading-relaxed text-white/70">
                  Maulana Azad National Institute Of Technology Bhopal, 462003
                  (M.P.)
                </span>
              </div>

              <a
                href="mailto:istescmanit@gmail.com"
                data-cursor="hover"
                className="flex items-center gap-3 font-mono text-base text-white/70 transition-colors hover:text-matrix-400"
              >
                <Mail className="h-5 w-5 flex-shrink-0 text-matrix-400" />
                istescmanit@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:pl-12">
            <h4 className="mb-6 font-mono text-2xl font-bold tracking-wide text-matrix-400">
              Social Links
            </h4>

            <div className="space-y-5">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group flex items-center gap-3 font-mono text-base text-white/85 transition-colors hover:text-matrix-400"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-matrix-500/40 bg-matrix-950/40 transition-colors group-hover:border-matrix-400">
                    <Icon className="h-5 w-5 text-matrix-400" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom links bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-matrix-500/20 pt-8 font-mono text-base text-white/70 sm:flex-row"
        >
          {BOTTOM_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="py-1 transition-colors hover:text-matrix-400"
            >
              {l.label}
            </a>
          ))}
        </motion.div>

        {/* copyright */}
        <div className="mt-6 border-t border-matrix-500/15 pt-6 text-center font-mono text-sm text-white/40">
          Copyright © 2026 by ISTE SC MANIT . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
