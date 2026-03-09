import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './CTA.css';

export default function CTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="contact" className="cta" ref={ref}>
      <div className="cta-orb cta-orb-1" />
      <div className="cta-orb cta-orb-2" />
      <div className="cta-noise" />

      <div className="cta-content">
        <motion.div
          className="section-label"
          style={{ justifyContent: 'center' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="label-line" style={{ background: 'var(--accent-red)' }} />
          <span className="label-text" style={{ color: 'var(--accent-red)' }}>Let's Work Together</span>
        </motion.div>

        <motion.h2
          className="cta-title display-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's build<br />
          <span style={{ fontStyle: 'italic', opacity: 0.3 }}>the future</span><br />
          together.
        </motion.h2>

        <motion.p
          className="cta-sub body-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Whether you have a project in mind or want to explore how Elcardo
          can serve your business — we're ready to talk.
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#" className="btn-red" data-cursor="expand">
            Contact Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#" className="btn-outline" data-cursor="expand">
            Request a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
