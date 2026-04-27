import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ProductsHero.css';
import heroImg from '../../../assets/products_hero_bg.png';

const ease = [0.16, 1, 0.3, 1];

const ProductsHero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 800], [0, 200]);
  const scaleImage = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="ph-hero" ref={ref}>
      <div className="ph-hero-bg">
        <motion.img
          src={heroImg}
          alt="Elcardo Industries — Multi-Industry Solutions"
          style={{ y: yImage, scale: scaleImage }}
        />
        <div className="ph-hero-overlay" />
      </div>

      <motion.div className="ph-hero-content" style={{ opacity: opacityText, y: yText }}>
        <motion.div
          className="ph-hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          <span className="ph-hero-label-line" />
          <span className="ph-hero-label-text">Product Divisions</span>
          <span className="ph-hero-label-line" />
        </motion.div>

        <h1 className="ph-hero-headline">
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
              <em className="ph-hero-em">Industries.</em>
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="ph-hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease }}
        >
          From access systems to energy and construction — 5&nbsp;divisions, 13+&nbsp;products, engineered for scale.
        </motion.p>
      </motion.div>

      <motion.div
        className="ph-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="ph-hero-scroll-bar" />
        <span className="ph-hero-scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
};

export default ProductsHero;
