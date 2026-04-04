import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const sectors = [
  {
    name: 'Roller Gates',
    desc: 'Automated security solutions for commercial and industrial spaces.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
  },
  {
    name: 'Battery Technology',
    desc: 'High-performance energy storage for automotive and deep-cycle applications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="18" rx="2" />
        <path d="M10 2h4" />
        <path d="M12 10v4M10 12h4" />
      </svg>
    ),
  },
  {
    name: 'Anilad Hotel',
    desc: 'Premium hospitality rooted in elegance and sustainability.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    name: 'Pantry Cupboards',
    desc: 'Modular kitchen and storage systems crafted with precision engineering.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M12 3v18M2 12h20" />
        <path d="M8 7.5h1M8 15.5h1M15 7.5h1M15 15.5h1" />
      </svg>
    ),
  },
  {
    name: 'Elme Cars',
    desc: 'Bespoke vehicle modification and specialized automotive engineering.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14M7 17l1-6h8l1 6" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
        <path d="M3 17h2M19 17h2" />
        <path d="M5 11l2-4h10l2 4" />
      </svg>
    ),
  },
  {
    name: 'Steel & Fabrication',
    desc: 'Industrial fabrication, structural steel, and precision metalwork.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.73 20.2a2 2 0 01-2.83-2.83l6.73-6.73A6 6 0 017.56 2.7l3.77 3.77" />
      </svg>
    ),
  },
];

export default function AboutExpansion() {
  return (
    <section className="about-expansion" id="about-expansion">
      <div className="about-expansion-header">
        <motion.p
          className="about-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Our Portfolio
        </motion.p>
        <motion.h2
          className="about-title-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          Six Sectors. <em>One Vision.</em>
        </motion.h2>
        <motion.p
          className="about-body"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          A diversified portfolio unified by an unwavering commitment to quality and innovation.
        </motion.p>
      </div>

      <div className="about-expansion-grid">
        {sectors.map((sector, i) => (
          <motion.div
            key={sector.name}
            className="about-expansion-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
            data-cursor="expand"
          >
            <div className="about-expansion-icon">{sector.icon}</div>
            <h4>{sector.name}</h4>
            <p>{sector.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
