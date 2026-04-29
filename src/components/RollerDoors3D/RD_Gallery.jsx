import React from 'react';
import { motion } from 'framer-motion';
import installGarage from '../../assets/rg_install_garage.png';
import installCommercial from '../../assets/rg_install_commercial.png';
import installFactory from '../../assets/rg_install_factory.png';
import installWarehouse from '../../assets/rg_install_warehouse.png';
import './RD_Gallery.css';

const ease = [0.16, 1, 0.3, 1];

const SCENES = [
  {
    image: installGarage,
    location: 'Residential · Colombo',
    type: 'Motorized Solid',
    gradient: 'linear-gradient(135deg, #3b3024 0%, #6b5a45 50%, #a08c6e 100%)',
  },
  {
    image: installCommercial,
    location: 'Commercial · Kandy',
    type: 'Slatted Shopfront',
    gradient: 'linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #718096 100%)',
  },
  {
    image: installFactory,
    location: 'Industrial · Kelaniya',
    type: 'Industrial Roller',
    gradient: 'linear-gradient(135deg, #1a2332 0%, #2d3a4a 50%, #4a5a6a 100%)',
  },
  {
    image: installWarehouse,
    location: 'Boundary Wall · Negombo',
    type: 'Motorized Perforated',
    gradient: 'linear-gradient(135deg, #2c3e30 0%, #4a6050 50%, #6a8070 100%)',
  },
];

const RD_Gallery = () => (
  <section className="rd-gallery">
    <motion.div
      className="rd-gallery-header"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease }}
    >
      <span className="rd-label" style={{ justifyContent: 'center' }}>Real Installations</span>
      <h2 className="rd-heading" style={{ textAlign: 'center' }}>
        See the quality firsthand.
      </h2>
      <p className="rd-body-text" style={{ textAlign: 'center', margin: '0 auto' }}>
        Projects delivered across Sri Lanka — from modern homes to industrial complexes.
      </p>
    </motion.div>

    <div className="rd-gallery-scroll">
      {SCENES.map((scene, i) => (
        <motion.div
          key={i}
          className="rd-gallery-card"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: i * 0.1, ease }}
        >
          <div
            className="rd-gallery-card-bg"
            style={{
              backgroundImage: `url(${scene.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="rd-gallery-card-overlay" />
          <div className="rd-gallery-card-info">
            <span className="rd-gallery-card-location">{scene.location}</span>
            <span className="rd-gallery-card-type">{scene.type}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <p className="rd-gallery-scroll-hint">← Scroll to explore →</p>
  </section>
);

export default RD_Gallery;
