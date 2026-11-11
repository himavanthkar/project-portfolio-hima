import { useEffect, useRef } from "react";
import { playerState, touchInput } from "../state.js";

// On-screen joystick (move) + full-screen drag (look) + jump/view buttons.
// Rendered only on touch devices. Writes into the shared touchInput/playerState.
export default function MobileControls() {
  const baseRef = useRef(null);
  const thumbRef = useRef(null);
  const stickId = useRef(null);
  const lookId = useRef(null);
  const lookLast = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const base = baseRef.current;
    const R = 46;

    const setThumb = (dx, dy) => {
      if (thumbRef.current) thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onStickStart = (e) => {
      const t = e.changedTouches[0];
      stickId.current = t.identifier;
      touchInput.driving = true;
      playerState.locked = false; // pointer lock not used on touch
      e.preventDefault();
    };
    const onStickMove = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier !== stickId.current) continue;
        const r = base.getBoundingClientRect();
        let dx = t.clientX - (r.left + r.width / 2);
        let dy = t.clientY - (r.top + r.height / 2);
        const len = Math.hypot(dx, dy);
        if (len > R) { dx = (dx / len) * R; dy = (dy / len) * R; }
        setThumb(dx, dy);
        touchInput.moveX = dx / R;
        touchInput.moveZ = -dy / R;
        e.preventDefault();
      }
    };
    const onStickEnd = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier !== stickId.current) continue;
        stickId.current = null;
        touchInput.driving = false;
        touchInput.moveX = touchInput.moveZ = 0;
        setThumb(0, 0);
      }
    };
    base.addEventListener("touchstart", onStickStart, { passive: false });
    base.addEventListener("touchmove", onStickMove, { passive: false });
    base.addEventListener("touchend", onStickEnd);
    base.addEventListener("touchcancel", onStickEnd);

    // look: any touch not on a control
    const onLookStart = (e) => {
      if (lookId.current !== null) return;
      const t = e.changedTouches[0];
      lookId.current = t.identifier;
      lookLast.current = { x: t.clientX, y: t.clientY };
    };
    const onLookMove = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier !== lookId.current) continue;
        touchInput.lookX = t.clientX - lookLast.current.x;
        touchInput.lookY = t.clientY - lookLast.current.y;
        lookLast.current = { x: t.clientX, y: t.clientY };
      }
    };
    const onLookEnd = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === lookId.current) lookId.current = null;
      }
    };
    const look = document.getElementById("rw-look");
    look.addEventListener("touchstart", onLookStart, { passive: true });
    look.addEventListener("touchmove", onLookMove, { passive: true });
    look.addEventListener("touchend", onLookEnd);
    look.addEventListener("touchcancel", onLookEnd);

    return () => {
      base.removeEventListener("touchstart", onStickStart);
      base.removeEventListener("touchmove", onStickMove);
      base.removeEventListener("touchend", onStickEnd);
      base.removeEventListener("touchcancel", onStickEnd);
      look.removeEventListener("touchstart", onLookStart);
      look.removeEventListener("touchmove", onLookMove);
      look.removeEventListener("touchend", onLookEnd);
      look.removeEventListener("touchcancel", onLookEnd);
    };
  }, []);

  const jump = () => {
    // synthesize a brief jump
    window.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }));
    setTimeout(() => window.dispatchEvent(new KeyboardEvent("keyup", { code: "Space" })), 120);
  };
  const toggleView = () => { playerState.mode = playerState.mode === "third" ? "first" : "third"; };

  return (
    <>
      <div id="rw-look" className="rw-look" />
      <div className="rw-stick" ref={baseRef}>
        <div className="rw-stick-thumb" ref={thumbRef} />
      </div>
      <div className="rw-mobile-btns">
        <button className="rw-mbtn" onClick={jump}>Jump</button>
        <button className="rw-mbtn" onClick={toggleView}>View</button>
      </div>
    </>
  );
}
