import { useThree } from "@react-three/fiber";

export default function Lighting() {
  const { scene } = useThree();
  
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[0, 8, 0]}
        castShadow
        intensity={2}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-bias={-0.001}
        shadow-radius={4}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.4} transparent />
      </mesh>
    </>
  );
}
