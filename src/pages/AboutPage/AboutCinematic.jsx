import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import steelImg from '../../assets/about_cinematic_steel.png';

const ease = [0.16, 1, 0.3, 1];

export default function AboutCinematic() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.03]);

  return (
    <section className="about-cinematic" ref={ref} id="about-cinematic">
      <motion.img
        src={steelImg}
        alt="Precision engineering"
        className="about-cinematic-img"
        style={{ y, scale }}
      />
      <div className="about-cinematic-overlay" />

      <motion.div
        className="about-cinematic-text"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease }}
      >
        <h3>Engineered to Evolve.</h3>
        <p>Craftsmanship meets ambition</p>
      </motion.div>
    </section>
  );
}
