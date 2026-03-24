import React from 'react';
import { motion } from 'framer-motion';

export default function AboutStory() {
  return (
    <section className="about-section about-story">
      <div className="about-story-inner">
        <motion.p 
          className="about-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
          Who We Are
        </motion.p>
        
        <motion.h2 
          className="about-title-large"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          Elcardo Industries is a multi-sector company driven by innovation, precision engineering, and sustainable growth.
        </motion.h2>
      </div>
    </section>
  );
}
