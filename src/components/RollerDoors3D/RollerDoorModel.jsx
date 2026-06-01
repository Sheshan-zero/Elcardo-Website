import React, { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';

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

  const doorW = interactive ? 5.0 : 2.0;
  const doorH = interactive ? 3.6 : 3.2;
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
  const frameTarget = useMemo(() => new THREE.Color(), []);
  const housingTarget = useMemo(() => new THREE.Color(), []);
  const dummyObj = useMemo(() => new THREE.Object3D(), []);
  
  useEffect(() => {
    targetColor.set(colorHex);
  }, [colorHex, targetColor]);

  useFrame((_, delta) => {
    timeRef.current += delta;

    // Smoothly animate colors for realistic paint transition effect
    doorMat.color.lerp(targetColor, 0.08);
    doorMat.roughness += (roughness - doorMat.roughness) * 0.08;
    doorMat.metalness += (metalness - doorMat.metalness) * 0.08;
    
    frameTarget.copy(targetColor).multiplyScalar(0.9);
    frameMat.color.lerp(frameTarget, 0.08);
    
    housingTarget.copy(targetColor).multiplyScalar(0.95);
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
      const dummy = dummyObj;
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
      const dummy = dummyObj;
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

      {/* ─── ARCHITECTURAL HOUSE EXTERIOR ─── */}
      {interactive && (() => {
        const gY = -doorH / 2;
        const wallH = doorH; // Boundary wall matches door height
        const wT = 0.50; // Wall thickness
        
        const pW = 0.8; // Pillar width
        const pD = 0.6; // Pillar depth
        const gX = doorW / 2 + pW / 2 + 0.1; // Center of pillar next to roller door

        // Right side (Pedestrian gate)
        const pedW = 1.6; // Pedestrian gate width
        const pgX = gX + pW / 2 + pedW / 2; // Center of ped gate
        const rpX = pgX + pedW / 2 + pW / 2; // Rightmost pillar

        // Left side (Feature stone wall)
        const lwW = 3.6; // Left stone wall width
        const lwX = -gX - pW / 2 - lwW / 2; // Center of left wall
        const lpX = lwX - lwW / 2 - pW / 2; // Leftmost pillar

        // House facade dimensions
        const houseW = (rpX + pW/2) - (lpX - pW/2);
        const houseX = (rpX + lpX) / 2;
        const hZ = -0.5; // House is just behind the wall

        // Materials for the realistic design
        const whiteRenderMat = new THREE.MeshStandardMaterial({ color: '#f4f4f4', roughness: 0.9, metalness: 0.05 });
        const concreteMat = new THREE.MeshStandardMaterial({ color: '#8a8d8f', roughness: 0.8, metalness: 0.1 });
        const darkMetalMat = new THREE.MeshStandardMaterial({ color: '#2b2c2d', roughness: 0.4, metalness: 0.6 });
        const warmLightMat = new THREE.MeshStandardMaterial({ color: '#ffeab3', emissive: '#ffaa00', emissiveIntensity: 2.5 });
        const glassMat = new THREE.MeshPhysicalMaterial({ color: '#050505', roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.8, clearcoat: 1.0 });

        return (
          <group>
            {/* ══ GROUND / STREET ══ */}
            <mesh rotation={[-Math.PI/2,0,0]} position={[0, gY - 0.02, 10]} receiveShadow>
              <planeGeometry args={[90, 20]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.2} /> {/* Wet asphalt look */}
            </mesh>
            <mesh rotation={[-Math.PI/2,0,0]} position={[0, gY - 0.005, 1.5]} receiveShadow>
              <planeGeometry args={[90, 3]} />
              <meshStandardMaterial color="#a0a0a0" roughness={0.9} /> {/* Sidewalk */}
            </mesh>
            <mesh position={[0, gY + 0.05, 3.0]} receiveShadow>
              <boxGeometry args={[90, 0.1, 0.2]} />
              <meshStandardMaterial color="#909090" roughness={0.86} /> {/* Kerb */}
            </mesh>

            {/* ══ CANOPY OVER ROLLER DOOR ══ */}
            <mesh material={concreteMat} position={[0, doorH / 2 + 0.15, 0.2]} castShadow>
              <boxGeometry args={[doorW + pW * 2 + 0.4, 0.3, 1.2]} />
            </mesh>
            {/* Under-canopy LED strip */}
            <mesh position={[0, doorH / 2, 0.6]}>
              <boxGeometry args={[doorW, 0.05, 0.05]} />
              <meshStandardMaterial color="#ffe8a0" emissive="#ffcc44" emissiveIntensity={3} />
            </mesh>

            {/* ══ BOUNDARY WALL & PILLARS ══ */}
            {/* Leftmost Pillar */}
            <mesh material={whiteRenderMat} position={[lpX, gY + wallH / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[pW, wallH, pD]} />
            </mesh>
            {/* Left Feature Stone Wall */}
            <mesh material={concreteMat} position={[lwX, gY + (wallH - 0.4) / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[lwW, wallH - 0.4, wT]} />
            </mesh>
            {/* Horizontal slatted vent above left stone wall */}
            {Array.from({ length: 4 }).map((_, i) => (
              <mesh key={`lvent${i}`} material={darkMetalMat} position={[lwX, gY + wallH - 0.35 + i * 0.1, 0]}>
                <boxGeometry args={[lwW, 0.04, wT - 0.05]} />
              </mesh>
            ))}

            {/* Left Main Pillar (with 123) */}
            <mesh material={whiteRenderMat} position={[-gX, gY + wallH / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[pW, wallH, pD]} />
            </mesh>
            <mesh material={darkMetalMat} position={[-gX, gY + wallH - 0.6, pD / 2 + 0.01]}>
              {/* Approximated 123 */}
              <boxGeometry args={[0.3, 0.12, 0.02]} /> 
            </mesh>
            {/* Left Pillar Sconce */}
            <mesh material={darkMetalMat} position={[-gX - 0.25, gY + wallH / 2 + 0.4, pD / 2 + 0.05]} castShadow>
              <boxGeometry args={[0.08, 0.2, 0.1]} />
            </mesh>
            <mesh material={warmLightMat} position={[-gX - 0.25, gY + wallH / 2 + 0.25, pD / 2 + 0.05]}>
              <coneGeometry args={[0.25, 0.5, 16]} />
            </mesh>

            {/* Right Main Pillar */}
            <mesh material={whiteRenderMat} position={[gX, gY + wallH / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[pW, wallH, pD]} />
            </mesh>
            {/* Right Main Pillar Sconce */}
            <mesh material={darkMetalMat} position={[gX + 0.25, gY + wallH / 2 + 0.4, pD / 2 + 0.05]} castShadow>
              <boxGeometry args={[0.08, 0.2, 0.1]} />
            </mesh>
            <mesh material={warmLightMat} position={[gX + 0.25, gY + wallH / 2 + 0.25, pD / 2 + 0.05]}>
              <coneGeometry args={[0.25, 0.5, 16]} />
            </mesh>

            {/* Pedestrian Gate (Dark Horizontal Slats) */}
            <group position={[pgX, gY + wallH / 2, 0]}>
              <mesh material={darkMetalMat} castShadow>
                <boxGeometry args={[pedW, wallH, 0.1]} />
              </mesh>
              {Array.from({ length: 20 }).map((_, i) => (
                <mesh key={`pgs${i}`} material={new THREE.MeshStandardMaterial({color: '#151515'})} position={[0, -wallH/2 + 0.2 + i * 0.15, 0.051]}>
                  <boxGeometry args={[pedW - 0.1, 0.03, 0.02]} />
                </mesh>
              ))}
            </group>

            {/* Rightmost Pillar */}
            <mesh material={whiteRenderMat} position={[rpX, gY + wallH / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[pW, wallH, pD]} />
            </mesh>


            {/* ══ UPPER HOUSE FACADE ══ */}
            <group position={[houseX, gY + wallH + 2.5, hZ]}>
              {/* Left Dark Stone Section */}
              <mesh material={concreteMat} position={[-houseW/2 + 2.5, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[5, 5.0, 0.5]} />
              </mesh>
              {/* Left Window */}
              <mesh material={glassMat} position={[-houseW/2 + 2.5, 0, 0.26]}>
                <boxGeometry args={[2.5, 3.5, 0.05]} />
              </mesh>
              <mesh material={darkMetalMat} position={[-houseW/2 + 2.5, 0, 0.28]}>
                <boxGeometry args={[2.6, 0.1, 0.06]} />
              </mesh>
              <mesh material={darkMetalMat} position={[-houseW/2 + 2.5, 0, 0.28]}>
                <boxGeometry args={[0.1, 3.6, 0.06]} />
              </mesh>

              {/* Center White Projecting Box */}
              <mesh material={whiteRenderMat} position={[0, 0.0, 0.3]} castShadow receiveShadow>
                <boxGeometry args={[6.5, 5.4, 0.6]} />
              </mesh>
              {/* 3 Narrow Windows */}
              {[-1.8, 0, 1.8].map((x, i) => (
                <group key={`win${i}`} position={[x, 0.0, 0.61]}>
                  <mesh material={glassMat}>
                    <boxGeometry args={[0.8, 4.0, 0.05]} />
                  </mesh>
                  <mesh material={darkMetalMat}>
                    <boxGeometry args={[0.9, 4.1, 0.02]} />
                  </mesh>
                </group>
              ))}

              {/* Right Dark Stone Section with Cutout */}
              <mesh material={concreteMat} position={[houseW/2 - 2.5, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[5, 5.0, 0.5]} />
              </mesh>
              
              {/* Backlit Cutout Feature */}
              <group position={[houseW/2 - 2.0, 0, 0.26]}>
                {/* Backplate emitting warm light */}
                <mesh material={warmLightMat} position={[0, 0, -0.05]}>
                  <boxGeometry args={[1.8, 2.8, 0.02]} />
                </mesh>
                {/* Concrete cover plate */}
                <mesh material={concreteMat} position={[0,0,0]}>
                   <boxGeometry args={[2.0, 3.0, 0.04]} />
                </mesh>
                {/* Simulated glowing leaf cutouts */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const dist = 0.45;
                  return (
                    <mesh key={`leaf${i}`} material={warmLightMat} position={[Math.cos(angle)*dist, Math.sin(angle)*dist, 0.03]} rotation={[0, 0, angle + Math.PI/2]}>
                      <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
                    </mesh>
                  );
                })}
                {/* Center glowing circle */}
                <mesh position={[0, 0, 0.03]}>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial color="#ffeab3" emissive="#ffaa00" emissiveIntensity={2.5} />
                </mesh>
              </group>

              {/* Roof / Eaves */}
              <mesh material={concreteMat} position={[0, 2.7, 0.2]} castShadow>
                <boxGeometry args={[houseW + 0.4, 0.4, 1.2]} />
              </mesh>
              <mesh material={darkMetalMat} position={[0, 3.1, 0.1]} castShadow>
                <boxGeometry args={[houseW - 1.0, 0.2, 1.0]} />
              </mesh>
              <mesh material={new THREE.MeshStandardMaterial({color: '#6b543c'})} position={[0, 3.4, 0.2]} castShadow>
                <boxGeometry args={[houseW - 2.0, 0.1, 1.4]} />
              </mesh>
            </group>

            {/* ── GARAGE INTERIOR (Dark void behind the door) ── */}
            <mesh material={new THREE.MeshStandardMaterial({color: '#050505', roughness: 1.0})} position={[0, gY + wallH / 2, -3.0]}>
              <boxGeometry args={[doorW + 0.2, wallH, 5.5]} />
            </mesh>

            {/* Subtle Sleek Planter Boxes (Replacing cartoony trees) */}
            <mesh material={darkMetalMat} position={[lwX, gY + 0.3, 0.5]} castShadow>
              <boxGeometry args={[lwW - 0.8, 0.6, 0.4]} />
            </mesh>
            {/* Simple abstract greenery strip */}
            <mesh material={new THREE.MeshStandardMaterial({color: '#2d4c1e', roughness: 0.9})} position={[lwX, gY + 0.65, 0.5]} castShadow>
              <boxGeometry args={[lwW - 1.0, 0.2, 0.3]} />
            </mesh>

            <mesh material={darkMetalMat} position={[rpX + 1.5, gY + 0.3, 0.5]} castShadow>
              <boxGeometry args={[2.0, 0.6, 0.4]} />
            </mesh>
            <mesh material={new THREE.MeshStandardMaterial({color: '#2d4c1e', roughness: 0.9})} position={[rpX + 1.5, gY + 0.65, 0.5]} castShadow>
              <boxGeometry args={[1.8, 0.2, 0.3]} />
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
      {/* <SoftShadows size={25} samples={16} focus={0.5} /> */}
      <Sky sunPosition={[8, 14, 6]} inclination={0.2} azimuth={0.25} rayleigh={0.6} turbidity={0.8} mieCoefficient={0.005} mieDirectionalG={0.8} />
      
      {/* Sky-like ambient — cool blue-white overhead */}
      <ambientLight intensity={0.3} color={0xd6e4f7} />
      {/* Main sun — upper-right, warm golden */}
      <directionalLight
        position={[8, 14, 6]}
        intensity={3.0}
        color={0xfff4e0}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={30}
        shadow-camera-bottom={-25}
      />
      {/* Hemisphere sky/ground — outdoor feel */}
      <hemisphereLight args={[0x87ceeb, 0x8a7a6a, 0.4]} />
      {/* Bounce fill from lower-left (light reflecting off driveway) */}
      <directionalLight position={[-6, 1, 8]} intensity={0.4} color={0xfff0d8} />
      {/* Soft front fill so the facade and gate face are visible */}
      <directionalLight position={[0, 4, 12]} intensity={0.5} color={0xffffff} />
      {/* Subtle cool rim from behind */}
      <directionalLight position={[-4, 6, -10]} intensity={0.2} color={0xc8daf0} />
      
      <React.Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={1.2} />
      </React.Suspense>
    </>
  );
}

export default RollerDoorScene;
