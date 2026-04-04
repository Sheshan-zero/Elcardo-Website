import React from 'react';
import { motion } from 'framer-motion';
import { SRI_LANKA_PATH } from './sriLankaPath';

const ease = [0.16, 1, 0.3, 1];

export default function ContactHero() {
  return (
    <section className="contact-hero" id="contact-hero">
      {/* Subtle watermark map */}
      <svg
        className="contact-hero-watermark"
        viewBox="0 0 200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={SRI_LANKA_PATH} />
      </svg>

      {/* Subtle grid */}
      <div className="contact-hero-grid" />

      <div className="contact-hero-content">
        <motion.p
          className="contact-hero-kicker"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          Get in Touch
        </motion.p>

        <h1 className="contact-hero-headline">
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.5, ease }}
            >
              Reach Elcardo
            </motion.span>
          </span>
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
            >
              Across <em>Sri Lanka.</em>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="contact-hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1.2, delay: 1.1, ease }}
        />

        <motion.p
          className="contact-hero-sub"
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.3, ease }}
        >
          One network. Multiple locations. Trusted support nationwide.
        </motion.p>
      </div>

      <motion.div
        className="contact-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="contact-hero-scroll-bar" />
        <span className="contact-hero-scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
}
