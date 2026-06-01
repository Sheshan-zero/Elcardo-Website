import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companies } from '../../data/companiesData';
import './StickyCompanyStory.css';

/* ─── Premium editorial copy per company ─── */
const COMPANY_STORIES = [
  {
    headline: 'Elcardo\nIndustries.',
    descriptor: 'ISO-certified roller doors, shutters, and gates with Australian technology.',
    kicker: 'Engineering',
  },
  {
    headline: 'Elcardo\nElsolar.',
    descriptor: 'Residential and commercial solar energy solutions.',
    kicker: 'Renewable Energy',
  },
  {
    headline: 'Elcardo\nElwood.',
    descriptor: 'WPC composite decking, flooring, and architectural timber alternatives.',
    kicker: 'Wood & Decking',
  },
  {
    headline: 'Elcardo\nSteel.',
    descriptor: 'SUS 202 and 304 polished stainless steel pipes, tubes, and fabrication.',
    kicker: 'Steel Products',
  },
  {
    headline: 'Elcardo\nTrading.',
    descriptor: 'Exclusive automobile accessories for luxury vehicles.',
    kicker: 'Automotive',
  },
  {
    headline: 'Kitchen &\nPantry.',
    descriptor: 'Customized pantry cupboards and stainless steel kitchen fixtures.',
    kicker: 'Interiors',
  },
  {
    headline: 'Anilad\nKandy.',
    descriptor: 'Comfortable accommodation in the hill capital of Kandy.',
    kicker: 'Hospitality',
  },
];

const EASE = [0.16, 1, 0.3, 1];
const SECTION_HEIGHT_VH = 500;

export default function StickyCompanyStory() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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
          setProgress(p);

          const count = companies.length;
          const idx = Math.min(Math.floor(p * count), count - 1);
          setActiveIndex(idx);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const company = companies[activeIndex];
  const story = COMPANY_STORIES[activeIndex];

  return (
    <section
      className="scs"
      ref={sectionRef}
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
      id="sticky-company-story"
    >
      <div className="scs__sticky">
        {/* Left — Text Panel */}
        <div className="scs__text-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeIndex}`}
              className="scs__text-inner"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span className="scs__kicker">
                <span className="scs__kicker-line" />
                {story.kicker}
              </span>
              <h2 className="scs__headline">
                {story.headline.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>
                    {i === 1 ? <em>{line}</em> : line}
                  </span>
                ))}
              </h2>
              <p className="scs__descriptor">{story.descriptor}</p>
              <div className="scs__company-tag">
                <span className="scs__company-index">{company.index}</span>
                <span className="scs__company-name">{company.name}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step indicator */}
          <div className="scs__steps">
            {companies.map((_, i) => (
              <div
                key={i}
                className={`scs__step ${i === activeIndex ? 'scs__step--active' : ''} ${i < activeIndex ? 'scs__step--done' : ''}`}
              >
                <span className="scs__step-dot" />
                {i === activeIndex && (
                  <span className="scs__step-label">{companies[i].name.split(' ').pop()}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image Panel */}
        <div className="scs__image-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${activeIndex}`}
              className="scs__image-container"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <img
                src={company.image}
                alt={company.name}
                className="scs__image"
                loading="lazy"
              />
              <div className="scs__image-overlay" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar at bottom */}
        <div className="scs__progress-track">
          <motion.div
            className="scs__progress-fill"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  );
}
