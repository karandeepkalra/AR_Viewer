import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Model Component
function Model() {
  const gltf = useLoader(GLTFLoader, "/Karandeep.glb");
  return <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} castShadow receiveShadow />;
}

// Lighting Component
function Lighting() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[0, 8, 0]} 
        intensity={2} 
        castShadow 
        shadow-mapSize-width={4096} 
        shadow-mapSize-height={4096} 
        shadow-camera-near={0.5} 
        shadow-camera-far={30} 
        shadow-bias={-0.001} 
      />
    </>
  );
}

// Scene Component
export default function Scene() {
  return (
    <Canvas
      camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 1.5, 4] }}
      shadows
      gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.8 }}
    >
      <color attach="background" args={["#f0f0f0"]} />
      <Lighting />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <Environment preset="studio" />
      <OrbitControls enableDamping autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
}
