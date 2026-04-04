import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const RollerDoor3D = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle sine wave sliding effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float floatIntensity={2} speed={1.5}>
      <group ref={groupRef}>
        {/* Repeating slotted panels */}
        {[-1, -0.5, 0, 0.5, 1].map((y, i) => (
          <mesh key={i} position={[0, y, i * 0.05]}>
            <boxGeometry args={[3, 0.45, 0.05]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Side guides */}
        <mesh position={[-1.6, 0, 0]}>
          <boxGeometry args={[0.2, 2.5, 0.2]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.6, 0, 0]}>
          <boxGeometry args={[0.2, 2.5, 0.2]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

export default RollerDoor3D;
