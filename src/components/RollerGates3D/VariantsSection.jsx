import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── NO Canvas — pure CSS variant cards with perspective tilt ─── */

function VariantCard({ name, desc, specs, color, delay }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="rg-variant-card-3d"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -12 : 0}px)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* CSS-rendered gate illustration */}
      <div className="rg-variant-css-gate" style={{ background: `linear-gradient(180deg, ${color} 0%, #0a0a0a 100%)` }}>
        <div className="rg-variant-gate-slats">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rg-variant-slat" style={{ background: color, opacity: 0.6 + i * 0.05 }} />
          ))}
        </div>
      </div>
      <div className="rg-variant-card-body">
        <h3>{name}</h3>
        <p>{desc}</p>
        <span className="rg-variant-specs">{specs}</span>
      </div>
    </motion.div>
  );
}

export default function VariantsSection() {
  return (
    <section className="rg-variants-3d">
      <div className="rg-variants-3d-inner">
        <motion.div
          className="rg-variants-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="rg-feature-label" style={{ justifyContent: 'center' }}>Product Line</span>
          <h2 className="rg-variants-title">Choose your solution.</h2>
        </motion.div>
        <div className="rg-variants-3d-grid">
          <VariantCard name="Solid Roller Gate" desc="Maximum privacy and security with fully enclosed panels." specs="Best for garages and secure residential entrances" color="#555" delay={0} />
          <VariantCard name="Slatted Roller Gate" desc="Ventilation-friendly with visible slat gaps for airflow." specs="Best for warehouses and loading docks" color="#888" delay={0.08} />
          <VariantCard name="Perforated Roller Gate" desc="Balanced visibility with micro-perforated steel panels." specs="Best for retail storefronts and commercial spaces" color="#aaa" delay={0.16} />
          <VariantCard name="Manual Roller Gate" desc="Cost-effective, hand-operated for low-frequency use." specs="Best for small shops and storage rooms" color="#666" delay={0.24} />
          <VariantCard name="Motorized Roller Gate" desc="Remote-controlled with smart automation and safety sensors." specs="Best for daily-use commercial and residential" color="#444" delay={0.32} />
        </div>
      </div>
    </section>
  );
}
