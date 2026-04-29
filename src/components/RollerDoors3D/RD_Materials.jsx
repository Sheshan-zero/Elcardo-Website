import React from 'react';
import { motion } from 'framer-motion';
import './RD_Materials.css';

const ease = [0.16, 1, 0.3, 1];

const MATERIALS = [
  {
    name: 'Galvanised Steel',
    desc: 'High tensile, corrosion resistant. The backbone of every Elcardo roller door.',
    gradient: 'linear-gradient(135deg, #b8bcc4 0%, #8A8F98 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    stat: '50,000+ cycles',
  },
  {
    name: 'Powder-Coat Finish',
    desc: 'UV stable, scratch resistant. Professional-grade coating for lasting colour.',
    gradient: 'linear-gradient(135deg, #2D2D2D 0%, #4A4A4A 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    stat: 'UV stable',
  },
  {
    name: 'Aluminium Extrusion',
    desc: 'Lightweight structural framing. Precision-milled for perfect guide rail alignment.',
    gradient: 'linear-gradient(135deg, #D1D5DB 0%, #E5E7EB 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    stat: 'Lightweight',
  },
  {
    name: 'Colorbond® Finish',
    desc: 'Pre-painted steel with 35+ colour options. Backed by manufacturer warranty.',
    gradient: 'linear-gradient(135deg, #CC2929 0%, #A82020 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
    stat: '35+ colours',
  },
  {
    name: 'Perforated Sheet',
    desc: 'Ventilation with visual security. Ideal for parking, showrooms, and airflow zones.',
    gradient: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
      </svg>
    ),
    stat: 'Airflow rated',
  },
];

const RD_Materials = () => (
  <section className="rd-materials" id="rd-finishes">
    <motion.div
      className="rd-materials-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease }}
    >
      <span className="rd-label" style={{ justifyContent: 'center' }}>Materials &amp; Finishes</span>
      <h2 className="rd-heading" style={{ textAlign: 'center' }}>
        Built to last. Finished to impress.
      </h2>
      <p className="rd-body-text" style={{ margin: '0 auto', textAlign: 'center' }}>
        Choose from premium materials and finishes that combine durability with architectural appeal.
      </p>
    </motion.div>

    <div className="rd-materials-grid">
      {MATERIALS.map((mat, i) => (
        <motion.div
          key={mat.name}
          className="rd-mat-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: i * 0.08, ease }}
        >
          <div className="rd-mat-card-img-wrap">
            <div className="rd-mat-card-visual" style={{ background: mat.gradient }} />
            <div className="rd-mat-card-pattern" />
            <div className="rd-mat-card-icon-overlay">{mat.icon}</div>
          </div>
          <div className="rd-mat-card-body">
            <h3 className="rd-mat-card-name">{mat.name}</h3>
            <p className="rd-mat-card-desc">{mat.desc}</p>
            <span className="rd-mat-card-stat">{mat.stat}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RD_Materials;
