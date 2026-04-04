import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];

export default function AboutCTA() {
  return (
    <section className="about-cta" id="about-cta">
      <motion.div
        className="about-cta-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="about-cta-divider"
          initial={{ height: 0 }}
          whileInView={{ height: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        />

        <motion.h2
          className="about-cta-headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          The story <em>continues.</em>
        </motion.h2>

        <motion.p
          className="about-cta-sub"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          Whether you're seeking solutions, partnerships, or possibilities — we're ready to build together.
        </motion.p>

        <motion.div
          className="about-cta-actions"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
        >
          <Link to="/companies" className="about-btn-primary" data-cursor="expand">
            Explore Our Work
          </Link>
          <Link to="/#contact" className="about-btn-secondary" data-cursor="expand">
            Contact Elcardo
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
