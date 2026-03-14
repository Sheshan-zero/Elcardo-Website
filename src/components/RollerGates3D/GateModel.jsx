import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ============================================================
   Shared Procedural Gate Model
   - slatCount: number of slats
   - gateWidth / gateHeight: overall dimensions
   - slatOpenOffsets: array of Y-offset values per slat (for animation)
   - color: base hex color of slats
   - roughness / metalness: PBR params
   ============================================================ */

const SLAT_GAP = 0.02;

export function GateSlats({
  slatCount = 30,
  gateWidth = 3,
  gateHeight = 4,
  slatOpenOffsets = null,
  color = '#2a2a2a',
  roughness = 0.3,
  metalness = 0.85,
}) {
  const slatHeight = (gateHeight - (slatCount - 1) * SLAT_GAP) / slatCount;

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = gateWidth;
    const h = slatHeight;
    const bevel = 0.015;
    shape.moveTo(-w / 2 + bevel, -h / 2);
    shape.lineTo(w / 2 - bevel, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + bevel);
    shape.lineTo(w / 2, h / 2 - bevel);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - bevel, h / 2);
    shape.lineTo(-w / 2 + bevel, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - bevel);
    shape.lineTo(-w / 2, -h / 2 + bevel);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + bevel, -h / 2);

    const extrudeSettings = {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [gateWidth, slatHeight]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness,
        metalness,
        envMapIntensity: 1.2,
      }),
    [color, roughness, metalness]
  );

  const slats = useMemo(() => {
    const arr = [];
    for (let i = 0; i < slatCount; i++) {
      const baseY =
        -gateHeight / 2 + slatHeight / 2 + i * (slatHeight + SLAT_GAP);
      arr.push({ index: i, baseY });
    }
    return arr;
  }, [slatCount, gateHeight, slatHeight]);

  return (
    <group>
      {slats.map((s) => {
        const offsetY =
          slatOpenOffsets && slatOpenOffsets[s.index]
            ? slatOpenOffsets[s.index]
            : 0;
        return (
          <mesh
            key={s.index}
            geometry={geometry}
            material={material}
            position={[0, s.baseY + offsetY, 0]}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
  );
}

export function GateFrame({
  gateWidth = 3,
  gateHeight = 4,
  color = '#1a1a2e',
  metalness = 0.9,
  roughness = 0.25,
}) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness,
        metalness,
        envMapIntensity: 1.0,
      }),
    [color, roughness, metalness]
  );

  const railThickness = 0.12;
  const railDepth = 0.15;

  return (
    <group>
      {/* Top rail */}
      <mesh material={material} position={[0, gateHeight / 2 + railThickness / 2, 0]} castShadow>
        <boxGeometry args={[gateWidth + railThickness * 2, railThickness, railDepth]} />
      </mesh>
      {/* Bottom threshold */}
      <mesh material={material} position={[0, -gateHeight / 2 - railThickness / 2, 0]} castShadow>
        <boxGeometry args={[gateWidth + railThickness * 2, railThickness, railDepth]} />
      </mesh>
      {/* Left column */}
      <mesh material={material} position={[-gateWidth / 2 - railThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[railThickness, gateHeight + railThickness * 2, railDepth]} />
      </mesh>
      {/* Right column */}
      <mesh material={material} position={[gateWidth / 2 + railThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[railThickness, gateHeight + railThickness * 2, railDepth]} />
      </mesh>
    </group>
  );
}

export function MotorHousing({ gateWidth = 3, gateHeight = 4 }) {
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.3,
        metalness: 0.9,
      }),
    []
  );
  const ledMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ff6b00',
        emissive: '#ff6b00',
        emissiveIntensity: 0.8,
        roughness: 0.4,
        metalness: 0.6,
      }),
    []
  );

  return (
    <group position={[0, gateHeight / 2 + 0.25, 0]}>
      <mesh material={bodyMat} castShadow>
        <capsuleGeometry args={[0.12, 0.8, 8, 16]} />
      </mesh>
      {/* Emissive LED strip */}
      <mesh material={ledMat} position={[0, -0.08, 0.13]}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
      </mesh>
    </group>
  );
}

export function TrackRails({ gateHeight = 4, gateWidth = 3 }) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#333',
        roughness: 0.2,
        metalness: 0.95,
      }),
    []
  );

  return (
    <group>
      <mesh material={mat} position={[-gateWidth / 2 - 0.02, 0, 0.06]}>
        <cylinderGeometry args={[0.02, 0.02, gateHeight, 8]} />
      </mesh>
      <mesh material={mat} position={[gateWidth / 2 + 0.02, 0, 0.06]}>
        <cylinderGeometry args={[0.02, 0.02, gateHeight, 8]} />
      </mesh>
    </group>
  );
}

export function ControlPanel({ gateWidth = 3, gateHeight = 4 }) {
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );
  const screenMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#00d4ff',
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  return (
    <group position={[gateWidth / 2 + 0.3, 0, 0.1]}>
      <mesh material={bodyMat}>
        <boxGeometry args={[0.15, 0.25, 0.06]} />
      </mesh>
      <mesh material={screenMat} position={[0, 0.02, 0.031]}>
        <planeGeometry args={[0.1, 0.12]} />
      </mesh>
    </group>
  );
}
