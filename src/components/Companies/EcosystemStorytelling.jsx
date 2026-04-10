import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companies } from '../../data/companiesData';
import './EcosystemStorytelling.css';

/* ─── Auto-scroll config ─── */
const AUTO_SCROLL_DELAY = 800;
const AUTO_SCROLL_DURATION = 1400;

/* ─── Story card images per company ─── */
import storyRollerHome from '../../assets/story_roller_home.png';
import storyRollerDetail from '../../assets/story_roller_detail.png';
import storyRollerInstall from '../../assets/story_roller_install.png';
import storyRollerFinished from '../../assets/story_roller_finished.png';
import storySolarFarm from '../../assets/story_solar_farm.png';
import storySolarDetail from '../../assets/story_solar_detail.png';
import imgSolar from '../../assets/company_solar.png';
import imgBattery from '../../assets/company_battery.png';
import imgHotel from '../../assets/company_hotel.png';
import imgPantry from '../../assets/company_pantry.png';
import imgAutomotive from '../../assets/company_automotive.png';

/* ─── Constants ─── */
const EASE = [0.16, 1, 0.3, 1];
const COMPANIES_COUNT = companies.length; // 6 now

/* ─── Company node names (short) ─── */
const NODE_NAMES = ['Roller', 'Solar', 'Battery', 'Anilad', 'Pantry', 'Vehicle'];

/* ─── Narrative Text per phase ─── */
const NARRATIVE_TEXT = [
  "Our foundation",         
  "Expanding into energy",  
  "Powering mobility",      
  "Entering hospitality",   
  "Refining interiors",     
  "Driving forward",        
];

/* ─── Story cards data per company ─── */
const STORY_CARDS = [
  [
    { img: storyRollerHome, caption: 'Residential Gates' },
    { img: storyRollerDetail, caption: 'Custom Solutions' },
    { img: storyRollerInstall, caption: 'Industrial Access' },
    { img: storyRollerFinished, caption: 'Premium Security' },
  ],
  [
    { img: storySolarFarm, caption: 'Solar Farm — Grid-Scale' },
    { img: storySolarDetail, caption: 'Photovoltaic — Tech' },
    { img: imgSolar, caption: 'Rooftop — Residential' },
    { img: storySolarFarm, caption: 'Commercial — Clean' },
  ],
  [
    { img: imgBattery, caption: 'Advanced — Storage' },
    { img: storySolarDetail, caption: 'Cell — Innovation' },
    { img: imgBattery, caption: 'Industrial — Grid' },
    { img: storyRollerDetail, caption: 'Engineering — Precision' },
  ],
  [
    { img: imgHotel, caption: 'Boutique — Luxury' },
    { img: imgHotel, caption: 'Interior — Curated' },
    { img: storyRollerHome, caption: 'Architecture — Premium' },
    { img: imgHotel, caption: 'Hospitality — Experience' },
  ],
  [
    { img: imgPantry, caption: 'Functional — Solutions' },
    { img: imgHotel, caption: 'Premium — Cabinetry' },
    { img: imgPantry, caption: 'Modern — Pantries' },
    { img: storyRollerDetail, caption: 'Design — Precision' },
  ],
  [
    { img: imgAutomotive, caption: 'Performance — Custom' },
    { img: imgAutomotive, caption: 'Modification — Bespoke' },
    { img: storyRollerInstall, caption: 'Workshop — Process' },
    { img: imgAutomotive, caption: 'Fleet — Solutions' },
  ],
];

/* ─── Circular layout positions (normalized 0-1) ─── */
const HEXAGON_POSITIONS = NODE_NAMES.map((_, i) => {
  const angle = (-Math.PI / 2) + (i * (2 * Math.PI) / COMPANIES_COUNT);
  return {
    x: 0.5 + 0.22 * Math.cos(angle),
    y: 0.5 + 0.22 * Math.sin(angle),
  };
});

/* ─── Grouped-left positions when a node is active (5 inactive nodes) ─── */
const GROUPED_LEFT_POSITIONS = [
  { x: 0.10, y: 0.20 },
  { x: 0.06, y: 0.35 },
  { x: 0.10, y: 0.50 },
  { x: 0.06, y: 0.65 },
  { x: 0.10, y: 0.80 },
];

/* ─── Card layout positions (around center active node) ─── */
const CARD_POSITIONS = [
  { x: 0.60, y: 0.14 },
  { x: 0.78, y: 0.36 },
  { x: 0.72, y: 0.60 },
  { x: 0.50, y: 0.72 },
];

/* ─── Wobble values for cards ─── */
const WOBBLE_CONFIGS = [
  { x: -12, y: 8, rot: -3 },
  { x: 10, y: -6, rot: 4 },
  { x: -8, y: -10, rot: -2 },
  { x: 14, y: 6, rot: 3 },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function EcosystemStorytelling() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dims, setDims] = useState({ w: 1400, h: 900 });
  const hasAutoScrolledRef = useRef(false);

  // Store scroll-derived values in refs to avoid 60fps re-renders
  const scrollProgressRef = useRef(0);
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [phaseProgress, setPhaseProgress] = useState(0);

  const OVERVIEW_END = 0.12;
  const OUTRO_BUFFER = 0.04;
  const NODE_WIDTH = (1.0 - OVERVIEW_END - OUTRO_BUFFER) / COMPANIES_COUNT;
  const NODES_START = OVERVIEW_END;

  useEffect(() => {
    const update = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDims({ w: rect.width, h: rect.height });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const sectionHeight = containerRef.current.scrollHeight;
            const viewportH = window.innerHeight;
            const scrolled = -rect.top;
            const totalScrollable = sectionHeight - viewportH;
            const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
            scrollProgressRef.current = progress;

            // Only derive phase & phaseProgress — setState only when they change
            let newPhase = -1;
            let newPhaseProgress = 0;

            if (progress < OVERVIEW_END) {
              newPhase = -1;
              newPhaseProgress = progress / OVERVIEW_END;
            } else {
              const v = progress - NODES_START;
              newPhase = Math.min(Math.floor(v / NODE_WIDTH), COMPANIES_COUNT - 1);
              newPhaseProgress = (v - newPhase * NODE_WIDTH) / NODE_WIDTH;
            }

            // Always update phaseProgress for smooth animation
            setPhaseProgress(newPhaseProgress);
            setCurrentPhase((prev) => prev !== newPhase ? newPhase : prev);

            // Auto-scroll logic
            if (progress >= 0.97 && !hasAutoScrolledRef.current && containerRef.current) {
              hasAutoScrolledRef.current = true;
              setTimeout(() => {
                if (containerRef.current) {
                  const sectionBottom = containerRef.current.getBoundingClientRect().bottom + window.scrollY;
                  smoothScrollTo(sectionBottom + 10, AUTO_SCROLL_DURATION);
                }
              }, AUTO_SCROLL_DELAY);
            }
            if (progress < 0.5) {
              hasAutoScrolledRef.current = false;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [OVERVIEW_END, NODES_START, NODE_WIDTH]);

  const getNodePosition = useCallback((nodeIndex) => {
    if (currentPhase === -1) {
      return HEXAGON_POSITIONS[nodeIndex];
    }
    if (nodeIndex === currentPhase) {
      const fromPos = HEXAGON_POSITIONS[nodeIndex];
      const toPos = { x: 0.36, y: 0.48 };
      const t = easeOutCubic(Math.min(phaseProgress / 0.25, 1));
      return { x: lerp(fromPos.x, toPos.x, t), y: lerp(fromPos.y, toPos.y, t) };
    }
    const inactiveNodes = [];
    for (let i = 0; i < COMPANIES_COUNT; i++) {
      if (i !== currentPhase) inactiveNodes.push(i);
    }
    const groupIndex = inactiveNodes.indexOf(nodeIndex);
    if (groupIndex === -1) return HEXAGON_POSITIONS[nodeIndex];

    const fromPos = HEXAGON_POSITIONS[nodeIndex];
    const toPos = GROUPED_LEFT_POSITIONS[groupIndex];
    const t = easeOutCubic(Math.min(phaseProgress / 0.25, 1));
    return { x: lerp(fromPos.x, toPos.x, t), y: lerp(fromPos.y, toPos.y, t) };
  }, [currentPhase, phaseProgress]);

  const ringProgress = currentPhase >= 0 ? Math.min(phaseProgress / 0.2, 1) : 0;
  const ringCircumference = 2 * Math.PI * 52;

  const getCardOpacity = useCallback((ci) => {
    if (currentPhase < 0) return 0;
    const stagger = ci * 0.03;
    const fadeIn = 0.20 + stagger;
    const fadeInEnd = 0.32 + stagger;
    const fadeOut = 0.78;
    const fadeOutEnd = 0.95;

    if (phaseProgress < fadeIn) return 0;
    if (phaseProgress > fadeOutEnd) return 0;
    if (phaseProgress >= fadeOut) return Math.max(0, 1 - (phaseProgress - fadeOut) / (fadeOutEnd - fadeOut));
    if (phaseProgress < fadeInEnd) return (phaseProgress - fadeIn) / (fadeInEnd - fadeIn);
    return 1;
  }, [currentPhase, phaseProgress]);

  const overviewOpacity = currentPhase === -1 ? Math.min(phaseProgress * 2.5, 1) : 0;
  const showCenter = currentPhase === -1;
  const narrativeOpacity = currentPhase >= 0 && phaseProgress > 0.05 && phaseProgress < 0.95 ? 1 : 0;

  const companyInfoOpacity = currentPhase >= 0
    ? Math.min(Math.max((phaseProgress - 0.15) / 0.1, 0), 1, Math.max((0.92 - phaseProgress) / 0.08, 0))
    : 0;

  const sectionHeight = `${(COMPANIES_COUNT + 14) * 100}vh`;

  return (
    <section className="eco-story" ref={containerRef} style={{ height: sectionHeight }}>
      <div className="eco-story__sticky">
        <div className="eco-story__canvas" ref={canvasRef}>

          {/* ─── Header — Overview Only ─── */}
          <div className="eco-story__header" style={{ opacity: overviewOpacity, transition: 'opacity 0.6s ease' }}>
            <span className="eco-story__kicker">
              <span className="eco-story__kicker-line" />
              The Ecosystem
            </span>
            <h2 className="eco-story__title">
              A growing network of companies.
            </h2>
          </div>

          {/* ─── Dynamic Narrative Overlay — Appears during Active Node ─── */}
          {currentPhase >= 0 && (
            <div className="eco-story__narrative" style={{ opacity: narrativeOpacity, transition: 'opacity 0.6s ease' }}>
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={currentPhase}
                  className="eco-story__title"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {NARRATIVE_TEXT[currentPhase]}
                </motion.h2>
              </AnimatePresence>
            </div>
          )}

          {/* ─── SVG connection lines ─── */}
          <svg className="eco-story__svg" viewBox={`0 0 ${dims.w} ${dims.h}`}>
            <defs>
              <filter id="pulseGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {showCenter && NODE_NAMES.map((_, i) => {
              const cx = dims.w * 0.5;
              const cy = dims.h * 0.5;
              const np = HEXAGON_POSITIONS[i];
              const nx = dims.w * np.x;
              const ny = dims.h * np.y;
              return (
                <line key={`ov-${i}`}
                  x1={cx} y1={cy} x2={nx} y2={ny}
                  className="eco-pulse-line"
                  style={{ opacity: overviewOpacity * 0.4 }}
                />
              );
            })}

            {currentPhase >= 0 && CARD_POSITIONS.map((cp, ci) => {
              const ap = getNodePosition(currentPhase);
              const ax = dims.w * ap.x;
              const ay = dims.h * ap.y;
              const cx = dims.w * cp.x;
              const cy = dims.h * cp.y;
              const op = getCardOpacity(ci);
              if (op <= 0) return null;
              return (
                <g key={`cl-${ci}`} style={{ opacity: op }}>
                  <line x1={ax} y1={ay} x2={cx} y2={cy} className="eco-pulse-line" />
                  <line x1={ax} y1={ay} x2={cx} y2={cy}
                    className={`eco-pulse-glow eco-pulse-glow--delay-${ci}`}
                    filter="url(#pulseGlow)"
                  />
                </g>
              );
            })}

            {currentPhase >= 0 && NODE_NAMES.map((_, i) => {
              if (i === currentPhase) return null;
              const ap = getNodePosition(currentPhase);
              const np = getNodePosition(i);
              return (
                <line key={`il-${i}`}
                  x1={dims.w * ap.x} y1={dims.h * ap.y}
                  x2={dims.w * np.x} y2={dims.h * np.y}
                  className="eco-pulse-line"
                  style={{ opacity: 0.25 }}
                />
              );
            })}
          </svg>

          {/* ─── Center ELCARDO node (overview only) ─── */}
          <div
            className="eco-node eco-node--center"
            style={{
              position: 'absolute',
              left: `calc(50% - 55px)`,
              top: `calc(50% - 70px)`,
              opacity: showCenter ? overviewOpacity : 0,
              transition: 'opacity 0.6s ease',
              pointerEvents: 'none',
            }}
          >
            <div className="eco-node__circle">
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '3px',
                color: '#041562',
              }}>ELCARDO</span>
            </div>
            <span className="eco-node__label" style={{ fontWeight: 700 }}>GROUP</span>
          </div>

          {/* ─── Company nodes ─── */}
          {NODE_NAMES.map((name, i) => {
            const pos = getNodePosition(i);
            const isActive = currentPhase === i;
            const isDimmed = currentPhase >= 0 && !isActive;

            return (
              <div
                key={`node-${i}`}
                className={`eco-node ${isActive ? 'eco-node--active' : ''} ${isDimmed ? 'eco-node--dimmed' : ''}`}
                style={{
                  position: 'absolute',
                  left: `calc(${pos.x * 100}% - 52px)`,
                  top: `calc(${pos.y * 100}% - 60px)`,
                  transition: 'left 2.2s cubic-bezier(0.16, 1, 0.3, 1), top 2.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease, filter 1.2s ease',
                }}
              >
                <div className="eco-node__circle">
                  {isActive && (
                    <svg className="eco-node__progress-ring" width="112" height="112"
                      style={{ opacity: ringProgress > 0.01 ? 1 : 0 }}
                    >
                      <circle className="eco-node__progress-track" cx="56" cy="56" r="52" />
                      <circle className="eco-node__progress-fill" cx="56" cy="56" r="52"
                        strokeDasharray={ringCircumference}
                        strokeDashoffset={ringCircumference * (1 - ringProgress)}
                        transform="rotate(-90 56 56)"
                      />
                    </svg>
                  )}
                  <span className="eco-node__icon">{companies[i]?.index || `0${i + 1}`}</span>
                </div>
                <span className="eco-node__label">{name}</span>
              </div>
            );
          })}

          {/* ─── Story cards ─── */}
          <div className="eco-story__cards-container">
            <AnimatePresence mode="popLayout">
              {currentPhase >= 0 && STORY_CARDS[currentPhase]?.map((card, ci) => {
                const op = getCardOpacity(ci);
                if (op <= 0.02) return null;
                const cp = CARD_POSITIONS[ci];
                const wb = WOBBLE_CONFIGS[ci];

                return (
                  <motion.div
                    key={`card-${currentPhase}-${ci}`}
                    className="eco-story-card"
                    style={{
                      left: `calc(${cp.x * 100}% - 100px)`,
                      top: `calc(${cp.y * 100}% - 75px)`,
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.92,
                      y: 24,
                      rotate: wb.rot,
                    }}
                    animate={{
                      opacity: op,
                      scale: op > 0.5 ? 1 : 0.96,
                      y: 0,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                      y: -12,
                    }}
                    transition={{
                      duration: 1.4,
                      ease: EASE,
                      delay: ci * 0.12,
                    }}
                  >
                    <div className="eco-story-card__inner">
                      <img src={card.img} alt={card.caption} className="eco-story-card__image" loading="lazy" />
                      <div className="eco-story-card__caption">{card.caption}</div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ─── Company info at bottom ─── */}
          <AnimatePresence mode="wait">
            {currentPhase >= 0 && companyInfoOpacity > 0.01 && (
              <motion.div
                key={`info-${currentPhase}`}
                className="eco-story__company-info"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: companyInfoOpacity, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <h3 className="eco-story__company-name">
                  {companies[currentPhase]?.name}
                </h3>
                <span className="eco-story__company-sector">
                  {companies[currentPhase]?.sector}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Phase indicator dots ─── */}
          <div className="eco-story__phase-indicator">
            <div className={`eco-story__phase-dot ${currentPhase < 0 ? 'eco-story__phase-dot--active' : ''}`} />
            {NODE_NAMES.map((_, i) => (
              <div key={`dot-${i}`}
                className={`eco-story__phase-dot ${currentPhase === i ? 'eco-story__phase-dot--active' : ''}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}
