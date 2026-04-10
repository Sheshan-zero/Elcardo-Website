import React from 'react';
import { motion } from 'framer-motion';
import './ProductSpotlights.css';

import imgRollerGate from '../../../assets/product_roller_gate.png';
import imgSolar from '../../../assets/product_solar.png';
import imgBattery from '../../../assets/product_battery.png';
import imgSteel from '../../../assets/product_steel.png';
import imgRoofing from '../../../assets/product_roofing.png';
import imgWood from '../../../assets/product_wood.png';

const ease = [0.16, 1, 0.3, 1];

const SPOTLIGHTS = [
  {
    id: 'roller-gates',
    number: '01',
    kicker: 'Security & Architecture',
    title: 'Roller Gates',
    subtitle: 'Seamless motion. Impenetrable security.',
    desc: 'Engineered with high-tensile steel profiles and precision automated control systems for residential and commercial applications.',
    image: imgRollerGate,
    specs: [
      { label: 'Material', value: 'High-Tensile Steel' },
      { label: 'Profile', value: '0.8mm Slat' },
      { label: 'Drive', value: '24V Automated' },
    ],
  },
  {
    id: 'solar',
    number: '02',
    kicker: 'Energy Solutions',
    title: 'Solar Systems',
    subtitle: 'Harnessing precision photovoltaic power.',
    desc: 'Cutting-edge solar panel arrays mounted on aerospace-grade structural frames with maximum efficiency cell technology.',
    image: imgSolar,
    specs: [
      { label: 'Efficiency', value: '22%+ Cell' },
      { label: 'Frame', value: 'Anodized Al' },
      { label: 'Warranty', value: '25 Years' },
    ],
  },
  {
    id: 'batteries',
    number: '03',
    kicker: 'Power Storage',
    title: 'Battery Solutions',
    subtitle: 'Intelligent energy storage systems.',
    desc: 'Advanced lithium battery storage systems with smart monitoring, designed for seamless integration with solar infrastructure.',
    image: imgBattery,
    specs: [
      { label: 'Chemistry', value: 'LiFePO4' },
      { label: 'Cycles', value: '6000+' },
      { label: 'Monitor', value: 'IoT Enabled' },
    ],
  },
  {
    id: 'steel',
    number: '04',
    kicker: 'Industrial Fabrication',
    title: 'Steel & Fabrication',
    subtitle: 'Structural integrity at its core.',
    desc: 'Precision CNC-cut steel beams, custom frameworks, and industrial piping designed for extreme environments.',
    image: imgSteel,
    specs: [
      { label: 'Grade', value: 'Cold-Rolled' },
      { label: 'Tolerance', value: 'CLASS A' },
      { label: 'Coating', value: 'AZ150 Zinc' },
    ],
  },
  {
    id: 'roofing',
    number: '05',
    kicker: 'Architectural Protection',
    title: 'Roofing Systems',
    subtitle: 'Multi-layered performance protection.',
    desc: 'High-performance metal roofing systems resisting all weather conditions with an uncompromising industrial aesthetic.',
    image: imgRoofing,
    specs: [
      { label: 'Material', value: 'Zinc-Alum' },
      { label: 'Profile', value: 'Standing Seam' },
      { label: 'Wind', value: '180 km/h' },
    ],
  },
  {
    id: 'wood',
    number: '06',
    kicker: 'Outdoor Living',
    title: 'Wood Decking',
    subtitle: 'Natural warmth. Engineered durability.',
    desc: 'Premium composite and natural wood decking solutions for modern outdoor spaces with UV and moisture resistance.',
    image: imgWood,
    specs: [
      { label: 'Material', value: 'WPC Composite' },
      { label: 'UV', value: 'Stabilized' },
      { label: 'Life', value: '30+ Years' },
    ],
  },
];

const SpotlightSection = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="ps-section" id={item.id}>
      <div className={`ps-inner ${isEven ? '' : 'ps-reverse'}`}>
        {/* Text Side */}
        <motion.div
          className="ps-text"
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
        >
          <span className="ps-number">{item.number}</span>
          <p className="products-kicker">{item.kicker}</p>
          <h2 className="products-title-lg">{item.title}</h2>
          <p className="ps-subtitle">{item.subtitle}</p>
          <p className="ps-desc">{item.desc}</p>

          <div className="ps-specs">
            {item.specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                className="ps-spec"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease }}
              >
                <span className="ps-spec-value">{spec.value}</span>
                <span className="ps-spec-label">{spec.label}</span>
              </motion.div>
            ))}
          </div>

          <a href="#contact" className="ps-cta-link">
            Explore Details
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>

        {/* Image Side */}
        <motion.div
          className="ps-image-wrap"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease }}
        >
          <img src={item.image} alt={item.title} className="ps-image" loading="lazy" />
          <div className="ps-image-shine" />
        </motion.div>
      </div>
    </section>
  );
};

const ProductSpotlights = () => {
  return (
    <div className="ps-container">
      {SPOTLIGHTS.map((item, i) => (
        <SpotlightSection key={item.id} item={item} index={i} />
      ))}
    </div>
  );
};

export default ProductSpotlights;
