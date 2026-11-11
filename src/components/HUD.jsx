import { useEffect, useMemo, useRef, useState } from "react";
import { content } from "../content.js";
import { playerState, touchInput } from "../state.js";

const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/* ------- the body of a section, shared by the side panel and the center panel ------- */
function sectionBody(b) {
  if (b.section === "about") return (
    <>
      <h2>About</h2>
      {content.about.body.map((p, i) => <p key={i}>{p}</p>)}
      <div className="chips">
        {content.about.facts.map((f) => <span className="chip" key={f.label}><b>{f.label}:</b> {f.value}</span>)}
      </div>
    </>
  );
  if (b.section === "experience") { const e = content.experience[b.expIndex]; return (
    <>
      <div className="pill">{e.period}</div>
      <h2>{e.role}</h2>
      <div className="sub">{e.org} · {e.meta}</div>
      <ul>{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
    </>
  ); }
  if (b.section === "project") { const p = content.projects[b.projIndex]; return (
    <>
      {p.award && <div className="pill">{p.award}</div>}
      <h2>{p.title}</h2>
      <p>{p.blurb}</p>
      <div className="chips">{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
      {p.url && p.url !== "#" && <a className="btn" href={p.url} target="_blank" rel="noopener">View on GitHub →</a>}
    </>
  ); }
  if (b.section === "skills") return (
    <>
      <h2>Skills</h2>
      {content.skills.map((g) => (
        <div className="skill-row" key={g.group}>
          <div className="skill-label">{g.group}</div>
          <div className="chips">{g.items.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
        </div>
      ))}
    </>
  );
  if (b.section === "awards") return (
    <>
      <h2>Trophy shelf</h2>
      <div className="award-list">
        {content.awards.map((a) => (
          <div className="award" key={a.title}><span className="medal">★</span><div><b>{a.title}</b><div className="sub">{a.sub}</div></div></div>
        ))}
      </div>
    </>
  );
  if (b.section === "articles") return (
    <>
      <h2>Articles</h2>
      <p>Things I write to explain AI and engineering in plain words.</p>
      {content.articles.map((a, i) => (
        <div className="art" key={i}>
          <b>{a.title}</b><div className="sub">{a.blurb}</div>
          {a.url && a.url !== "#" && <a className="go" href={a.url} target="_blank" rel="noopener">Read →</a>}
        </div>
      ))}
    </>
  );
  if (b.section === "highlights") { const h = content.highlights; return (
    <>
      <h2>Highlights</h2>
      <div className="skill-label">Conferences &amp; talks</div>
      <ul>{h.conferences.map((c, i) => <li key={i}>{c}</li>)}</ul>
      <div className="skill-label" style={{ marginTop: "0.8rem" }}>Most prestigious</div>
      <ul>{h.prestigious.map((c, i) => <li key={i}>{c}</li>)}</ul>
      <div className="skill-label" style={{ marginTop: "0.8rem" }}>LinkedIn posts</div>
      {h.linkedin.map((l, i) => (
        <div className="art" key={i}><div className="sub">{l.text}</div>{l.url && <a className="go" href={l.url} target="_blank" rel="noopener">Open →</a>}</div>
      ))}
    </>
  ); }
  if (b.section === "contact") return (
    <>
      <h2>Let's build something</h2>
      <p>Have a role, an idea, or just want to talk shop?</p>
      <a className="mailto" href={`mailto:${content.email}`}>{content.email}</a>
      <div className="chips" style={{ marginTop: "1rem" }}>
        {content.links.filter((l) => l.url && l.url !== "#").map((l) => (
          <a className="btn" key={l.label} href={l.url} target="_blank" rel="noopener">{l.label}</a>
        ))}
      </div>
    </>
  );
  return <h2>{b.sign}</h2>;
}

function SectionPanel({ b }) {
  if (!b) return null;
  return <aside className="rw-panel" key={b.id}>{sectionBody(b)}</aside>;
}

/* --------- big center "museum" panel shown when you enter a building -------- */
function CenterPanel({ b, onLeave }) {
  const [speaking, setSpeaking] = useState(false);
  if (!b) return null;
  const simple = content.simple[b.id] || "";
  const speak = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speaking) { synth.cancel(); setSpeaking(false); return; }
    try {
      const u = new SpeechSynthesisUtterance(simple);
      u.rate = 0.96; u.pitch = 1.05;
      u.onend = () => setSpeaking(false);
      synth.cancel(); synth.speak(u); setSpeaking(true);
    } catch { setSpeaking(false); }
  };
  return (
    <div className="rw-center-wrap">
      <div className="rw-center">
        <button className="rw-close" onClick={onLeave}>Leave ✕ <kbd>E</kbd></button>
        <div className="rw-center-body">{sectionBody(b)}</div>
        {simple && (
          <div className="rw-simple">
            <div className="rw-simple-head">
              <span>In a nutshell 💬</span>
              <button className="rw-btn" onClick={speak}>{speaking ? "◼ Stop" : "🔊 Read it to me"}</button>
            </div>
            <p>{simple}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- minimap --------------------------------- */
function Minimap({ buildings }) {
  const b = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const bl of buildings) {
      minX = Math.min(minX, bl.x); maxX = Math.max(maxX, bl.x);
      minZ = Math.min(minZ, bl.z); maxZ = Math.max(maxZ, bl.z);
    }
    const pad = 16;
    return { minX: minX - pad, maxX: maxX + pad, minZ: minZ - pad, maxZ: maxZ + pad };
  }, [buildings]);
  const W = 150, H = 150;
  const sx = (x) => ((x - b.minX) / (b.maxX - b.minX)) * W;
  const sz = (z) => ((z - b.minZ) / (b.maxZ - b.minZ)) * H;
  const px = sx(playerState.x), pz = sz(playerState.z);
  const focused = playerState.focusedSection;
  return (
    <svg className="rw-minimap" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <rect x="0" y="0" width={W} height={H} rx="10" fill="rgba(20,40,60,0.55)" />
      {buildings.map((bl) => (
        <rect key={bl.id} x={sx(bl.x) - 4} y={sz(bl.z) - 4} width="8" height="8" rx="2"
          fill={focused === bl.id ? "#ffd23a" : "#8fd0ff"} />
      ))}
      <g transform={`translate(${px} ${pz}) rotate(${(-playerState.yaw * 180) / Math.PI})`}>
        <polygon points="0,-6 4,5 -4,5" fill="#fff" stroke="#0a95e8" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* --------------------------------- HUD ------------------------------------ */
export default function HUD({ city }) {
  const buildings = city.buildings;
  const byId = useMemo(() => Object.fromEntries(buildings.map((b) => [b.id, b])), [buildings]);
  const [focusedId, setFocusedId] = useState(null);
  const [mode, setMode] = useState(playerState.mode);
  const [nearDoor, setNearDoor] = useState(null);
  const [inside, setInside] = useState(null);
  const [coins, setCoins] = useState(0);
  const [started, setStarted] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [, setTick] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFocusedId(playerState.focusedSection);
      setMode(playerState.mode);
      setNearDoor(playerState.nearDoor);
      setInside(playerState.inside);
      setCoins(playerState.coins);
      if (!startedRef.current && (playerState.locked || touchInput.driving)) { startedRef.current = true; setStarted(true); }
      setTick((t) => (t + 1) % 100000);
    }, 90);
    return () => clearInterval(id);
  }, []);

  // stop any narration when you leave a room
  useEffect(() => { if (!inside) window.speechSynthesis?.cancel(); }, [inside]);

  // once they enter the city, briefly point out the always-there résumé escape hatch
  useEffect(() => {
    if (!started) return;
    setShowNudge(true);
    const t = setTimeout(() => setShowNudge(false), 7000);
    return () => clearTimeout(t);
  }, [started]);

  // inside a room: flag the body so the outside clutter (other buildings' floating
  // signs) is hidden and the room reads as one focused space
  useEffect(() => {
    document.body.classList.toggle("rw-inside", !!inside);
    return () => document.body.classList.remove("rw-inside");
  }, [inside]);

  const toggleView = () => { playerState.mode = playerState.mode === "third" ? "first" : "third"; setMode(playerState.mode); };
  const leave = () => { window.speechSynthesis?.cancel(); playerState.inside = null; setInside(null); };
  const openResume = (e) => { e?.stopPropagation?.(); setShowNudge(false); window.location.hash = ""; };
  const startExploring = (e) => {
    e?.stopPropagation?.();
    if (isTouch) { startedRef.current = true; setStarted(true); }        // reveal the joystick
    else { document.querySelector("canvas")?.requestPointerLock?.(); }   // lock + begin (fires 'started' via the poll)
  };

  return (
    <div className="rw-hud">
      <header className="rw-top">
        <div className="rw-brand">
          {content.name}<span className="dot">.</span>
          <div className="rw-role">{content.role}</div>
        </div>
        {!inside && (
          <div className="rw-tools">
            <div className="rw-tool-row">
              <button className="rw-btn resume-pill" onClick={openResume} title="See the whole résumé on one page">📄 See everything</button>
              <button className="rw-btn ghost" onClick={toggleView}>{mode === "third" ? "1st-person" : "3rd-person"} (V)</button>
            </div>
            <Minimap buildings={buildings} />
            {started && showNudge && (
              <div className="rw-nudge">Prefer a plain résumé? It is all up here <span aria-hidden="true">↑</span></div>
            )}
          </div>
        )}
      </header>

      {!inside && <div className="rw-coins">🪙 {coins}</div>}

      {started && !isTouch && !inside && (
        <button className="rw-escape" onClick={() => document.exitPointerLock?.()} title="Press Esc to free the mouse and use the menus">
          <kbd>Esc</kbd> <span>menu &amp; cursor</span>
        </button>
      )}

      {inside ? (
        <CenterPanel b={byId[inside]} onLeave={leave} />
      ) : (
        <SectionPanel b={focusedId ? byId[focusedId] : null} />
      )}

      {!inside && nearDoor && started && (
        <div className="rw-enter">Press <kbd>E</kbd> to enter <b>{byId[nearDoor]?.sign}</b></div>
      )}

      {!started && (
        <div className="rw-intro">
          <div className="rw-intro-card">
            <div className="rw-intro-emoji">🏙️</div>
            <h1>Welcome to my portfolio</h1>
            <p>Two ways in. Pick whichever you like, you can switch anytime.</p>
            <div className="rw-lobby">
              <button className="rw-choice play" onClick={startExploring}>
                <span className="rw-choice-emoji">🎮</span>
                <span className="rw-choice-title">Explore in 3D</span>
                <span className="rw-choice-sub">{isTouch ? "Walk the city with the joystick" : "Walk the city (WASD + mouse)"}</span>
              </button>
              <button className="rw-choice resume" onClick={openResume}>
                <span className="rw-choice-emoji">📄</span>
                <span className="rw-choice-title">See everything</span>
                <span className="rw-choice-sub">Classic résumé, skim in seconds</span>
              </button>
            </div>
            <div className="rw-keys">
              {isTouch ? (
                <span>Joystick to move · drag to look</span>
              ) : (
                <span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move · <kbd>E</kbd> enter · <kbd>V</kbd> view · <kbd>R</kbd> résumé</span>
              )}
            </div>
          </div>
        </div>
      )}

      {started && !isTouch && !inside && (
        <div className="rw-hint">
          <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move &nbsp;·&nbsp; <kbd>E</kbd> enter &nbsp;·&nbsp; <kbd>Shift</kbd> sprint &nbsp;·&nbsp; <kbd>V</kbd> view &nbsp;·&nbsp; <kbd>R</kbd> résumé
        </div>
      )}
    </div>
  );
}
