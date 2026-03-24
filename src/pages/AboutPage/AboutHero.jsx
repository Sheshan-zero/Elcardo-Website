import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../../assets/rg_hero.png'; // Re-using for industrial vibe

export default function AboutHero() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yImage = useTransform(scrollY, [0, 1000], [0, 300]);
  const scaleImage = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <section className="about-hero">
      <div className="about-hero-bg">
        <motion.img 
          src={heroImg} 
          alt="Elcardo Industrial Operations" 
          style={{ y: yImage, scale: scaleImage }}
        />
        <div className="about-hero-overlay" />
      </div>

      <motion.div 
        className="about-hero-content"
        style={{ opacity: opacityText, y: yText }}
      >
        <motion.p 
          className="about-hero-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          Elcardo Industries
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          Building the Future<br />of Industry.
        </motion.h1>

        <motion.p 
          className="about-hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
        >
          A diversified group delivering engineering, energy, automotive, and hospitality solutions.
        </motion.p>
      </motion.div>
    </section>
  );
}
