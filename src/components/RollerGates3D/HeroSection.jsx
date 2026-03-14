import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, View } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ─── Animated Single Slat ─── */
function AnimatedSlat({ baseY, geometry, material, delay, triggerOpen }) {
  const { offsetY } = useSpring({
    offsetY: triggerOpen ? 5.5 : 0,
    delay: triggerOpen ? delay : 0,
    config: { mass: 1, tension: 170, friction: 26 },
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

/* ─── Procedural Gate (16 slats) ─── */
function HeroGate({ triggerOpen }) {
  const slatCount = 16;
  const gateWidth = 3.2;
  const gateHeight = 4;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(gateWidth, slatHeight, 0.08);
  }, [gateWidth, slatHeight]);

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#2a2a2a', roughness: 0.3, metalness: 0.85, envMapIntensity: 1.0,
    }),
    []
  );

  const slats = useMemo(() => {
    const arr = [];
    for (let i = 0; i < slatCount; i++) {
      arr.push({
        index: i,
        baseY: -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap),
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
          delay={s.index * 30}
          triggerOpen={triggerOpen}
        />
      ))}
    </group>
  );
}

/* ─── Orbiting Light ─── */
function OrbitingLight() {
  const lightRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = (t / 12) * Math.PI * 2;
    if (lightRef.current) {
      lightRef.current.position.set(Math.cos(angle) * 8, 5, Math.sin(angle) * 8);
    }
  });
  return <directionalLight ref={lightRef} intensity={1.2} castShadow shadow-mapSize={512} />;
}

/* ─── Camera Sway ─── */
function CameraSway() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.rotation.x = Math.sin(t / 6 * Math.PI * 2) * 0.026;
    camera.rotation.y = Math.cos(t / 6 * Math.PI * 2) * 0.026;
  });
  return null;
}

/* ─── Hero Scene ─── */
function HeroScene({ triggerOpen }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <CameraSway />
      <ambientLight intensity={0.4} />
      <OrbitingLight />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color="#4488ff" />
      <Environment preset="warehouse" />
      <HeroGate triggerOpen={triggerOpen} />
    </>
  );
}

/* ─── Main Export ─── */
export default function HeroSection() {
  const [triggerOpen, setTriggerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTriggerOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="rg-hero rg-hero--3d">
      <View className="rg-hero-canvas-wrap">
        <Suspense fallback={null}>
          <HeroScene triggerOpen={triggerOpen} />
        </Suspense>
      </View>

      <div className="rg-hero-overlay-content">
        <motion.div className="rg-hero-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
          <span className="rg-eyebrow-line" />
          Elcardo Industries
        </motion.div>
        <motion.h1 className="rg-hero-headline" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}>
          Precision<br />Engineered
        </motion.h1>
        <motion.p className="rg-hero-sub" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }}>
          Security &bull; Automation &bull; Reliability
        </motion.p>
        <motion.div className="rg-hero-cta-wrap" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.4 }}>
          <a href="#rg-cta" className="rg-btn-primary" data-cursor="expand">
            Get a Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </motion.div>
      </div>

      <motion.div className="rg-hero-scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.8 }}>
        <div className="rg-scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
