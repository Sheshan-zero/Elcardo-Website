import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import LazyCanvas from '../RollerGates3D/LazyCanvas';
import RollerDoorModel from './RollerDoorModel';
import './RD_Hero.css';

const ease = [0.16, 1, 0.3, 1];

const RD_Hero = () => {
  return (
    <section className="rdh" id="rd-overview">
      {/* Left content */}
      <div className="rdh-content">
        <motion.div
          className="rdh-badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <span className="rdh-badge-dot" />
          <span>Elcardo · Roller Doors</span>
        </motion.div>

        <motion.h1
          className="rdh-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
        >
          Roller<br />Doors
        </motion.h1>

        <motion.p
          className="rdh-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
        >
          Secure access. Smooth motion.<br />
          Built for modern spaces.
        </motion.p>

        <motion.div
          className="rdh-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          <Link to="/contact" className="rd-btn-primary" data-cursor="expand">
            Get a Quote
          </Link>
          <a href="#rd-studio" className="rd-btn-secondary" data-cursor="expand">
            Download Brochure
          </a>
        </motion.div>

        <motion.div
          className="rdh-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="rdh-scroll-line" />
          <span>Scroll to explore</span>
        </motion.div>
      </div>

      {/* Right 3D canvas */}
      <div className="rdh-canvas-wrap">
        <LazyCanvas className="rdh-canvas-lazy" style={{ width: '100%', height: '100%' }} lightBg>
          <Canvas
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            shadows
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
          >
            <RollerDoorModel
              state="hero"
              colorHex="#E8E4DE"
              finish="metallic"
              openProgress={0}
            />
          </Canvas>
        </LazyCanvas>
      </div>
    </section>
  );
};

export default RD_Hero;
