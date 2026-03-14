import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Environment, PerspectiveCamera, View } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─── Scroll-driven Gate (12 slats) ─── */
function ScrollGate({ progress }) {
  const slatCount = 12;
  const gateWidth = 3;
  const gateHeight = 4;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  const slatGeo = useMemo(() => new THREE.BoxGeometry(gateWidth, slatHeight, 0.07), [gateWidth, slatHeight]);
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.3, metalness: 0.85 }), []);

  return (
    <group>
      {Array.from({ length: slatCount }).map((_, i) => {
        const baseY = -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap);
        const normalizedIndex = i / slatCount;
        const slatProgress = Math.max(0, Math.min(1, (progress - normalizedIndex * 0.3) / 0.7));
        return <mesh key={i} geometry={slatGeo} material={material} position={[0, baseY + slatProgress * (gateHeight + 2), 0]} />;
      })}
    </group>
  );
}

function InteriorLight({ progress }) {
  return <pointLight position={[0, -1, -2]} color="#ff9944" intensity={progress * 3} />;
}

function StoryScene({ progress }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <Environment preset="warehouse" />
      <ScrollGate progress={progress} />
      <InteriorLight progress={progress} />
    </>
  );
}

const textStates = [
  { threshold: 0, title: 'Industrial Precision', sub: 'Crafted from heavy-gauge galvanized steel.' },
  { threshold: 0.3, title: 'Built to Endure', sub: 'Tested beyond 100,000 cycles of daily use.' },
  { threshold: 0.6, title: 'Smart by Design', sub: 'Integrated IoT sensors and remote control.' },
  { threshold: 0.9, title: 'Open to Anything', sub: 'From warehouses to smart homes.' },
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
        trigger: sectionRef.current, start: 'top top', end: '+=300%',
        pin: true, scrub: 1.5, onUpdate: (self) => setProgress(self.progress),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="rg-story" ref={sectionRef}>
      <View className="rg-story-canvas-wrap">
        <Suspense fallback={null}><StoryScene progress={progress} /></Suspense>
      </View>
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
