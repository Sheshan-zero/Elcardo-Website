import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../components/Companies/CompaniesHero.css';

const ease = [0.16, 1, 0.3, 1];
const basePath = import.meta.env.BASE_URL || '/';

const lineReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 1, ease },
  }),
};

export default function ContactHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sectionRef.current) { ticking = false; return; }
        const scrollY = window.scrollY;
        
        const content = sectionRef.current.querySelector('.cph-content');
        if (content) {
          content.style.transform = `translateY(${scrollY * 0.25}px)`;
          content.style.opacity = Math.max(0, 1 - scrollY / 600);
        }
        
        const scrollInd = sectionRef.current.querySelector('.cph-scroll');
        if (scrollInd) {
          scrollInd.style.opacity = Math.max(0, 1 - scrollY / 600);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="cph" id="contact-hero" ref={sectionRef}>
      {/* Hero Background Image */}
      <div className="cph-bg-image-wrap">
        <motion.img 
          src={`${basePath}images/contact-hero.png`}
          alt="Elcardo Industries processing plant" 
          className="cph-bg-image"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="cph-bg-overlay" />
        <div className="cph-noise" />
      </div>

      <div className="cph-bg-text">
        CONTACT
      </div>

      <div className="cph-content">
        {/* Eyebrow */}
        <motion.p className="cph-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="cph-eyebrow-line" />
          Connect With Us
        </motion.p>

        {/* Headline — line by line */}
        <h1 className="cph-title">
          <motion.span className="cph-title-line" custom={0} variants={lineReveal} initial="hidden" animate="visible">
            Reach Elcardo
          </motion.span>
          <motion.span className="cph-title-line cph-title-accent" custom={1} variants={lineReveal} initial="hidden" animate="visible">
            Across Sri Lanka.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p className="cph-subtitle"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease }}
        >
          One network. Six locations. Trusted industrial support nationwide.
        </motion.p>

        {/* Expanding divider */}
        <motion.div className="cph-divider"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 1.2, ease }}
        />

        {/* Fake "stats" row mapped to contact info */}
        <div className="cph-stats">
          <motion.div className="cph-stat"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease }}
          >
            <span className="cph-stat-num" style={{fontSize: 'clamp(20px, 2.5vw, 32px)', whiteSpace: 'nowrap'}}>+94 11 234 5678</span>
            <span className="cph-stat-label">Call Us</span>
          </motion.div>
          <motion.div className="cph-stat"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease }}
          >
            <span className="cph-stat-num" style={{fontSize: 'clamp(16px, 2vw, 32px)', whiteSpace: 'nowrap'}}>info@elcardoindustries.lk</span>
            <span className="cph-stat-label">Email</span>
          </motion.div>
          <motion.div className="cph-stat"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease }}
          >
            <span className="cph-stat-num" style={{fontSize: '32px'}}>6</span>
            <span className="cph-stat-label">Locations Island-wide</span>
          </motion.div>
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
