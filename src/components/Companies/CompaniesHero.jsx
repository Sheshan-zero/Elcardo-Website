import { motion } from 'framer-motion';
import './CompaniesHero.css';

const ease = [0.16, 1, 0.3, 1];

const lineReveal = {
  hidden: { opacity: 0, y: 50, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: 0.2 + i * 0.12, duration: 1, ease },
  }),
};

/* Abstract network nodes for background */
const nodes = [
  { x: 15, y: 25 }, { x: 85, y: 20 }, { x: 50, y: 50 },
  { x: 20, y: 75 }, { x: 80, y: 80 }, { x: 35, y: 35 },
  { x: 65, y: 30 }, { x: 30, y: 65 }, { x: 70, y: 65 },
];

const connections = [
  [0, 2], [1, 2], [2, 3], [2, 4], [0, 5], [1, 6],
  [3, 7], [4, 8], [5, 2], [6, 2], [7, 2], [8, 2],
];

const stats = [
  { num: '5', label: 'Companies' },
  { num: '35+', label: 'Years' },
  { num: '9', label: 'Provinces' },
  { num: '1000+', label: 'Projects' },
];

export default function CompaniesHero() {
  return (
    <section className="cph">
      {/* Animated network background */}
      <div className="cph-network" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {connections.map(([a, b], i) => (
            <motion.line
              key={`ln-${i}`}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="rgba(4,21,98,0.04)"
              strokeWidth="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 2.5, ease }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={`nd-${i}`}
              cx={n.x} cy={n.y} r="0.6"
              fill="rgba(4,21,98,0.06)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + i * 0.06, duration: 0.8, ease }}
            />
          ))}
        </svg>
      </div>

      <div className="cph-content">
        {/* Eyebrow */}
        <motion.p className="cph-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="cph-eyebrow-line" />
          Elcardo Industries
        </motion.p>

        {/* Headline — line by line */}
        <h1 className="cph-title">
          <motion.span className="cph-title-line" custom={0} variants={lineReveal} initial="hidden" animate="visible">
            The Elcardo
          </motion.span>
          <motion.span className="cph-title-line cph-title-accent" custom={1} variants={lineReveal} initial="hidden" animate="visible">
            Group
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p className="cph-subtitle"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease }}
        >
          Built across industries. Connected by precision.
        </motion.p>

        {/* Expanding divider */}
        <motion.div className="cph-divider"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 1.2, ease }}
        />

        {/* Stats */}
        <div className="cph-stats">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="cph-stat"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.8, ease }}
            >
              <span className="cph-stat-num">{s.num}</span>
              <span className="cph-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="cph-scroll"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="cph-scroll-line" />
      </motion.div>
    </section>
  );
}
