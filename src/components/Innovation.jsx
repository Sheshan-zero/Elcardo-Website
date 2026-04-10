import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import './Innovation.css';

import imgEngineering from '../assets/innovation_engineering.png';
import imgSolar from '../assets/innovation_solar.png';
import imgAutomotive from '../assets/innovation_automotive.png';

export default function Innovation() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="innovation" className="innovation" ref={ref}>
      <div className="innovation-inner section-padding">
        {/* Header */}
        <motion.div className="innovation-header" {...fade(0)}>
          <div className="section-label">
            <span className="label-line" style={{ background: 'var(--accent-red)' }} />
            <span className="label-text" style={{ color: 'var(--accent-red)' }}>What Drives Us</span>
          </div>
          <h2 className="display-lg innovation-title">
            Innovation<br />
            <span className="innovation-title-italic">at our core.</span>
          </h2>
          <p className="innovation-sub">
            A few ways <strong>Elcardo Group</strong> delivers excellence.
          </p>
        </motion.div>

        {/* ===== BENTO GRID ===== */}
        <div className="bento">

          {/* ---- Card 1: Engineering image (tall-left) ---- */}
          <motion.div className="bento__card bento__card--a" {...fade(0.1)}>
            <p className="bento__label">Engineering Precision</p>
            <p className="bento__caption">unibody design</p>
            <div className="bento__img-wrap bento__img-wrap--bottom">
              <img src={imgEngineering} alt="Engineering" loading="lazy" decoding="async" />
            </div>
          </motion.div>

          {/* ---- Card 2: Stat – 10+ years ---- */}
          <motion.div className="bento__card bento__card--b" {...fade(0.18)}>
            <p className="bento__pre">Over</p>
            <p className="bento__big">
              10<sup>+</sup>
            </p>
            <p className="bento__unit">years</p>
            <p className="bento__footnote">
              of technical mastery across<br />engineering & manufacturing
            </p>
          </motion.div>

          {/* ---- Card 3: Solar image (top-right) ---- */}
          <motion.div className="bento__card bento__card--c" {...fade(0.24)}>
            <p className="bento__label">Sustainable Energy</p>
            <p className="bento__caption">solar & storage systems</p>
            <div className="bento__img-wrap bento__img-wrap--fill">
              <img src={imgSolar} alt="Solar Energy" loading="lazy" decoding="async" />
            </div>
          </motion.div>

          {/* ---- Card 4: Stat – 65% ---- */}
          <motion.div className="bento__card bento__card--d" {...fade(0.3)}>
            <p className="bento__pre">Up to</p>
            <p className="bento__big">
              65<span className="bento__pct">%</span>
            </p>
            <p className="bento__unit">cost reduction</p>
            <p className="bento__footnote">
              with our solar energy<br />solutions for businesses
            </p>
          </motion.div>

          {/* ---- Card 5: Automotive image (center-bottom) ---- */}
          <motion.div className="bento__card bento__card--e" {...fade(0.36)}>
            <p className="bento__label">Automotive Innovation</p>
            <p className="bento__caption">custom fleet solutions</p>
            <div className="bento__img-wrap bento__img-wrap--fill">
              <img src={imgAutomotive} alt="Automotive" loading="lazy" decoding="async" />
            </div>
          </motion.div>

          {/* ---- Card 6: Feature – Full Stack ---- */}
          <motion.div className="bento__card bento__card--f" {...fade(0.42)}>
            <div className="bento__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <p className="bento__feat-title">Full-Stack<br />Industrial Solutions</p>
            <p className="bento__feat-desc">
              From gates to solar to vehicles —<br />end-to-end under one roof.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
