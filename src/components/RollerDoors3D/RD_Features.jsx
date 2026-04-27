import React from 'react';
import { motion } from 'framer-motion';
import './RD_Features.css';

const ease = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    title: 'Space Saving',
    desc: 'Vertical operation maximizes floor space and headroom — no swing clearance needed.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18M12 3v18" />
      </svg>
    ),
    size: 'large',
  },
  {
    title: 'Strong Security',
    desc: 'Anti-lift locks and reinforced guide rails prevent forced entry.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'Low Maintenance',
    desc: 'Industrial-grade components rated for 50,000+ cycles.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'Custom Finishes',
    desc: '30+ color options with wood-grain and metallic finishes to match your architecture.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    size: 'large',
  },
  {
    title: 'Manual or Motorized',
    desc: 'Spring-assisted manual or remote-controlled motorized operation.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'Any Scale',
    desc: 'From compact garages to wide-span industrial warehouses up to 6m.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 3H3v18h18V3zM9 3v18M3 9h18M3 15h18" />
      </svg>
    ),
    size: 'small',
  },
];

const RD_Features = () => {
  return (
    <section className="rd-features" id="rd-features">
      <motion.div
        className="rd-features-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label" style={{ justifyContent: 'center' }}>Why Elcardo</span>
        <h2 className="rd-title" style={{ textAlign: 'center' }}>
          Built for<br />
          <span className="rd-title-dim">performance.</span>
        </h2>
      </motion.div>

      <div className="rd-features-bento">
        {FEATURES.map((feat, i) => (
          <motion.div
            key={i}
            className={`rd-feat-card ${feat.size === 'large' ? 'rd-feat-card--large' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
          >
            <div className="rd-feat-card-icon">{feat.icon}</div>
            <h3 className="rd-feat-card-title">{feat.title}</h3>
            <p className="rd-feat-card-desc">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RD_Features;
