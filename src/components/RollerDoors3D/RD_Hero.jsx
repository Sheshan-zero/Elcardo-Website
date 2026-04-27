import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/rd_hero_main.png';
import './RD_Hero.css';

const ease = [0.16, 1, 0.3, 1];

const RD_Hero = () => (
  <section className="rdh" id="rd-overview">
    {/* Clean architectural background */}
    <div className="rdh-bg">
      <div className="rdh-bg-gradient" />
    </div>

    {/* Product image */}
    <motion.div
      className="rdh-product"
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.6, delay: 0.3, ease }}
    >
      <img src={heroImg} alt="Elcardo Roller Door" className="rdh-product-img" />
      <div className="rdh-product-shadow" />
    </motion.div>

    {/* Content overlay */}
    <div className="rdh-content">
      <motion.span
        className="rd-label rdh-label"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease }}
      >
        Elcardo Roller Doors
      </motion.span>

      <h1 className="rdh-headline">
        <motion.span
          className="rdh-headline-line"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
        >
          Roller Doors
        </motion.span>
      </h1>

      <motion.p
        className="rdh-sub"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease }}
      >
        Secure access. Smooth motion. Built for modern spaces.
      </motion.p>

      <motion.div
        className="rdh-actions"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease }}
      >
        <Link to="/contact" className="rd-btn-primary" data-cursor="expand">
          Get a Quote
        </Link>
        <a href="#" className="rd-btn-secondary" data-cursor="expand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download Brochure
        </a>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="rdh-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.8 }}
    >
      <span>Scroll to explore</span>
      <div className="rdh-scroll-line" />
    </motion.div>
  </section>
);

export default RD_Hero;
