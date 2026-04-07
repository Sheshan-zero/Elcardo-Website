import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ExpansionTransition.css';

const EASE = [0.16, 1, 0.3, 1];

export default function ExpansionTransition() {
  const sectionRef = useRef(null);
  const { ref: contentRef, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'center center']
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="exp-trans" ref={sectionRef} id="expansion">
      <div className="exp-trans__container" ref={contentRef}>
        
        <motion.div
          className="exp-trans__content"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
        >
          <h2 className="exp-trans__headline">Then We Expanded.</h2>
          <p className="exp-trans__subtext">New industries. New opportunities.</p>
        </motion.div>

        {/* Animated spreading line connecting downwards */}
        <motion.div 
          className="exp-trans__line"
          style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
        />
        
      </div>
    </section>
  );
}
