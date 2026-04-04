import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Ring, Torus } from '@react-three/drei';
import * as THREE from 'three';

const RingsCore = () => {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.1;
      outerRingRef.current.rotation.y += delta * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.15;
      innerRingRef.current.rotation.y += delta * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Frame Mesh */}
        <Torus ref={outerRingRef} args={[3, 0.05, 32, 64]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial 
            color="#a0aec0" 
            metalness={0.9} 
            roughness={0.1} 
            envMapIntensity={2} 
          />
        </Torus>

        {/* Inner Mechanical Ring */}
        <Torus ref={innerRingRef} args={[2.2, 0.1, 16, 64]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial 
            color="#475569" 
            metalness={1} 
            roughness={0.3}
            wireframe={true}
          />
        </Torus>

        {/* Glowing Red Core Element */}
        <Torus ref={coreRef} args={[1, 0.2, 32, 64]}>
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={2} 
            toneMapped={false} 
          />
        </Torus>
        
        {/* Abstract Inner floating geometry representing layers */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.5, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0}
            distortionScale={0}
            temporalDistortion={0}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#ffffff"
          />
        </mesh>
      </Float>
    </group>
  );
};

const ProductsHero3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#e50000" />
      
      {/* Group centered on screen */}
      <group position={[1.5, 0, -2]}>
        <RingsCore />
      </group>
    </>
  );
};

export default ProductsHero3D;
