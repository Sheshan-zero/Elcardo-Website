import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const WireBox = ({ size, color, delay = 0, duration = 15, reverse = false }) => (
  <motion.div 
    style={{ 
      position: 'absolute', width: size, height: size, top: (64-size)/2, left: (64-size)/2, transformStyle: 'preserve-3d' 
    }}
    animate={{ 
      rotateX: reverse ? [360, 0] : [0, 360], 
      rotateY: reverse ? [360, 0] : [0, 360],
      rotateZ: reverse ? [360, 0] : [0, 360]
    }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
  >
    {[
      { transform: `translateZ(${size/2}px)` },
      { transform: `translateZ(-${size/2}px)` },
      { transform: `rotateY(90deg) translateZ(${size/2}px)` },
      { transform: `rotateY(90deg) translateZ(-${size/2}px)` },
      { transform: `rotateX(90deg) translateZ(${size/2}px)` },
      { transform: `rotateX(90deg) translateZ(-${size/2}px)` },
    ].map((style, i) => (
      <div key={i} style={{ 
        position: 'absolute', width: '100%', height: '100%', border: `0.5px solid ${color}`, ...style 
      }} />
    ))}
  </motion.div>
);

const PrecisionIcon = () => (
  <div style={{ width: 64, height: 64, perspective: 600, position: 'relative', transformStyle: 'preserve-3d' }}>
    {/* Outer Calibration Ring */}
    <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#B0B0B0" strokeWidth="1"
      style={{ position: 'absolute' }} animate={{ rotateZ: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
      <circle cx="32" cy="32" r="28" strokeDasharray="2 4" strokeWidth="1" />
      <circle cx="32" cy="32" r="24" strokeWidth="0.5" />
    </motion.svg>
    {/* Inner Target */}
    <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#8A8F98" strokeWidth="1"
      style={{ position: 'absolute' }} animate={{ rotateZ: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>
      <path d="M32 8L32 20M32 44L32 56M8 32L20 32M44 32L56 32" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="12" />
    </motion.svg>
    {/* Center Core */}
    <motion.div style={{ position: 'absolute', width: 14, height: 14, border: '1px solid #A0A0A0', top: 25, left: 25, transformStyle: 'preserve-3d' }} 
       animate={{ rotateX: 360, rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
  </div>
);

const InnovationIcon = () => (
  <div style={{ width: 64, height: 64, perspective: 600, position: 'relative', transformStyle: 'preserve-3d' }}>
    <WireBox size={36} color="#8A8F98" duration={25} />
    <WireBox size={16} color="#B0B0B0" duration={12} reverse />
  </div>
);

const TrustIcon = () => (
  <div style={{ width: 64, height: 64, perspective: 800, position: 'relative', transformStyle: 'preserve-3d' }}>
    <motion.div 
      style={{ width: '100%', height: '100%', position: 'absolute', transformStyle: 'preserve-3d' }}
      animate={{ rotateY: [0, 360], rotateX: [15, -15, 15] }} 
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
    >
       {/* Left Link (XY Plane) */}
       <div style={{ position: 'absolute', width: 32, height: 44, border: '1.5px solid #8A8F98', borderRadius: '16px', top: 10, left: 10 }} />
       {/* Right Link (XZ Plane) directly overlapping */}
       <div style={{ position: 'absolute', width: 32, height: 44, border: '1.5px solid #A0A0A0', borderRadius: '16px', top: 10, left: 22, transform: 'rotateX(90deg)' }} />
    </motion.div>
  </div>
);

const introBlocks = [
  {
    title: 'Precision',
    number: 'A01',
    text: 'Every product we build is engineered to exacting standards — from mechanism to finish.',
    icon: <PrecisionIcon />
  },
  {
    title: 'Innovation',
    number: 'A02',
    text: 'We don\'t follow industries. We build them — finding opportunity where others see limitation.',
    icon: <InnovationIcon />
  },
  {
    title: 'Trust',
    number: 'A03',
    text: 'Over a decade of delivery. Clients across Sri Lanka rely on us because we honour every commitment.',
    icon: <TrustIcon />
  },
];

export default function AboutIntro() {
  return (
    <section className="about-intro-re" id="about-intro">
      <div className="about-intro-re-inner">
        <div className="about-intro-re-header">
          <motion.p
            className="about-kicker"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            Who We Are
          </motion.p>
          <motion.h2
            className="about-title-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            We started with one idea —<br/>to engineer what others couldn't.<br/>
            Today, we power industries.
          </motion.h2>
        </div>

        <div className="about-intro-re-grid">
          {introBlocks.map((block, i) => (
            <motion.div
              key={block.title}
              className="about-intro-re-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease }}
            >
              <div className="about-intro-re-card-top">
                <h3>{block.title}</h3>
                <span className="about-intro-re-num">{block.number}</span>
              </div>
              <div className="about-intro-re-line" />
              <p className="about-intro-re-text">{block.text}</p>
              <div className="about-intro-re-icon">
                {block.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
