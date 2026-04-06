import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { companies } from '../../data/companiesData';
import './BrandStatement.css';

/* Pentagon node positions around center */
const CENTER = { x: 50, y: 50 };
const R = 28;
const outerNodes = companies.map((c, i) => {
  const a = (-Math.PI / 2) + (i * (2 * Math.PI) / companies.length);
  return { x: CENTER.x + R * Math.cos(a), y: CENTER.y + R * Math.sin(a), name: c.name.replace('Elcardo ', '').replace('Elme ', '') };
});

export default function BrandStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  /* Central node shrinks as outer nodes appear */
  const centerScale = useTransform(scrollYProgress, [0.15, 0.5], [1.6, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section className="cpx" ref={ref}>
      <div className="cpx-inner">
        {/* Left text */}
        <motion.div className="cpx-text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="cpx-kicker"><span className="cpx-line" />From One Foundation</span>
          <h2 className="cpx-title">A Single Vision,<br /><em>Five Divisions.</em></h2>
          <p className="cpx-desc">
            What began as a single industrial enterprise has grown into an
            interconnected group — engineering the infrastructure, energy,
            hospitality, and mobility of modern Sri Lanka.
          </p>
        </motion.div>

        {/* Right SVG — expansion animation */}
        <div className="cpx-visual">
          <svg viewBox="0 0 100 100" className="cpx-svg">
            {/* Lines from center to outer nodes — draw on scroll */}
            {outerNodes.map((n, i) => {
              const LineComponent = () => {
                const len = useTransform(scrollYProgress, [0.2 + i * 0.04, 0.4 + i * 0.04], [0, 1]);
                const op = useTransform(scrollYProgress, [0.2 + i * 0.04, 0.35 + i * 0.04], [0, 0.25]);
                return (
                  <motion.line
                    x1={CENTER.x} y1={CENTER.y}
                    x2={n.x} y2={n.y}
                    stroke="var(--primary-navy, #041562)"
                    strokeWidth="0.2"
                    style={{ pathLength: len, opacity: op }}
                  />
                );
              };
              return <LineComponent key={`line-${i}`} />;
            })}

            {/* Center node */}
            <motion.circle
              cx={CENTER.x} cy={CENTER.y} r="4"
              fill="none"
              stroke="var(--primary-navy, #041562)"
              strokeWidth="0.3"
              style={{ scale: centerScale, opacity: centerOpacity }}
            />
            <motion.text
              x={CENTER.x} y={CENTER.y + 0.5}
              textAnchor="middle"
              fill="var(--primary-navy, #041562)"
              fontSize="2"
              fontWeight="600"
              fontFamily="var(--font-body)"
              letterSpacing="0.15"
              style={{ opacity: centerOpacity }}
            >ELCARDO</motion.text>

            {/* Outer nodes — appear on scroll */}
            {outerNodes.map((n, i) => {
              const NodeComponent = () => {
                const s = useTransform(scrollYProgress, [0.28 + i * 0.05, 0.42 + i * 0.05], [0, 1]);
                const o = useTransform(scrollYProgress, [0.28 + i * 0.05, 0.38 + i * 0.05], [0, 1]);
                return (
                  <motion.g style={{ scale: s, opacity: o, transformOrigin: `${n.x}% ${n.y}%` }}>
                    <circle cx={n.x} cy={n.y} r="3" fill="#f5f5f7" stroke="var(--primary-navy, #041562)" strokeWidth="0.2" />
                    <text x={n.x} y={n.y + 0.8} textAnchor="middle" fill="var(--primary-navy)" fontSize="1.6" fontWeight="500" fontFamily="var(--font-body)">
                      {n.name.split(' ')[0]}
                    </text>
                  </motion.g>
                );
              };
              return <NodeComponent key={`node-${i}`} />;
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
