import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function ScrollGateAndEffects({ progress }) {
  const gateRef = useRef();
  const slatCount = 14;
  const gateWidth = 3.6;
  const gateHeight = 4.2;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  // Premium, super-smooth dark metal material
  const material = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#1a1a24', 
    roughness: 0.25, 
    metalness: 0.85, 
    envMapIntensity: 2.0 
  }), []);

  const slatGeo = useMemo(() => new THREE.BoxGeometry(gateWidth, slatHeight, 0.08), [gateWidth, slatHeight]);

  useFrame(({ camera }) => {
    // Smooth cinematic camera pan in Phase 1 (Industrial Precision)
    const phase1Pan = Math.sin(Math.min(1, progress / 0.25) * Math.PI * 0.5);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, (phase1Pan - 0.5) * 1.5, 0.05);

    // Smooth gate rotation in Phase 2 (Built to Endure) to show thickness
    const phase2 = Math.min(1, Math.max(0, (progress - 0.25) / 0.25));
    const targetRotY = THREE.MathUtils.lerp(0, Math.PI * 0.18, phase2);
    
    // Smooth gate reverse rotation in Phase 3 & 4
    const phase3 = Math.min(1, Math.max(0, (progress - 0.5) / 0.5));
    const finalRotY = THREE.MathUtils.lerp(targetRotY, 0, phase3);

    if (gateRef.current) {
        gateRef.current.rotation.y = THREE.MathUtils.lerp(gateRef.current.rotation.y, finalRotY, 0.05);
    }
  });

  return (
    <group ref={gateRef}>
      {Array.from({ length: slatCount }).map((_, i) => {
        const baseY = -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap);
        // Silky smooth opening in phase 4 (Open to Anything)
        const phase4 = Math.min(1, Math.max(0, (progress - 0.8) / 0.2));
        
        const normalizedIndex = i / slatCount;
        // Exponential easing for staggered fluid opening
        const easePhase4 = Math.pow(phase4, 1.5);
        const openDelay = normalizedIndex * 0.5; 
        const openProgress = Math.min(1, Math.max(0, (easePhase4 - openDelay) * 2));
        
        // Easing function for the lift
        const smoothLift = openProgress * openProgress * (3 - 2 * openProgress); 
        const yOffset = smoothLift * (gateHeight + 2);
        
        return <mesh key={i} geometry={slatGeo} material={material} position={[0, baseY + yOffset, 0]} castShadow receiveShadow />;
      })}
    </group>
  );
}

function CinematicLighting({ progress }) {
    const sweepLightRef = useRef();
    const warmBloomRef = useRef();
    const sideLightRef = useRef();

    useFrame(() => {
        // Phase 2 side lighting reveals texture (Built to Endure)
        const phase2 = Math.min(1, Math.max(0, (progress - 0.25) / 0.25));
        if (sideLightRef.current) {
            sideLightRef.current.intensity = THREE.MathUtils.lerp(0.5, 3.0, Math.sin(phase2 * Math.PI));
        }

        // Phase 3 smooth elegant blue sweep (Smart by Design)
        const phase3 = Math.min(1, Math.max(0, (progress - 0.5) / 0.25));
        if (sweepLightRef.current) {
            const sweepY = THREE.MathUtils.lerp(-3, 3, phase3);
            sweepLightRef.current.position.y = sweepY;
            // Elegant fade in and out of the light
            sweepLightRef.current.intensity = Math.sin(phase3 * Math.PI) * 4.0;
        }

        // Phase 4 serene warm background bloom (Open to Anything)
        const phase4 = Math.min(1, Math.max(0, (progress - 0.8) / 0.2));
        if (warmBloomRef.current) {
            warmBloomRef.current.intensity = phase4 * 6.0;
        }
    });

    return (
        <group>
            {/* Base cinematic lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 8]} intensity={1.2} color="#f0f5ff" />
            <directionalLight position={[-5, -2, -5]} intensity={0.5} color="#aaccff" />
            
            {/* Dynamic lights */}
            <directionalLight ref={sideLightRef} position={[-8, 0, 2]} intensity={0.5} color="#ffffff" />
            <pointLight ref={sweepLightRef} position={[0, -3, 2]} intensity={0} color="#00d4ff" distance={8} decay={2} />
            <pointLight ref={warmBloomRef} position={[0, 0, -3]} intensity={0} color="#ffaa55" distance={15} decay={1.5} />
        </group>
    );
}

function StoryScene({ progress }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8.5]} fov={40} />
      <Environment preset="studio" />
      <ScrollGateAndEffects progress={progress} />
      <CinematicLighting progress={progress} />
    </>
  );
}

const textStates = [
  { threshold: 0, title: 'Vertical Space-Saving', sub: 'Rolls upward instead of swinging out — ideal for tight spaces.' },
  { threshold: 0.3, title: 'Built to Endure', sub: 'Tested beyond 100,000 cycles of daily commercial use.' },
  { threshold: 0.6, title: 'Smooth Guided Operation', sub: 'Precision guide rails ensure silent, reliable movement.' },
  { threshold: 0.9, title: 'Motor-Ready Mechanism', sub: 'Designed for seamless motorized or manual operation.' },
];

function getActiveText(progress) {
  for (let i = textStates.length - 1; i >= 0; i--) {
    if (progress >= textStates[i].threshold) return textStates[i];
  }
  return textStates[0];
}

export default function ScrollStorytelling() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const activeText = getActiveText(progress);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top top', end: '+=400%',
        pin: true, scrub: 2.5, onUpdate: (self) => setProgress(self.progress),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="rg-story" ref={sectionRef}>
      <div className="rg-story-canvas-wrap">
        <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} dpr={[1, 1.5]}>
          <Suspense fallback={null}><StoryScene progress={progress} /></Suspense>
        </Canvas>
      </div>
      <div className="rg-story-text-overlay">
        <AnimatePresence mode="wait">
          <motion.div key={activeText.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="rg-story-text-block">
            <h2>{activeText.title}</h2>
            <p>{activeText.sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
