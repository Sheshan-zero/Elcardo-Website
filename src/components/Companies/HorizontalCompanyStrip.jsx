import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companies } from '../../data/companiesData';
import './HorizontalCompanyStrip.css';

const EASE = [0.16, 1, 0.3, 1];

const PANEL_DATA = [
  { descriptor: 'Access Systems', accent: 'Engineering' },
  { descriptor: 'Energy Solutions', accent: 'Solar' },
  { descriptor: 'Energy Infrastructure', accent: 'Battery' },
  { descriptor: 'Hospitality', accent: 'Experience' },
  { descriptor: 'Interiors', accent: 'Functional' },
  { descriptor: 'Automotive', accent: 'Performance' },
];

const SECTION_HEIGHT_VH = 400;

export default function HorizontalCompanyStrip() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inSection, setInSection] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) { ticking = false; return; }
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionH = sectionRef.current.scrollHeight;
          const viewH = window.innerHeight;
          const scrolled = -rect.top;
          const totalScrollable = sectionH - viewH;
          const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
          setScrollProgress(p);
          setInSection(rect.top < viewH && rect.bottom > 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const panelCount = companies.length;
  const panelWidthVW = 65;
  const totalTrackWidth = panelCount * panelWidthVW;
  const translateX = -(scrollProgress * (totalTrackWidth - 100));

  return (
    <section
      className="hcs"
      ref={sectionRef}
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      id="horizontal-company-strip"
    >
      <div className="hcs__sticky">
        {/* Section header */}
        <div className={`hcs__header ${inSection && scrollProgress > 0.02 ? 'hcs__header--visible' : ''}`}>
          <span className="hcs__kicker">
            <span className="hcs__kicker-line" />
            What We Do Across Industries
          </span>
        </div>

        {/* Horizontal track */}
        <div className="hcs__viewport">
          <div
            className="hcs__track"
            ref={trackRef}
            style={{
              width: `${totalTrackWidth}vw`,
              transform: `translateX(${translateX}vw)`,
            }}
          >
            {companies.map((co, i) => {
              const panelStart = i / panelCount;
              const panelEnd = (i + 1) / panelCount;
              const panelCenter = (panelStart + panelEnd) / 2;
              const distFromCenter = Math.abs(scrollProgress - panelCenter);
              const isActive = distFromCenter < (1 / panelCount / 1.8);
              const scale = isActive ? 1 : 0.94;
              const imgScale = 1 + Math.max(0, 0.08 - distFromCenter * 0.3);

              return (
                <div
                  className={`hcs__panel ${isActive ? 'hcs__panel--active' : ''}`}
                  key={co.id}
                  style={{
                    width: `${panelWidthVW}vw`,
                    transform: `scale(${scale})`,
                  }}
                >
                  <div className="hcs__panel-image-wrap">
                    <img
                      src={co.image}
                      alt={co.name}
                      className="hcs__panel-image"
                      style={{ transform: `scale(${imgScale})` }}
                      loading="lazy"
                    />
                    <div className="hcs__panel-image-overlay" />
                  </div>
                  <div className={`hcs__panel-content ${isActive ? 'hcs__panel-content--visible' : ''}`}>
                    <span className="hcs__panel-index">{co.index}</span>
                    <h3 className="hcs__panel-name">{co.name}</h3>
                    <div className="hcs__panel-divider" />
                    <span className="hcs__panel-descriptor">{PANEL_DATA[i].descriptor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom counter */}
        <div className="hcs__counter">
          <span className="hcs__counter-current">
            {String(Math.min(Math.floor(scrollProgress * panelCount) + 1, panelCount)).padStart(2, '0')}
          </span>
          <span className="hcs__counter-divider" />
          <span className="hcs__counter-total">
            {String(panelCount).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
