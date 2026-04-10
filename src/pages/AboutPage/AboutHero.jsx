import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroImg from '../../assets/hero_engineering.png';

const ease = [0.16, 1, 0.3, 1];

export default function AboutHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 800], [0, 200]);
  const scaleImage = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="about-hero" id="about-hero" ref={ref}>
      {/* Background image */}
      <div className="about-hero-bg">
        <motion.img
          src={heroImg}
          alt="Elcardo Industrial Operations"
          style={{ y: yImage, scale: scaleImage }}
          decoding="async"
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
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          Elcardo Industries
        </motion.p>

        <h1 className="about-hero-headline">
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.5, ease }}
            >
              We Don't Build
            </motion.span>
          </span>
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
            >
              Companies. We Build
            </motion.span>
          </span>
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.8, ease }}
            >
              <em>Industries.</em>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="about-hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 1.2, delay: 1.2, ease }}
        />

        <motion.p
          className="about-hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease }}
        >
          Engineering, energy, automotive, and hospitality — from Sri Lanka to the world.
        </motion.p>
      </motion.div>

      <motion.div
        className="about-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="about-hero-scroll-bar" />
        <span className="about-hero-scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
}
