import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, View } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─── Rotating Gate Specimen (12 slats for perf) ─── */
function GateSpecimen() {
  const groupRef = useRef();
  const slatCount = 12;
  const gateWidth = 2.8;
  const gateHeight = 3.6;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  const geometry = useMemo(() => new THREE.BoxGeometry(gateWidth, slatHeight, 0.06), [gateWidth, slatHeight]);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.3, metalness: 0.85 }), []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  const slats = useMemo(() => {
    const arr = [];
    for (let i = 0; i < slatCount; i++) {
      arr.push(-gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap));
    }
    return arr;
  }, [slatCount, gateHeight, slatHeight]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {slats.map((y, i) => (
          <mesh key={i} geometry={geometry} material={material} position={[0, y, 0]} />
        ))}
      </group>
    </Float>
  );
}

/* ─── Camera Dolly ─── */
function CameraDolly({ sectionRef }) {
  const { camera } = useThree();
  useEffect(() => {
    if (!sectionRef?.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(camera.position, { z: 10 }, {
        z: 5, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    });
    return () => ctx.revert();
  }, [camera, sectionRef]);
  return null;
}

function IntroScene({ sectionRef }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <CameraDolly sectionRef={sectionRef} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <Environment preset="warehouse" />
      <GateSpecimen />
    </>
  );
}

/* ─── Staggered word reveal ─── */
const wordVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const singleWord = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function WordReveal({ text }) {
  return (
    <motion.span variants={wordVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} style={{ display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} variants={singleWord} style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</motion.span>
      ))}
    </motion.span>
  );
}

export default function ProductIntro() {
  const sectionRef = useRef(null);
  return (
    <section className="rg-intro rg-intro--3d" ref={sectionRef}>
      <View className="rg-intro-canvas-col">
        <Suspense fallback={null}>
          <IntroScene sectionRef={sectionRef} />
        </Suspense>
      </View>
      <div className="rg-intro-text-col">
        <p className="rg-intro-statement">
          <WordReveal text="Elcardo Roller Gates are engineered for commercial, industrial, and residential applications — delivering unmatched security, automation, and durability in every installation." />
        </p>
      </div>
    </section>
  );
}
