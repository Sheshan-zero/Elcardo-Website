import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './GroupIdentity.css';

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function GroupIdentity() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section className="cpg-identity" id="group-identity">
      <motion.div
        className="cpg-identity__content"
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
      >
        <motion.div
          className="cpg-identity__divider"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 1.0, ease: EASE }}
          style={{ transformOrigin: 'center' }}
        />

        <motion.h2
          className="cpg-identity__headline"
          variants={fadeUp}
          transition={{ duration: 1.0, ease: EASE }}
        >
          One Group.<br />
          <em>Built Beyond Boundaries.</em>
        </motion.h2>

        <motion.p
          className="cpg-identity__subtext"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Engineered to expand across industries — unified by precision,
          driven by purpose.
        </motion.p>

        <motion.div
          className="cpg-identity__mark"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="cpg-identity__mark-dot" />
          <span className="cpg-identity__mark-dot" />
          <span className="cpg-identity__mark-dot--accent cpg-identity__mark-dot" />
          <span className="cpg-identity__mark-dot" />
          <span className="cpg-identity__mark-dot" />
        </motion.div>
      </motion.div>
    </section>
  );
}
