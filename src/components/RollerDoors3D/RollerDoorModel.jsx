import React, { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

/* ───────────────────────────────────────────────
   COLOR DATA — shared across sections
   ─────────────────────────────────────────────── */
export const colorOptions = [
  { name: 'Arctic White', hex: '#FFFFFF', rough: 0.2, metal: 0.1 },
  { name: 'Graphite Grey', hex: '#333538', rough: 0.4, metal: 0.15 },
  { name: 'Gloss Black', hex: '#0A0A0A', rough: 0.1, metal: 0.2 },
  { name: 'Metallic Silver', hex: '#B0B5B9', rough: 0.2, metal: 0.6 },
  { name: 'Wood Look', hex: '#8B5A2B', rough: 0.6, metal: 0.0 },
  { name: 'Custom Color', hex: '#C21E1E', rough: 0.15, metal: 0.1 },
];

/* ───────────────────────────────────────────────
   SLAT SHAPE — curved profile of real roller door
   ─────────────────────────────────────────────── */
function makeSlatShape() {
  const pts = [];
  const w = 0.5; // width ratio
  const segments = 12;

  // Basic curve for the slat
  pts.push(new THREE.Vector2(-w, 0.05));
  pts.push(new THREE.Vector2(-w, 0.02));
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = -w + (w * 2) * t;
    const bulge = Math.sin(Math.PI * t) * 0.08; // Curve out
    pts.push(new THREE.Vector2(x, 0.02 - bulge));
  }

  pts.push(new THREE.Vector2(w, 0.05));
  pts.push(new THREE.Vector2(w, -0.01));
  pts.push(new THREE.Vector2(-w, -0.01));

  const shape = new THREE.Shape();
  shape.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => shape.lineTo(p.x, p.y));
  shape.closePath();
  return shape;
}

/* ───────────────────────────────────────────────
   ROLLER DOOR SCENE COMPONENT
   Renders a fully-detailed roller door with:
   - Fascia box, drum, guide rails, slats, bottom bar
   - Configurable color, roughness, metalness
   - Open/close animation support
   ─────────────────────────────────────────────── */
export function RollerDoorScene({
  colorHex = '#E8E4DE',
  roughness = 0.55,
  metalness = 0.15,
  openAmount = 0,
  rotationY = 0,
  rotationX = 0,
  autoRotate = false,
  interactive = false,
  showFloor = true,
  exploded = false,
  wallColorHex = '#F4F4F4',
}) {
  const groupRef = useRef();
  const slatsRef = useRef();
  const gapsRef = useRef();
  const fasciaGroupRef = useRef();
  const drumGroupRef = useRef();
  const railsGroupRef = useRef();

  const doorW = interactive ? 3.5 : 2.0;
  const doorH = interactive ? 3.0 : 3.2;
  const slatCount = 18;
  const slatSpacing = doorH / slatCount;
  const railDepth = 0.18;
  const railW = 0.09;
  const fasH = 0.52;
  const fasDepth = 0.28;

  /* ── Computed slat positions ── */
  const slatPositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < slatCount; i++) {
      arr.push(-doorH / 2 + slatSpacing * 0.5 + i * slatSpacing);
    }
    return arr;
  }, []);

  /* ── Geometries (memoized) ── */
  const slatGeo = useMemo(() => {
    // Extrude the curved shape along the width of the door
    const shape = makeSlatShape();
    const extrudeSettings = { depth: doorW - 0.02, bevelEnabled: false, curveSegments: 12 };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center the geometry
    geo.computeBoundingBox();
    const centerOffset = -0.5 * (geo.boundingBox.max.x - geo.boundingBox.min.x);
    const yOffset = -0.5 * (geo.boundingBox.max.y - geo.boundingBox.min.y);
    const zOffset = -0.5 * (geo.boundingBox.max.z - geo.boundingBox.min.z);
    geo.translate(centerOffset, yOffset, zOffset);
    // Rotate so it faces forward (ExtrudeGeometry extrudes along Z, we want it along X)
    geo.rotateY(Math.PI / 2);
    // Scale down to match slatSpacing height (leave a tiny 2% seam) and realistic 0.04 depth
    const originalHeight = geo.boundingBox.max.y - geo.boundingBox.min.y;
    geo.scale(1, (slatSpacing * 0.98) / originalHeight, 0.04);
    return geo;
  }, [doorW, slatSpacing]);

  const gapGeo = useMemo(() => new THREE.BoxGeometry(doorW - 0.04, slatSpacing * 0.1, 0.01), [doorW, slatSpacing]);

  /* ── Materials (Using Physical for realistic clearcoat paint) ── */
  const doorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex),
    roughness,
    metalness,
    clearcoat: 1.0,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.0, // Restored because Physical material handles it better
  }), []);

  const frameMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex).multiplyScalar(0.9),
    roughness: 0.55,
    metalness: metalness * 0.8 + 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.2,
  }), []);

  const housingMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex).multiplyScalar(0.95),
    roughness: 0.45,
    metalness: metalness * 0.85 + 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.15,
  }), []);

  const drumInnerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x1A1A1A, roughness: 0.7, metalness: 0.5,
  }), []);

  const gapMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x0A0A0A, roughness: 0.9, metalness: 0,
  }), []);

  const sealMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x111111, roughness: 0.95, metalness: 0,
  }), []);

  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xECEAE6, roughness: 1, metalness: 0,
  }), []);

  // Side walls & pillars react to user's wall color choice
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: wallColorHex, 
    roughness: 0.88, 
    metalness: 0.05 
  }), [wallColorHex]);

  const pillarMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: wallColorHex, 
    roughness: 0.82, 
    metalness: 0.08 
  }), [wallColorHex]);

  useEffect(() => {
    wallMat.color.set(wallColorHex);
    pillarMat.color.set(wallColorHex);
    wallMat.needsUpdate = true;
    pillarMat.needsUpdate = true;
  }, [wallColorHex, wallMat, pillarMat]);

  // Fixed house colors — do NOT change with user selection
  const houseMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#e0ddd8',
    roughness: 0.7,
    metalness: 0.0,
    clearcoat: 0.15,
    clearcoatRoughness: 0.6,
  }), []);

  const trimMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#eae7e2',
    roughness: 0.55,
    metalness: 0.02,
    clearcoat: 0.2,
    clearcoatRoughness: 0.5,
  }), []);

  const roofTileMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#4a3d30',
    roughness: 0.85,
    metalness: 0.0,
    clearcoat: 0.05,
    clearcoatRoughness: 0.9,
  }), []);

  const glazingMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#88aacc',
    roughness: 0.0,
    metalness: 0.1,
    transmission: 0.75,
    transparent: true,
    opacity: 0.85,
    thickness: 0.5,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    reflectivity: 0.9,
  }), []);

  const darkMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1c1c1c',
    roughness: 0.35,
    metalness: 0.2,
    clearcoat: 0.4,
    clearcoatRoughness: 0.15,
  }), []);

  const drivewayMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#44403a',
    roughness: 0.98,
    metalness: 0.0,
  }), []);

  const stoneMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#6e6860',
    roughness: 0.92,
    metalness: 0.0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.8,
  }), []);

  /* ── Animation loop ── */
  const openRef = useRef(0);
  const explodeRef = useRef(0);
  const timeRef = useRef(0);
  
  // Target color refs for smooth lerping
  const targetColor = useMemo(() => new THREE.Color(), []);
  
  useEffect(() => {
    targetColor.set(colorHex);
  }, [colorHex, targetColor]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    // Smoothly animate colors for realistic paint transition effect
    doorMat.color.lerp(targetColor, 0.08);
    doorMat.roughness += (roughness - doorMat.roughness) * 0.08;
    doorMat.metalness += (metalness - doorMat.metalness) * 0.08;
    
    const frameTarget = targetColor.clone().multiplyScalar(0.9);
    frameMat.color.lerp(frameTarget, 0.08);
    
    const housingTarget = targetColor.clone().multiplyScalar(0.95);
    housingMat.color.lerp(housingTarget, 0.08);

    // Smoothly animate open & explode amounts
    openRef.current += (openAmount - openRef.current) * 0.05;
    explodeRef.current += ((exploded ? 1 : 0) - explodeRef.current) * 0.05;

    // Explode animations
    if (fasciaGroupRef.current) {
      fasciaGroupRef.current.position.y = explodeRef.current * 0.8;
      fasciaGroupRef.current.position.z = explodeRef.current * 0.5;
    }
    if (drumGroupRef.current) {
      drumGroupRef.current.position.y = explodeRef.current * 0.4;
    }
    if (railsGroupRef.current) {
      railsGroupRef.current.position.z = explodeRef.current * 0.6;
    }

    // Auto-rotate
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = rotationY + Math.sin(timeRef.current * 0.3) * 0.04;
    } else if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
      groupRef.current.rotation.x = rotationX;
    }

    // Animate slats (Realistic rolling mechanism)
    if (slatsRef.current) {
      const dummy = new THREE.Object3D();
      const amt = openRef.current;
      const travel = amt * (doorH - 0.2); // Total distance the door opens
      const drumY = doorH / 2 + fasH * 0.45;
      const drumR = 0.19;
      const drumZ = -0.19; // Positioned so front is at Z=0

      for (let i = 0; i < slatCount; i++) {
        const baseY = slatPositions[i];
        const pos = baseY + travel;

        if (pos <= drumY) {
          // Slat is straight
          dummy.position.set(0, pos, 0);
          dummy.rotation.set(0, 0, 0);
        } else {
          // Slat rolls around the drum
          const s = pos - drumY;
          // To simulate spiral, slightly increase radius as it wraps
          const spiralR = drumR + Math.floor(s / (Math.PI * 2 * drumR)) * 0.02; 
          const theta = s / spiralR;
          
          dummy.position.set(0, drumY + spiralR * Math.sin(theta), drumZ + spiralR * Math.cos(theta));
          dummy.rotation.set(theta, 0, 0);
        }
        
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        slatsRef.current.setMatrixAt(i, dummy.matrix);
      }
      slatsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Animate gaps
    if (gapsRef.current) {
      const dummy = new THREE.Object3D();
      const amt = openRef.current;
      const travel = amt * (doorH - 0.2);
      const drumY = doorH / 2 + fasH * 0.45;
      const drumR = 0.19;
      const drumZ = -0.19;

      for (let i = 0; i < slatCount; i++) {
        const baseY = slatPositions[i] - slatSpacing * 0.5 + 0.005;
        const pos = baseY + travel;

        if (pos <= drumY) {
          dummy.position.set(0, pos, 0);
          dummy.rotation.set(0, 0, 0);
        } else {
          const s = pos - drumY;
          const spiralR = drumR + Math.floor(s / (Math.PI * 2 * drumR)) * 0.02;
          const theta = s / spiralR;
          
          dummy.position.set(0, drumY + spiralR * Math.sin(theta), drumZ + spiralR * Math.cos(theta));
          dummy.rotation.set(theta, 0, 0);
        }
        
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        gapsRef.current.setMatrixAt(i, dummy.matrix);
      }
      gapsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  /* ── Build initial instance matrices ── */
  useEffect(() => {
    if (slatsRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < slatCount; i++) {
        dummy.position.set(0, slatPositions[i], 0);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        slatsRef.current.setMatrixAt(i, dummy.matrix);
      }
      slatsRef.current.instanceMatrix.needsUpdate = true;
    }
    if (gapsRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < slatCount; i++) {
        dummy.position.set(0, slatPositions[i] - slatSpacing * 0.5 + 0.005, 0.04);
        dummy.scale.set(1, 1, 1);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        gapsRef.current.setMatrixAt(i, dummy.matrix);
      }
      gapsRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  /* ── Bolt positions for guide rails ── */
  const boltPositions = useMemo(() => {
    const positions = [];
    const railH = doorH + fasH * 0.1;
    [-1, 1].forEach(side => {
      for (let b = 0; b < 5; b++) {
        positions.push({
          x: side * (doorW / 2 + railW / 2),
          y: -0.02 - railH / 2 + (b + 0.5) * (railH / 5),
          z: 0.02,
          side,
        });
      }
    });
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {/* ─── FASCIA BOX ─── */}
      <group ref={fasciaGroupRef}>
        <mesh position={[0, doorH / 2 + fasH / 2, -fasDepth / 2 + 0.04]} material={housingMat} castShadow>
          <boxGeometry args={[doorW + railW * 2 + 0.02, fasH, fasDepth]} />
        </mesh>
        {/* Fascia top cap */}
        <mesh position={[0, doorH / 2 + fasH + 0.012, -fasDepth / 2 + 0.04]} material={frameMat}>
          <boxGeometry args={[doorW + railW * 2 + 0.02, 0.025, fasDepth]} />
        </mesh>
        {/* Fascia bottom lip */}
        <mesh position={[0, doorH / 2 + 0.015, 0.02]} material={frameMat}>
          <boxGeometry args={[doorW + railW * 2 + 0.02, 0.03, 0.04]} />
        </mesh>
      </group>

      {/* ─── DRUM ─── */}
      <group ref={drumGroupRef}>
        {/* Main Drum Barrel */}
        <mesh
          position={[0, doorH / 2 + fasH * 0.45, -fasDepth * 0.3]}
          rotation={[0, 0, Math.PI / 2]}
          material={housingMat}
          castShadow
        >
          <cylinderGeometry args={[0.19, 0.19, doorW + 0.05, 40]} />
        </mesh>
        {/* Inner drum shaft */}
        <mesh
          position={[0, doorH / 2 + fasH * 0.45, -fasDepth * 0.3]}
          rotation={[0, 0, Math.PI / 2]}
          material={drumInnerMat}
        >
          <cylinderGeometry args={[0.07, 0.07, doorW + 0.1, 24]} />
        </mesh>
        
        {/* Tubular Motor Unit (Right side) */}
        <mesh
          position={[doorW / 2 + 0.12, doorH / 2 + fasH * 0.45, -fasDepth * 0.3]}
          rotation={[0, 0, Math.PI / 2]}
          material={drumInnerMat}
          castShadow
        >
          <cylinderGeometry args={[0.08, 0.08, 0.25, 24]} />
        </mesh>
        {/* Motor End Cap / Manual Override Ring */}
        <mesh
          position={[doorW / 2 + 0.26, doorH / 2 + fasH * 0.45, -fasDepth * 0.3]}
          rotation={[0, 0, Math.PI / 2]}
          material={housingMat}
          castShadow
        >
          <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
        </mesh>
        {/* Motor wiring/connector detail */}
        <mesh
          position={[doorW / 2 + 0.26, doorH / 2 + fasH * 0.45 - 0.08, -fasDepth * 0.3 + 0.02]}
          material={drumInnerMat}
        >
          <boxGeometry args={[0.02, 0.04, 0.02]} />
        </mesh>
      </group>

      {/* ─── GUIDE RAILS ─── */}
      <group ref={railsGroupRef}>
        {[-1, 1].map(side => {
          const railH = doorH + fasH * 0.1;
          const railY = -0.02;
          return (
            <group key={`rail-${side}`}>
              {/* Back plate */}
              <mesh position={[side * (doorW / 2 + railW / 2), railY, -railDepth / 2]} material={frameMat} castShadow>
                <boxGeometry args={[railW, railH, railDepth]} />
              </mesh>
              {/* Front flange */}
              <mesh position={[side * (doorW / 2 + railW / 2), railY, 0.01]} material={frameMat}>
                <boxGeometry args={[railW, railH, 0.02]} />
              </mesh>
              {/* Inner wall */}
              <mesh position={[side * (doorW / 2 - 0.008), railY, -railDepth / 2]} material={frameMat}>
                <boxGeometry args={[0.015, railH, railDepth]} />
              </mesh>
              {/* Outer cover */}
              <mesh position={[side * (doorW / 2 + railW + 0.006), railY, -railDepth / 2]} material={frameMat}>
                <boxGeometry args={[0.015, railH, railDepth]} />
              </mesh>
            </group>
          );
        })}
        {/* Bolts */}
        {boltPositions.map((bp, i) => (
          <mesh key={`bolt-${i}`} position={[bp.x, bp.y, bp.z]} rotation={[0, 0, Math.PI / 2 * bp.side]} material={drumInnerMat}>
            <cylinderGeometry args={[0.012, 0.012, 0.015, 8]} />
          </mesh>
        ))}
      </group>

      {/* ─── BOTTOM BAR ─── */}
      <mesh position={[0, -doorH / 2, -0.01]} material={frameMat} castShadow>
        <boxGeometry args={[doorW + 0.04, 0.06, 0.09]} />
      </mesh>

      {/* Bottom seal */}
      <mesh position={[0, -doorH / 2 - 0.04, 0.01]} material={sealMat}>
        <boxGeometry args={[doorW + 0.04, 0.018, 0.04]} />
      </mesh>

      {/* ─── CURTAIN SLATS (instanced) ─── */}
      <instancedMesh ref={slatsRef} args={[slatGeo, doorMat, slatCount]} castShadow receiveShadow />

      {/* ─── GAP LINES (instanced) ─── */}
      <instancedMesh ref={gapsRef} args={[gapGeo, gapMat, slatCount]} />

      {/* ─── FLOOR ─── */}
      {showFloor && !interactive && (
        <mesh position={[0, -doorH / 2 - 0.07, -1]} rotation={[-Math.PI / 2, 0, 0]} material={floorMat} receiveShadow>
          <planeGeometry args={[6, 3]} />
        </mesh>
      )}

      {/* ─── REALISTIC HOUSE FACADE & WALLS ─── */}
      {interactive && (() => {
        const pH = doorH + 1.4;        // pillar height
        const pW = 0.75;               // pillar width
        const wallH = doorH + 0.6;     // boundary wall height
        const houseDepth = 10;
        const houseW = 18;
        const houseH = 7;
        const gY = -doorH / 2;         // ground Y

        return (
          <group>
            {/* ── DRIVEWAY (tarmac + kerb lines) ── */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, gY - 0.01, 3]} receiveShadow material={drivewayMat}>
              <planeGeometry args={[doorW + pW * 2 + 1, 12]} />
            </mesh>
            {/* Wide ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, gY - 0.015, 0]} receiveShadow material={drivewayMat}>
              <planeGeometry args={[40, 40]} />
            </mesh>

            {/* ── BOUNDARY GATE PILLARS ── */}
            {/* Left pillar */}
            <group position={[-(doorW / 2) - pW / 2 - 0.12, gY + pH / 2 - 0.3, 0]}>
              <mesh material={pillarMat} castShadow receiveShadow>
                <boxGeometry args={[pW, pH, pW * 0.9]} />
              </mesh>
              {/* Pillar cap */}
              <mesh material={trimMat} position={[0, pH / 2 + 0.06, 0]} castShadow>
                <boxGeometry args={[pW + 0.06, 0.12, pW * 0.9 + 0.06]} />
              </mesh>
              {/* Cap pyramid top */}
              <mesh material={roofTileMat} position={[0, pH / 2 + 0.2, 0]} castShadow>
                <coneGeometry args={[0.42, 0.32, 4]} />
              </mesh>
            </group>
            {/* Right pillar */}
            <group position={[(doorW / 2) + pW / 2 + 0.12, gY + pH / 2 - 0.3, 0]}>
              <mesh material={pillarMat} castShadow receiveShadow>
                <boxGeometry args={[pW, pH, pW * 0.9]} />
              </mesh>
              <mesh material={trimMat} position={[0, pH / 2 + 0.06, 0]} castShadow>
                <boxGeometry args={[pW + 0.06, 0.12, pW * 0.9 + 0.06]} />
              </mesh>
              <mesh material={roofTileMat} position={[0, pH / 2 + 0.2, 0]} castShadow>
                <coneGeometry args={[0.42, 0.32, 4]} />
              </mesh>
            </group>

            {/* ── BOUNDARY SIDE WALLS (user-colorable) ── */}
            {/* Left wall */}
            <group position={[-(doorW / 2) - pW - 3.5, gY + wallH / 2 - 0.2, 0]}>
              <mesh material={wallMat} castShadow receiveShadow>
                <boxGeometry args={[7, wallH, 0.38]} />
              </mesh>
              {/* Wall top coping */}
              <mesh material={trimMat} position={[0, wallH / 2 + 0.05, 0]}>
                <boxGeometry args={[7.05, 0.10, 0.44]} />
              </mesh>
            </group>
            {/* Right wall */}
            <group position={[(doorW / 2) + pW + 3.5, gY + wallH / 2 - 0.2, 0]}>
              <mesh material={wallMat} castShadow receiveShadow>
                <boxGeometry args={[7, wallH, 0.38]} />
              </mesh>
              <mesh material={trimMat} position={[0, wallH / 2 + 0.05, 0]}>
                <boxGeometry args={[7.05, 0.10, 0.44]} />
              </mesh>
            </group>

            {/* ── PREMIUM MODERN HOUSE ── */}
            <group position={[0, gY, -2]}>
              {/* Ground floor — dark stone cladding */}
              <mesh material={stoneMat} position={[0, 1.5, -4]} castShadow receiveShadow>
                <boxGeometry args={[14, 3.0, 8]} />
              </mesh>
              {/* First floor — white render */}
              <mesh material={houseMat} position={[0, 4.2, -4]} castShadow receiveShadow>
                <boxGeometry args={[14, 2.4, 8]} />
              </mesh>
              {/* Second floor — cantilevered */}
              <mesh material={houseMat} position={[2, 7.0, -4]} castShadow receiveShadow>
                <boxGeometry args={[10, 2.8, 7.5]} />
              </mesh>
              {/* Flat roof slabs */}
              <mesh material={darkMat} position={[0, 5.5, -4]} castShadow>
                <boxGeometry args={[14.6, 0.22, 8.5]} />
              </mesh>
              <mesh material={darkMat} position={[2, 8.5, -4]} castShadow>
                <boxGeometry args={[10.6, 0.22, 8]} />
              </mesh>
              {/* Shadow gaps */}
              <mesh material={darkMat} position={[0, 3.05, 0.06]}>
                <boxGeometry args={[14.1, 0.1, 0.15]} />
              </mesh>
              {/* Canopy over gate */}
              <mesh material={darkMat} position={[0, doorH + 0.3, 0.8]} castShadow>
                <boxGeometry args={[doorW + 2, 0.18, 1.4]} />
              </mesh>
              {/* LED accent strip under canopy */}
              <mesh position={[0, doorH + 0.18, 0.3]}>
                <boxGeometry args={[doorW + 1.6, 0.04, 0.04]} />
                <meshStandardMaterial color="#ffcc66" emissive="#ffcc66" emissiveIntensity={2} />
              </mesh>
              {/* LED strip between floors */}
              <mesh position={[0, 5.38, 0.08]}>
                <boxGeometry args={[14, 0.03, 0.03]} />
                <meshStandardMaterial color="#ffcc66" emissive="#ffcc66" emissiveIntensity={1.5} />
              </mesh>
              {/* Accent cladding strip */}
              <mesh material={roofTileMat} position={[-6.2, 4.2, 0.06]} castShadow>
                <boxGeometry args={[1.2, 2.4, 0.14]} />
              </mesh>
              {/* Ground floor — full-height windows */}
              {[-4.8, 4.8].map((x, i) => (
                <group key={'gw'+i} position={[x, 1.5, 0.06]}>
                  <mesh material={darkMat}><boxGeometry args={[2.8, 2.6, 0.12]} /></mesh>
                  <mesh material={glazingMat} position={[0, 0, 0.07]}><boxGeometry args={[2.5, 2.3, 0.04]} /></mesh>
                </group>
              ))}
              {/* First floor — panoramic window left */}
              <group position={[-4.2, 4.2, 0.06]}>
                <mesh material={darkMat}><boxGeometry args={[4.2, 2.0, 0.12]} /></mesh>
                <mesh material={glazingMat} position={[0, 0, 0.07]}><boxGeometry args={[3.9, 1.7, 0.04]} /></mesh>
                {[-1.3, 0, 1.3].map((dx, i) => (
                  <mesh key={i} material={darkMat} position={[dx, 0, 0.1]}><boxGeometry args={[0.06, 1.7, 0.04]} /></mesh>
                ))}
              </group>
              {/* First floor — balcony glass railing */}
              <group position={[-4.2, 3.05, 0.6]}>
                <mesh material={glazingMat}><boxGeometry args={[4.2, 0.7, 0.05]} /></mesh>
                <mesh material={darkMat} position={[0, 0.38, 0]}><boxGeometry args={[4.2, 0.06, 0.06]} /></mesh>
                {[-2.1, 2.1].map((dx, i) => (
                  <mesh key={i} material={darkMat} position={[dx, 0, 0]}><boxGeometry args={[0.06, 0.7, 0.06]} /></mesh>
                ))}
              </group>
              {/* First floor window right */}
              <group position={[4.8, 4.2, 0.06]}>
                <mesh material={darkMat}><boxGeometry args={[3.2, 2.0, 0.12]} /></mesh>
                <mesh material={glazingMat} position={[0, 0, 0.07]}><boxGeometry args={[2.9, 1.7, 0.04]} /></mesh>
              </group>
              {/* Second floor windows */}
              <group position={[3.5, 7.0, 0.06]}>
                <mesh material={darkMat}><boxGeometry args={[5.0, 2.2, 0.12]} /></mesh>
                <mesh material={glazingMat} position={[0, 0, 0.07]}><boxGeometry args={[4.7, 1.9, 0.04]} /></mesh>
                <mesh material={darkMat} position={[0, 0, 0.1]}><boxGeometry args={[0.06, 1.9, 0.04]} /></mesh>
              </group>
              <group position={[-1, 7.0, 0.06]}>
                <mesh material={darkMat}><boxGeometry args={[1.8, 2.2, 0.12]} /></mesh>
                <mesh material={glazingMat} position={[0, 0, 0.07]}><boxGeometry args={[1.5, 1.9, 0.04]} /></mesh>
              </group>
              {/* Entry recess */}
              <mesh material={darkMat} position={[0, 1.5, 0.06]}>
                <boxGeometry args={[doorW + 1.6, 3.0, 0.18]} />
              </mesh>
            </group>

            {/* ── TREES & LANDSCAPING ── */}
            {/* Tree helper: trunk (cylinder) + canopy (sphere) */}
            {[
              { x: -9.5, z: 1, s: 1.0 },
              { x: 10, z: 0.5, s: 1.2 },
              { x: -12, z: -3, s: 0.8 },
              { x: 13, z: -2, s: 0.9 },
            ].map((t, i) => (
              <group key={'tree'+i} position={[t.x, gY, t.z]}>
                {/* Trunk */}
                <mesh castShadow position={[0, 1.2 * t.s, 0]}>
                  <cylinderGeometry args={[0.12 * t.s, 0.18 * t.s, 2.4 * t.s, 8]} />
                  <meshStandardMaterial color="#4a3828" roughness={0.95} />
                </mesh>
                {/* Canopy layers */}
                <mesh castShadow position={[0, 3.2 * t.s, 0]}>
                  <sphereGeometry args={[1.6 * t.s, 12, 10]} />
                  <meshStandardMaterial color="#2d5a1e" roughness={0.9} />
                </mesh>
                <mesh castShadow position={[0.3 * t.s, 3.8 * t.s, -0.2 * t.s]}>
                  <sphereGeometry args={[1.2 * t.s, 10, 8]} />
                  <meshStandardMaterial color="#3a6e28" roughness={0.85} />
                </mesh>
              </group>
            ))}
            {/* Small shrubs along the boundary walls */}
            {[-6, -5, -4.2, 5, 5.8, 6.6].map((x, i) => (
              <mesh key={'shrub'+i} position={[x, gY + 0.35, 0.6]} castShadow>
                <sphereGeometry args={[0.4, 8, 6]} />
                <meshStandardMaterial color="#2a5218" roughness={0.92} />
              </mesh>
            ))}
            {/* Grass patches */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9, gY + 0.01, 1]}>
              <planeGeometry args={[4, 5]} />
              <meshStandardMaterial color="#3a6830" roughness={0.98} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, gY + 0.01, 0.5]}>
              <planeGeometry args={[5, 4]} />
              <meshStandardMaterial color="#3a6830" roughness={0.98} />
            </mesh>
          </group>
        );
      })()}
    </group>
  );
}

/* ───────────────────────────────────────────────
   STANDARD LIGHTS
   ─────────────────────────────────────────────── */
export function SceneLights() {
  return (
    <>
      {/* Sky-like ambient — cool blue-white overhead */}
      <ambientLight intensity={0.55} color={0xd6e4f7} />
      {/* Main sun — upper-right, warm golden */}
      <directionalLight
        position={[8, 14, 6]}
        intensity={2.2}
        color={0xfff4e0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      {/* Hemisphere sky/ground — outdoor feel */}
      <hemisphereLight args={[0x87ceeb, 0x8a7a6a, 0.5]} />
      {/* Bounce fill from lower-left (light reflecting off driveway) */}
      <directionalLight position={[-6, 1, 8]} intensity={0.55} color={0xfff0d8} />
      {/* Soft front fill so the facade and gate face are visible */}
      <directionalLight position={[0, 4, 12]} intensity={0.7} color={0xffffff} />
      {/* Subtle cool rim from behind */}
      <directionalLight position={[-4, 6, -10]} intensity={0.3} color={0xc8daf0} />
      <React.Suspense fallback={null}>
        <Environment preset="sunset" />
      </React.Suspense>
    </>
  );
}

export default RollerDoorScene;
