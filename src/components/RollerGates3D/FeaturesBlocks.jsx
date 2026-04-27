import React, { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, View } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ─── Feature 1: Stress Test (single simple scene) ─── */
function StressTestScene() {
  const gateRef = useRef();
  const arrowsRef = useRef([]);

  const gateMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.3, metalness: 0.85 }), []);
  const arrowMat = React.useMemo(() => new THREE.MeshStandardMaterial({ color: '#DA1212', emissive: '#DA1212', emissiveIntensity: 0.3 }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gateRef.current) gateRef.current.scale.z = 1 + Math.sin(t * 1.5) * 0.03;
    arrowsRef.current.forEach((arrow, i) => {
      if (arrow) arrow.position.z = -1.5 + Math.sin(t * 2 + i * 0.5) * 0.3;
    });
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 8, 5]} intensity={1.2} />
      <Environment preset="warehouse" />
      <group ref={gateRef}><mesh material={gateMat}><boxGeometry args={[3, 3.5, 0.1]} /></mesh></group>
      {[-0.8, 0, 0.8].map((y, i) => (
        <mesh key={i} material={arrowMat} ref={(el) => (arrowsRef.current[i] = el)} position={[0, y, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.06, 1.2, 6]} />
        </mesh>
      ))}
    </>
  );
}

function FeatureBlock({ label, title, description, children, reverse }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 30%', scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`rg-feat-block ${reverse ? 'rg-feat-block--reverse' : ''}`} ref={sectionRef}>
      <motion.div className="rg-feat-block-text" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={0}>
        <span className="rg-feature-label">{label}</span>
        <h2 className="rg-feat-block-title">{title}</h2>
        <p className="rg-feat-block-desc">{description}</p>
      </motion.div>
      <div className="rg-feat-block-canvas" style={{ position: 'relative' }}>
        <View style={{ position: 'absolute', inset: 0 }}>
          <Suspense fallback={null}>{children}</Suspense>
        </View>
      </div>
    </div>
  );
}

function SmartAutoCard() {
  return (
    <div className="rg-feat-css-visual">
      <div className="rg-feat-circuit">
        <div className="rg-feat-circuit-line" />
        <div className="rg-feat-circuit-line rg-feat-circuit-line--2" />
        <div className="rg-feat-circuit-dot" />
        <div className="rg-feat-circuit-dot rg-feat-circuit-dot--2" />
      </div>
      <div className="rg-feat-phone-mockup">
        <div className="rg-feat-phone-header">Elcardo App</div>
        <div className="rg-feat-phone-status">Gate Status: <span>Secured</span></div>
        <div className="rg-feat-phone-btn">Open Gate</div>
      </div>
    </div>
  );
}

function SecurityCard() {
  return (
    <div className="rg-feat-css-visual">
      <div className="rg-feat-lock">
        <div className="rg-feat-lock-body" />
        <div className="rg-feat-lock-bolt" />
        <div className="rg-feat-lock-indicator" />
      </div>
    </div>
  );
}

export default function FeaturesBlocks() {
  return (
    <section className="rg-features-3d">
      <FeatureBlock label="Industrial Strength" title="Engineered for the toughest environments." description="Heavy-gauge galvanized steel panels with foam-insulated cores, built to withstand decades of demanding industrial use.">
        <StressTestScene />
      </FeatureBlock>

      <div className="rg-feat-block rg-feat-block--reverse">
        <motion.div className="rg-feat-block-text" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={0}>
          <span className="rg-feature-label">Smart Automation</span>
          <h2 className="rg-feat-block-title">Control from<br />anywhere.</h2>
          <p className="rg-feat-block-desc">Smartphone app, scheduled operations, and real-time status monitoring. Integrates with your existing building management system.</p>
        </motion.div>
        <motion.div className="rg-feat-block-canvas" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} custom={0.15}>
          <SmartAutoCard />
        </motion.div>
      </div>

      <div className="rg-feat-block">
        <motion.div className="rg-feat-block-text" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={0}>
          <span className="rg-feature-label">Engineered Security</span>
          <h2 className="rg-feat-block-title">Reinforced.<br />Tamper‑proof.<br />Reliable.</h2>
          <p className="rg-feat-block-desc">Anti-lift locking mechanism with tamper detection, reinforced guide rails, and automatic engagement on close.</p>
        </motion.div>
        <motion.div className="rg-feat-block-canvas" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} custom={0.15}>
          <SecurityCard />
        </motion.div>
      </div>
    </section>
  );
}
