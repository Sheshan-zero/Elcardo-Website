import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, defaultViewport } from '../../utils/motionVariantsNew';
import { companies } from '../../data/companiesData';
import './CompanySelector.css';

/* ─── Buttery smooth panel crossfade ─── */
const smoothPanel = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 1, 0.5, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.02, 
    transition: { 
      duration: 0.4, 
      ease: [0.25, 1, 0.5, 1] 
    } 
  }
};

export default function CompanySelector() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = companies[activeIdx];

  return (
    <section className="cp-selector">
      <div className="cp-selector__header">
        <motion.h2 
          className="display-lg text-on-dark text-center"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          Explore by Sector
        </motion.h2>
      </div>

      <div className="cp-selector__container">
        {/* Tab List */}
        <div className="cp-selector__tabs">
          {companies.map((company, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={company.id}
                className={`cp-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                {isActive && (
                  <motion.div
                    layoutId="selector-highlight"
                    className="cp-tab__bg"
                    initial={false}
                    transition={{ 
                      type: "tween", 
                      duration: 0.5, 
                      ease: [0.25, 1, 0.5, 1] 
                    }}
                    style={{ borderLeftColor: company.theme.accent }}
                  />
                )}
                <span className="cp-tab__name">{company.name}</span>
                <span className="cp-tab__sector">{company.sector}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="cp-selector__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="cp-selector__panel"
              variants={smoothPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div 
                className="cp-selector__accent-bar" 
                style={{ backgroundColor: active.theme.accent }} 
              />
              
              <div className="cp-selector__panel-text">
                <h3 className="display-md text-on-dark">
                  {active.name}
                </h3>
                <p className="body-md text-muted">
                  {active.description}
                </p>
                <a 
                  href={active.ctaLink} 
                  className="cp-selector__link" 
                  style={{ color: active.theme.accent }}
                >
                  Learn More <span>&rarr;</span>
                </a>
              </div>
              
              <div className="cp-selector__panel-image">
                <img src={active.image} alt={active.name} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
