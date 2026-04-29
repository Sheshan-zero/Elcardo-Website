import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import LazyCanvas from '../RollerGates3D/LazyCanvas';
import './RD_Engineering.css';

const ease = [0.16, 1, 0.3, 1];

const COMPONENTS = [
  { id: 0, name: 'Motor System', spec: 'AC/DC direct-drive unit', color: 0x1A2332 },
  { id: 1, name: 'Rolling Drum', spec: 'Central barrel, balanced load', color: 0x1A2332 },
  { id: 2, name: 'Curtain / Slats', spec: 'Interlocked steel sections', color: 0xC8C4BE },
  { id: 3, name: 'Guide Rails', spec: 'Precision-formed channels', color: 0x2D2D2D },
  { id: 4, name: 'Safety Sensor', spec: 'Obstacle auto-reverse zone', color: 0xCC2929 },
  { id: 5, name: 'Manual Override', spec: 'Spring-assisted emergency lift', color: 0x1A2332 },
  { id: 6, name: 'Mounting Brackets', spec: 'Heavy-gauge steel anchors', color: 0x2D2D2D },
];

/* ─── Exploded 3D Scene (ported from in.html) ─── */
function ExplodedDoorScene({ activeComp }) {
  const sceneRef = useRef();
  const motorRef = useRef();
  const drumRef = useRef();
  const curtainRef = useRef();
  const railRef = useRef();
  const sensorRef = useRef();
  const overrideRef = useRef();
  const bracketRef = useRef();

  const groups = useMemo(() => [motorRef, drumRef, curtainRef, railRef, sensorRef, overrideRef, bracketRef], []);

  const motorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x1A2332, roughness: 0.5, metalness: 0.6, transparent: true, opacity: 0.85 }), []);
  const curtainMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xC8C4BE, roughness: 0.55, metalness: 0.15, transparent: true, opacity: 0.85 }), []);
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x2D2D2D, roughness: 0.6, metalness: 0.4, transparent: true, opacity: 0.85 }), []);
  const sensorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xCC2929, roughness: 0.4, metalness: 0.3, transparent: true, opacity: 0.85 }), []);

  const allMats = useMemo(() => [
    [motorMat], [motorMat], [curtainMat], [frameMat], [sensorMat], [motorMat], [frameMat]
  ], [motorMat, curtainMat, frameMat, sensorMat]);

  useFrame((_, delta) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += delta * 0.3;
    }

    // Explode positioning
    const explode = 0.3;
    if (motorRef.current) motorRef.current.position.set(0.7 + explode * 0.8, 1.75 + explode * 0.3, -0.1);
    if (drumRef.current) drumRef.current.position.set(0, 1.75 + explode * 0.2, 0);
    if (curtainRef.current) curtainRef.current.position.set(explode * 0.1, 0, 0);
    if (railRef.current) railRef.current.position.set(0, 0, 0);
    if (sensorRef.current) sensorRef.current.position.set(0, -explode * 0.4, 0);
    if (overrideRef.current) overrideRef.current.position.set(-explode * 0.8, 1.75 + explode * 0.3, -0.1);
    if (bracketRef.current) bracketRef.current.position.set(0, explode * 0.2, explode * 0.3);

    // Opacity based on active
    groups.forEach((ref, i) => {
      if (!ref.current) return;
      const isActive = activeComp === null || activeComp === i;
      ref.current.traverse((child) => {
        if (child.isMesh && child.material) {
          const targetOpacity = isActive ? 1.0 : 0.35;
          child.material.opacity += (targetOpacity - child.material.opacity) * 0.08;
        }
      });
    });
  });

  return (
    <group ref={sceneRef}>
      {/* 0: Motor */}
      <group ref={motorRef}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.3, 0.3]} />
          <meshStandardMaterial color={0x1A2332} roughness={0.5} metalness={0.6} transparent opacity={0.85} />
        </mesh>
      </group>

      {/* 1: Drum */}
      <group ref={drumRef}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.17, 0.17, 2.0, 24]} />
          <meshStandardMaterial color={0x1A2332} roughness={0.5} metalness={0.6} transparent opacity={0.85} />
        </mesh>
      </group>

      {/* 2: Curtain Slats */}
      <group ref={curtainRef}>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[0, -1.6 + i * 0.24, 0]} castShadow>
            <boxGeometry args={[1.9, 0.14, 0.04]} />
            <meshStandardMaterial color={0xC8C4BE} roughness={0.55} metalness={0.15} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>

      {/* 3: Rails */}
      <group ref={railRef}>
        {[-1.05, 1.05].map((x) => (
          <mesh key={x} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.07, 3.5, 0.12]} />
            <meshStandardMaterial color={0x2D2D2D} roughness={0.6} metalness={0.4} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>

      {/* 4: Sensors */}
      <group ref={sensorRef}>
        {[-0.9, 0.9].map((x) => (
          <mesh key={x} position={[x, -1.75, 0.08]}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial color={0xCC2929} roughness={0.4} metalness={0.3} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>

      {/* 5: Manual Override */}
      <group ref={overrideRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 12]} />
          <meshStandardMaterial color={0x1A2332} roughness={0.5} metalness={0.6} transparent opacity={0.85} />
        </mesh>
      </group>

      {/* 6: Brackets */}
      <group ref={bracketRef}>
        {[[-1.05, 0, 0], [1.05, 0, 0]].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.12, 0.12, 0.18]} />
            <meshStandardMaterial color={0x2D2D2D} roughness={0.6} metalness={0.4} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

const RD_Engineering = () => {
  const [activeComp, setActiveComp] = useState(null);

  return (
    <section className="rd-eng" id="rd-interior">
      <div className="rd-eng-inner">
        <motion.div
          className="rd-eng-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          <span className="rd-label">Engineering View</span>
          <h2 className="rd-heading">Inside the door.</h2>
          <p className="rd-body-text">
            Every component is engineered for longevity and precision. Click to explore.
          </p>
        </motion.div>

        <div className="rd-eng-body">
          {/* 3D Canvas */}
          <motion.div
            className="rd-eng-image-area"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
          >
            <LazyCanvas style={{ width: '100%', height: '100%' }} lightBg>
              <Canvas
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                shadows
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
              >
                <PerspectiveCamera makeDefault position={[0, 0.5, 7]} fov={40} />
                <ambientLight intensity={0.45} />
                <directionalLight position={[5, 8, 5]} intensity={1.3} castShadow shadow-mapSize={1024} />
                <pointLight position={[-4, 4, -4]} intensity={0.7} color="#f0e8d8" />
                <hemisphereLight intensity={0.35} />
                <Environment preset="studio" environmentIntensity={0.6} />
                <ExplodedDoorScene activeComp={activeComp} />
              </Canvas>
            </LazyCanvas>
          </motion.div>

          {/* Component list */}
          <div className="rd-eng-detail">
            <AnimatePresence mode="wait">
              {activeComp !== null ? (
                <motion.div
                  key={COMPONENTS[activeComp].id}
                  className="rd-eng-detail-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <h4 className="rd-eng-detail-title">{COMPONENTS[activeComp].name}</h4>
                  <p className="rd-eng-detail-spec">{COMPONENTS[activeComp].spec}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="rd-eng-detail-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <p>Select a component to inspect</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rd-eng-comp-list">
              {COMPONENTS.map((comp) => (
                <button
                  key={comp.id}
                  className={`rd-eng-comp-item ${activeComp === comp.id ? 'active' : ''}`}
                  onClick={() => setActiveComp(activeComp === comp.id ? null : comp.id)}
                >
                  <span className="rd-eng-comp-dot" />
                  <div>
                    <h5>{comp.name}</h5>
                    <p>{comp.spec}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RD_Engineering;
