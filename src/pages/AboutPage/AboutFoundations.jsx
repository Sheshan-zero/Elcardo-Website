import React from 'react';
import { motion } from 'framer-motion';
import sketchBg from '../../assets/sketch_building.png';

const ease = [0.16, 1, 0.3, 1];

const foundations = [
  {
    word: 'Precision',
    desc: 'Every detail is considered. Every mechanism calibrated. We engineer to standards that set the standard.',
  },
  {
    word: 'Durability',
    desc: 'Built to last beyond expectation. Our products endure harsh conditions because we refuse to compromise.',
  },
  {
    word: 'Innovation',
    desc: 'We challenge convention. From roller gates to automotive design, we find better ways forward.',
  },
  {
    word: 'Trust',
    desc: 'A decade of promises kept. Our clients return because we deliver — consistently, reliably, completely.',
  },
  {
    word: 'Expansion',
    desc: 'Growth driven by opportunity. Each new sector is a natural extension of our engineering DNA.',
  },
];

export default function AboutFoundations() {
  return (
    <section className="about-foundations" id="about-foundations">
      {/* Pencil sketch background artwork */}
      <motion.div
        className="about-foundations-sketch"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 2, ease }}
      >
        <img src={sketchBg} alt="" aria-hidden="true" />
      </motion.div>

      <div className="about-foundations-inner">
        <div className="about-foundations-header">
          <motion.p
            className="about-kicker"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            What Defines Us
          </motion.p>
          <motion.h2
            className="about-title-md"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            Built on principle.
          </motion.h2>
        </div>

        {foundations.map((f, i) => (
          <motion.div
            key={f.word}
            className="about-foundation-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
          >
            <span className="about-foundation-number">0{i + 1}</span>
            <span className="about-foundation-word">{f.word}</span>
            <span className="about-foundation-desc">{f.desc}</span>
            <div className="about-foundation-line" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
