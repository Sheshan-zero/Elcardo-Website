import React from 'react';
import { motion } from 'framer-motion';

export default function AboutVisionMission() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <section className="about-section about-vision-mission">
      <motion.div 
        className="about-vm-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="about-vm-box" variants={itemVariants}>
          <div className="about-vm-label">Vision</div>
          <h3 className="about-vm-text">To lead innovation across industries, redefining what is possible in engineering, energy, and hospitality.</h3>
        </motion.div>

        <motion.div className="about-vm-box" variants={itemVariants}>
          <div className="about-vm-label">Mission</div>
          <h3 className="about-vm-text">Deliver high-quality, sustainable, and technology-driven solutions that elevate human experiences worldwide.</h3>
        </motion.div>
      </motion.div>
    </section>
  );
}
