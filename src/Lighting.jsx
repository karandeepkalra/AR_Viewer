// import { useThree } from "@react-three/fiber";

// export default function Lighting() {
//   const { scene } = useThree();
  
//   return (
//     <>
//       <ambientLight intensity={1.5} />
//       <directionalLight
//         position={[0, 8, 0]}
//         castShadow
//         intensity={2}
//         shadow-mapSize-width={4096}
//         shadow-mapSize-height={4096}
//         shadow-camera-near={0.5}
//         shadow-camera-far={30}
//         shadow-bias={-0.001}
//         shadow-radius={4}
//       />
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
//         <planeGeometry args={[10, 10]} />
//         <shadowMaterial opacity={0.4} transparent />
//       </mesh>
//     </>
//   );
// }



import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { TextureLoader } from "three";
import { QRCodeSVG } from 'qrcode.react';
import '@google/model-viewer'; // Import model-viewer for AR

// HDRI Options (for reflections only)
const HDRI_OPTIONS = [
  { name: "Studio Small", url: "/studio_small_04_1k.hdr" },
  { name: "Sunset", url: "/golden_gate_hills_4k.hdr" },
  { name: "Forest", url: "/spruit_sunrise_4k.hdr" },
];

// Plane Color Options
const PLANE_OPTIONS = [
  { name: "Metallic", color: "#888888" },
  { name: "Stone", color: "#555555" },
  { name: "Sand", color: "#b08d57" },
  { name: "White", color: "#FFFFFF" },
  { name: "Dark Blue", color: "#0a2a43" },
  { name: "Green", color: "#3b6b3b" },
  { name: "Red", color: "#8b0000" },
];

// Plane Texture Options
const PLANE_TEXTURES = [
  { name: "Texture 1", url: "/abstract-geometric-background-shapes-texture.jpg" },
  { name: "Texture 2", url: "/cement-wall-with-coarse-appearance.jpg" },
  { name: "Texture 3", url: "/close-up-asphalt-texture.jpg" },
  { name: "Texture 4", url: "/close-up-bright-glitter.jpg" },
  { name: "Texture 5", url: "/cracked-asphalt-texture.jpg" },
];

// Background Color Options
const BACKGROUND_COLORS = [
  { name: "Black", color: "#000000" },
  { name: "Gray", color: "#444444" },
  { name: "Sky Blue", color: "#87CEEB" },
  { name: "White", color: "#FFFFFF" },
  { name: "Dark Purple", color: "#2E1A47" },
  { name: "Olive", color: "#808000" },
  { name: "Warm Beige", color: "#D2B48C" },
];

// Loader Component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white", fontSize: "18px" }}>Loading {Math.round(progress)}%</div>
    </Html>
  );
}

// Car Model Component
function CarModel({ setModelLoaded, showDimensions, carRef }) {
  const gltf = useLoader(GLTFLoader, "/untitled.glb");
  const modelRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, length: 0 });

  const actualRef = carRef || modelRef;

  useEffect(() => {
    setModelLoaded(true);

    if (gltf.scene) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      setDimensions({
        width: size.x.toFixed(2),
        height: size.y.toFixed(2),
        length: size.z.toFixed(2),
      });
    }
  }, [setModelLoaded, gltf.scene]);

  useFrame(() => {
    if (actualRef.current) actualRef.current.rotation.y += 0.005;
  });

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf]);

  const createFixedDimensionLines = () => {
    const createLine = (color, start, end, label, offset = [0, 0, 0]) => {
      return (
        <>
          <line>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={new Float32Array([...start, ...end])} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color={color} linewidth={2} />
          </line>
          <Html position={[end[0] + offset[0], end[1] + offset[1], end[2] + offset[2]]} center>
            <div
              style={{
                color,
                background: "rgba(0,0,0,0.7)",
                padding: "5px",
                borderRadius: "3px",
                fontWeight: "bold",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </div>
          </Html>
        </>
      );
    };

    const staticLength = 3;
    const staticWidth = 2;
    const staticHeight = 1.5;

    const widthStart = [0, -0.5, 0];
    const widthEnd = [staticLength, -0.5, 0];
    const lengthStart = [0, -0.5, 0];
    const lengthEnd = [0, -0.5, staticWidth];
    const heightStart = [0, -0.5, 0];
    const heightEnd = [0, staticHeight, 0];

    return (
      <>
        {createLine("red", lengthStart, lengthEnd, Length: ${staticLength} m, [0, 0, 1])}
        {createLine("green", widthStart, widthEnd, Width: ${staticWidth} m, [1, 0, 0])}
        {createLine("blue", heightStart, heightEnd, Height: ${staticHeight} m, [0, 1, 0])}
      </>
    );
  };

  return (
    <>
      <primitive object={gltf.scene} ref={actualRef} scale={1} position={[0, -0.62, 0]} />

      {showDimensions && (
        <>
          {createFixedDimensionLines("red", dimensions.length, [0, -0.5, 2], "x")}
          {createFixedDimensionLines("green", dimensions.width, [2, -0.5, 0], "z")}
          {createFixedDimensionLines("blue", dimensions.height, [0, dimensions.height / 2 - 0.62, -2], "y")}
        </>
      )}
    </>
  );
}

// Plane Component
function Plane({ selectedPlane, selectedTexture }) {
  const textures = useLoader(TextureLoader, PLANE_TEXTURES.map((t) => t.url));
  const appliedTexture = selectedTexture !== null ? textures[selectedTexture] : null;
  const materialRef = useRef();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true;
    }
  }, [selectedTexture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial ref={materialRef} map={appliedTexture} color={appliedTexture ? undefined : selectedPlane.color} />
    </mesh>
  );
}

// Scene Component
function Scene({ selectedEnv, selectedPlane, selectedTexture, backgroundColor, setLoaded, showDimensions, onScreenshot }) {
  const { gl, scene, camera } = useThree();
  const carRef = useRef();
  const texture = useLoader(RGBELoader, selectedEnv);
  const animationPausedRef = useRef(false);

  texture.mapping = THREE.EquirectangularReflectionMapping;

  useEffect(() => {
    gl.setClearColor(new THREE.Color(backgroundColor));
    scene.fog = new THREE.Fog(new THREE.Color(backgroundColor), 3, 12);
    setLoaded(true);
  }, [backgroundColor, gl, scene, setLoaded]);

  useEffect(() => {
    if (onScreenshot) {
      onScreenshot.current = () => {
        animationPausedRef.current = true;
        gl.render(scene, camera);
        const screenshot = gl.domElement.toDataURL("image/png");
        animationPausedRef.current = false;
        return screenshot;
      };
    }
  }, [gl, scene, camera, onScreenshot]);

  return (
    <>
      <Environment background={false} map={texture} />
      <OrbitControls enableDamping minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />

      <Suspense fallback={<Loader />}>
        <Plane selectedPlane={selectedPlane} selectedTexture={selectedTexture} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <CarModel setModelLoaded={() => setLoaded("model")} showDimensions={showDimensions} carRef={carRef} />
      </Suspense>

      <directionalLight position={[5, 10, 5]} intensity={8} castShadow shadow-mapSize-width={4096} shadow-mapSize-height={4096} shadow-camera-near={0.5} shadow-camera-far={20} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
      <spotLight position={[3, 8, 3]} angle={0.4} penumbra={0.5} intensity={2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-bias={-0.0001} />
      <ambientLight intensity={0.2} />
    </>
  );
}

// Main ThreeScene Component
export default function ThreeScene() {
  const [envIndex, setEnvIndex] = useState(0);
  const [planeIndex, setPlaneIndex] = useState(0);
  const [textureIndex, setTextureIndex] = useState(-1);
  const [bgColorIndex, setBgColorIndex] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState({ model: false, environment: false });
  const [showQR, setShowQR] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [screenshotData, setScreenshotData] = useState(null);
  const audioRef = useRef(null);
  const modelViewerRef = useRef(null); // Ref for model-viewer
  const [showAR, setShowAR] = useState(false);

  const gltf = useLoader(GLTFLoader, "/untitled.glb");

  useEffect(() => {
    if (gltf.scene) {
      setLoadedAssets((prev) => ({ ...prev, model: true }));
    }
  }, [gltf]);

  useEffect(() => {
    if (audioRef.current) {
      const playMusic = () => {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay blocked: User interaction required", error);
        });
      };
      playMusic();
    }
  }, []);

  useEffect(() => {
    if (loadedAssets.model && loadedAssets.environment && audioRef.current) {
      const playMusic = () => {
        audioRef.current.play().catch(() => {
          console.log("User interaction required to play audio.");
        });
      };
      document.addEventListener("click", playMusic, { once: true });
    }
  }, [loadedAssets]);

  const handleLoaded = (type) => {
    setLoadedAssets((prev) => ({ ...prev, [type]: true }));
  };

  const handleDimensionsButtonClick = () => {
    setShowDimensions(!showDimensions);
  };

  const handleScreenshotButtonClick = () => {
    if (showAR && modelViewerRef.current) {
      modelViewerRef.current.toBlob({ mimeType: 'image/png' }).then((blob) => {
        const url = URL.createObjectURL(blob);
        setScreenshotData(url);
      });
    } else if (!showAR) {
      // Logic for screenshot in non-AR mode (using Canvas)
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const screenshotURL = canvas.toDataURL('image/png');
        setScreenshotData(screenshotURL);
      }
    }
  };

  const downloadScreenshot = () => {
    if (screenshotData) {
      const link = document.createElement('a');
      link.href = screenshotData;
      link.download = 'car-visualization.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const closeScreenshot = () => {
    setScreenshotData(null);
  };

  const handleARButtonClick = () => {
    if (showAR) {
      setShowAR(false);
      
  } else {
      setShowAR(true);
      
  }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {showAR ? (
        <model-viewer
          ref={modelViewerRef}
          src="/untitled.glb"
          ar
        ar-modes="scene-viewer webxr quick-look"
          camera-controls
          auto-rotate
          style={{ width: '300px', height: '300px' }}
        >
        </model-viewer>
      ) : (
        <Canvas shadows={true} camera={{ position: [0, 1.5, 6], fov: 50 }} gl={{ preserveDrawingBuffer: true }}>
          <Scene
            selectedEnv={HDRI_OPTIONS[envIndex].url}
            selectedPlane={PLANE_OPTIONS[planeIndex]}
            selectedTexture={textureIndex >= 0 ? textureIndex : null}
            backgroundColor={BACKGROUND_COLORS[bgColorIndex].color}
            setLoaded={handleLoaded}
            showDimensions={showDimensions}
            onScreenshot={null} // Remove onScreenshot if using model-viewer for AR
          />
        </Canvas>
      )}

      <audio ref={audioRef} src="./Underground.mp3" loop />

      <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <label>Environment:</label>
        <select onChange={(e) => setEnvIndex(Number(e.target.value))}>
          {HDRI_OPTIONS.map((env, index) => (
            <option key={env.name} value={index}>{env.name}</option>
          ))}
        </select>
        <label>Plane Color:</label>
        <select onChange={(e) => setPlaneIndex(Number(e.target.value))}>
          {PLANE_OPTIONS.map((plane, index) => (
            <option key={plane.name} value={index}>{plane.name}</option>
          ))}
        </select>
        <label>Plane Texture:</label>
        <select onChange={(e) => setTextureIndex(Number(e.target.value) - 1)}>
          <option value="-1">None</option>
          {PLANE_TEXTURES.map((texture, index) => (
            <option key={texture.name} value={index + 1}>{texture.name}</option>
          ))}
        </select>
        <label>Background Color:</label>
        <select onChange={(e) => setBgColorIndex(Number(e.target.value))}>
          {BACKGROUND_COLORS.map((bg, index) => (
            <option key={bg.name} value={index}>{bg.name}</option>
          ))}
        </select>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={handleARButtonClick}
            style={{ padding: "10px", backgroundColor: "#444", color: "white", border: "none", cursor: "pointer", marginBottom: "5px", borderRadius: "4px" }}
          >
            {showAR ? "Exit AR View" : "View in AR"}
          </button>
          <button
            onClick={handleDimensionsButtonClick}
            style={{ padding: "10px", backgroundColor: showDimensions ? "#555" : "#444", color: "white", border: "none", cursor: "pointer", marginBottom: "5px", borderRadius: "4px" }}
          >
            {showDimensions ? "Hide Dimensions" : "View Dimensions"}
          </button>
          <button
            onClick={handleScreenshotButtonClick}
            style={{ padding: "10px", backgroundColor: "#444", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}
          >
            Capture Screenshot
          </button>
        </div>
        {showQR && (
          <div
            style={{
              position: "absolute",
              top: "300px",
              left: "10px",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            <QRCodeSVG value="https://my-r3f-project-pi.vercel.app/untitled.glb" size={256} />
            <p style={{ color: "white", marginTop: "10px" }}>Scan this QR code to view in AR.</p>
            <button
              onClick={() => setShowQR(false)}
              style={{ padding: "5px 10px", backgroundColor: "#555", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
      {screenshotData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
            }}
          >
            <h3 style={{ color: "white", marginTop: 0 }}>Screenshot Preview</h3>
            <img
              src={screenshotData}
              alt="Car Visualization Screenshot"
              style={{ maxWidth: "100%", maxHeight: "70vh", border: "1px solid #444" }}
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "15px" }}>
              <button
                onClick={downloadScreenshot}
                style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Download
              </button>
              <button
                onClick={closeScreenshot}
                style={{ padding: "10px 20px", backgroundColor: "#555", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}