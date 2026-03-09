import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ===== Main Torus Knot ===== */
function HeroTorusKnot() {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.06;
      meshRef.current.rotation.y = t * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.06;
      wireRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group position={[2, 0.5, 0]}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.8, 0.5, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#0A3D7A"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      </mesh>
      <lineSegments ref={wireRef}>
        <edgesGeometry args={[new THREE.TorusKnotGeometry(1.8, 0.5, 64, 8, 2, 3)]} />
        <lineBasicMaterial color="#DA1212" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

/* ===== Orbiting Ring ===== */
function OrbitRing({ radius, speed, rotAxis, color }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      if (rotAxis === 'x') ref.current.rotation.x = t * speed;
      if (rotAxis === 'y') ref.current.rotation.y = t * speed;
      if (rotAxis === 'z') ref.current.rotation.z = t * speed;
    }
  });

  return (
    <mesh ref={ref} position={[2, 0.5, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
}

/* ===== Floating Particles ===== */
function Particles() {
  const count = 120;
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const r = new THREE.Color('#DA1212');
    const b = new THREE.Color('#0A3D7A');
    const w = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const pick = Math.random();
      const c = pick < 0.35 ? r : pick < 0.7 ? b : w;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.015;
      ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
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
        opacity={0.7}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

/* ===== Floating Secondary Shapes ===== */
function FloatingShapes() {
  const octRef = useRef();
  const tetRef = useRef();
  const icoRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (octRef.current) {
      octRef.current.rotation.x = -t * 0.07;
      octRef.current.rotation.z = t * 0.05;
    }
    if (tetRef.current) {
      tetRef.current.rotation.y = t * 0.08;
      tetRef.current.rotation.z = -t * 0.04;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.04;
      icoRef.current.rotation.y = -t * 0.06;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <lineSegments ref={octRef} position={[-3, 2, -2]}>
          <edgesGeometry args={[new THREE.OctahedronGeometry(0.7, 0)]} />
          <lineBasicMaterial color="#0A3D7A" transparent opacity={0.15} />
        </lineSegments>
      </Float>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <lineSegments ref={tetRef} position={[5, -2, -1]}>
          <edgesGeometry args={[new THREE.TetrahedronGeometry(0.5, 0)]} />
          <lineBasicMaterial color="#DA1212" transparent opacity={0.12} />
        </lineSegments>
      </Float>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <lineSegments ref={icoRef} position={[-4.5, -1.5, -3]}>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(0.5, 0)]} />
          <lineBasicMaterial color="#FFFFFF" transparent opacity={0.06} />
        </lineSegments>
      </Float>
    </>
  );
}

/* ===== Main Scene Export ===== */
export default function Scene3D() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 8, 10]} intensity={0.6} color="#0A3D7A" />
        <pointLight position={[-8, -5, 5]} intensity={0.3} color="#DA1212" />
        <directionalLight position={[5, 5, 5]} intensity={0.2} color="#FFFFFF" />

        <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.3}>
          <HeroTorusKnot />
        </Float>

        <OrbitRing radius={3.2} speed={0.04} rotAxis="y" color="#0A3D7A" />
        <OrbitRing radius={3.8} speed={-0.03} rotAxis="x" color="#DA1212" />
        <OrbitRing radius={4.5} speed={0.02} rotAxis="z" color="#FFFFFF" />

        <FloatingShapes />
        <Particles />
      </Canvas>
    </div>
  );
}
