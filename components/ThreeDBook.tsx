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

  // Correct color space
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.colorSpace = THREE.SRGBColorSpace;

  // Animation: rotation + floating
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;

    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = Math.sin(t * 1.2) * 0.06;
  });

  const pageColor = new THREE.Color("#f5f5f0");

  const materials = [
    new THREE.MeshStandardMaterial({ color: pageColor }),     // right
    new THREE.MeshStandardMaterial({ color: pageColor }),     // left
    new THREE.MeshStandardMaterial({ color: pageColor }),     // top
    new THREE.MeshStandardMaterial({ color: pageColor }),     // bottom
    new THREE.MeshStandardMaterial({ map: frontTexture }),    // front
    new THREE.MeshStandardMaterial({ map: backTexture }),     // back
  ];

  return (
    // 🔥 Slightly bigger than before (was 0.9)
    <group scale={1.15}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Slightly increased size (was 0.9, 1.4, 0.08) */}
        <boxGeometry args={[1.0, 1.55, 0.09]} />

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
    <div className="w-full h-[280px] sm:h-80 md:h-96">
      <Canvas
        // 🔥 Camera slightly closer (was 4)
        camera={{ position: [0, 0, 3.6], fov: 35 }}
        gl={{ antialias: true }}
        shadows
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} />

        <BookMesh />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
