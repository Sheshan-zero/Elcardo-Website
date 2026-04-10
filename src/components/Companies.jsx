import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import imgRollerGates from '../assets/company_roller_gates.png';
import imgSolar from '../assets/company_solar.png';
import imgBattery from '../assets/company_battery.png';
import imgHotel from '../assets/company_hotel.png';
import imgAutomotive from '../assets/company_automotive.png';
import './Companies.css';

const companies = [
  {
    num: '01',
    name: 'Elcardo Roller Gates',
    desc: 'Industrial-grade automated gate systems, roller shutters, and entry automation for commercial and industrial facilities across Sri Lanka.',
    tag: 'Engineering',
    img: imgRollerGates,
    link: '/roller-gates',
  },
  {
    num: '02',
    name: 'Elcardo Solar',
    desc: 'End-to-end solar energy solutions — from residential rooftop systems to utility-scale commercial and industrial solar installations.',
    tag: 'Renewable Energy',
    img: imgSolar,
  },
  {
    num: '03',
    name: 'Elme Battery',
    desc: 'Advanced energy storage systems engineered for reliability, longevity, and sustainable performance in industrial and residential applications.',
    tag: 'Clean Technology',
    img: imgBattery,
  },
  {
    num: '04',
    name: 'Anilad Hotels',
    desc: 'A growing portfolio of luxury and boutique hotels delivering world-class hospitality experiences across Sri Lanka\'s premier destinations.',
    tag: 'Hospitality',
    img: imgHotel,
  },
  {
    num: '05',
    name: 'Vehicle Modification Center',
    desc: 'Bespoke vehicle customization, performance engineering, and commercial fleet solutions designed with precision for discerning clients.',
    tag: 'Automotive',
    img: imgAutomotive,
  },
];

export default function Companies() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="companies" className="companies section-padding" ref={ref}>
      {/* Floating preview image */}
      <AnimatePresence>
        {hoveredIdx !== null && (
          <motion.div
            className="company-preview"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={companies[hoveredIdx].img} alt={companies[hoveredIdx].name} loading="lazy" decoding="async" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="companies-header">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="label-line" />
            <span className="label-text">Our Portfolio</span>
          </div>
          <h2 className="display-lg" style={{ color: 'var(--primary-navy)' }}>
            Five companies.<br />
            <span className="text-italic">One vision.</span>
          </h2>
        </motion.div>
        <motion.p
          className="companies-desc body-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Each subsidiary operates independently as an industry leader while
          sharing the group's commitment to quality, innovation, and
          long-term value creation.
        </motion.p>
      </div>

      <div className="companies-list">
        {companies.map((company, i) => {
          const RowTag = company.link ? Link : 'a';
          const rowProps = company.link
            ? { to: company.link }
            : { href: '#' };
          return (
          <motion.div
            className={`company-row ${hoveredIdx === i ? 'is-hovered' : ''}`}
            key={company.num}
            data-cursor="expand"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <RowTag {...rowProps} style={{ display: 'contents', color: 'inherit', textDecoration: 'none' }}>
            <span className="company-num">{company.num}</span>
            <div className="company-name">{company.name}</div>
            <div className="company-img-cell">
              <div className="company-img-wrapper">
                <img src={company.img} alt={company.name} loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="company-description">{company.desc}</div>
            <div className="company-tag">
              <span>{company.tag}</span>
              <div className="company-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
            </div>
            <div className="company-hover-bg" />
            </RowTag>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
