import { useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { content } from "../content.js";

/* ---- museum "painting" drawn to a canvas (title + a few lines) ------------- */
function paintingTexture(title, lines, accent = "#0a95e8") {
  const c = document.createElement("canvas");
  c.width = 400; c.height = 300;
  const g = c.getContext("2d");
  g.fillStyle = "#fbf6ec"; g.fillRect(0, 0, 400, 300);         // canvas
  g.fillStyle = accent; g.fillRect(0, 0, 400, 12);             // accent top bar
  g.fillStyle = "#16293b"; g.font = "700 34px Fredoka, system-ui, sans-serif";
  g.fillText(clip(g, title, 360), 26, 66);
  g.strokeStyle = "rgba(10,149,232,0.5)"; g.lineWidth = 2;
  g.beginPath(); g.moveTo(26, 82); g.lineTo(120, 82); g.stroke();
  g.fillStyle = "#3f5566"; g.font = "600 22px Nunito, system-ui, sans-serif";
  let y = 122;
  for (const ln of lines.slice(0, 6)) { g.fillText("• " + clip(g, ln, 340), 26, y); y += 32; }
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4;
  return t;
}
function clip(g, s, max) {
  s = String(s); if (g.measureText(s).width <= max) return s;
  while (s.length && g.measureText(s + "…").width > max) s = s.slice(0, -1);
  return s + "…";
}
function backArt(b) {
  const c = content;
  if (b.section === "about") return ["About", c.about.facts.map((f) => `${f.label}: ${f.value}`)];
  if (b.section === "experience") { const e = c.experience[b.expIndex]; return [e.role, [e.org, e.meta, e.period]]; }
  if (b.section === "project") { const p = c.projects[b.projIndex]; return [p.title, [p.award, ...p.tech]]; }
  if (b.section === "skills") return ["Skills", c.skills.map((g) => g.group)];
  if (b.section === "awards") return ["Trophy shelf", c.awards.slice(0, 6).map((a) => a.title)];
  if (b.section === "articles") return ["Articles", c.articles.map((a) => a.title)];
  if (b.section === "highlights") return ["Highlights", c.highlights.conferences];
  if (b.section === "contact") return ["Contact", [c.email, ...c.links.filter((l) => l.url !== "#").map((l) => l.label)]];
  return [b.sign, []];
}

/* ---- a framed painting on a wall ------------------------------------------ */
function Painting({ texture, position, rotation = [0, 0, 0], w = 3.2, h = 2.4 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.06]}><boxGeometry args={[w + 0.35, h + 0.35, 0.12]} /><meshStandardMaterial color="#6b4a2b" roughness={0.8} /></mesh>
      <mesh><planeGeometry args={[w, h]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
    </group>
  );
}

function Building({ b }) {
  const { x, z, w, d, height, color, roof, beacon, sign, wallT, doorW, doorH } = b;
  const hw = w / 2, hd = d / 2;
  const seg = hw - doorW / 2; // front wall segment width beside the door
  const wallMat = <meshStandardMaterial color={color} roughness={0.92} flatShading />;

  const backTex = useMemo(() => { const [t, l] = backArt(b); return paintingTexture(t, l); }, [b]);
  const sideTex = useMemo(() => paintingTexture(sign, [], color), [sign, color]);

  return (
    <group position={[x, 0, z]}>
      {/* --- room shell (colored walls, wood floor, ceiling, roof) --- */}
      <mesh position={[0, height / 2, -hd + wallT / 2]} castShadow receiveShadow><boxGeometry args={[w, height, wallT]} />{wallMat}</mesh>
      <mesh position={[-hw + wallT / 2, height / 2, 0]} castShadow receiveShadow><boxGeometry args={[wallT, height, d]} />{wallMat}</mesh>
      <mesh position={[hw - wallT / 2, height / 2, 0]} castShadow receiveShadow><boxGeometry args={[wallT, height, d]} />{wallMat}</mesh>
      {seg > 0.15 && [-1, 1].map((sx) => (
        <mesh key={sx} position={[sx * (doorW / 2 + seg / 2), height / 2, hd - wallT / 2]} castShadow receiveShadow><boxGeometry args={[seg, height, wallT]} />{wallMat}</mesh>
      ))}
      {/* door lintel (wall above the opening) */}
      <mesh position={[0, (doorH + height) / 2, hd - wallT / 2]} castShadow><boxGeometry args={[doorW, height - doorH, wallT]} />{wallMat}</mesh>
      {/* wood floor + light ceiling */}
      <mesh position={[0, 0.08, 0]} receiveShadow><boxGeometry args={[w - wallT, 0.16, d - wallT]} /><meshStandardMaterial color="#b5804a" roughness={1} /></mesh>
      <mesh position={[0, height - 0.08, 0]}><boxGeometry args={[w - wallT, 0.16, d - wallT]} /><meshStandardMaterial color="#efe6d6" roughness={1} /></mesh>
      {/* roof slab */}
      <mesh position={[0, height + 0.4, 0]} castShadow><boxGeometry args={[w + 0.7, 0.8, d + 0.7]} /><meshStandardMaterial color={roof} roughness={0.9} flatShading /></mesh>
      {/* door frame (dark) around the opening */}
      {[-1, 1].map((sx) => (
        <mesh key={`p${sx}`} position={[(sx * (doorW + 0.25)) / 2, doorH / 2, hd + 0.04]} castShadow><boxGeometry args={[0.25, doorH + 0.25, 0.35]} /><meshStandardMaterial color="#2c2119" roughness={1} /></mesh>
      ))}
      <mesh position={[0, doorH + 0.12, hd + 0.04]} castShadow><boxGeometry args={[doorW + 0.5, 0.25, 0.35]} /><meshStandardMaterial color="#2c2119" roughness={1} /></mesh>

      {/* --- museum paintings --- */}
      <Painting texture={backTex} position={[0, Math.min(height * 0.5, 3), -hd + wallT + 0.05]} w={Math.min(w - 2, 5)} h={Math.min(height - 2, 3.4)} />
      <Painting texture={sideTex} position={[-hw + wallT + 0.05, height * 0.55, -0.5]} rotation={[0, Math.PI / 2, 0]} w={2.2} h={1.6} />
      <Painting texture={sideTex} position={[hw - wallT - 0.05, height * 0.55, -0.5]} rotation={[0, -Math.PI / 2, 0]} w={2.2} h={1.6} />

      {/* navigation beacon (above roof) */}
      <mesh position={[0, height + 22, 0]}><cylinderGeometry args={[0.32, 0.32, 44, 8]} /><meshBasicMaterial color={beacon} transparent opacity={0.22} depthWrite={false} /></mesh>
      {/* floating label */}
      <Html position={[0, height + 3.2, 0]} center distanceFactor={20} pointerEvents="none" zIndexRange={[10, 0]}>
        <div className="rw-sign">{sign}</div>
      </Html>
    </group>
  );
}

export default function Buildings({ buildings = [] }) {
  return <group>{buildings.map((b) => <Building key={b.id} b={b} />)}</group>;
}
