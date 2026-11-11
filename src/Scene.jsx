import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, AdaptiveDpr, Preload } from "@react-three/drei";

import Ground from "./components/Ground.jsx";
import Roads from "./components/Roads.jsx";
import Nature from "./components/Nature.jsx";
import Decor from "./components/Decor.jsx";
import Buildings from "./components/Buildings.jsx";
import Water from "./components/Water.jsx";
import Player from "./components/Player.jsx";
import { playerState } from "./state.js";

// One point light that jumps to whichever building the player has entered,
// so the museum room lights up (and stays dark/cheap otherwise).
function InteriorLight({ buildings }) {
  const ref = useRef();
  const byId = useMemo(() => Object.fromEntries(buildings.map((b) => [b.id, b])), [buildings]);
  useFrame(() => {
    const l = ref.current; if (!l) return;
    const b = playerState.inside ? byId[playerState.inside] : null;
    if (b) { l.position.set(b.x, b.height * 0.62, b.z); l.intensity = 9; }
    else l.intensity = 0;
  });
  return <pointLight ref={ref} color="#fff6e0" intensity={0} distance={24} decay={1.1} />;
}

export default function Scene({ city }) {
  const { spawn } = city;
  const createdRef = useRef(false);

  // When the Canvas re-mounts into an already-laid-out page (returning from the
  // flat view), R3F's first size measurement can be dropped, leaving a blank
  // canvas. Nudge a window resize until onCreated fires, then stop.
  useEffect(() => {
    if (createdRef.current) return undefined;
    let ticks = 0;
    const id = setInterval(() => {
      if (createdRef.current || ++ticks > 60) { clearInterval(id); return; }
      window.dispatchEvent(new Event("resize"));
    }, 120);
    window.dispatchEvent(new Event("resize"));
    return () => clearInterval(id);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: import.meta.env.DEV }}
      camera={{ fov: 70, near: 0.1, far: 700, position: [spawn.x, 6, spawn.z + 8] }}
      onCreated={(s) => { createdRef.current = true; if (import.meta.env.DEV) window.__r3f = s; }}
    >
      <color attach="background" args={["#8fd6ff"]} />
      <fog attach="fog" args={["#bfe6ff", 60, 260]} />

      <hemisphereLight args={["#bfe6ff", "#6f8f45", 0.9]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        position={[45, 65, 25]}
        intensity={1.15}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={220}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0004}
      />
      <Sky sunPosition={[45, 40, 25]} turbidity={5} rayleigh={1.1} mieCoefficient={0.006} mieDirectionalG={0.8} />

      <Suspense fallback={null}>
        <Ground />
        <Roads roads={city.roads} />
        <Water water={city.water} />
        <Nature trees={city.trees} />
        <Decor coins={city.coins} clouds={city.clouds} />
        <Buildings buildings={city.buildings} />
        <InteriorLight buildings={city.buildings} />
        <Player buildings={city.buildings} spawn={spawn} />
        <Preload all />
      </Suspense>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
