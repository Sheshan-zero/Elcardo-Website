import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Roofing3D = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing scale effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  // Simple corrugated sheet geometry using a Box with normal displacement or just stacked planes
  return (
    <Float floatIntensity={1} speed={2}>
      <group ref={groupRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        {/* Top layer */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[3, 0.05, 2]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.4} />
        </mesh>
        
        {/* Middle layer */}
        <mesh position={[0.2, 0, -0.2]}>
          <boxGeometry args={[3, 0.05, 2]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.5} />
        </mesh>

        {/* Bottom layer */}
        <mesh position={[0.4, -0.6, -0.4]}>
          <boxGeometry args={[3, 0.05, 2]} />
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.6} />
        </mesh>

        {/* Structural beams beneath */}
        <mesh position={[0.5, -0.2, 0.5]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        <mesh position={[-0.5, 0.4, -0.5]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      </group>
    </Float>
  );
};

export default Roofing3D;
