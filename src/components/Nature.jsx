// Blocky low-poly trees, placed from the seeded scatter in world.js.
function Tree({ x, z, s = 1, kind = 0 }) {
  const leaf = kind === 0 ? "#4e9f3d" : "#5cb946";
  return (
    <group position={[x, 0, z]} scale={s}>
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[0.7, 2.2, 0.7]} />
        <meshStandardMaterial color="#8a5a2b" roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 3.1, 0]} castShadow>
        <boxGeometry args={[2.4, 2.2, 2.4]} />
        <meshStandardMaterial color={leaf} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 4.35, 0]} castShadow>
        <boxGeometry args={[1.5, 1.4, 1.5]} />
        <meshStandardMaterial color="#68c452" roughness={1} flatShading />
      </mesh>
    </group>
  );
}

export default function Nature({ trees = [] }) {
  return (
    <group>
      {trees.map((t, i) => (
        <Tree key={i} {...t} />
      ))}
    </group>
  );
}
