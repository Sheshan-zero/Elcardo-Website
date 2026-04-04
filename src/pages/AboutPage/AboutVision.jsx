import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function AboutVision() {
  return (
    <section className="about-vision" id="about-vision">
      <motion.div
        className="about-vision-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="about-kicker"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Our Vision
        </motion.p>

        <motion.div
          className="about-vision-divider"
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        />

        <motion.blockquote
          className="about-vision-quote"
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        >
          We don't build for today. We engineer for generations — creating industries that outlast us, structures that define skylines, and solutions that power progress.
        </motion.blockquote>

        <motion.div
          className="about-vision-attribution"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
        >
          <span>Elcardo Industries</span>
          <span>Founding Vision</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
