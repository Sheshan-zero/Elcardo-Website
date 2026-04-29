import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import LazyCanvas from '../RollerGates3D/LazyCanvas';
import './RD_Motor.css';

const ease = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1A2332" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7" /><path d="M10 6v4l3 2" />
      </svg>
    ),
    title: 'Remote Operation',
    desc: 'Multi-channel RF remote. Control from vehicle without leaving your seat.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1A2332" strokeWidth="1.5">
        <path d="M4 12 Q10 4 16 12" /><path d="M6 16 Q10 10 14 16" /><circle cx="10" cy="17" r="1" fill="#1A2332" />
      </svg>
    ),
    title: 'Quiet Daily Movement',
    desc: 'Engineered for silent, smooth performance through thousands of cycles.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1A2332" strokeWidth="1.5">
        <path d="M3 10h14M3 10l4-4M3 10l4 4" />
      </svg>
    ),
    title: 'Safety Sensor Compatible',
    desc: 'Works with leading obstacle-detection systems. Auto-reverses on contact.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1A2332" strokeWidth="1.5">
        <rect x="6" y="3" width="8" height="14" rx="1" /><line x1="10" y1="7" x2="10" y2="13" />
      </svg>
    ),
    title: 'Manual Override',
    desc: 'Spring-assisted release. Full access without power — always.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1A2332" strokeWidth="1.5">
        <rect x="4" y="8" width="12" height="8" rx="1" /><path d="M8 8V6a2 2 0 014 0v2" />
      </svg>
    ),
    title: 'Built for Frequency',
    desc: 'Rated for 10,000+ daily cycles. Commercial-grade reliability.',
  },
];

/* ─── Motor 3D Scene (ported from in.html automation canvas) ─── */
function MotorScene() {
  const shaftRef = useRef();
  const indicatorRef = useRef();
  const sceneRef = useRef();

  useFrame((_, delta) => {
    if (shaftRef.current) shaftRef.current.rotation.x += delta * 2;
    if (indicatorRef.current) {
      const t = performance.now() / 1000;
      indicatorRef.current.material.emissive.setRGB(Math.sin(t * 3) * 0.15, 0, 0);
    }
    if (sceneRef.current) {
      const t = performance.now() / 1000;
      sceneRef.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Motor housing */}
      <mesh castShadow>
        <boxGeometry args={[1.8, 0.5, 0.6]} />
        <meshStandardMaterial color={0x1A2332} roughness={0.5} metalness={0.65} />
      </mesh>

      {/* End caps */}
      {[-0.92, 0.92].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.27, 0.27, 0.08, 24]} />
          <meshStandardMaterial color={0x2D3848} roughness={0.4} metalness={0.7} />
        </mesh>
      ))}

      {/* Shaft */}
      <mesh ref={shaftRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 2.4, 16]} />
        <meshStandardMaterial color={0x2D3848} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Red indicator light */}
      <mesh ref={indicatorRef} position={[0.7, 0.28, 0.32]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={0xCC2929} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Remote control unit */}
      <mesh position={[-1.5, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.5, 0.18]} />
        <meshStandardMaterial color={0x2D3848} roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Antenna */}
      <mesh position={[-1.5, 0.5, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color={0xC0C0C0} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

const RD_Motor = () => (
  <section className="rd-motor" id="rd-motor">
    <div className="rd-motor-inner">
      {/* Content */}
      <motion.div
        className="rd-motor-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      >
        <span className="rd-label">Motor &amp; Automation</span>
        <h2 className="rd-motor-headline">Effortless control.</h2>

        <div className="rd-motor-features">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="rd-motor-feat"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              <span className="rd-motor-feat-icon">{feat.icon}</span>
              <div>
                <h4 className="rd-motor-feat-title">{feat.title}</h4>
                <p className="rd-motor-feat-desc">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 3D Motor Visual */}
      <motion.div
        className="rd-motor-visual"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
      >
        <div className="rd-motor-3d-wrap">
          <LazyCanvas style={{ width: '100%', height: '100%' }} lightBg>
            <Canvas
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              shadows
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={38} />
              <ambientLight intensity={0.45} />
              <directionalLight position={[5, 8, 5]} intensity={1.3} castShadow shadow-mapSize={1024} />
              <pointLight position={[-4, 4, -4]} intensity={0.7} color="#f0e8d8" />
              <hemisphereLight intensity={0.35} />
              <Environment preset="studio" environmentIntensity={0.6} />
              <MotorScene />
            </Canvas>
          </LazyCanvas>
        </div>
      </motion.div>
    </div>
  </section>
);

export default RD_Motor;
