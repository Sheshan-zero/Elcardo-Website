import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, View } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import heroImg from '../../assets/rg_hero.png';

/* ─── Animated Single Slat ─── */
function AnimatedSlat({ baseY, geometry, material, delay, triggerOpen }) {
  const { offsetY } = useSpring({
    offsetY: triggerOpen ? 5.5 : 0,
    delay: triggerOpen ? delay : 0,
    config: { mass: 1.5, tension: 80, friction: 35 }, // Smoother, slower, heavier
  });

  return (
    <animated.mesh
      geometry={geometry}
      material={material}
      position-x={0}
      position-y={offsetY.to((v) => baseY + v)}
      position-z={0}
      castShadow
    />
  );
}

/* ─── Procedural Gate ─── */
function HeroGate({ triggerOpen }) {
  const slatCount = 16;
  const gateWidth = 3.6; // Slightly wider for presence
  const gateHeight = 4.2;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  const geometry = useMemo(
    () => new THREE.BoxGeometry(gateWidth, slatHeight, 0.08),
    [gateWidth, slatHeight]
  );

  // Premium, dark brushed metal look (Apple style space grey/graphite)
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1c',
        roughness: 0.15,
        metalness: 0.95,
        envMapIntensity: 1.8,
      }),
    []
  );

  const slats = useMemo(() => {
    const arr = [];
    for (let i = 0; i < slatCount; i++) {
      arr.push({
        index: i,
        baseY:
          -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap),
      });
    }
    return arr;
  }, [slatCount, gateHeight, slatHeight]);

  return (
    <group>
      {slats.map((s) => (
        <AnimatedSlat
          key={s.index}
          baseY={s.baseY}
          geometry={geometry}
          material={material}
          delay={s.index * 40}
          triggerOpen={triggerOpen}
        />
      ))}
    </group>
  );
}

/* ─── Gentle Camera Breathe (Very slow and purposeful) ─── */
function CameraBreathe() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.rotation.x = Math.sin(t * 0.1) * 0.005;
    camera.rotation.y = Math.cos(t * 0.08) * 0.005;
    // Extremely slow tracking in
    camera.position.z = 7 - t * 0.02;
  });
  return null;
}

/* ─── Elegant Lighting Setup ─── */
function SubtleLighting() {
  return (
    <group>
      <ambientLight intensity={0.2} />
      {/* Soft fill */}
      <directionalLight position={[-5, 5, 5]} intensity={0.4} color="#f0f2f5" />
      {/* Main dramatic key light revealing the metallic texture */}
      <spotLight position={[6, 8, 4]} angle={0.5} penumbra={1} intensity={2.5} color="#ffffff" castShadow />
      {/* Subtle cool rim light */}
      <pointLight position={[-4, -2, -3]} intensity={1.5} color="#e6f0fa" distance={15} decay={2} />
    </group>
  );
}

/* ─── Hero Scene ─── */
function HeroScene({ triggerOpen }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={35} /> {/* Narrower FOV for less distortion */}
      <CameraBreathe />
      <SubtleLighting />
      <Environment preset="studio" />
      {/* Centered gate */}
      <group position={[0, 0, 0]}>
        <HeroGate triggerOpen={triggerOpen} />
      </group>
    </>
  );
}

/* ─── Main Export ─── */
export default function HeroSection() {
  const [triggerOpen, setTriggerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTriggerOpen(true), 1500); // Slower, more deliberate reveal
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="rg-hero rg-hero--apple">
      {/* Very subtle background gradient (nearly black) */}
      <div className="rg-hero-bg-apple" />
      
      {/* Premium Apple-style faded background image */}
      <motion.div 
        className="rg-hero-bg-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
      >
        <img src={heroImg} alt="Elcardo Roller Gates Factory" />
      </motion.div>
      <div className="rg-hero-bg-gradient" />

      <View className="rg-hero-canvas-wrap">
        <Suspense fallback={null}>
          <HeroScene triggerOpen={triggerOpen} />
        </Suspense>
      </View>

      {/* Content overlay, centered, minimalist */}
      <div className="rg-hero-content-apple">
        <motion.p
          className="rg-hero-kicker-apple"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          Elcardo Roller Gates
        </motion.p>

        <motion.h1
          className="rg-hero-headline-apple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          Absolute security.
          <br />
          <span className="rg-hero-headline-dim-apple">Beautifully engineered.</span>
        </motion.h1>

        <motion.div
          className="rg-hero-actions-apple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'easeInOut' }}
        >
          <a href="#rg-cta" className="rg-btn-apple-primary">
            Get a Quote
          </a>
          <a href="#rg-interactive" className="rg-btn-apple-link">
            Learn more
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
