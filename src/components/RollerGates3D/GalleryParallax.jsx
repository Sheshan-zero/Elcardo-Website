import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import installFactory from '../../assets/rg_install_factory.png';
import installGarage from '../../assets/rg_install_garage.png';
import installCommercial from '../../assets/rg_install_commercial.png';
import installWarehouse from '../../assets/rg_install_warehouse.png';

const galleryItems = [
  { img: installFactory, label: 'Factory', loc: 'Colombo', bg: installWarehouse },
  { img: installGarage, label: 'Residence', loc: 'Kandy', bg: installFactory },
  { img: installCommercial, label: 'Commercial', loc: 'Galle', bg: installGarage },
  { img: installWarehouse, label: 'Warehouse', loc: 'Katunayake', bg: installCommercial },
];

/* ─── Single Parallax Card ─── */
function ParallaxCard({ item, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);

  return (
    <motion.div
      ref={cardRef}
      className="rg-parallax-card"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <motion.div className="rg-parallax-bg" style={{ y: bgY }}>
        <img src={item.bg} alt="" />
      </motion.div>

      {/* Foreground layer */}
      <motion.div
        className="rg-parallax-fg"
        style={{ y: fgY }}
        animate={{
          scale: isHovered ? 1.04 : 1,
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img src={item.img} alt={item.label} />
      </motion.div>

      {/* Caption */}
      <motion.div
        className="rg-parallax-caption"
        animate={{ y: isHovered ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="rg-parallax-label">{item.label}</span>
        <span className="rg-parallax-loc">{item.loc}</span>
      </motion.div>

      {/* Blur sibling effect wrapper (CSS-driven) */}
      <div className={`rg-parallax-blur-overlay ${isHovered ? 'active' : ''}`} />
    </motion.div>
  );
}

/* ─── Main Export ─── */
export default function GalleryParallax() {
  return (
    <section className="rg-gallery-3d">
      <div className="rg-gallery-3d-inner">
        <motion.div
          className="rg-gallery-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="rg-gallery-title">
            Trusted across<br />Sri Lanka.
          </h2>
        </motion.div>
        <div className="rg-gallery-3d-grid">
          {galleryItems.map((item, i) => (
            <ParallaxCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
