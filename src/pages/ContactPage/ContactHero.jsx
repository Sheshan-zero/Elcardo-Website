import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];
const basePath = import.meta.env.BASE_URL || '/';

export default function ContactHero() {
  return (
    <section className="ch-hero" id="contact-hero">
      {/* Background image */}
      <div className="ch-hero-bg">
        <img
          src={`${basePath}images/contact-hero.png`}
          alt="Elcardo Industries manufacturing complex"
          loading="eager"
        />
        <div className="ch-hero-overlay" />
      </div>

      {/* Animated grid lines */}
      <div className="ch-hero-grid" />

      <div className="ch-hero-content">
        <motion.p
          className="ch-hero-kicker"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          Contact Us
        </motion.p>

        <h1 className="ch-hero-headline">
          <span className="ch-hero-line">
            <motion.span
              className="ch-hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.5, ease }}
            >
              Reach Elcardo
            </motion.span>
          </span>
          <span className="ch-hero-line">
            <motion.span
              className="ch-hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
            >
              Across <em>Sri Lanka.</em>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="ch-hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1.2, delay: 1.1, ease }}
        />

        <motion.p
          className="ch-hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease }}
        >
          One network. Six locations. Trusted industrial support nationwide.
        </motion.p>
      </div>

      {/* Integrated quick strip at bottom */}
      <motion.div
        className="ch-hero-strip"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6, ease }}
      >
        <a href="tel:+94112345678" className="ch-hero-strip-item">
          <div className="ch-hero-strip-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div className="ch-hero-strip-info">
            <span className="ch-hero-strip-label">Call Us</span>
            <span className="ch-hero-strip-value">+94 11 234 5678</span>
          </div>
        </a>

        <div className="ch-hero-strip-sep" />

        <a href="mailto:info@elcardoindustries.lk" className="ch-hero-strip-item">
          <div className="ch-hero-strip-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="ch-hero-strip-info">
            <span className="ch-hero-strip-label">Email</span>
            <span className="ch-hero-strip-value">info@elcardoindustries.lk</span>
          </div>
        </a>

        <div className="ch-hero-strip-sep" />

        <a href="#contact-map" className="ch-hero-strip-item">
          <div className="ch-hero-strip-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="ch-hero-strip-info">
            <span className="ch-hero-strip-label">Visit</span>
            <span className="ch-hero-strip-value">6 Locations Island-wide</span>
          </div>
        </a>
      </motion.div>

      <motion.div
        className="ch-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="ch-hero-scroll-bar" />
      </motion.div>
    </section>
  );
}
