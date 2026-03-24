import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ from, to, duration = 2, suffix = '' }) {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (val) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(val) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, suffix, isInView]);

  return <span ref={nodeRef} className="about-impact-number">{from}{suffix}</span>;
}

export default function AboutImpact() {
  return (
    <section className="about-section about-impact">
      <div className="about-impact-grid">
        
        <div className="about-impact-stat">
          <Counter from={0} to={200} suffix="+" />
          <p>Projects Completed</p>
        </div>
        
        <div className="about-impact-stat">
          <Counter from={0} to={5} />
          <p>Business Divisions</p>
        </div>
        
        <div className="about-impact-stat">
          <Counter from={0} to={10} suffix="+" />
          <p>Years Experience</p>
        </div>

        <div className="about-impact-stat">
          <Counter from={0} to={100} suffix="+" />
          <p>Employees</p>
        </div>

      </div>
    </section>
  );
}
