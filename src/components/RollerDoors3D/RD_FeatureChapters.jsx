import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../../assets/rd_hero_main.png';
import facadeImg from '../../assets/rd_house_facade_premium.png';
import installGarage from '../../assets/rg_install_garage.png';
import installCommercial from '../../assets/rg_install_commercial.png';
import installFactory from '../../assets/rg_install_factory.png';
import './RD_FeatureChapters.css';

const ease = [0.16, 1, 0.3, 1];

const CHAPTERS = [
  {
    title: 'Space Saving.',
    desc: 'Vertical operation frees your floor and ceiling — no swing radius needed.',
    image: heroImg,
  },
  {
    title: 'Secure by Design.',
    desc: 'Interlocking slats and reinforced guide rails for total peace of mind.',
    image: installFactory,
  },
  {
    title: 'Made to Match.',
    desc: 'Finish options for every architectural style — residential to industrial.',
    image: facadeImg,
  },
  {
    title: 'Built for Daily Use.',
    desc: 'Engineered for thousands of cycles with minimal maintenance.',
    image: installCommercial,
  },
  {
    title: 'Manual or Motorized.',
    desc: 'Your choice. Both reliable. Both built to last.',
    image: installGarage,
  },
];

const RD_FeatureChapters = () => (
  <section className="rdfc">
    {CHAPTERS.map((ch, i) => (
      <motion.div
        key={i}
        className={`rdfc-chapter ${i % 2 === 1 ? 'rdfc-chapter--reverse' : ''}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
      >
        <div className="rdfc-chapter-text">
          <motion.h3
            className="rdfc-chapter-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {ch.title}
          </motion.h3>
          <motion.p
            className="rdfc-chapter-desc"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            {ch.desc}
          </motion.p>
        </div>
        <div className="rdfc-chapter-visual">
          <img src={ch.image} alt={ch.title} className="rdfc-chapter-img" loading="lazy" />
        </div>
      </motion.div>
    ))}
  </section>
);

export default RD_FeatureChapters;
