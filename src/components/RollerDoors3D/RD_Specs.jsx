import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './RD_Specs.css';

const ease = [0.16, 1, 0.3, 1];

const SPEC_GROUPS = [
  {
    id: 'overview',
    label: 'Overview',
    specs: [
      { label: 'Operation Type', value: 'Manual / Motorized' },
      { label: 'Opening Style', value: 'Vertical Rolling' },
      { label: 'Materials', value: 'Steel, Aluminium, Colorbond' },
      { label: 'Design Options', value: 'Solid, Slatted, Perforated' },
      { label: 'Applications', value: 'Residential, Commercial, Industrial' },
      { label: 'Finish Options', value: 'Custom Colours Available' },
      { label: 'Maintenance', value: 'Low Maintenance' },
      { label: 'Automation', value: 'Remote Control Compatible' },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    specs: [
      { label: 'Motor Type', value: 'AC / DC Options' },
      { label: 'Speed', value: '0.1–0.2 m/s' },
      { label: 'Power', value: '240V AC / 24V DC' },
      { label: 'Remote', value: 'Multi-channel RF' },
      { label: 'Safety', value: 'Obstacle auto-reverse' },
      { label: 'Battery Backup', value: 'Optional' },
    ],
  },
  {
    id: 'dimensions',
    label: 'Dimensions',
    specs: [
      { label: 'Standard Widths', value: '1500–6000mm' },
      { label: 'Standard Heights', value: '1800–4500mm' },
      { label: 'Custom', value: 'Available on request' },
      { label: 'Headroom', value: '300–450mm required' },
    ],
  },
];

const RD_Specs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const activeGroup = SPEC_GROUPS.find((g) => g.id === activeTab);

  return (
    <section className="rds" id="rd-specs">
      <motion.div
        className="rds-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label" style={{ justifyContent: 'center' }}>Technical Data</span>
        <h2 className="rd-heading" style={{ textAlign: 'center' }}>
          Specifications
        </h2>
      </motion.div>

      {/* Tabs */}
      <div className="rds-tabs">
        {SPEC_GROUPS.map((group) => (
          <button
            key={group.id}
            className={`rds-tab ${activeTab === group.id ? 'active' : ''}`}
            onClick={() => setActiveTab(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Specs Table */}
      <motion.div
        key={activeTab}
        className="rds-table"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
      >
        {activeGroup.specs.map((spec, i) => (
          <div key={i} className="rds-row">
            <span className="rds-row-label">{spec.label}</span>
            <span className="rds-row-value">{spec.value}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default RD_Specs;
