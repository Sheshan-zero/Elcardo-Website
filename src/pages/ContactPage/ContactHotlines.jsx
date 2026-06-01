import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ease = [0.16, 1, 0.3, 1];

const hotlines = [
  { label: 'Head Office', number: '+94 11 280 5556', tel: '+94112805556' },
  { label: 'WhatsApp', number: '+94 71 872 1616', tel: '+94718721616' },
  { label: 'Service & Repairs', number: '0112 623 423', tel: '+94112623423' },
  { label: 'Fax', number: '+94 11 280 5156', tel: '+94112805156' },
];

export default function ContactHotlines() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="contact-hotlines-section" id="contact-hotlines" ref={ref}>
      <motion.div
        className="contact-hotlines-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease }}
      >
        <p className="contact-hotlines-kicker">Direct Lines</p>
        <h2 className="contact-hotlines-title">
          Key <em>Numbers</em>
        </h2>
      </motion.div>

      <div className="contact-hotlines-grid">
        {hotlines.map((item, i) => (
          <motion.div
            key={item.label}
            className="contact-hotline-item"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease }}
          >
            <div className="contact-hotline-label">{item.label}</div>
            <div className="contact-hotline-number">
              <a href={`tel:${item.tel}`} data-cursor="expand">{item.number}</a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
