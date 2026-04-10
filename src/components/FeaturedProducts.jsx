import { useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

import imgRollerGate from '../assets/fp_roller_gate.png';
import imgSolar from '../assets/fp_solar.png';
import imgBattery from '../assets/fp_battery.png';
import imgSteel from '../assets/fp_steel.png';
import imgRoofing from '../assets/fp_roofing.png';
import imgWood from '../assets/fp_wood.png';

const products = [
  {
    name: 'Roller Gates',
    tag: 'Roller Gates',
    bigTitle: 'Roller\nGates',
    image: imgRollerGate,
    brochure: '/brochures/roller-gates-brochure.pdf',
    description:
      'Precision-engineered automatic roller gates for residential, commercial, and industrial applications. Built for security, durability, and silent operation.',
  },
  {
    name: 'Solar Systems',
    tag: 'Solar',
    bigTitle: 'Solar\nSystems',
    image: imgSolar,
    brochure: '/brochures/solar-brochure.pdf',
    description:
      'High-performance solar panel systems for rooftop and ground-mount installations. Reduce energy costs by up to 65% with intelligent grid solutions.',
  },
  {
    name: 'Battery Solutions',
    tag: 'Battery',
    bigTitle: 'Battery\nSolutions',
    image: imgBattery,
    brochure: '/brochures/battery-brochure.pdf',
    description:
      'Industrial-grade lithium battery storage for commercial and residential use. Modular, scalable, and engineered for long cycle life.',
  },
  {
    name: 'Steel & Fabrication',
    tag: 'Steel',
    bigTitle: 'Steel &\nFabrication',
    image: imgSteel,
    brochure: '/brochures/steel-brochure.pdf',
    description:
      'Custom steel fabrication and structural engineering. From architectural staircases to industrial frameworks — precision-cut and welded in-house.',
  },
  {
    name: 'Roofing Systems',
    tag: 'Roofing',
    bigTitle: 'Roofing\nSystems',
    image: imgRoofing,
    brochure: '/brochures/roofing-brochure.pdf',
    description:
      'Premium metal roofing profiles and installation systems. Standing seam, corrugated, and custom profiles built for tropical and coastal environments.',
  },
  {
    name: 'Wood Decking',
    tag: 'Decking',
    bigTitle: 'Wood\nDecking',
    image: imgWood,
    brochure: '/brochures/wood-brochure.pdf',
    description:
      'High-quality natural and composite wood decking for poolside, terrace, and balcony applications. Weather-resistant with rich grain finishes.',
  },
];

function ProductCard({ product, index, activeIndex, onHover, onLeave, isVisible }) {
  const handleClick = useCallback(() => {
    const link = document.createElement('a');
    link.href = product.brochure;
    link.download = product.brochure.split('/').pop();
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [product.brochure]);

  const isDimmed = activeIndex !== null && activeIndex !== index;

  return (
    <div
      className={`fp-card${isVisible ? ' fp-card--visible' : ''}${isDimmed ? ' fp-card--dimmed' : ''}`}
      style={{
        transitionDelay: isVisible ? `${index * 0.1}s` : '0s',
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onClick={handleClick}
      data-cursor="expand"
      role="button"
      tabIndex={0}
      aria-label={`Download ${product.name} brochure`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Tag */}
      <span className="fp-card-tag">{product.tag}</span>

      {/* Oversized editorial title */}
      <div className="fp-card-big-title">
        {product.bigTitle.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < product.bigTitle.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>

      {/* Product image */}
      <div className="fp-card-image-wrap">
        <img
          className="fp-card-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        <div className="fp-card-ground-shadow" />
      </div>

      {/* Info row: name + badge + download */}
      <div className="fp-card-info-row">
        <span className="fp-card-name">{product.name}</span>
        <span className="fp-card-badge">Datasheet · PDF</span>
        <div className="fp-card-download-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="fp-card-description">{product.description}</p>
    </div>
  );
}

export default function FeaturedProducts() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [activeIndex, setActiveIndex] = useState(null);

  const handleHover = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="featured-products" className="featured-products" ref={ref}>
      <div className="featured-products-inner section-padding">
        {/* Header */}
        <motion.div className="fp-header" {...fade(0)}>
          <div className="fp-label">
            <span className="fp-label-line" />
            <span className="fp-label-text">Our Products</span>
            <span className="fp-label-line" />
          </div>
          <h2 className="fp-title">
            Explore Our{' '}
            <span className="fp-title-italic">Products</span>
          </h2>
          <p className="fp-subtitle">
            Precision-engineered solutions across every category — built to perform, designed to last.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="fp-grid">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              index={i}
              activeIndex={activeIndex}
              onHover={handleHover}
              onLeave={handleLeave}
              isVisible={inView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div className="fp-cta" {...fade(0.5)}>
          <Link to="/products" className="fp-cta-link" data-cursor="expand">
            More Products
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
