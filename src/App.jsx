// import React, { useState, useRef, Suspense, useEffect } from "react";
// import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, Environment, useProgress, Html, PerspectiveCamera } from "@react-three/drei";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import { TextureLoader } from "three";
// import '@google/model-viewer';

// import { QRCodeCanvas } from "qrcode.react";

// const ENVIRONMENT_PRESETS = [
//   { name: "Compact Studio", url: "/xyz1.hdr" },
//   { name: "Golden Hour", url: "/xyz2.hdr" },
//   { name: "Woodland Glade", url: "/xyz3.hdr" },
// ];

// const SURFACE_COLORS = [
//   { name: "Industrial Gray", color: "#888888" },
//   { name: "Concrete Gray", color: "#555555" },
//   { name: "Desert Sand", color: "#B08D57" },
//   { name: "Pristine White", color: "#FFFFFF" },
//   { name: "Deep Navy", color: "#0A2A43" },
//   { name: "Forest Green", color: "#3B6B3B" },
//   { name: "Deep Crimson", color: "#8B0000" },
// ];

// const SURFACE_TEXTURES = [
//   { name: "Granite Finish", url: "/wood4.jpg" },
//   { name: "Marble Overlay", url: "/con1.jpg" },
//   { name: "Sand Pattern", url: "/wood3.jpg" },
//   { name: "Urban Concrete", url: "/txt2.jpg" },
//   { name: "Rustic Wood", url: "/txt2.jpg" },
// ];

// const BACKGROUND_PALETTES = [
//   { name: "Midnight", color: "#000000" },
//   { name: "Storm Cloud", color: "#444444" },
//   { name: "Clear Sky", color: "#87CEEB" },
//   { name: "Pure White", color: "#FFFFFF" },
//   { name: "Royal Purple", color: "#2E1A47" },
//   { name: "Olive Grove", color: "#808000" },
//   { name: "Soft Khaki", color: "#D2B48C" },
// ];

// const MODEL_PRESETS = [
//   { name: "Sports Bike", url: "/Karandeep.glb", dimensions: { length: "2.1m", width: "0.8m", height: "1.2m" } },
//   { name: "Sports Car", url: "/mod1.glb", dimensions: { length: "4.5m", width: "1.9m", height: "1.3m" } },
//   { name: "Luxury Sedan", url: "/mod3.glb", dimensions: { length: "5.1m", width: "1.9m", height: "1.5m" } },
// ];

// const MODEL_COLORS = [
//   { name: "Original", color: null },
//   { name: "Metallic Silver", color: "#C0C0C0" },
//   { name: "Racing Red", color: "#CC0000" },
//   { name: "Electric Blue", color: "#007FFF" },
//   { name: "Forest Green", color: "#228B22" },
//   { name: "Midnight Black", color: "#000000" },
//   { name: "Pearl White", color: "#F0F0F0" },
// ];

// function SceneLoader() {
//   const { progress } = useProgress();
//   return (
//     <Html center>
//       <div style={{ color: "white", fontSize: "18px" }}>
//         Loading {Math.round(progress)}%
//       </div>
//     </Html>
//   );
// }

// function DimensionLines({ modelIndex, isVisible, rotation }) {
//   const groupRef = useRef();
//   const { scene } = useThree();
  
//   // Use the dimensions from the preset
//   const dimensions = MODEL_PRESETS[modelIndex].dimensions;
//   const length = parseFloat(dimensions.length);
//   const width = parseFloat(dimensions.width);
//   const height = parseFloat(dimensions.height);
  
//   // Apply rotation to the dimension lines group
//   useEffect(() => {
//     if (groupRef.current && rotation !== undefined) {
//       groupRef.current.rotation.y = rotation;
//     }
//   }, [rotation]);
  
//   if (!isVisible) return null;
  
//   return (
//     <group ref={groupRef} position={[0, -0.99, 0]}>
//       {/* Width line (X-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([-width/2, 0, 0, width/2, 0, 0]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="green" linewidth={2} />
//       </line>
//       <Html position={[0.2, 0.2, 0]} transform>
//         <div style={{ 
//           color: "green", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 2px", 
//           borderRadius: "4px", 
//           fontSize: "8px",
//           whiteSpace: "nowrap",
//           pointerEvents: "none"
//         }}>
//           Width: {dimensions.width}
//         </div>
//       </Html>
      
//       {/* Height line (Y-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([0, 0, 0, 0, height, 0]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="blue" linewidth={2} />
//       </line>
//       <Html position={[0, height/2, 0]} transform>
//         <div style={{ 
//           color: "blue", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 2px", 
//           fontSize: "8px",
//           borderRadius: "2px", 
//           whiteSpace: "nowrap",
//           pointerEvents: "none"
//         }}>
//           Height: {dimensions.height}
//         </div>
//       </Html>
      
//       {/* Length line (Z-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([0, 0, -length/2, 0, 0, length/2]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="red" linewidth={2} />
//       </line>
//       <Html position={[0, 0, 0.4]} transform>
//         <div style={{ 
//           color: "red", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 1px", 
//           fontSize: "8px",
//           borderRadius: "4px", 
//           whiteSpace: "nowrap",
//           pointerEvents: "none" 
//         }}>
//           Length: {dimensions.length}
//         </div>
//       </Html>

//       {/* Origin point marker */}
//       <mesh position={[0, 0, 0]}>
//         <sphereGeometry args={[0.05, 16, 16]} />
//         <meshBasicMaterial color="white" />
//       </mesh>
//     </group>
//   );
// }

// function VehicleModel({ 
//   selectedModelUrl, 
//   selectedModelColor, 
//   selectedModelIndex,
//   onRotationUpdate 
// }) {
//   const modelRef = useRef();
//   const gltf = useLoader(GLTFLoader, selectedModelUrl);
//   const [modelScene, setModelScene] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (gltf) {
//       // Handle both single and array results from useLoader
//       const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
//       const clonedScene = scene.clone();
//       setModelScene(clonedScene);
//     }
//   }, [gltf]);

//   useEffect(() => {
//     if (!modelScene) return;

//     modelScene.traverse((child) => {
//       if (child.isMesh) {
//         child.castShadow = true;
        
//         if (selectedModelColor && selectedModelIndex !== 0) {
//           if (child.material) {
//             if (Array.isArray(child.material)) {
//               child.material.forEach(mat => {
//                 mat.color.set(selectedModelColor);
//               });
//             } else {
//               child.material.color.set(selectedModelColor);
//             }
//           }
//         }
//       }
//     });
//   }, [modelScene, selectedModelColor, selectedModelIndex]);

//   useFrame(() => {
//     if (modelRef.current && !isHovered) {
//       const newRotation = modelRef.current.rotation.y + 0.005;
//       modelRef.current.rotation.y = newRotation;
      
//       // Pass rotation value to parent component
//       if (onRotationUpdate) {
//         onRotationUpdate(newRotation);
//       }
//     }
//   });

//   if (!modelScene) return null;

//   return (
//     <primitive
//       object={modelScene}
//       ref={modelRef}
//       scale={1}
//       position={[0, -0.99, 0]}
//       onPointerOver={() => setIsHovered(true)}
//       onPointerOut={() => setIsHovered(false)} 
//     />
//   );
// }

// function GroundSurface({ selectedSurface, selectedTexture }) {
//   const textureCollection = useLoader(TextureLoader, SURFACE_TEXTURES.map((t) => t.url));
//   const appliedTexture = selectedTexture !== null ? textureCollection[selectedTexture] : null;
  
//   return (
//     <mesh
//       rotation={[-Math.PI / 2, 0, 0]}
//       position={[0, -1, 0]}
//       receiveShadow
//     >
//       <planeGeometry args={[10, 10]} />
//       <meshStandardMaterial
//         key={selectedTexture}
//         map={appliedTexture || null}
//         color={appliedTexture ? undefined : selectedSurface.color}
//       />
//     </mesh>
//   );
// }

// function ScreenshotCapture({ onCaptureComplete }) {
//   const { gl, scene, camera } = useThree();
  
//   const captureScreenshot = () => {
//     gl.render(scene, camera);
//     const canvas = gl.domElement;
//     const dataURL = canvas.toDataURL('image/png');
    
//     if (onCaptureComplete) {
//       onCaptureComplete(dataURL);
//     }
//   };
  
//   return (
//     <Html position={[0, 0, 0]} center>
//       <button 
//         onClick={captureScreenshot}
//         style={{ 
//           display: 'none',
//           position: 'absolute',
//           top: '-1000px'
//         }}
//         id="hidden-screenshot-button"
//       >
//         Capture
//       </button>
//     </Html>
//   );
// }

// function SceneComposition({
//   selectedEnvironment,
//   selectedSurface,
//   selectedTexture,
//   backgroundColor,
//   selectedModelUrl,
//   selectedModelColor,
//   selectedModelIndex,
//   showDimensions,
//   modelIndex,
//   onCaptureComplete
// }) {
//   const { gl } = useThree();
//   const hdriMap = useLoader(RGBELoader, selectedEnvironment);
//   const [modelRotation, setModelRotation] = useState(0);
  
//   // Handle both single and array texture results
//   const environmentTexture = Array.isArray(hdriMap) ? hdriMap[0] : hdriMap;
//   environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
//   const handleRotationUpdate = (rotation) => {
//     setModelRotation(rotation);
//   };

//   useEffect(() => {
//     gl.setClearColor(new THREE.Color(backgroundColor));
//     gl.shadowMap.enabled = true;
//     gl.shadowMap.type = THREE.PCFSoftShadowMap;
//   }, [backgroundColor, gl]);

//   return (
//     <>
//       <PerspectiveCamera
//         makeDefault
//         position={[3, 2, 5]}
//         fov={50}
//         near={0.1}
//         far={1000}
//       />
//       <Environment background={environmentTexture} map={environmentTexture} resolution={256} />
//       <OrbitControls
//         enableDamping
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 2}
//       />
//       <Suspense fallback={<SceneLoader />}>
//         <GroundSurface
//           selectedSurface={selectedSurface}
//           selectedTexture={selectedTexture}
//         />
//       </Suspense>
//       <Suspense fallback={<SceneLoader />}>
//         <VehicleModel 
//           selectedModelUrl={selectedModelUrl}
//           selectedModelColor={selectedModelColor} 
//           selectedModelIndex={selectedModelIndex}
//           onRotationUpdate={handleRotationUpdate}
//         />
//         <DimensionLines 
//           isVisible={showDimensions}
//           modelIndex={modelIndex}
//           rotation={modelRotation}
//         />
//       </Suspense>
//       <directionalLight
//         position={[0, 5, 5]}
//         intensity={1.5}
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//         shadow-camera-far={50}
//         shadow-camera-left={-10}
//         shadow-camera-right={10}
//         shadow-camera-top={10}
//         shadow-camera-bottom={-10}
//       />
//       <ambientLight intensity={0.3} />
//       <ScreenshotCapture onCaptureComplete={onCaptureComplete} />
//     </>
//   );
// }

// export default function VehicleShowcase() {
//   const [environmentIndex, setEnvironmentIndex] = useState(0);
//   const [surfaceIndex, setSurfaceIndex] = useState(0);
//   const [textureIndex, setTextureIndex] = useState(-1);
//   const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
//   const [modelColorIndex, setModelColorIndex] = useState(0);
//   const [modelIndex, setModelIndex] = useState(0);
//   const [screenshotData, setScreenshotData] = useState(null);
//   const [showScreenshot, setShowScreenshot] = useState(false);
//   const [showDimensions, setShowDimensions] = useState(false);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const AR_VIEW_URL = "https://yourwebsite.com/ar-view";
//   const canvasRef = useRef(null);

//   const selectedEnvironment = ENVIRONMENT_PRESETS[environmentIndex].url;
//   const selectedSurface = SURFACE_COLORS[surfaceIndex];
//   const selectedTexture = textureIndex >= 0 ? textureIndex : null;
//   const backgroundColor = BACKGROUND_PALETTES[backgroundColorIndex].color;
//   const selectedModelColor = MODEL_COLORS[modelColorIndex].color;
//   const selectedModelUrl = MODEL_PRESETS[modelIndex].url;

//   const handleScreenshotCapture = (dataURL) => {
//     setScreenshotData(dataURL);
//     setShowScreenshot(true);
//   };

//   const takeScreenshot = () => {
//     const hiddenButton = document.getElementById('hidden-screenshot-button');
//     if (hiddenButton) {
//       hiddenButton.click();
//     }
//   };

//   const downloadScreenshot = () => {
//     if (!screenshotData) return;
    
//     const link = document.createElement('a');
//     link.href = screenshotData;
//     link.download = `vehicle-showcase-${new Date().getTime()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const closeScreenshot = () => {
//     setShowScreenshot(false);
//   };

//   const toggleDimensions = () => {
//     setShowDimensions(!showDimensions);
//   };

//   return (
//     <div style={{ height: "100vh", width: "100vw", position: "relative" }} ref={canvasRef}>
//       <Canvas shadows>
//         <SceneComposition
//           selectedEnvironment={selectedEnvironment}
//           selectedSurface={selectedSurface}
//           selectedTexture={selectedTexture}
//           backgroundColor={backgroundColor}
//           selectedModelUrl={selectedModelUrl}
//           selectedModelColor={selectedModelColor}
//           selectedModelIndex={modelColorIndex}
//           showDimensions={showDimensions}
//           modelIndex={modelIndex}
//           onCaptureComplete={handleScreenshotCapture}
//         />
//       </Canvas>
      
//       <div style={{
//         position: "absolute",
//         top: 10,
//         left: 10,
//         color: "white",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         padding: "10px",
//         borderRadius: "5px"
//       }}>
//         <div>
//           <label>Vehicle Model: </label>
//           <select onChange={(e) => {
//             setModelIndex(Number(e.target.value));
//             setModelColorIndex(0);
//           }}>
//             {MODEL_PRESETS.map((model, index) => (
//               <option key={model.name} value={index}>{model.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Environment: </label>
//           <select onChange={(e) => setEnvironmentIndex(Number(e.target.value))}>
//             {ENVIRONMENT_PRESETS.map((env, index) => (
//               <option key={env.name} value={index}>{env.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Surface Color: </label>
//           <select
//             onChange={(e) => setSurfaceIndex(Number(e.target.value))}
//             disabled={textureIndex >= 0}
//           >
//             {SURFACE_COLORS.map((surface, index) => (
//               <option key={surface.name} value={index}>{surface.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Surface Texture: </label>
//           <select onChange={(e) => setTextureIndex(Number(e.target.value) - 1)}>
//             <option value="-1">None</option>
//             {SURFACE_TEXTURES.map((tex, index) => (
//               <option key={tex.name} value={index + 1}>{tex.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Model Color: </label>
//           <select onChange={(e) => setModelColorIndex(Number(e.target.value))}>
//             {MODEL_COLORS.map((color, index) => (
//               <option key={color.name} value={index}>{color.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Background: </label>
//           <select onChange={(e) => setBackgroundColorIndex(Number(e.target.value))}>
//             {BACKGROUND_PALETTES.map((bg, index) => (
//               <option key={bg.name} value={index}>{bg.name}</option>
//             ))}
//           </select>
//         </div>
        
//         <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//           <button 
//             onClick={takeScreenshot}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             Take Screenshot
//           </button>
          
//           <button 
//             onClick={toggleDimensions}
//             style={{
//               padding: "2px 2px",
//               backgroundColor: showDimensions ? "#f44336" : "#2196F3",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             {showDimensions ? "Hide Dimensions" : "Show Dimensions"}
//           </button>
//           <button 
//             onClick={() => setShowQRCode(true)}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#FF9800",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             View in AR
//           </button>
//         </div>
        
//         {/* <div style={{
//           marginTop: "10px",
//           padding: "8px",
//           backgroundColor: "rgba(33, 150, 243, 0.2)",
//           borderRadius: "4px",
//           fontSize: "14px"
//         }}>
//           <div><strong>{MODEL_PRESETS[modelIndex].name} Dimensions:</strong></div>
//           <div>Length: {MODEL_PRESETS[modelIndex].dimensions.length}</div>
//           <div>Width: {MODEL_PRESETS[modelIndex].dimensions.width}</div>
//           <div>Height: {MODEL_PRESETS[modelIndex].dimensions.height}</div>
//         </div> */}
//       </div>
      
//       {showScreenshot && screenshotData && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.8)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000
//         }}>
//           <div style={{
//             maxWidth: "80%",
//             maxHeight: "80%",
//             overflow: "auto",
//             backgroundColor: "#fff",
//             borderRadius: "5px",
//             padding: "20px",
//             position: "relative"
//           }}>
//             <button 
//               onClick={closeScreenshot} 
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 background: "none",
//                 border: "none",
//                 fontSize: "20px",
//                 cursor: "pointer"
//               }}
//             >
//               ✕
//             </button>
//             <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Screenshot Preview</h3>
//             <img 
//               src={screenshotData} 
//               alt="Vehicle Screenshot" 
//               style={{ 
//                 maxWidth: "100%", 
//                 maxHeight: "60vh",
//                 display: "block", 
//                 margin: "0 auto" 
//               }} 
//             />
//             <div style={{ textAlign: "center", marginTop: "15px" }}>
//               <button 
//                 onClick={downloadScreenshot}
//                 style={{
//                   padding: "8px 15px",
//                   backgroundColor: "#4CAF50",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Download Screenshot
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {showQRCode && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.8)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000
//         }}>
//           <div style={{
//             padding: "20px",
//             backgroundColor: "white",
//             borderRadius: "10px",
//             textAlign: "center"
//           }}>
//             <h3>Scan to View in AR</h3>
//             <QRCodeCanvas value={AR_VIEW_URL} size={200} />
//             <br />
//             <button 
//               onClick={() => setShowQRCode(false)}
//               style={{
//                 marginTop: "10px",
//                 padding: "8px 15px",
//                 backgroundColor: "#d32f2f",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer"
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







// import React, { useState, useRef, Suspense, useEffect } from "react";
// import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, Environment, useProgress, Html, PerspectiveCamera } from "@react-three/drei";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import { TextureLoader } from "three";
// import '@google/model-viewer';

// import { QRCodeCanvas } from "qrcode.react";

// const ENVIRONMENT_PRESETS = [
//   { name: "Compact Studio", url: "/xyz1.hdr" },
//   { name: "Golden Hour", url: "/xyz2.hdr" },
//   { name: "Woodland Glade", url: "/xyz3.hdr" },
// ];

// const SURFACE_COLORS = [
//   { name: "Industrial Gray", color: "#888888" },
//   { name: "Concrete Gray", color: "#555555" },
//   { name: "Desert Sand", color: "#B08D57" },
//   { name: "Pristine White", color: "#FFFFFF" },
//   { name: "Deep Navy", color: "#0A2A43" },
//   { name: "Forest Green", color: "#3B6B3B" },
//   { name: "Deep Crimson", color: "#8B0000" },
// ];

// const SURFACE_TEXTURES = [
//   { name: "Granite Finish", url: "/wood4.jpg" },
//   { name: "Marble Overlay", url: "/con1.jpg" },
//   { name: "Sand Pattern", url: "/wood3.jpg" },
//   { name: "Urban Concrete", url: "/txt2.jpg" },
//   { name: "Rustic Wood", url: "/txt2.jpg" },
// ];

// const BACKGROUND_PALETTES = [
//   { name: "Midnight", color: "#000000" },
//   { name: "Storm Cloud", color: "#444444" },
//   { name: "Clear Sky", color: "#87CEEB" },
//   { name: "Pure White", color: "#FFFFFF" },
//   { name: "Royal Purple", color: "#2E1A47" },
//   { name: "Olive Grove", color: "#808000" },
//   { name: "Soft Khaki", color: "#D2B48C" },
// ];

// const MODEL_PRESETS = [
//   { name: "Sports Bike", url: "/Karandeep.glb", dimensions: { length: "2.1m", width: "0.8m", height: "1.2m" } },
//   { name: "Sports Car", url: "/mod1.glb", dimensions: { length: "4.5m", width: "1.9m", height: "1.3m" } },
//   { name: "Luxury Sedan", url: "/mod3.glb", dimensions: { length: "5.1m", width: "1.9m", height: "1.5m" } },
// ];

// const MODEL_COLORS = [
//   { name: "Original", color: null },
//   { name: "Metallic Silver", color: "#C0C0C0" },
//   { name: "Racing Red", color: "#CC0000" },
//   { name: "Electric Blue", color: "#007FFF" },
//   { name: "Forest Green", color: "#228B22" },
//   { name: "Midnight Black", color: "#000000" },
//   { name: "Pearl White", color: "#F0F0F0" },
// ];

// function SceneLoader() {
//   const { progress } = useProgress();
//   return (
//     <Html center>
//       <div style={{ color: "white", fontSize: "18px" }}>
//         Loading {Math.round(progress)}%
//       </div>
//     </Html>
//   );
// }

// function DimensionLines({ modelIndex, isVisible, rotation }) {
//   const groupRef = useRef();
//   const { scene } = useThree();
  
//   // Use the dimensions from the preset
//   const dimensions = MODEL_PRESETS[modelIndex].dimensions;
//   const length = parseFloat(dimensions.length);
//   const width = parseFloat(dimensions.width);
//   const height = parseFloat(dimensions.height);
  
//   // Apply rotation to the dimension lines group
//   useEffect(() => {
//     if (groupRef.current && rotation !== undefined) {
//       groupRef.current.rotation.y = rotation;
//     }
//   }, [rotation]);
  
//   if (!isVisible) return null;
  
//   return (
//     <group ref={groupRef} position={[0, -0.99, 0]}>
//       {/* Width line (X-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([-width/2, 0, 0, width/2, 0, 0]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="green" linewidth={2} />
//       </line>
//       <Html position={[0.2, 0.2, 0]} transform>
//         <div style={{ 
//           color: "green", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 2px", 
//           borderRadius: "4px", 
//           fontSize: "8px",
//           whiteSpace: "nowrap",
//           pointerEvents: "none"
//         }}>
//           Width: {dimensions.width}
//         </div>
//       </Html>
      
//       {/* Height line (Y-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([0, 0, 0, 0, height, 0]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="blue" linewidth={2} />
//       </line>
//       <Html position={[0, height/2, 0]} transform>
//         <div style={{ 
//           color: "blue", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 2px", 
//           fontSize: "8px",
//           borderRadius: "2px", 
//           whiteSpace: "nowrap",
//           pointerEvents: "none"
//         }}>
//           Height: {dimensions.height}
//         </div>
//       </Html>
      
//       {/* Length line (Z-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([0, 0, -length/2, 0, 0, length/2]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="red" linewidth={2} />
//       </line>
//       <Html position={[0, 0, 0.4]} transform>
//         <div style={{ 
//           color: "red", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 1px", 
//           fontSize: "8px",
//           borderRadius: "4px", 
//           whiteSpace: "nowrap",
//           pointerEvents: "none" 
//         }}>
//           Length: {dimensions.length}
//         </div>
//       </Html>

//       {/* Origin point marker */}
//       <mesh position={[0, 0, 0]}>
//         <sphereGeometry args={[0.05, 16, 16]} />
//         <meshBasicMaterial color="white" />
//       </mesh>
//     </group>
//   );
// }

// function VehicleModel({ 
//   selectedModelUrl, 
//   selectedModelColor, 
//   selectedModelIndex,
//   onRotationUpdate 
// }) {
//   const modelRef = useRef();
//   const gltf = useLoader(GLTFLoader, selectedModelUrl);
//   const [modelScene, setModelScene] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (gltf) {
//       // Handle both single and array results from useLoader
//       const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
//       const clonedScene = scene.clone();
//       setModelScene(clonedScene);
//     }
//   }, [gltf]);

//   useEffect(() => {
//     if (!modelScene) return;

//     modelScene.traverse((child) => {
//       if (child.isMesh) {
//         child.castShadow = true;
        
//         if (selectedModelColor && selectedModelIndex !== 0) {
//           if (child.material) {
//             if (Array.isArray(child.material)) {
//               child.material.forEach(mat => {
//                 mat.color.set(selectedModelColor);
//               });
//             } else {
//               child.material.color.set(selectedModelColor);
//             }
//           }
//         }
//       }
//     });
//   }, [modelScene, selectedModelColor, selectedModelIndex]);

//   useFrame(() => {
//     if (modelRef.current && !isHovered) {
//       const newRotation = modelRef.current.rotation.y + 0.005;
//       modelRef.current.rotation.y = newRotation;
      
//       // Pass rotation value to parent component
//       if (onRotationUpdate) {
//         onRotationUpdate(newRotation);
//       }
//     }
//   });

//   if (!modelScene) return null;

//   return (
//     <primitive
//       object={modelScene}
//       ref={modelRef}
//       scale={1}
//       position={[0, -0.99, 0]}
//       onPointerOver={() => setIsHovered(true)}
//       onPointerOut={() => setIsHovered(false)} 
//     />
//   );
// }

// function GroundSurface({ selectedSurface, selectedTexture }) {
//   const textureCollection = useLoader(TextureLoader, SURFACE_TEXTURES.map((t) => t.url));
//   const appliedTexture = selectedTexture !== null ? textureCollection[selectedTexture] : null;
  
//   return (
//     <mesh
//       rotation={[-Math.PI / 2, 0, 0]}
//       position={[0, -1, 0]}
//       receiveShadow
//     >
//       <planeGeometry args={[10, 10]} />
//       <meshStandardMaterial
//         key={selectedTexture}
//         map={appliedTexture || null}
//         color={appliedTexture ? undefined : selectedSurface.color}
//       />
//     </mesh>
//   );
// }

// function ScreenshotCapture({ onCaptureComplete }) {
//   const { gl, scene, camera } = useThree();
  
//   const captureScreenshot = () => {
//     gl.render(scene, camera);
//     const canvas = gl.domElement;
//     const dataURL = canvas.toDataURL('image/png');
    
//     if (onCaptureComplete) {
//       onCaptureComplete(dataURL);
//     }
//   };
  
//   return (
//     <Html position={[0, 0, 0]} center>
//       <button 
//         onClick={captureScreenshot}
//         style={{ 
//           display: 'none',
//           position: 'absolute',
//           top: '-1000px'
//         }}
//         id="hidden-screenshot-button"
//       >
//         Capture
//       </button>
//     </Html>
//   );
// }

// function SceneComposition({
//   selectedEnvironment,
//   selectedSurface,
//   selectedTexture,
//   backgroundColor,
//   selectedModelUrl,
//   selectedModelColor,
//   selectedModelIndex,
//   showDimensions,
//   modelIndex,
//   onCaptureComplete
// }) {
//   const { gl } = useThree();
//   const hdriMap = useLoader(RGBELoader, selectedEnvironment);
//   const [modelRotation, setModelRotation] = useState(0);
  
//   // Handle both single and array texture results
//   const environmentTexture = Array.isArray(hdriMap) ? hdriMap[0] : hdriMap;
//   environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
//   const handleRotationUpdate = (rotation) => {
//     setModelRotation(rotation);
//   };

//   useEffect(() => {
//     gl.setClearColor(new THREE.Color(backgroundColor));
//     gl.shadowMap.enabled = true;
//     gl.shadowMap.type = THREE.PCFSoftShadowMap;
//   }, [backgroundColor, gl]);

//   return (
//     <>
//       <PerspectiveCamera
//         makeDefault
//         position={[3, 2, 5]}
//         fov={50}
//         near={0.1}
//         far={1000}
//       />
//       <Environment background={environmentTexture} map={environmentTexture} resolution={256} />
//       <OrbitControls
//         enableDamping
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 2}
//       />
//       <Suspense fallback={<SceneLoader />}>
//         <GroundSurface
//           selectedSurface={selectedSurface}
//           selectedTexture={selectedTexture}
//         />
//       </Suspense>
//       <Suspense fallback={<SceneLoader />}>
//         <VehicleModel 
//           selectedModelUrl={selectedModelUrl}
//           selectedModelColor={selectedModelColor} 
//           selectedModelIndex={selectedModelIndex}
//           onRotationUpdate={handleRotationUpdate}
//         />
//         <DimensionLines 
//           isVisible={showDimensions}
//           modelIndex={modelIndex}
//           rotation={modelRotation}
//         />
//       </Suspense>
//       <directionalLight
//         position={[0, 5, 5]}
//         intensity={1.5}
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//         shadow-camera-far={50}
//         shadow-camera-left={-10}
//         shadow-camera-right={10}
//         shadow-camera-top={10}
//         shadow-camera-bottom={-10}
//       />
//       <ambientLight intensity={0.3} />
//       <ScreenshotCapture onCaptureComplete={onCaptureComplete} />
//     </>
//   );
// }

// export default function VehicleShowcase() {
//   const [environmentIndex, setEnvironmentIndex] = useState(0);
//   const [surfaceIndex, setSurfaceIndex] = useState(0);
//   const [textureIndex, setTextureIndex] = useState(-1);
//   const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
//   const [modelColorIndex, setModelColorIndex] = useState(0);
//   const [modelIndex, setModelIndex] = useState(0);
//   const [screenshotData, setScreenshotData] = useState(null);
//   const [showScreenshot, setShowScreenshot] = useState(false);
//   const [showDimensions, setShowDimensions] = useState(false);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const AR_VIEW_URL = "https://yourwebsite.com/ar-view";
//   const canvasRef = useRef(null);

//   const selectedEnvironment = ENVIRONMENT_PRESETS[environmentIndex].url;
//   const selectedSurface = SURFACE_COLORS[surfaceIndex];
//   const selectedTexture = textureIndex >= 0 ? textureIndex : null;
//   const backgroundColor = BACKGROUND_PALETTES[backgroundColorIndex].color;
//   const selectedModelColor = MODEL_COLORS[modelColorIndex].color;
//   const selectedModelUrl = MODEL_PRESETS[modelIndex].url;


  

//   const handleScreenshotCapture = (dataURL) => {
//     setScreenshotData(dataURL);
//     setShowScreenshot(true);
//   };

//   const takeScreenshot = () => {
//     const hiddenButton = document.getElementById('hidden-screenshot-button');
//     if (hiddenButton) {
//       hiddenButton.click();
//     }
//   };

//   const downloadScreenshot = () => {
//     if (!screenshotData) return;
    
//     const link = document.createElement('a');
//     link.href = screenshotData;
//     link.download = `vehicle-showcase-${new Date().getTime()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const closeScreenshot = () => {
//     setShowScreenshot(false);
//   };

//   const toggleDimensions = () => {
//     setShowDimensions(!showDimensions);
//   };

//   return (
//     <div style={{ height: "100vh", width: "100vw", position: "relative" }} ref={canvasRef}>
//       <Canvas shadows>
//         <SceneComposition
//           selectedEnvironment={selectedEnvironment}
//           selectedSurface={selectedSurface}
//           selectedTexture={selectedTexture}
//           backgroundColor={backgroundColor}
//           selectedModelUrl={selectedModelUrl}
//           selectedModelColor={selectedModelColor}
//           selectedModelIndex={modelColorIndex}
//           showDimensions={showDimensions}
//           modelIndex={modelIndex}
//           onCaptureComplete={handleScreenshotCapture}
//         />
//       </Canvas>
      
//       <div style={{
//         position: "absolute",
//         top: 10,
//         left: 10,
//         color: "white",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         padding: "10px",
//         borderRadius: "5px"
//       }}>
//         <div>
//           <label>Vehicle Model: </label>
//           <select onChange={(e) => {
//             setModelIndex(Number(e.target.value));
//             setModelColorIndex(0);
//           }}>
//             {MODEL_PRESETS.map((model, index) => (
//               <option key={model.name} value={index}>{model.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Environment: </label>
//           <select onChange={(e) => setEnvironmentIndex(Number(e.target.value))}>
//             {ENVIRONMENT_PRESETS.map((env, index) => (
//               <option key={env.name} value={index}>{env.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Surface Color: </label>
//           <select
//             onChange={(e) => setSurfaceIndex(Number(e.target.value))}
//             disabled={textureIndex >= 0}
//           >
//             {SURFACE_COLORS.map((surface, index) => (
//               <option key={surface.name} value={index}>{surface.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Surface Texture: </label>
//           <select onChange={(e) => setTextureIndex(Number(e.target.value) - 1)}>
//             <option value="-1">None</option>
//             {SURFACE_TEXTURES.map((tex, index) => (
//               <option key={tex.name} value={index + 1}>{tex.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Model Color: </label>
//           <select onChange={(e) => setModelColorIndex(Number(e.target.value))}>
//             {MODEL_COLORS.map((color, index) => (
//               <option key={color.name} value={index}>{color.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Background: </label>
//           <select onChange={(e) => setBackgroundColorIndex(Number(e.target.value))}>
//             {BACKGROUND_PALETTES.map((bg, index) => (
//               <option key={bg.name} value={index}>{bg.name}</option>
//             ))}
//           </select>
//         </div>
        
//         <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//           <button 
//             onClick={takeScreenshot}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             Take Screenshot
//           </button>
          
//           <button 
//             onClick={toggleDimensions}
//             style={{
//               padding: "2px 2px",
//               backgroundColor: showDimensions ? "#f44336" : "#2196F3",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             {showDimensions ? "Hide Dimensions" : "Show Dimensions"}
//           </button>
//           <button 
//             onClick={() => setShowQRCode(true)}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#FF9800",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             View in AR
//           </button>
//         </div>
        
//         {/* <div style={{
//           marginTop: "10px",
//           padding: "8px",
//           backgroundColor: "rgba(33, 150, 243, 0.2)",
//           borderRadius: "4px",
//           fontSize: "14px"
//         }}>
//           <div><strong>{MODEL_PRESETS[modelIndex].name} Dimensions:</strong></div>
//           <div>Length: {MODEL_PRESETS[modelIndex].dimensions.length}</div>
//           <div>Width: {MODEL_PRESETS[modelIndex].dimensions.width}</div>
//           <div>Height: {MODEL_PRESETS[modelIndex].dimensions.height}</div>
//         </div> */}
//       </div>
      
//       {showScreenshot && screenshotData && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.8)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000
//         }}>
//           <div style={{
//             maxWidth: "80%",
//             maxHeight: "80%",
//             overflow: "auto",
//             backgroundColor: "#fff",
//             borderRadius: "5px",
//             padding: "20px",
//             position: "relative"
//           }}>
//             <button 
//               onClick={closeScreenshot} 
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 background: "none",
//                 border: "none",
//                 fontSize: "20px",
//                 cursor: "pointer"
//               }}
//             >
//               ✕
//             </button>
//             <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Screenshot Preview</h3>
//             <img 
//               src={screenshotData} 
//               alt="Vehicle Screenshot" 
//               style={{ 
//                 maxWidth: "100%", 
//                 maxHeight: "60vh",
//                 display: "block", 
//                 margin: "0 auto" 
//               }} 
//             />
//             <div style={{ textAlign: "center", marginTop: "15px" }}>
//               <button 
//                 onClick={downloadScreenshot}
//                 style={{
//                   padding: "8px 15px",
//                   backgroundColor: "#4CAF50",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Download Screenshot
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {showQRCode && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.8)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000
//         }}>
//           <div style={{
//             padding: "20px",
//             backgroundColor: "white",
//             borderRadius: "10px",
//             textAlign: "center"
//           }}>
//             <h3>Scan to View in AR</h3>
//             <QRCodeCanvas value={AR_VIEW_URL} size={200} />
//             <br />
//             <button 
//               onClick={() => setShowQRCode(false)}
//               style={{
//                 marginTop: "10px",
//                 padding: "8px 15px",
//                 backgroundColor: "#d32f2f",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer"
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// import React, { useState, useRef, Suspense, useEffect } from "react";
// import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, Environment, useProgress, Html, PerspectiveCamera } from "@react-three/drei";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import { TextureLoader } from "three";
// import '@google/model-viewer';

// import { QRCodeCanvas } from "qrcode.react";

// const ENVIRONMENT_PRESETS = [
//   { name: "Compact Studio", url: "/xyz1.hdr" },
//   { name: "Golden Hour", url: "/xyz2.hdr" },
//   { name: "Woodland Glade", url: "/xyz3.hdr" },
// ];

// const SURFACE_COLORS = [
//   { name: "Industrial Gray", color: "#888888" },
//   { name: "Concrete Gray", color: "#555555" },
//   { name: "Desert Sand", color: "#B08D57" },
//   { name: "Pristine White", color: "#FFFFFF" },
//   { name: "Deep Navy", color: "#0A2A43" },
//   { name: "Forest Green", color: "#3B6B3B" },
//   { name: "Deep Crimson", color: "#8B0000" },
// ];

// const SURFACE_TEXTURES = [
//   { name: "Granite Finish", url: "/wood4.jpg" },
//   { name: "Marble Overlay", url: "/con1.jpg" },
//   { name: "Sand Pattern", url: "/wood3.jpg" },
//   { name: "Urban Concrete", url: "/txt2.jpg" },
//   { name: "Rustic Wood", url: "/txt2.jpg" },
// ];

// const BACKGROUND_PALETTES = [
//   { name: "Midnight", color: "#000000" },
//   { name: "Storm Cloud", color: "#444444" },
//   { name: "Clear Sky", color: "#87CEEB" },
//   { name: "Pure White", color: "#FFFFFF" },
//   { name: "Royal Purple", color: "#2E1A47" },
//   { name: "Olive Grove", color: "#808000" },
//   { name: "Soft Khaki", color: "#D2B48C" },
// ];

// const MODEL_PRESETS = [
//   { name: "Sports Bike", url: "/Karandeep.glb", dimensions: { length: "2.1m", width: "0.8m", height: "1.2m" } },
//   { name: "Sports Car", url: "/mod1.glb", dimensions: { length: "4.5m", width: "1.9m", height: "1.3m" } },
//   { name: "Luxury Sedan", url: "/mod3.glb", dimensions: { length: "5.1m", width: "1.9m", height: "1.5m" } },
// ];

// const MODEL_COLORS = [
//   { name: "Original", color: null },
//   { name: "Metallic Silver", color: "#C0C0C0" },
//   { name: "Racing Red", color: "#CC0000" },
//   { name: "Electric Blue", color: "#007FFF" },
//   { name: "Forest Green", color: "#228B22" },
//   { name: "Midnight Black", color: "#000000" },
//   { name: "Pearl White", color: "#F0F0F0" },
// ];

// function SceneLoader() {
//   const { progress } = useProgress();
//   return (
//     <Html center>
//       <div style={{ color: "white", fontSize: "18px" }}>
//         Loading {Math.round(progress)}%
//       </div>
//     </Html>
//   );
// }

// function DimensionLines({ modelIndex, isVisible, rotation }) {
//   const groupRef = useRef();
//   const { scene } = useThree();
  
//   // Use the dimensions from the preset
//   const dimensions = MODEL_PRESETS[modelIndex].dimensions;
//   const length = parseFloat(dimensions.length);
//   const width = parseFloat(dimensions.width);
//   const height = parseFloat(dimensions.height);
  
//   // Apply rotation to the dimension lines group
//   useEffect(() => {
//     if (groupRef.current && rotation !== undefined) {
//       groupRef.current.rotation.y = rotation;
//     }
//   }, [rotation]);
  
//   if (!isVisible) return null;
  
//   return (
//     <group ref={groupRef} position={[0, -0.99, 0]}>
//       {/* Width line (X-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([-width/2, 0, 0, width/2, 0, 0]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="green" linewidth={2} />
//       </line>
//       <Html position={[0.2, 0.2, 0]} transform>
//         <div style={{ 
//           color: "green", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 2px", 
//           borderRadius: "4px", 
//           fontSize: "8px",
//           whiteSpace: "nowrap",
//           pointerEvents: "none"
//         }}>
//           Width: {dimensions.width}
//         </div>
//       </Html>
      
//       {/* Height line (Y-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([0, 0, 0, 0, height, 0]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="blue" linewidth={2} />
//       </line>
//       <Html position={[0, height/2, 0]} transform>
//         <div style={{ 
//           color: "blue", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 2px", 
//           fontSize: "8px",
//           borderRadius: "2px", 
//           whiteSpace: "nowrap",
//           pointerEvents: "none"
//         }}>
//           Height: {dimensions.height}
//         </div>
//       </Html>
      
//       {/* Length line (Z-axis) */}
//       <line>
//         <bufferGeometry>
//           <float32BufferAttribute 
//             attach="attributes-position" 
//             args={[new Float32Array([0, 0, -length/2, 0, 0, length/2]), 3]} 
//           />
//         </bufferGeometry>
//         <lineBasicMaterial color="red" linewidth={2} />
//       </line>
//       <Html position={[0, 0, 0.4]} transform>
//         <div style={{ 
//           color: "red", 
//           backgroundColor: "rgba(0,0,0,0.7)", 
//           padding: "2px 1px", 
//           fontSize: "8px",
//           borderRadius: "4px", 
//           whiteSpace: "nowrap",
//           pointerEvents: "none" 
//         }}>
//           Length: {dimensions.length}
//         </div>
//       </Html>

//       {/* Origin point marker */}
//       <mesh position={[0, 0, 0]}>
//         <sphereGeometry args={[0.05, 16, 16]} />
//         <meshBasicMaterial color="white" />
//       </mesh>
//     </group>
//   );
// }

// function VehicleModel({ 
//   selectedModelUrl, 
//   selectedModelColor, 
//   selectedModelIndex,
//   onRotationUpdate 
// }) {
//   const modelRef = useRef();
//   const gltf = useLoader(GLTFLoader, selectedModelUrl);
//   const [modelScene, setModelScene] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (gltf) {
//       // Handle both single and array results from useLoader
//       const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
//       const clonedScene = scene.clone();
//       setModelScene(clonedScene);
//     }
//   }, [gltf]);

//   useEffect(() => {
//     if (!modelScene) return;

//     modelScene.traverse((child) => {
//       if (child.isMesh) {
//         child.castShadow = true;
        
//         if (selectedModelColor && selectedModelIndex !== 0) {
//           if (child.material) {
//             if (Array.isArray(child.material)) {
//               child.material.forEach(mat => {
//                 mat.color.set(selectedModelColor);
//               });
//             } else {
//               child.material.color.set(selectedModelColor);
//             }
//           }
//         }
//       }
//     });
//   }, [modelScene, selectedModelColor, selectedModelIndex]);

//   useFrame(() => {
//     if (modelRef.current && !isHovered) {
//       const newRotation = modelRef.current.rotation.y + 0.005;
//       modelRef.current.rotation.y = newRotation;
      
//       // Pass rotation value to parent component
//       if (onRotationUpdate) {
//         onRotationUpdate(newRotation);
//       }
//     }
//   });

//   if (!modelScene) return null;

//   return (
//     <primitive
//       object={modelScene}
//       ref={modelRef}
//       scale={1}
//       position={[0, -0.99, 0]}
//       onPointerOver={() => setIsHovered(true)}
//       onPointerOut={() => setIsHovered(false)} 
//     />
//   );
// }

// function GroundSurface({ selectedSurface, selectedTexture }) {
//   const textureCollection = useLoader(TextureLoader, SURFACE_TEXTURES.map((t) => t.url));
//   const appliedTexture = selectedTexture !== null ? textureCollection[selectedTexture] : null;
  
//   return (
//     <mesh
//       rotation={[-Math.PI / 2, 0, 0]}
//       position={[0, -1, 0]}
//       receiveShadow
//     >
//       <planeGeometry args={[10, 10]} />
//       <meshStandardMaterial
//         key={selectedTexture}
//         map={appliedTexture || null}
//         color={appliedTexture ? undefined : selectedSurface.color}
//       />
//     </mesh>
//   );
// }

// function ScreenshotCapture({ onCaptureComplete }) {
//   const { gl, scene, camera } = useThree();
  
//   const captureScreenshot = () => {
//     gl.render(scene, camera);
//     const canvas = gl.domElement;
//     const dataURL = canvas.toDataURL('image/png');
    
//     if (onCaptureComplete) {
//       onCaptureComplete(dataURL);
//     }
//   };
  
//   return (
//     <Html position={[0, 0, 0]} center>
//       <button 
//         onClick={captureScreenshot}
//         style={{ 
//           display: 'none',
//           position: 'absolute',
//           top: '-1000px'
//         }}
//         id="hidden-screenshot-button"
//       >
//         Capture
//       </button>
//     </Html>
//   );
// }

// function SceneComposition({
//   selectedEnvironment,
//   selectedSurface,
//   selectedTexture,
//   backgroundColor,
//   selectedModelUrl,
//   selectedModelColor,
//   selectedModelIndex,
//   showDimensions,
//   modelIndex,
//   onCaptureComplete
// }) {
//   const { gl } = useThree();
//   const hdriMap = useLoader(RGBELoader, selectedEnvironment);
//   const [modelRotation, setModelRotation] = useState(0);
  
//   // Handle both single and array texture results
//   const environmentTexture = Array.isArray(hdriMap) ? hdriMap[0] : hdriMap;
//   environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
//   const handleRotationUpdate = (rotation) => {
//     setModelRotation(rotation);
//   };

//   useEffect(() => {
//     gl.setClearColor(new THREE.Color(backgroundColor));
//     gl.shadowMap.enabled = true;
//     gl.shadowMap.type = THREE.PCFSoftShadowMap;
//   }, [backgroundColor, gl]);

//   return (
//     <>
//       <PerspectiveCamera
//         makeDefault
//         position={[3, 2, 5]}
//         fov={50}
//         near={0.1}
//         far={1000}
//       />
//       <Environment background={environmentTexture} map={environmentTexture} resolution={256} />
//       <OrbitControls
//         enableDamping
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 2}
//       />
//       <Suspense fallback={<SceneLoader />}>
//         <GroundSurface
//           selectedSurface={selectedSurface}
//           selectedTexture={selectedTexture}
//         />
//       </Suspense>
//       <Suspense fallback={<SceneLoader />}>
//         <VehicleModel 
//           selectedModelUrl={selectedModelUrl}
//           selectedModelColor={selectedModelColor} 
//           selectedModelIndex={selectedModelIndex}
//           onRotationUpdate={handleRotationUpdate}
//         />
//         <DimensionLines 
//           isVisible={showDimensions}
//           modelIndex={modelIndex}
//           rotation={modelRotation}
//         />
//       </Suspense>
//       <directionalLight
//         position={[0, 5, 5]}
//         intensity={1.5}
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//         shadow-camera-far={50}
//         shadow-camera-left={-10}
//         shadow-camera-right={10}
//         shadow-camera-top={10}
//         shadow-camera-bottom={-10}
//       />
//       <ambientLight intensity={0.3} />
//       <ScreenshotCapture onCaptureComplete={onCaptureComplete} />
//     </>
//   );
// }

// export default function VehicleShowcase() {
//   const [environmentIndex, setEnvironmentIndex] = useState(0);
//   const [surfaceIndex, setSurfaceIndex] = useState(0);
//   const [textureIndex, setTextureIndex] = useState(-1);
//   const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
//   const [modelColorIndex, setModelColorIndex] = useState(0);
//   const [modelIndex, setModelIndex] = useState(0);
//   const [screenshotData, setScreenshotData] = useState(null);
//   const [showScreenshot, setShowScreenshot] = useState(false);
//   const [showDimensions, setShowDimensions] = useState(false);
//   const [showQRCode, setShowQRCode] = useState(false);
//   // const AR_VIEW_URL = MODEL_PRESETS[modelIndex].url;
//   // const AR_VIEW_URL = `https://viewar.app/model?url=${encodeURIComponent(window.location.origin + MODEL_PRESETS[modelIndex].url)}`;
//   const canvasRef = useRef(null);
//   const MODEL_URL = window.location.origin + MODEL_PRESETS[modelIndex].url;
//   const selectedEnvironment = ENVIRONMENT_PRESETS[environmentIndex].url;
//   const selectedSurface = SURFACE_COLORS[surfaceIndex];
//   const selectedTexture = textureIndex >= 0 ? textureIndex : null;
//   const backgroundColor = BACKGROUND_PALETTES[backgroundColorIndex].color;
//   const selectedModelColor = MODEL_COLORS[modelColorIndex].color;
//   const selectedModelUrl = MODEL_PRESETS[modelIndex].url;


  

//   const handleScreenshotCapture = (dataURL) => {
//     setScreenshotData(dataURL);
//     setShowScreenshot(true);
//   };

//   const takeScreenshot = () => {
//     const hiddenButton = document.getElementById('hidden-screenshot-button');
//     if (hiddenButton) {
//       hiddenButton.click();
//     }
//   };

//   const downloadScreenshot = () => {
//     if (!screenshotData) return;
    
//     const link = document.createElement('a');
//     link.href = screenshotData;
//     link.download = `vehicle-showcase-${new Date().getTime()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const closeScreenshot = () => {
//     setShowScreenshot(false);
//   };

//   const toggleDimensions = () => {
//     setShowDimensions(!showDimensions);
//   };

//   return (
//     <div style={{ height: "100vh", width: "100vw", position: "relative" }} ref={canvasRef}>
//       <Canvas shadows>
//         <SceneComposition
//           selectedEnvironment={selectedEnvironment}
//           selectedSurface={selectedSurface}
//           selectedTexture={selectedTexture}
//           backgroundColor={backgroundColor}
//           selectedModelUrl={selectedModelUrl}
//           selectedModelColor={selectedModelColor}
//           selectedModelIndex={modelColorIndex}
//           showDimensions={showDimensions}
//           modelIndex={modelIndex}
//           onCaptureComplete={handleScreenshotCapture}
//         />
//       </Canvas>
      
//       <div style={{
//         position: "absolute",
//         top: 10,
//         left: 10,
//         color: "white",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         padding: "10px",
//         borderRadius: "5px"
//       }}>
//         <div>
//           <label>Vehicle Model: </label>
//           <select onChange={(e) => {
//             setModelIndex(Number(e.target.value));
//             setModelColorIndex(0);
//           }}>
//             {MODEL_PRESETS.map((model, index) => (
//               <option key={model.name} value={index}>{model.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Environment: </label>
//           <select onChange={(e) => setEnvironmentIndex(Number(e.target.value))}>
//             {ENVIRONMENT_PRESETS.map((env, index) => (
//               <option key={env.name} value={index}>{env.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Surface Color: </label>
//           <select
//             onChange={(e) => setSurfaceIndex(Number(e.target.value))}
//             disabled={textureIndex >= 0}
//           >
//             {SURFACE_COLORS.map((surface, index) => (
//               <option key={surface.name} value={index}>{surface.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Surface Texture: </label>
//           <select onChange={(e) => setTextureIndex(Number(e.target.value) - 1)}>
//             <option value="-1">None</option>
//             {SURFACE_TEXTURES.map((tex, index) => (
//               <option key={tex.name} value={index + 1}>{tex.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Model Color: </label>
//           <select onChange={(e) => setModelColorIndex(Number(e.target.value))}>
//             {MODEL_COLORS.map((color, index) => (
//               <option key={color.name} value={index}>{color.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Background: </label>
//           <select onChange={(e) => setBackgroundColorIndex(Number(e.target.value))}>
//             {BACKGROUND_PALETTES.map((bg, index) => (
//               <option key={bg.name} value={index}>{bg.name}</option>
//             ))}
//           </select>
//         </div>
        
//         <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//           <button 
//             onClick={takeScreenshot}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             Take Screenshot
//           </button>
          
//           <button 
//             onClick={toggleDimensions}
//             style={{
//               padding: "2px 2px",
//               backgroundColor: showDimensions ? "#f44336" : "#2196F3",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             {showDimensions ? "Hide Dimensions" : "Show Dimensions"}
//           </button>
//           <button 
//             onClick={() => setShowQRCode(true)}
//             style={{
//               padding: "8px 15px",
//               backgroundColor: "#FF9800",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               flex: "1"
//             }}
//           >
//             View in AR
//           </button>
//         </div>
//       </div>
      
//       {showScreenshot && screenshotData && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.8)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000
//         }}>
//           <div style={{
//             maxWidth: "80%",
//             maxHeight: "80%",
//             overflow: "auto",
//             backgroundColor: "#fff",
//             borderRadius: "5px",
//             padding: "20px",
//             position: "relative"
//           }}>
//             <button 
//               onClick={closeScreenshot} 
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 background: "none",
//                 border: "none",
//                 fontSize: "20px",
//                 cursor: "pointer"
//               }}
//             >
//               ✕
//             </button>
//             <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Screenshot Preview</h3>
//             <img 
//               src={screenshotData} 
//               alt="Vehicle Screenshot" 
//               style={{ 
//                 maxWidth: "100%", 
//                 maxHeight: "60vh",
//                 display: "block", 
//                 margin: "0 auto" 
//               }} 
//             />
//             <div style={{ textAlign: "center", marginTop: "15px" }}>
//               <button 
//                 onClick={downloadScreenshot}
//                 style={{
//                   padding: "8px 15px",
//                   backgroundColor: "#4CAF50",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Download Screenshot
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {showQRCode && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.8)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000
//         }}>
//           <div style={{
//             padding: "20px",
//             backgroundColor: "white",
//             borderRadius: "10px",
//             textAlign: "center"
//           }}>
//             <h3>Scan to View in AR</h3>
//             <QRCodeCanvas value={MODEL_URL} size={200} />
//             <br />
//             <button 
//               onClick={() => setShowQRCode(false)}
//               style={{
//                 marginTop: "10px",
//                 padding: "8px 15px",
//                 backgroundColor: "#d32f2f",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer"
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











// import React, { useState, useRef, Suspense, useEffect } from "react";
// import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, Environment, useProgress, Html, PerspectiveCamera } from "@react-three/drei";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import { TextureLoader } from "three";
// import '@google/model-viewer';

// import { QRCodeCanvas } from "qrcode.react";

// const ENVIRONMENT_PRESETS = [
//     { name: "Compact Studio", url: "/xyz1.hdr" },
//     { name: "Golden Hour", url: "/xyz2.hdr" },
//     { name: "Woodland Glade", url: "/xyz3.hdr" },
// ];

// const SURFACE_COLORS = [
//     { name: "Industrial Gray", color: "#888888" },
//     { name: "Concrete Gray", color: "#555555" },
//     { name: "Desert Sand", color: "#B08D57" },
//     { name: "Pristine White", color: "#FFFFFF" },
//     { name: "Deep Navy", color: "#0A2A43" },
//     { name: "Forest Green", color: "#3B6B3B" },
//     { name: "Deep Crimson", color: "#8B0000" },
// ];

// const SURFACE_TEXTURES = [
//     { name: "Granite Finish", url: "/wood4.jpg" },
//     { name: "Marble Overlay", url: "/con1.jpg" },
//     { name: "Sand Pattern", url: "/wood3.jpg" },
//     { name: "Urban Concrete", url: "/txt2.jpg" },
//     { name: "Rustic Wood", url: "/txt2.jpg" },
// ];

// const BACKGROUND_PALETTES = [
//     { name: "Midnight", color: "#000000" },
//     { name: "Storm Cloud", color: "#444444" },
//     { name: "Clear Sky", color: "#87CEEB" },
//     { name: "Pure White", color: "#FFFFFF" },
//     { name: "Royal Purple", color: "#2E1A47" },
//     { name: "Olive Grove", color: "#808000" },
//     { name: "Soft Khaki", color: "#D2B48C" },
// ];

// const MODEL_PRESETS = [
//     { name: "Sports Bike", url: "/Karandeep.glb", dimensions: { length: "2.1m", width: "0.8m", height: "1.2m" } },
//     { name: "Sports Car", url: "/mod1.glb", dimensions: { length: "4.5m", width: "1.9m", height: "1.3m" } },
//     { name: "Luxury Sedan", url: "/mod3.glb", dimensions: { length: "5.1m", width: "1.9m", height: "1.5m" } },
// ];

// const MODEL_COLORS = [
//     { name: "Original", color: null },
//     { name: "Metallic Silver", color: "#C0C0C0" },
//     { name: "Racing Red", color: "#CC0000" },
//     { name: "Electric Blue", color: "#007FFF" },
//     { name: "Forest Green", color: "#228B22" },
//     { name: "Midnight Black", color: "#000000" },
//     { name: "Pearl White", color: "#F0F0F0" },
// ];

// function SceneLoader() {
//     const { progress } = useProgress();
//     return (
//         <Html center>
//             <div style={{ color: "white", fontSize: "18px" }}>
//                 Loading {Math.round(progress)}%
//             </div>
//         </Html>
//     );
// }

// function DimensionLines({ modelIndex, isVisible, rotation }) {
//     const groupRef = useRef();
//     const { scene } = useThree();

//     // Use the dimensions from the preset
//     const dimensions = MODEL_PRESETS[modelIndex].dimensions;
//     const length = parseFloat(dimensions.length);
//     const width = parseFloat(dimensions.width);
//     const height = parseFloat(dimensions.height);

//     // Apply rotation to the dimension lines group
//     useEffect(() => {
//         if (groupRef.current && rotation !== undefined) {
//             groupRef.current.rotation.y = rotation;
//         }
//     }, [rotation]);

//     if (!isVisible) return null;

//     return (
//         <group ref={groupRef} position={[0, -0.99, 0]}>
//             {/* Width line (X-axis) */}
//             <line>
//                 <bufferGeometry>
//                     <float32BufferAttribute
//                         attach="attributes-position"
//                         args={[new Float32Array([-width / 2, 0, 0, width / 2, 0, 0]), 3]}
//                     />
//                 </bufferGeometry>
//                 <lineBasicMaterial color="green" linewidth={2} />
//             </line>
//             <Html position={[0.2, 0.2, 0]} transform>
//                 <div style={{
//                     color: "green",
//                     backgroundColor: "rgba(0,0,0,0.7)",
//                     padding: "2px 2px",
//                     borderRadius: "4px",
//                     fontSize: "8px",
//                     whiteSpace: "nowrap",
//                     pointerEvents: "none"
//                 }}>
//                     Width: {dimensions.width}
//                 </div>
//             </Html>

//             {/* Height line (Y-axis) */}
//             <line>
//                 <bufferGeometry>
//                     <float32BufferAttribute
//                         attach="attributes-position"
//                         args={[new Float32Array([0, 0, 0, 0, height, 0]), 3]}
//                     />
//                 </bufferGeometry>
//                 <lineBasicMaterial color="blue" linewidth={2} />
//             </line>
//             <Html position={[0, height / 2, 0]} transform>
//                 <div style={{
//                     color: "blue",
//                     backgroundColor: "rgba(0,0,0,0.7)",
//                     padding: "2px 2px",
//                     fontSize: "8px",
//                     borderRadius: "2px",
//                     whiteSpace: "nowrap",
//                     pointerEvents: "none"
//                 }}>
//                     Height: {dimensions.height}
//                 </div>
//             </Html>

//             {/* Length line (Z-axis) */}
//             <line>
//                 <bufferGeometry>
//                     <float32BufferAttribute
//                         attach="attributes-position"
//                         args={[new Float32Array([0, 0, -length / 2, 0, 0, length / 2]), 3]}
//                     />
//                 </bufferGeometry>
//                 <lineBasicMaterial color="red" linewidth={2} />
//             </line>
//             <Html position={[0, 0, 0.4]} transform>
//                 <div style={{
//                     color: "red",
//                     backgroundColor: "rgba(0,0,0,0.7)",
//                     padding: "2px 1px",
//                     fontSize: "8px",
//                     borderRadius: "4px",
//                     whiteSpace: "nowrap",
//                     pointerEvents: "none"
//                 }}>
//                     Length: {dimensions.length}
//                 </div>
//             </Html>

//             {/* Origin point marker */}
//             <mesh position={[0, 0, 0]}>
//                 <sphereGeometry args={[0.05, 16, 16]} />
//                 <meshBasicMaterial color="white" />
//             </mesh>
//         </group>
//     );
// }

// function VehicleModel({
//     selectedModelUrl,
//     selectedModelColor,
//     selectedModelIndex,
//     onRotationUpdate
// }) {
//     const modelRef = useRef();
//     const gltf = useLoader(GLTFLoader, selectedModelUrl);
//     const [modelScene, setModelScene] = useState(null);
//     const [isHovered, setIsHovered] = useState(false);

//     useEffect(() => {
//         if (gltf) {
//             // Handle both single and array results from useLoader
//             const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
//             const clonedScene = scene.clone();
//             setModelScene(clonedScene);
//         }
//     }, [gltf]);

//     useEffect(() => {
//         if (!modelScene) return;

//         modelScene.traverse((child) => {
//             if (child.isMesh) {
//                 child.castShadow = true;

//                 if (selectedModelColor && selectedModelIndex !== 0) {
//                     if (child.material) {
//                         if (Array.isArray(child.material)) {
//                             child.material.forEach(mat => {
//                                 mat.color.set(selectedModelColor);
//                             });
//                         } else {
//                             child.material.color.set(selectedModelColor);
//                         }
//                     }
//                 }
//             }
//         });
//     }, [modelScene, selectedModelColor, selectedModelIndex]);

//     useFrame(() => {
//         if (modelRef.current && !isHovered) {
//             const newRotation = modelRef.current.rotation.y + 0.005;
//             modelRef.current.rotation.y = newRotation;

//             // Pass rotation value to parent component
//             if (onRotationUpdate) {
//                 onRotationUpdate(newRotation);
//             }
//         }
//     });

//     if (!modelScene) return null;

//     return (
//         <primitive
//             object={modelScene}
//             ref={modelRef}
//             scale={1}
//             position={[0, -0.99, 0]}
//             onPointerOver={() => setIsHovered(true)}
//             onPointerOut={() => setIsHovered(false)}
//         />
//     );
// }

// function GroundSurface({ selectedSurface, selectedTexture }) {
//     const textureCollection = useLoader(TextureLoader, SURFACE_TEXTURES.map((t) => t.url));
//     const appliedTexture = selectedTexture !== null ? textureCollection[selectedTexture] : null;

//     return (
//         <mesh
//             rotation={[-Math.PI / 2, 0, 0]}
//             position={[0, -1, 0]}
//             receiveShadow
//         >
//             <planeGeometry args={[10, 10]} />
//             <meshStandardMaterial
//                 key={selectedTexture}
//                 map={appliedTexture || null}
//                 color={appliedTexture ? undefined : selectedSurface.color}
//             />
//         </mesh>
//     );
// }

// function ScreenshotCapture({ onCaptureComplete }) {
//     const { gl, scene, camera } = useThree();

//     const captureScreenshot = () => {
//         gl.render(scene, camera);
//         const canvas = gl.domElement;
//         const dataURL = canvas.toDataURL('image/png');

//         if (onCaptureComplete) {
//             onCaptureComplete(dataURL);
//         }
//     };

//     return (
//         <Html position={[0, 0, 0]} center>
//             <button
//                 onClick={captureScreenshot}
//                 style={{
//                     display: 'none',
//                     position: 'absolute',
//                     top: '-1000px'
//                 }}
//                 id="hidden-screenshot-button"
//             >
//                 Capture
//             </button>
//         </Html>
//     );
// }

// function SceneComposition({
//     selectedEnvironment,
//     selectedSurface,
//     selectedTexture,
//     backgroundColor,
//     selectedModelUrl,
//     selectedModelColor,
//     selectedModelIndex,
//     showDimensions,
//     modelIndex,
//     onCaptureComplete
// }) {
//     const { gl } = useThree();
//     const hdriMap = useLoader(RGBELoader, selectedEnvironment);
//     const [modelRotation, setModelRotation] = useState(0);

//     // Handle both single and array texture results
//     const environmentTexture = Array.isArray(hdriMap) ? hdriMap[0] : hdriMap;
//     environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
//     const handleRotationUpdate = (rotation) => {
//         setModelRotation(rotation);
//     };

//     useEffect(() => {
//         gl.setClearColor(new THREE.Color(backgroundColor));
//         gl.shadowMap.enabled = true;
//         gl.shadowMap.type = THREE.PCFSoftShadowMap;
//     }, [backgroundColor, gl]);

//     return (
//         <>
//             <PerspectiveCamera
//                 makeDefault
//                 position={[3, 2, 5]}
//                 fov={50}
//                 near={0.1}
//                 far={1000}
//             />
//             <Environment background={environmentTexture} map={environmentTexture} resolution={256} />
//             <OrbitControls
//                 enableDamping
//                 minPolarAngle={Math.PI / 6}
//                 maxPolarAngle={Math.PI / 2}
//             />
//             <Suspense fallback={<SceneLoader />}>
//                 <GroundSurface
//                     selectedSurface={selectedSurface}
//                     selectedTexture={selectedTexture}
//                 />
//             </Suspense>
//             <Suspense fallback={<SceneLoader />}>
//                 <VehicleModel
//                     selectedModelUrl={selectedModelUrl}
//                     selectedModelColor={selectedModelColor}
//                     selectedModelIndex={selectedModelIndex}
//                     onRotationUpdate={handleRotationUpdate}
//                 />
//                 <DimensionLines
//                     isVisible={showDimensions}
//                     modelIndex={modelIndex}
//                     rotation={modelRotation}
//                 />
//             </Suspense>
//             <directionalLight
//                 position={[0, 5, 5]}
//                 intensity={1.5}
//                 castShadow
//                 shadow-mapSize-width={2048}
//                 shadow-mapSize-height={2048}
//                 shadow-camera-far={50}
//                 shadow-camera-left={-10}
//                 shadow-camera-right={10}
//                 shadow-camera-top={10}
//                 shadow-camera-bottom={-10}
//             />
//             <ambientLight intensity={0.3} />
//             <ScreenshotCapture onCaptureComplete={onCaptureComplete} />
//         </>
//     );
// }

// export default function VehicleShowcase() {
//     const [environmentIndex, setEnvironmentIndex] = useState(0);
//     const [surfaceIndex, setSurfaceIndex] = useState(0);
//     const [textureIndex, setTextureIndex] = useState(-1);
//     const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
//     const [modelColorIndex, setModelColorIndex] = useState(0);
//     const [modelIndex, setModelIndex] = useState(0);
//     const [screenshotData, setScreenshotData] = useState(null);
//     const [showScreenshot, setShowScreenshot] = useState(false);
//     const [showDimensions, setShowDimensions] = useState(false);
//     const [showQRCode, setShowQRCode] = useState(false);
//     const canvasRef = useRef(null);
//     const MODEL_URL = window.location.origin + MODEL_PRESETS[modelIndex].url;
//     const selectedEnvironment = ENVIRONMENT_PRESETS[environmentIndex].url;
//     const selectedSurface = SURFACE_COLORS[surfaceIndex];
//     const selectedTexture = textureIndex >= 0 ? textureIndex : null;
//     const backgroundColor = BACKGROUND_PALETTES[backgroundColorIndex].color;
//     const selectedModelColor = MODEL_COLORS[modelColorIndex].color;
//     const selectedModelUrl = MODEL_PRESETS[modelIndex].url;


//     const handleScreenshotCapture = (dataURL) => {
//         setScreenshotData(dataURL);
//         setShowScreenshot(true);
//     };

//     const takeScreenshot = () => {
//         const hiddenButton = document.getElementById('hidden-screenshot-button');
//         if (hiddenButton) {
//             hiddenButton.click();
//         }
//     };

//     const downloadScreenshot = () => {
//         if (!screenshotData) return;

//         const link = document.createElement('a');
//         link.href = screenshotData;
//         link.download = `vehicle-showcase-${new Date().getTime()}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const closeScreenshot = () => {
//         setShowScreenshot(false);
//     };

//     const toggleDimensions = () => {
//         setShowDimensions(!showDimensions);
//     };

//     const openARViewer = () => {
//         const modelUrl = MODEL_URL;
//         const title = MODEL_PRESETS[modelIndex].name;

//         // Construct the model-viewer element
//         const modelViewer = document.createElement('model-viewer');
//         modelViewer.setAttribute('src', modelUrl);
//         modelViewer.setAttribute('ar', '');
//         modelViewer.setAttribute('ar-modes', 'scene-viewer quick-look');
//         modelViewer.setAttribute('camera-controls', '');
//         modelViewer.setAttribute('alt', `A 3D model of a ${title}`);
//         modelViewer.style.width = '100%';
//         modelViewer.style.height = '100%';
//         modelViewer.style.position = 'fixed';
//         modelViewer.style.top = '0';
//         modelViewer.style.left = '0';
//         modelViewer.style.zIndex = '2000'; // Ensure it's on top

//         // Add a close button
//         const closeButton = document.createElement('button');
//         closeButton.innerText = 'Close AR';
//         closeButton.style.position = 'absolute';
//         closeButton.style.top = '20px';
//         closeButton.style.right = '20px';
//         closeButton.style.padding = '10px 15px';
//         closeButton.style.background = '#f44336';
//         closeButton.style.color = 'white';
//         closeButton.style.border = 'none';
//         closeButton.style.borderRadius = '4px';
//         closeButton.style.cursor = 'pointer';
//         closeButton.style.zIndex = '2001'; // Above the model-viewer
//         closeButton.onclick = () => {
//             document.body.removeChild(modelViewer);
//             document.body.removeChild(closeButton);
//         };

//         document.body.appendChild(modelViewer);
//         document.body.appendChild(closeButton);
//     };

//     return (
//         <div style={{ height: "100vh", width: "100vw", position: "relative" }} ref={canvasRef}>
//             <Canvas shadows>
//                 <SceneComposition
//                     selectedEnvironment={selectedEnvironment}
//                     selectedSurface={selectedSurface}
//                     selectedTexture={selectedTexture}
//                     backgroundColor={backgroundColor}
//                     selectedModelUrl={selectedModelUrl}
//                     selectedModelColor={selectedModelColor}
//                     selectedModelIndex={modelColorIndex}
//                     showDimensions={showDimensions}
//                     modelIndex={modelIndex}
//                     onCaptureComplete={handleScreenshotCapture}
//                 />
//             </Canvas>

//             <div style={{
//                 position: "absolute",
//                 top: 10,
//                 left: 10,
//                 color: "white",
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 padding: "10px",
//                 borderRadius: "5px"
//             }}>
//                 <div>
//                     <label>Vehicle Model: </label>
//                     <select onChange={(e) => {
//                         setModelIndex(Number(e.target.value));
//                         setModelColorIndex(0);
//                     }}>
//                         {MODEL_PRESETS.map((model, index) => (
//                             <option key={model.name} value={index}>{model.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Environment: </label>
//                     <select onChange={(e) => setEnvironmentIndex(Number(e.target.value))}>
//                         {ENVIRONMENT_PRESETS.map((env, index) => (
//                             <option key={env.name} value={index}>{env.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Surface Color: </label>
//                     <select
//                         onChange={(e) => setSurfaceIndex(Number(e.target.value))}
//                         disabled={textureIndex >= 0}
//                     >
//                         {SURFACE_COLORS.map((surface, index) => (
//                             <option key={surface.name} value={index}>{surface.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Surface Texture: </label>
//                     <select onChange={(e) => setTextureIndex(Number(e.target.value) - 1)}>
//                         <option value="-1">None</option>
//                         {SURFACE_TEXTURES.map((tex, index) => (
//                             <option key={tex.name} value={index + 1}>{tex.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Model Color: </label>
//                     <select onChange={(e) => setModelColorIndex(Number(e.target.value))}>
//                         {MODEL_COLORS.map((color, index) => (
//                             <option key={color.name} value={index}>{color.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Background: </label>
//                     <select onChange={(e) => setBackgroundColorIndex(Number(e.target.value))}>
//                         {BACKGROUND_PALETTES.map((bg, index) => (
//                             <option key={bg.name} value={index}>{bg.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
//                     <button
//                         onClick={takeScreenshot}
//                         style={{
//                             padding: "8px 15px",
//                             backgroundColor: "#4CAF50",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                             flex: "1"
//                         }}
//                     >
//                         Take Screenshot
//                     </button>

//                     <button
//                         onClick={toggleDimensions}
//                         style={{
//                             padding: "2px 2px",
//                             backgroundColor: showDimensions ? "#f44336" : "#2196F3",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                             flex: "1"
//                         }}
//                     >
//                         {showDimensions ? "Hide Dimensions" : "Show Dimensions"}
//                     </button>
//                     <button
//                         onClick={openARViewer}
//                         style={{
//                             padding: "8px 15px",
//                             backgroundColor: "#FF9800",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                             flex: "1"
//                         }}
//                     >
//                         View in AR
//                     </button>
//                 </div>
//             </div>

//             {showScreenshot && screenshotData && (
//                 <div style={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     backgroundColor: "rgba(0,0,0,0.8)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     zIndex: 1000
//                 }}>
//                     <div style={{
//                         maxWidth: "80%",
//                         maxHeight: "80%",
//                         overflow: "auto",
//                         backgroundColor: "#fff",
//                         borderRadius: "5px",
//                         padding: "20px",
//                         position: "relative"
//                     }}>
//                         <button
//                             onClick={closeScreenshot}
//                             style={{
//                                 position: "absolute",
//                                 top: "10px",
//                                 right: "10px",
//                                 background: "none",
//                                 border: "none",
//                                 fontSize: "20px",
//                                 cursor: "pointer"
//                             }}
//                         >
//                             ✕
//                         </button>
//                         <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Screenshot Preview</h3>
//                         <img
//                             src={screenshotData}
//                             alt="Vehicle Screenshot"
//                             style={{
//                                 maxWidth: "100%",
//                                 maxHeight: "60vh",
//                                 display: "block",
//                                 margin: "0 auto"
//                             }}
//                         />
//                         <div style={{ textAlign: "center", marginTop: "15px" }}>
//                             <button
//                                 onClick={downloadScreenshot}
//                                 style={{
//                                     padding: "8px 15px",
//                                     backgroundColor: "#4CAF50",
//                                     color: "white",
//                                     border: "none",
//                                     borderRadius: "4px",
//                                     cursor: "pointer"
//                                 }}
//                             >
//                                 Download Screenshot
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showQRCode && (
//                 <div style={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     backgroundColor: "rgba(0,0,0,0.8)",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     zIndex: 1000
//                 }}>
//                     <div style={{
//                         padding: "20px",
//                         backgroundColor: "white",
//                         borderRadius: "10px",
//                         textAlign: "center"
//                     }}>
//                         <h3>Scan to View in AR</h3>
//                         <QRCodeCanvas value={MODEL_URL} size={200} />
//                         <br />
//                         <button
//                             onClick={() => setShowQRCode(false)}
//                             style={{
//                                 marginTop: "10px",
//                                 padding: "8px 15px",
//                                 backgroundColor: "#d32f2f",
//                                 color: "white",
//                                 border: "none",
//                                 borderRadius: "4px",
//                                 cursor: "pointer"
//                             }}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { TextureLoader } from "three";
import '@google/model-viewer';

import { QRCodeCanvas } from "qrcode.react";

// Constants for configuration
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

const MODEL_PRESETS = [
    { name: "Sports Bike", url: "/Karandeep.glb", dimensions: { length: "2.1m", width: "0.8m", height: "1.2m" } },
    { name: "Sports Car", url: "/mod1.glb", dimensions: { length: "4.5m", width: "1.9m", height: "1.3m" } },
    { name: "Luxury Sedan", url: "/mod3.glb", dimensions: { length: "5.1m", width: "1.9m", height: "1.5m" } },
];

const MODEL_COLORS = [
    { name: "Original", color: null },
    { name: "Metallic Silver", color: "#C0C0C0" },
    { name: "Racing Red", color: "#CC0000" },
    { name: "Electric Blue", color: "#007FFF" },
    { name: "Forest Green", color: "#228B22" },
    { name: "Midnight Black", color: "#000000" },
    { name: "Pearl White", color: "#F0F0F0" },
];

// Utility component for displaying loading progress
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

// Component to display dimension lines
function DimensionLines({ modelIndex, isVisible, rotation }) {
    const groupRef = useRef();
    const dimensions = MODEL_PRESETS[modelIndex].dimensions;
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);

    useEffect(() => {
        if (groupRef.current && rotation !== undefined) {
            groupRef.current.rotation.y = rotation;
        }
    }, [rotation]);

    if (!isVisible) return null;

    const createLine = (points, color) => (
        <line>
            <bufferGeometry>
                <float32BufferAttribute attach="attributes-position" args={[new Float32Array(points), 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={color} linewidth={2} />
        </line>
    );

    const createLabel = (position, text, color) => (
        <Html position={position} transform>
            <div style={{
                color,
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "2px 2px",
                borderRadius: "4px",
                fontSize: "8px",
                whiteSpace: "nowrap",
                pointerEvents: "none"
            }}>
                {text}
            </div>
        </Html>
    );

    return (
        <group ref={groupRef} position={[0, -0.99, 0]}>
            {createLine([-width / 2, 0, 0, width / 2, 0, 0], "green")}
            {createLabel([0.2, 0.2, 0], `Width: ${dimensions.width}`, "green")}

            {createLine([0, 0, 0, 0, height, 0], "blue")}
            {createLabel([0, height / 2, 0], `Height: ${dimensions.height}`, "blue")}

            {createLine([0, 0, -length / 2, 0, 0, length / 2], "red")}
            {createLabel([0, 0, 0.4], `Length: ${dimensions.length}`, "red")}

            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="white" />
            </mesh>
        </group>
    );
}

// Component to display the 3D vehicle model
function VehicleModel({ selectedModelUrl, selectedModelColor, selectedModelIndex, onRotationUpdate }) {
    const modelRef = useRef();
    const gltf = useLoader(GLTFLoader, selectedModelUrl);
    const [modelScene, setModelScene] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (gltf) {
            const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene;
            setModelScene(scene.clone());
        }
    }, [gltf]);

    useEffect(() => {
        if (!modelScene) return;
        modelScene.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                if (selectedModelColor && selectedModelIndex !== 0) {
                    const color = new THREE.Color(selectedModelColor);
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => { if (mat.color) mat.color.copy(color); });
                    } else if (child.material.color) {
                        child.material.color.copy(color);
                    }
                }
            }
        });
    }, [modelScene, selectedModelColor, selectedModelIndex]);

    useFrame(() => {
        if (modelRef.current && !isHovered) {
            modelRef.current.rotation.y += 0.005;
            if (onRotationUpdate) {
                onRotationUpdate(modelRef.current.rotation.y);
            }
        }
    });

    return modelScene && (
        <primitive
            object={modelScene}
            ref={modelRef}
            scale={1}
            position={[0, -0.99, 0]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        />
    );
}

// Component for the ground surface
function GroundSurface({ selectedSurface, selectedTexture }) {
    const textures = useLoader(TextureLoader, SURFACE_TEXTURES.map(t => t.url));
    const textureMap = selectedTexture !== null ? textures[selectedTexture] : null;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial key={selectedTexture} map={textureMap} color={textureMap ? undefined : selectedSurface.color} />
        </mesh>
    );
}

// Component to capture a screenshot
function ScreenshotCapture({ onCaptureComplete }) {
    const { gl, scene, camera } = useThree();
    const capture = () => {
        gl.render(scene, camera);
        onCaptureComplete(gl.domElement.toDataURL('image/png'));
    };
    return <Html position={[0, 0, 0]} center><button id="hidden-screenshot-button" style={{ display: 'none' }} onClick={capture}>Capture</button></Html>;
}

// Main component for the 3D scene composition
function SceneComposition({ sceneConfig, onCaptureComplete, onRotationUpdate }) {
    const { selectedEnvironment, selectedSurface, selectedTexture, backgroundColor, selectedModelUrl, selectedModelColor, selectedModelIndex, showDimensions, modelIndex } = sceneConfig;
    const { gl } = useThree();
    const environmentMap = useLoader(RGBELoader, selectedEnvironment);
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    useEffect(() => {
        gl.setClearColor(new THREE.Color(backgroundColor));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }, [backgroundColor, gl]);

    return (
        <>
            <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} near={0.1} far={1000} />
            <Environment background={environmentMap} map={environmentMap} resolution={256} />
            <OrbitControls enableDamping minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
            <Suspense fallback={<SceneLoader />}>
                <GroundSurface selectedSurface={selectedSurface} selectedTexture={selectedTexture} />
                <VehicleModel
                    selectedModelUrl={selectedModelUrl}
                    selectedModelColor={selectedModelColor}
                    selectedModelIndex={selectedModelIndex}
                    onRotationUpdate={onRotationUpdate}
                />
                <DimensionLines isVisible={showDimensions} modelIndex={modelIndex} />
            </Suspense>
            <directionalLight position={[0, 5, 5]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-far={50} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} />
            <ambientLight intensity={0.3} />
            <ScreenshotCapture onCaptureComplete={onCaptureComplete} />
        </>
    );
}

// Main application component
export default function VehicleShowcase() {
    const [environmentIndex, setEnvironmentIndex] = useState(0);
    const [surfaceIndex, setSurfaceIndex] = useState(0);
    const [textureIndex, setTextureIndex] = useState(-1);
    const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
    const [modelColorIndex, setModelColorIndex] = useState(0);
    const [modelIndex, setModelIndex] = useState(0);
    const [screenshotData, setScreenshotData] = useState(null);
    const [showScreenshot, setShowScreenshot] = useState(false);
    const [showDimensions, setShowDimensions] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const [modelRotation, setModelRotation] = useState(0);
    const canvasRef = useRef(null);
    const modelUrl = window.location.origin + MODEL_PRESETS[modelIndex].url;

    const sceneConfig = {
        selectedEnvironment: ENVIRONMENT_PRESETS[environmentIndex].url,
        selectedSurface: SURFACE_COLORS[surfaceIndex],
        selectedTexture: textureIndex >= 0 ? textureIndex : null,
        backgroundColor: BACKGROUND_PALETTES[backgroundColorIndex].color,
        selectedModelColor: MODEL_COLORS[modelColorIndex].color,
        selectedModelUrl: MODEL_PRESETS[modelIndex].url,
        selectedModelIndex: modelColorIndex,
        showDimensions,
        modelIndex,
    };

    const handleScreenshotCapture = setScreenshotData;
    const handleRotationUpdate = setModelRotation;
    const takeScreenshot = () => document.getElementById('hidden-screenshot-button')?.click();
    const downloadScreenshot = () => {
        if (screenshotData) {
            const link = document.createElement('a');
            link.href = screenshotData;
            link.download = `vehicle-showcase-${new Date().getTime()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const closeScreenshot = () => setShowScreenshot(false);
    const toggleDimensions = () => setShowDimensions(!showDimensions);

    const openARViewer = () => {
        const modelViewer = document.createElement('model-viewer');
        modelViewer.src = modelUrl;
        modelViewer.ar = true;
        modelViewer['ar-modes'] = 'scene-viewer quick-look';
        modelViewer.cameraControls = true;
        modelViewer.alt = `A 3D model of a ${MODEL_PRESETS[modelIndex].name}`;
        modelViewer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 2000; background-color: white;'; // Set background to white

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close AR';
        closeButton.style.cssText = 'position: absolute; top: 20px; right: 20px; padding: 10px 15px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; z-index: 2001;';
        closeButton.onclick = () => {
            document.body.removeChild(modelViewer);
            document.body.removeChild(closeButton);
        };

        document.body.appendChild(modelViewer);
        document.body.appendChild(closeButton);
    };

    return (
        <div style={{ height: "100vh", width: "100vw", position: "relative" }} ref={canvasRef}>
            <Canvas shadows>
                <SceneComposition sceneConfig={sceneConfig} onCaptureComplete={handleScreenshotCapture} onRotationUpdate={handleRotationUpdate} />
            </Canvas>

            <div style={{ position: "absolute", top: 10, left: 10, color: "white", backgroundColor: "rgba(0,0,0,0.5)", padding: "10px", borderRadius: "5px" }}>
                <div>
                    <label>Vehicle Model: </label>
                    <select value={modelIndex} onChange={(e) => { setModelIndex(Number(e.target.value)); setModelColorIndex(0); }}>
                        {MODEL_PRESETS.map((model, index) => <option key={model.name} value={index}>{model.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Environment: </label>
                    <select value={environmentIndex} onChange={(e) => setEnvironmentIndex(Number(e.target.value))}>
                        {ENVIRONMENT_PRESETS.map((env, index) => <option key={env.name} value={index}>{env.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Surface Color: </label>
                    <select value={surfaceIndex} onChange={(e) => setSurfaceIndex(Number(e.target.value))} disabled={textureIndex >= 0}>
                        {SURFACE_COLORS.map((surface, index) => <option key={surface.name} value={index}>{surface.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Surface Texture: </label>
                    <select value={textureIndex + 1} onChange={(e) => setTextureIndex(Number(e.target.value) - 1)}>
                        <option value="0">None</option>
                        {SURFACE_TEXTURES.map((tex, index) => <option key={tex.name} value={index +1}>{tex.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Model Color: </label>
                    <select value={modelColorIndex} onChange={(e) => setModelColorIndex(Number(e.target.value))}>
                        {MODEL_COLORS.map((color, index) => <option key={color.name} value={index}>{color.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Background: </label>
                    <select value={backgroundColorIndex} onChange={(e) => setBackgroundColorIndex(Number(e.target.value))}>
                        {BACKGROUND_PALETTES.map((bg, index) => <option key={bg.name} value={index}>{bg.name}</option>)}
                    </select>
                </div>

                <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                    <button onClick={takeScreenshot} style={{ padding: "8px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", flex: "1" }}>
                        Take Screenshot
                    </button>

                    <button onClick={toggleDimensions} style={{ padding: "2px 2px", backgroundColor: showDimensions ? "#f44336" : "#2196F3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", flex: "1" }}>
                        {showDimensions ? "Hide Dimensions" : "Show Dimensions"}
                    </button>
                    <button onClick={openARViewer} style={{ padding: "8px 15px", backgroundColor: "#FF9800", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", flex: "1" }}>
                        View in AR
                    </button>
                </div>
            </div>

            {showScreenshot && screenshotData && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                    <div style={{ maxWidth: "80%", maxHeight: "80%", overflow: "auto", backgroundColor: "#fff", borderRadius: "5px", padding: "20px", position: "relative" }}>
                        <button onClick={closeScreenshot} style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>
                            ✕
                        </button>
                        <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Screenshot Preview</h3>
                        <img src={screenshotData} alt="Vehicle Screenshot" style={{ maxWidth: "100%", maxHeight: "60vh", display: "block", margin: "0 auto" }} />
                        <div style={{ textAlign: "center", marginTop: "15px" }}>
                            <button onClick={downloadScreenshot} style={{ padding: "8px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                Download Screenshot
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showQRCode && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
                    <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "10px", textAlign: "center" }}>
                        <h3>Scan to View in AR</h3>
                        <QRCodeCanvas value={modelUrl} size={200} />
                        <br />
                        <button onClick={() => setShowQRCode(false)} style={{ marginTop: "10px", padding: "8px 15px", backgroundColor: "#d32f2f", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}