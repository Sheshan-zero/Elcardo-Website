import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

function Counter({ from, to, suffix = '', duration = 2.5 }) {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (val) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(val) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, suffix, isInView]);

  return <span ref={nodeRef} className="about-today-stat-number">{from}{suffix}</span>;
}

const stats = [
  { from: 0, to: 10, suffix: '+', label: 'Years' },
  { from: 0, to: 6, suffix: '', label: 'Divisions' },
  { from: 0, to: 200, suffix: '+', label: 'Projects' },
  { from: 0, to: 500, suffix: '+', label: 'Clients' },
];

export default function AboutToday() {
  return (
    <section className="about-today" id="about-today">
      <div className="about-today-inner">
        <div className="about-today-left">
          <motion.p
            className="about-kicker"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            Elcardo Today
          </motion.p>

          <motion.h2
            className="about-today-headline"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            A modern industrial group. <em>Built to last.</em>
          </motion.h2>

          <motion.p
            className="about-today-body"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            From roller gates to hospitality, from battery technology to automotive engineering — Elcardo represents multi-sector capability driven by a singular commitment to excellence.
          </motion.p>
        </div>

        <div className="about-today-stats">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="about-today-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
            >
              <Counter from={stat.from} to={stat.to} suffix={stat.suffix} />
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
