import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../../assets/rd_hero_main.png';
import motorImg from '../../assets/rd_motor_premium.png';
import crossImg from '../../assets/rd_crosssection.png';
import facadeImg from '../../assets/rd_house_facade_premium.png';
import variantImg from '../../assets/rd_variant_solid.png';
import './RD_FeatureChapters.css';

const ease = [0.16, 1, 0.3, 1];

const CHAPTERS = [
  {
    title: 'Space Saving.',
    desc: 'Vertical rolling operation maximizes floor space and headroom — no swing clearance needed.',
    image: heroImg,
  },
  {
    title: 'Secure by Design.',
    desc: 'Anti-lift locks, reinforced guide rails, and interlocking slats prevent forced entry.',
    image: crossImg,
  },
  {
    title: 'Made to Match.',
    desc: '30+ color options with wood-grain and metallic finishes to match any architecture.',
    image: facadeImg,
  },
  {
    title: 'Built for Daily Use.',
    desc: 'Industrial-grade components rated for 50,000+ open/close cycles with minimal maintenance.',
    image: motorImg,
  },
  {
    title: 'Manual or Motorized.',
    desc: 'Spring-assisted manual or remote-controlled motorized operation — your choice.',
    image: variantImg,
  },
];

const RD_FeatureChapters = () => {
  return (
    <section className="rdfc">
      <motion.div
        className="rdfc-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label" style={{ justifyContent: 'center' }}>Why Elcardo</span>
        <h2 className="rd-heading" style={{ textAlign: 'center' }}>
          Built for performance.
        </h2>
      </motion.div>

      <div className="rdfc-chapters">
        {CHAPTERS.map((ch, i) => (
          <motion.div
            key={i}
            className={`rdfc-chapter ${i % 2 === 1 ? 'rdfc-chapter--reverse' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease }}
          >
            <div className="rdfc-chapter-text">
              <h3 className="rdfc-chapter-title">{ch.title}</h3>
              <p className="rdfc-chapter-desc">{ch.desc}</p>
            </div>
            <div className="rdfc-chapter-visual">
              <img src={ch.image} alt={ch.title} className="rdfc-chapter-img" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RD_FeatureChapters;
