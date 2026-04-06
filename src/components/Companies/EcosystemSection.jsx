import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, defaultViewport } from '../../utils/motionVariantsNew';
import { companies } from '../../data/companiesData';
import './EcosystemSection.css';

const ease = [0.16, 1, 0.3, 1];
const CENTER = { cx: 300, cy: 300 };
const R = 190;

const nodePos = companies.map((_, i) => {
  const a = (-Math.PI / 2) + (i * (2 * Math.PI) / companies.length);
  return { cx: CENTER.cx + R * Math.cos(a), cy: CENTER.cy + R * Math.sin(a) };
});

/* All connections: hub-to-each + ring */
const connections = [
  ...companies.map((_, i) => ({ a: 'hub', b: i })),
  ...companies.map((_, i) => ({ a: i, b: (i + 1) % companies.length })),
];

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1, opacity: 0.18,
    transition: { delay: 0.8 + i * 0.1, duration: 2, ease: 'easeInOut' },
  }),
};

const nodeEnter = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1, opacity: 1,
    transition: { delay: 1.2 + i * 0.08, duration: 0.8, ease },
  }),
};

export default function EcosystemSection() {
  const [active, setActive] = useState(null);
  const activeCompany = active !== null ? companies[active] : null;

  return (
    <section className="cpe">
      <motion.div className="cpe-header"
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport}
      >
        <motion.span className="cpe-kicker" variants={fadeUp}>The Ecosystem</motion.span>
        <motion.h2 className="cpe-title" variants={fadeUp}>
          Synergy Across <em>Sectors</em>
        </motion.h2>
        <motion.p className="cpe-desc" variants={fadeUp}>
          Five autonomous divisions. One unified standard.
        </motion.p>
      </motion.div>

      <div className="cpe-body">
        {/* SVG Network */}
        <motion.div className="cpe-canvas"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        >
          <svg viewBox="0 0 600 600" className="cpe-svg">
            {/* Lines */}
            {connections.map((c, i) => {
              const from = c.a === 'hub' ? CENTER : nodePos[c.a];
              const to = nodePos[c.b];
              const isActive = active !== null && (c.a === active || c.b === active || c.a === 'hub');
              return (
                <motion.line key={`l-${i}`}
                  x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
                  stroke={isActive ? 'rgba(218,18,18,0.5)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  custom={i} variants={drawLine}
                  style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
                />
              );
            })}

            {/* Center hub */}
            <motion.circle cx={CENTER.cx} cy={CENTER.cy} r="40"
              fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
              custom={0} variants={nodeEnter}
            />
            <motion.text x={CENTER.cx} y={CENTER.cy - 5} textAnchor="middle"
              fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="700" letterSpacing="2.5"
              fontFamily="var(--font-body)" custom={0} variants={nodeEnter}
            >ELCARDO</motion.text>
            <motion.text x={CENTER.cx} y={CENTER.cy + 10} textAnchor="middle"
              fill="rgba(255,255,255,0.4)" fontSize="7" fontWeight="600" letterSpacing="2"
              fontFamily="var(--font-body)" custom={0} variants={nodeEnter}
            >GROUP</motion.text>

            {/* Outer nodes */}
            {nodePos.map((pos, i) => {
              const co = companies[i];
              const isActive = active === i;
              return (
                <motion.g key={co.id} custom={i + 1} variants={nodeEnter}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={pos.cx} cy={pos.cy}
                    r={isActive ? 44 : 32}
                    fill={isActive ? 'rgba(218,18,18,0.08)' : 'rgba(255,255,255,0.02)'}
                    stroke={isActive ? 'rgba(218,18,18,0.6)' : 'rgba(255,255,255,0.12)'}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                  <text x={pos.cx} y={pos.cy - 3} textAnchor="middle"
                    fill={isActive ? '#fff' : 'rgba(255,255,255,0.6)'}
                    fontSize="9" fontWeight="600" fontFamily="var(--font-body)" letterSpacing="1"
                    style={{ transition: 'fill 0.3s' }}
                  >
                    {co.name.replace('Elcardo ', '').replace('Elme ', '').toUpperCase().slice(0, 8)}
                  </text>
                  <text x={pos.cx} y={pos.cy + 10} textAnchor="middle"
                    fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="var(--font-body)"
                  >
                    {co.sector.split(' ')[0]}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* Preview panel */}
        <div className="cpe-preview">
          {activeCompany ? (
            <motion.div className="cpe-preview-inner"
              key={activeCompany.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              <img src={activeCompany.image} alt={activeCompany.name} className="cpe-preview-img" />
              <h3 className="cpe-preview-name">{activeCompany.name}</h3>
              <p className="cpe-preview-sector">{activeCompany.sector}</p>
              <p className="cpe-preview-desc">{activeCompany.description}</p>
            </motion.div>
          ) : (
            <div className="cpe-preview-empty">
              <p>Hover a node to preview</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
