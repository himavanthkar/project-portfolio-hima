// Shared mutable state - written every frame by the Player controller and read by
// the HUD via a light poll. Deliberately NOT React state, so the render loop never
// re-renders. (Same pattern RepoWorld uses for playerState.)
export const playerState = {
  x: 0, y: 0, z: 0,
  yaw: 0, pitch: 0.12,
  mode: "third",          // 'third' | 'first'
  locked: false,          // pointer locked (desktop) or touch-driving (mobile)
  moving: false,
  focusedSection: null,   // building id of the nearest landmark in range
  focusedDistance: Infinity,
  nearDoor: null,         // building id whose door the player can enter
  inside: null,           // building id the player has entered (museum view)
  coins: 0,               // coins collected
};

export function resetPlayerState(spawn = {}) {
  playerState.x = spawn.x ?? 0;
  playerState.z = spawn.z ?? 6;
  playerState.y = 0;
  playerState.yaw = spawn.yaw ?? 0;
  playerState.pitch = 0.12;
  playerState.focusedSection = null;
  playerState.focusedDistance = Infinity;
  playerState.nearDoor = null;
  playerState.inside = null;
  playerState.coins = 0;
}

// Touch input, written by <MobileControls>, read by <Player>.
export const touchInput = {
  moveX: 0, moveZ: 0,     // -1..1 joystick vector
  lookX: 0, lookY: 0,     // per-frame look deltas (consumed each frame)
  driving: false,         // a movement touch is active
};

// Dev-only handle for debugging/automated testing (stripped from prod builds).
if (typeof window !== "undefined" && import.meta.env.DEV) {
  window.__portal = { playerState, touchInput };
}
