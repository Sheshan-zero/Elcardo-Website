import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ease = [0.16, 1, 0.3, 1];

const hotlines = [
  { label: 'Head Office Hotline', number: '+94 11 234 5678', tel: '+94112345678' },
  { label: 'Sales Inquiries', number: '+94 11 234 5679', tel: '+94112345679' },
  { label: 'Service & Repairs', number: '+94 11 234 5680', tel: '+94112345680' },
  { label: 'Branch Inquiries', number: '+94 11 234 5681', tel: '+94112345681' },
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
