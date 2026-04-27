import React from 'react';
import { motion } from 'framer-motion';
import installGarage from '../../assets/rg_install_garage.png';
import installCommercial from '../../assets/rg_install_commercial.png';
import installFactory from '../../assets/rg_install_factory.png';
import installWarehouse from '../../assets/rg_install_warehouse.png';
import storyFinished from '../../assets/story_roller_finished.png';
import storyInstall from '../../assets/story_roller_install.png';
import projectResidential from '../../assets/project_residential_gate.png';
import projectCommercial from '../../assets/project_commercial_gate.png';
import './RD_Gallery.css';

const ease = [0.16, 1, 0.3, 1];

const GALLERY = [
  { id: 1, src: installGarage, caption: 'Residential Installation', category: 'Residential' },
  { id: 2, src: installCommercial, caption: 'Commercial Entrance', category: 'Commercial' },
  { id: 3, src: storyFinished, caption: 'Completed Project', category: 'Residential' },
  { id: 4, src: installFactory, caption: 'Industrial Application', category: 'Industrial' },
  { id: 5, src: projectResidential, caption: 'Gate & Door Combo', category: 'Residential' },
  { id: 6, src: storyInstall, caption: 'On-Site Installation', category: 'Commercial' },
  { id: 7, src: installWarehouse, caption: 'Warehouse Entry', category: 'Industrial' },
  { id: 8, src: projectCommercial, caption: 'Commercial Security', category: 'Commercial' },
];

const RD_Gallery = () => {
  return (
    <section className="rd-gallery" id="rd-gallery">
      <motion.div
        className="rd-gallery-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label" style={{ justifyContent: 'center' }}>Real Installations</span>
        <h2 className="rd-title" style={{ textAlign: 'center' }}>
          See the quality<br />
          <span className="rd-title-dim">firsthand.</span>
        </h2>
        <p className="rd-desc" style={{ textAlign: 'center', margin: '0 auto' }}>
          Projects delivered across Sri Lanka — from modern homes to industrial complexes.
        </p>
      </motion.div>

      <div className="rd-gallery-masonry">
        {GALLERY.map((img, i) => (
          <motion.div
            key={img.id}
            className={`rd-gallery-item ${i === 0 || i === 4 ? 'rd-gallery-item--tall' : ''}`}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.06, ease }}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="rd-gallery-overlay">
              <span className="rd-gallery-category">{img.category}</span>
              <span className="rd-gallery-caption">{img.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RD_Gallery;
