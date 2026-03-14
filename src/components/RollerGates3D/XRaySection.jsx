import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Html, View } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─── X-Ray Gate (10 slats) ─── */
function XRayGate({ progress }) {
  const slatCount = 10;
  const gateWidth = 3;
  const gateHeight = 3.8;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;
  const slatGeo = useMemo(() => new THREE.BoxGeometry(gateWidth, slatHeight, 0.06), [gateWidth, slatHeight]);

  const wireframeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00d4ff', wireframe: true, transparent: true, opacity: 1 }), []);
  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.3, metalness: 0.85, transparent: true, opacity: 0 }), []);
  const frameMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00d4ff', wireframe: true, transparent: true }), []);
  const frameSolidMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.25, metalness: 0.9, transparent: true, opacity: 0 }), []);

  useFrame(() => {
    wireframeMat.opacity = 1 - progress;
    solidMat.opacity = progress;
    frameMat.opacity = 1 - progress;
    frameSolidMat.opacity = progress;
  });

  const rt = 0.12;
  const labels = [
    { pos: [0, gateHeight / 2 + 0.35, 0.3], text: 'Tubular Motor', threshold: 0.2 },
    { pos: [gateWidth / 2 + 0.3, 0, 0.3], text: 'Locking System', threshold: 0.4 },
    { pos: [-gateWidth / 2 - 0.3, 0, 0.3], text: 'Guide Rails', threshold: 0.6 },
    { pos: [0, -gateHeight / 2 - 0.3, 0.3], text: 'Safety Sensor', threshold: 0.8 },
  ];

  return (
    <group>
      {/* Frame */}
      {[[0, gateHeight / 2 + rt / 2, 0, gateWidth + rt * 2, rt, 0.15],
        [0, -gateHeight / 2 - rt / 2, 0, gateWidth + rt * 2, rt, 0.15],
        [-gateWidth / 2 - rt / 2, 0, 0, rt, gateHeight + rt * 2, 0.15],
        [gateWidth / 2 + rt / 2, 0, 0, rt, gateHeight + rt * 2, 0.15]].map((args, i) => (
        <group key={`f${i}`}>
          <mesh material={frameMat} position={[args[0], args[1], args[2]]}><boxGeometry args={[args[3], args[4], args[5]]} /></mesh>
          <mesh material={frameSolidMat} position={[args[0], args[1], args[2]]}><boxGeometry args={[args[3], args[4], args[5]]} /></mesh>
        </group>
      ))}
      {/* Slats */}
      {Array.from({ length: slatCount }).map((_, i) => {
        const y = -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap);
        return (
          <group key={i}>
            <mesh geometry={slatGeo} material={wireframeMat} position={[0, y, 0]} />
            <mesh geometry={slatGeo} material={solidMat} position={[0, y, 0]} />
          </group>
        );
      })}
      {/* Labels */}
      {labels.map((label, i) => (
        progress >= label.threshold && (
          <group key={i} position={label.pos}>
            <Html distanceFactor={7} style={{ pointerEvents: 'none' }}>
              <div className="rg-xray-label">{label.text}</div>
            </Html>
          </group>
        )
      ))}
    </group>
  );
}

function XRayScene({ progress }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={40} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Environment preset="warehouse" />
      <XRayGate progress={progress} />
    </>
  );
}

export default function XRaySection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top top', end: '+=250%',
        pin: true, scrub: 1.5, onUpdate: (self) => setProgress(self.progress),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="rg-xray" ref={sectionRef}>
      <div className="rg-xray-header">
        <span className="rg-feature-label">Engineering Blueprint</span>
        <h2 className="rg-xray-title">See beneath<br />the surface.</h2>
      </div>
      <View className="rg-xray-canvas-wrap">
        <Suspense fallback={null}><XRayScene progress={progress} /></Suspense>
      </View>
    </section>
  );
}
