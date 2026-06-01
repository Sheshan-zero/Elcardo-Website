import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sky, Environment } from '@react-three/drei';

/* ── Door constants ── */
const SLAT_COUNT = 14;
const DOOR_W = 4.8;
const DOOR_H = 3.5;

/* ── House layout constants ── */
const GW = 7.5, GH = 5.0, GD = 9.0, GX = 0;
const HW = 9.5, HH = 8.0, HD = 11.0;
const HX = GX + GW / 2 + HW / 2 - 0.3; // 8.2
const HZ = -(HD / 2) + 0.5;             // -5.0
const ROOF_H = 2.8;

/* ────────────────────────────────────────────────────
   Animated roller door slats (lightweight version)
   ──────────────────────────────────────────────────── */
function HouseRollerDoor({ colorHex = '#ffffff', roughness = 0.3, metalness = 0.1, openAmount = 0 }) {
  const ref = useRef();
  const openRef = useRef(0);
  const slatH = DOOR_H / SLAT_COUNT;

  const geo = useMemo(() => new THREE.BoxGeometry(DOOR_W, slatH * 0.9, 0.055), [slatH]);

  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex),
    roughness, metalness,
    clearcoat: 0.8, clearcoatRoughness: 0.2,
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const targetColor = useMemo(() => new THREE.Color(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const slatYs = useMemo(() =>
    Array.from({ length: SLAT_COUNT }, (_, i) => -DOOR_H / 2 + slatH * 0.5 + i * slatH),
    [slatH]
  );

  useEffect(() => { targetColor.set(colorHex); }, [colorHex, targetColor]);

  useFrame(() => {
    if (!ref.current) return;

    mat.color.lerp(targetColor, 0.08);
    mat.roughness += (roughness - mat.roughness) * 0.08;
    mat.metalness += (metalness - mat.metalness) * 0.08;

    openRef.current += (openAmount - openRef.current) * 0.05;
    const amt = openRef.current;
    const travel = amt * (DOOR_H + 0.1);
    const drumY = DOOR_H / 2 + 0.22;
    const drumR = 0.13;
    const drumZ = -0.13;

    for (let i = 0; i < SLAT_COUNT; i++) {
      const pos = slatYs[i] + travel;
      if (pos <= drumY) {
        dummy.position.set(0, pos, 0);
        dummy.rotation.set(0, 0, 0);
      } else {
        const s = pos - drumY;
        const theta = s / drumR;
        dummy.position.set(
          0,
          drumY + drumR * Math.sin(theta),
          drumZ + drumR * (Math.cos(theta) - 1)
        );
        dummy.rotation.set(theta, 0, 0);
      }
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < SLAT_COUNT; i++) {
      dummy.position.set(0, slatYs[i], 0);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [slatYs, dummy]);

  return <instancedMesh ref={ref} args={[geo, mat, SLAT_COUNT]} castShadow />;
}

/* ────────────────────────────────────────────────────
   Full 3D house model
   ──────────────────────────────────────────────────── */
export function HouseModel({
  doorColorHex = '#F0EDE8',
  doorRoughness = 0.3,
  doorMetalness = 0.1,
  doorOpen = 0,
  wallColorHex = '#F4F4F4',
}) {
  /* Dynamic materials (update with user input) */
  const doorFrameMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(doorColorHex).multiplyScalar(0.85),
    roughness: 0.45, metalness: 0.35,
    clearcoat: 0.6, clearcoatRoughness: 0.2,
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(wallColorHex), roughness: 0.88, metalness: 0.05,
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    doorFrameMat.color.copy(new THREE.Color(doorColorHex).multiplyScalar(0.85));
    doorFrameMat.needsUpdate = true;
  }, [doorColorHex, doorFrameMat]);

  useEffect(() => {
    wallMat.color.set(wallColorHex);
    wallMat.needsUpdate = true;
  }, [wallColorHex, wallMat]);

  /* Proper gable roof geometry (triangular prism) */
  const roofGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-HW / 2, 0);
    shape.lineTo(HW / 2, 0);
    shape.lineTo(0, ROOF_H);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: HD + 0.6, bevelEnabled: false });
    geo.translate(0, 0, -(HD + 0.6) / 2);
    return geo;
  }, []);

  const sideW = (GW - DOOR_W) / 2 - 0.05; // width of side panels flanking the door

  return (
    <group>
      {/* ══ GROUND ══ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.05, 4]} receiveShadow>
        <planeGeometry args={[60, 32]} />
        <meshStandardMaterial color="#3d7a30" roughness={1.0} />
      </mesh>

      {/* Driveway apron */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[GX, -0.02, 6.5]} receiveShadow>
        <planeGeometry args={[GW + 2, 15]} />
        <meshStandardMaterial color="#52504e" roughness={0.96} />
      </mesh>

      {/* Path to house entry */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[HX + 3.4, -0.015, 7]} receiveShadow>
        <planeGeometry args={[2.2, 13]} />
        <meshStandardMaterial color="#8a8580" roughness={0.93} />
      </mesh>

      {/* ══ GARAGE ══ */}
      {/* Garage body */}
      <mesh position={[GX, GH / 2, -GD / 2]} castShadow receiveShadow>
        <boxGeometry args={[GW, GH, GD]} />
        <meshStandardMaterial color="#d8d4cf" roughness={0.88} metalness={0.02} />
      </mesh>

      {/* Front wall — top panel */}
      <mesh position={[GX, DOOR_H + (GH - DOOR_H) / 2 + 0.1, 0.11]} material={wallMat} castShadow>
        <boxGeometry args={[GW, GH - DOOR_H - 0.15, 0.22]} />
      </mesh>

      {/* Front wall — left side panel */}
      <mesh position={[GX - DOOR_W / 2 - sideW / 2 - 0.05, DOOR_H / 2, 0.11]} material={wallMat} castShadow>
        <boxGeometry args={[sideW, DOOR_H, 0.22]} />
      </mesh>

      {/* Front wall — right side panel */}
      <mesh position={[GX + DOOR_W / 2 + sideW / 2 + 0.05, DOOR_H / 2, 0.11]} material={wallMat} castShadow>
        <boxGeometry args={[sideW, DOOR_H, 0.22]} />
      </mesh>

      {/* Garage interior dark void */}
      <mesh position={[GX, DOOR_H / 2, -GD / 2 + 0.2]}>
        <boxGeometry args={[DOOR_W - 0.2, DOOR_H - 0.08, GD - 0.5]} />
        <meshStandardMaterial color="#060606" roughness={1.0} />
      </mesh>

      {/* Flat roof cap */}
      <mesh position={[GX, GH + 0.12, -GD / 2]} material={wallMat} castShadow>
        <boxGeometry args={[GW + 0.25, 0.24, GD + 0.25]} />
      </mesh>

      {/* Parapet front face */}
      <mesh position={[GX, GH + 0.55, 0.12]} material={wallMat} castShadow>
        <boxGeometry args={[GW + 0.25, 0.9, 0.24]} />
      </mesh>

      {/* ══ ROLLER DOOR HARDWARE ══ */}
      {/* Top header rail */}
      <mesh position={[GX, DOOR_H + 0.06, 0.03]} material={doorFrameMat} castShadow>
        <boxGeometry args={[DOOR_W + 0.16, 0.12, 0.12]} />
      </mesh>

      {/* Left guide rail */}
      <mesh position={[GX - DOOR_W / 2 - 0.06, DOOR_H / 2, 0.02]} material={doorFrameMat} castShadow>
        <boxGeometry args={[0.1, DOOR_H + 0.12, 0.14]} />
      </mesh>

      {/* Right guide rail */}
      <mesh position={[GX + DOOR_W / 2 + 0.06, DOOR_H / 2, 0.02]} material={doorFrameMat} castShadow>
        <boxGeometry args={[0.1, DOOR_H + 0.12, 0.14]} />
      </mesh>

      {/* Fascia drum housing */}
      <mesh position={[GX, DOOR_H + 0.42, -0.14]} material={doorFrameMat} castShadow>
        <boxGeometry args={[DOOR_W + 0.16, 0.58, 0.32]} />
      </mesh>

      {/* Bottom bar */}
      <mesh position={[GX, 0.04, 0.02]} material={doorFrameMat} castShadow>
        <boxGeometry args={[DOOR_W + 0.1, 0.08, 0.1]} />
      </mesh>

      {/* Animated slats — group offset to door center */}
      <group position={[GX, DOOR_H / 2, 0.02]}>
        <HouseRollerDoor
          colorHex={doorColorHex}
          roughness={doorRoughness}
          metalness={doorMetalness}
          openAmount={doorOpen}
        />
      </group>

      {/* Under-canopy LED strip */}
      <mesh position={[GX, DOOR_H + 0.66, 0.18]}>
        <boxGeometry args={[DOOR_W - 0.4, 0.04, 0.04]} />
        <meshStandardMaterial color="#ffeab3" emissive="#ffcc44" emissiveIntensity={3.0} />
      </mesh>

      {/* ══ MAIN HOUSE ══ */}
      <mesh position={[HX, HH / 2, HZ]} castShadow receiveShadow>
        <boxGeometry args={[HW, HH, HD]} />
        <meshStandardMaterial color="#e8e4df" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Connector wall between garage and house */}
      <mesh position={[GX + GW / 2 + 0.2, GH / 2, -3.2]} castShadow>
        <boxGeometry args={[0.4, GH, 6.5]} />
        <meshStandardMaterial color="#d8d4cf" roughness={0.88} />
      </mesh>

      {/* ══ GABLE ROOF (proper triangular prism) ══ */}
      <mesh geometry={roofGeo} position={[HX, HH, HZ]} castShadow>
        <meshStandardMaterial color="#2c2420" roughness={0.92} metalness={0.0} />
      </mesh>

      {/* Eave fascia — front */}
      <mesh position={[HX, HH - 0.05, HZ + HD / 2 + 0.28]} castShadow>
        <boxGeometry args={[HW + 0.65, 0.18, 0.56]} />
        <meshStandardMaterial color="#f5f3f0" roughness={0.75} />
      </mesh>

      {/* Eave fascia — back */}
      <mesh position={[HX, HH - 0.05, HZ - HD / 2 - 0.28]} castShadow>
        <boxGeometry args={[HW + 0.65, 0.18, 0.56]} />
        <meshStandardMaterial color="#f5f3f0" roughness={0.75} />
      </mesh>

      {/* Horizontal band trim on house facade */}
      <mesh position={[HX, HH * 0.52, HZ + HD / 2 + 0.08]} castShadow>
        <boxGeometry args={[HW, 0.1, 0.16]} />
        <meshStandardMaterial color="#ccc8c3" roughness={0.8} />
      </mesh>

      {/* ══ HOUSE WINDOWS ══ */}
      {/* Large ground-floor living window */}
      <mesh position={[HX - 1.5, 2.4, HZ + HD / 2 - 0.04]}>
        <boxGeometry args={[4.2, 2.8, 0.07]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[HX - 1.5, 2.4, HZ + HD / 2 - 0.01]}>
        <boxGeometry args={[4.0, 2.6, 0.04]} />
        <meshPhysicalMaterial
          color="#6090b8" roughness={0.05} metalness={0.1}
          transmission={0.7} transparent={true} opacity={0.88}
          thickness={0.3} ior={1.5} clearcoat={1.0}
        />
      </mesh>

      {/* Upper bedroom windows */}
      {[[-2.8, 6.2], [1.8, 6.2]].map(([wx, wy], i) => (
        <group key={`uw${i}`} position={[HX + wx, wy, HZ + HD / 2 - 0.04]}>
          <mesh>
            <boxGeometry args={[2.4, 1.8, 0.07]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[2.2, 1.6, 0.04]} />
            <meshPhysicalMaterial
              color="#6090b8" roughness={0.05} metalness={0.1}
              transmission={0.7} transparent={true} opacity={0.88}
              thickness={0.3} ior={1.5} clearcoat={1.0}
            />
          </mesh>
        </group>
      ))}

      {/* ══ HOUSE ENTRY ══ */}
      {/* Front door */}
      <mesh position={[HX + 3.4, 1.35, HZ + HD / 2 - 0.04]}>
        <boxGeometry args={[1.1, 2.65, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Entry canopy */}
      <mesh position={[HX + 3.4, 2.95, HZ + HD / 2 + 0.36]} castShadow>
        <boxGeometry args={[2.2, 0.14, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.45} metalness={0.4} />
      </mesh>

      {/* Entry step */}
      <mesh position={[HX + 3.4, 0.1, HZ + HD / 2 + 0.45]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.2, 0.9]} />
        <meshStandardMaterial color="#7a7570" roughness={0.9} />
      </mesh>

      {/* ══ LANDSCAPING ══ */}
      {/* Trees */}
      {[[-8.5, 0.5], [HX + 5.5, -0.5], [HX + 7.5, -3.5]].map(([x, z], i) => (
        <group key={`tree${i}`} position={[x, 0, z]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.12, 0.19, 1.5, 8]} />
            <meshStandardMaterial color="#5a3e28" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.85, 0]} castShadow>
            <coneGeometry args={[1.1, 2.0, 10]} />
            <meshStandardMaterial color="#2d5a1e" roughness={0.9} />
          </mesh>
          <mesh position={[0, 2.95, 0]} castShadow>
            <coneGeometry args={[0.75, 1.6, 10]} />
            <meshStandardMaterial color="#345e24" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.85, 0]} castShadow>
            <coneGeometry args={[0.45, 1.2, 10]} />
            <meshStandardMaterial color="#3d6e2a" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Low hedge beside driveway */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={`hg${i}`} position={[GX - GW / 2 - 0.6, 0.35, 1.2 - i * 1.2]} castShadow>
          <boxGeometry args={[0.65, 0.7, 1.0]} />
          <meshStandardMaterial color="#2a5c1a" roughness={1.0} />
        </mesh>
      ))}

      {/* Shrubs in front of garage */}
      {[[-2.0, 1.65], [0, 1.75], [2.0, 1.65]].map(([x, z], i) => (
        <mesh key={`sh${i}`} position={[GX + x, 0.38, z]} castShadow>
          <sphereGeometry args={[0.42, 8, 7]} />
          <meshStandardMaterial color="#2a5c1a" roughness={1.0} />
        </mesh>
      ))}

      {/* Entry planters at house door */}
      {[-0.9, 0.9].map((ox, i) => (
        <group key={`pb${i}`} position={[HX + 3.4 + ox, 0, HZ + HD / 2 + 0.3]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#3a3530" roughness={0.85} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.42, 0]} castShadow>
            <sphereGeometry args={[0.36, 8, 7]} />
            <meshStandardMaterial color="#2a5c1a" roughness={1.0} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ────────────────────────────────────────────────────
   Lighting — outdoor daylight optimised for house scene
   ──────────────────────────────────────────────────── */
export function HouseSceneLights() {
  return (
    <>
      {/* <SoftShadows size={30} samples={16} focus={0.5} /> */}
      <Sky
        sunPosition={[10, 15, 5]}
        inclination={0.2}
        azimuth={0.25}
        rayleigh={0.5}
        turbidity={0.7}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <ambientLight intensity={0.38} color={0xd6e4f7} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={2.8}
        color={0xfff4e0}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={25}
        shadow-camera-bottom={-20}
      />
      <hemisphereLight args={[0x87ceeb, 0x8a7a6a, 0.45]} />
      <directionalLight position={[-5, 2, 8]} intensity={0.5} color={0xfff0d8} />
      <directionalLight position={[0, 5, 14]} intensity={0.4} color={0xffffff} />
      <React.Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={1.0} />
      </React.Suspense>
    </>
  );
}

export default HouseModel;
