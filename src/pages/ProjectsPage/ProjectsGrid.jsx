import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import imgResidential from '../../assets/project_residential_gate.png';
import imgSolar from '../../assets/project_solar_install.png';
import imgSteel from '../../assets/project_steel_fabrication.png';
import imgDecking from '../../assets/project_luxury_decking.png';
import imgCommercial from '../../assets/project_commercial_gate.png';

const ease = [0.16, 1, 0.3, 1];

const allProjects = [
  {
    name: 'Villa Serene Gate System',
    category: 'Residential',
    type: 'Gate Automation',
    desc: 'Integrated smart gate for luxury residence',
    image: imgResidential,
  },
  {
    name: '150kW Rooftop Solar Array',
    category: 'Commercial',
    type: 'Solar Installation',
    desc: 'Commercial-grade renewable energy system',
    image: imgSolar,
  },
  {
    name: 'Harbour View Steel Framework',
    category: 'Commercial',
    type: 'Steel Fabrication',
    desc: 'Precision steel structure for coastal project',
    image: imgSteel,
  },
  {
    name: 'Lakeside Premium Deck',
    category: 'Residential',
    type: 'Wood Decking',
    desc: 'Luxury outdoor living installation',
    image: imgDecking,
  },
  {
    name: 'Corporate HQ Access System',
    category: 'Commercial',
    type: 'Gate Automation',
    desc: 'Automated perimeter security system',
    image: imgCommercial,
  },
];

const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="projects-grid-section" id="projects-grid" ref={ref}>
      <motion.div
        className="projects-grid-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease }}
      >
        <p className="projects-grid-kicker">Portfolio</p>
        <h2 className="projects-grid-title">
          Explore Our <em>Work</em>
        </h2>
        <p className="projects-grid-sub">
          A refined selection from across our residential, commercial, and industrial projects.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="projects-filter-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className={`projects-filter-tab ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
            data-cursor="expand"
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.name}
              className="projects-grid-card"
              data-cursor="expand"
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="projects-grid-card-img"
                loading="lazy"
                decoding="async"
              />
              <div className="projects-grid-card-overlay" />
              <div className="projects-grid-card-name">{project.name}</div>
              <div className="projects-grid-card-detail">
                <div className="projects-grid-card-type">{project.type}</div>
                <div className="projects-grid-card-desc">{project.desc}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
