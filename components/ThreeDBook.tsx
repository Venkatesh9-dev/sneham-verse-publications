"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function BookMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Load textures from the public/book folder
  const frontTexture = useLoader(
    THREE.TextureLoader,
    "/book/front-cover.png"
  );
  const backTexture = useLoader(
    THREE.TextureLoader,
    "/book/back-cover.png"
  );

  // Make sure colors are correct
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.colorSpace = THREE.SRGBColorSpace;

  // Animation: rotation + floating
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;

    // Slow rotation on Y axis
    meshRef.current.rotation.y = t * 0.4;

    // Gentle up/down float
    meshRef.current.position.y = Math.sin(t * 1.2) * 0.06;
  });

  // Off-white for pages & spine
  const pageColor = new THREE.Color("#f5f5f0");

  // IMPORTANT: Order of materials for BoxGeometry:
  // 0: right, 1: left, 2: top, 3: bottom, 4: front, 5: back
  const materials = [
    new THREE.MeshStandardMaterial({ color: pageColor }),     // right
    new THREE.MeshStandardMaterial({ color: pageColor }),     // left
    new THREE.MeshStandardMaterial({ color: pageColor }),     // top
    new THREE.MeshStandardMaterial({ color: pageColor }),     // bottom
    new THREE.MeshStandardMaterial({ map: frontTexture }),    // front cover
    new THREE.MeshStandardMaterial({ map: backTexture }),     // back cover
  ];

  return (
    // Slight overall scale so it’s not too huge
    <group scale={0.9}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* 6x9-ish proportions: width, height, thickness */}
        <boxGeometry args={[0.9, 1.4, 0.08]} />
        <meshStandardMaterial attach="material-0" {...materials[0]} />
        <meshStandardMaterial attach="material-1" {...materials[1]} />
        <meshStandardMaterial attach="material-2" {...materials[2]} />
        <meshStandardMaterial attach="material-3" {...materials[3]} />
        <meshStandardMaterial attach="material-4" {...materials[4]} />
        <meshStandardMaterial attach="material-5" {...materials[5]} />
      </mesh>
    </group>
  );
}

export default function ThreeDBook() {
  return (
    <div className="w-full h-[260px] sm:h-72 md:h-80">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 35 }}
        gl={{ antialias: true }}
        shadows
      >
        {/* Lighting so it doesn’t look flat */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} />

        <BookMesh />

        {/* User can drag but not zoom */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
