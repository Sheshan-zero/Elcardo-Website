import React from 'react';
import { motion } from 'framer-motion';
import './RD_Intro.css';

const ease = [0.16, 1, 0.3, 1];

const SEGMENTS = [
  {
    title: 'Residential',
    desc: 'Modern access for garages and boundary walls.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Commercial',
    desc: 'Reliable protection for shops and business entrances.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        <path d="M6 11h4M6 15h4M14 11h4M14 15h4" />
      </svg>
    ),
  },
  {
    title: 'Industrial',
    desc: 'Durable solutions for warehouses and facilities.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20V8l5-4v16M7 20V6l5-4v18M12 20h10V10l-5 2v8" />
        <path d="M17 14v2M17 18v2" />
      </svg>
    ),
  },
];

const RD_Intro = () => (
  <section className="rdi">
    <div className="rdi-inner">
      <motion.div
        className="rdi-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label" style={{ justifyContent: 'center' }}>What We Build</span>
        <h2 className="rd-heading" style={{ textAlign: 'center' }}>
          Access solutions for every space.
        </h2>
        <p className="rd-body-text" style={{ textAlign: 'center', margin: '0 auto' }}>
          From residential garages to industrial warehouses, Elcardo roller doors deliver reliable security, smooth operation, and lasting quality.
        </p>
      </motion.div>

      <div className="rdi-grid">
        {SEGMENTS.map((seg, i) => (
          <motion.div
            key={seg.title}
            className="rdi-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.12, ease }}
          >
            <div className="rdi-card-icon">{seg.icon}</div>
            <h3 className="rdi-card-title">{seg.title}</h3>
            <p className="rdi-card-desc">{seg.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RD_Intro;
