import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

/* ─── Realistic Dimensions (meters) ─── */
const DOOR_W = 3.2;        // overall width
const DOOR_H = 3.6;        // overall height
const SLAT_COUNT = 32;
const SLAT_H = DOOR_H / SLAT_COUNT;
const SLAT_DEPTH = 0.028;
const SLAT_GAP = 0.003;
const RAIL_W = 0.08;
const RAIL_D = 0.10;
const DRUM_R = 0.30;
const DRUM_L = DOOR_W + 0.30;
const HOUSING_H = 0.72;
const HOUSING_D = 0.72;
const MOTOR_R = 0.11;
const MOTOR_L = 0.52;
const BRACKET_T = 0.05;
const FRAME_CLR = '#1A2332';

/* ─── Material Presets ─── */
function makeMaterials(hex = '#e0e0e4', finish = 'metallic') {
  const isWood  = finish === 'wood';
  const isMatte = finish === 'matte';

  const slatRoughness  = isWood ? 0.65 : isMatte ? 0.55 : 0.20;
  const slatMetalness  = isWood ? 0.0  : isMatte ? 0.25 : 0.82;
  const slatEnvMap     = isWood ? 0.6  : isMatte ? 0.8  : 2.2;

  return {
    slat: new THREE.MeshPhysicalMaterial({
      color: hex,
      roughness: slatRoughness,
      metalness: slatMetalness,
      envMapIntensity: slatEnvMap,
      clearcoat: isMatte ? 0 : 0.15,
      clearcoatRoughness: 0.4,
    }),
    frame: new THREE.MeshStandardMaterial({
      color: FRAME_CLR,
      roughness: 0.22,
      metalness: 0.88,
      envMapIntensity: 1.4,
    }),
    motor: new THREE.MeshStandardMaterial({
      color: '#1A2332',
      roughness: 0.30,
      metalness: 0.72,
      envMapIntensity: 1.6,
    }),
    drumInner: new THREE.MeshStandardMaterial({
      color: '#2e2e32',
      roughness: 0.35,
      metalness: 0.75,
    }),
    bracket: new THREE.MeshStandardMaterial({
      color: '#2c2c30',
      roughness: 0.28,
      metalness: 0.82,
    }),
    rubber: new THREE.MeshStandardMaterial({
      color: '#111114',
      roughness: 0.85,
      metalness: 0.05,
    }),
    sensor: new THREE.MeshStandardMaterial({
      color: '#CC2929',
      roughness: 0.4,
      metalness: 0.3,
      emissive: '#CC2929',
      emissiveIntensity: 0.15,
    }),
  };
}

/* ─── Shared Geometries (created once) ─── */
const geoCache = {};
function getGeo(key, fn) {
  if (!geoCache[key]) geoCache[key] = fn();
  return geoCache[key];
}

/* ─── Individual Slat with rounded profile ─── */
function Slat({ index, material, springOpen, total }) {
  const ref = useRef();
  const baseY = -DOOR_H / 2 + (index + 0.5) * SLAT_H;

  // rounded box for each slat
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const w = (DOOR_W - RAIL_W * 2 - 0.04) / 2;
    const h = (SLAT_H - SLAT_GAP) / 2;
    const r = 0.004;
    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);
    const extSettings = { depth: SLAT_DEPTH, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 2 };
    return new THREE.ExtrudeGeometry(shape, extSettings);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const p = springOpen.get();
    const travel = DOOR_H + 0.8;
    const y = baseY + p * travel;
    const drumY = DOOR_H / 2 + DRUM_R + 0.18;

    if (y > drumY) {
      // wrap around drum
      const dist = y - drumY;
      const angle = dist / DRUM_R;
      ref.current.position.set(0, drumY + Math.cos(angle) * DRUM_R * 0.5, -DRUM_R + Math.sin(angle) * DRUM_R * 0.3);
      ref.current.rotation.x = angle * 0.5;
      ref.current.scale.setScalar(Math.max(0, 1 - (dist / (DOOR_H * 0.5))));
    } else {
      ref.current.position.set(0, y, 0);
      ref.current.rotation.x = 0;
      ref.current.scale.setScalar(1);
    }
  });

  return (
    <mesh ref={ref} geometry={geo} material={material} castShadow receiveShadow rotation={[0, 0, 0]} />
  );
}

/* ─── Bottom Bar (T-section) ─── */
function BottomBar({ material, rubberMat, springOpen }) {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    const p = springOpen.get();
    const y = -DOOR_H / 2 - 0.03 + p * (DOOR_H + 0.8);
    ref.current.position.y = y;
    ref.current.visible = p < 0.08;
  });

  return (
    <group ref={ref}>
      {/* main bar */}
      <mesh material={material} castShadow>
        <boxGeometry args={[DOOR_W - RAIL_W * 2, 0.05, 0.06]} />
      </mesh>
      {/* rubber seal */}
      <mesh material={rubberMat} position={[0, -0.035, 0]}>
        <boxGeometry args={[DOOR_W - RAIL_W * 2 - 0.02, 0.02, 0.065]} />
      </mesh>
    </group>
  );
}

/* ─── Guide Rail (L-profile) ─── */
function GuideRail({ side, material, bracketMat }) {
  const x = side * (DOOR_W / 2 + RAIL_W / 2);
  return (
    <group position={[x, 0, 0]}>
      {/* vertical rail */}
      <mesh material={material} castShadow>
        <boxGeometry args={[RAIL_W, DOOR_H + 0.6, RAIL_D]} />
      </mesh>
      {/* inner lip */}
      <mesh material={material} position={[-side * RAIL_W * 0.3, 0, RAIL_D / 2 + 0.01]}>
        <boxGeometry args={[RAIL_W * 0.4, DOOR_H + 0.5, 0.025]} />
      </mesh>
      {/* floor anchor */}
      <mesh material={bracketMat} position={[0, -DOOR_H / 2 - 0.15, 0]}>
        <boxGeometry args={[RAIL_W + 0.06, 0.12, RAIL_D + 0.04]} />
      </mesh>
      {/* top mounting bracket */}
      <mesh material={bracketMat} position={[side * 0.02, DOOR_H / 2 + 0.3, RAIL_D / 2 + 0.02]}>
        <boxGeometry args={[RAIL_W + 0.04, 0.16, BRACKET_T]} />
      </mesh>
    </group>
  );
}

/* ─── Drum Housing (box + internal cylinder) ─── */
function DrumHousing({ materials }) {
  const housingY = DOOR_H / 2 + HOUSING_H / 2 + 0.1;
  return (
    <group position={[0, housingY, -HOUSING_D / 2 + 0.05]}>
      {/* outer housing shell */}
      <mesh material={materials.frame} castShadow>
        <boxGeometry args={[DRUM_L, HOUSING_H, HOUSING_D]} />
      </mesh>
      {/* end plates */}
      {[-1, 1].map((s) => (
        <mesh key={s} material={materials.bracket} position={[s * (DRUM_L / 2 + 0.02), 0, 0]}>
          <boxGeometry args={[0.04, HOUSING_H - 0.06, HOUSING_D - 0.06]} />
        </mesh>
      ))}
      {/* internal drum cylinder */}
      <mesh material={materials.drumInner} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[DRUM_R, DRUM_R, DRUM_L - 0.2, 48]} />
      </mesh>
      {/* drum shaft */}
      <mesh material={materials.bracket} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, DRUM_L + 0.1, 16]} />
      </mesh>
    </group>
  );
}

/* ─── Motor Unit ─── */
function MotorUnit({ materials }) {
  const housingY = DOOR_H / 2 + HOUSING_H / 2 + 0.1;
  const motorX = -DRUM_L / 2 + 0.18;
  return (
    <group position={[motorX, housingY, -HOUSING_D / 2 + 0.05]}>
      {/* motor body */}
      <mesh material={materials.motor} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[MOTOR_R, MOTOR_R, MOTOR_L, 32]} />
      </mesh>
      {/* motor end cap */}
      <mesh material={materials.bracket} position={[-MOTOR_L / 2 - 0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[MOTOR_R + 0.02, MOTOR_R - 0.01, 0.04, 32]} />
      </mesh>
      {/* connector ribbing */}
      {[0.08, 0.16, 0.24].map((offset) => (
        <mesh key={offset} material={materials.bracket} position={[MOTOR_L / 2 - offset, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[MOTOR_R + 0.005, 0.006, 8, 24]} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Safety Sensors ─── */
function SafetySensors({ materials }) {
  const sensorY = -DOOR_H / 2 + 0.15;
  return (
    <>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (DOOR_W / 2 + RAIL_W + 0.06), sensorY, RAIL_D / 2 + 0.02]}>
          {/* sensor housing */}
          <mesh material={materials.frame}>
            <boxGeometry args={[0.035, 0.06, 0.03]} />
          </mesh>
          {/* sensor lens */}
          <mesh material={materials.sensor} position={[0, 0, 0.018]}>
            <sphereGeometry args={[0.008, 16, 16]} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ─── Main Model ─── */
export default function RollerDoorModel({
  state = 'interactive',
  colorHex = '#e0e0e4',
  finish = 'metallic',
  openProgress = 0,
  explodedProgress = 0,
}) {
  const materials = useMemo(() => makeMaterials(colorHex, finish), [colorHex, finish]);

  const { springOpen } = useSpring({
    springOpen: openProgress,
    config: { mass: 1.2, tension: 90, friction: 24 },
  });

  const { springExplode } = useSpring({
    springExplode: explodedProgress,
    config: { mass: 1, tension: 70, friction: 22 },
  });

  // Exploded offsets
  const drumYOff = springExplode.to((e) => e * 1.2);
  const motorZOff = springExplode.to((e) => e * -2.0);
  const railXOff = springExplode.to((e) => e * 0.7);

  // Camera position based on mode
  const camPos = state === 'motor'
    ? [-3, 3, 4]
    : state === 'color'
    ? [0, 0.5, 6.5]
    : [0, 0.3, 7.5];

  const camFov = state === 'motor' ? 30 : state === 'color' ? 34 : 36;

  return (
    <>
      <PerspectiveCamera makeDefault position={camPos} fov={camFov} />

      {/* Lighting — studio setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[8, 14, 8]}
        intensity={1.8}
        castShadow
        shadow-mapSize={2048}
        shadow-bias={-0.0005}
        shadow-camera-far={30}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight position={[-5, 8, -4]} intensity={0.4} />
      <spotLight position={[-6, 5, 12]} angle={0.35} penumbra={1} intensity={0.6} />
      <spotLight position={[6, 3, 8]} angle={0.5} penumbra={0.8} intensity={0.3} color="#dde4f0" />

      <Environment preset="studio" environmentIntensity={0.8} />

      {/* Contact shadows */}
      {(state === 'interactive' || state === 'color' || state === 'hero') && (
        <ContactShadows
          position={[0, -DOOR_H / 2 - 0.22, 0]}
          opacity={0.4}
          scale={14}
          blur={2.8}
          far={6}
          color="#1a1a2e"
        />
      )}

      {/* Orbit controls */}
      {(state === 'interactive' || state === 'color') && (
        <OrbitControls
          enableZoom
          minDistance={3.5}
          maxDistance={14}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.7}
          autoRotate={state === 'interactive'}
          autoRotateSpeed={0.35}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
        />
      )}

      {state === 'motor' && (
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.7}
          target={[-DOOR_W / 2 + 0.3, DOOR_H / 2 + 0.5, -HOUSING_D / 2]}
          enableDamping
        />
      )}

      {/* ─── Door Assembly ─── */}
      <group position={[0, 0, 0]}>
        {/* Slats */}
        <group>
          {Array.from({ length: SLAT_COUNT }).map((_, i) => (
            <Slat key={i} index={i} material={materials.slat} springOpen={springOpen} total={SLAT_COUNT} />
          ))}
        </group>

        {/* Bottom bar */}
        <BottomBar material={materials.frame} rubberMat={materials.rubber} springOpen={springOpen} />

        {/* Guide Rails */}
        <animated.group position-x={railXOff}>
          <GuideRail side={1} material={materials.frame} bracketMat={materials.bracket} />
        </animated.group>
        <animated.group position-x={railXOff.to((x) => -x)}>
          <GuideRail side={-1} material={materials.frame} bracketMat={materials.bracket} />
        </animated.group>

        {/* Drum Housing */}
        <animated.group position-y={drumYOff}>
          <DrumHousing materials={materials} />
        </animated.group>

        {/* Motor */}
        <animated.group position-y={drumYOff} position-z={motorZOff}>
          <MotorUnit materials={materials} />
        </animated.group>

        {/* Safety Sensors */}
        <SafetySensors materials={materials} />
      </group>
    </>
  );
}
