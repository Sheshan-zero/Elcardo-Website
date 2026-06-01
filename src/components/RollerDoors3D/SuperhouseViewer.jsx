import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const GLB_PATH = `${import.meta.env.BASE_URL}superhouse.glb`;

/* ─── Gate colour palette — 14 standard Elcardo colours + Custom ─── */
export const GATE_COLORS = [
  { id: 'black',          name: 'Black',           hex: '#1a1a1a', roughness: 0.50, metalness: 0.40 },
  { id: 'grey',           name: 'Grey',            hex: '#808080', roughness: 0.45, metalness: 0.40 },
  { id: 'white',          name: 'White',           hex: '#f0ede8', roughness: 0.55, metalness: 0.15 },
  { id: 'silver',         name: 'Silver',          hex: '#b8b8b8', roughness: 0.25, metalness: 0.70 },
  { id: 'teak',           name: 'Teak',            hex: '#8B5E3C', roughness: 0.55, metalness: 0.10 },
  { id: 'mahogany',       name: 'Mahogany',        hex: '#6B2D0F', roughness: 0.55, metalness: 0.15 },
  { id: 'brown',          name: 'Brown',           hex: '#8B4513', roughness: 0.50, metalness: 0.15 },
  { id: 'dark-brown',     name: 'Dark Brown',      hex: '#3A1F0F', roughness: 0.50, metalness: 0.20 },
  { id: 'green',          name: 'Green',           hex: '#4A7C59', roughness: 0.50, metalness: 0.25 },
  { id: 'dark-green',     name: 'Dark Green',      hex: '#1F4028', roughness: 0.50, metalness: 0.25 },
  { id: 'yellow',         name: 'Yellow',          hex: '#F5C518', roughness: 0.50, metalness: 0.20 },
  { id: 'natural-yellow', name: 'Natural Yellow',  hex: '#DDB862', roughness: 0.50, metalness: 0.15 },
  { id: 'bronze',         name: 'Bronze',          hex: '#8C6A1B', roughness: 0.45, metalness: 0.30 },
  { id: 'lazurite',       name: 'Lazurite Blue',   hex: '#1B4F8A', roughness: 0.50, metalness: 0.30 },
  { id: 'custom',         name: 'Custom',          hex: '#cc2929', roughness: 0.40, metalness: 0.35 },
];

/* ─── Wall / exterior finish presets ─── */
export const WALL_PRESETS = [
  { id: 'white',  name: 'Classic White',  hex: '#F5F4F2', roughness: 0.72, metalness: 0.0 },
  { id: 'cream',  name: 'Warm Cream',     hex: '#EDE0C8', roughness: 0.72, metalness: 0.0 },
  { id: 'beige',  name: 'Sand Beige',     hex: '#D4C5A0', roughness: 0.70, metalness: 0.0 },
  { id: 'grey',   name: 'Concrete Grey',  hex: '#9B9C99', roughness: 0.65, metalness: 0.05 },
  { id: 'dark',   name: 'Midnight Stone', hex: '#3A3A3A', roughness: 0.65, metalness: 0.05 },
  { id: 'sage',   name: 'Mist Green',     hex: '#A8C5A0', roughness: 0.70, metalness: 0.0 },
];

/* ─── Identify gate / door meshes ─── */
function isGateMesh(mesh) {
  if (!mesh.isMesh || !mesh.material) return false;

  const name    = (mesh.name || '').toLowerCase();
  const matName = (mesh.material.name || '').toLowerCase();
  const keys    = ['gate', 'door', 'roller', 'shutter', 'garage', 'slat', 'panel'];
  if (keys.some(k => name.includes(k) || matName.includes(k))) return true;

  // Fallback: dark-neutral or mid-grey colour
  const col = mesh.material.color;
  if (!col) return false;
  const max = Math.max(col.r, col.g, col.b);
  const min = Math.min(col.r, col.g, col.b);
  const lightness   = (max + min) / 2;
  const saturation  = max === min ? 0 : (max - min) / (1 - Math.abs(2 * lightness - 1));
  return saturation < 0.12 && lightness >= 0.05 && lightness <= 0.58;
}

/* ─── Identify wall / exterior facade meshes ─── */
function isWallMesh(mesh) {
  if (!mesh.isMesh || !mesh.material) return false;
  if (isGateMesh(mesh)) return false; // gates are never walls

  const name    = (mesh.name || '').toLowerCase();
  const matName = (mesh.material.name || '').toLowerCase();
  const wallKeys = ['wall', 'house', 'facade', 'exterior', 'plaster', 'render', 'paint', 'brick', 'building'];
  if (wallKeys.some(k => name.includes(k) || matName.includes(k))) return true;

  // Fallback: very light neutral surfaces (cream / white rendered walls)
  const col = mesh.material.color;
  if (!col) return false;
  const max = Math.max(col.r, col.g, col.b);
  const min = Math.min(col.r, col.g, col.b);
  const lightness  = (max + min) / 2;
  const saturation = max === min ? 0 : (max - min) / (1 - Math.abs(2 * lightness - 1));
  return saturation < 0.08 && lightness > 0.62;
}

/* ─── Debug: log all mesh names once ─── */
function logMeshNames(scene) {
  /* eslint-disable no-console */
  console.group('[SuperhouseViewer] Mesh names:');
  scene.traverse(node => {
    if (node.isMesh) {
      const col = node.material?.color;
      const hex = col
        ? `rgb(${(col.r * 255).toFixed(0)},${(col.g * 255).toFixed(0)},${(col.b * 255).toFixed(0)})`
        : 'n/a';
      console.log(`  mesh="${node.name}" mat="${node.material?.name}" color=${hex} gate=${isGateMesh(node)} wall=${isWallMesh(node)}`);
    }
  });
  console.groupEnd();
  /* eslint-enable no-console */
}

/* ─── The loaded GLB scene with gate + wall recolouring ─── */
export function SuperhouseModel({
  gateColorHex  = '#3a3a3a',
  roughness     = 0.45,
  metalness     = 0.55,
  wallColorHex  = '#F5F4F2',
  wallRoughness = 0.72,
  wallMetalness = 0.0,
}) {
  const { scene }  = useGLTF(GLB_PATH);
  const groupRef   = useRef();

  // Clone the scene so multiple instances don't share materials
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material = node.material.clone();
        node.castShadow    = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  // Categorise meshes once
  const { gateMeshes, wallMeshes } = useMemo(() => {
    logMeshNames(cloned);
    const gate = [];
    const wall = [];
    cloned.traverse((node) => {
      if (isGateMesh(node)) gate.push(node);
      else if (isWallMesh(node)) wall.push(node);
    });
    return { gateMeshes: gate, wallMeshes: wall };
  }, [cloned]);

  // Target colour objects — updated when props change
  const targetGate = useMemo(() => new THREE.Color(gateColorHex), [gateColorHex]);
  const targetWall = useMemo(() => new THREE.Color(wallColorHex), [wallColorHex]);

  useEffect(() => { targetGate.set(gateColorHex); }, [gateColorHex, targetGate]);
  useEffect(() => { targetWall.set(wallColorHex);  }, [wallColorHex,  targetWall]);

  // Smooth lerp every frame
  useFrame(() => {
    gateMeshes.forEach((mesh) => {
      if (!mesh.material) return;
      mesh.material.color.lerp(targetGate, 0.08);
      mesh.material.roughness += (roughness     - mesh.material.roughness) * 0.08;
      mesh.material.metalness += (metalness     - mesh.material.metalness) * 0.08;
    });
    wallMeshes.forEach((mesh) => {
      if (!mesh.material) return;
      mesh.material.color.lerp(targetWall, 0.06);
      mesh.material.roughness += (wallRoughness - mesh.material.roughness) * 0.06;
      mesh.material.metalness += (wallMetalness - mesh.material.metalness) * 0.06;
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  );
}

/* ─── Preload for performance ─── */
useGLTF.preload(GLB_PATH);

export default SuperhouseModel;
