import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// A simple stylized lake: a gently bobbing translucent plane + a sandy shore.
export default function Water({ water }) {
  const ref = useRef();
  useFrame((state) => {
    const m = ref.current;
    if (m) m.material.opacity = 0.72 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
  });
  if (!water) return null;
  const { x, z, w, d } = water;
  return (
    <group position={[x, 0, z]}>
      {/* sandy shore ring */}
      <mesh position={[0, 0.03, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[w + 6, d + 6]} />
        <meshStandardMaterial color="#e8d59a" roughness={1} />
      </mesh>
      {/* water */}
      <mesh ref={ref} position={[0, 0.12, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#3aa7e0" transparent opacity={0.75} roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}
