import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const businesses = [
  {
    id: 'gates',
    name: 'Elcardo Roller Gates',
    desc: 'Precision engineered automated security solutions for residential and industrial applications.',
    href: '/roller-gates'
  },
  {
    id: 'solar',
    name: 'Elcardo Solar',
    desc: 'Powering a sustainable future through massive-scale industrial solar integrations.',
    href: '/#solar'
  },
  {
    id: 'battery',
    name: 'Elme Battery',
    desc: 'High-performance reliable energy storage for automotive and deep-cycle demands.',
    href: '/#battery'
  },
  {
    id: 'hotel',
    name: 'Anilad Hotels',
    desc: 'Redefining luxury hospitality with eco-friendly premium resorts.',
    href: '/#hotels'
  },
  {
    id: 'vehicle',
    name: 'Vehicle Modification',
    desc: 'Bespoke automotive engineering and specialized fleet vehicle conversions.',
    href: '/#modification'
  }
];

export default function AboutBusinesses() {
  return (
    <section className="about-section about-businesses">
      <div className="about-businesses-header">
        <h2 className="about-title-large">Our Businesses</h2>
        <p className="about-body-text">
          A diversified portfolio bound together by an unyielding commitment to premium engineering and excellence.
        </p>
      </div>

      <div className="about-businesses-grid">
        {businesses.map((biz, i) => (
          <motion.div 
            key={biz.id} 
            className="about-biz-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
          >
            <Link to={biz.href} style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}>
              <div className={`about-biz-bg about-biz-bg--${biz.id}`} />
              <div className="about-biz-content">
                <h3>{biz.name}</h3>
                <p>{biz.desc}</p>
                <div className="about-biz-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
