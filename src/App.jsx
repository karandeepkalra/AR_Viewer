import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { TextureLoader } from "three";
// import { Pathtracer, usePathtracer } from "@react-three/gpu-pathtracer";
// Configuration Constants
const ENVIRONMENT_PRESETS = [
  { name: "Compact Studio", url: "/xyz1.hdr" },
  { name: "Golden Hour", url: "/xyz2.hdr" },
  { name: "Woodland Glade", url: "/xyz3.hdr" },
];

const SURFACE_COLORS = [
  { name: "Industrial Gray", color: "#888888" },
  { name: "Concrete Gray", color: "#555555" },
  { name: "Desert Sand", color: "#B08D57" },
  { name: "Pristine White", color: "#FFFFFF" },
  { name: "Deep Navy", color: "#0A2A43" },
  { name: "Forest Green", color: "#3B6B3B" },
  { name: "Deep Crimson", color: "#8B0000" },
];

const SURFACE_TEXTURES = [
  { name: "Granite Finish", url: "/wood4.jpg" },
  { name: "Marble Overlay", url: "/con1.jpg" },
  { name: "Sand Pattern", url: "/wood3.jpg" },
  { name: "Urban Concrete", url: "/txt2.jpg" },
  { name: "Rustic Wood", url: "/txt2.jpg" },
];

const BACKGROUND_PALETTES = [
  { name: "Midnight", color: "#000000" },
  { name: "Storm Cloud", color: "#444444" },
  { name: "Clear Sky", color: "#87CEEB" },
  { name: "Pure White", color: "#FFFFFF" },
  { name: "Royal Purple", color: "#2E1A47" },
  { name: "Olive Grove", color: "#808000" },
  { name: "Soft Khaki", color: "#D2B48C" },
];

// Model Presets
const MODEL_PRESETS = [
  { name: "sports Bike", url: "/Karandeep.glb" },
  { name: "Sports Car", url: "/mod1.glb" },
  { name: "Luxury Sedan", url: "/mod3.glb" },
];

// Model Color Presets
const MODEL_COLORS = [
  { name: "Original", color: null },
  { name: "Metallic Silver", color: "#C0C0C0" },
  { name: "Racing Red", color: "#CC0000" },
  { name: "Electric Blue", color: "#007FFF" },
  { name: "Forest Green", color: "#228B22" },
  { name: "Midnight Black", color: "#000000" },
  { name: "Pearl White", color: "#F0F0F0" },
];

// Loading Indicator Component
function SceneLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white", fontSize: "18px" }}>
        Loading {Math.round(progress)}%
      </div>
    </Html>
  );
}

// 3D Vehicle Model Component
function VehicleModel({ 
  selectedModelUrl, 
  selectedModelColor, 
  selectedModelIndex 
}) {
  const modelRef = useRef();
  const vehicleModel = useLoader(GLTFLoader, selectedModelUrl);
  const [modelScene, setModelScene] = useState(null);

  useEffect(() => {
    // Clone the original model to avoid modifying the original
    const clonedScene = vehicleModel.scene.clone();
    setModelScene(clonedScene);
  }, [vehicleModel]);

  useEffect(() => {
    if (!modelScene) return;

    // Traverse the model and enable shadows for all meshes
    modelScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        
        // Apply color if selected and it's not the original model
        if (selectedModelColor && selectedModelIndex !== 0) {
          if (child.material) {
            // If it's an array of materials, update each
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                mat.color.set(selectedModelColor);
              });
            } else {
              // If it's a single material
              child.material.color.set(selectedModelColor);
            }
          }
        }
      }
    });
  }, [modelScene, selectedModelColor, selectedModelIndex]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  if (!modelScene) return null;

  return (
    <primitive
      object={modelScene}
      ref={modelRef}
      scale={1}
      position={[0, -0.99, 0]}
    />
  );
}

// Ground Surface Component
function GroundSurface({ selectedSurface, selectedTexture }) {
  const textureCollection = useLoader(TextureLoader, SURFACE_TEXTURES.map((t) => t.url));
  const appliedTexture = selectedTexture !== null ? textureCollection[selectedTexture] : null;
  
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
    >
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial
        key={selectedTexture}
        map={appliedTexture || null}
        color={appliedTexture ? undefined : selectedSurface.color}
      />
    </mesh>
  );
}

// Main Scene Rendering Component
function SceneComposition({
  selectedEnvironment,
  selectedSurface,
  selectedTexture,
  backgroundColor,
  selectedModelUrl,
  selectedModelColor,
  selectedModelIndex
}) {
  const { gl } = useThree();
  const environmentTexture = useLoader(RGBELoader, selectedEnvironment);
  environmentTexture.mapping = THREE.EquirectangularReflectionMapping;

  useEffect(() => {
    gl.setClearColor(new THREE.Color(backgroundColor));
   
    // Configure renderer for better shadow rendering
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [backgroundColor, gl]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 2, 5]}
        fov={50}
        near={0.1}
        far={1000}
      />
      <Environment background={true} map={environmentTexture} resolution={256} />
      <OrbitControls
        enableDamping
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={<SceneLoader />}>
        <GroundSurface
          selectedSurface={selectedSurface}
          selectedTexture={selectedTexture}
        />
      </Suspense>
      <Suspense fallback={<SceneLoader />}>
        <VehicleModel 
          selectedModelUrl={selectedModelUrl}
          selectedModelColor={selectedModelColor} 
          selectedModelIndex={selectedModelIndex} 
        />
      </Suspense>
      <directionalLight
        position={[0, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}

export default function VehicleShowcase() {
  const [environmentIndex, setEnvironmentIndex] = useState(0);
  const [surfaceIndex, setSurfaceIndex] = useState(0);
  const [textureIndex, setTextureIndex] = useState(-1);
  const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
  const [modelColorIndex, setModelColorIndex] = useState(0);
  const [modelIndex, setModelIndex] = useState(0);

  const selectedEnvironment = ENVIRONMENT_PRESETS[environmentIndex].url;
  const selectedSurface = SURFACE_COLORS[surfaceIndex];
  const selectedTexture = textureIndex >= 0 ? textureIndex : null;
  const backgroundColor = BACKGROUND_PALETTES[backgroundColorIndex].color;
  const selectedModelColor = MODEL_COLORS[modelColorIndex].color;
  const selectedModelUrl = MODEL_PRESETS[modelIndex].url;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas shadows fog={{ color: "#000000", near: 2, far: 10 }}>
        <SceneComposition
          selectedEnvironment={selectedEnvironment}
          selectedSurface={selectedSurface}
          selectedTexture={selectedTexture}
          backgroundColor={backgroundColor}
          selectedModelUrl={selectedModelUrl}
          selectedModelColor={selectedModelColor}
          selectedModelIndex={modelColorIndex}
        />
      </Canvas>
      <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        color: "white",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "10px",
        borderRadius: "5px"
      }}>
        <div>
          <label>Vehicle Model: </label>
          <select onChange={(e) => {
            setModelIndex(Number(e.target.value));
            setModelColorIndex(0);
          }}>
            {MODEL_PRESETS.map((model, index) => (
              <option key={model.name} value={index}>{model.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Environment: </label>
          <select onChange={(e) => setEnvironmentIndex(Number(e.target.value))}>
            {ENVIRONMENT_PRESETS.map((env, index) => (
              <option key={env.name} value={index}>{env.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Surface Color: </label>
          <select
            onChange={(e) => setSurfaceIndex(Number(e.target.value))}
            disabled={textureIndex >= 0}
          >
            {SURFACE_COLORS.map((surface, index) => (
              <option key={surface.name} value={index}>{surface.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Surface Texture: </label>
          <select onChange={(e) => setTextureIndex(Number(e.target.value) - 1)}>
            <option value="-1">None</option>
            {SURFACE_TEXTURES.map((tex, index) => (
              <option key={tex.name} value={index + 1}>{tex.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Model Color: </label>
          <select onChange={(e) => setModelColorIndex(Number(e.target.value))}>
            {MODEL_COLORS.map((color, index) => (
              <option key={color.name} value={index}>{color.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}