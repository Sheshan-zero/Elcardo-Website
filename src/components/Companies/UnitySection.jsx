import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './UnitySection.css';

const EASE = [0.16, 1, 0.3, 1];

export default function UnitySection() {
  const sectionRef = useRef(null);
  const { ref: contentRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <section className="cns" ref={sectionRef} id="unity">
      <div className="cns__container" ref={contentRef}>
        
        {/* Subtle background line graphics */}
        <motion.div className="cns__bg-lines" style={{ scale: lineScale }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <line x1="50" y1="0" x2="50" y2="100" stroke="var(--accent-red)" strokeWidth="0.1" opacity="0.4" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="var(--accent-red)" strokeWidth="0.1" opacity="0.4" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="var(--near-black)" strokeWidth="0.05" opacity="0.1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="var(--near-black)" strokeWidth="0.05" opacity="0.05" />
          </svg>
        </motion.div>

        <motion.div
          className="cns__content"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <h2 className="cns__headline">
            One Group.<br />
            <em>Multiple Disciplines.</em>
          </h2>
          <p className="cns__subtext">
            Connected by engineering, built for growth.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
