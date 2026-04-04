import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ease = [0.16, 1, 0.3, 1];

/* ===== Wireframe Grid Plane ===== */
function WireframeGrid() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = Math.PI * 0.45 + Math.sin(t * 0.15) * 0.05;
      ref.current.rotation.z = t * 0.02;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[20, 20, '#0A3D7A', '#0A3D7A']}
      position={[0, -1, 0]}
      material-transparent={true}
      material-opacity={0.12}
    />
  );
}

/* ===== Floating Wireframe Beams ===== */
function WireframeBeams() {
  const beam1 = useRef();
  const beam2 = useRef();
  const beam3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (beam1.current) {
      beam1.current.rotation.y = t * 0.05;
      beam1.current.rotation.x = Math.sin(t * 0.08) * 0.1;
    }
    if (beam2.current) {
      beam2.current.rotation.z = -t * 0.04;
      beam2.current.rotation.y = t * 0.03;
    }
    if (beam3.current) {
      beam3.current.rotation.x = t * 0.03;
      beam3.current.rotation.z = Math.cos(t * 0.06) * 0.08;
    }
  });

  return (
    <>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <lineSegments ref={beam1} position={[-3, 0.5, -1]}>
          <edgesGeometry args={[new THREE.BoxGeometry(3, 0.3, 0.3)]} />
          <lineBasicMaterial color="#DA1212" transparent opacity={0.2} />
        </lineSegments>
      </Float>

      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <lineSegments ref={beam2} position={[2.5, -0.5, -2]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2, 0.5, 0.2)]} />
          <lineBasicMaterial color="#0A3D7A" transparent opacity={0.18} />
        </lineSegments>
      </Float>

      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.5}>
        <lineSegments ref={beam3} position={[0, 1, -1.5]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.5, 0.2, 0.4)]} />
          <lineBasicMaterial color="#FFFFFF" transparent opacity={0.06} />
        </lineSegments>
      </Float>
    </>
  );
}

/* ===== Subtle Particles ===== */
function TransitionParticles() {
  const count = 30;
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const r = new THREE.Color('#DA1212');
    const b = new THREE.Color('#0A3D7A');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = Math.random() < 0.5 ? r : b;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        transparent
        opacity={0.6}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

/* ===== Main Export ===== */
export default function ProjectsTransition3D() {
  return (
    <section className="projects-transition-3d" id="projects-transition">
      <div className="projects-transition-canvas">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 1.2]}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#0A3D7A" />
          <pointLight position={[-5, -3, 3]} intensity={0.25} color="#DA1212" />

          <WireframeGrid />
          <WireframeBeams />
          <TransitionParticles />
        </Canvas>
      </div>

      <motion.div
        className="projects-transition-text"
        initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease }}
      >
        <h3>Engineered for <em>Every Scale.</em></h3>
        <p>From residential to industrial — precision at every level</p>
      </motion.div>
    </section>
  );
}
