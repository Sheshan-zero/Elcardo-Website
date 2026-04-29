import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import './RD_Mechanism.css';

const STAGES = [
  { threshold: 0, num: '01', title: 'Vertical Rolling Movement', desc: 'Interlocking slats travel vertically within precision guide rails.' },
  { threshold: 25, num: '02', title: 'Space-Saving Access', desc: 'No swing radius required — the door rises straight up.' },
  { threshold: 55, num: '03', title: 'Smooth Guided Operation', desc: 'Anti-friction inserts eliminate lateral play for silent motion.' },
  { threshold: 80, num: '04', title: 'Motor-Ready System', desc: 'Tubular motor mounting with soft start/stop capability.' },
];

const RD_Mechanism = () => {
  const containerRef = useRef(null);
  const [openPercent, setOpenPercent] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progress = useTransform(scrollYProgress, [0.05, 0.85], [0, 100]);

  useMotionValueEvent(progress, 'change', (v) => {
    const clamped = Math.round(Math.min(100, Math.max(0, v)));
    setOpenPercent(clamped);

    let stage = 0;
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (clamped >= STAGES[i].threshold) { stage = i; break; }
    }
    setActiveStage(stage);
  });

  const isMidpoint = openPercent > 30 && openPercent < 70;
  const shadowOpacity = 1 - (openPercent / 100) * 0.7;

  return (
    <section className="rdm" ref={containerRef} id="rd-mechanism">
      <div className="rdm-sticky">
        {/* Header */}
        <div className="rdm-header">
          <span className="rd-label" style={{ justifyContent: 'center' }}>Precision Engineering</span>
          <h2 className="rd-heading" style={{ textAlign: 'center' }}>How it works.</h2>
        </div>

        {/* Main visual area */}
        <div className="rdm-visual">
          {/* Door animation */}
          <div className="rdm-door-frame">
            <div className="rdm-drum">
              <div className="rdm-drum-inner">
                <div className="rdm-coil" style={{ transform: `scale(${1 + openPercent / 150})` }} />
              </div>
            </div>

            <div className="rdm-rail rdm-rail--left" />
            <div className="rdm-rail rdm-rail--right" />

            <div
              className={`rdm-curtain ${isMidpoint ? 'rdm-blur' : ''}`}
              style={{ transform: `translateY(-${openPercent}%)` }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="rdm-slat" />
              ))}
            </div>

            <div className="rdm-bottom-bar" style={{ opacity: openPercent < 5 ? 1 : 0 }} />
            <div className="rdm-shadow" style={{ opacity: shadowOpacity }} />
            <div className="rdm-floor" />
          </div>

          {/* Stage callouts */}
          <div className="rdm-callouts">
            {STAGES.map((stage, i) => (
              <div key={i} className={`rdm-callout ${activeStage === i ? 'active' : ''}`}>
                <span className="rdm-callout-num">{stage.num}</span>
                <div>
                  <div className="rdm-callout-rule" />
                  <h4 className="rdm-callout-title">{stage.title}</h4>
                  <p className="rdm-callout-desc">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="rdm-progress">
          <div className="rdm-progress-track">
            <div className="rdm-progress-fill" style={{ width: `${openPercent}%` }} />
          </div>
          <span className="rdm-progress-label">{openPercent}% Open</span>
        </div>
      </div>
    </section>
  );
};

export default RD_Mechanism;
