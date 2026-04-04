import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SRI_LANKA_PATH, JAFFNA_PATH, branches } from './sriLankaPath';

const ease = [0.16, 1, 0.3, 1];

// Compass SVG Component
const CompassRose = () => (
  <svg viewBox="0 0 100 100" className="premium-compass">
    {/* Outer rings */}
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" />
    
    {/* Star points (N, S, E, W) */}
    <path d="M50 12 L55 38 L88 50 L55 62 L50 88 L45 62 L12 50 L45 38 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
    {/* Inner colored star */}
    <path d="M50 12 L55 38 L50 50 Z" fill="currentColor" opacity="0.3" />
    <path d="M88 50 L55 62 L50 50 Z" fill="currentColor" opacity="0.1" />
    <path d="M50 88 L45 62 L50 50 Z" fill="currentColor" opacity="0.3" />
    <path d="M12 50 L45 38 L50 50 Z" fill="currentColor" opacity="0.1" />

    {/* Center circle */}
    <circle cx="50" cy="50" r="6" fill="var(--premium-map-bg, #EEF4F6)" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />

    {/* Labels */}
    <text x="50" y="8" fontSize="8" textAnchor="middle" fill="currentColor" fontWeight="500">N</text>
    <text x="50" y="98" fontSize="8" textAnchor="middle" fill="currentColor" fontWeight="500">S</text>
    <text x="96" y="53" fontSize="8" textAnchor="middle" fill="currentColor" fontWeight="500">E</text>
    <text x="4" y="53" fontSize="8" textAnchor="middle" fill="currentColor" fontWeight="500">W</text>
  </svg>
);


export default function ContactMap() {
  const [activeBranch, setActiveBranch] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="premium-map-section" id="contact-map" ref={ref}>
      <div className="premium-map-container">
        
        {/* LEFT COLUMN: Text and List */}
        <motion.div 
          className="premium-map-content"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease }}
        >
          <h2 className="premium-map-headline">
            Sri Lanka’s Premier<br />
            Industrial Network
          </h2>
          <p className="premium-map-description">
            Elcardo sets a new benchmark for industrial manufacturing in Sri Lanka, 
            a modern network that blends precision engineering, vibrant innovation, 
            and contemporary solutions with nationwide reach—anchored by our headquarters 
            in Peliyagoda—creating a refined standard for all structural needs.
          </p>

          <div className="premium-map-list">
            {branches.map((branch, i) => (
              <motion.div 
                key={branch.id}
                className="premium-map-list-item"
                onMouseEnter={() => setActiveBranch(branch.id)}
                onMouseLeave={() => setActiveBranch(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
              >
                <div className="premium-map-list-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className={`premium-map-list-text ${activeBranch === branch.id ? 'active' : ''}`}>
                  {branch.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: The Map */}
        <motion.div 
          className="premium-map-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        >
          <div className="premium-map-visual-inner">
            <svg viewBox="0 0 400 450" className="premium-svg-map">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <g transform="translate(100, 20)">
                {/* Contour Layers (Bathymetry simulation) */}
                <path d={SRI_LANKA_PATH} className="map-contour contour-1" transform="scale(1.15) translate(-15, -10)" />
                <path d={SRI_LANKA_PATH} className="map-contour contour-2" transform="scale(1.08) translate(-8, -4)" />
                <path d={SRI_LANKA_PATH} className="map-contour contour-3" transform="scale(1.04) translate(-4, -2)" />
                
                {/* Main Island */}
                <path d={SRI_LANKA_PATH} className="map-island-body" />
                <path d={JAFFNA_PATH} className="map-island-body" />

                {/* Inner detail lines */}
                <path d={SRI_LANKA_PATH} className="map-island-inner" transform="scale(0.96) translate(4, 4)" />
                <path d={SRI_LANKA_PATH} className="map-island-inner" transform="scale(0.92) translate(8, 8)" />

                {/* Branches */}
                {branches.map(branch => {
                  const cx = branch.coords.x * 2;
                  const cy = branch.coords.y * 4;
                  const isActive = activeBranch === branch.id;
                  
                  // Label coordinates outside the island
                  // Calculate dynamic offsets based on position
                  const labelX = cx > 100 ? cx + 60 : cx - 60;
                  const labelY = cy < 100 ? cy - 20 : cy + 10;

                  return (
                    <g key={branch.id} 
                       className={`map-poi ${isActive ? 'active' : ''} ${activeBranch && !isActive ? 'dimmed' : ''}`}
                       onMouseEnter={() => setActiveBranch(branch.id)}
                       onMouseLeave={() => setActiveBranch(null)}
                       style={{ cursor: 'pointer' }}
                    >
                      {/* Connection Line */}
                      <path 
                        className="map-poi-line" 
                        d={`M ${cx} ${cy} Q ${cx} ${labelY} ${labelX} ${labelY}`}
                      />

                      {/* Map Marker Circle */}
                      <circle cx={cx} cy={cy} r="12" className="map-poi-circle" />
                      <circle cx={cx} cy={cy} r="16" className="map-poi-ring" />
                      
                      {/* Inner Icon */}
                      <svg x={cx - 6} y={cy - 6} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>

                      {/* Label Text */}
                      <text 
                        x={labelX + (cx > 100 ? 5 : -5)} 
                        y={labelY + 3} 
                        className="map-poi-label"
                        textAnchor={cx > 100 ? "start" : "end"}
                      >
                        {branch.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </g>

            </svg>

            <div className="premium-compass-wrapper">
              <CompassRose />
              <div className="premium-compass-label">
                ELCARDO SRI LANKA<br/>
                <span>EST 1985</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM STRIP: Stats */}
      <motion.div 
        className="premium-map-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.6, ease }}
      >
        <div className="premium-stat-item">
          <div className="premium-stat-number">6+</div>
          <div className="premium-stat-label">Island-wide Branches</div>
        </div>
        <div className="premium-stat-divider" />
        <div className="premium-stat-item">
          <div className="premium-stat-number">35+</div>
          <div className="premium-stat-label">Years of Excellence</div>
        </div>
        <div className="premium-stat-divider" />
        <div className="premium-stat-item">
          <div className="premium-stat-number">5-Star</div>
          <div className="premium-stat-label">Trusted Service</div>
        </div>
      </motion.div>
    </section>
  );
}
