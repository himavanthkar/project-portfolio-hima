// Deterministic city layout. Each "landmark" is a building the player walks up to
// (side panel) and can ENTER through the door (museum room + big center panel).

const C = {
  blue: "#2e77d0", red: "#e1413b", green: "#57a639", orange: "#f2a31e",
  purple: "#9c5bd0", teal: "#25b0a0", yellow: "#f4c842", pink: "#e46aa7",
};

export function buildCity() {
  const buildings = [
    { id: "about",     section: "about",      sign: "ABOUT",        x: 0,   z: -20, w: 11, d: 8,  height: 9,  color: C.blue,   roof: C.red,    beacon: "#7cc9ff" },
    { id: "exp-0",     section: "experience", expIndex: 0, sign: "SJSU RESEARCH", x: -22, z: -12, w: 9,  d: 8,  height: 12, color: C.teal,   roof: C.purple, beacon: "#3fe6cf" },
    { id: "exp-1",     section: "experience", expIndex: 1, sign: "WINIT",         x: -25, z: -33, w: 8,  d: 8,  height: 16, color: C.purple, roof: C.orange, beacon: "#c39bff" },
    { id: "proj-0",    section: "project", projIndex: 0, sign: "REWIND",     x: 18,  z: -10, w: 8,  d: 8,  height: 10, color: C.green,  roof: C.red,    beacon: "#8bff62" },
    { id: "proj-1",    section: "project", projIndex: 1, sign: "DISPATCH",   x: 27,  z: -19, w: 8,  d: 8,  height: 13, color: C.orange, roof: C.blue,   beacon: "#ffd24a" },
    { id: "proj-2",    section: "project", projIndex: 2, sign: "NEUROBOOST", x: 16,  z: -27, w: 8,  d: 8,  height: 14, color: C.red,    roof: C.teal,   beacon: "#ff7a63" },
    { id: "proj-3",    section: "project", projIndex: 3, sign: "AWS MIGRATION", x: 29, z: -34, w: 8, d: 8, height: 9,  color: C.blue,   roof: C.yellow, beacon: "#7cc9ff" },
    { id: "skills",    section: "skills",     sign: "SKILLS",       x: 0,   z: -46, w: 15, d: 9,  height: 8,  color: C.orange, roof: C.purple, beacon: "#ffbe57" },
    { id: "articles",  section: "articles",   sign: "ARTICLES",     x: -20, z: -50, w: 10, d: 9,  height: 10, color: C.green,  roof: C.blue,   beacon: "#9bff8a" },
    { id: "highlights",section: "highlights", sign: "HIGHLIGHTS",   x: 20,  z: -48, w: 11, d: 9,  height: 11, color: C.pink,   roof: C.yellow, beacon: "#ff9ed0" },
    { id: "awards",    section: "awards",     sign: "TROPHIES",     x: -18, z: 8,   w: 11, d: 9,  height: 7,  color: C.yellow, roof: C.red,    beacon: "#ffe45c" },
    { id: "contact",   section: "contact",    sign: "CONTACT",      x: 0,   z: -62, w: 10, d: 10, height: 13, color: C.pink,   roof: C.teal,   beacon: "#ff8fc4" },
  ];

  // Hollow-room + door metadata (used by Buildings.jsx to draw the room/door,
  // by Player.jsx for the "enter" prompt and the interior camera anchor).
  const WALL_T = 0.6, DOOR_W = 2.8, DOOR_H = 4.4;
  for (const b of buildings) {
    b.wallT = WALL_T; b.doorW = DOOR_W; b.doorH = DOOR_H;
    b.doorPos = { x: b.x, z: b.z + b.d / 2 };            // front-face centre
    b.inside = { x: b.x, z: b.z + b.d / 2 - 2.4 };       // camera stands just inside
    b.lookAt = { x: b.x, z: b.z - b.d / 2 + b.wallT };   // faces the back wall
  }

  const roads = [
    { x: 0,   z: -30, w: 6,  d: 100 },
    { x: -12, z: -12, w: 30, d: 5 },
    { x: -13, z: -33, w: 30, d: 5 },
    { x: 16,  z: -12, w: 40, d: 5 },
    { x: 20,  z: -30, w: 30, d: 5 },
    { x: -10, z: -50, w: 24, d: 5 },   // to articles
    { x: 12,  z: -48, w: 22, d: 5 },   // to highlights
  ];

  const spawn = { x: 0, z: 8, yaw: 0 };

  // A lake off to the right, to make the world feel like a place (not empty space).
  const water = { x: 55, z: -18, w: 32, d: 52 };

  let s = 0x9e3779b9 >>> 0;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  const nearBuilding = (x, z) =>
    buildings.some((b) => Math.abs(x - b.x) < b.w / 2 + 4 && Math.abs(z - b.z) < b.d / 2 + 4);
  const inWater = (x, z) =>
    Math.abs(x - water.x) < water.w / 2 + 3 && Math.abs(z - water.z) < water.d / 2 + 3;

  const trees = [];
  for (let i = 0; i < 130 && trees.length < 70; i++) {
    const x = (rnd() - 0.5) * 120;
    const z = 16 - rnd() * 96;
    if (Math.abs(x) < 5) continue;
    if (nearBuilding(x, z) || inWater(x, z)) continue;
    trees.push({ x, z, s: 0.7 + rnd() * 0.9, kind: rnd() > 0.5 ? 1 : 0 });
  }

  // Collectible coins: the avenue trail plus a scattered handful to find.
  const coins = [];
  for (let i = 0; i < 11; i++) {
    const cx = (rnd() - 0.5) * 2.5, cz = 3 - i * 6, cy = 2 + rnd() * 0.8;
    if (!nearBuilding(cx, cz)) coins.push({ x: cx, y: cy, z: cz });
  }
  for (let i = 0; i < 40 && coins.length < 30; i++) {
    const x = (rnd() - 0.5) * 90, z = 10 - rnd() * 78;
    if (nearBuilding(x, z) || inWater(x, z) || Math.hypot(x, z - 8) < 6) continue;
    coins.push({ x, y: 1.8 + rnd() * 1.2, z });
  }

  const clouds = [
    { x: -22, y: 24, z: -10, s: 1.3 }, { x: 20, y: 28, z: -30, s: 1.6 },
    { x: -8, y: 30, z: -50, s: 1.1 }, { x: 26, y: 22, z: 4, s: 1.0 },
    { x: 44, y: 26, z: -18, s: 1.4 },
  ];

  return { buildings, roads, spawn, trees, coins, clouds, water };
}
