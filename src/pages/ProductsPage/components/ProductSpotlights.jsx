import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductSpotlights.css';

import imgRollerGate from '../../../assets/product_roller_gate.png';
import imgSolar from '../../../assets/product_solar.png';
import imgPantry from '../../../assets/product_battery.png';
import imgSteel from '../../../assets/product_steel.png';
import imgRoofing from '../../../assets/product_roofing.png';
import imgWood from '../../../assets/product_wood.png';

const ease = [0.16, 1, 0.3, 1];

const SPOTLIGHTS = [
  {
    id: 'roller-shutters',
    number: '01',
    kicker: 'Security & Architecture',
    title: 'Roller Shutters',
    subtitle: 'Commercial and industrial shutter systems.',
    desc: 'Elcardo roller shutter doors use zinc-coated slats, flat curve profiles, motorized or manual operation, and hard rubber beading to reduce rough movement.',
    image: imgRollerGate,
    specs: [
      { label: 'Material', value: 'Zinc Alum' },
      { label: 'Speed', value: '20cm/sec' },
      { label: 'Warranty', value: '10Y Panels' },
    ],
  },
  {
    id: 'solar-systems',
    number: '02',
    kicker: 'Energy Solutions',
    title: 'Solar Systems',
    subtitle: 'Residential and commercial solar planning.',
    desc: 'Elcardo Elsolar supports home and business solar projects with consultation focused on energy savings, site suitability, and return on investment.',
    image: imgSolar,
    specs: [
      { label: 'Use', value: 'Home / Biz' },
      { label: 'Review', value: 'ROI' },
      { label: 'Basis', value: 'Site Plan' },
    ],
  },
  {
    id: 'pantry-systems',
    number: '03',
    kicker: 'Interiors',
    title: 'Kitchen & Pantry Systems',
    subtitle: 'Customized stainless steel and ECO board pantry systems.',
    desc: 'Designed and fabricated for homes, hotels, hospitals, and commercial kitchens, with granite, glass, exhaust canopies, and work table options.',
    image: imgPantry,
    specs: [
      { label: 'Material', value: 'SS / ECO' },
      { label: 'Fit', value: 'Custom' },
      { label: 'Options', value: 'Granite' },
    ],
  },
  {
    id: 'ss-fabrication',
    number: '04',
    kicker: 'Industrial Fabrication',
    title: 'SS Fabrication',
    subtitle: 'Custom stainless steel work for kitchens and interiors.',
    desc: 'Elcardo designs and fabricates exhaust canopies, food trolleys, tables, cupboards, chafing dishes, kitchen tables, and custom stainless steel items.',
    image: imgSteel,
    specs: [
      { label: 'Items', value: 'Custom' },
      { label: 'Finish', value: 'SS' },
      { label: 'Scope', value: 'Kitchen' },
    ],
  },
  {
    id: 'roofing',
    number: '05',
    kicker: 'Architectural Protection',
    title: 'Roofing Systems',
    subtitle: 'Multi-layered performance protection.',
    desc: 'High-performance Zinc-Aluminium roofing systems with AZ150 coating and Grade 550 tensile strength for tropical and coastal environments.',
    image: imgRoofing,
    specs: [
      { label: 'Material', value: 'Zinc-Alum' },
      { label: 'Coating', value: 'AZ150' },
      { label: 'Grade', value: '550 N/mm²' },
    ],
  },
  {
    id: 'wpc-decking',
    number: '06',
    kicker: 'Outdoor Living',
    title: 'WPC Decking',
    subtitle: 'Wooden flooring with a composite material base.',
    desc: 'Elcardo WPC uses recycled wood or bamboo fiber, plastic, and additives to create a natural timber alternative for flooring, decking, staircases, and handrails.',
    image: imgWood,
    specs: [
      { label: 'Material', value: 'WPC' },
      { label: 'Use', value: 'Flooring' },
      { label: 'Benefit', value: 'Recycled' },
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

          <Link to={`/products/${item.id}`} className="ps-cta-link">
            Explore Details
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </Link>
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
