import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import imgResidential from '../../assets/project_residential_gate.png';
import imgIndustrial from '../../assets/project_industrial_roller.png';
import imgSolar from '../../assets/project_solar_install.png';
import imgSteel from '../../assets/project_steel_fabrication.png';

const ease = [0.16, 1, 0.3, 1];

const featuredProjects = [
  {
    name: 'Oakwood Residence Gate System',
    category: 'Residential',
    location: 'Colombo 07, Western Province',
    image: imgResidential,
  },
  {
    name: 'Free Trade Zone Roller Door Complex',
    category: 'Industrial',
    location: 'Katunayake, Gampaha',
    image: imgIndustrial,
  },
  {
    name: '200kW Commercial Solar Array',
    category: 'Commercial',
    location: 'Negombo, Western Province',
    image: imgSolar,
  },
  {
    name: 'Harbour Steel Framework',
    category: 'Commercial',
    location: 'Galle, Southern Province',
    image: imgSteel,
  },
];

function FeaturedProject({ project, index }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.03]);

  return (
    <section className="projects-featured-section" ref={ref} id={`featured-${index}`}>
      <div className="projects-featured-bg">
        <motion.img
          src={project.image}
          alt={project.name}
          style={{ y, scale }}
          loading="lazy"
        />
      </div>
      <div className="projects-featured-overlay" />

      <div className="projects-featured-content">
        <motion.div
          className="projects-featured-index"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        <motion.p
          className="projects-featured-category"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
        >
          {project.category}
        </motion.p>

        <motion.h2
          className="projects-featured-name"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.24, ease }}
        >
          {project.name}
        </motion.h2>

        <motion.div
          className="projects-featured-location"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.36, ease }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {project.location}
        </motion.div>
      </div>
    </section>
  );
}

export default function ProjectsFeatured() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setShowProgress(inView);

      if (inView) {
        const sections = containerRef.current.querySelectorAll('.projects-featured-section');
        sections.forEach((section, i) => {
          const sRect = section.getBoundingClientRect();
          if (sRect.top < window.innerHeight * 0.5 && sRect.bottom > window.innerHeight * 0.3) {
            setActiveIndex(i);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef}>
      {featuredProjects.map((project, i) => (
        <FeaturedProject key={i} project={project} index={i} />
      ))}

      {/* Side progress dots */}
      <div className={`projects-featured-progress ${showProgress ? 'visible' : ''}`}>
        {featuredProjects.map((_, i) => (
          <div
            key={i}
            className={`projects-featured-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => {
              const el = document.getElementById(`featured-${i}`);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </div>
  );
}
