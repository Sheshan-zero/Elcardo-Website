import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];

export default function ProjectsCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="projects-cta" id="projects-cta" ref={ref}>
      <div className="projects-cta-orb projects-cta-orb-1" />
      <div className="projects-cta-orb projects-cta-orb-2" />

      <motion.p
        className="projects-cta-kicker"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
      >
        Ready to Start?
      </motion.p>

      <motion.h2
        className="projects-cta-title"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.1, ease }}
      >
        Let's Build<br />
        <em>Together.</em>
      </motion.h2>

      <motion.p
        className="projects-cta-sub"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease }}
      >
        Whether it's a residential gate, a commercial solar system, or an industrial facility — we're ready.
      </motion.p>

      <motion.div
        className="projects-cta-buttons"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease }}
      >
        <Link to="/#contact" className="btn-red" data-cursor="expand">
          Contact Us
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <Link to="/products" className="btn-outline" data-cursor="expand">
          View Products
        </Link>
      </motion.div>
    </section>
  );
}
