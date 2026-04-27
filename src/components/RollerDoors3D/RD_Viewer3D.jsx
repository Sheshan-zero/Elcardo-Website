import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import LazyCanvas from '../RollerGates3D/LazyCanvas';
import RollerDoorModel from './RollerDoorModel';
import './RD_Viewer3D.css';

const ease = [0.16, 1, 0.3, 1];

const COLORS = [
  { id: 'white', name: 'White', hex: '#f0f0f2', finish: 'metallic' },
  { id: 'silver', name: 'Metallic Silver', hex: '#C0C0C8', finish: 'metallic' },
  { id: 'charcoal', name: 'Charcoal', hex: '#3a3a42', finish: 'metallic' },
  { id: 'black', name: 'Matte Black', hex: '#1a1a1e', finish: 'matte' },
  { id: 'wood', name: 'Wood Look', hex: '#8B6D4A', finish: 'wood' },
  { id: 'custom', name: 'Custom Color', hex: '#DA1212', finish: 'metallic' },
];

const RD_Viewer3D = () => {
  const [color, setColor] = useState(COLORS[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const handleToggle = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setIsOpen((prev) => !prev);
    timeoutRef.current = setTimeout(() => setAnimating(false), 2200);
  }, [animating]);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <section className="rdv" id="rd-studio">
      <motion.div
        className="rdv-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label" style={{ justifyContent: 'center' }}>3D Product Studio</span>
        <h2 className="rd-heading" style={{ textAlign: 'center' }}>
          Explore every detail.
        </h2>
        <p className="rd-body-text" style={{ textAlign: 'center', margin: '0 auto' }}>
          Rotate, zoom, change the finish, and test the opening mechanism in real time.
        </p>
      </motion.div>

      <div className="rdv-body">
        {/* 3D Canvas */}
        <div className="rdv-canvas-wrap">
          <LazyCanvas className="rdv-canvas-lazy" style={{ width: '100%', height: '100%' }} lightBg>
            <Canvas
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <RollerDoorModel
                state="interactive"
                colorHex={color.hex}
                finish={color.finish}
                openProgress={isOpen ? 1 : 0}
              />
            </Canvas>
          </LazyCanvas>
          <div className="rdv-hint">Drag to rotate · Scroll to zoom</div>
        </div>

        {/* Controls */}
        <motion.div
          className="rdv-controls"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <div className="rdv-ctrl-group">
            <h4 className="rdv-ctrl-label">Finish</h4>
            <div className="rdv-color-grid">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  className={`rdv-swatch ${color.id === c.id ? 'active' : ''}`}
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                >
                  <span className="rdv-swatch-dot" style={{ background: c.hex }} />
                  <span className="rdv-swatch-name">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rdv-ctrl-group">
            <h4 className="rdv-ctrl-label">Operation</h4>
            <button
              className={`rdv-open-btn ${isOpen ? 'rdv-open-btn--close' : ''}`}
              onClick={handleToggle}
              disabled={animating}
            >
              {isOpen ? '↓ Close Door' : '↑ Test Opening'}
            </button>
          </div>

          <div className="rdv-active-finish">
            <span className="rdv-active-dot" style={{ background: color.hex }} />
            <span>
              Selected: <strong>{color.name}</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RD_Viewer3D;
