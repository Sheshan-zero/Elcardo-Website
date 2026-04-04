import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, defaultViewport } from '../../utils/motionVariantsNew';
import { companies } from '../../data/companiesData';
import './EcosystemSection.css';

const nodePositions = [
  { cx: 300, cy: 100 },   // top
  { cx: 490, cy: 245 },   // top-right
  { cx: 418, cy: 450 },   // bottom-right
  { cx: 182, cy: 450 },   // bottom-left
  { cx: 110, cy: 245 },   // top-left
];

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  [0, 2], [0, 3], [1, 3], [1, 4], [2, 4],
];

/* ─── Smooth Elegant Path Drawing ─── */
const drawLineVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 0.15,
    transition: { 
      delay: i * 0.15, 
      duration: 2.5, 
      ease: "easeInOut" 
    },
  }),
};

/* ─── Ambient Node Breathing ─── */
const breathVariant = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

const nodeEntrance = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 1 + i * 0.1, duration: 1, ease: [0.25, 1, 0.5, 1] },
  }),
};

export default function EcosystemSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="cp-ecosystem">
      <motion.div
        className="cp-ecosystem__header"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        <motion.span className="label-text text-accent" variants={fadeUp}>
          THE ECOSYSTEM
        </motion.span>
        <motion.h2 className="display-lg mt-4" variants={fadeUp}>
          Synergy Across Sectors
        </motion.h2>
        <motion.p className="body-lg text-muted mt-4 cp-ecosystem__desc" variants={fadeUp}>
          Our divisions are designed to operate independently but scale collectively, 
          sharing insights, technology, and engineering standards across the group.
        </motion.p>
      </motion.div>

      <motion.div
        className="cp-ecosystem__canvas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <svg viewBox="0 0 600 600" className="cp-ecosystem__svg" xmlns="http://www.w3.org/2000/svg">
          
          {/* Smooth Drawn Lines */}
          {connections.map(([a, b], i) => (
            <motion.line
              key={`line-${i}`}
              x1={nodePositions[a].cx}
              y1={nodePositions[a].cy}
              x2={nodePositions[b].cx}
              y2={nodePositions[b].cy}
              stroke="var(--primary-navy)"
              strokeWidth="2"
              custom={i}
              variants={drawLineVariant}
            />
          ))}

          {/* Nodes */}
          {nodePositions.map((pos, i) => {
            const company = companies[i];
            const isHovered = hoveredIdx === i;
            return (
              <motion.g
                key={company.id}
                custom={i}
                variants={nodeEntrance}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Breathing Inner Node */}
                <motion.circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={isHovered ? 40 : 32}
                  fill="var(--white)"
                  stroke={isHovered ? company.theme.accent : "var(--mid-blue)"}
                  strokeWidth={isHovered ? 3 : 1}
                  className="ecosystem-node"
                  variants={breathVariant}
                  animate="animate"
                  style={{
                    filter: isHovered ? `drop-shadow(0 10px 20px ${company.theme.accent}40)` : 'none'
                  }}
                />

                <text
                  x={pos.cx}
                  y={pos.cy + 5}
                  textAnchor="middle"
                  fill="var(--primary-navy)"
                  fontSize="16"
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                  style={{ pointerEvents: 'none' }}
                >
                  {company.name.replace('Elcardo ', '').charAt(0)}
                </text>

                {isHovered && (
                  <foreignObject x={pos.cx - 80} y={pos.cy + 50} width="160" height="60">
                    <div className="ecosystem-tooltip">
                      <span className="ecosystem-tooltip__name">{company.name}</span>
                      <span className="ecosystem-tooltip__sector">{company.sector}</span>
                    </div>
                  </foreignObject>
                )}
              </motion.g>
            );
          })}
        </svg>
      </motion.div>
    </section>
  );
}
