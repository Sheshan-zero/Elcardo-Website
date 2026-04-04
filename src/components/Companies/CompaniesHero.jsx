import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeUp, defaultViewport } from '../../utils/motionVariantsNew';
import './CompaniesHero.css';

export default function CompaniesHero() {
  return (
    <section className="cp-hero" data-section="I">
      <div className="cp-hero__bg">
        <div className="cp-hero__glow" />
      </div>

      <div className="cp-hero__content">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="cp-hero__inner"
        >
          <motion.span className="cp-hero__eyebrow" variants={fadeUp}>
            Elcardo Industries
          </motion.span>
          
          <motion.h1 className="cp-hero__title" variants={fadeUp}>
            Five Divisions.<br/>
            <span className="text-accent">One Standard.</span>
          </motion.h1>

          <motion.p className="cp-hero__desc" variants={fadeUp}>
            We build the infrastructure that markets depend on. From advanced 
            engineering and renewable energy to luxury hospitality and automotive 
            performance.
          </motion.p>

          <motion.div className="cp-hero__actions" variants={fadeUp}>
            <a href="#divisions" className="cp-btn cp-btn--primary">
              Explore Divisions
            </a>
            <Link to="/about" className="cp-btn cp-btn--secondary">
              Our Vision
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="cp-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="cp-hero__scroll-line" />
      </motion.div>
    </section>
  );
}
