import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './ProductsNav.css';

const CATEGORIES = [
  { id: 'roller-shutters', label: 'Roller Shutters' },
  { id: 'solar-systems',  label: 'Solar Systems' },
  { id: 'pantry-systems', label: 'Pantry Systems' },
  { id: 'ss-fabrication', label: 'SS Fabrication' },
  { id: 'roofing',        label: 'Roofing' },
  { id: 'wpc-decking',    label: 'WPC Decking' },
];

const ease = [0.16, 1, 0.3, 1];

const ProductsNav = () => {
  const [active, setActive] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = CATEGORIES.map(c => document.getElementById(c.id));
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActive(CATEGORIES[i].id);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      ref={navRef}
      className="pn-nav"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="pn-inner">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`pn-pill ${active === cat.id ? 'pn-active' : ''}`}
            onClick={() => scrollTo(cat.id)}
          >
            {cat.label}
            {active === cat.id && (
              <motion.div className="pn-indicator" layoutId="pn-indicator" transition={{ duration: 0.4, ease }} />
            )}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default ProductsNav;
