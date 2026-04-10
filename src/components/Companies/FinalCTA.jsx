import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FinalCTA.css';

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function FinalCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="cpg-cta" id="companies-cta">
      <motion.div
        className="cpg-cta__inner"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
      >
        <motion.span
          className="cpg-cta__kicker"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="cpg-cta__kicker-line" />
          Get Started
        </motion.span>

        <motion.h2
          className="cpg-cta__headline"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Built Beyond One Industry.
        </motion.h2>

        <motion.p
          className="cpg-cta__subtext"
          variants={fadeUp}
          transition={{ duration: 0.85, ease: EASE }}
        >
          Discover what a multi-industry engineering group can build
          for your next project.
        </motion.p>

        <motion.div
          className="cpg-cta__buttons"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Link to="/" className="cpg-cta__btn cpg-cta__btn--primary" data-cursor="expand">
            Explore Products
            <span className="cpg-cta__btn-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <Link to="/contact" className="cpg-cta__btn cpg-cta__btn--ghost" data-cursor="expand" style={{background: 'var(--near-black)', color: 'white', padding: '16px 32px', borderRadius: '100px', fontWeight: 600, border: 'none'}}>
            Contact Us
          </Link>
        </motion.div>

        <motion.div
          className="cpg-cta__bottom-divider"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{ transformOrigin: 'center' }}
        />
      </motion.div>
    </section>
  );
}
