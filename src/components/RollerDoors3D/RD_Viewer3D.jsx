import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import LazyCanvas from '../RollerGates3D/LazyCanvas';
import RollerDoorModel from './RollerDoorModel';
import './RD_Viewer3D.css';

const ease = [0.16, 1, 0.3, 1];

const COLORS = [
  { id: 'white', name: 'Pure White', hex: '#F0EDE8', finish: 'metallic', roughness: 0.6, metalness: 0.1, label: 'Classic. Clean. Architectural.' },
  { id: 'charcoal', name: 'Charcoal Grey', hex: '#2D2D2D', finish: 'matte', roughness: 0.5, metalness: 0.3, label: 'Bold. Contemporary. Refined.' },
  { id: 'black', name: 'Matte Black', hex: '#1A1A1A', finish: 'matte', roughness: 0.4, metalness: 0.4, label: 'Statement-making presence.' },
  { id: 'silver', name: 'Metallic Silver', hex: '#C0C0C0', finish: 'metallic', roughness: 0.2, metalness: 0.9, label: 'Modern industrial elegance.' },
  { id: 'wood', name: 'Wood Oak', hex: '#8B6D4A', finish: 'wood', roughness: 0.8, metalness: 0.0, label: 'Natural warmth. Zero maintenance.' },
  { id: 'bronze', name: 'Dark Bronze', hex: '#5C4033', finish: 'metallic', roughness: 0.5, metalness: 0.6, label: 'Heritage character. Modern strength.' },
  { id: 'custom', name: 'Custom Color', hex: '#CC2929', finish: 'metallic', roughness: 0.4, metalness: 0.3, label: 'Match any architectural palette.' },
];

const RD_Viewer3D = () => {
  const [color, setColor] = useState(COLORS[0]);
  const [customHex, setCustomHex] = useState('#CC2929');
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

  const activeHex = color.id === 'custom' ? customHex : color.hex;

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
          Rotate, zoom, change the finish, and test the opening mechanism — all in real time.
        </p>
      </motion.div>

      <div className="rdv-body">
        {/* 3D Canvas */}
        <div className="rdv-canvas-wrap">
          <LazyCanvas className="rdv-canvas-lazy" style={{ width: '100%', height: '100%' }} lightBg>
            <Canvas
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              shadows
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <RollerDoorModel
                state="interactive"
                colorHex={activeHex}
                finish={color.finish}
                openProgress={isOpen ? 1 : 0}
              />
            </Canvas>
          </LazyCanvas>
          <div className="rdv-hint">Drag to rotate · Scroll to zoom</div>

          {/* Active finish name + tagline overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={color.id + activeHex}
              className="rdv-finish-label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <span className="rdv-finish-name">{color.name}</span>
              <span className="rdv-finish-tagline">{color.label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <motion.div
          className="rdv-controls"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <div>
            <h4 className="rdv-ctrl-label">Finish & Colour</h4>
            <div className="rdv-color-grid">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  className={`rdv-swatch ${color.id === c.id ? 'active' : ''}`}
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                >
                  <span
                    className="rdv-swatch-dot"
                    style={{ background: c.id === 'custom' ? customHex : c.hex }}
                  />
                  <span className="rdv-swatch-name">{c.name}</span>
                </button>
              ))}
            </div>
            {color.id === 'custom' && (
              <div className="rdv-color-picker">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <h4 className="rdv-ctrl-label">Operation</h4>
            <button
              className={`rdv-open-btn ${isOpen ? 'rdv-open-btn--close' : ''}`}
              onClick={handleToggle}
              disabled={animating}
            >
              {isOpen ? '↓ Close Door' : '↑ Test Opening'}
            </button>
          </div>

          <div>
            <button
              className="rdv-reset-btn"
              onClick={() => { setColor(COLORS[0]); setIsOpen(false); }}
            >
              Reset View
            </button>
          </div>

          <div className="rdv-active-finish">
            <span className="rdv-active-dot" style={{ background: activeHex }} />
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
