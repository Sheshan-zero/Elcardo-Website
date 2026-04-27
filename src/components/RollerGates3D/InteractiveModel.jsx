import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ─── Detailed Gate ─── */
function DetailedGate({ isOpen }) {
  const slatCount = 14;
  const gateWidth = 3;
  const gateHeight = 4;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  const slatGeo = useMemo(() => new THREE.BoxGeometry(gateWidth - 0.2, slatHeight, 0.08), [gateWidth, slatHeight]);
  const slatMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2b2b36', roughness: 0.15, metalness: 0.8, envMapIntensity: 1.5 }), []);
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#16161e', roughness: 0.2, metalness: 0.9, envMapIntensity: 1.2 }), []);
  const ledMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#DA1212', emissive: '#DA1212', emissiveIntensity: 2.0 }), []);
  const screenMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00d4ff', transparent: true, opacity: 0.9 }), []);

  const rt = 0.12;

  return (
    <group>
      {/* Frame */}
      <mesh material={frameMat} position={[0, gateHeight / 2 + rt / 2, 0]}><boxGeometry args={[gateWidth + rt * 2, rt, 0.15]} /></mesh>
      <mesh material={frameMat} position={[0, -gateHeight / 2 - rt / 2, 0]}><boxGeometry args={[gateWidth + rt * 2, rt, 0.15]} /></mesh>
      <mesh material={frameMat} position={[-gateWidth / 2 - rt / 2, 0, 0]}><boxGeometry args={[rt, gateHeight + rt * 2, 0.15]} /></mesh>
      <mesh material={frameMat} position={[gateWidth / 2 + rt / 2, 0, 0]}><boxGeometry args={[rt, gateHeight + rt * 2, 0.15]} /></mesh>

      {/* Motor */}
      <group position={[0, gateHeight / 2 + 0.28, 0]}>
        <mesh material={frameMat}><capsuleGeometry args={[0.13, 0.9, 4, 8]} /></mesh>
        <mesh material={ledMat} position={[0, -0.08, 0.14]}><boxGeometry args={[0.65, 0.02, 0.02]} /></mesh>
      </group>

      {/* Control panel */}
      <group position={[gateWidth / 2 + 0.35, 0, 0.1]}>
        <mesh material={frameMat}><boxGeometry args={[0.16, 0.28, 0.06]} /></mesh>
        <mesh material={screenMat} position={[0, 0.02, 0.031]}><planeGeometry args={[0.11, 0.14]} /></mesh>
      </group>

      {/* Slats */}
      {Array.from({ length: slatCount }).map((_, i) => {
        const baseY = -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + slatGap);
        return <AnimatedSlat key={i} index={i} baseY={baseY} geometry={slatGeo} material={slatMat} isOpen={isOpen} slatCount={slatCount} gateHeight={gateHeight} />;
      })}
    </group>
  );
}

function AnimatedSlat({ index, baseY, geometry, material, isOpen, slatCount, gateHeight }) {
  const { offsetY } = useSpring({
    offsetY: isOpen ? gateHeight + 1 : 0,
    delay: isOpen ? index * 30 : (slatCount - index) * 30,
    config: { mass: 1, tension: 180, friction: 24 },
  });
  return <animated.mesh geometry={geometry} material={material} position-x={0} position-y={offsetY.to(v => baseY + v)} position-z={0} />;
}

/* ─── Floating Particles ─── */
function SceneParticles() {
  const count = 50;
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const orange = new THREE.Color('#DA1212');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.3) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const pick = Math.random();
      const c = pick < 0.35 ? orange : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
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
      <pointsMaterial size={0.035} transparent opacity={0.5} vertexColors sizeAttenuation />
    </points>
  );
}

/* ─── Ground Plane ─── */
function GroundPlane() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#050505',
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.8,
  }), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.15, 0]} material={mat} receiveShadow>
      <planeGeometry args={[20, 20]} />
    </mesh>
  );
}

/* ─── Glow Ring under the gate ─── */
function GlowRing() {
  const ref = useRef();
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#DA1212',
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
  }), []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05;
      ref.current.scale.set(s, s, 1);
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.12, 0]} material={mat}>
      <ringGeometry args={[1.5, 3, 64]} />
    </mesh>
  );
}

/* ─── Hotspot ─── */
function Hotspot({ position, title, description }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.04, 0.06, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      <Html distanceFactor={6} style={{ pointerEvents: 'auto' }}>
        <div className="rg-hotspot-trigger" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div className={`rg-hotspot-card ${hovered ? 'rg-hotspot-card--visible' : ''}`}>
            <h5>{title}</h5>
            <p>{description}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function ModelScene({ isOpen }) {
  return (
    <>
      {/* Moved camera back and increased FOV slightly to ensure full 4-unit high gate fits */}
      <PerspectiveCamera makeDefault position={[0, 1.0, 8.5]} fov={40} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={512} />
      <directionalLight position={[0, 2, 8]} intensity={1.0} />
      <pointLight position={[0, -3, 2]} intensity={2.0} color="#DA1212" distance={15} decay={2} />
      <pointLight position={[-4, 3, 3]} intensity={1.5} color="#4488ff" distance={12} decay={2} />
      <spotLight position={[0, 6, 4]} angle={0.6} penumbra={0.8} intensity={2.5} color="#fff" />
      <Environment preset="city" />
      
      <DetailedGate isOpen={isOpen} />
      
      {/* Adjusted hotspots to be inside the visible frame range. gateHeight=4 => y from -2 to +2 */}
      <Hotspot position={[0, 1.8, 0.2]} title="Tubular Motor" description="High-torque motor with thermal protection inside the coil box." />
      <Hotspot position={[1.65, 0, 0.2]} title="Anti-Lift Lock" description="Prevents forced entry from outside when fully closed." />
      <Hotspot position={[-1.65, 0, 0.2]} title="Guide Track" description="Heavy-duty steel tracks for smooth, silent operation." />
      <Hotspot position={[0, -1.8, 0.2]} title="Smart Sensor" description="Infrared detection automatically reverses gate on obstruction." />

      <SceneParticles />
      <GroundPlane />
      <GlowRing />
      <OrbitControls makeDefault enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2 - 0.05} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Render-on-demand controller ─── */
function RenderController({ isVisible }) {
  useFrame(({ gl, scene, camera, invalidate }) => {
    if (isVisible) {
      gl.render(scene, camera);
      invalidate();
    }
  }, 1);
  return null;
}

export default function InteractiveModel() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rg-interactive" ref={containerRef}>
      <motion.div
        className="rg-interactive-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <span className="rg-feature-label">Product Explorer</span>
        <h2 className="rg-interactive-title">Every detail,<br />engineered.</h2>
        <p className="rg-interactive-sub">Drag to rotate. Hover hotspots for details.</p>
      </motion.div>
      <div className="rg-interactive-canvas-wrap" style={{ position: 'relative' }}>
        <Canvas
          style={{ position: 'absolute', inset: 0 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          frameloop="demand"
        >
          <RenderController isVisible={isVisible} />
          <Suspense fallback={null}><ModelScene isOpen={isOpen} /></Suspense>
        </Canvas>
        <button className="rg-lift-toggle" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close Gate' : 'Lift Gate'}</button>
      </div>
    </section>
  );
}
