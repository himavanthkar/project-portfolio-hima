/**
 * Player - drives the R3F camera and the visible avatar.
 *
 *   Third-person (default): WASD moves the Noob, camera orbits behind. Avatar visible.
 *   First-person (press V): camera sits at eye height. Avatar hidden.
 *   Desktop: click to lock the pointer for mouse-look; Esc releases.
 *   Mobile: on-screen joystick + drag-look via <MobileControls> (touchInput).
 *
 * Writes position/focus into the shared mutable `playerState` every frame - no React
 * state in the loop, so nothing re-renders while you walk.
 */
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Avatar from "./Avatar.jsx";
import { playerState, touchInput } from "../state.js";

const WALK = 8, SPRINT = 18, ACCEL = 12, GRAVITY = 30, JUMP = 9.5;
const RADIUS = 0.8, CELL = 8, EYE = 4.4, THIRD_Y = 3.0, THIRD_DIST = 9;
const FOCUS_RANGE = 7, MAX_DT = 0.05, BOUNDS = 70;

const KEY_OFF = 4096, KEY_SPAN = 8192;
const cellKey = (cx, cz) => (cx + KEY_OFF) * KEY_SPAN + (cz + KEY_OFF);

const _f = new THREE.Vector3(), _r = new THREE.Vector3(), _v = new THREE.Vector3();

function lerpAngle(a, b, t) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

export default function Player({ buildings = [], spawn = { x: 0, z: 8, yaw: 0 } }) {
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const avatarRef = useRef();

  const yaw = useRef(spawn.yaw || 0);
  const pitch = useRef(0.12);
  const pos = useRef(new THREE.Vector3(spawn.x || 0, 0, spawn.z ?? 8));
  const vel = useRef(new THREE.Vector3());
  const grounded = useRef(true);
  const faceAngle = useRef(spawn.yaw || 0);
  const keys = useRef({ f: false, b: false, l: false, r: false, sprint: false, jump: false });

  // Spatial hash + bounds, rebuilt only when buildings change.
  const world = useMemo(() => {
    const grid = new Map();
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const b of buildings) {
      const hw = b.w / 2, hd = b.d / 2;
      minX = Math.min(minX, b.x - hw); maxX = Math.max(maxX, b.x + hw);
      minZ = Math.min(minZ, b.z - hd); maxZ = Math.max(maxZ, b.z + hd);
      const x0 = Math.floor((b.x - hw - RADIUS) / CELL), x1 = Math.floor((b.x + hw + RADIUS) / CELL);
      const z0 = Math.floor((b.z - hd - RADIUS) / CELL), z1 = Math.floor((b.z + hd + RADIUS) / CELL);
      for (let cx = x0; cx <= x1; cx++)
        for (let cz = z0; cz <= z1; cz++) {
          const k = cellKey(cx, cz);
          let arr = grid.get(k);
          if (!arr) grid.set(k, (arr = []));
          arr.push(b);
        }
    }
    if (!Number.isFinite(minX)) { minX = -40; maxX = 40; minZ = -40; maxZ = 40; }
    return { grid, minX: minX - BOUNDS, maxX: maxX + BOUNDS, minZ: minZ - BOUNDS, maxZ: maxZ + BOUNDS };
  }, [buildings]);
  const byId = useMemo(() => Object.fromEntries(buildings.map((b) => [b.id, b])), [buildings]);

  // ---- keyboard ----
  useEffect(() => {
    const k = keys.current;
    const down = (e) => {
      switch (e.code) {
        case "KeyW": case "ArrowUp": k.f = true; break;
        case "KeyS": case "ArrowDown": k.b = true; break;
        case "KeyA": case "ArrowLeft": k.l = true; break;
        case "KeyD": case "ArrowRight": k.r = true; break;
        case "ShiftLeft": case "ShiftRight": k.sprint = true; break;
        case "Space": k.jump = true; break;
        case "KeyV": if (!e.repeat) playerState.mode = playerState.mode === "third" ? "first" : "third"; break;
        case "KeyR": if (!e.repeat) window.location.hash = "all"; break; // open the "view everything" page
        case "KeyE":
          if (e.repeat) break;
          if (playerState.inside) playerState.inside = null;           // leave
          else if (playerState.nearDoor) { playerState.inside = playerState.nearDoor; document.exitPointerLock?.(); }
          break;
        case "Escape": if (playerState.inside) playerState.inside = null; break;
        default: return;
      }
      if (e.code === "Space" || e.code.startsWith("Arrow")) e.preventDefault();
    };
    const up = (e) => {
      switch (e.code) {
        case "KeyW": case "ArrowUp": k.f = false; break;
        case "KeyS": case "ArrowDown": k.b = false; break;
        case "KeyA": case "ArrowLeft": k.l = false; break;
        case "KeyD": case "ArrowRight": k.r = false; break;
        case "ShiftLeft": case "ShiftRight": k.sprint = false; break;
        case "Space": k.jump = false; break;
        default: break;
      }
    };
    const blur = () => { k.f = k.b = k.l = k.r = k.sprint = k.jump = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  // ---- pointer lock + mouse look (desktop) ----
  useEffect(() => {
    const el = gl.domElement;
    const requestLock = () => { if (!playerState.locked) el.requestPointerLock?.(); };
    const onLockChange = () => { playerState.locked = document.pointerLockElement === el; };
    const onMove = (e) => {
      if (document.pointerLockElement !== el) return;
      yaw.current -= e.movementX * 0.0022;
      pitch.current -= e.movementY * 0.0022;
      pitch.current = Math.max(-1.2, Math.min(1.2, pitch.current));
    };
    el.addEventListener("click", requestLock);
    document.addEventListener("pointerlockchange", onLockChange);
    document.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("click", requestLock);
      document.removeEventListener("pointerlockchange", onLockChange);
      document.removeEventListener("mousemove", onMove);
    };
  }, [gl]);

  // ---- spawn ----
  useEffect(() => {
    pos.current.set(spawn.x || 0, 0, spawn.z ?? 8);
    yaw.current = spawn.yaw || 0;
    faceAngle.current = spawn.yaw || 0;
    vel.current.set(0, 0, 0);
  }, [spawn]);

  useFrame((state, delta) => {
    const dt = Math.min(delta || 0, MAX_DT);

    // ---- inside a building: fixed museum view, no walking ----
    if (playerState.inside) {
      const av = avatarRef.current; if (av) av.visible = false;
      const b = byId[playerState.inside];
      if (b) {
        const t = state.clock.elapsedTime;
        const eye = Math.min(b.height * 0.5 + 0.4, 3.3);
        const pan = Math.sin(t * 0.25) * 1.4;
        camera.position.set(b.inside.x, eye, b.inside.z);
        camera.lookAt(b.lookAt.x + pan, eye - 0.25, b.lookAt.z);
      }
      return;
    }

    const k = keys.current;
    const p = pos.current;
    const v = vel.current;
    const mode = playerState.mode;

    // consume mobile look deltas
    if (touchInput.lookX || touchInput.lookY) {
      yaw.current -= touchInput.lookX * 0.004;
      pitch.current -= touchInput.lookY * 0.004;
      pitch.current = Math.max(-1.2, Math.min(1.2, pitch.current));
      touchInput.lookX = touchInput.lookY = 0;
    }

    const yw = yaw.current, pt = pitch.current;
    _f.set(-Math.sin(yw), 0, -Math.cos(yw));       // forward on XZ
    _r.set(-_f.z, 0, _f.x);                          // right on XZ

    const active = playerState.locked || touchInput.driving;
    let iz = 0, ix = 0;
    if (active) {
      if (k.f) iz += 1;
      if (k.b) iz -= 1;
      if (k.r) ix += 1;
      if (k.l) ix -= 1;
      iz += touchInput.moveZ;
      ix += touchInput.moveX;
    }
    const inputMag = Math.hypot(ix, iz);
    const sprinting = active && k.sprint && inputMag > 0.01;
    const speed = sprinting ? SPRINT : WALK;

    let tx = _f.x * iz + _r.x * ix;
    let tz = _f.z * iz + _r.z * ix;
    const tl = Math.hypot(tx, tz);
    if (tl > 1e-4) { tx = (tx / tl) * speed; tz = (tz / tl) * speed; } else { tx = tz = 0; }
    const blend = 1 - Math.exp(-ACCEL * dt);
    v.x += (tx - v.x) * blend;
    v.z += (tz - v.z) * blend;

    // gravity + jump
    v.y -= GRAVITY * dt;
    if (grounded.current && active && k.jump) { v.y = JUMP; grounded.current = false; }

    // integrate + collide (X and Z separately → wall sliding)
    p.x += v.x * dt; collideAxis(world.grid, p, 0, v);
    p.z += v.z * dt; collideAxis(world.grid, p, 1, v);
    p.y += v.y * dt;
    if (p.y <= 0) { p.y = 0; v.y = 0; grounded.current = true; }

    // soft world bounds
    p.x = Math.max(world.minX, Math.min(world.maxX, p.x));
    p.z = Math.max(world.minZ, Math.min(world.maxZ, p.z));

    const moving = inputMag > 0.01 && (v.x * v.x + v.z * v.z) > 1;
    playerState.moving = moving;

    // ---- avatar transform ----
    const av = avatarRef.current;
    if (av) {
      av.visible = mode === "third";
      av.position.set(p.x, p.y, p.z);
      const targetFace = moving ? Math.atan2(tx, tz) : Math.atan2(_f.x, _f.z);
      faceAngle.current = lerpAngle(faceAngle.current, targetFace, Math.min(1, dt * 10));
      av.rotation.y = faceAngle.current;
    }

    // ---- camera ----
    const vdX = -Math.sin(yw) * Math.cos(pt);
    const vdY = Math.sin(pt);
    const vdZ = -Math.cos(yw) * Math.cos(pt);
    if (mode === "first") {
      camera.position.set(p.x, p.y + EYE, p.z);
      camera.lookAt(p.x + vdX, p.y + EYE + vdY, p.z + vdZ);
    } else {
      const tX = p.x, tY = p.y + THIRD_Y, tZ = p.z;
      let cx = tX - vdX * THIRD_DIST, cy = tY - vdY * THIRD_DIST + 1.2, cz = tZ - vdZ * THIRD_DIST;
      // pull the camera in if a building sits between it and the avatar
      const d = pullInCamera(world.grid, tX, tY, tZ, cx, cy, cz);
      cx = tX + (cx - tX) * d; cy = tY + (cy - tY) * d; cz = tZ + (cz - tZ) * d;
      if (cy < 1) cy = 1;
      camera.position.set(cx, cy, cz);
      camera.lookAt(tX, tY, tZ);
    }

    // ---- publish + focus ----
    playerState.x = p.x; playerState.y = p.y; playerState.z = p.z;
    playerState.yaw = yw; playerState.pitch = pt;

    let best = null, bestDist = Infinity;
    const pcx = Math.floor(p.x / CELL), pcz = Math.floor(p.z / CELL);
    for (let cx = pcx - 2; cx <= pcx + 2; cx++)
      for (let cz = pcz - 2; cz <= pcz + 2; cz++) {
        const arr = world.grid.get(cellKey(cx, cz));
        if (!arr) continue;
        for (const b of arr) {
          const dx = Math.max(Math.abs(p.x - b.x) - b.w / 2, 0);
          const dz = Math.max(Math.abs(p.z - b.z) - b.d / 2, 0);
          const dist = Math.hypot(dx, dz);
          if (dist < bestDist) { bestDist = dist; best = b; }
        }
      }
    playerState.focusedSection = best && bestDist < FOCUS_RANGE ? best.id : null;
    playerState.focusedDistance = bestDist;

    // ---- door proximity (drives the "press E to enter" prompt) ----
    let nd = null, ndDist = Infinity;
    for (const b of buildings) {
      const dx = p.x - b.doorPos.x, dz = p.z - b.doorPos.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 4.8 && p.z > b.z && dist < ndDist) { nd = b.id; ndDist = dist; }
    }
    playerState.nearDoor = nd;
  });

  return (
    <group ref={avatarRef}>
      <Avatar />
    </group>
  );
}

// Returns a fraction [0..1] of the target->camera distance that keeps the camera
// out of buildings, so backing the avatar against a wall doesn't clip the view.
function pullInCamera(grid, tX, tY, tZ, cx, cy, cz) {
  const dx = cx - tX, dy = cy - tY, dz = cz - tZ;
  const STEPS = 8;
  for (let i = 1; i <= STEPS; i++) {
    const f = i / STEPS;
    const x = tX + dx * f, y = tY + dy * f, z = tZ + dz * f;
    const gx = Math.floor(x / CELL), gz = Math.floor(z / CELL);
    const arr = grid.get(cellKey(gx, gz));
    if (!arr) continue;
    for (const b of arr) {
      if (y > (b.height || 10)) continue;
      if (Math.abs(x - b.x) < b.w / 2 + 0.4 && Math.abs(z - b.z) < b.d / 2 + 0.4) {
        return Math.max(0.22, f - 1 / STEPS); // stop just before the wall
      }
    }
  }
  return 1;
}

// Push the player cylinder out of any overlapping building AABB along one axis.
function collideAxis(grid, p, axis, v) {
  const pcx = Math.floor(p.x / CELL), pcz = Math.floor(p.z / CELL);
  for (let cx = pcx - 1; cx <= pcx + 1; cx++)
    for (let cz = pcz - 1; cz <= pcz + 1; cz++) {
      const arr = grid.get(cellKey(cx, cz));
      if (!arr) continue;
      for (const b of arr) {
        if (p.y >= (b.height || 10) - 0.01) continue; // above the roof
        const hx = b.w / 2 + RADIUS, hz = b.d / 2 + RADIUS;
        const dx = p.x - b.x, dz = p.z - b.z;
        if (dx > -hx && dx < hx && dz > -hz && dz < hz) {
          if (axis === 0) { p.x = b.x + (dx >= 0 ? hx : -hx); v.x = 0; }
          else { p.z = b.z + (dz >= 0 ? hz : -hz); v.z = 0; }
        }
      }
    }
}
