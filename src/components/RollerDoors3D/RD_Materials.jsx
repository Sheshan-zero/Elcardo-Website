import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RD_Materials.css';

const ease = [0.16, 1, 0.3, 1];

const MATERIALS = [
  {
    id: 'steel',
    name: 'Galvanized Steel',
    desc: 'The industry standard for strength and security. Hot-dip galvanized for long-lasting corrosion resistance.',
    properties: ['High tensile strength', 'Corrosion resistant', 'Cost-effective'],
    color: '#8A8F98',
    gradient: 'linear-gradient(135deg, #b8bcc4 0%, #8A8F98 100%)',
  },
  {
    id: 'aluminum',
    name: 'Extruded Aluminum',
    desc: 'Lightweight yet durable, ideal for larger openings where reduced weight means smoother operation.',
    properties: ['Lightweight', 'Rust-proof', 'Premium finish'],
    color: '#D1D5DB',
    gradient: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
  },
  {
    id: 'colorbond',
    name: 'Color-Bond Finish',
    desc: 'Factory-applied baked enamel coating available in a range of architectural colors for lasting vibrancy.',
    properties: ['UV resistant', '30+ color options', 'Scratch resistant'],
    color: '#DA1212',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
  },
  {
    id: 'woodlook',
    name: 'Wood-Look Finish',
    desc: 'Realistic timber grain effect on a steel or aluminum base — the warmth of wood without the maintenance.',
    properties: ['Zero maintenance', 'Realistic grain', 'Weather resistant'],
    color: '#8B6D4A',
    gradient: 'linear-gradient(135deg, #A0845C 0%, #6B5035 100%)',
  },
  {
    id: 'perforated',
    name: 'Perforated / Slatted',
    desc: 'Allows airflow and visibility while maintaining security — ideal for carparks and ventilation areas.',
    properties: ['Natural ventilation', 'Partial visibility', 'Security maintained'],
    color: '#6B7280',
    gradient: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
  },
];

const RD_Materials = () => {
  const [selected, setSelected] = useState(MATERIALS[0]);

  return (
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

      <div className="rd-materials-body">
        {/* Material Swatches */}
        <motion.div
          className="rd-materials-swatches"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          {MATERIALS.map((mat) => (
            <button
              key={mat.id}
              className={`rd-material-swatch ${selected.id === mat.id ? 'active' : ''}`}
              onClick={() => setSelected(mat)}
            >
              <span className="rd-swatch-color" style={{ background: mat.gradient }} />
              <span className="rd-swatch-name">{mat.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Detail Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            className="rd-materials-detail"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Preview Card */}
            <div className="rd-material-preview">
              <div className="rd-material-preview-swatch" style={{ background: selected.gradient }}>
                <div className="rd-material-slat-overlay" />
              </div>
              <div className="rd-material-preview-label">{selected.name}</div>
            </div>

            {/* Info */}
            <div className="rd-material-info">
              <h3 className="rd-material-info-title">{selected.name}</h3>
              <p className="rd-material-info-desc">{selected.desc}</p>
              <div className="rd-material-properties">
                {selected.properties.map((prop, i) => (
                  <span key={i} className="rd-material-prop">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RD_Materials;
