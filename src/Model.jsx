import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Model() {
  const gltf = useLoader(GLTFLoader, "src/assets/Karandeep.glb");
  return (
    <primitive 
    object={gltf.scene} 
    position={[0, 0, 0]} 
    scale={[5, 5, 5]}  // Increase scale
    castShadow 
  />
  );
}
