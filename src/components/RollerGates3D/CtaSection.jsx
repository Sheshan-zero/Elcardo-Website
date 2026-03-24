import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, MeshReflectorMaterial, View } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─── Closing Gate (10 slats) ─── */
function ClosingGate({ progress }) {
  const slatCount = 10;
  const gateWidth = 3.2;
  const gateHeight = 4;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  const geo = useMemo(() => new THREE.BoxGeometry(gateWidth, slatHeight, 0.07), [gateWidth, slatHeight]);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.3, metalness: 0.85 }), []);

  return (
    <group>
      {Array.from({ length: slatCount }).map((_, i) => {
        const baseY = -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap);
        const normalizedIndex = i / slatCount;
        const openAmount = Math.max(0, Math.min(1, (1 - progress - normalizedIndex * 0.3) / 0.7));
        return <mesh key={i} geometry={geo} material={mat} position={[0, baseY + openAmount * (gateHeight + 2), 0]} />;
      })}
    </group>
  );
}

function ReflectorFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial blur={[200, 80]} resolution={256} mixBlur={1} mixStrength={0.4} roughness={1} color="#050505" metalness={0.5} />
    </mesh>
  );
}

function CtaScene({ progress }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <Environment preset="warehouse" />
      <ClosingGate progress={progress} />
      <ReflectorFloor />
    </>
  );
}

/* ─── Character reveal ─── */
const charContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.03 } } };
const charVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } };

function CharReveal({ text }) {
  return (
    <motion.span variants={charContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={charVariant} style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function CtaSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top bottom', end: 'top top',
        scrub: 1.5, onUpdate: (self) => setProgress(self.progress),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="rg-cta-3d" id="rg-cta" ref={sectionRef}>
      <View className="rg-cta-canvas-bg">
        <Suspense fallback={null}><CtaScene progress={progress} /></Suspense>
      </View>
      <div className="rg-cta-3d-content">
        <h2 className="rg-cta-headline">
          <CharReveal text="Built for Performance." /><br />
          <span className="rg-hero-italic"><CharReveal text="Designed for Security." /></span>
        </h2>
        <motion.p className="rg-cta-sub" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}>
          Let's discuss how Elcardo Roller Gates can protect your business.
        </motion.p>
        <motion.div className="rg-cta-buttons" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }}>
          <a href="#" className="rg-btn-primary rg-btn-primary--white" data-cursor="expand">
            Get a Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#" className="rg-btn-outline rg-btn-outline--glow" data-cursor="expand">Contact Us</a>
        </motion.div>
      </div>
    </section>
  );
}
