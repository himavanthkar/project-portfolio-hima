import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { playerState } from "../state.js";

const YELLOW = "#f4c842", BLUE = "#2e77d0", GREEN = "#57a639";

function useFaceTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "#f4c842"; g.fillRect(0, 0, 128, 128);
    g.fillStyle = "#20140a";
    g.beginPath(); g.ellipse(45, 52, 8, 12, 0, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.ellipse(83, 52, 8, 12, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "#20140a"; g.lineWidth = 7; g.lineCap = "round";
    g.beginPath(); g.moveTo(40, 78); g.quadraticCurveTo(64, 98, 88, 78); g.stroke();
    return new THREE.CanvasTexture(c);
  }, []);
}

// The Noob. Local limb animation only; world position/rotation is driven by <Player>.
export default function Avatar() {
  const face = useFaceTexture();
  const armL = useRef(), armR = useRef(), legL = useRef(), legR = useRef();
  const swing = useRef(0);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    // advance walk phase faster while moving, ease back to neutral when idle
    const target = playerState.moving ? 1 : 0;
    swing.current += (target - swing.current) * Math.min(1, dt * 8);
    const a = Math.sin(t * 9) * 0.7 * swing.current;
    if (armL.current) armL.current.rotation.x = a;
    if (armR.current) armR.current.rotation.x = -a;
    if (legL.current) legL.current.rotation.x = -a;
    if (legR.current) legR.current.rotation.x = a;
  });

  return (
    <group>
      {/* legs (pivots at the hip) */}
      <group ref={legL} position={[-0.5, 1.9, 0]}>
        <mesh position={[0, -0.95, 0]} castShadow>
          <boxGeometry args={[0.9, 1.9, 0.9]} />
          <meshStandardMaterial color={GREEN} flatShading />
        </mesh>
      </group>
      <group ref={legR} position={[0.5, 1.9, 0]}>
        <mesh position={[0, -0.95, 0]} castShadow>
          <boxGeometry args={[0.9, 1.9, 0.9]} />
          <meshStandardMaterial color={GREEN} flatShading />
        </mesh>
      </group>
      {/* torso */}
      <mesh position={[0, 2.9, 0]} castShadow>
        <boxGeometry args={[2, 2, 1]} />
        <meshStandardMaterial color={BLUE} flatShading />
      </mesh>
      {/* arms (pivots at the shoulder) */}
      <group ref={armL} position={[-1.45, 3.9, 0]}>
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[0.85, 2, 0.85]} />
          <meshStandardMaterial color={YELLOW} flatShading />
        </mesh>
      </group>
      <group ref={armR} position={[1.45, 3.9, 0]}>
        <mesh position={[0, -1, 0]} castShadow>
          <boxGeometry args={[0.85, 2, 0.85]} />
          <meshStandardMaterial color={YELLOW} flatShading />
        </mesh>
      </group>
      {/* head with a face on the +Z side */}
      <mesh position={[0, 4.55, 0]} castShadow>
        <boxGeometry args={[1.3, 1.3, 1.3]} />
        <meshStandardMaterial attach="material-0" color={YELLOW} flatShading />
        <meshStandardMaterial attach="material-1" color={YELLOW} flatShading />
        <meshStandardMaterial attach="material-2" color={YELLOW} flatShading />
        <meshStandardMaterial attach="material-3" color={YELLOW} flatShading />
        <meshStandardMaterial attach="material-4" map={face} flatShading />
        <meshStandardMaterial attach="material-5" color={YELLOW} flatShading />
      </mesh>
    </group>
  );
}
