import { Component, useEffect, useMemo, useState } from "react";
import Scene from "./Scene.jsx";
import HUD from "./components/HUD.jsx";
import MobileControls from "./components/MobileControls.jsx";
import FlatPortfolio from "./FlatPortfolio.jsx";
import { buildCity } from "./world.js";
import { resetPlayerState } from "./state.js";

const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const currentRoute = () =>
  (typeof window !== "undefined" && window.location.hash.replace(/^#\/?/, "")) || "";

/** Keeps a WebGL/component failure from taking down the whole page. */
class SceneBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: null }; }
  static getDerivedStateFromError(error) { return { failed: error }; }
  componentDidCatch(error) { console.error("[portfolio-city] scene error:", error); }
  render() {
    if (this.state.failed) {
      return (
        <div className="rw-scene-error">
          <p>The 3D scene hit an error. Try reloading.</p>
          <pre>{String(this.state.failed?.message || this.state.failed)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const city = useMemo(() => buildCity(), []);
  const [route, setRoute] = useState(currentRoute());

  useEffect(() => { resetPlayerState(city.spawn); }, [city]);
  useEffect(() => {
    const on = () => setRoute(currentRoute());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  if (route === "all") return <FlatPortfolio />;

  return (
    <div className="rw-root">
      <SceneBoundary>
        <Scene city={city} />
      </SceneBoundary>
      <HUD city={city} />
      {isTouch && <MobileControls />}
    </div>
  );
}
