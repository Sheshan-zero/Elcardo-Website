import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DIVISIONS } from '../../../data/productsData';
import './DivisionSelector.css';

const ease = [0.16, 1, 0.3, 1];

const DivisionSelector = ({ onSelectDivision }) => {
  const trackRef = useRef(null);

  return (
    <section className="ds-section">
      {/* ── Section header ── */}
      <div className="ds-header">
        <motion.div
          className="ds-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="ds-label-line" />
          <span className="ds-label-text">Our Divisions</span>
          <span className="ds-label-line" />
        </motion.div>
        <motion.h2
          className="ds-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          Five Pillars of <em className="ds-title-em">Industry.</em>
        </motion.h2>
      </div>

      {/* ── Horizontal division strip ── */}
      <div className="ds-strip" ref={trackRef}>
        {DIVISIONS.map((div, i) => (
          <motion.div
            key={div.id}
            className="ds-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
            onClick={() => onSelectDivision(div.id)}
          >
            {/* Image */}
            <div className="ds-item-visual">
              <img src={div.image} alt={div.name} loading="lazy" />
              <div className="ds-item-overlay" />
            </div>

            {/* Text content */}
            <div className="ds-item-content">
              <span className="ds-item-index">0{i + 1}</span>
              <h3 className="ds-item-name">{div.name}</h3>
              <p className="ds-item-desc">{div.descriptor}</p>
              <div className="ds-item-footer">
                <span className="ds-item-count">{div.productCount} Products</span>
                <span className="ds-item-arrow">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Vertical divider */}
            {i < DIVISIONS.length - 1 && <div className="ds-item-divider" />}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DivisionSelector;
