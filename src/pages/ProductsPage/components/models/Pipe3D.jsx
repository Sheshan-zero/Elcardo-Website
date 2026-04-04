import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Pipe3D = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float floatIntensity={1.5} speed={1.5}>
      <group ref={groupRef}>
        {/* Main large pipe */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Parallel smaller pipe */}
        <mesh position={[0.8, -0.5, 0.5]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.2, 0.2, 2.5, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.3} />
        </mesh>
        
        {/* Intersecting connector pipe */}
        <mesh position={[0.2, 0, 0.3]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Highlight inner glow or liquid flow illusion */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.49, 0.49, 3.01, 32]} />
          <meshStandardMaterial color="#e60000" wireframe={true} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

export default Pipe3D;
