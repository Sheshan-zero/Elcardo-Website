import React from 'react';
import { motion } from 'framer-motion';
import './Materials3D.css';

/* ─── 01 / Steel Crystal Lattice ─────────────────────────────
   A true 3D cube with visible faces, edges, and floating atom nodes
   ──────────────────────────────────────────────────────────── */
export const LatticeGridSVG = () => (
  <div className="mat3d-scene">
    <motion.div
      className="mat3d-rotator"
      animate={{ rotateY: [0, 360], rotateX: [-20, -25, -20] }}
      transition={{
        rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
        rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {/* Outer wireframe cube */}
      <div className="steel-cube">
        <div className="steel-face steel-front" />
        <div className="steel-face steel-back" />
        <div className="steel-face steel-left" />
        <div className="steel-face steel-right" />
        <div className="steel-face steel-top" />
        <div className="steel-face steel-bottom" />

        {/* Inner cube */}
        <div className="steel-inner-cube">
          <div className="steel-face steel-inner-front" />
          <div className="steel-face steel-inner-back" />
          <div className="steel-face steel-inner-left" />
          <div className="steel-face steel-inner-right" />
          <div className="steel-face steel-inner-top" />
          <div className="steel-face steel-inner-bottom" />
        </div>

        {/* Corner Atom nodes */}
        {[
          [-60, -60, 60], [60, -60, 60], [60, 60, 60], [-60, 60, 60],
          [-60, -60, -60], [60, -60, -60], [60, 60, -60], [-60, 60, -60],
        ].map(([x, y, z], i) => (
          <div
            key={i}
            className="steel-node"
            style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
          />
        ))}
        {/* Center atom */}
        <div className="steel-node steel-node-center" style={{ transform: 'translate3d(0,0,0)' }} />
      </div>
    </motion.div>
  </div>
);

/* ─── 02 / Carbon Fiber Weave ────────────────────────────────
   Stacked 3D plates with woven texture, real thickness
   ──────────────────────────────────────────────────────────── */
export const CarbonWeaveSVG = () => (
  <div className="mat3d-scene">
    <motion.div
      className="mat3d-rotator"
      animate={{ rotateY: [-25, 25, -25], rotateX: [30, 35, 30] }}
      transition={{
        rotateY: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        rotateX: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="carbon-stack">
        {/* Bottom plate */}
        <div className="carbon-plate carbon-plate-1">
          <div className="carbon-plate-face carbon-plate-top carbon-weave-texture" />
          <div className="carbon-plate-face carbon-plate-front" />
          <div className="carbon-plate-face carbon-plate-right" />
          <div className="carbon-plate-face carbon-plate-bottom" />
          <div className="carbon-plate-face carbon-plate-back" />
          <div className="carbon-plate-face carbon-plate-left" />
        </div>
        {/* Middle plate */}
        <div className="carbon-plate carbon-plate-2">
          <div className="carbon-plate-face carbon-plate-top carbon-weave-texture" />
          <div className="carbon-plate-face carbon-plate-front" />
          <div className="carbon-plate-face carbon-plate-right" />
          <div className="carbon-plate-face carbon-plate-bottom" />
          <div className="carbon-plate-face carbon-plate-back" />
          <div className="carbon-plate-face carbon-plate-left" />
        </div>
        {/* Top plate */}
        <div className="carbon-plate carbon-plate-3">
          <div className="carbon-plate-face carbon-plate-top carbon-weave-texture" />
          <div className="carbon-plate-face carbon-plate-front" />
          <div className="carbon-plate-face carbon-plate-right" />
          <div className="carbon-plate-face carbon-plate-bottom" />
          <div className="carbon-plate-face carbon-plate-back" />
          <div className="carbon-plate-face carbon-plate-left" />
        </div>
      </div>
    </motion.div>
  </div>
);

/* ─── 03 / Solar PV Cell Exploded ────────────────────────────
   Four 3D panels floating apart — Glass, Grid, PV Cell, Backsheet
   ──────────────────────────────────────────────────────────── */
export const SolarCellSVG = () => (
  <div className="mat3d-scene">
    <motion.div
      className="mat3d-rotator"
      style={{ rotateX: -25 }}
      animate={{ rotateY: [0, 360] }}
      transition={{ rotateY: { duration: 28, repeat: Infinity, ease: 'linear' } }}
    >
      <div className="solar-stack">
        {/* Layer 1: Glass Shield */}
        <motion.div
          className="solar-layer solar-glass"
          animate={{ y: [-55, -65, -55] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="solar-layer-face solar-layer-top" />
          <div className="solar-layer-face solar-layer-front" />
          <div className="solar-layer-face solar-layer-right" />
          <span className="solar-label">GLASS</span>
        </motion.div>

        {/* Layer 2: Conductive Grid */}
        <motion.div
          className="solar-layer solar-grid"
          animate={{ y: [-20, -26, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <div className="solar-layer-face solar-layer-top" />
          <div className="solar-layer-face solar-layer-front" />
          <div className="solar-layer-face solar-layer-right" />
          {/* Grid lines */}
          <div className="solar-grid-lines" />
          <span className="solar-label">GRID</span>
        </motion.div>

        {/* Layer 3: PV Cell */}
        <motion.div
          className="solar-layer solar-pv"
          animate={{ y: [15, 12, 15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <div className="solar-layer-face solar-layer-top" />
          <div className="solar-layer-face solar-layer-front" />
          <div className="solar-layer-face solar-layer-right" />
          <span className="solar-label">PV CELL</span>
        </motion.div>

        {/* Layer 4: Backsheet */}
        <motion.div
          className="solar-layer solar-back"
          animate={{ y: [50, 55, 50] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        >
          <div className="solar-layer-face solar-layer-top" />
          <div className="solar-layer-face solar-layer-front" />
          <div className="solar-layer-face solar-layer-right" />
          <span className="solar-label">BACKSHEET</span>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

/* ─── 04 / Polymer-Wood Composite ────────────────────────────
   3D layered extrusion — wood grain surface, adhesive, polymer core
   ──────────────────────────────────────────────────────────── */
export const PolymerExtrusionSVG = () => (
  <div className="mat3d-scene">
    <motion.div
      className="mat3d-rotator"
      animate={{ rotateY: [-30, 30, -30], rotateX: [-20, -30, -20] }}
      transition={{
        rotateY: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        rotateX: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="poly-stack">
        {/* Top: Wood Surface */}
        <motion.div
          className="poly-layer poly-wood"
          animate={{ y: [-35, -45, -35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="poly-face poly-face-top" />
          <div className="poly-face poly-face-front" />
          <div className="poly-face poly-face-right" />
          <div className="poly-face poly-face-bottom" />
          <div className="poly-face poly-face-back" />
          <div className="poly-face poly-face-left" />
          <span className="poly-label">SURFACE</span>
        </motion.div>

        {/* Middle: Adhesive */}
        <motion.div
          className="poly-layer poly-adhesive"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="poly-face poly-face-top" />
          <div className="poly-face poly-face-front" />
          <div className="poly-face poly-face-right" />
          <div className="poly-face poly-face-bottom" />
          <div className="poly-face poly-face-back" />
          <div className="poly-face poly-face-left" />
          <span className="poly-label">ADHESIVE</span>
        </motion.div>

        {/* Bottom: Polymer Core */}
        <motion.div
          className="poly-layer poly-core"
          animate={{ y: [35, 40, 35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="poly-face poly-face-top" />
          <div className="poly-face poly-face-front" />
          <div className="poly-face poly-face-right" />
          <div className="poly-face poly-face-bottom" />
          <div className="poly-face poly-face-back" />
          <div className="poly-face poly-face-left" />
          {/* Fiber strands inside */}
          <div className="poly-fibers" />
          <span className="poly-label">POLYMER CORE</span>
        </motion.div>
      </div>
    </motion.div>
  </div>
);
