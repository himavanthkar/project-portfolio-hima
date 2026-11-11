export default function Roads({ roads = [] }) {
  return (
    <group>
      {roads.map((r, i) => (
        <mesh key={i} position={[r.x, 0.04, r.z]} receiveShadow>
          <boxGeometry args={[r.w, 0.08, r.d]} />
          <meshStandardMaterial color="#9a9aa0" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
