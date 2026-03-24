import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutCTA() {
  return (
    <section className="about-section about-cta">
      <motion.div 
        className="about-cta-content"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <h2 className="about-title-large">Shaping Industries.<br />Driving Innovation.</h2>
        
        <div className="about-cta-actions">
          <Link to="/#contact" className="about-btn-primary">
            Contact Us
          </Link>
          <Link to="/#companies" className="about-btn-secondary">
            Explore Companies
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
