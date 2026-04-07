import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroBgImage from '../../assets/companies_hero_bg.png';
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
  { num: '6', label: 'Divisions' },
  { num: '35+', label: 'Years' },
  { num: '9', label: 'Provinces' },
  { num: '1000+', label: 'Projects' },
];

export default function CompaniesHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="cph" ref={sectionRef}>
      {/* Hero Background Image */}
      <div className="cph-bg-image-wrap">
        <motion.img 
          src={heroBgImage} 
          alt="Elcardo Group Campus" 
          className="cph-bg-image"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="cph-bg-overlay" />
        <div className="cph-noise" />

        {/* Network lines overlay */}
        <svg className="cph-network" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
          {connections.map(([n1, n2], i) => (
            <motion.line
              key={i}
              x1={nodes[n1].x} y1={nodes[n1].y}
              x2={nodes[n2].x} y2={nodes[n2].y}
              stroke="rgba(255,255,255,0.15)" strokeWidth="0.1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease, delay: 1 + i * 0.1 }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={`c-${i}`}
              cx={n.x} cy={n.y} r="0.3" fill="rgba(255,255,255,0.4)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1 + i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      <div className="cph-bg-text">
        DIVISIONS
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
            More Than
          </motion.span>
          <motion.span className="cph-title-line cph-title-accent" custom={1} variants={lineReveal} initial="hidden" animate="visible">
            One Company
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p className="cph-subtitle"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease }}
        >
          Built across industries. Connected by purpose.
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
