import React from 'react';
import { motion } from 'framer-motion';

/* ─── NO Canvas — pure CSS/SVG material showcase ─── */

function SpecBar({ label, value, delay }) {
  return (
    <div className="rg-mat-spec-bar">
      <div className="rg-mat-spec-bar-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="rg-mat-spec-bar-track">
        <motion.div
          className="rg-mat-spec-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function MaterialPanel({ title, specs, bars, gradient, delay }) {
  return (
    <motion.div
      className="rg-mat-panel"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rg-mat-panel-sphere" style={{ background: gradient }}>
        <div className="rg-mat-panel-sphere-inner" />
      </div>
      <div className="rg-mat-panel-info">
        <h3>{title}</h3>
        <ul>
          {specs.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        <div className="rg-mat-spec-bars">
          {bars.map((bar, i) => (
            <SpecBar key={bar.label} label={bar.label} value={bar.value} delay={delay + 0.2 + i * 0.1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function MaterialsSection() {
  return (
    <section className="rg-materials-3d">
      <div className="rg-materials-3d-header">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="rg-materials-title">
            Built from<br />
            <span className="rg-hero-italic">industrial grade</span> steel.
          </h2>
        </motion.div>
      </div>
      <div className="rg-materials-3d-panels">
        <MaterialPanel
          title="Structural Steel"
          specs={['High tensile strength', 'Hot-dip galvanized', 'Weldable alloy']}
          bars={[{ label: 'Strength', value: 95 }, { label: 'Durability', value: 90 }, { label: 'Finish', value: 85 }]}
          gradient="radial-gradient(circle at 35% 35%, #e0e0e0 0%, #888 40%, #444 70%, #222 100%)"
          delay={0}
        />
        <MaterialPanel
          title="Galvanized Coating"
          specs={['Zinc crystal texture', 'Anti-corrosion barrier', 'Self-healing surface']}
          bars={[{ label: 'Strength', value: 80 }, { label: 'Durability', value: 98 }, { label: 'Finish', value: 92 }]}
          gradient="radial-gradient(circle at 35% 35%, #d8d8e0 0%, #9898a8 40%, #505060 70%, #2a2a35 100%)"
          delay={0.15}
        />
        <MaterialPanel
          title="Impact Grade"
          specs={['Reinforced structure', 'Shock absorbing', 'Forklift rated']}
          bars={[{ label: 'Strength', value: 98 }, { label: 'Durability', value: 95 }, { label: 'Finish', value: 75 }]}
          gradient="radial-gradient(circle at 35% 35%, #aaa 0%, #666 40%, #3a3a40 70%, #1a1a20 100%)"
          delay={0.3}
        />
      </div>
    </section>
  );
}
