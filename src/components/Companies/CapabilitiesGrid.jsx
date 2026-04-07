import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { companies } from '../../data/companiesData';
import './CapabilitiesGrid.css';

const EASE = [0.16, 1, 0.3, 1];

const CAPABILITIES = [
  { items: ['Roller Gates', 'Roller Shutters', 'Custom Gate Systems', 'Access Automation'], icon: '⬡' },
  { items: ['Rooftop Solar Systems', 'Commercial Installations', 'Grid-Scale Energy', 'System Monitoring'], icon: '☀' },
  { items: ['Automotive Batteries', 'Industrial Power Systems', 'Energy Storage Solutions'], icon: '⚡' },
  { items: ['Boutique Hotels', 'Hospitality Services', 'Guest Experience Design', 'Property Management'], icon: '◆' },
  { items: ['Performance Tuning', 'Custom Builds', 'Fleet Solutions', 'Vehicle Engineering'], icon: '▲' },
];

export default function CapabilitiesGrid() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true, threshold: 0.2,
  });

  return (
    <section className="cpg-cap" id="capabilities">
      <motion.div
        className="cpg-cap__header"
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.span className="cpg-cap__kicker"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="cpg-cap__kicker-line" />
          What We Do
        </motion.span>
        <motion.h2 className="cpg-cap__title"
          variants={{ hidden: { opacity: 0, y: 28, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
          transition={{ duration: 1, ease: EASE }}
        >
          Core <em>Capabilities</em>
        </motion.h2>
      </motion.div>

      <div className="cpg-cap__grid">
        {companies.map((co, i) => (
          <CapCard key={co.id} company={co} caps={CAPABILITIES[i]} index={i} />
        ))}
      </div>
    </section>
  );
}

function CapCard({ company, caps, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      className="cpg-cap__card"
      ref={(el) => { ref(el); cardRef.current = el; }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
      }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {/* Glow orb behind card */}
      <div className="cpg-cap__card-glow" />

      <div className="cpg-cap__card-top">
        <span className="cpg-cap__card-icon">{caps.icon}</span>
        <span className="cpg-cap__card-index">{company.index}</span>
      </div>
      <h3 className="cpg-cap__card-name">{company.name}</h3>
      <span className="cpg-cap__card-sector">{company.sector}</span>
      <div className="cpg-cap__card-divider" />
      <div className="cpg-cap__list">
        {caps.items.map((item, j) => (
          <motion.div
            className="cpg-cap__item"
            key={j}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 + j * 0.08 + 0.3 }}
          >
            <span className="cpg-cap__item-line" />
            {item}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
