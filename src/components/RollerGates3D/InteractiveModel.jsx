import React, { useRef, useState, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls, Html, View } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

/* ─── Detailed Gate ─── */
function DetailedGate({ isOpen }) {
  const slatCount = 14;
  const gateWidth = 3;
  const gateHeight = 4;
  const slatGap = 0.03;
  const slatHeight = (gateHeight - (slatCount - 1) * slatGap) / slatCount;

  const slatGeo = useMemo(() => new THREE.BoxGeometry(gateWidth - 0.3, slatHeight, 0.07), [gateWidth, slatHeight]);
  const slatMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.3, metalness: 0.85 }), []);
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.25, metalness: 0.9 }), []);
  const ledMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff6b00', emissive: '#ff6b00', emissiveIntensity: 0.8 }), []);
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
      <PerspectiveCamera makeDefault position={[0, 0.5, 7]} fov={40} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <Environment preset="warehouse" />
      <DetailedGate isOpen={isOpen} />
      <Hotspot position={[0, 2.4, 0.2]} title="Tubular Motor" description="High-torque motor with thermal protection." />
      <Hotspot position={[1.6, 0, 0.2]} title="Anti-Lift Lock" description="Prevents forced entry from outside." />
      <Hotspot position={[-1.6, 0, 0.2]} title="Guide Track" description="Steel tracks for smooth, silent operation." />
      <Hotspot position={[0, -1.8, 0.2]} title="Smart Sensor" description="Infrared detection with auto-reverse." />
      <OrbitControls makeDefault enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} autoRotate autoRotateSpeed={0.4} />
    </>
  );
}

export default function InteractiveModel() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="rg-interactive">
      <div className="rg-interactive-header">
        <span className="rg-feature-label">Product Explorer</span>
        <h2 className="rg-interactive-title">Every detail,<br />engineered.</h2>
        <p className="rg-interactive-sub">Drag to rotate. Hover hotspots for details.</p>
      </div>
      <div className="rg-interactive-canvas-wrap" style={{ position: 'relative' }}>
        <View style={{ position: 'absolute', inset: 0 }}>
          <Suspense fallback={null}><ModelScene isOpen={isOpen} /></Suspense>
        </View>
        <button className="rg-lift-toggle" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close Gate' : 'Lift Gate'}</button>
      </div>
    </section>
  );
}
