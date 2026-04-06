import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { branches } from './sriLankaPath';

const basePath = import.meta.env.BASE_URL || '/';
const COLS = 4;
const ROWS = Math.ceil(branches.length / COLS);
const CARD_W = 290;
const CARD_H = 200;

/* ─── Each card starts stacked at center, fans out to grid position ─── */
function ScrollCard({ branch, index, scrollYProgress }) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const centerCol = (COLS - 1) / 2;
  const centerRow = (ROWS - 1) / 2;

  const offsetX = (centerCol - col) * CARD_W;
  const offsetY = (centerRow - row) * CARD_H;

  const stagger = index * 0.01;
  const s = 0.24 + stagger;
  const e = s + 0.22;

  const x = useTransform(scrollYProgress, [s, e], [offsetX, 0]);
  const y = useTransform(scrollYProgress, [s, e], [offsetY, 0]);
  const opacity = useTransform(scrollYProgress, [s, s + 0.06], [0, 1]);
  const scale = useTransform(scrollYProgress, [s, e], [0.65, 1]);

  return (
    <motion.div className="cb-card" style={{ x, y, opacity, scale }}>
      <div className="cb-card-visual">
        <img src={`${basePath}images/branch-building.png`} alt={branch.city} loading="lazy" />
        <div className="cb-card-gradient" />
        {branch.isHQ && <span className="cb-card-hq">HQ</span>}
        <div className="cb-card-city">{branch.city}</div>
      </div>
      <div className="cb-card-info">
        <p className="cb-card-region">{branch.region}</p>
        <p className="cb-card-address">{branch.address}</p>
        <div className="cb-card-links">
          <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer" className="cb-link-dir">
            Directions <span>&rarr;</span>
          </a>
          <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="cb-link-call">
            {branch.phone}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactBranches() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Banner transforms */
  const heroScale = useTransform(scrollYProgress, [0.04, 0.42], [1, 0.26]);
  const heroOpacity = useTransform(scrollYProgress, [0.38, 0.5], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.06, 0.18], [1, 0]);
  const badgeOpacity = useTransform(scrollYProgress, [0.04, 0.12], [1, 0]);

  /* Header text above banner — visible at start, fades early */
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], [0, -30]);

  /* Floating side stats — appear during transition */
  const statsOpacity = useTransform(scrollYProgress, [0.12, 0.22, 0.4, 0.5], [0, 1, 1, 0]);
  const statsScale = useTransform(scrollYProgress, [0.12, 0.22], [0.9, 1]);

  /* Center tagline — appears mid-transition when cards are spreading */
  const taglineOpacity = useTransform(scrollYProgress, [0.32, 0.42, 0.52, 0.6], [0, 1, 1, 0]);

  /* Scroll indicator line */
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

  return (
    <section className="cb-section" ref={sectionRef} id="contact-branches">
      <div className="cb-sticky">

        {/* Background watermark text */}
        <div className="cb-watermark" aria-hidden="true">BRANCHES</div>

        {/* Scroll progress line */}
        <div className="cb-scroll-line">
          <motion.div className="cb-scroll-fill" style={{ height: lineHeight }} />
        </div>

        <div className="cb-inner">

          {/* Header text ABOVE the banner — fills the empty top area */}
          <motion.div
            className="cb-section-header"
            style={{ opacity: headerOpacity, y: headerY }}
          >
            <p className="cb-header-kicker">
              <span className="cb-header-line" />
              Our Presence
            </p>
            <h2 className="cb-header-title">
              {branches.length} Locations Across<br />
              <em>Sri Lanka</em>
            </h2>
          </motion.div>

          {/* LAYER 2 (top): Banner image — shrinks on scroll */}
          <motion.div
            className="cb-banner"
            style={{ scale: heroScale, opacity: heroOpacity }}
          >
            <img src={`${basePath}images/branch-building.png`} alt="Elcardo Head Office" />
            <div className="cb-banner-overlay" />
            <motion.div className="cb-banner-text" style={{ opacity: textOpacity }}>
              <p className="cb-kicker">Directory</p>
              <h2 className="cb-title">All <em>Branches</em></h2>
              <p className="cb-subtitle">
                Visit any Elcardo branch for direct consultation, product viewing,
                and expert support across Sri Lanka.
              </p>
            </motion.div>
            <motion.div className="cb-banner-badge" style={{ opacity: badgeOpacity }}>
              <span className="cb-badge-num">{branches.length}</span>
              <span className="cb-badge-label">Branches<br />Island&#8209;wide</span>
            </motion.div>
          </motion.div>

          {/* Floating stats — appear during the shrink phase */}
          <motion.div
            className="cb-floating-stats"
            style={{ opacity: statsOpacity, scale: statsScale }}
          >
            <div className="cb-float-stat">
              <span className="cb-float-num">9</span>
              <span className="cb-float-label">Provinces<br />Covered</span>
            </div>
            <div className="cb-float-divider" />
            <div className="cb-float-stat">
              <span className="cb-float-num">35+</span>
              <span className="cb-float-label">Years of<br />Excellence</span>
            </div>
            <div className="cb-float-divider" />
            <div className="cb-float-stat">
              <span className="cb-float-num">24/7</span>
              <span className="cb-float-label">Customer<br />Support</span>
            </div>
          </motion.div>

          {/* LAYER 1 (behind): Cards fan out from center */}
          <div className="cb-grid">
            {branches.map((branch, i) => (
              <ScrollCard
                key={branch.id}
                branch={branch}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Bottom tagline — appears when grid settles */}
        <motion.p className="cb-bottom-tag" style={{ opacity: taglineOpacity }}>
          Wherever you are, we&rsquo;re never far away
        </motion.p>
      </div>
    </section>
  );
}
