import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DISTRICTS } from './districtPaths';
import { branches } from './sriLankaPath';

const ease = [0.16, 1, 0.3, 1];
const basePath = import.meta.env.BASE_URL || '/';

/* Build reverse lookup: district id → branch */
const DISTRICT_BRANCH_MAP = {};
branches.forEach(b => { if (b.district) DISTRICT_BRANCH_MAP[b.district] = b.id; });

export default function ContactMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [activeBranch, setActiveBranch] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  // Click outside to dismiss
  useEffect(() => {
    if (!activeBranch) return;
    const handler = (e) => {
      if (e.target.closest('.cm-detail-card') || e.target.closest('.cm-district') || e.target.closest('.cm-pin')) return;
      setActiveBranch(null);
      setHoveredDistrict(null);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [activeBranch]);

  const handleDistrictEnter = useCallback((d) => {
    setHoveredDistrict(d.id);
    const branchId = DISTRICT_BRANCH_MAP[d.id];
    if (branchId) {
      const branch = branches.find(b => b.id === branchId);
      if (branch) setActiveBranch(branch);
    }
  }, []);

  const handleDistrictLeave = useCallback(() => {
    if (!activeBranch) setHoveredDistrict(null);
  }, [activeBranch]);

  const handlePinClick = useCallback((branch) => {
    setActiveBranch(branch);
    setHoveredDistrict(branch.district);
  }, []);

  const branchDistricts = Object.keys(DISTRICT_BRANCH_MAP);

  return (
    <section className="cm-section" id="contact-map" ref={ref}>
      <div className="cm-three-col">

        {/* LEFT — Detail card */}
        <motion.div
          className="cm-col-left"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease }}
        >
          <p className="cm-kicker">Our Network</p>
          <h2 className="cm-title">
            FIND US<br />
            <span className="cm-title-accent">ACROSS SRI LANKA</span>
          </h2>

          <p className="cm-description">
            With <strong>12 strategically located branches</strong> spanning all nine provinces, 
            Elcardo Industries ensures expert consultation, product availability, and 
            after-sales support are never far from reach.
          </p>

          <AnimatePresence mode="wait">
            {activeBranch ? (
              <motion.div
                key={activeBranch.id}
                className="cm-detail-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="cm-dc-img">
                  <img src={`${basePath}images/branch-building.png`} alt={activeBranch.city} loading="lazy" decoding="async" />
                  <div className="cm-dc-img-fade" />
                </div>
                <div className="cm-dc-body">
                  <div className="cm-dc-top">
                    <h3 className="cm-dc-city">{activeBranch.city}</h3>
                    {activeBranch.isHQ && <span className="cm-dc-hq">HEADQUARTERS</span>}
                  </div>
                  <p className="cm-dc-region">{activeBranch.region}</p>
                  <p className="cm-dc-address">{activeBranch.address}</p>
                  <div className="cm-dc-contact">
                    <a href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`}>{activeBranch.phone}</a>
                    <a href={`mailto:${activeBranch.email}`}>{activeBranch.email}</a>
                  </div>
                  <div className="cm-dc-actions">
                    <a href={activeBranch.mapUrl} target="_blank" rel="noopener noreferrer" className="cm-dc-btn cm-dc-btn-dir">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      Get Directions
                    </a>
                    <a href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`} className="cm-dc-btn cm-dc-btn-call">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                      Call Us
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                className="cm-detail-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="cm-dp-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <p className="cm-dp-text">Hover over a location pin<br/>or select a branch to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CENTER — Map with city labels */}
        <motion.div
          className="cm-col-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          <svg viewBox="-50 -80 1100 1900" className="cm-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="cm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8fb5cc" />
                <stop offset="50%" stopColor="#7da8c0" />
                <stop offset="100%" stopColor="#6d9ab5" />
              </linearGradient>
              <linearGradient id="cm-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5a92ad" />
                <stop offset="100%" stopColor="#4a849f" />
              </linearGradient>
              <linearGradient id="cm-grad-branch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7baabf" />
                <stop offset="100%" stopColor="#6a9db4" />
              </linearGradient>
              <filter id="cm-lift" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="rgba(218,18,18,0.22)" />
              </filter>
              <filter id="cm-ambient" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="8" stdDeviation="20" floodColor="rgba(4,21,98,0.12)" />
              </filter>
            </defs>

            {/* Districts */}
            <g filter="url(#cm-ambient)">
              {DISTRICTS.map((d) => {
                const isBranch = branchDistricts.includes(d.id);
                const isHovered = hoveredDistrict === d.id;
                return (
                  <path
                    key={d.id}
                    d={d.path}
                    className={`cm-district ${isBranch ? 'has-branch' : ''} ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => handleDistrictEnter(d)}
                    onMouseLeave={handleDistrictLeave}
                    filter={isHovered ? 'url(#cm-lift)' : undefined}
                  />
                );
              })}
            </g>

            {/* Pin markers + City labels */}
            {branches.map((b) => {
              const isActive = activeBranch?.id === b.id;
              // Label placement: offset to the side so it doesn't overlap the pin
              const labelX = b.coords.x > 500 ? b.coords.x + 28 : b.coords.x - 28;
              const labelAnchor = b.coords.x > 500 ? 'start' : 'end';
              return (
                <g
                  key={b.id}
                  className={`cm-pin ${isActive ? 'active' : ''}`}
                  onClick={() => handlePinClick(b)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Pin shape */}
                  <path
                    d={`M ${b.coords.x} ${b.coords.y}
                        c 0,0 -14,-14 -14,-24
                        a 14,14 0 1,1 28,0
                        c 0,10 -14,24 -14,24 z`}
                    className="cm-pin-shape"
                  />
                  <circle cx={b.coords.x} cy={b.coords.y - 24} r="5" className="cm-pin-inner" />

                  {/* City label on map */}
                  <text
                    x={labelX}
                    y={b.coords.y - 18}
                    className="cm-pin-label"
                    textAnchor={labelAnchor}
                  >
                    {b.shortName.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* RIGHT — Branch list */}
        <motion.div
          className="cm-col-right"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          <div className="cm-branch-list-head">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>All Branches</span>
          </div>
          <div className="cm-branch-mini-list">
            {branches.map((b) => (
              <div
                key={b.id}
                className={`cm-mini-item ${activeBranch?.id === b.id ? 'active' : ''}`}
                onMouseEnter={() => { setActiveBranch(b); setHoveredDistrict(b.district); }}
                onClick={() => handlePinClick(b)}
              >
                <span className="cm-mini-dot" />
                <span className="cm-mini-name">{b.city}</span>
                {b.isHQ && <span className="cm-mini-hq">HQ</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        className="cm-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5, ease }}
      >
        <div className="cm-stat"><div className="cm-stat-num">12</div><div className="cm-stat-label">Island-wide Branches</div></div>
        <div className="cm-stat-div" />
        <div className="cm-stat"><div className="cm-stat-num">35+</div><div className="cm-stat-label">Years of Excellence</div></div>
        <div className="cm-stat-div" />
        <div className="cm-stat"><div className="cm-stat-num">25</div><div className="cm-stat-label">Districts Covered</div></div>
        <div className="cm-stat-div" />
        <div className="cm-stat"><div className="cm-stat-num">9</div><div className="cm-stat-label">Provinces Served</div></div>
      </motion.div>
    </section>
  );
}
