import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import LazyCanvas from '../RollerGates3D/LazyCanvas';
import RollerDoorModel from './RollerDoorModel';
import './RD_ColorStory.css';

const ease = [0.16, 1, 0.3, 1];

const FINISHES = [
  { id: 'white', name: 'Pure White', hex: '#f0f0f2', finish: 'metallic', label: 'Classic. Clean. Architectural.' },
  { id: 'silver', name: 'Metallic Silver', hex: '#C0C0C8', finish: 'metallic', label: 'Modern industrial elegance.' },
  { id: 'charcoal', name: 'Charcoal Grey', hex: '#3a3a42', finish: 'metallic', label: 'Bold. Contemporary. Refined.' },
  { id: 'black', name: 'Matte Black', hex: '#1a1a1e', finish: 'matte', label: 'Statement-making presence.' },
  { id: 'wood', name: 'Wood Oak', hex: '#8B6D4A', finish: 'wood', label: 'Natural warmth. Zero maintenance.' },
  { id: 'bronze', name: 'Dark Bronze', hex: '#5C4033', finish: 'metallic', label: 'Heritage character. Modern strength.' },
];

const RD_ColorStory = () => {
  const [active, setActive] = useState(FINISHES[0]);

  return (
    <section className="rdc">
      <motion.div className="rdc-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1, ease }}>
        <span className="rd-label" style={{ justifyContent: 'center' }}>Color & Finish</span>
        <h2 className="rd-heading" style={{ textAlign: 'center' }}>
          Choose the finish that fits your space.
        </h2>
      </motion.div>

      <div className="rdc-body">
        {/* 3D preview */}
        <div className="rdc-preview">
          <LazyCanvas className="rdc-canvas" style={{ width: '100%', height: '100%' }}>
            <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} style={{ background: 'transparent' }}>
              <RollerDoorModel state="color" colorHex={active.hex} finish={active.finish} openProgress={0} />
            </Canvas>
          </LazyCanvas>
        </div>

        {/* Label */}
        <AnimatePresence mode="wait">
          <motion.div key={active.id} className="rdc-finish-label"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: .35 }}>
            <h3 className="rdc-finish-name">{active.name}</h3>
            <p className="rdc-finish-tagline">{active.label}</p>
          </motion.div>
        </AnimatePresence>

        {/* Swatches */}
        <div className="rdc-swatches">
          {FINISHES.map((f) => (
            <button key={f.id}
              className={`rdc-swatch ${active.id === f.id ? 'active' : ''}`}
              onClick={() => setActive(f)} aria-label={f.name}>
              <span className="rdc-swatch-color" style={{ background: f.hex }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default RD_ColorStory;
