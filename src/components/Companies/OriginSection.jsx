import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './OriginSection.css';

import imgRollerGate from '../../assets/company_roller_gates.png';

const EASE = [0.16, 1, 0.3, 1];

export default function OriginSection() {
  const sectionRef = useRef(null);
  const { ref: contentRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section className="cpo" ref={sectionRef} id="origin">
      <div className="cpo__container" ref={contentRef}>
        
        {/* Text Column */}
        <div className="cpo__text-col">
          <motion.div
            className="cpo__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="cpo__eyebrow-line" />
            Where It Started
          </motion.div>

          <motion.h2
            className="cpo__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
          >
            It Started with <br /><em>Precision.</em>
          </motion.h2>

          <motion.p
            className="cpo__subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            Elcardo Industries began with roller gates — engineered for reliability, scaling into an industrial force.
          </motion.p>
        </div>

        {/* Visual Column */}
        <div className="cpo__visual-col">
          <motion.div 
            className="cpo__image-wrap"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <motion.img 
              src={imgRollerGate} 
              alt="Roller Gate Architecture" 
              className="cpo__image"
              style={{ scale: imageScale, y: imageY }}
            />
            <div className="cpo__image-overlay" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
