import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ─── Clean Wireframe Gate ─── */
function XRayGate({ progress }) {
  const slatCount = 10;
  const gateWidth = 3;
  const gateHeight = 3.8;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;
  
  const slatGeo = useMemo(() => new THREE.BoxGeometry(gateWidth, slatHeight, 0.06), [gateWidth, slatHeight]);

  // Very thin, elegant white wireframe fading into deep, rich solid metal
  const wireframeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#ffffff', wireframe: true, transparent: true, opacity: 0.8, side: THREE.DoubleSide
  }), []);
  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1c', roughness: 0.2, metalness: 0.9, transparent: true, opacity: 0,
  }), []);
  const frameMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#ffffff', wireframe: true, transparent: true, opacity: 0.8
  }), []);
  const frameSolidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111112', roughness: 0.15, metalness: 0.95, transparent: true, opacity: 0,
  }), []);

  const groupRef = useRef();

  useFrame(() => {
    // Easing function for smoother fade
    const fadeProg = Math.pow(progress, 1.5);
    
    wireframeMat.opacity = (1 - fadeProg) * 0.4;
    solidMat.opacity = fadeProg;
    frameMat.opacity = (1 - fadeProg) * 0.4;
    frameSolidMat.opacity = fadeProg;

    // Very elegant, slow rotation mapping scroll exactly
    if (groupRef.current) {
      const targetRotY = Math.sin(progress * Math.PI) * 0.15;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, targetRotY, 0.05
      );
    }
  });

  const rt = 0.12;

  // Elegant text nodes connected by thin lines
  const labels = [
    { pos: [0, gateHeight / 2 + 0.4, 0.2], text: 'Tubular Motor', desc: 'Precision-wound stators for silent, high-torque operation.', threshold: 0.15 },
    { pos: [gateWidth / 2 + 0.6, 0.5, 0.2], text: 'Locking System', desc: 'Electromechanical deadbolts engage automatically.', threshold: 0.35 },
    { pos: [-gateWidth / 2 - 0.6, -0.5, 0.2], text: 'Guide Rails', desc: 'Extruded aluminum with teflon-coated tracks.', threshold: 0.55 },
    { pos: [0, -gateHeight / 2 - 0.4, 0.2], text: 'Safety Sensor', desc: 'Infrared detection stops motion in 0.2 seconds.', threshold: 0.75 },
  ];

  return (
    <group ref={groupRef}>
      {/* Frame */}
      {[
        [0, gateHeight / 2 + rt / 2, 0, gateWidth + rt * 2, rt, 0.15],
        [0, -gateHeight / 2 - rt / 2, 0, gateWidth + rt * 2, rt, 0.15],
        [-gateWidth / 2 - rt / 2, 0, 0, rt, gateHeight + rt * 2, 0.15],
        [gateWidth / 2 + rt / 2, 0, 0, rt, gateHeight + rt * 2, 0.15],
      ].map((args, i) => (
        <group key={`f${i}`}>
          <mesh material={frameMat} position={[args[0], args[1], args[2]]}>
            <boxGeometry args={[args[3], args[4], args[5]]} />
          </mesh>
          <mesh material={frameSolidMat} position={[args[0], args[1], args[2]]}>
            <boxGeometry args={[args[3], args[4], args[5]]} />
          </mesh>
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

      {/* Elegant Labels fading in smoothly */}
      {labels.map((label, i) => {
        const visible = progress >= label.threshold && progress <= label.threshold + 0.4;
        
        return (
        <group key={i} position={label.pos}>
          <Html distanceFactor={8} style={{ pointerEvents: 'none', transform: 'translate3d(-50%, -50%, 0)' }}>
            <AnimatePresence>
              {visible && (
                <motion.div 
                  className="rg-apple-label-wrap"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="rg-apple-label-dot" />
                  <div className="rg-apple-label-content">
                    <h4>{label.text}</h4>
                    <p>{label.desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Html>
        </group>
      )})}
    </group>
  );
}

function CleanLighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#aaccff" />
    </>
  );
}

/* ─── Scene ─── */
function XRayScene({ progress }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
      <CleanLighting />
      <Environment preset="studio" />
      <XRayGate progress={progress} />
    </>
  );
}

/* ─── Main Export ─── */
export default function XRaySection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%', // Increased scroll distance for smoother experience
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => setProgress(self.progress),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="rg-xray-apple" ref={sectionRef}>
      
      {/* 3D background canvas */}
      <div className="rg-xray-canvas-wrap">
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <XRayScene progress={progress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Elegant text that fades away as you scroll deep into the wireframe */}
      <motion.div 
        className="rg-xray-text-apple"
        style={{ opacity: 1 - progress * 3 }} // Fades out in the first 33% of scroll
      >
        <p className="rg-xray-kicker-apple">Inside the mechanism.</p>
        <h2 className="rg-xray-title-apple">
          Every part counts.
        </h2>
      </motion.div>
    </section>
  );
}
