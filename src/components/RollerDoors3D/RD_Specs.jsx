import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './RD_Specs.css';

const ease = [0.16, 1, 0.3, 1];

const SPEC_GROUPS = [
  {
    id: 'general',
    label: 'General',
    specs: [
      { label: 'Operation Type', value: 'Manual / Motorized' },
      { label: 'Opening Style', value: 'Vertical Rolling' },
      { label: 'Material Options', value: 'Steel / Aluminum / Color-Bond' },
      { label: 'Design Options', value: 'Solid / Slatted / Perforated' },
      { label: 'Applications', value: 'Residential / Commercial / Industrial' },
      { label: 'Finish Options', value: 'Custom Colors (30+)' },
    ],
  },
  {
    id: 'dimensions',
    label: 'Dimensions',
    specs: [
      { label: 'Max Width', value: 'Up to 6,000mm' },
      { label: 'Max Height', value: 'Up to 4,000mm' },
      { label: 'Slat Thickness', value: '0.5mm – 0.8mm' },
      { label: 'Slat Profile', value: 'Double-walled interlocking' },
      { label: 'Guide Rail', value: '80mm extruded aluminum' },
      { label: 'Housing Depth', value: '350mm – 500mm' },
    ],
  },
  {
    id: 'motor',
    label: 'Motor System',
    specs: [
      { label: 'Motor Type', value: 'Tubular' },
      { label: 'Torque', value: '120 Nm' },
      { label: 'Speed', value: '24 RPM' },
      { label: 'IP Rating', value: 'IP65' },
      { label: 'Cycle Rating', value: '50,000+' },
      { label: 'Remote Control', value: '433MHz RF (30m range)' },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Maintenance',
    specs: [
      { label: 'Safety', value: 'Anti-lift locks + IR sensors' },
      { label: 'Emergency', value: 'Manual chain override' },
      { label: 'Brake System', value: 'Automatic on power loss' },
      { label: 'Maintenance', value: 'Low — annual lubrication' },
      { label: 'Warranty', value: 'Up to 10 years' },
      { label: 'Automation', value: 'Remote control compatible' },
    ],
  },
];

const RD_Specs = () => {
  const [activeTab, setActiveTab] = useState('general');
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
