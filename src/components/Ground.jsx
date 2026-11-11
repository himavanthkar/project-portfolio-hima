import { useMemo } from "react";
import * as THREE from "three";

// Green studded baseplate, Roblox-style, via a small canvas texture that repeats.
function useGroundTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "#6cc24a";
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = "rgba(0,0,0,0.09)";
    g.lineWidth = 6;
    g.strokeRect(0, 0, 128, 128);
    g.fillStyle = "rgba(255,255,255,0.13)";
    g.beginPath(); g.arc(64, 64, 24, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "rgba(0,0,0,0.07)"; g.lineWidth = 4;
    g.beginPath(); g.arc(64, 64, 24, 0, Math.PI * 2); g.stroke();
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(80, 80);
    t.magFilter = THREE.NearestFilter;
    t.anisotropy = 4;
    return t;
  }, []);
}

export default function Ground() {
  const tex = useGroundTexture();
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[600, 600]} />
      <meshStandardMaterial map={tex} roughness={1} />
    </mesh>
  );
}
