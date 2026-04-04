import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ease = [0.16, 1, 0.3, 1];

const stats = [
  { number: '1000', suffix: '+', label: 'Projects Completed', accent: true },
  { number: 'Island', suffix: ' Wide', label: 'Coverage', accent: false },
  { number: '38', suffix: '+', label: 'Years Experience', accent: true },
];

export default function ProjectsStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="projects-stats-section" id="projects-stats" ref={ref}>
      <motion.div
        className="projects-stats-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease }}
      >
        <p className="projects-stats-kicker">Our Impact</p>
        <h2 className="projects-stats-title">
          Built at <em>Scale</em>
        </h2>
      </motion.div>

      <div className="projects-stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            className="projects-stat-item"
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.12, ease }}
          >
            <div className="projects-stat-number">
              {stat.number}
              <span className="stat-accent">{stat.suffix}</span>
            </div>
            <div className="projects-stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
