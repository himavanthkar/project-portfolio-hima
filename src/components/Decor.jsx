import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { playerState } from "../state.js";

function Coins({ coins = [] }) {
  const group = useRef();
  const collected = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    for (let i = 0; i < g.children.length; i++) {
      const c = g.children[i];
      if (collected.current[i]) continue;
      c.rotation.y = t * 2 + i;
      c.position.y = coins[i].y + Math.sin(t * 1.6 + i) * 0.18;
      // collect when the player walks into it
      const dx = playerState.x - coins[i].x, dz = playerState.z - coins[i].z;
      if (dx * dx + dz * dz < 2.4 * 2.4) {
        collected.current[i] = true;
        c.visible = false;
        playerState.coins += 1;
      }
    }
  });
  return (
    <group ref={group}>
      {coins.map((c, i) => (
        <mesh key={i} position={[c.x, c.y, c.z]} rotation-x={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.55, 0.55, 0.14, 20]} />
          <meshStandardMaterial color="#ffd23a" metalness={0.3} roughness={0.4} emissive="#ffcc22" emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function Cloud({ x, y, z, s = 1 }) {
  const ref = useRef();
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    g.position.x += dt * 0.4;
    if (g.position.x > 60) g.position.x = -60;
  });
  const parts = [
    [0, 0, 0, 3], [2, -0.2, 0.4, 2.2], [-2, -0.2, -0.3, 2.4], [0.6, 0.6, -0.4, 2],
  ];
  return (
    <group ref={ref} position={[x, y, z]} scale={s}>
      {parts.map(([dx, dy, dz, w], i) => (
        <mesh key={i} position={[dx, dy, dz]}>
          <boxGeometry args={[w, 1.1, 1.6]} />
          <meshStandardMaterial color="#ffffff" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

export default function Decor({ coins = [], clouds = [] }) {
  return (
    <group>
      <Coins coins={coins} />
      {clouds.map((c, i) => (
        <Cloud key={i} {...c} />
      ))}
    </group>
  );
}
