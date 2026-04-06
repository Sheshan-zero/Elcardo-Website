import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { companies } from '../../data/companiesData';
import { Link } from 'react-router-dom';
import './CompanyShowcase.css';

const ease = [0.16, 1, 0.3, 1];

export default function CompanyShowcase() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Determine which company is active (0–4) based on scroll */
  const totalCompanies = companies.length;

  return (
    <section
      className="cps"
      ref={sectionRef}
      id="divisions"
      style={{ height: `${(totalCompanies + 1) * 100}vh` }}
    >
      <div className="cps-sticky">
        {/* LEFT: Sticky text that updates per company */}
        <div className="cps-left">
          {companies.map((company, i) => (
            <CompanyText
              key={company.id}
              company={company}
              index={i}
              total={totalCompanies}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* RIGHT: Images that crossfade */}
        <div className="cps-right">
          {companies.map((company, i) => (
            <CompanyImage
              key={company.id}
              company={company}
              index={i}
              total={totalCompanies}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Scroll progress bar */}
          <div className="cps-progress">
            <motion.div
              className="cps-progress-fill"
              style={{ scaleY: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Text block for each company ─── */
function CompanyText({ company, index, total, scrollYProgress }) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  const mid = start + step * 0.5;

  const opacity = useTransform(scrollYProgress, [
    start, start + step * 0.15,
    mid,
    end - step * 0.15, end,
  ], [0, 1, 1, 1, 0]);

  const y = useTransform(scrollYProgress, [start, start + step * 0.2], [30, 0]);

  return (
    <motion.div className="cps-text-block" style={{ opacity, y }}>
      <div className="cps-meta">
        <span className="cps-index">{company.index}</span>
        <span className="cps-sector" style={{ color: company.theme.accent }}>
          {company.sector}
        </span>
      </div>
      <h2 className="cps-name">{company.name}</h2>
      <p className="cps-desc">{company.description}</p>
      <div className="cps-stats">
        <div className="cps-stat">
          <span className="cps-stat-val" style={{ color: company.theme.accent }}>{company.stats.metric1}</span>
          <span className="cps-stat-lbl">{company.stats.label1}</span>
        </div>
        <div className="cps-stat-div" />
        <div className="cps-stat">
          <span className="cps-stat-val" style={{ color: company.theme.accent }}>{company.stats.metric2}</span>
          <span className="cps-stat-lbl">{company.stats.label2}</span>
        </div>
      </div>
      <Link to={company.ctaLink} className="cps-link">
        Explore Solutions
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </motion.div>
  );
}

/* ─── Image block for each company ─── */
function CompanyImage({ company, index, total, scrollYProgress }) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  const opacity = useTransform(scrollYProgress, [
    start, start + step * 0.15,
    start + step * 0.5,
    end - step * 0.15, end,
  ], [0, 1, 1, 1, 0]);

  const scale = useTransform(scrollYProgress, [start, start + step * 0.3], [1.08, 1]);

  return (
    <motion.div className="cps-img-layer" style={{ opacity }}>
      <motion.img
        src={company.image}
        alt={company.name}
        loading="lazy"
        style={{ scale }}
      />
      {/* Cinematic line sweep */}
      <motion.div
        className="cps-sweep"
        style={{
          scaleX: useTransform(scrollYProgress, [start, start + step * 0.2, start + step * 0.5], [0, 1, 0]),
        }}
      />
    </motion.div>
  );
}
