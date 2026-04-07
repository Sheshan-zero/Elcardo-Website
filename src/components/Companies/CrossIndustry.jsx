import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './CrossIndustry.css';

const EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
  {
    num: '01',
    name: 'Engineering',
    desc: 'Precision manufacturing and industrial automation systems.',
  },
  {
    num: '02',
    name: 'Energy',
    desc: 'Solar generation and advanced battery storage solutions.',
  },
  {
    num: '03',
    name: 'Hospitality',
    desc: 'Luxury experiences blending elegance and warmth.',
  },
  {
    num: '04',
    name: 'Automotive',
    desc: 'Bespoke vehicle customization and fleet engineering.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const lineExpand = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1 },
};

export default function CrossIndustry() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: pillarsRef, inView: pillarsInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const { ref: lineRef, inView: lineInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="cpg-xind" id="cross-industry">
      {/* ─── Header ─── */}
      <motion.div
        className="cpg-xind__header"
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
        variants={fadeUp}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="cpg-xind__kicker">
          <span className="cpg-xind__kicker-line" />
          Unified Strength
        </span>
        <h2 className="cpg-xind__title">
          Built Across <em>Industries</em>
        </h2>
      </motion.div>

      {/* ─── Pillars ─── */}
      <motion.div
        className="cpg-xind__pillars"
        ref={pillarsRef}
        initial="hidden"
        animate={pillarsInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
      >
        {PILLARS.map((p) => (
          <motion.div
            className="cpg-xind__pillar"
            key={p.num}
            variants={fadeUp}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <div className="cpg-xind__pillar-num">{p.num}</div>
            <h3 className="cpg-xind__pillar-name">{p.name}</h3>
            <p className="cpg-xind__pillar-desc">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── Connecting line ─── */}
      <motion.div
        className="cpg-xind__connector"
        ref={lineRef}
        initial="hidden"
        animate={lineInView ? 'visible' : 'hidden'}
        variants={lineExpand}
        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        style={{ transformOrigin: 'center' }}
      >
        <div className="cpg-xind__connector-line" />
        <div className="cpg-xind__connector-dot" />
      </motion.div>

      {/* ─── Footer ─── */}
      <motion.div
        className="cpg-xind__footer"
        initial="hidden"
        animate={lineInView ? 'visible' : 'hidden'}
        variants={fadeUp}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
      >
        <p className="cpg-xind__footer-text">
          One group. Four pillars. Infinite possibility.
        </p>
      </motion.div>
    </section>
  );
}
