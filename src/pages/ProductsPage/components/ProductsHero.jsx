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
      
      {/* Cinematic Background Image */}
      <div className="ph-hero-bg">
        <motion.img 
          src={heroImg} 
          alt="Elcardo Engineering Architecture" 
          style={{ y: yImage, scale: scaleImage }}
        />
        <div className="ph-hero-overlay"></div>
      </div>

      <motion.div className="ph-hero-content" style={{ opacity: opacityText, y: yText }}>
        <motion.p
          className="ph-hero-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          Advanced Manufacturing
        </motion.p>

        <h1 className="ph-hero-headline">
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.5, ease }}
            >
              Engineered
            </motion.span>
          </span>
          <span className="hero-line">
            <motion.span
              className="hero-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
            >
              <em style={{ color: 'var(--accent-red, #DA1212)' }}>Products.</em>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="ph-hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 1.2, delay: 1.2, ease }}
        />

        <motion.p
          className="ph-hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease }}
        >
          Precision solutions for modern spaces. Engineered for absolute architectural integrity.
        </motion.p>
      </motion.div>

      <motion.div
        className="ph-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="ph-hero-scroll-bar" />
        <span className="ph-hero-scroll-text">Scroll</span>
      </motion.div>

    </section>
  );
};

export default ProductsHero;
