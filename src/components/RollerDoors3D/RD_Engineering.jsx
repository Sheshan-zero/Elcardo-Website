import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import crosssectionImg from '../../assets/rd_crosssection.png';
import motorImg from '../../assets/rd_motor_exploded.png';
import './RD_Engineering.css';

const ease = [0.16, 1, 0.3, 1];

const COMPONENTS = [
  { id: 'motor', name: 'Motor System', spec: 'Tubular motor with 120Nm torque, IP65 rated. Soft start/stop for 50,000+ cycle reliability.', position: { top: '18%', left: '25%' } },
  { id: 'drum', name: 'Rolling Drum', spec: 'Hot-dip galvanized steel housing with bearing-mounted shaft for smooth curtain winding.', position: { top: '14%', left: '55%' } },
  { id: 'rails', name: 'Guide Rails', spec: 'Precision-extruded aluminum channels with anti-friction nylon inserts for silent operation.', position: { top: '52%', left: '12%' } },
  { id: 'slats', name: 'Curtain Slats', spec: '0.5mm double-walled galvanized steel with interlocking profile for wind resistance.', position: { top: '48%', left: '78%' } },
  { id: 'sensor', name: 'Safety Sensor Ready', spec: 'Pre-wired mounting points for infrared safety beams — automatic stop on obstruction.', position: { top: '82%', left: '20%' } },
  { id: 'override', name: 'Manual Override', spec: 'Chain-driven manual release system accessible from inside for emergency operation.', position: { top: '78%', left: '70%' } },
];

const MOTOR_FEATURES = [
  { icon: '📡', title: 'Remote Operation', desc: '433MHz RF remote with up to 30m range.' },
  { icon: '🔇', title: 'Quiet Movement', desc: 'Under 55dB — suitable for residential use.' },
  { icon: '🛡️', title: 'Safety Sensors', desc: 'Infrared beam detection stops door on obstruction.' },
  { icon: '🔧', title: 'Manual Override', desc: 'Chain release for emergency manual operation.' },
  { icon: '⚡', title: 'Built for Daily Use', desc: 'Rated 50,000+ open/close cycles.' },
];

const MOTOR_SPECS = [
  { label: 'Output Torque', value: '120 Nm' },
  { label: 'Speed', value: '24 RPM' },
  { label: 'Protection', value: 'IP65' },
  { label: 'Cycles', value: '50,000+' },
  { label: 'Response', value: '0.15s' },
  { label: 'Control', value: '433MHz RF' },
];

const RD_Engineering = () => {
  const [activeComp, setActiveComp] = useState(null);
  const [view, setView] = useState('structure');

  return (
    <section className="rd-eng" id="rd-interior">
      <div className="rd-eng-inner">
        {/* Header */}
        <motion.div className="rd-eng-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, ease }}>
          <span className="rd-label" style={{ justifyContent: 'center' }}>Internal Engineering</span>
          <h2 className="rd-heading" style={{ textAlign: 'center' }}>See how every component works.</h2>
          <p className="rd-body-text" style={{ textAlign: 'center', margin: '0 auto' }}>
            Industrial-grade components designed for high-cycle durability and zero-compromise security.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="rd-eng-toggle">
          <button className={`rd-eng-toggle-btn ${view === 'structure' ? 'active' : ''}`}
            onClick={() => { setView('structure'); setActiveComp(null); }}>
            Structure
          </button>
          <button className={`rd-eng-toggle-btn ${view === 'motor' ? 'active' : ''}`}
            onClick={() => { setView('motor'); setActiveComp(null); }}>
            Motor &amp; Automation
          </button>
        </div>

        {/* Content */}
        <div className="rd-eng-body">
          <AnimatePresence mode="wait">
            {view === 'structure' ? (
              <motion.div key="structure" className="rd-eng-structure"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>
                
                <div className="rd-eng-image-area">
                  <div className="rd-eng-image-wrap">
                    <img src={crosssectionImg} alt="Roller door cross-section" className="rd-eng-photo" />
                    {COMPONENTS.map((comp) => (
                      <button key={comp.id}
                        className={`rd-eng-hotspot ${activeComp?.id === comp.id ? 'active' : ''}`}
                        style={{ top: comp.position.top, left: comp.position.left }}
                        onClick={() => setActiveComp(activeComp?.id === comp.id ? null : comp)}>
                        <span className="rd-eng-hotspot-ring" />
                        <span className="rd-eng-hotspot-dot" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rd-eng-detail">
                  <AnimatePresence mode="wait">
                    {activeComp ? (
                      <motion.div key={activeComp.id} className="rd-eng-detail-card"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease }}>
                        <h4 className="rd-eng-detail-title">{activeComp.name}</h4>
                        <p className="rd-eng-detail-spec">{activeComp.spec}</p>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" className="rd-eng-detail-empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                        </svg>
                        <p>Tap a hotspot to inspect</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="rd-eng-comp-list">
                    {COMPONENTS.map((comp) => (
                      <button key={comp.id}
                        className={`rd-eng-comp-item ${activeComp?.id === comp.id ? 'active' : ''}`}
                        onClick={() => setActiveComp(activeComp?.id === comp.id ? null : comp)}>
                        <span className="rd-eng-comp-dot" />
                        {comp.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="motor" className="rd-eng-motor"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>

                <div className="rd-eng-motor-image">
                  <img src={motorImg} alt="Tubular motor exploded view" />
                </div>

                <div className="rd-eng-motor-info">
                  <h3 className="rd-eng-motor-title">Effortless Control</h3>
                  <p className="rd-eng-motor-desc">
                    Precision-engineered tubular motor with intelligent electronic controls,
                    emergency brake system, and RF remote capability.
                  </p>

                  <div className="rd-eng-motor-features">
                    {MOTOR_FEATURES.map((feat) => (
                      <div key={feat.title} className="rd-eng-motor-feat">
                        <span className="rd-eng-motor-feat-icon">{feat.icon}</span>
                        <div>
                          <h5 className="rd-eng-motor-feat-title">{feat.title}</h5>
                          <p className="rd-eng-motor-feat-desc">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rd-eng-motor-grid">
                    {MOTOR_SPECS.map((spec) => (
                      <div key={spec.label} className="rd-eng-motor-spec">
                        <span className="rd-eng-motor-spec-value">{spec.value}</span>
                        <span className="rd-eng-motor-spec-label">{spec.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RD_Engineering;
