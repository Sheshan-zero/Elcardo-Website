import React from 'react';
import { motion } from 'framer-motion';

const values = [
  { icon: '🚀', title: 'Innovation', desc: 'Pushing boundaries in engineering and technology.' },
  { icon: '⭐', title: 'Quality', desc: 'Uncompromising standards across every sector.' },
  { icon: '🛡️', title: 'Reliability', desc: 'A legacy of trust spanning decades of operation.' },
  { icon: '🌱', title: 'Sustainability', desc: 'Building products that power a cleaner future.' },
  { icon: '🤝', title: 'Trust', desc: 'Cultivating enduring relationships with global clients.' },
];

export default function AboutValues() {
  return (
    <section className="about-section about-values">
      <motion.h2 
        className="about-title-medium"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Our Values
      </motion.h2>

      <div className="about-values-grid">
        {values.map((v, i) => (
          <motion.div 
            key={v.title}
            className="about-value-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
          >
            <div className="about-value-icon">{v.icon}</div>
            <h4>{v.title}</h4>
            <p>{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
