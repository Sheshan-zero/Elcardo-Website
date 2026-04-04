import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../../assets/project_steel_fabrication.png';

const ease = [0.16, 1, 0.3, 1];

export default function ProjectsHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 800], [0, 200]);
  const scaleImage = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="projects-hero" id="projects-hero" ref={ref}>
      {/* Background image */}
      <div className="projects-hero-bg">
        <motion.img
          src={heroImg}
          alt="Elcardo precision engineering project"
          style={{ y: yImage, scale: scaleImage }}
          loading="eager"
        />
        <div className="projects-hero-overlay" />
      </div>

      {/* Subtle grid pattern */}
      <div className="projects-hero-grid" />

      <motion.div
        className="projects-hero-content"
        style={{ opacity: opacityText, y: yText }}
      >
        <motion.p
          className="projects-hero-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          Elcardo Industries
        </motion.p>

        <h1 className="projects-hero-headline">
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.5, ease }}
            >
              Built Across
            </motion.span>
          </span>
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
            >
              <em>Sri Lanka.</em>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="projects-hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 1.2, delay: 1.2, ease }}
        />

        <motion.p
          className="projects-hero-sub"
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.4, ease }}
        >
          Precision engineering across residential, commercial, and industrial landscapes.
        </motion.p>
      </motion.div>

      <motion.div
        className="projects-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="projects-hero-scroll-bar" />
        <span className="projects-hero-scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
}
