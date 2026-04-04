import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];

export default function ContactSupportCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="contact-support-cta" id="contact-support-cta" ref={ref}>
      <div className="contact-support-cta-orb contact-support-cta-orb-1" />
      <div className="contact-support-cta-orb contact-support-cta-orb-2" />

      <motion.div
        className="contact-support-cta-divider"
        initial={{ height: 0 }}
        animate={inView ? { height: 56 } : {}}
        transition={{ duration: 0.8, ease }}
      />

      <motion.p
        className="contact-support-cta-kicker"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease }}
      >
        We're Here to Help
      </motion.p>

      <motion.h2
        className="contact-support-cta-headline"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.15, ease }}
      >
        Let's Build<br />
        <em>Together.</em>
      </motion.h2>

      <motion.p
        className="contact-support-cta-sub"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease }}
      >
        Whether you need a quotation, technical support, or branch directions — our teams are ready.
      </motion.p>

      <motion.div
        className="contact-support-cta-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease }}
      >
        <a href="#contact-form" className="contact-cta-btn-primary" data-cursor="expand">
          Send Inquiry
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#contact-map" className="contact-cta-btn-secondary" data-cursor="expand">
          Find a Branch
        </a>
      </motion.div>
    </section>
  );
}
