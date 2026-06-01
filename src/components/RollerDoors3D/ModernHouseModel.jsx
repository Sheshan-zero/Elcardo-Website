import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';

const DOOR_W = 5.9;
const DOOR_H = 2.65;
const SLAT_COUNT = 28;

function createLeafShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.28);
  shape.bezierCurveTo(0.26, 0.16, 0.34, -0.12, 0, -0.32);
  shape.bezierCurveTo(-0.34, -0.12, -0.26, 0.16, 0, 0.28);
  return shape;
}

function TileLines({ width, height, color = '#75736f', columns = 10, rows = 5, z = 0.031 }) {
  const lines = [];

  for (let i = 1; i < columns; i += 1) {
    const x = -width / 2 + (width / columns) * i;
    lines.push(
      <mesh key={`v-${i}`} position={[x, 0, z]}>
        <boxGeometry args={[0.018, height, 0.012]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
    );
  }

  for (let i = 1; i < rows; i += 1) {
    const y = -height / 2 + (height / rows) * i;
    lines.push(
      <mesh key={`h-${i}`} position={[0, y, z]}>
        <boxGeometry args={[width, 0.018, 0.012]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
    );
  }

  return lines;
}

function RollerDoor({ color = '#343536' }) {
  const group = useRef();
  const slatMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.48,
    metalness: 0.55,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
  }), [color]);
  const shadowMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#171717', roughness: 0.9 }), []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.015;
  });

  return (
    <group ref={group}>
      <mesh position={[0, DOOR_H / 2, -0.05]}>
        <boxGeometry args={[DOOR_W + 0.18, DOOR_H + 0.12, 0.08]} />
        <meshStandardMaterial color="#171717" roughness={1} />
      </mesh>

      {Array.from({ length: SLAT_COUNT }, (_, i) => {
        const slatH = DOOR_H / SLAT_COUNT;
        const y = slatH / 2 + i * slatH;
        const isAlt = i % 2 === 0;

        return (
          <group key={`door-slat-${i}`} position={[0, y, 0.02]}>
            <mesh material={slatMat} castShadow receiveShadow>
              <boxGeometry args={[DOOR_W, slatH * 0.72, 0.075]} />
            </mesh>
            <mesh position={[0, -slatH * 0.39, 0.045]} material={shadowMat}>
              <boxGeometry args={[DOOR_W, 0.012, 0.018]} />
            </mesh>
            {isAlt && (
              <mesh position={[0, slatH * 0.1, 0.06]}>
                <boxGeometry args={[DOOR_W - 0.18, 0.01, 0.012]} />
                <meshStandardMaterial color="#57595b" roughness={0.65} metalness={0.45} />
              </mesh>
            )}
          </group>
        );
      })}

      <mesh position={[0, DOOR_H + 0.16, 0.08]} castShadow>
        <boxGeometry args={[DOOR_W + 0.85, 0.34, 0.72]} />
        <meshStandardMaterial color="#5d5d5d" roughness={0.55} metalness={0.25} />
      </mesh>
      <mesh position={[0, DOOR_H + 0.01, 0.42]}>
        <boxGeometry args={[DOOR_W - 0.25, 0.035, 0.04]} />
        <meshStandardMaterial color="#ffd98a" emissive="#ffb338" emissiveIntensity={2.7} />
      </mesh>
    </group>
  );
}

function FramedWindow({ width = 1.05, height = 2.05, mullions = false }) {
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#d8b580',
    roughness: 0.08,
    metalness: 0.15,
    transparent: true,
    opacity: 0.68,
    transmission: 0.22,
    clearcoat: 1,
  }), []);

  return (
    <group>
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[width + 0.22, height + 0.24, 0.08]} />
        <meshStandardMaterial color="#151719" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh material={glassMat} position={[0, 0, 0.035]}>
        <boxGeometry args={[width, height, 0.035]} />
      </mesh>
      {mullions && (
        <>
          <mesh position={[0, 0, 0.065]}>
            <boxGeometry args={[0.055, height + 0.1, 0.05]} />
            <meshStandardMaterial color="#202326" roughness={0.45} metalness={0.5} />
          </mesh>
          <mesh position={[0, height * 0.16, 0.066]}>
            <boxGeometry args={[width + 0.12, 0.055, 0.05]} />
            <meshStandardMaterial color="#202326" roughness={0.45} metalness={0.5} />
          </mesh>
          <mesh position={[0, -height * 0.2, 0.066]}>
            <boxGeometry args={[width + 0.12, 0.055, 0.05]} />
            <meshStandardMaterial color="#202326" roughness={0.45} metalness={0.5} />
          </mesh>
        </>
      )}
    </group>
  );
}

function WallSconce({ side = 1 }) {
  return (
    <group>
      <mesh position={[0, 0.22, 0.045]} castShadow>
        <boxGeometry args={[0.11, 0.36, 0.09]} />
        <meshStandardMaterial color="#111214" roughness={0.38} metalness={0.65} />
      </mesh>
      <pointLight position={[side * 0.04, -0.18, 0.42]} intensity={2.5} distance={3.1} color="#ffd799" />
      <mesh position={[0, -0.2, 0.14]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.25, 0.72, 20, 1, true]} />
        <meshStandardMaterial color="#ffdca0" emissive="#ffbb4a" emissiveIntensity={1.1} transparent opacity={0.34} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function PlantCluster({ count = 7 }) {
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const x = (i - count / 2) * 0.12;
        const h = 0.55 + (i % 3) * 0.18;
        return (
          <mesh key={`plant-${i}`} position={[x, h / 2 + 0.08, 0]} rotation={[0, 0, (i - 3) * 0.12]} castShadow>
            <coneGeometry args={[0.08, h, 6]} />
            <meshStandardMaterial color={i % 2 ? '#315c27' : '#477532'} roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

export function ModernHouseModel({ rotation = [0, -0.52, 0], scale = 1 }) {
  const root = useRef();
  const leafShape = useMemo(() => createLeafShape(), []);

  const whiteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f2f2f1', roughness: 0.84, metalness: 0.02 }), []);
  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8f8d88', roughness: 0.96, metalness: 0.02 }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#232426', roughness: 0.58, metalness: 0.35 }), []);
  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b9b5af', roughness: 0.9 }), []);

  useFrame((state) => {
    if (!root.current) return;
    root.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.28) * 0.025;
  });

  return (
    <group ref={root} rotation={rotation} scale={scale} position={[0, -1.85, 0]}>
      <group position={[0, 0, 0]}>
        <mesh position={[0, -0.07, 1.35]} receiveShadow>
          <boxGeometry args={[12.8, 0.14, 5.2]} />
          <meshStandardMaterial color="#aaa6a0" roughness={0.92} />
        </mesh>
        <mesh position={[0, -0.005, 0.62]} receiveShadow>
          <boxGeometry args={[11.7, 0.05, 3.6]} />
          <meshStandardMaterial color="#d4d0c8" roughness={0.9} />
        </mesh>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={`paver-x-${i}`} position={[-5.1 + i * 1.48, 0.03, 0.62]}>
            <boxGeometry args={[0.014, 0.02, 3.5]} />
            <meshStandardMaterial color="#aaa59d" roughness={1} />
          </mesh>
        ))}
        <mesh position={[0, 0.035, -1.17]}>
          <boxGeometry args={[11.7, 0.02, 0.014]} />
          <meshStandardMaterial color="#aaa59d" roughness={1} />
        </mesh>

        <mesh material={whiteMat} position={[0, 1.7, -0.18]} castShadow receiveShadow>
          <boxGeometry args={[12.0, 3.4, 0.48]} />
        </mesh>
        <mesh material={concreteMat} position={[-3.05, 1.92, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[7.25, 3.72, 0.36]} />
        </mesh>
        <TileLines width={7.25} height={3.72} columns={12} rows={4} z={0.285} />

        <mesh material={whiteMat} position={[0.95, 2.12, 0.42]} castShadow receiveShadow>
          <boxGeometry args={[5.65, 3.1, 0.62]} />
        </mesh>
        <mesh material={whiteMat} position={[1.0, 3.56, 0.72]} castShadow>
          <boxGeometry args={[6.35, 0.46, 0.88]} />
        </mesh>
        <mesh material={whiteMat} position={[1.0, 0.62, 0.73]} castShadow>
          <boxGeometry args={[6.2, 0.22, 0.74]} />
        </mesh>

        <mesh material={whiteMat} position={[0, 3.7, -1.32]} castShadow receiveShadow>
          <boxGeometry args={[12.25, 0.5, 3.0]} />
        </mesh>
        <mesh material={whiteMat} position={[0, 4.08, -1.32]} castShadow>
          <boxGeometry args={[11.75, 0.24, 2.52]} />
        </mesh>
        <mesh material={darkMat} position={[0, 4.31, -1.32]} castShadow>
          <boxGeometry args={[10.4, 0.35, 2.2]} />
        </mesh>
        <mesh material={whiteMat} position={[-2.55, 4.68, -1.36]} castShadow>
          <boxGeometry args={[3.8, 0.22, 2.0]} />
        </mesh>
        <mesh material={whiteMat} position={[-2.55, 4.88, -1.36]} castShadow>
          <boxGeometry args={[3.6, 0.2, 1.72]} />
        </mesh>

        <mesh material={whiteMat} position={[4.72, 1.55, -1.45]} castShadow receiveShadow>
          <boxGeometry args={[0.38, 3.1, 4.25]} />
        </mesh>
        <mesh material={whiteMat} position={[-5.92, 1.3, -0.82]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 2.6, 2.6]} />
        </mesh>

        <group position={[0, 0, 0.42]}>
          <RollerDoor color="#3b3d3f" />
          <mesh position={[-3.35, DOOR_H / 2, 0.1]} material={whiteMat} castShadow>
            <boxGeometry args={[0.6, DOOR_H + 0.38, 0.54]} />
          </mesh>
          <mesh position={[3.35, DOOR_H / 2, 0.1]} material={whiteMat} castShadow>
            <boxGeometry args={[0.6, DOOR_H + 0.38, 0.54]} />
          </mesh>
          <mesh position={[0, DOOR_H + 0.48, 0.12]} material={darkMat} castShadow>
            <boxGeometry args={[6.45, 0.28, 0.58]} />
          </mesh>
          <group position={[-3.7, 1.45, 0.39]}>
            <WallSconce side={-1} />
          </group>
          <group position={[3.72, 1.45, 0.39]}>
            <WallSconce side={1} />
          </group>
        </group>

        <group position={[-5.0, 1.28, 0.34]}>
          <mesh material={concreteMat} castShadow receiveShadow>
            <boxGeometry args={[1.7, 2.55, 0.2]} />
          </mesh>
          <TileLines width={1.7} height={2.55} columns={3} rows={5} z={0.115} />
          <mesh position={[0, 1.16, 0.18]} material={darkMat}>
            <boxGeometry args={[1.5, 0.08, 0.1]} />
          </mesh>
          {Array.from({ length: 4 }, (_, i) => (
            <mesh key={`vent-${i}`} position={[0, 1.35 + i * 0.1, 0.18]} material={darkMat}>
              <boxGeometry args={[1.45, 0.035, 0.1]} />
            </mesh>
          ))}
        </group>

        <group position={[5.05, 1.28, 0.36]}>
          <mesh material={darkMat} castShadow>
            <boxGeometry args={[1.12, 2.55, 0.18]} />
          </mesh>
          {Array.from({ length: 19 }, (_, i) => (
            <mesh key={`side-door-${i}`} position={[0, -1.05 + i * 0.11, 0.12]}>
              <boxGeometry args={[0.94, 0.028, 0.045]} />
              <meshStandardMaterial color={i % 2 ? '#161719' : '#343638'} roughness={0.55} metalness={0.55} />
            </mesh>
          ))}
          <mesh position={[0, 1.33, 0.14]} material={darkMat}>
            <boxGeometry args={[1.06, 0.18, 0.24]} />
          </mesh>
        </group>

        <group position={[-3.74, 2.58, 0.34]}>
          <FramedWindow width={1.8} height={2.15} mullions />
          <pointLight position={[-0.8, 0.85, 0.45]} intensity={1.25} distance={2.5} color="#ffd69c" />
        </group>

        {[-0.7, 0.75, 2.2].map((x) => (
          <group key={`narrow-window-${x}`} position={[x, 2.58, 0.78]}>
            <FramedWindow width={0.55} height={1.95} />
          </group>
        ))}

        <group position={[4.04, 2.58, 0.58]}>
          <mesh material={concreteMat} castShadow receiveShadow>
            <boxGeometry args={[1.7, 2.5, 0.22]} />
          </mesh>
          <pointLight position={[0, 0, 0.42]} intensity={3.5} distance={3.3} color="#ffc76d" />
          <mesh position={[0, 0, 0.13]}>
            <boxGeometry args={[1.18, 1.82, 0.025]} />
            <meshStandardMaterial color="#f2bf63" emissive="#ffb13c" emissiveIntensity={1.2} />
          </mesh>
          {Array.from({ length: 17 }, (_, i) => {
            const angle = -1.25 + i * 0.18;
            const radius = 0.18 + (i % 5) * 0.11;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const s = 0.34 + (i % 3) * 0.08;
            return (
              <mesh key={`leaf-cut-${i}`} position={[x, y, 0.18]} rotation={[0, 0, angle - 0.4]} scale={[s, s, s]}>
                <shapeGeometry args={[leafShape]} />
                <meshBasicMaterial color="#ffd279" side={THREE.DoubleSide} />
              </mesh>
            );
          })}
          <mesh position={[0, 0, 0.22]}>
            <circleGeometry args={[0.09, 24]} />
            <meshBasicMaterial color="#ffd279" />
          </mesh>
        </group>

        <group position={[-3.98, 0.56, 0.82]}>
          <mesh material={darkMat} castShadow>
            <boxGeometry args={[0.88, 0.22, 0.44]} />
          </mesh>
          <PlantCluster count={8} />
        </group>
        <group position={[5.77, 0.46, 0.78]}>
          <mesh material={darkMat} castShadow>
            <boxGeometry args={[0.8, 0.22, 0.42]} />
          </mesh>
          <PlantCluster count={7} />
        </group>

        <mesh position={[-3.7, 1.85, 0.73]}>
          <boxGeometry args={[0.12, 0.34, 0.035]} />
          <meshStandardMaterial color="#676767" roughness={0.8} />
        </mesh>
        <mesh position={[-3.47, 1.85, 0.73]}>
          <boxGeometry args={[0.12, 0.34, 0.035]} />
          <meshStandardMaterial color="#676767" roughness={0.8} />
        </mesh>
        <mesh position={[-3.24, 1.85, 0.73]}>
          <boxGeometry args={[0.12, 0.34, 0.035]} />
          <meshStandardMaterial color="#676767" roughness={0.8} />
        </mesh>

        <mesh position={[0, -0.03, 0.58]} rotation={[-Math.PI / 2, 0, 0]} material={floorMat} receiveShadow>
          <planeGeometry args={[10.8, 3.0]} />
        </mesh>
      </group>
    </group>
  );
}

export function ModernHouseLights() {
  return (
    <>
      {/* <SoftShadows size={30} samples={16} focus={0.5} /> */}
      <ambientLight intensity={0.54} color="#dfe7f4" />
      <directionalLight
        position={[5, 8, 7]}
        intensity={3.1}
        color="#fff0d6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-7}
      />
      <directionalLight position={[-5, 4, 5]} intensity={0.7} color="#ffffff" />
      <ContactShadows position={[0, -1.94, 0]} opacity={0.38} scale={12} blur={2.8} far={5} />
      <Environment preset="apartment" environmentIntensity={0.75} />
    </>
  );
}

export default ModernHouseModel;
