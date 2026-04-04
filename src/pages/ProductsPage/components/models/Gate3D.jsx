import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Gate3D = () => {
  const leftDoor = useRef();
  const rightDoor = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Slow open/close animation
    const angle = Math.sin(time * 0.5) * 0.3; 
    
    if (leftDoor.current && rightDoor.current) {
      leftDoor.current.rotation.y = angle;
      rightDoor.current.rotation.y = -angle;
    }
  });

  return (
    <Float floatIntensity={1.5} speed={1}>
      <group>
        {/* Left Gate Panel */}
        <group ref={leftDoor} position={[-1.5, 0, 0]}>
          <mesh position={[0.75, 0, 0]}>
            <boxGeometry args={[1.5, 2, 0.1]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} wireframe={true} />
          </mesh>
          {/* Solid accent */}
          <mesh position={[0.75, 0, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.12]} />
            <meshStandardMaterial color="#e60000" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>

        {/* Right Gate Panel */}
        <group ref={rightDoor} position={[1.5, 0, 0]}>
          <mesh position={[-0.75, 0, 0]}>
            <boxGeometry args={[1.5, 2, 0.1]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} wireframe={true} />
          </mesh>
          <mesh position={[-0.75, 0, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.12]} />
            <meshStandardMaterial color="#e60000" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

export default Gate3D;
