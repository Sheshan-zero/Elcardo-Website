import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { companies } from '../../data/companiesData';
import './CompanyBreakdown.css';

const EASE = [0.16, 1, 0.3, 1];

const SHORT_DESCS = [
  "Industrial-grade gate systems and access automation engineered for precision.",
  "End-to-end solar energy solutions powering Sri Lanka's sustainable future.",
  "Advanced energy storage built for reliability and industrial performance.",
  "Luxury hospitality blending modern elegance with authentic warmth.",
  "Bespoke vehicle customization and fleet solutions for discerning clients.",
];

const STATS = [
  ['500+', 'Installations'],
  ['50MW+', 'Generated'],
  ['98%', 'Efficiency'],
  ['3', 'Properties'],
  ['1000+', 'Vehicles'],
];

export default function CompanyBreakdown() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true, threshold: 0.2,
  });

  return (
    <section className="cpb" id="company-breakdown">
      <motion.div
        className="cpb__header"
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.span className="cpb__kicker"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="cpb__kicker-line" />
          Our Companies
        </motion.span>
        <motion.h2 className="cpb__title"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 1, ease: EASE }}
        >
          Five Divisions,<br /><em>One Standard.</em>
        </motion.h2>
        <motion.p className="cpb__subtitle"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Each company operates with full autonomy — united by shared engineering
          principles and an uncompromising pursuit of quality.
        </motion.p>
      </motion.div>

      <div className="cpb__list">
        {companies.map((co, i) => (
          <CompanyBlock key={co.id} company={co} index={i} desc={SHORT_DESCS[i]} stat={STATS[i]} />
        ))}
      </div>
    </section>
  );
}

function CompanyBlock({ company, index, desc, stat }) {
  const blockRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.02]);
  const isEven = index % 2 === 1;

  return (
    <motion.div
      className={`cpb__item ${isEven ? 'cpb__item--reverse' : ''}`}
      ref={(el) => { ref(el); blockRef.current = el; }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ staggerChildren: 0.1 }}
    >
      {/* 3D perspective image */}
      <motion.div
        className="cpb__image-wrap"
        variants={{
          hidden: { opacity: 0, scale: 0.94, rotateY: isEven ? -6 : 6 },
          visible: { opacity: 1, scale: 1, rotateY: 0 },
        }}
        transition={{ duration: 1.1, ease: EASE }}
        whileHover={{ scale: 1.02, rotateY: isEven ? 2 : -2 }}
        style={{ perspective: 800 }}
      >
        <motion.img
          src={company.image}
          alt={company.name}
          loading="lazy"
          style={{ y: imageY, scale: imageScale }}
        />
        {/* Hover shine effect */}
        <div className="cpb__image-shine" />
        {/* Index badge */}
        <div className="cpb__image-badge">{company.index}</div>
      </motion.div>

      {/* Content */}
      <motion.div className="cpb__content"
        variants={{
          hidden: { opacity: 0, x: isEven ? -40 : 40 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      >
        <span className="cpb__index">{company.index}</span>
        <h3 className="cpb__name">{company.name}</h3>
        <span className="cpb__sector">{company.sector}</span>
        <p className="cpb__desc">{desc}</p>

        {/* Stat highlight */}
        <div className="cpb__stat">
          <span className="cpb__stat-value">{stat[0]}</span>
          <span className="cpb__stat-label">{stat[1]}</span>
        </div>

        <motion.div className="cpb__divider"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.div>
  );
}
