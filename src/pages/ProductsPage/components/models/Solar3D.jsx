import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Solar3D = () => {
  const panelRef = useRef();

  useFrame((state) => {
    if (panelRef.current) {
      // Simulate sun tracking
      panelRef.current.rotation.x = -Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <Float floatIntensity={1} speed={2}>
      {/* Base pole */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      
      {/* Tilting Panel */}
      <group ref={panelRef} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 1.5, 0.05]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Grid lines to represent solar cells */}
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[2.5, 1.5, 0.01]} />
          <meshStandardMaterial color="#e0f2fe" wireframe={true} transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

export default Solar3D;
