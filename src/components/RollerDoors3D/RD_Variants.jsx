import React from 'react';
import { motion } from 'framer-motion';
import solidImg from '../../assets/rd_variant_solid_new.png';
import slattedImg from '../../assets/rd_variant_slatted.png';
import perforatedImg from '../../assets/rd_variant_perforated_new.png';
import motorImg from '../../assets/rd_motor_premium.png';
import heroImg from '../../assets/rd_hero_main.png';
import './RD_Variants.css';

const ease = [0.16, 1, 0.3, 1];

const VARIANTS = [
  {
    name: 'Solid Roller Door',
    desc: 'Full privacy and security with continuous interlocking slats.',
    best: 'Best for secure residential garages.',
    image: solidImg,
  },
  {
    name: 'Slatted Roller Door',
    desc: 'Ventilation gaps between slats for airflow while maintaining security.',
    best: 'Best for parking structures and ventilation.',
    image: slattedImg,
  },
  {
    name: 'Perforated Roller Door',
    desc: 'Punched micro-holes allow visibility and airflow through the curtain.',
    best: 'Best for display areas and car parks.',
    image: perforatedImg,
  },
  {
    name: 'Manual Roller Door',
    desc: 'Spring-assisted manual operation with smooth counterbalance system.',
    best: 'Best for low-traffic access points.',
    image: heroImg,
  },
  {
    name: 'Motorized Roller Door',
    desc: 'Remote-controlled tubular motor for effortless daily operation.',
    best: 'Best for high-traffic commercial use.',
    image: motorImg,
  },
];

const RD_Variants = () => {
  return (
    <section className="rdvr" id="rd-variants">
      <motion.div
        className="rdvr-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label" style={{ justifyContent: 'center' }}>Product Range</span>
        <h2 className="rd-heading" style={{ textAlign: 'center' }}>
          Choose your type.
        </h2>
        <p className="rd-body-text" style={{ textAlign: 'center', margin: '0 auto' }}>
          Five distinct roller door configurations for every access need.
        </p>
      </motion.div>

      <div className="rdvr-grid">
        {VARIANTS.map((v, i) => (
          <motion.div
            key={v.name}
            className="rdvr-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
          >
            <div className="rdvr-card-img-wrap">
              <img src={v.image} alt={v.name} className="rdvr-card-img" />
            </div>
            <div className="rdvr-card-body">
              <h3 className="rdvr-card-title">{v.name}</h3>
              <p className="rdvr-card-desc">{v.desc}</p>
              <span className="rdvr-card-tag">{v.best}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RD_Variants;
